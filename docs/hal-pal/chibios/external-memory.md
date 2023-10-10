# 外部内存

## 关于本文档

本文档描述了如何使用.NET **nanoFramework**覆盖中的ChibiOS FSMC驱动程序为托管堆使用外部内存。请参阅CLR托管堆[文档](clr-managed-heap.md)。

## 存储控制器

大多数STM32设备都包括FSMC（Flexible Static Memory Controller），它提供了与最常见的存储器类型的无缝接口，可以是同步或异步的。

## 假设和设计

必须在启动后尽早进行存储控制器的初始化以及存储器配置。在当前的.NET **nanoFramework**设计中，这预计会在调用CMSIS的`osKernelInitialize()`之后立即发生，此时所有其他初始化和配置已经完成，并且中断已启用。由于内存空间将用作托管堆，因此时间不再比这更关键，因此在调用CLR启动之前的任何时间都应该是完全可以接受的。

外部内存配置和初始化应该发生的函数是`Target_ExternalMemoryInit()`。`nanoHAL_v2.h`提供了一个_弱_而空的此函数实现。如果目标要使用外部内存，它必须提供此函数的_强_实现并在调用`ClrStartup()`之前调用它。

考虑到CLR托管堆的默认放置位置在SoC内部RAM中，链接器文件包含了一个规则，将此区域（称为`clr_managed_heap`）放置在其RAM区域之一。

### 以STM32F429I-Discovery参考目标为例

为了提供此配置的工作示例，我们以位于nf-interpreter存储库中的STM32F429I-Discovery参考目标为例[链接](https://github.com/nanoframework/nf-interpreter/tree/main/targets/ChibiOS/ST_STM32F429I_DISCOVERY)。
此目标板具有64Mbit SDRAM（芯片为IS42S16400J）。

1. _目标_实现位于目标基本文件夹中的`target_external_memory.c`文件中。此位置允许函数被nanoCLR和nanoBooter重复使用（如果需要的话）。而且，它是在目标CPU和其他所需定义已经设置的时候包含在编译序列中的。为了将此代码文件包含在构建中，它必须作为nanoCLR的`add_executable`参数的源文件包含在目标定义中。
2. 接下来，我们必须将`__crt_heap_size__`符号设置为0，以便托管堆不放置在SoC RAM中。可以通过在目标的CMakelist.txt文件中设置如下来完成：`--defsym=__crt_heap_size__=0x0`。