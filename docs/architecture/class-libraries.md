## Class Libraries

### About this document

This document outlines the design and organization of the .NET **nanoFramework** Class Libraries, providing insight into the decision-making process behind their creation and instructions on how to add a new Class Library. The examples below are related to ChibiOS, which currently serves as the reference implementation for .NET **nanoFramework**.

### Libraries

Below is a list of the existing libraries, along with their respective NuGet packages and CMake enable options:

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

## Other libraries

| Class Library | Version |
| --- | --- |
| AMQP Net Lite | [![NuGet](https://img.shields.io/nuget/v/AMQPNetLite.nanoFramework.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/AMQPNetLite.nanoFramework/) ||AMQP Net Lite (micro) | [![NuGet](https://img.shields.io/nuget/v/AMQPNetMicro.nanoFramework.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/AMQPNetMicro.nanoFramework/) |
| nanoFramework.Azure.Devices | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.Azure.Devices.Client.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.Azure.Devices.Client/) |
| nanoFramework.Aws.IoTCore.Devices | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.Aws.IoTCore.Devices.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.Aws.IoTCore.Devices/) |
| nanoFramework.Logging | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.Logging.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.Logging/) |

The above table displays the latest versions of various nanoFramework packages available on NuGet. These include AMQP Net Lite (micro), nanoFramework.Azure.Devices, nanoFramework.Aws.IoTCore.Devices, and nanoFramework.Logging. You can click on the NuGet icon to access the respective package on the NuGet website.| nanoFramework.Json | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.Json.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.Json/) |
| nanoFramework.m2mqtt | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.m2mqtt.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.m2mqtt/) |
| nanoFramework.SignalR.Client | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.SignalR.Client.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.SignalR.Client/) |
| nanoFramework.TestFramework | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.TestFramework.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.TestFramework/) |
| nanoFramework.WebServer | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.WebServer.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.WebServer/) || nanoFramework.DependencyInjection | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.DependencyInjection.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.DependencyInjection/) |
| nanoFramework.Hosting | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.Hosting.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.Hosting/) |

## Libraries for Board Support Packages

