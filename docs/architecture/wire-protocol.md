# 传输协议

## 关于本文档

本文档描述了.NET **nanoFramework**用于调试和引导阶段的传输协议。该协议遵循.NET Micro Framework传输协议的实现。目的是为了以后进行审查，以便改进和简化它。

## 传输协议消息

消息的基本结构由以下组成：

- 签名，基本上是一个标记，用于检测新消息数据包的开始。具有固定的长度。
- 头部，具有多个字段，用于携带数据包序列、标志、命令、CRC等。具有固定的长度。
  - 头部的CRC32（用于验证计算此CRC32字段必须为零）。
  - 负载的CRC32，当存在时（用于验证计算此CRC32字段必须为零）。
  - 命令代码。
  - 消息的序列号。
  - 序列回复。携带消息的序列号，该消息是回复的。
  - 标志。
  - 负载的大小。
- 负载，用于携带数据。可选，其大小可变。

你可以在[WireProtocol.h](https://github.com/nanoframework/nf-interpreter/blob/main/src/CLR/Include/WireProtocol.h).
数据通道

目前，.NET nanoFramework Wire Protocol仅支持串行通道。计划添加对USB（使用CDC类设备）和TCP的支持。
为了简化到新的HAL/平台的移植，代码被架构成只需要最少的更改即可添加对新实现的支持。

接收和传输数据

代码被架构成通过串行流接收和传输数据。
最好（并且使用提供的参考实现而不需要太多更改）串行流的接口/API应该：

- 允许检查是否有可读取的数据。
- 允许按顺序（FIFO方式）读取输入流的一定数量的字节。具有读取操作的超时是理想的，以防止错误/不完整的读取操作。
- 允许以一定数量的字节写入传输流。最好以非阻塞方式进行，以防止错误/不完整的写入操作。

接收器工作流程

以下是Wire Protocol组件如何工作的高级描述。

- RTOS线程 - `WireProtocol_ReceiverThread`（@ src\\CLR\\WireProtocol\\WireProtocol_ReceiverThread.c）中的`ReceiverThread（...）` - 不断循环检查接收通道中是否有可用数据。
- 在有可用数据时，初始化消息的接收（WP_Message_Initialize）并准备接收（WP_Message_PrepareReception），以便实际进行接收并通过调用WP_Message_Process进行处理。
- 在接收状态期间，读取输入流（`WireProtocol_HAL_Interface`（@ src\\CLR\\WireProtocol\\WireProtocol_HAL_Interface.c）中的`WP_ReceiveBytes（...）`）以接收消息头并检查其完整性。如果有的话，接下来是负载的接收和完整性检查。
- 在成功接收标头（和负载（如果有））后，`WireProtocol_Message`（@ src\\CLR\\WireProtocol\\WireProtocol_Message.c）中的_Process_状态机达到`ReceiveState_CompletePayload`状态并调用`ProcessPayload（...）`函数。
- 在`ProcessPayload（...）`内，搜索已实现的命令的查找表，如果找到命令，则调用相应的处理程序。根据命令，其处理可能需要额外的处理或收集数据。无论如何，处理程序的执行最终都会调用`ReplyToCommand（...）`，其中回复被发送回主机设备。
- 在执行`ReplyToCommand（...）`时，输出流被写入（`WireProtocol_HAL_Interface`（@ src\\CLR\\WireProtocol\\WireProtocol_HAL_Interface.c）中的`WP_TransmitMessage（...）`）回复消息。
## Wire Protocol Commands

Processing a command is carried in a handler function.
The collection of the commands that are implemented is listed in ```c_Lookup_Request```. This lookup structure is basically an array with the command code along with a pointer to the respective handler. It resides in _WireProtocol_App_Interface.c_.
The actual command implementation resides in _WireProtocol_Commands.c_.

## How to add support for a new command

There are two groups of commands: monitor commands and debug commands.

In order to add a new monitor command you have to:

- Add the function declaration and any required structure and/or type definition in `WireProtocol_MonitorCommands.h`(@ src\CLR\WireProtocol\WireProtocol_MonitorCommands.h)
- Add a weak prototype in `WireProtocol_MonitorCommands.c`(@ src\CLR\WireProtocol\WireProtocol_MonitorCommands.c)
- The actual code for the command handler function (and any required helper functions or extra processing) is added at target level. For the reference implementation for nanoBooter in ChibiOS check `WireProtocol_MonitorCommands.c`(@ targets\CMSIS-OS\ChibiOS\nanoBooter\WireProtocol_MonitorCommands.c)

To add the command to the collection of the supported monitor commands un-comment or add the respective line in the ```c_Lookup_Request``` variable in _WireProtocol_App_Interface.c_ for both `nanoBooter`(@ targets\CMSIS-OS\ChibiOS\nanoBooter\WireProtocol_MonitorCommands.c) and/or `nanoCLR]`(@ targets\CMSIS-OS\ChibiOS\nanoCLR\WireProtocol_MonitorCommands.c).
Because this declaration uses a macro to add the declaration of a command, make sure the existing naming pattern is _**strictly**_ followed.

This architecture tries to bring flexibility by making it easy to have different monitor commands for nanoBooter and nanoCLR and also having them implemented in different ways, if necessary.

To ease code portability from .NET Micro Framework code base and maintain an understandable implementation the naming has been maintained or minimally adapted from the original C++ code.
Try to follow this as much as possible when implementing new commands or porting the original C++ code to C.

## How to add support for new channels

Current Wire Protocol implementation has support for transmission over serial port (UART/USART) and serial over USB (USB CDC device class).
Support for TCP channel is planned at a later stage.

When adding support for new channels the functions ```WP_ReceiveBytes(...)``` and ```WP_TransmitMessage(...)``` in _WireProtocol_HAL_Interface.c_ are the ones that need to be reworked. This implementation is target and board specific so it resides in the board folder. Check the reference implementation for the ST_STM32F4_DISCOVERY board here (@ targets\CMSIS-OS\ChibiOS\ST_STM32F4_DISCOVERY\common\WireProtocol_HAL_Interface.c).

On both, the relevant part is that they read/write to a serial stream a specified number of bytes. Preferably non blocking calls with a timeout. Please read the comments inside of each of those functions for the details.
The last piece that needs to be adjusted is the code inside the ```ReceiverThread(...)``` which is the RTOS thread that is running the Wire Protocol component. That thread is basically a loop with a wait state were the checks for existing data to be read on the input stream. On data available the ```WP_Message_Process(...)``` function is called.

## HAL interface

The Wire Protocol requires the following functions in order to interface with the HAL.
Weak implementations of each function are part of the core code.

- ```WP_TransmitMessage(...)``` in `WireProtocol_HAL_Interface.c`(@ src\CLR\WireProtocol\WireProtocol_HAL_Interface.c)
- ```WP_ReceiveBytes(...)``` in `WireProtocol_HAL_Interface.c`(@ src\CLR\WireProtocol\WireProtocol_HAL_Interface.c)
- ```WP_CheckAvailableIncomingData(...)``` in `WireProtocol_HAL_Interface.c`(@ src\CLR\WireProtocol\WireProtocol_HAL_Interface.c)

An implementation for an STM32F4_DISCOVERY board with ChibiOS (including its HAL) is provided as a reference. Please check it at `WireProtocol_HAL_Interface`(@ targets\CMSIS-OS\ChibiOS\ST_STM32F4_DISCOVERY\common\WireProtocol_HAL_Interface.c).

When porting .NET **nanoFramework** to another RTOS or HAL follow the reference implementation to ease the port work.

## Application interface

The Wire Protocol requires the following functions in order to interface with it's client app.
Weak implementations of each function are part of the core code.

- ```WP_App_ProcessHeader(...)``` in `WireProtocol_App_Interface.c`()
- ```WP_App_ProcessPayload(...)``` in `WireProtocol_App_Interface.c`()

Actual implementations of these are to be provided by nanoBooter and nanoCLR. Please check the reference implementation for ChibiOS at `WireProtocol_App_Interface.c`(@ targets\CMSIS-OS\ChibiOS\nanoBooter\WireProtocol_App_Interface.c).

## Debugging Wire Protocol communications

To ease debugging of Wire Protocol sessions there are available a set of CMake options to adjust the output of the Wire Protocol state machine and TX/Rx operations. The available options are:

- NF_WP_TRACE_ERRORS: Enable error tracing.
- NF_WP_TRACE_HEADERS: Enable packet headers tracing.
- NF_WP_TRACE_STATE: Enable tracing of the current state of the Wire Protocol sate machine.
- NF_WP_TRACE_NODATA: Enable tracing of empty or incomplete packets.
- NF_WP_TRACE_ALL: Enable all the options above. In case this setting is chosen it takes precedence over all the other and replaces when on.

## CRC32 validations

In order to ensure Wire Protocol communications integrity the message header and payload have each a CRC32 field which is filled in with the CRC32 hash of the respective section. This allows the receiver to validate the integrity of both the header and the payload.

A target can choose _not_ to implement that. The Wire Protocol layer in the debugger is able to automatically handle both situations.

To have a target image built **without** implementing CRC32 validation the option `NF_WP_IMPLEMENTS_CRC32=OFF` has to be passed to CMake.
