## 类库

### 关于本文档

本文档概述了.NET **nanoFramework**类库的设计和组织，提供了它们创建背后的决策过程的见解，并提供了如何添加新类库的说明。下面的示例与ChibiOS相关，它目前是.NET **nanoFramework**的参考实现。

### 类库

以下是现有类库的列表，以及它们各自的NuGet包和CMake启用选项：

| Class Library | Version | CMake Option |
| --- | --- | --- |
| Base Class Library (also known as mscorlib) |[![NuGet](https://img.shields.io/nuget/v/nanoFramework.CoreLibrary.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.CoreLibrary/) | (always included) |
| Base Class Library (without Reflection) |  [![NuGet](https://img.shields.io/nuget/v/nanoFramework.CoreLibrary.NoReflection.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.CoreLibrary.NoReflection/) | (always included, with -DNF_FEATURE_SUPPORT_REFLECTION=OFF) || Namespace | NuGet Package | Compiler Flag |
|-----------|--------------|---------------|
| nanoFramework.Device.Bluetooth | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.Device.Bluetooth.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.Device.Bluetooth/) | -DAPI_nanoFramework.Device.Bluetooth=ON |
| nanoFramework.Device.Can | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.Device.Can.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.Device.Can/) | -DAPI_nanoFramework.Device.Can=ON |
| nanoFramework.Device.OneWire |  [![NuGet](https://img.shields.io/nuget/v/nanoFramework.Device.OneWire.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.Device.OneWire/) | -DAPI_nanoFramework.Device.OneWire=ON |
| nanoFramework.Graphics |  [![NuGet](https://img.shields.io/nuget/v/nanoFramework.Graphics.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.Graphics/) | -DAPI_nanoFramework.Graphics=ON || Namespace | NuGet Package | Compiler Flag |
| --- | --- | --- |
| nanoFramework.GiantGecko.Adc | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.GiantGecko.Adc.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.GiantGecko.Adc/) | -DAPI_nanoFramework.GiantGecko.Adc=ON |
| nanoFramework.M5Stack | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.M5Stack.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.M5Stack/) | -DAPI_nanoFramework.M5Stack=ON |
| nanoFramework.Hardware.Esp32 | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.Hardware.Esp32.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.Hardware.Esp32/) | -DAPI_Hardware.Esp32=ON |
| nanoFramework.Hardware.Esp32.Rmt | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.Hardware.Esp32.Rmt.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.Hardware.Esp32.Rmt/) | -DAPI_Hardware.Esp32.Rmt=ON || nanoFramework.Hardware.GiantGecko  | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.Hardware.GiantGecko.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.Hardware.GiantGecko/) | -DAPI_Hardware.GiantGecko=ON |
| nanoFramework.Hardware.Stm32 | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.Hardware.Stm32.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.Hardware.Stm32/) | -DAPI_Hardware.Stm32=ON |
| nanoFramework.Hardware.TI | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.Hardware.TI.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.Hardware.TI/) | -DAPI_Hardware.TI=ON |
| nanoFramework.ResourceManager | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.ResourceManager.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.ResourceManager/) | -DAPI_nanoFramework.ResourceManager=ON || nanoFramework.Runtime.Events | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.Runtime.Events.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.Runtime.Events/) | (always included) |
| nanoFramework.Runtime.Native | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.Runtime.Native.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.Runtime.Native/) | (always included) |
| nanoFramework.Networking.Sntp | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.Networking.Sntp.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.Networking.Sntp/) | (included when network option is enabled) |
| nanoFramework.TI.EasyLink | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.TI.EasyLink.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.TI.EasyLink/) | -DAPI_nanoFramework.TI.EasyLink=ON || System.Device.Adc | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.System.Device.Adc.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.System.Device.Adc/) | -DAPI_System.Device.Adc=ON |
| System.Device.Dac | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.System.Device.Dac.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.System.Device.Dac/) | -DAPI_System.Device.Dac=ON |
| System.Device.I2c | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.System.Device.I2c.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.System.Device.I2c/) | -DAPI_System.Device.I2c=ON |
| System.Device.I2s | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.System.Device.I2s.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.System.Device.I2s/) | -DAPI_System.Device.I2s=ON || Namespace | NuGet Package | Compiler Flag |
|-----------|--------------|---------------|
| System.Device.Gpio | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.System.Device.Gpio.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.System.Device.Gpio/) | -DAPI_System.Device.Gpio=ON |
| System.IO.FileSystem | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.System.IO.FileSystem.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.System.IO.FileSystem/) | -DAPI_System.IO.FileSystem=ON |
| System.IO.Ports | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.System.IO.Ports.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.System.IO.Ports/) | -DAPI_System.IO.Ports=ON |
| System.IO.Streams | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.System.IO.Streams.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.System.IO.Streams/) | -DAPI_System.IO.Streams=ON || Namespace | NuGet Package | Compiler Flag |
| --- | --- | --- |
| System.Device.Pwm | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.System.Device.Pwm.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.System.Device.Pwm/) | -DAPI_System.Device.Pwm=ON |
| System.Device.Spi | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.System.Device.Spi.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.System.Device.Spi/) | -DAPI_System.Device.Spi=ON |
| System.Device.WiFi | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.System.Device.WiFi.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.System.Device.WiFi/) | -DAPI_System.Device.WiFi=ON |
| System.Device.UsbStream | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.System.Device.UsbClient.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.System.Device.UsbClient/) | -DAPI_System.Device.UsbStream=ON || Windows.Storage | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.Windows.Storage.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.Windows.Storage/) | Requires -DNF_FEATURE_HAS_SDCARD=ON and/or -DNF_FEATURE_HAS_USB_MSD=ON |
| Windows.Storage.Streams | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.Windows.Storage.Streams.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.Windows.Storage.Streams/) | Requires -DAPI_=ON |
| System.IO.FileSystem | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.System.IO.FileSystem.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.System.IO.FileSystem/) | Requires -DAPI_System.IO.FileSystem=ON |
| System.Collections | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.System.Collections.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.System.Collections/) | No native code required || System.Math | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.System.Math.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.System.Math/) | -DAPI_System.Math=ON |
| System.Net | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.System.Net.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.System.Net/) | -DAPI_System.Net=ON |
| System.Net.Http | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.System.Net.Http.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.System.Net.Http/) | No native code available |
| System.Net.Http.Client | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.System.Net.Http.Client.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.System.Net.Http.Client/) | No native code available || Namespace | NuGet Package | Native Code |
|-----------|--------------|-------------|
| System.Net.Http.Server | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.System.Net.Http.Server.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.System.Net.Http.Server/) | None |
| System.Net.Sockets.UdpClient | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.System.Net.Sockets.UdpClient.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.System.Net.Sockets.UdpClient/) | None |
| System.Net.Sockets.TcpClient | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.System.Net.Sockets.TcpClient.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.System.Net.Sockets.TcpClient/) | None |
| System.Runtime.Serialization | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.System.Runtime.Serialization.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.System.Runtime.Serialization/) | None || System.Text | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.System.Text.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.System.Text/) | No native code |
| System.Text.RegularExpressions | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.System.Text.RegularExpressions.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.System.Text.RegularExpressions/) | No native code |
| System.Threading | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.System.Threading.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.System.Threading/) | No native code |

