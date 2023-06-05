# 为什么使用.NET nanoFramework

.NET nanoFramework是在嵌入式设备上开发软件的完美工具。您可以从一个低成本且易于获取的开发板开始，然后使用.NET nanoFramework编写、调试和部署代码。

无论您是初次涉足编程还是经验丰富的开发者，如果您想要一个功能强大且易于使用的工具来开发在嵌入式设备上运行的软件，那么您来对地方了。凭借其模块化架构，您可以轻松获取核心组件（如CLR、调试器和解释器），并扩展到新的硬件平台。.NET nanoFramework是您项目的理想伙伴。当前的参考实现使用[ChibiOS](http://www.chibios.org/dokuwiki/doku.php)支持多种[ST Microelectronics](http://www.st.com/content/st_com/en.html)开发板，还有[ESP32](https://en.wikipedia.org/wiki/ESP32)。

因为它完全免费且[开源](https://en.wikipedia.org/wiki/Free_and_open-source_software)，您可以访问并修改代码的所有部分，包括利用他人已经贡献的内容。如果您愿意，您可以通过对项目和快速增长的社区做出贡献来塑造未来。

以下是它的一些独特功能：

- 可在资源受限的设备上运行，至少需要256kB的闪存和64kB的RAM。
- 直接在裸机上运行。目前支持[ARM Cortex-M](https://en.wikipedia.org/wiki/ARM_Cortex-M)和[Xtensa LX6和LX7](https://en.wikipedia.org/wiki/ESP32)核心。
- 支持常见的嵌入式外设和互连技术，如GPIO、UART、SPI、I2C、USB、网络。
- 原生支持多线程。
- 支持能源高效操作，如运行在电池上的设备。
- 支持Interop代码，允许开发者轻松编写既包含托管代码（C#）又包含本机代码（C/C++）的库。
- 由于采用了更简单的标记-清除[垃圾收集器](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science))，无需手动内存管理。
- 执行限制以捕获设备死锁和崩溃。

与其他类似系统相比，它具有以下优势：

- 在目标硬件上拥有一流的调试器体验，支持断点、单步执行、跟踪进入、跟踪退出、跳过、暂停和停止等功能。
- 使用强大且免费的编程环境，如[Microsoft Visual Studio IDE](https://www.visualstudio.com/vs/)。


- 支持来自多家制造商的大量廉价开发板，包括：[ST Microelectronics](http://www.st.com/content/st_com/en.html)的Discovery和Nucleo开发板，[ESP32和S2](https://en.wikipedia.org/wiki/ESP32)系列，[Texas Instruments的CC1352R1-LAUNCHXL](https://www.ti.com/tool/LAUNCHXL-CC1352R1)，[NXP的i.MXRT1060](https://www.nxp.com/design/development-boards/i.mx-evaluation-and-development-boards/mimxrt1060-evk-i.mx-rt1060-evaluation-kit:MIMXRT1060-EVK)等等。
- 可轻松扩展到其他硬件平台和[RTOSes](https://en.wikipedia.org/wiki/Real-time_operating_system)。目前正在针对[ChibiOS](http://www.chibios.org/dokuwiki/doku.php)，FreeRTOS，TI-RTOS和ESP32 FreeRTOS进行开发。
- 完全免费且[开源](https://en.wikipedia.org/wiki/Free_and_open-source_software)。从核心组件到用于构建、部署、调试和IDE组件的工具，一切都是开源的。

如果你想知道".NET nanoFramework是什么？"，可以查看[什么是.NET nanoFramework？](what-is-nanoframework.md)