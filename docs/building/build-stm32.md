# 如何在Windows上使用Visual Studio Code构建、烧录和调试STM32 nanoBooter和nanoCLR

⚠️ 关于构建.NET **nanoFramework**固件的注意事项 ⚠️

只有在您计划调试CLR、解释器、执行引擎、驱动程序、添加新目标或在本机级别上添加新功能时，您才需要构建它。
如果您的目标是使用C#编码，您只需使用[nanoff](https://github.com/nanoframework/nanoFirmwareFlasher)将固件镜像烧录到您的MCU即可。
针对多个目标已提供可直接烧录的固件镜像，请查看[主页](https://github.com/nanoframework/Home#firmware-for-reference-boards)存储库。

## 关于本文档

本文档描述了如何为STM32目标构建.NET **nanoFramework**固件所需的镜像。
构建系统基于CMake工具，以简化在所有主要平台上的开发。

## 使用开发容器

如果您希望使用一种简单高效的方法，我们建议您使用[开发容器](using-dev-container.md)来构建您的镜像。这也有一些要求，如在VS Code中安装Docker Desktop和Remote Container扩展，但已经设置好并准备就绪！

如果您更喜欢在Windows机器上安装所有所需的工具，请继续本教程。

## 先决条件

您需要以下内容：

- [Visual Studio Code](https://code.visualstudio.com/)
- Visual Studio Code扩展
  - [C/C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) - C/C++智能感知、调试和代码浏览（由Microsoft提供）
  - [CMake Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cmake-tools) - Visual Studio Code中的扩展CMake支持（由Microsoft提供）
- [CMake](https://cmake.org/download/)（最低要求版本为3.21）
- 用于生成构建文件的CMake构建系统。我们推荐使用[Ninja](https://github.com/ninja-build/ninja/releases)。
- [GNU ARM嵌入式工具链](https://developer.arm.com/open-source/gnu-toolchain/gnu-rm/downloads)
- OpenOCD。我们建议使用[Microsoft构建](https://github.com/microsoft/openocd)，它提供了一个包含与Azure RTOS配合使用的便捷修复的Windows发行版。
- [ChibiOS](https://www.chibios.org/dokuwiki/doku.php) - 技术上，您不需要下载它，如果您在`CHIBIOS_SOURCE_FOLDER`构建选项中未指定ChibiOS的路径，构建脚本将自动执行此操作（更多信息请参见[此处](#set-up-visual-studio-code)）。

您可以通过[`nf-interpreter`](https://github.com/nanoFramework/nf-inter

preter)项目（克隆或下载）中的`install-scripts`文件夹内的PowerShell脚本`.\install-nf-tools.ps1 -TargetSeries STM32`来安装上述所有内容。如果您愿意，也可以手动安装（出于明显的原因，不推荐手动安装）。

## 概述

为了简化：本指南中，我们将把所有工具和源代码放在易于访问的文件夹中，而不是默认安装路径（您不必采取相同的方式）。

1. 创建以下目录结构：

   - `C:\nftools`
   - `C:\nanoFramework`

1. 下载并安装[Visual Studio Code](http://code.visualstudio.com)。

1. 将[`nf-interpreter`](https://github.com/nanoframework/nf-interpreter)存储库克隆到`C:\nanoFramework\nf-interpreter`。有关更多信息，请参见下一节。

1. 运行位于`install-scripts`文件夹中的PowerShell脚本，该脚本将下载并安装所有所需的工具。
  `.\install-nf-tools.ps1 -TargetSeries STM32 -Path 'C:\nftools'`
   为了获得最佳结果，请在提升的命令提示符中运行该命令，否则设置系统环境变量将失败。
1. 仔细检查并调整多个JSON文件，使其与您的环境匹配（如下文所述进行记录）
1. 重新启动Visual Studio Code（由于json更改）

安装过程比看起来的要简单得多。安装脚本几乎完成了所有工作。

## .NET **nanoFramework** GitHub存储库

如果您打算更改nanoBooter或nanoCLR并创建拉取请求，则需要将[nanoFramework/nf-interpreter](https://github.com/nanoFramework/nf-interpreter)分叉到自己的GitHub存储库，并使用Git客户端（如[GitHub Desktop应用程序](https://desktop.github.com/)）将分叉的GitHub存储库克隆到Windows系统中。

_main_分支是默认的工作分支。当进行修复或尝试新功能时，您应该在自己的分支上进行。有关建议的贡献工作流程的具体说明，请参见[贡献指南](../contributing/contributing-workflow.md#suggested-workflow)。

如果您不打算对nanoBooter和nanoCLR进行任何更改，您可以直接从GitHub克隆[nanoFramework/nf-interpreter](https://github.com/nanoFramework/nf-interpreter)。

确保将此文件夹放置在驱动器的较高位置，以避免触发文件名过长的问题。CMake不支持超过250个字符的文件名。

## 设置构建环境

克隆存储库后，您需要设置构建环境。您可以使用PowerShell脚本或按照逐步说明进行操作。

### 自动

安装构建环境

**以管理员身份运行PowerShell，并运行`set-executionpolicy RemoteSigned`以启用对已签名脚本的执行。**

在Windows上，可以使用存储库`install-scripts`文件夹中的`.\install-nf-tools.ps1`PowerShell脚本来下载/安装CMake、工具链、OpenOCD（用于JTAG调试）和Ninja。您可能需要使用**以管理员身份运行**PowerShell以允许安装模块以解压缩已下载的存档。
该脚本将下载ZIP和安装程序到存储库`zips`文件夹，并将它们解压缩到nanoFramework工具文件夹`C:\nftools`的子文件夹中，或安装该工具。

1. 在存储库的`install-scripts`文件夹中打开PowerShell，并运行该脚本。

示例PowerShell命令行：

```ps
.\install-nf-tools.ps1 -TargetSeries STM32
```

您可以通过在命令行中添加`-Force`来强制更新环境变量。

该脚本将创建以下子文件夹（请参阅下面的手动安装）：

- `C:\nftools`
- `C:\nftools\GNU_Tools_ARM_Embedded\8-2019-q3-update`
- `C:\nftools\ninja`  
- `C:\nftools\hex2dfu`  
- `C:\nftools\openocd`  

将为当前Windows用户创建以下环境变量。

- `NF_TOOLS_PATH = C:\nftools`
- `GNU_GCC_TOOLCHAIN_PATH = C:\nftools\GNU_Tools_ARM_Embedded\8-2019-q3-update`
- `HEX2DFU_PATH = C:\nftools\hex2dfu`
- `NINJA_PATH = C:\nftools\ninja`

## 设置Visual Studio Code

- **步骤1：**安装扩展：
  - [C/C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)
  - [CMake Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cmake-tools)

- **步骤2：**运行位于`install-scripts`文件夹中的PowerShell脚本`Initialize-VSCode.ps1`。这将调整所需的设置，为调试构建启动配置，并设置任务以简化开发工作。

```ps
.\Initialize-VSCode.ps1
```

您可以通过在命令行中添加`-Force`来强制更新环境变量。
PowerShell依赖于上述描述的环境变量，以正确设置各种VS Code工作文件。如果您未使用自动安装并且变量不可用，则必须手动编辑`tasks.json`、`launch.json`和`settings.json`，以替换相关路径。

- **步骤3：**将模板文件（位于`nf-interpreter\config`文件夹中）`user-tools-repos.TEMPLATE.json`复制到一个（新的）名为

`user-tools-repos.json`的文件中。将JSON部分`user-tools-repos-local`重命名为`user-tools-repos`，并调整`user-tools-repos`配置预设中工具和存储库的路径。如果您不打算为特定平台构建，则可以从中简单地删除相关选项。如果您不想使用各种存储库的本地克隆，可以将其设置为`null`。**请务必始终在路径中使用正斜杠（/）！**

- **步骤4：**保存所有打开的文件并退出VS Code。

## 构建nanoCLR

- **步骤1：**从存储库文件夹启动Visual Studio Code，或者在**文件**菜单中加载它，选择**打开文件夹**，并浏览到存储库文件夹。VS Code可能会提示您询问“您是否要配置此项目？”忽略该提示，因为您需要首先选择构建变体。

- **步骤2：**重新打开VS Code。它应该自动加载工作区。在左下角的状态栏中，单击`No Configure Preset Selected`，并从打开的下拉列表中选择要构建的目标。VS Code将自动选择相应的构建预设。有关此内容的更多详细信息，请参阅文档中有关可用目标的文档[此处](../reference-targets/index.md)。

![choose-preset](../../images/building/vs-code-bottom-tolbar-choose-preset.png)

- **步骤3：**在状态栏中点击`Build`或按F7。

- **步骤4：**等待构建完成，输出消息显示`Build finished with exit code 0`。

- **步骤5：**在`build`文件夹中，您将找到以下文件：
  - `nanoBooter.bin`
  - `nanoBooter.elf`
  - `nanoBooter.hex`
  - `nanoCLR.bin`
  - `nanoCLR.elf`
  - `nanoCLR.hex`

>> 注意：如果在构建过程中出现错误，可能会导致`build`文件夹中存在部分构建，并且`CMake/Ninja`构建过程在未创建`.bin`目标的情况下声明成功构建，而`CMake clean`无法帮助解决问题。
在这种情况下，删除`build`文件夹的内容应该允许构建在解决导致原始故障的问题后完成。

### 常见构建问题

如果出现以下情况，可能会导致上述过程出现错误：

- CMake未正确安装，未在PATH中，或由于某种原因无法找到。
- 无法识别Ninja：检查settings.json或您的PATH环境变量，并重新启动Visual Studio Code。
- 未找到COMPILATION对象文件：检查您的路径是否超过了140个字符。将解决方案文件夹放在足够高的驱

动器上。
- 如果您对`CMakePresets.json`或`CMakeUserPresets.json`进行了更改，请重新打开VS Code。

对于大多数构建问题，一个很好的解决方法是手动清理构建文件夹，删除其内容，并重新启动VS Code。

## 烧录STM32目标

有两种方法可以将nanoBooter和nanoCLR镜像烧录到目标设备上。第一种方法使用VS Code中的C/C++工具和OpenOCD。这是在计划调试代码时执行的方式。第二种方法使用来自ST的独立工具，仅将镜像烧录到目标设备中。如果您不打算进行任何调试，则可以使用此方法。

### 在VS Code中启动调试会话

1. 假设您有一个针对已构建目标的有效`launch.json`配置，您可以转到运行部分。
2. 选择与您的目标相对应的nanoBooter的启动配置。
3. 单击“开始调试”（绿色箭头）。
  （这将将nanoBooter烧录到目标的闪存存储器中）
4. 停止调试会话。
5. 选择与您的目标相对应的nanoCLR的启动配置。
6. 单击“开始调试”（绿色箭头）。
  （这将将nanoCLR烧录到目标的闪存存储器中）
7. 停止调试会话。

>注意：每次烧录nanoCLR时，无需重新烧录nanoBooter，因为它不会被擦除。

### 使用STM32CubeProgrammer工具

按照[此处](../stm32/flash-cube-programmer.md)的说明安装STM32CubeProgrammer并将`nanoBooter.hex`和`nanoCLR.hex`镜像烧录到开发板。如果您不打算进行任何调试，也可以不安装此工具，因为所有这些操作都可以由VS Code处理。

## 下一步

请参阅[入门指南](http://docs.nanoframework.net/content/getting-started-guides/getting-started-managed.html)，了解如何在您的nanoFramework板上创建和运行“Hello World”托管应用程序的说明。