## 其他库

| Class Library | Version |
| --- | --- |
| AMQP Net Lite | [![NuGet](https://img.shields.io/nuget/v/AMQPNetLite.nanoFramework.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/AMQPNetLite.nanoFramework/) ||AMQP Net Lite (micro) | [![NuGet](https://img.shields.io/nuget/v/AMQPNetMicro.nanoFramework.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/AMQPNetMicro.nanoFramework/) |
| nanoFramework.Azure.Devices | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.Azure.Devices.Client.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.Azure.Devices.Client/) |
| nanoFramework.Aws.IoTCore.Devices | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.Aws.IoTCore.Devices.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.Aws.IoTCore.Devices/) |
| nanoFramework.Logging | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.Logging.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.Logging/) |

上表显示了NuGet上可用的各种纳米框架包的最新版本。其中包括AMQP Net Lite (micro)、nanoFramework.Azure.Devices。设备,nanoFramework.Aws.IoTCore.Devices和nanoFramework.Logging。您可以在NuGet网站上单击NuGet图标进入相应的软件包。| nanoFramework.Json | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.Json.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.Json/) |
| nanoFramework.m2mqtt | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.m2mqtt.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.m2mqtt/) |
| nanoFramework.SignalR.Client | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.SignalR.Client.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.SignalR.Client/) |
| nanoFramework.TestFramework | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.TestFramework.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.TestFramework/) |
| nanoFramework.WebServer | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.WebServer.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.WebServer/) || nanoFramework.DependencyInjection | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.DependencyInjection.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.DependencyInjection/) |
| nanoFramework.Hosting | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.Hosting.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.Hosting/) |

