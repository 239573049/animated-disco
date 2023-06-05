# ESP32引脚布局
 
ESP32引脚布局因物理硬件而异。通用的是GPIO编号。因此，请参考您特定板子的文档以找出物理关系。

您可以在[此文件](https://github.com/nanoframework/nf-interpreter/blob/main/targets/ESP32/_common/DeviceMapping_common.cpp)中找到默认映射的所有详细信息。

默认映射定义了启动时引脚的配置方式。可以使用nanoFramework.Hardware.Esp32程序集来配置/重新定义这些引脚配置。

## 示例配置

```csharp
// Define MOSI pin for SPI2 as GPIO 15
Configuration.SetPinFunction(15, DeviceFunction.SPI2_MOSI);
// Define LED PWM channel 1 GPIO 16
Configuration.SetPinFunction(16, DeviceFunction.PWM1);
// Redefine I2C2 data pin from GPIO 25 to GPIO 17
Configuration.SetPinFunction(17, DeviceFunction.I2C2_DATA);
```

## ESP32默认映射

NP = 引脚在启动时未定义
I2C

有2个可用的I2C总线：

| I2C＃| 数据| 时钟|
| --- | --- | ---|
| I2C1 | GPIO 18 | GPIO 19 |
| I2C2 | GPIO 25 | GPIO 26 |

SPI

有2个SPI可能的配置：

| SPI＃| MOSI | MISO | 时钟|
| --- | --- | --- | --- |
| SPI1 | GPIO 23 | GPIO 25 | GPIO 19 |
| SPI2 | NP | NP | NP |

串行端口

您有2个可用的串行端口，启用时COM1保留用于调试。

| COM＃| 传输（Tx）| 接收（Rx）| RTS | CTS |
| --- | --- | --- | --- | --- |
| COM1 | GPIO 1 | GPIO 3 | GPIO 19 | GPIO 22 |
| COM2 | NP | NP | NP | NP |
| COM3 | NP | NP | NP | NP |

PWM通道

ESP32上有16个PWM通道，对于所有通道，GPIO引脚在启动时未定义。

前8个PWM（PWM0到PWM7）使用低精度计时器，后8个PWM（PWM8到PWM15）使用高分辨率计时器。您应该设置引脚以选择所需的计时器分辨率。

请注意，PWM成对出现。因此，PWM0和PWM1（2和3等等）将共享相同的频率。如果需要具有不同频率的PWM，则必须选择兼容的PWM引脚。

ADC

我们使用“ADC1”，将20个逻辑通道映射到ESP32内部控制器ADC1和ADC2上。有18个可用的ESP32通道以及内部温度和霍尔传感器，共20个逻辑通道。

限制：-

- 当启用WiFi时，无法使用通道10到19。 （异常CLR_E_PIN_UNAVAILABLE）
- Hall传感器和温度传感器不能与通道0和3同时使用。
- Gpio 0、2、15是绑定引脚，不能自由使用（通道11、12、13），请检查板电路图。

| 逻辑通道＃| 内部ADC＃| GPIO＃| 注意|
| --- | --- | --- | --- |
| 0 | ADC1 | 36 | 请参见限制|
| 1 | ADC1 | 37 | |
| 2 | ADC1 | 38 | |
| 3 | ADC1 | 39 | 请参见限制|
| 4 | ADC1 | 32 | |
| 5 | ADC1 | 33 | |
| 6 | ADC1 | 34 | |
| 7 | ADC1 | 35 | |
| 8 | ADC1 | 36 | 内部温度传感器（VP），请参见限制|
| 9 | ADC1 | 39 | 内部霍尔传感器（VN），请参见限制|
| 10 | ADC2 | 04 | |
| 11 | ADC2 | 00 | 绑定引脚|
| 12 | ADC2 | 02 | 绑定引脚|
| 13 | ADC2 | 15 | 绑定引脚|
| 14 | ADC2 | 13 | |
| 15 | ADC2 | 12 | |
| 16 | ADC2 | 14 | |
| 17 | ADC2 | 27 | |
| 18 | ADC2 | 25 | |
| 19 | ADC2 | 26 | |

DAC

ESP32上有2个DAC：

| DAC＃| GPIO＃|
| --- | --- |
| DAC1 | 25 |
| DAC2 | 26 |
