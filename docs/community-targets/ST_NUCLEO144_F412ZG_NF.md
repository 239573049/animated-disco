# ST Nucleo F412ZG

![F12ZG](https://www.st.com/bin/ecommerce/api/image.PF262641.en.feature-description-include-personalized-no-cpn-medium.jpg)

这个社区贡献中使用的开发板是ST的NUCLEO144_F412ZG板。该开发板可以从多个渠道购买，价格约为20欧元。关于Nucleo144开发板的更多信息可以在ST官方网站的用户手册UM1727或UM1974中找到，网址为[ST官网](https://www.st.com)。

以下是从ST官方提取的一些基本信息：

- STM32F412ZGT6 100MHz的Cortex-M4F内核微控制器，具有1MB闪存和256KB SRAM
- 自适应实时加速器（ART Accelerator™），允许从闪存执行时无等待状态
- 可通过ST Zio连接器（支持Arduino Uno v3连接）完全访问所有GPIO
- ST morpho扩展引脚头，用于访问所有GPIO
- 带有SWD连接器的ST-LINK/V2-1调试器/编程器
- 最多17个串行通信接口：USART、IrDA、I²C、SPI、LIN、CAN、USB、I²S、SDIO
- 灵活的板级电源
- 带有micro-AB连接器的USB OTG或FS设备
- 真随机数发生器
- CRC计算单元
- 具有亚秒精度和硬件日历的RTC
- 96位唯一ID
- 3个LED：电源LED、USB通信LED、用户LED
- 用户和复位按钮
- 32.768 KHz晶振

由于该开发板有两个MicroUSB连接器，因此您可以使用其中一个用于烧录nanoFramework固件和与ST Link进行调试，另一个用于与VS连接，被识别为nanoFramework设备以运行C#托管应用程序。

## 托管帮助程序

请查看适用于该开发板的[C#托管帮助程序](https://github.com/nanoframework/nf-Community-Targets/tree/main/ChibiOS/ST_NUCLEO144_F412ZG_NF/managed_helpers)。