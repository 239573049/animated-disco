# 构建 .NET nanoFramework 固件

.NET nanoFramework 构建系统基于 CMake。请阅读针对每个目标系列的特定说明。

- [STM32](build-stm32.md)
- [ESP32](build-esp32.md)
- [NXP](build-nxp.md)
- [使用 Dev Container](using-dev-container.md)

⚠️ 关于构建 .NET nanoFramework 固件的注意事项 ⚠️

只有在您计划调试 CLR、解释器、执行引擎、驱动程序、添加新目标或在本地层面上添加新功能时，才需要构建它。
如果您的目标是使用 C# 编写代码，您只需使用 [nanoff](https://github.com/nanoframework/nanoFirmwareFlasher) 将适当的固件映像刷写到您的微控制器（MCU）中。
对于多个目标，可以使用现成的固件映像进行刷写，请参阅 [Home](https://github.com/nanoframework/Home#firmware-for-reference-boards) 存储库。

## 关于本文档

本文档描述了如何构建 .NET nanoFramework 固件所需的映像，以刷写到 SoC 或 MCU 中。
构建基于 CMake 工具，以简化在所有主要平台上的开发过程。

## 使用 Dev Container

如果您希望使用一种简单高效的方法，我们建议您使用 [Dev Container](using-dev-container.md) 来构建映像。这也需要一些先决条件，例如 Docker Desktop 和 VS Code 中的 Remote Container 扩展，但它已经配置好并且可以直接运行！

如果您更喜欢在 Windows 计算机上安装所有所需的工具，您应该继续阅读本教程。

## 先决条件

您将需要：

- [GNU ARM 嵌入式工具链](https://developer.arm.com/open-source/gnu-toolchain/gnu-rm/downloads)
- [CMake](https://cmake.org/)（要求的最低版本是 3.23）
- 用于生成构建文件的 CMake 构建工具。我们推荐使用 [Ninja](https://github.com/ninja-build/ninja)。这是一个轻量级的构建系统，专为速度而设计，在 Windows 和 Linux 机器上都可以运行。请查看 [这里](cmake/ninja-build.md) 如何设置 Ninja 来构建 .NET nanoFramework。

如果您使用 VS Code 作为开发平台，我们建议您使用 CMake Tools 扩展。这将允许您在不离开 VS Code 的情况下运行构建。

- [Visual Studio Code](http://code.visualstudio.com/)
- [CMake 扩展](https://marketplace.visualstudio.com/items?itemName=twxs.cmake)
- [CMake Tools 扩展](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cmake-tools)

如果您指定了一个 RTOS，并且希望从官方存储库下载

其源代码，您将需要：

- 对于 ChibiOS，需要一个 SVN 客户端。[Tortoise SVN](https://tortoisesvn.net/downloads.html) 是 Windows 计算机上的一个常见选择。
- 对于所有其他存储库，需要一个 Git 客户端。[Fork](https://git-fork.com/) 是一个功能丰富的可视化 Git 客户端，或者 [GitHub Desktop](https://desktop.github.com/) 是 Windows 计算机上的一个常见选择。

## 准备工作

强烈建议在源代码树之外运行构建。这样可以避免在源代码树中生成 CMake 构件、临时文件等。
实际上，CMake 脚本会强制执行并检查此操作。

如果需要清理或开始全新的构建，您只需简单地删除构建目录中的所有内容。

作为建议，我们建议您在存储库根目录中创建一个名为“build”的目录，并从那里运行 CMake。

## 构建 .NET nanoFramework 固件映像

构建脚本接受一些参数（其中一些是必需的）。请在[此处](cmake-presets.md)查看每个参数的详细信息。

> 注意 1：目前支持的 RTOS（除了 ESP32 目标）是 STM32 目标的 ChibiOS、NXP 的 FreeRTOS 和 TI 目标的 TI-RTOS。如果未指定源路径，则源文件将从 nanoFramework GitHub 分支下载。
> 注意 2：第一次构建将根据构建运行的机器的互联网连接的下载速度需要更多或更少的时间。这是因为将从其存储库下载您选择的 RTOS 的源代码。在后续的构建中，不会发生这种情况。

您可以指定任何在正在构建的平台上支持的生成器。有关更多信息，请查看 CMake 文档 [此处](https://cmake.org/cmake/help/v3.23/manual/cmake-generators.7.html?highlight=generator)。

## 从命令提示符中进行构建

如果您是从命令提示符中进行构建，请转到存储库根文件夹，并在那里使用适当的参数运行 CMake。
以下是一个可行的示例：

```text
cmake --preset ST_NUCLEO_F091RC
cmake --build --preset ST_NUCLEO_F091RC
```

这将调用 CMake，并使用该配置预设从头构建 ST_NUCLEO_F091RC 目标。假设您之前已经调整了 CMakeUserPresets.json 文件中的工具路径。

缓存变量中的任何构建选项都可以从命令行界面中进行覆盖，就像下面的示例中设置 TOOLCHAIN_PREFIX 一样：

```text
cmake --preset ST_NUCLEO144_F746ZG -DTOOLCHAIN_PREFIX="E:/GNU_Tools_ARM_Embedded/10.3-2021.10"
cm

ake --build --preset ST_NUCLEO144_F746ZG
```

成功完成后，您将获得构建文件，可以在目标构建工具中使用。

## 从 VS Code 中进行构建（使用 CMake Tools 扩展）

我们已经添加了所需的文件和配置，以帮助您在 VS Code 中启动构建。以下是您可能希望调整的文件的简要说明。

- settings.json（位于 .vscode 文件夹中）在这里，您可以更改 CMake 用于生成构建的生成器。默认值为 ```"cmake.generator": "NMake Makefiles"```。建议使用 Ninja 作为构建工具，因为它比 NMake 更快。
- launch.json（位于 .vscode 文件夹中）在这里，您可以设置启动配置，如 gdb 路径或 OpenOCD 配置。我们提供了针对多个参考目标的 launch.json 的 Gists。您可以从[这里](https://gist.github.com/nfbot)获取适合您的配置。:warning: 根据您的设置和计算机配置更新路径和其他首选项。 :wink:
- CMakeUserPresets.TEMPLATE.json（位于存储库根目录）。您应该将其复制为 CMakeUserPresets.json。除了调整路径以指向您在本地安装工具的位置外，您还可以调整构建选项、添加新的构建配置并覆盖默认配置。查看[此处](https://github.com/microsoft/vscode-cmake-tools/blob/main/docs/cmake-presets.md)的文档。**！！请始终在路径中使用正斜杠！！**
:warning: 根据您的设置和计算机配置更新路径和其他首选项。 :wink:

要在 VS Code 中启动构建，请检查底部的状态栏。选择您想要配置的预设，并单击构建按钮（或按下 <kbd>F7</kbd>）。

![choose-preset](../../images/building/vs-code-bottom-tolbar-choose-preset.png)

## .NET nanoFramework 固件构建成果物

成功构建后，您可以在 *build* 目录中找到 .NET nanoFramework 映像文件。这些文件包括：

- nanoBooter 映像（ESP32 构建不可用）：

  - nanoBooter.bin（原始二进制格式）
  - nanoBooter.hex（Intel hex 格式）
  - nanoBooter.lst（源代码列表与反汇编混合）
  - nanoBooter.map（映像地图）

- nanoCLR 映像：

  - nanoCLR.bin（原始二进制格式）
  - nanoCLR.hex（Intel hex 格式）
  - nanoCLR.lst（源代码列表与反汇编混合）
  - nanoCLR.map（映像地图）

## BUILD_VERSION 匹配

当使用自建的 nanoCLR 时，您在部署新应用程序时可能会收到以下消息：

```text
Found assemblies mismatches when checking for deployment pre-check.
```

这是因为您自定义构建的 nanoCLR 的 BUILD_VERSION 值与 nan

oframework.CoreLibrary 期望的值不匹配。
`BUILD_VERSION` 可以在文件 `CMakeUserPresets.json` 中设置。该值默认为 `"0.9.99.999"`。您可以根据当前需要将其更改为所需的版本，例如 `"1.6.1.28"`。

不要忘记：

- 在适当的目标块下进行更改，如[此处](cmake-presets.md)所述
- 重新选择 CMake 目标（VSCode 底部一行）以重新配置构建。
- 最好运行 CMake 命令：'删除缓存并重新配置'，以使更改生效。