# PYBStick Standard 26

![PYBStick标准26](https://raw.githubusercontent.com/mchobby/pyboard-driver/master/PYBStick/docs/_static/PYBStick-STD-26.jpg)

这个社区贡献所使用的开发板是基于STM32F411RE芯片的[MCHobby](https://github.com/mchobby)和Garatronic合作推出的。

该开发板具有多个功能，并且它们在图片中已经进行了预设设置。

请注意，只有SPI1被预先设置，两个I2C接口可供使用，所有的ADC都可以使用。只有UART2 (RX PA3, TX PA2) 被设置。

以下是ADC对应的引脚编号：

* S8 = PA2 = ADC1通道0
* S10 = PA3 = ADC1通道1
* S12 = PA0 = ADC1通道2
* S26 = PA4 = ADC1通道3
* S23 = PA5 = ADC1通道4
* S19 = PA7 = ADC1通道5
* 温度（不准确）= ADC1通道6
* 参考电压（1.21 V）= ADC1通道7
* 电池电压 = ADC1通道8

SPI1引脚：

* S23 = PA5 = 时钟
* S21 = PB4 = MISO
* S19 = PA7 = MOSI
* 您可以使用任何片选引脚。S26 = PA4 是一个硬件片选引脚

I2C1引脚：

* S3 = PB9 = SDA
* S5 = PB8 = SCL

I2C2引脚：

* S11 = PB3 = SDA
* S13 = PB10 = SCL

UART2引脚 = COM2

* S8 = PA2 = TX
* S10 = PA3 = RX

PWM引脚：

* S8 = PA2
* S10 = PA3
* S12 = PA0
* S16 = PB13
* S18 = PB14
* S3 = PB9
* S5 = PB8
* S7 = PB6
* S19 = PA7
* S21 = PB4
* 注意：TIM2引脚均未启用

## 管理的辅助函数

请查看适用于该开发板的[C#管理的辅助函数](https://github.com/nanoframework/nf-Community-Targets/blob/main/ChibiOS/PybStick2x/managed_helpers/PybStick2x.cs)。