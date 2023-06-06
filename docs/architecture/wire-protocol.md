# 传输协议

## 关于本文档

本文档描述了.NET **nanoFramework**在调试和引导阶段使用的传输协议。该协议是根据.NET Micro Framework传输协议实现的。其目的是为了以后的审查，以便改进和简化。

## 传输协议消息

消息的基本结构由以下部分组成：

- 签名：基本上是一个标记，用于检测新消息数据包的开始。长度固定。
- 头部：包含多个字段，用于携带数据包序列、标志、命令、CRC等信息。长度固定。
  - 头部的CRC32（用于验证计算此CRC32字段的结果必须为零）。
  - 负载的CRC32（如果存在，用于验证计算此CRC32字段的结果必须为零）。
  - 命令代码。
  - 消息的序列号。
  - 序列回复：携带消息的序列号，表示该消息是回复的。
  - 标志。
  - 负载的大小。
- 负载：用于携带数据。可选，其大小可变。

您可以在[WireProtocol.h](https://github.com/nanoframework/nf-interpreter/blob/main/src/CLR/Include/WireProtocol.h)找到更多信息。

数据通道

目前，.NET nanoFramework的Wire Protocol仅支持串行通道。计划添加对USB（使用CDC类设备）和TCP的支持。

为了简化到新的HAL/平台的移植，代码被架构成只需要最少的更改即可添加对新实现的支持。

接收和传输数据

代码被架构成通过串行流来接收和传输数据。

最好（并且使用提供的参考实现而不需要太多更改）串行流的接口/API应该：

- 允许检查是否有可读取的数据。
- 允许按顺序（FIFO方式）读取输入流的一定数量的字节。最好具有读取操作的超时设置，以防止错误/不完整的读取操作。
- 允许以一定数量的字节写入传输流。最好以非阻塞方式进行，以防止错误/不完整的写入操作。

接收器工作流程

以下是Wire Protocol组件的工作流程的高级描述。

- RTOS线程 - `WireProtocol_ReceiverThread`（位于src\\CLR\\WireProtocol\\WireProtocol_ReceiverThread.c中）中的`ReceiverThread（...）` - 不断循环检查接收通道中是否有可用数据。
- 当有可用数据时，初始化消息的接收（WP_Message_Initialize）并准备接收（WP_Message_PrepareReception），以便进行实际的接收并通过调用WP_Message_Process进行处理。
- 在接收状态期间，读取输入流（位于`WireProtocol_HAL

_Interface`（src\\CLR\\WireProtocol\\WireProtocol_HAL_Interface.c）中的`WP_ReceiveBytes（...）`）以接收消息头并检查其完整性。如果消息头完整，则接下来接收负载并进行完整性检查。
- 在成功接收消息头（和负载，如果有）后，`WireProtocol_Message`（位于src\\CLR\\WireProtocol\\WireProtocol_Message.c中）中的_Process_状态机进入`ReceiveState_CompletePayload`状态并调用`ProcessPayload（...）`函数。
- 在`ProcessPayload（...）`函数内，通过查找已实现的命令的查找表，如果找到匹配的命令，则调用相应的处理程序。根据命令的不同，其处理可能需要额外的处理或数据收集。无论如何，处理程序最终会调用`ReplyToCommand（...）`函数，将回复消息发送回主机设备。
- 在执行`ReplyToCommand（...）`时，通过写入输出流（位于`WireProtocol_HAL_Interface`（src\\CLR\\WireProtocol\\WireProtocol_HAL_Interface.c）中的`WP_TransmitMessage（...）`）发送回复消息。

## Wire Protocol命令

处理命令是通过处理函数来实现的。
已实现的命令集列在```c_Lookup_Request```中。该查找结构基本上是一个包含命令代码和指向相应处理函数的指针的数组。它位于_WireProtocol_App_Interface.c_中。
实际的命令实现位于_WireProtocol_Commands.c_中。

## 如何添加对新命令的支持

有两组命令：监视器命令和调试命令。

要添加新的监视器命令，您需要执行以下操作：

- 在`WireProtocol_MonitorCommands.h`（位于src\CLR\WireProtocol\WireProtocol_MonitorCommands.h）中添加函数声明和任何所需的结构和/或类型定义。
- 在`WireProtocol_MonitorCommands.c`（位于src\CLR\WireProtocol\WireProtocol_MonitorCommands.c）中添加一个弱声明。
- 命令处理函数的实际代码（以及任何所需的辅助函数或额外处理）将添加到特定目标的级别。例如，对于ChibiOS中的nanoBooter的参考实现，请查看`WireProtocol_MonitorCommands.c`（位于targets\CMSIS-OS\ChibiOS\nanoBooter\WireProtocol_MonitorCommands.c）。

要将命令添加到受支持的监视器命令集合中，请取消注释或添加```c_Lookup_Request```变量中的相应行，该变量位于_WireProtocol_App_Interface.c_中，用于`nanoBooter`（位于targets\CMSIS-OS\ChibiOS\nanoBooter\WireProtocol_MonitorCommands.c）和/或`nanoCLR`（位于targets\CMSIS-OS\ChibiOS\nanoCLR\WireProtocol_MonitorCommands.c）。
由于该声明使用宏来添加命令的声明，请确保严格遵循现有的命名模式。

通过

这种架构，我们尝试通过使得nanoBooter和nanoCLR具有不同的监视器命令，并且在必要时以不同的方式实现它们，提供灵活性。

当实现新命令或将原始C++代码移植到C时，请尽量遵循现有的命名模式，以便代码可读性和可维护性。

## 如何添加对新通道的支持

当前的Wire Protocol实现支持通过串行端口（UART/USART）和串行USB（USB CDC设备类）进行传输。
计划在以后的阶段添加对TCP通道的支持。

在添加对新通道的支持时，需要重新编写_WireProtocol_HAL_Interface.c_中的```WP_ReceiveBytes(...)```和```WP_TransmitMessage(...)```函数。该实现与目标和板级相关，因此它位于板级目录中。请在此处查看ST_STM32F4_DISCOVERY板的参考实现（位于targets\CMSIS-OS\ChibiOS\ST_STM32F4_DISCOVERY\common\WireProtocol_HAL_Interface.c）。

在这两个函数中，重要的是它们读取/写入指定数量的字节到串行流中。最好使用非阻塞调用和超时设置。请阅读这些函数内的注释以了解详细信息。
需要调整的最后一部分是```ReceiverThread(...)```中的代码，该线程是运行Wire Protocol组件的RTOS线程。该线程基本上是一个循环，并处于等待状态，检查输入流上是否有可读取的数据。当有数据可用时，将调用```WP_Message_Process(...)```函数。

## HAL接口

Wire Protocol需要以下函数与HAL进行接口交互。
每个函数的弱实现属于核心代码。

- `WireProtocol_HAL_Interface.c`中的`WP_TransmitMessage(...)`。
- `WireProtocol_HAL_Interface.c`中的`WP_ReceiveBytes(...)`
- `WireProtocol_HAL_Interface.c`中的`WP_CheckAvailableIncomingData(...)`

提供了一个基于ChibiOS（包括其HAL）的STM32F4_DISCOVERY板的实现作为参考。请在`WireProtocol_HAL_Interface`（位于targets\CMSIS-OS\ChibiOS\ST_STM32F4_DISCOVERY\common\WireProtocol_HAL_Interface.c）中查看该实现。

当将.NET **nanoFramework**移植到另一个RTOS或HAL时，请按照参考实现来简化移植工作。

## 应用程序接口

Wire Protocol需要以下函数与其客户端应用程序进行接口交互。
每个函数的弱实现属于核心代码。

- `WireProtocol_App_Interface.c`中的`WP_App_ProcessHeader(...)`
- `WireProtocol_App_Interface.c`中的`WP_App_ProcessPayload(...)`

这些函数的实际实现将由nanoBooter和nanoCLR提供。请在ChibiOS的参考实现中查看`WireProtocol_App_Interface.c`（位于targets\CMSIS-OS\ChibiOS\nanoBooter\Wire

Protocol_App_Interface.c）。

## 调试Wire Protocol通信

为了便于调试Wire Protocol会话，可以使用一组CMake选项来调整Wire Protocol状态机和发送/接收操作的输出。可用的选项包括：

- NF_WP_TRACE_ERRORS：启用错误跟踪。
- NF_WP_TRACE_HEADERS：启用数据包头部的跟踪。
- NF_WP_TRACE_STATE：启用Wire Protocol状态机的当前状态跟踪。
- NF_WP_TRACE_NODATA：启用空或不完整数据包的跟踪。
- NF_WP_TRACE_ALL：启用上述所有选项。如果选择了此设置，它将优先于其他所有选项，并取代它们。

## CRC32校验

为了确保Wire Protocol通信的完整性，消息头和负载各自具有CRC32字段，其中填充了相应部分的CRC32哈希值。这使接收方能够验证消息头和负载的完整性。

目标可以选择**不**实现CRC32校验。调试器中的Wire Protocol层能够自动处理这两种情况。

要构建一个**没有**实现CRC32校验的目标映像，需要在CMake中传递选项`NF_WP_IMPLEMENTS_CRC32=OFF`。