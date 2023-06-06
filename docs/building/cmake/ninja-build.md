# 使用 Ninja 构建 .NET nanoFramework 固件

## 在 VS Code 中使用 CMake Tools

要设置 CMake 工具以使用 Ninja 进行构建，请按照以下步骤进行操作：

1. 下载并将 Ninja 可执行文件放置在一个文件夹中。
2. 编辑 VS Code 在 .vscode 文件夹中放置的 `settings.json` 文件。
3. 找到一个包含 `"cmake.generator"` 的行。如果没有，请添加以下内容：`"cmake.generator": "Ninja",`
4. 找到一个包含 `"cmake.configureSettings"` 的行。这是设置 Ninja 可执行文件的完整路径的地方。请注意正斜杠的使用。
   如果没有，请添加以下代码块：`"cmake.configureSettings": { "CMAKE_MAKE_PROGRAM": "E:/ninja/ninja.exe" },`

就是这样！按下 <kbd>F7</kbd> 键或单击底部工具栏的 CMake Tools 的构建配置选项。

## 性能比较

进行了一个简单的测试来比较 NMake 和 Ninja 的性能。这是针对启用调试器和 GPIO 的 STM32F429I_DISCOVERY 目标进行的完整构建（nanoBooter 和 nanoCLR）。

| 构建工具 | 构建完成时间 |
| --- |  --- |
| NMake | 3 分 17 秒 |
| Ninja | 1 分 19 秒 |