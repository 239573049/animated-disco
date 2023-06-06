# ChibiOS开发板的GCC链接脚本

## 关于本文档

本文档描述了使用ChibiOS HAL/PAL和.NET **nanoFramework**开发板的GCC链接脚本，并对如何自定义和适应新目标板进行了一些解释。

## 链接脚本文件命名

为了清楚地知道哪个文件属于哪个镜像，链接脚本文件名后缀为'_booter'表示nanoBooter，'_CLR'表示nanoCLR。

这些链接脚本由链接器在链接阶段使用，并在CMakeLists.txt全局文件中添加到目标板的构建中。

当添加新的目标板时，请确保将每个链接脚本文件设置为相应的目标（在CMake中设置）。

还建议将每个链接脚本文件放置在相应的nanoBooter或nanoCLR文件夹中（即在目标板文件夹内）。

## nanoBooter链接脚本的配置

nanoBooter镜像位于目标SoC/MCU的默认引导地址。

建议将区域长度设置为与为nanoBooter保留的FLASH空间大小相匹配。这样做可以额外检查，因为在构建和链接过程中，如果镜像太大无法适应该空间，将会生成错误，并可以采取纠正措施。

为了说明这一点，我们将看一下ST_NUCLEO_F091RC开发板的链接脚本。该文件是`STM32F091xC_booter.ld`（@ targets/CMSIS-OS/ChibiOS/ST_NUCLEO_F091RC/nanoBooter/STM32F091xC_booter.ld）。

这里的唯一配置是`flash`区域的长度，应设置为为nanoBooter保留的FLASH空间大小。在示例中，可以看到nanoBooter镜像将从地址0x08000000开始，最大大小为16K。

## nanoCLR链接脚本的配置

nanoCLR镜像位于可用FLASH空间的指定地址，通常位于为nanoBooter保留的空间之后。

建议将区域长度设置为与为nanoCLR保留的FLASH空间大小相匹配。这样做可以额外检查，因为在构建和链接过程中，如果镜像太大无法适应该空间，将会生成错误，并可以采取纠正措施。

为了说明这一点，我们将看一下ST_NUCLEO_F091RC开发板的链接脚本。该文件是`STM32F091xC_CLR.ld`（@ targets/CMSIS-OS/ChibiOS/ST_NUCLEO_F091RC/nanoCLR/STM32F091xC_CLR.ld）。

`flash`区域的配置取决于两个因素：为nanoBooter镜像保留的空间和应用部署保留的空间。在示例中，可以看到nanoCLR镜像将从地址0x08004000

开始，最大大小为256k - 16k - 100k。其中，16k为nanoBooter保留的空间大小，100k为应用部署保留的空间大小。

在这个特定示例中（因为该SoC要求将向量表复制到RAM中），需要微调`ram0`区域，使其从保留给向量表的空间之后开始。最终结果是`ram0`从地址0x200000C0开始，长度为32k - 0xC0。

### 提示

- 在设计地址映射时，请确保地址区域边界与FLASH内存块匹配。这对于能够执行镜像更新非常重要。这适用于nanoBooter、nanoCLR和应用部署。

- 链接脚本接受多种数字格式。使用适合您所指定内容的格式。以下是一些示例。对于绝对地址（例如FLASH块的起始地址），请使用十六进制表示法，例如0x08000000。在指定区域大小时，使用_k_和_M_后缀，例如16k表示具有16k字节（4096字节）的块，或者1M。这样可以更轻松地从设备数据表中复制/粘贴。

- 可以使用数学表达式。例如，在设置可用空间给nanoCLR镜像时，不必进行数学计算，只需将1M - 16k放在那里即可。