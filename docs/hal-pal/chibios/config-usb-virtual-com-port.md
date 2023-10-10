# USB虚拟COM端口（CDC）的USB配置

## 关于本文档

本文档描述了通过ChibiOS HAL提供的USB虚拟COM端口的可用设置和选项配置。所有这些设置和选项都在_reference boards_的_common_文件夹中的_usbcfg.c_文件中公开，这些_reference boards_具有USB设备连接器。

## USB供应商

```#define USB_STRING_VENDOR  L"STMicroelectronics"```

在此设置中定义了USB设备的供应商名称字符串（例如在Windows设备管理器中显示）。根据需要调整字符串以显示所需的名称。请注意L前缀，**不要**删除它。

## USB设备描述

```#define USB_STRING_DEVICE_DESCRIPTION  L"nanoFramework虚拟COM端口"```

在此设置中定义了USB设备的设备描述字符串（例如在Windows设备管理器中显示）。根据需要调整字符串以显示所需的描述。请注意L前缀，**不要**删除它。

## USB序列号

```#define USB_STRING_SERIAL_NUMBER      L"NANO_xxxxxxxxxxxx"```

在此设置中定义了USB设备的序列号字符串（例如在Windows设备管理器中显示）。此序列号将成为帮助操作系统标识和寻址USB设备的实例路径的一部分，就像在\\USB\\VID_0483&PID_5740\\NANO_3267335D3333中一样。根据需要调整字符串以显示所需的序列号。请注意L前缀，**不要**删除它。

_注1：nanoFramework ANT工具使用此序列号作为标识nanoFramework设备的辅助工具，依赖于此字符串以_NANO_开头（即大写字母NANO后跟下划线）。

_注2：对于STMicroelectronics参考板，串行号将与其STM32芯片上可用的硅唯一ID一起完成。有关详细信息，请参阅系列手册。

## USB供应商ID

```vcom_device_descriptor_data```结构中的```idVendor```。
在此设置中定义了USB设备的[USB供应商ID](http://www.usb.org/developers/vendor/)。在参考板上以十六进制0x0483表示（这是STMicroelectronics USB供应商ID）。

_注：未经第三方明确同意，您不得使用第三方的USB供应商ID。如果要使用自己的供应商ID，则必须向USB组织申请一个供应商ID_。

## USB产品ID

```vcom_device_descriptor_data```结构中的```idProduct```。
在此设置中定义了USB设备的[USB产品ID](http://www.usb.org/developers)。在参考板上以十六进制0x5740表示（这是STM在Discovery和Nucleo板上使用的USB产品ID）。

_注：未经第三方明确同意，您不得使用第三方的USB供应商ID + 产品ID。如果要使用自己的供应商ID + 产品ID，则必须向USB组织申请_。