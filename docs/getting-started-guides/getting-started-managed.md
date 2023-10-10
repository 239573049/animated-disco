# C#托管代码入门指南

.NET **nanoFramework**允许编写嵌入式设备的托管代码应用程序。无论您是经验丰富的.NET开发人员还是刚刚开始并想尝试一下，都可以使用它。

本入门指南将引导您完成设置开发环境的过程，以便您可以很快编写一个简单的 "Hello World" 应用程序！

您可以在我们的YouTube频道上找到此指南的视频 [链接](https://youtu.be/iZdN2GmefXI)。

不确定在哪里购买设备？请查看 [此页面](where-to-buy-devices.md)！

## 安装和配置Visual Studio 2022

第一部分是获取Visual Studio 2022（也支持VS 2019）以及.NET **nanoFramework**扩展的安装。

>**警告**：我们的扩展与当前的VS2022和VS2019版本保持同步并进行维护。通常，只有最新版本的Visual Studio才能得到支持。如果在安装扩展时遇到困难，请检查您是否使用了最新版本的VS.NET。如果需要针对特定VS版本的旧版本，您可以从 [GitHub存储库](https://github.com/nanoframework/nf-Visual-Studio-extension/releases) 下载它。

![安装Visual Studio扩展](../../images/getting-started-guides/getting-started-extension-installation.gif)

1. **下载Visual Studio**  
   如果您已经安装了Visual Studio，可以跳过此步骤。如果没有，请下载免费的 [Visual Studio Community](https://www.visualstudio.com/downloads) 版本。
   确保安装了 **.NET桌面开发** 和 **.NET Core跨平台开发** 的 **工作负载**。

2. **安装Visual Studio上的_.NET nanoFramework_扩展**  
   启动Visual Studio（从现在开始我们将简称为VS），然后安装 **nanoFramework** 扩展。  
   您可以通过选择 **Extensions > Manage Extensions** 菜单来完成此操作，这将打开 **Manage Extensions** 对话框。在左侧选择 **Online** 节点，然后在 **搜索** 框中输入 **_nanoFramework_**。

3. 您将被提示要求 **重新启动Visual Studio** 以完成扩展的安装

## 使用nanoFirmwareFlasher将固件上传到开发板

第二部分是将.NET **nanoFramework**映像加载到开发板的闪存中。最好的方法是使用 [nano Firmware Flasher（nanoff）](https://github.com/nanoframework/nanoFirmwareFlasher) 工具。这是一个.NET Core CLI命令工具。

您需要知道连接到设备的COM端口。搜索 **计算机管理**，选择 **设备管理器**，然后展开 **端口（COM和LPT）**，您将找到已连接设备的COM端口。

> 重要提示：您可能需要安装驱动程序。请参考供应商网站或使用Windows更新安装驱动程序的最新版本。

![查找COM端口](../../images/getting-started-guides/getting-started-find-com-port.gif)

> 注意
>
> - 必须安装 [.NET 6.0运行时（或.NET 6.0 SDK）](https://dotnet.microsoft.com/download)

![安装nanoff和刷写](../../images/getting-started-guides/getting-started-install-nanoff-flash-esp32.gif)

1. **安装 [nanoff](https://github.com/nanoframework/nanoFirmwareFlasher)**

    ```console
    dotnet tool install -g nanoff
    ```

2. 通过向nano Firmware Flasher提供目标名称来执行更新。必须使用官方名称（可以是参考板或社区板），否则工具无法猜测连接的是哪个开发板。
（以下包括几种平台的目标的描述，以确保完整性）

    - 更新连接到COM31的ESP32目标的固件到最新版本。

        ```console
        nanoff --platform esp32 --serialport COM31 --update
        ```

    - 更新通过JTAG（ST-Link）连接的ST开发板（例如ST_NUCLEO144_F746ZG）的固件到最新版本。

        ```console
        nanoff --target ST_NUCLEO144_F746ZG --update
        ```

    - 要更新通过DFU（如NETDUINO3）连接的ST开发板的固件，您首先需要将开发板置于DFU模式。这可以通过按下一定组合的按钮来实现。这取决于您使用的特定硬件。

        ```console
        nanoff --target NETDUINO3_WIFI --update --dfu
        ```

    - 注意：要列出可用的串行端口，您可以使用以下命令：

        ```console
        nanoff --listports
        ```

3. **上传完成后**，MCU将被重置，并且nanoCLR映像将运行。您可以通过查看 **Visual Studio** 中的 **Device Explorer** 窗口来检查开发板是否正常运行.NET **nanoFramework**。

4. 现在打开 **Device Explorer** 窗口，方法是选择菜单 **View > Other Windows > Device Explorer**。

## 编写 'Hello World' 应用程序

现在，您已经具备了开始编写第一个应用程序所需的一切。让我们开始编写一个经典的微控制器模式下的 'Hello World'，也就是闪烁LED，好吗？

![我的第一个项目](../../images/getting-started-guides/getting-started-first-project.gif)

1. 返回Visual Studio，选择 **File > New > Project** 菜单，以打开 **创建新项目** 对话框。  
   1. 在 **Search for templates** 搜索框中输入 **nanoFramework**。
   2. 选择 **Blank Application (nanoFramework)** 模板，然后点击 **Next** 按钮。
   3.

 给项目命名并选择项目文件将保存的位置，然后点击 **Create** 按钮。  
   4. 项目将被创建并打开。

2. 我们将编写一个 **非常简单的应用程序**，该应用程序进入无限循环并 **打开和关闭LED**。我们将跳过细节，因为这不是本指南的目的。让我们从.NET [**nanoFramework**示例](https://github.com/nanoframework/Samples/tree/master/samples/Blinky) 存储库中获取 `Blinky` 代码。确保使用正确的GPIO引脚。这是在提到STM32F746 NUCLEO板的注释下面的一行。如果您不知道要使用哪个引脚，只需在您首选的搜索引擎中输入 "ESP32 led引脚编号" - 假设您正在使用ESP32设备。如果不是，请使用您拥有的设备的名称更换ESP32。

3. 因为我们要使用GPIO，所以我们需要引入并在项目中引用该类库。这些类库通过NuGet分发。要添加这个类库，请右键单击 **Solution Explorer** 中的 **References**，然后点击 **Manage NuGet Packages**。在搜索框中键入 **nanoFramework**。确保已选中 **preview复选框**。找到 `nanoFramework.System.Device.Gpio` 包并点击 **Install**。在确认许可证对话框后，将下载该包并添加对其的引用。您会注意到，在VS中不再显示未知引用提示。

4. 您还应确保在进行下一步之前更新 `mscorlib` 包。要更新此类库，请右键单击 **Solution Explorer** 中的 **References**，然后点击 **Manage NuGet Packages**。在窗口顶部，点击 **Updates**，确保您选中了 **Include Prerelease** 复选框。然后点击 **Select All**，进行更新。

5. 从 **Build** 菜单中选择 **Build Solution**。构建窗口中将显示成功消息。

6. 我们已经快要完成了。进入 **Device Explorer** 窗口，点击显示的.NET **nanoFramework** 设备。通过点击 **Ping** 按钮来确保连接正常。成功后，输出窗口将显示消息。<BR/><BR/>
对于一些STM32设备，您可能需要两根USB电缆。例如，STM32429I-Discovery有一个标有USB-STLINK的迷你USB连接器，它为设备供电并提供了用于刷写固件和/或运行用于调试本地C++代码的JTAG调试器（在VSCode或其他C++ IDE中）的USB接口。micro-USB连接器标有USB-USER，并提供了由 **Visual Studio nanoFramework Extension** 用于调试C#应用程序代码和 **Device Explorer** 的COM/串行接口。对于该设备，必须将两根电缆都插入计算机的USB端口。

7. 让我们将应用程序部署到开发板。为此，请右键单击项目名称，然后选择 **Deploy**。您将在 **输出窗口** 中看到后台运行的几个操作的反馈。成功部署后，您需要重置目标，您的 `Hello World` 闪烁应用程序将开始运行，并且LED开始闪烁！如果您愿意，您可以选择启动 **调试会话**，为此在Visual Studio中按下 <kbd>F5</kbd>（与往常一样）并观看它运行。

## 故障排除

有关一些常见问题的解决方案，请参阅此指南：[入门故障排除指南](trouble-shooting-guide.md)

## 总结

恭喜！这是您的第一个在目标板上执行的.NET **nanoFramework** C#应用程序。多么令人兴奋啊！

至此，入门指南就告一段落了。

您已经完成了安装Visual Studio、.NET **nanoFramework** 扩展和ST-LINK实用程序所需的步骤。

您还学会了如何将.NET **nanoFramework** 固件映像上传到目标板。最后但同样重要的是，学会了如何编写一个简单的 'Hello World' C# 应用程序并将其部署到目标板。

请查看其他指南和教程。您还可以加入我们的 [Discord频道](https://discordapp.com/invite/gCyBu8T)，在那里您将找到一个支持性的社区，可以讨论您的想法，并在遇到问题时提供帮助。