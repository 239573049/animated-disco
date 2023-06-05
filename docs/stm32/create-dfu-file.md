# 如何创建一个 .dfu 文件

要使用ST DFUSE工具手动刷写固件，请获取[ST DFUSE工具](https://www.st.com/en/development-tools/stsw-stm32080.html)的副本。

- 安装DFUSE工具
- 下载设备固件更新的 .zip 文件
- 重复上述步骤1

## 第一步

- 定位设备的 Device_BlockStorage.c 文件。
  - 例如，Netduino 3 文件位于[这里](https://github.com/nanoframework/nf-Community-Targets/blob/main/ChibiOS/NETDUINO3_WIFI/common/Device_BlockStorage.c)。
- 查找 BlockRegionInfo 段的起始地址和每个块的字节数。

示例：

```c
const BlockRegionInfo BlockRegions[] =

{
    {
        0x08000000,                         // 块区域的起始地址
        4,                                  // 此区域中的总块数
        0x4000,                             // 每个块的总字节数
        ARRAYSIZE_CONST_EXPR(BlockRange1),
        BlockRange1,
    },
}
```

- 启动 STDFU 文件管理器，选择 "I want to generate a .dfu file ...." 单选按钮。
- 选择 "Muti BIN" 按钮，然后从固件更新的 .zip 文件中选择 nanoBooter.bin 文件。将上述的起始地址输入到 "Address" 文本框中。示例：8000000。
- 点击 "Add to List" 按钮。
- 接下来选择 nanoCLR.bin 文件。将起始地址 + 每个块的字节数输入到 "Address" 文本框中。示例：804000。
- 点击 "Add to List" 按钮。
- 点击 "Generate" 按钮。

## 第二步

- 启动 DFUSE演示应用程序。
- 找到上述生成的 .dfu 文件。
- 点击 "Choose" 按钮，然后点击 "Update" 按钮。
- 切换设备的电源。
- 完成，我们完成了！
