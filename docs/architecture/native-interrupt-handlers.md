# 线程执行

## 关于本文档

本文档描述了在.NET **nanoFramework** CLR中线程执行的工作原理。

## 本机中断处理程序

用于本机代码中断处理程序的函数需要由宏`NATIVE_INTERRUPT_START`和`NATIVE_INTERRUPT_END`进行“包装”，以负责设置/重置适当的`System_State`标志。