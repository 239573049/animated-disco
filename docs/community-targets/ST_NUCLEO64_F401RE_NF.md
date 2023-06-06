# ST Nucleo 64 F401RE NF

![ST Nucleo 64_F401RE NF](https://www.st.com/bin/ecommerce/api/image.PF260000.en.feature-description-include-personalized-no-cpn-medium.jpg)

本社区贡献所使用的开发板是ST的NUCLEO64_F401RE开发板。该开发板可以从各种渠道购买，价格约为20欧元。关于Nucleo64开发板的更多信息可以在[ST网站](https://www.st.com)的用户手册UM1724中找到。此处使用的开发板版本为c，可以在开发板背面的贴纸上找到。开发板MB1136 C-02被配置为使用ST-LINK MCO作为HSE的时钟输入，因此我们有一个8 MHz的HSE。此外，还安装了X2，因此我们也有一个LSE。这在mcuconf.h文件的nanoBooter和nanoCLR路径中体现出来。如果选择激活LSE，作为RTC的更准确时钟，需要相应地调整board.h文件，使用32768频率的LSE。

我准备了一个自制的4线跳线到USB电缆，通过剪掉一端（Type A部分）并确定所需的D+、D-、5V和GND来制作。连接如下：

USB V5  ->  可以忽略
USB GND ->  CN7上的GND
USB D-  ->  CN10上的PA11（顶部第7个从上开始的外排针脚）
USB D+  ->  CN10上的PA12（顶部第6个从上开始的外排针脚）

连接完成后，使用STM32 ST-LINK Utility刷入nanoFramework后，设备应该可以在ST-LINK实用程序的Printf via SWO查看器功能中显示。请将频率设置为与mcuconf.h中设置的频率匹配（对于STM32F401RE，为84MHz），将Stimulus端口设置为0，然后点击开始。如果开发板没有显示，则需要进行复位（开发板上的黑色按钮）。

现在，您可以启动Visual Studio，并在设备资源管理器窗口中查看开发板，它也应该在那里显示。选择开发板（如果尚未选择）并点击设备功能按钮，然后可以在输出窗口中查看开发板的详细信息。

现在，您可以在nanoFramework世界中展开您的冒险，并使用其中一个示例并根据开发板的特定功能进行调整。尝试自己制作一个示例，并将其发布在[Hackster.IO](https://www.hackster.io)，以展示您的成果。

为了方便起见，我在下面列出了开发板上的特性及其对应的引脚，以帮助您轻松入门。

## Arduino引脚

* D0 = COM2 RX
* D1 = COM2 TX
* D

2 - D9  可以用于GPIO和PWM的混合使用
* D14 = I2C1 SDA
* D15 = I2C1 SCL
* A0 - A5 用于模拟信号，请注意MCU只有一个12位ADC。

## 连接器CN7

* 1 = SPI3 SCK
* 2 = SPI3 MISO
* 3 = SPI3 MOSI

## 连接器CN10

* 26 = SPI2 MOSI
* 28 = SPI2 MISO
* 30 = SPI2 SCK

**注意：该配置在NUCLEO64_F401RE开发板上经过了成功测试。**

## 托管辅助工具

请查看此开发板可用的[C#托管辅助工具](https://github.com/nanoframework/nf-Community-Targets/tree/main/ChibiOS/ST_NUCLEO64_F401RE_NF/managed_helpers)。