# ADC配置

## 关于本文档

本文档描述了如何配置ADC和相应的GPIO引脚，适用于基于ChibiOS HAL/PAL的STM32目标板。

## 假设和设计

STM32芯片最多可以有19个复用通道（其中16个来自外部源）。这些通道可以分组用于特殊的转换场景，但我们不会使用这些功能。
每个ADC通道可以在一个或多个GPIO引脚上公开。虽然这为系统设计师提供了更大的灵活性，但在配置ADC时也带来了额外的复杂性。
考虑到ADC配置和初始设置的繁重工作由ChibiOS执行，我们尽量使剩余的配置尽可能简单，主要是将GPIO引脚进行映射。

在本文档的其余部分，我们将使用ST STM32F769I_DISCOVERY参考目标，并配置ADC以使用通过CN14连接器公开的ADC通道。从该板的原理图（可从ST网站下载的mb1225 F769I-DISCO schematic.pdf）中可以看到以下通道的公开情况：

| 引脚 | GPIO引脚 | ADC通道 |
|:---:|:---:|:---:|
| A0 | PA6 | ADC1_IN6 |
| A1 | PA4 | ADC1_IN4 |
| A2 | PC2 | ADC1_IN12 |
| A3 | PF10 | ADC1_IN8 |
| A4 | PF8 | ADC3_IN6 |
| A5 | PB8 | ADC3_IN7 |

为了充分利用ADC硬件，我们将启用内部ADC源。这些源必须映射到ADC1。

| 引脚 | GPIO引脚 | ADC通道 |
|:---:|:---:|:---:|
| N.A. | N.A. | ADC1_TEMP_SENSOR |
| N.A. | N.A. | ADC1_VREFINT |
| N.A. | N.A. | ADC1_VBAT |

## 配置

所有配置都集中在参考目标文件夹中的`target_windows_devices_adc_config.cpp`文件中。
只有在将`API_Windows.Devices.Adc`选项设置为ON时，才会将此源文件添加到CMake目标中。请参阅目标的CMakeList.txt文件。

ADC控制器有一个全局的`NF_PAL_ADC_PORT_PIN_CHANNEL`数组。每个条目中都包含了ADC块、GPIO端口和引脚的配置，以及ADC内部通道的引用。
请注意，对于内部源通道，GPIO端口和引脚应设置为`NULL`，并且这些通道仅适用于ADC1。
所有的命名都来自现有的ChibiOS定义。

配置数组如下所示：

```C
const NF_PAL_ADC_PORT_PIN_CHANNEL AdcPortPinConfig[] = {

    // ADC1
    {1, GPIOA, 6, ADC_CHANNEL_IN6},
    {1, GPIOA, 4, ADC_CHANNEL_IN

4},
    {1, GPIOC, 2, ADC_CHANNEL_IN12},
    {1, GPIOF, 10, ADC_CHANNEL_IN8},

    // ADC3
    {3, GPIOF, 8, ADC_CHANNEL_IN6},
    {3, GPIOB, 8, ADC_CHANNEL_IN7},

    // 这些是内部源，在ADC1上可用
    {1, NULL, NULL, ADC_CHANNEL_SENSOR},
    {1, NULL, NULL, ADC_CHANNEL_VREFINT},
    {1, NULL, NULL, ADC_CHANNEL_VBAT},
};
```

还有一个包含通道计数的变量，如下所示：
`const int AdcChannelCount = ARRAYSIZE(AdcPortPinConfig);`

要完成配置，需要启用ChibiOS HAL的ADC1和ADC3。请记住，这些是上述配置中使用的ADC块。这可以通过编辑目标nanoCLR文件夹内的`mcuconf.h`文件来完成。搜索`STM32_ADC_USE_ADC1`和`STM32_ADC_USE_ADC3`，并将其设置为`TRUE`。