| Class Library | Version |
| --- | --- |
| nanoFramework.M5Stack | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.M5Stack.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.M5Stack/) |
| nanoFramework.M5Stick | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.M5StickC.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.M5StickC/) || nanoFramework.M5StickCPlus | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.M5StickCPlus.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.M5StickCPlus/) |
| nanoFramework.M5Core2 | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.M5Core2.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.M5Core2/) |
| nanoFramework.AtomLite | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.AtomLite.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.AtomLite/) |
| nanoFramework.AtomMatrix | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.AtomMatrix.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.AtomMatrix/) |
| nanoFramework.Fire | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.Fire.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.Fire/) || nanoFramework.MagicBit | [![NuGet](https://img.shields.io/nuget/v/nanoFramework.MagicBit.svg?label=NuGet&style=flat&logo=nuget)](https://www.nuget.org/packages/nanoFramework.MagicBit/) |

## Distribution Strategy

To simplify the distribution and updating of class libraries, we have opted to use NuGet. This approach offers the added benefit of managing dependencies, versions, and other related tasks.

For each class library, a corresponding NuGet package is available, which includes the assembly and documentation files. The NuGet package ensures that the required dependencies and correct versions are added to a managed (C#) project, thereby making the developer's life much easier.

## Adding a New Class Library

To add a new class library to a .NET **nanoFramework** target image, follow the procedure below.To add the System.Device.Gpio library, follow these steps:

1. Open Visual Studio and create a new project for a C# Class library targeting .NET nanoFramework. You can find the source code for this library [here](https://github.com/nanoframework/System.Device.Gpio).

2. Implement all the necessary methods, enums, and properties in the project. It is recommended that you add XML comments to your code and enable automated documentation generation in the project properties.

3. Add a NuGet packaging project to distribute the managed assembly and documentation. Additionally, you can create a second NuGet package that includes all build artifacts, generated stubs, dump files, and other necessary files for automated testing and distribution of follow-up projects or build steps.

4. After successfully building the managed project, the skeleton with the stubs should be available in the respective folder. Because .NET nanoFramework aims to be target-independent, the native implementation of a class library can be split into two parts:- The `src` folder contains the declaration and common code bits (which are always present). This is where the stubs should be located:
  - The common [System.Device.Gpio](https://github.com/nanoframework/nf-interpreter/tree/main/src/System.Device.Gpio).
- The specific implementation bits that are platform dependent and reside within each platform's RTOS folder:
  - ChibiOS [System.Device.Gpio](https://github.com/nanoframework/nf-interpreter/tree/main/targets/ChibiOS/_nanoCLR/System.Device.Gpio).
  - ESP32 FreeRTOS [System.Device.Gpio](https://github.com/nanoframework/nf-interpreter/tree/main/targets/ESP32/_nanoCLR/System.Device.Gpio).
  - TI-RTOS [System.Device.Gpio](https://github.com/nanoframework/nf-interpreter/tree/main/targets/TI_SimpleLink/_nanoCLR/System.Device.Gpio).1. Incorporate CMake as a module into the modules folder [here](https://github.com/nanoframework/nf-interpreter/tree/develop/CMake/Modules). The module's name should correspond to the assembly name (Find**System.Device.Gpio**.cmake). Please adhere to CMake's naming conventions: begin with _Find_, followed by the module name, and the _cmake_ extension. The CMake for the System.Device.Gpio module can be found [here](https://github.com/nanoframework/nf-interpreter/blob/main/CMake/Modules/FindSystem.Device.Gpio.cmake).

2. Within the CMake [FindNF_NativeAssemblies.cmake](https://github.com/nanoframework/nf-interpreter/blob/main/CMake/Modules/FindNF_NativeAssemblies.cmake), introduce an option for the API. The option name must follow the pattern API_**namespace**. The option for System.Device.Gpio is API_System.Device.Gpio.

3. In the CMake [NF_NativeAssemblies.cmake](https://github.com/nanoframework/nf-interpreter/blob/main/CMake/Modules/FindNF_NativeAssemblies.cmake), locate the text `WHEN ADDING A NEW API add the corresponding block below` and append a block for the API. Simply copy and paste an existing block, replacing the namespace with the one you are adding.1. Revise the CMake presets file (or files, if this is to be added to multiple targets), such as for the ST_STM32F769I_DISCOVERY [located here](https://github.com/nanoframework/nf-interpreter/blob/main/targets/ChibiOS/ST_STM32F769I_DISCOVERY/CMakePresets.json), to incorporate the corresponding option. To enable the System.Device.Gpio example, insert the following entry into the _cacheVariables_ collection: "API_System.Device.Gpio" : "ON".

2. If the API necessitates the activation of hardware or SoC peripherals in the target HAL/PAL, make the necessary modifications to the appropriate files. In the case of System.Device.Gpio in ChibiOS, no activation is required since the GPIO subsystem is always enabled. Conversely, for System.Device.Spi, the SPI subsystem must be enabled in the _halconf.h_ file and, at the driver level, the SPI peripherals must be individually enabled in _mcuconf.h_ (e.g. `#define STM32_SPI_USE_SPI1 TRUE`).To simplify the overall configuration of an API and its related hardware, the API option (API_System.Device.Gpio) can be expanded to automatically activate the HAL subsystem, if it is appropriate. This feature is available in the System.Device.Spi API. The CMake option is reflected in the general [CMakeLists.txt](https://github.com/nanoframework/nf-interpreter/blob/main/CMakeLists.txt) and can be used in CMakes and headers. This mirrored property is called `HAL_USE_SPI_OPTION`. It is defined here, rather than in the individual _halconf.h_ files as usual. To enable this feature, the CMake property must be added to the CMake template file of the platform [target_platform.h.in](https://github.com/nanoframework/nf-interpreter/blob/main/targets/ChibiOS/_nanoCLR/target_platform.h.in).

2. When adding or enabling new APIs, static variables may be added to the BSS RAM area, depending on how the drivers and library are coded. Due to the additional space required by these variables, the size of the Managed Heap may need to be adjusted accordingly. To do this, locate `__clr_managed_heap_size__` in the general CMakeLists.txt of the target and decrease the value as needed.1. Certain APIs are dependent on others, such as the case with System.Device.Gpio, which necessitates nanoFramework.Runtime.Events to generate interrupts for altered pin values. To achieve this, the option to incorporate the required API(s) must be enabled in the primary [CMakeLists.txt](https://github.com/nanoframework/nf-interpreter/blob/main/CMakeLists.txt) within the if clause of the dependent API, as if the option was enabled at the CMake command line. Verify this by searching for `API_nanoFramework.Runtime.Events` within the `if(API_System.Device.Gpio)`.

## How to integrate a class library into the build

To integrate a class library into the build for a target image, you must append an option for the API to the CMake. For instance, in the case of System.Device.Gpio, the option would be `-DAPI_System.Device.Gpio=ON`.