## 支持板级支持包的库

| Class Library | Version |
| --- | --- |
| nanoFramework.M5Stack | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.M5Stack.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.M5Stack/) |
| nanoFramework.M5Stick | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.M5StickC.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.M5StickC/) || nanoFramework.M5StickCPlus | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.M5StickCPlus.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.M5StickCPlus/) |
| nanoFramework.M5Core2 | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.M5Core2.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.M5Core2/) |
| nanoFramework.AtomLite | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.AtomLite.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.AtomLite/) |
| nanoFramework.AtomMatrix | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.AtomMatrix.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.AtomMatrix/) |
| nanoFramework.Fire | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.Fire.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.Fire/) || nanoFramework.MagicBit | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.MagicBit.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.MagicBit/) |

## Distribution Strategy

为了简化类库的发布和更新，我们选择使用NuGet。这种方法还提供了管理依赖项、版本和其他相关任务的额外好处。

对于每个类库，都有一个相应的NuGet包，其中包括程序集和文档文件。NuGet包确保将所需的依赖项和正确的版本添加到托管(c#)项目中，从而使开发人员的工作更加轻松。

## 添加一个新的类库
要将新的类库添加到.NET **nanoFramework**目标映像中，请按照以下步骤进行操作。要添加System.Device.Gpio库，请执行以下步骤：

1. 打开Visual Studio并创建一个针对.NET nanoFramework的C#类库新项目。您可以在[此处](https://github.com/nanoframework/System.Device.Gpio)找到此库的源代码。

2. 在项目中实现所有必要的方法、枚举和属性。建议您在代码中添加XML注释，并在项目属性中启用自动生成文档。

3. 添加NuGet打包项目以分发托管程序集和文档。此外，您可以创建第二个NuGet包，其中包括所有构建工件、生成的存根、转储文件和其他必要的文件，以进行后续项目或构建步骤的自动化测试和分发。

4. 成功构建托管项目后，应在相应文件夹中可用带有存根的骨架。因为.NET nanoFramework旨在独立于目标，所以类库的本机实现可以分为两部分：- `src`文件夹包含声明和公共代码位（始终存在）。这是存根应位于的位置：
  - 公共[System.Device.Gpio](https://github.com/nanoframework/nf-interpreter/tree/main/src/System.Device.Gpio)。
- 特定的实现位是平台相关的，并驻留在每个平台的RTOS文件夹中：
  - ChibiOS [System.Device.Gpio](https://github.com/nanoframework/nf-interpreter/tree/main/targets/ChibiOS/_nanoCLR/System.Device.Gpio)。
  - ESP32 FreeRTOS [System.Device.Gpio](https://github.com/nanoframework/nf-interpreter/tree/main/targets/ESP32/_nanoCLR/System.Device.Gpio)。
  - TI-RTOS [System.Device.Gpio](https://github.com/nanoframework/nf-interpreter/tree/main/targets/TI_SimpleLink/_nanoCLR/System.Device.Gpio)。
  将CMake作为模块合并到模块文件夹[此处](https://github.com/nanoframework/nf-interpreter/tree/develop/CMake/Modules)中。模块的名称应与程序集名称相对应（Find**System.Device.Gpio**.cmake）。请遵循CMake的命名约定：以_Find_开头，后跟模块名称和_cmake_扩展名。System.Device.Gpio模块的CMake可以在[此处](https://github.com/nanoframework/nf-interpreter/blob/main/CMake/Modules/FindSystem.Device.Gpio.cmake)找到。

2. 在CMake的[FindNF_NativeAssemblies.cmake](https://github.com/nanoframework/nf-interpreter/blob/main/CMake/Modules/FindNF_NativeAssemblies.cmake)中，引入一个API选项。选项名称必须遵循API_**命名空间**的模式。System.Device.Gpio的选项是API_System.Device.Gpio。

3. 在CMake [NF_NativeAssemblies.cmake](https://github.com/nanoframework/nf-interpreter/blob/main/CMake/Modules/FindNF_NativeAssemblies.cmake)中，找到“当添加一个新的API时，在下面添加相应的块”，并为API添加一个块。只需复制并粘贴一个现有的块，将名称空间替换为要添加的名称空间。修改CMake预设文件(或多个文件，如果要将其添加到多个目标中)，例如ST_STM32F769I_DISCOVERY[位于这里](https://github.com/nanoframework/nf-interpreter/blob/main/targets/ChibiOS/ST_STM32F769I_DISCOVERY/CMakePresets.json)，以包含相应的选项。要启用System.Device.Gpio示例，请在_cacheVariables_集合中插入以下条目:Gpio": "ON"。

4. 在CMake NF_NativeAssemblies.cmake中，找到文本“WHEN ADDING A NEW API add the corresponding block below”，并为API添加一个块。只需复制并粘贴现有块，将命名空间替换为要添加的命名空间。如果API需要在目标HAL/PAL中激活硬件或SoC外设，则需要对相应文件进行必要的修改。在ChibiOS中的System.Device.Gpio的情况下，不需要激活，因为GPIO子系统始终处于启用状态。相反，对于System.Device.Spi，必须在_halconf.h_文件中启用SPI子系统，并且在驱动程序级别上，必须单独启用SPI外设在_mcuconf.h_中（例如#define STM32_SPI_USE_SPI1 TRUE）。为了简化API及其相关硬件的整体配置，API选项（API_System.Device.Gpio）可以扩展为自动激活HAL子系统，如果适用的话。此功能在System.Device.Spi API中可用。CMake选项反映在通用的CMakeLists.txt中，并可用于CMake和头文件中。此镜像属性称为HAL_USE_SPI_OPTION，定义在此处，而不是通常的单独_halconf.h_文件中。要启用此功能，必须将CMake属性添加到平台的CMake模板文件target_platform.h.in中。

5. 当添加或启用新的API时，根据驱动程序和库的编码方式，可能会向BSS RAM区添加静态变量。由于这些变量所需的额外空间，托管堆的大小可能需要相应调整。要做到这一点，请在目标的通用CMakeLists.txt中找到__clr_managed_heap_size__，并根据需要减小该值。某些API依赖于其他API，例如System.Device.Gpio的情况，需要nanoFramework.Runtime.Events为更改的引脚值生成中断。为了实现这一点，必须在主要的CMakeLists.txt中启用所需的API选项，就像在CMake命令行上启用选项一样。在依赖API的if子句中搜索API_nanoFramework.Runtime.Events，以验证是否已启用该选项。

## 如何将类库集成到构建中

要将类库集成到目标镜像的构建中，您必须将API选项附加到CMake中。例如，在System.Device.Gpio的情况下，选项将是`-DAPI_System.Device.Gpio=ON`。