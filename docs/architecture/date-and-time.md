# 日期和时间

## 关于本文档

本文档描述了.NET **nanoFramework**如何处理日期和时间以及相关选项。

## UTC和本地时间

时间（和日期）对于.NET **nanoFramework**的内部工作非常重要。但是，运行在其之上的应用程序可以使用它，也可以不使用它，因此相关功能和相关代码的讨论和评估变得重要。
由于.NET **nanoFramework**运行在资源受限的平台上，必须考虑和评估增加RAM和FLASH使用量的功能的包含。

[`DateTime`](https://msdn.microsoft.com/en-us/library/system.datetime(v=vs.110).aspx)通过其[`DateTime.Kind`](https://msdn.microsoft.com/en-us/library/system.datetime.kind(v=vs.110).aspx)属性支持使用本地和UTC时间。支持这一点需要添加多个“块”，例如：用于设置平台时区的API，处理大量可用的时区，管理夏令时更改，管理不同种类之间的转换等。

考虑到上述所有因素，.NET **nanoFramework**提供了“绝对最小可行”选项来解决这个问题。
支持`DateTime`（显然）但所有`DateTime`都被视为UTC。不支持`DateTime.Kind.Local`，设置时区或转换为/从不同种类。
如果应用程序需要此功能，则必须在其自己的级别上实现它。

## 时间源

默认情况下，时间基础源是CMSIS RTOS API中可用的`SysTick`。
这是实例化`DateTime`对象时的时间“来源”。

由于几乎所有能够运行.NET **nanoFramework**的硬件平台都包括硬件[RTC](https://en.wikipedia.org/wiki/Real-time_clock)，因此可以将此外设用作时间对象的“来源”。
请注意，对于.NET **nanoFramework**的所有其他内部，CMSIS RTOS API `SysTick`仍然被用作时间基础。

通过`NF_FEATURE_RTC`配置选项，该选项暴露给板设计者。在调用CMake时将其设置为`ON`会引入RTC子系统，并且所有对`DateTime`的调用都使用此外设提供的时间基础。

## RTC和硬件

利用RTC硬件外设可以实现几个有趣/有价值的功能：

- 更准确的时间保持（与常规计时器相比）；
- 在睡眠/深度睡眠模式下进行时间保持；
- 设置闹钟以在未来某个时间唤醒系统。