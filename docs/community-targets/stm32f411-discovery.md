# STMicroelectronics STM32F411DISCOVERY

![STM32F411E-DISC0](https://github.com/nanoframework/nf-Community-Targets/blob/main/ChibiOS/ST_STM32F411_DISCOVERY/resources/STM32F411E-DISC0.jpg?raw=true)

STM32F411 Discovery开发板具有以下功能：

* STM32F411VET6微控制器，内置512 KB Flash存储器，128 KB RAM，LQFP100封装
* 配备ST-LINK/V2调试接口，可以通过选择模式切换将开发板用作独立的STLINK/V2（带有用于编程和调试的SWD连接器）
* 板载电源：可通过USB总线供电或外部5 V电源供电
* 外部应用电源：3 V和5 V
* L3GD20，ST MEMS运动传感器，具有3轴数字输出陀螺仪
* LSM303DLHC，ST MEMS系统封装，具有3D数字线性加速度传感器和3D数字磁感应传感器
* MP45DT02，ST MEMS音频传感器，全向数字麦克风
* CS43L22，集成了类D扬声器驱动器的音频DAC
* 八个LED指示灯：
  * LD1（红/绿）用于USB通信
  * LD2（红色）表示3.3 V电源开启
* 四个用户LED指示灯：
  * LD3（橙色）、LD4（绿色）、LD5（红色）和LD6（蓝色）
* 两个USB OTG指示灯：
  * LD7（绿色）表示VBus，LD8（红色）表示过电流
* 两个按钮（用户按钮和复位按钮）
* 带微型AB连接器的USB OTG
* LQFP100扩展引脚头，方便与原型板快速连接和简便测试

有关该开发板的更多信息，请访问[产品网站](http://www.st.com/en/evaluation-tools/32f411ediscovery.html)。

## 硬件

STM32F411E-DISC0 Discovery开发板包含以下组件：

* LQFP100封装的STM32F411VET6
* 带FPU的ARM® 32位Cortex®-M4 CPU
* 最大100 MHz的CPU频率
* VDD电压范围从1.7 V到3.6 V
* 512 KB闪存
* 128 KB SRAM
* 带外部中断功能的GPIO
* 1个12位、2.4 MSPS ADC，具有16个通道
* DMA控制器
* 最多11个定时器（六个16位定时器，两个32位定时器，两个看门狗定时器和一个SysTick定时器）
* USART/UART（3个）
* I2C（3个）
* SPI/I2S（5个）
* SD

IO
* 带片上PHY的USB 2.0全速设备/主机/OTG控制器
* CRC计算单元
* 96位唯一ID
* RTC

有关**STM32F411VE**的更多信息，请参阅以下链接：

* [STM32F411VE网站](http://www.st.com/en/microcontrollers/stm32f411ve.html)
* [STM32F411x参考手册](http://www.st.com/resource/en/reference_manual/dm00119316.pdf)

## 支持的功能

Discovery开发板上有5个GPIO控制器负责引脚的使用，它们的配置可以在[负责此功能的头文件](https://github.com/nanoframework/nf-Community-Targets/blob/main/ChibiOS/ST_STM32F411_DISCOVERY/board.h)中找到。

在nanoFramework中可用的基本外设：

* USART 1、USART2
* I2C1、I2C3
* SPI1、SPI2
* 5个ADC通道
* I2S3
* OTG
* 用户按钮
* 4个用户LED指示灯
* 陀螺仪
* 加速度传感器
* 磁感应传感器
* 音频DAC

*请注意，I2C1、SPI1和I2S3被板载传感器和音频DAC使用，不能用于通用用途，因此可以使用I2C3和SPI2。*

有关板载传感器可寻址的引脚的详细信息，请参考开发板的[用户手册](http://www.st.com/resource/en/user_manual/dm00148985.pdf)和前面提到的[头文件](https://github.com/nanoframework/nf-Community-Targets/blob/main/ChibiOS/ST_STM32F411_DISCOVERY/board.h)或板载根目录中的相应配置文件。

## MCU时钟使用

该开发板没有安装低速外部（LSE）晶体振荡器。查看开发板的图片，您会发现没有X3（在主要MCU的右侧和上方）。如果焊接了LSE，请不要忘记在mcuconf.h文件中进行相应的设置。

## 串口

板上的ST-Link/V2不支持虚拟串口（VCP）。因此，需要连接一个独立的UART-2-USB适配器/转换器，以便与Visual Studio进行通信。这是通过nanoFramework的线协议来实现的，该协议分配给USART2。需要使用引脚PA2、PA3和一个GND引脚在开发板和Visual Studio之间建立串行连接。

## 托管辅助工具

请查看可用于该开发板的[C#托管辅助工具](https://github.com/nanoframework/nf-Community-Targets/tree/main/ChibiOS/ST_STM32F411_DISCOVERY/managed_helpers)。