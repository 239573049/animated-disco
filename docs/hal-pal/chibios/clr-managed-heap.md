# CLR 托管堆定义

## 关于本文档

本文档描述了 CLR 托管堆在 ChibiOS 目标中的定义。

对于基于 STM32 的设备：
配置通过链接器文件进行链接：

- nanoCLR 为目标板提供的目标链接器文件，例如 [STM32F091xC.ld](https://github.com/nanoframework/nf-interpreter/tree/main/targets/ChibiOS/ST_NUCLEO64_F091RC/nanoCLR/STM32F091xC_CLR.ld)，在其中调用了 rules.ld **除了** F7 系列，F7 系列直接调用了 rules_clr.ld、rules_code.ld、rules_data.ld 和 rules_stacks.ld。
- [rules.ld](https://github.com/nanoframework/nf-interpreter/tree/main/targets/ChibiOS/_common/rules.ld)（适用于所有基于 STM32 的 ChibiOS 目标，调用下一组链接器文件）
- [rules_clr.ld](https://github.com/nanoframework/nf-interpreter/tree/main/targets/ChibiOS/_common/rules_clr.ld)、[rules_code.ld](https://github.com/nanoframework/nf-interpreter/tree/main/targets/ChibiOS/_common/rules_code.ld)、[rules_data.ld](https://github.com/nanoframework/nf-interpreter/tree/main/targets/ChibiOS/_common/rules_data.ld) 和 [rules_stacks.ld](https://github.com/nanoframework/nf-interpreter/tree/main/targets/ChibiOS/_common/rules_stacks.ld)

## 托管堆的位置和大小

CLR 托管堆可以位于目标板上的任何可用内部或外部 RAM 地址处。

它将被放置在包含 CRT 堆的区域之后（如果将其分配给相同的 RAM 区域），并且在 RAM 中的向量表副本之前（如果将其分配给相同的 RAM 区域）。

这使开发人员能够创建具有最大灵活性的新目标板，以确定 CLR 托管堆和相应大小的位置。

### 定义 CLR 托管堆的位置

CLR 托管堆的位置在目标板文件夹中为 nanoCLR 提供的目标链接器文件中设置，例如 [STM32F091xC_CLR.ld](https://github.com/nanoframework/nf-interpreter/tree/main/targets/ChibiOS/ST_NUCLEO64_F091RC/nanoCLR/STM32F091xC_CLR.ld)。

例如，文件中的一行（通常在文件末尾附近）将类似于 `REGION_ALIAS("CLR_MANAGED_HEAP_RAM", ram0);`。此示例中指定的位置将 CLR 托管堆的位置设置为 _ram0_ 区域。RAM 区域及其相应大小在同一文件中定义。如需进一步了解，请参阅 ChibiOS 文档以获取有关如何定义其他 RAM 区域的详细信息。

### CLR 托管堆的大小

CLR 托管堆的大小会自动调整，以占用 CRT 堆之后的所有可用 RAM 空间（如果将

其分配给相同的 RAM 区域）。

可能需要调整 CRT 堆的大小。这在目标板的 CMake 文件中进行设置，例如 [CMakeLists.txt](https://github.com/nanoframework/nf-interpreter/tree/main/targets/ChibiOS/ST_NUCLEO64_F091RC/CMakeLists.txt)。在包含类似于 `--defsym=__crt_heap_size__=0x800` 的行中查找 `__crt_heap_size__` 的定义。在此示例中，CRT 堆的大小设置为 0x800。

在定义大小时，您需要考虑以下几个因素：

- 分配托管堆的区域的总可用大小
- 如果此区域分配给了初始化的变量，它们占用了多少空间
- 如果 CRT 堆位于此区域中，并且为其剩余的空间足够

链接器只能确定是否有足够的空间满足所有这些因素，并且仅在不足时才会发出警告。但是，它无法确定 CRT 堆（就像 CRT 堆一样）是否足够大以满足运行需求。这由目标板开发人员决定。
有关最终内存映射的详细概述，您可以查看成功构建后位于构建文件夹中的 _nanoCLR.map_。查找名为 `.heap` 和 `.clr_managed_heap` 的区域，以查看它们被放置的最终地址。