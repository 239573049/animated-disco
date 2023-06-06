# ST Nucleo 64 F411RE NF

这个社区贡献中使用的开发板是ST的NUCLEO64_F411RE开发板。该开发板可以从不同的来源购买，价格约为20欧元。关于Nucleo64开发板的更多信息可以在[ST官方网站](https://www.st.com)的用户手册UM1724中找到。本文中使用的开发板是c版本，可以在开发板背面的标签上找到。开发板MB1136 C-02被配置为使用ST-LINK MCO作为HSE的时钟输入，因此我们有一个8 MHz的HSE。此外，X2上还安装了一个LSE。这在nanoBooter和nanoCLR路径的mcuconf.h文件中有所体现。如果选择激活LSE作为RTC的更准确时钟，则需要相应地调整board.h文件以使用32768频率的LSE。

串口2 (USART2) 用于通过ST-Link连接器进行通信，因此只需要一个Mini-USB电缆即可启动nanoFramework之旅。

可以使用nanoFramework Firmware Flasher（nanoff）在包管理器控制台中刷入nanoFramework固件。如果您对nanoff不熟悉，请查看[https://github.com/nanoframework/nanoFirmwareFlasher](https://github.com/nanoframework/nanoFirmwareFlasher)获取更多信息。

如果您愿意，仍然可以使用STM32 ST-LINK Utility刷写固件。设备应该在ST-LINK实用程序的Printf通过SWO查看器功能中可见。请设置频率与mcuconf.h中设置的频率相匹配（这里是96000000），然后设置Stimulus端口为0，点击开始。如果开发板没有显示，则可以尝试通过重置（开发板上的黑色按钮）或断开、连接Mini-USB电缆并再次尝试ST-LINK Utility进行电源循环。

在安装了nanoFramework扩展的Visual Studio中，打开设备资源管理器窗口，开发板应该可见。选择开发板并点击设备功能按钮。开发板的详细信息应该显示在输出窗口中。

现在，您可以在nanoFramework世界中开始您的冒险，并使用其中一个示例并根据开发板的特定功能进行调整。尝试自己创建一个示例并发布到例如[Hackster.IO](https://www.hackster.io)，展示您的成就。

为了方便起见，以下是当前设置的功能及其所在的引脚，以帮助您轻松入门。

## Arduino引脚

* D0，D1不能用作串行连接，因为串行连接用于nanoFramework通信。而且默认情况下没有安装所需的焊接桥接。

* D2 - D10可用于GPIO和PWM的混合使用
* D11 - D13已设置并配置为SPI1，但板上的LED（

LD2）也连接到D13，并可能受到影响。在这种情况下，需要移除焊接桥接SB21。
* D14 = I2C1 SDA
* D15 = I2C1 SCL
* A0 = ADC1通道1
* A1 = ADC1通道2
* A2 = ADC1通道3
* A3 = ADC1通道4
* A4 = ADC1通道5
* A5 = ADC1通道6

## 连接器CN7

* 1 = SPI3 SCK
* 2 = SPI3 MISO
* 3 = SPI3 MOSI
* 17 = USART1 TX
* 21 = USART1 RX

## 连接器CN10

* 12 = USART6 RX
* 14 = USART6 TX
* 26 = SPI2 MOSI
* 28 = SPI2 MISO
* 30 = SPI2 SCK

**注意：此配置已在NUCLEO64_F411RE开发板上成功测试。**

## 托管帮助程序

请查看此开发板可用的[C#托管帮助程序](https://github.com/nanoframework/nf-Community-Targets/tree/main/ChibiOS/ST_NUCLEO64_F411RE_NF/managed_helpers)。