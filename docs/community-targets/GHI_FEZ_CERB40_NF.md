# GHI FEZ CERBb40 NF

![GHI FEZ CERB40](https://github.com/nanoframework/nf-Community-Targets/blob/main/ChibiOS/GHI_FEZ_CERB40_NF/resources/cerb40.jpg?raw=true)

-----

## 开发板介绍

这里使用的开发板是基于STM32F405RGT6的GHI Fez Cerb40，支持1MB Flash和最多192KB RAM，采用LQFP64封装。在这个开发板上，LSE（低速外部时钟）已经焊接，如果您的板子上没有LSE，请确保在nanoBooter和nanoCLR的mcuconf.h文件中正确配置它。

可用的引脚已经在board.h文件中设置，您可以在那里设置您所需的引脚用途。访问官方网站[此处](http://www.st.com/content/st_com/en/products/microcontrollers/stm32-32-bit-arm-cortex-mcus/stm32-high-performance-mcus/stm32f4-series/stm32f405-415/stm32f405rg.html)并查看数据手册中的表格9. 备用功能映射，您将找到各个引脚的可能替代用途。在初始版本中，已经验证了以下引脚配置和用途。从上方（MCU可见）看板子，并且USB连接器在顶部，我们的1号引脚位于左侧。

| PCB引脚 | MCU | 用途 | 注释 | 日期 |
|:---|---|---|---|---|
| 01 | VCC | 3.3V | | |
| 02 | GND | | | |
| 03 | PA8 | | | |
| 04 | PA13 | | | |
| 05 | PA7 | SPI1 MISO | | |
| 06 | PA6 | SPI1 MOSI | | |
| 07 | PC10 | | | |
| 08 | PA14 | | | |
| 09 | PC11 | | | |
| 10 | PB4 | | | |
| 11 | PB9 | I2C1 SDA | 已确认可用 | 2018-02-07 |
| 12 | PB3 | | | |
| 13 | PD2 | | | |
| 14 | PC12 | | | |
| 15 | VBAT | | | |
| 16 | PB8 | I2C1 SCL | 已确认可用 | 2018-02-07 |
| 17 | LODR | | | |
| 18 | PB7 | UART1 RX | 已确认可用 | 2018-02-09 |
| 19 | PB6 | UART1 TX | 已确认可用 | 2018-02-09 |
| 20 | PB5 | GPIO, PWM | GPIO已确认，PWM尚未完成 | 2018-02-07 |
| 21 | 复位 | | 已确认 | 2018-02-07 |
| 22 | PC0 | A0 | | |
| 23 | PC1 | A1 | | |
| 24 | PC2 | A2 | | |
| 25 | PC3 |

 A3 | | |
| 26 | PA0 | UART2 CTS | | |
| 27 | PA1 | UART2 RTS | | |
| 28 | PA2 | UART2 TX | 已确认可用 | 2018-02-08 |
| 29 | PA3 | UART2 RX | 已确认可用 | 2018-02-09 |
| 30 | PA4 | | | |
| 31 | PA5 | SPI1 SCK | | |
| 32 | PB10 | I2C2 SCL | 已确认可用 | 2018-02-07 |
| 33 | PB11 | I2C2 SDA | 已确认可用 | 2018-02-07 |
| 34 | PB14 | | | |
| 35 | PB15 | | | |
| 36 | PC6 | | | |
| 37 | PC7 | | | |
| 38 | PC8 | | | |
| 39 | PC9 | | | |
| 40 | USB | | | |

要了解有关该开发板的详细信息，您可以查看[GHI Electronics Cerb40页面](https://docs.ghielectronics.com/hardware/breakout/fez-cerb40.html)。

**注意：这个配置已在使用USB端口1上的串行USB连接在GHI_FEZ_CERB40_NF板上成功测试。**

## 托管助手

请查看此开发板可用的[C#托管助手](https://github.com/nanoframework/nf-Community-Targets/tree/main/ChibiOS/GHI_FEZ_CERB40_NF/managed_helpers)。