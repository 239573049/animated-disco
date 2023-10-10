# C/C++编码风格

对于C/C++文件（*.c，*.cpp和*.h），我们使用clang-format（版本3.10）来确保代码风格的一致性。规则和配置文件已包含在nf-interpreter存储库中。

## 在使用Visual Studio Code时

如果您使用Visual Studio Code，建议您安装[Clang-Format扩展](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)。要使此扩展正常工作，您需要在系统上安装clang-format.exe。

LLVM.org没有为此工具提供单独的安装程序，因此以下是获取它的一种快速而简便的方法。

1. 安装Clang-Format扩展。
2. 从[这里](https://github.com/llvm/llvm-project/releases/)安装LLVM包。
3. 记下您选择安装的路径。
4. 在Visual Studio Code中，打开设置并调整`clang-format.executable`的条目，将其设置为可执行文件的路径。新的设置文件将包含以下类似的条目：

```json
"clang-format.executable": "C:/Program Files/LLVM/bin/clang-format.exe"
```

您的设置可能会稍有不同。只需记住以下内容：添加此设置，将之前复制的路径添加到其中，将其改为正斜杠并在末尾添加**clang-format.exe**。

成功执行以上步骤后，您现在可以右键单击任何C、C++或H文件，然后点击'格式化文档'。VS Code扩展将确保根据编码风格指南正确格式化文档。

安装该扩展后，您可以通过将以下内容添加到您的vscode settings.json文件中，要求VS Code在保存文件时自动格式化：

```json
{
    "editor.formatOnSave": true
}
```

> **警告**：您需要避免在第三方文件（.h和.c和.cpp）上进行自动格式化，因为格式化可能会引入许多无价值的更改，并且在稍后与原始文件或模板文件进行比较时会变得非常困难，特别是当外部第三方软件更新时。

您可以在不希望重新格式化的代码周围关闭和打开clang自动格式化。

通常，在版权声明下方的文件顶部，使用以下方式关闭clang格式化：

```c
// clang-format off
```

在文件末尾，请不要忘记重新打开它：

```c
// clang-format on
```

## 在使用Visual Studio时

如果您使用Visual Studio，建议您安装[ClangFormat扩展](https://marketplace.visualstudio.com/items?itemName=LLVMExtensions.ClangFormat)。