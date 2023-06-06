# I2M Oxygen

![I2M Oxygen](https://github.com/nanoframework/nf-Community-Targets/blob/main/ChibiOS/I2M_OXYGEN_NF/resources/oxygen.jpeg?raw=true)

这个社区贡献中使用的开发板是基于STM32F411CEU6芯片的IngenuityMicro公司的Oxygen开发板。该开发板有20个引脚可供使用。USB连接器对面的引脚可以用于各种附加板，如BLE、WiFi（ESP8266）等。

这些引脚可以用于多种用途，如GPIO、PWM、I2C、SPI、串口等。

有关引脚分配的更多详细信息，请参考资源文件夹。当然，既然我们现在知道了MCU引脚与PCB引脚的对应关系，根据您想要实现的功能，我们可以根据需要更改board.h文件。

如果需要更多信息，您可以查看<https://github.com/piwi1263/Molecules>。

## 托管助手

请查看可用于该开发板的[C#托管助手](https://github.com/nanoframework/nf-Community-Targets/tree/main/ChibiOS/I2M_OXYGEN_NF/managed_helpers)。