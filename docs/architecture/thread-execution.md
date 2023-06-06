# 在nanoFramework中的线程执行

## 关于本文档

本文档描述了.NET **nanoFramework** CLR中线程执行的工作原理。

## 线程简介

简单来说，.NET **nanoFramework**线程（在执行方面）基本上是一系列由解释器翻译的IL指令，从而使事情发生。
这种执行以协作的方式进行，意味着线程被允许运行一段时间，然后停止并将执行权交给下一个满足运行条件的线程。

## 线程执行

.NET **nanoFramework** CLR和解释器在RTOS线程上运行。当RTOS以[协作方式](https://en.wikipedia.org/wiki/Computer_multitasking#Cooperative_multitasking)（相对于[抢占式方式](https://en.wikipedia.org/wiki/Computer_multitasking#Preemptive_multitasking)）工作时，线程应该放弃对RTOS的控制，以便进行上下文切换，并且下一个RTOS线程有机会运行。
在.NET **nanoFramework**中，这种上下文切换预计会在允许运行.NET **nanoFramework**线程的每个时间段之后发生。
根据运行在其下面的RTOS，目标板开发人员需要提供正确的方式来放弃线程执行的控制。
并非所有RTOS都需要这样做。例如，默认情况下，当RTOS以抢占式方式工作时，线程执行在各个RTOS线程之间以轮转的方式进行。

将执行权放弃给底层RTOS，以便让“下一个”RTOS线程和其他RTOS服务运行，是通过在每个目标平台上实现的`Events_WaitForEvents`函数来完成的。
对于当前版本的.NET **nanoFramework**，可以通过以下方式实现：

- 对于使用ChibiOS（符合CMSIS标准的RTOS）的目标，调用`osDelay(10)`就足够了，它允许内核运行所有其他具有相同（或更高）优先级的线程。
- 对于ESP32目标，它使用FreeRTOS运行，调用`vTaskDelay(0)`就足够了，它允许内核运行所有其他具有相同（或更高）优先级的线程。