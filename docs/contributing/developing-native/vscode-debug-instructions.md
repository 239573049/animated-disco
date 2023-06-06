# 在VS Code中调试.NET **nanoFramework**本地代码的说明

## 关于本文档

本文档描述了如何使用VS Code调试.NET **nanoFramework**本地代码。

## 先决条件

您需要以下工具：

- [GNU ARM嵌入式工具链](https://developer.arm.com/open-source/gnu-toolchain/gnu-rm/downloads)
- [Visual Studio Code](http://code.visualstudio.com/)
- [C/C++扩展](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)
- OpenOCD。建议使用[xPack OpenOCD](https://github.com/xpack-dev-tools/openocd-xpack/releases)，它提供了Windows发行版。

## 准备工作

您需要一个带有调试信息的二进制映像，用于加载到SoC或MCU中。
假设您使用VS Code启动构建过程，您将准备好将此映像加载到MCU中。
（参见[构建说明文档](../../building/build-instructions.md)）

为了启动调试会话，您需要设置位于.vscode文件夹中的*launch.json*文件。
我们提供了一个模板文件`launch.TEMPLATE.json`（位于存储库的.vscode文件夹内），以帮助您开始设置。只需复制它并将其重命名为*launch.json*。

以下是您需要更改的内容，以便将模板文件适应您的设置，并使其更适合您的工作风格和偏好。

- name：在启动调试会话时，您可以为每个启动配置命名，以帮助选择适当的配置。例如：“在Discovery 4中的nanoBooter”，“在Nucleo F091RC中的nanoCLR”，“在Discovery 4中的测试功能XYZ”。
- miDebuggerPath：gdb可执行文件的完整路径（位于GCC工具链文件夹内）
- program：成功构建的.elf输出文件的完整路径
- setupCommands（第四个'text'条目）：最终映像的完整路径（.hex文件）
- setupCommands（第五个'text'条目）：与上述program条目相同的内容（.elf文件）
- debugServerPath：OpenOCD可执行文件的完整路径
- debugServerArgs：OpenOCD安装中脚本目录和适当的.cfg文件的完整路径。

> 注意1：VS Code解析器似乎在解析和替换某些OpenOCD命令的${workspaceRoot}时存在问题。这就是为什么您在那里看到了${workspaceRoot}变量，而在其他地方是该变量应该出现的完整路径。只需使用其中的内容使OpenOCD正常运行即可。
> 注意2：请始终注意上述路径中的正斜杠，否则您将遇到来自OpenOCD的奇怪和不明确的错误。

### 模板

为了使您的生活更加轻松，我们提供了预配置的各种参考目

标的launch.json模板。只需从我们的Gist中获取它们。

- [ST_STM32F4_DISCOVERY](https://gist.github.com/nfbot/560137d32820c5cd3b06e77cb5d9bee7)

- [ST_STM32F429I_DISCOVERY](https://gist.github.com/nfbot/06eadeca52fbed933b4b37a5942661a6)

- [ST_NUCLEO_F091RC](https://gist.github.com/nfbot/827f96ab56d638d2a9806c59fd958112)

- [ST_NUCLEO144_F746ZG](https://gist.github.com/nfbot/11aa07dd11480a23810c58f33f82f499)

- [ST_STM32F769I_DISCOVERY](https://gist.github.com/nfbot/6629a3c37f4351ba793dd5e4e3228ca4)

- [TI_CC3220SF_LAUNCHXL](https://gist.github.com/nfbot/1c088f66b19fb20d45f0aa0656131239)

## 启动调试会话

使用VS Code菜单中的“视图” > “调试”，点击左侧工具栏中的调试图标，或按下CTRL+SHIT+D快捷键，您将进入调试视图。在那里，您将找到我们上面设置的调试启动配置（顶部的下拉菜单）和熟悉的绿色播放按钮（或者如果您更喜欢，可以使用F5）。

当调试会话处于活动状态时，您会发现许多熟悉的内容：

- 调试工具栏，具有常见的操作（暂停、跳过、步入、步出、重启和停止）
- 变量列表
- 可用于上下导航的调用堆栈
- 断点列表，用于管理断点
- 观察表达式
- 支持“鼠标悬停”变量，将显示带有变量内容的上下文
- 通过在行号附近点击来设置/移除断点
- 使用右键单击各种对象可获得其他方便的工具和选项