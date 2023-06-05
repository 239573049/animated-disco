# TI CC1352R1-LAUNCHXL

![CC1352R1](../../images/reference-targets/CC1352R1_LAUNCHXL.jpg)

[产品页面](http://www.ti.com/tool/LAUNCHXL-CC1352R1)

## 特点

### CC1352R MCU

- CC3220SF 单芯片无线微控制器
- 双核架构：
  - 用户专用应用 MCU 子系统
  - 专用的软件控制无线电控制器
- 强大的 48 MHz Arm® Cortex®-M4F 处理器
- 嵌入式存储器：
  - 352 KB 可编程闪存
  - 256 KB ROM 用于协议和库函数
  - 8 KB Cache SRAM（也可用作通用 RAM）
  - 80 KB 超低泄漏 SRAM
- 外围设备：
  - 数字外设可以路由到任何 GPIO
  - 4× 32 位或 8× 16 位通用定时器
  - 12 位 ADC，200 kSamples/s，8 通道
  - 2× 具有内部参考 DAC 的比较器（1× 连续时间，1× 超低功耗）
  - 可编程电流源
  - 2× UART
  - 2× SSI（SPI、MICROWIRE、TI）
  - I2C
  - I2S
  - 实时时钟（RTC）
  - AES 128 位和 256 位加密加速器
  - ECC 和 RSA 公钥硬件加速器
  - SHA2 加速器（完整套件支持 SHA-512）
  - 真随机数发生器（TRNG）
  - 电容感应，最多 8 通道
  - 集成温度和电池监视器
- 无线电部分
  - 多频段次 1 GHz 和 2.4 GHz RF 收发器，兼容 Bluetooth 5 低功耗和 IEEE 802.15.4 PHY 和 MAC
  - 优异的接收灵敏度：
  - SimpleLink 长距离模式下为 –121 dBm
  - 50 kbps 时为 –110 dBm，Bluetooth 125 kbps（LE Coded PHY）时为 –105 dBm
  - 输出功率高达 +14 dBm（次 1 GHz）和 +5 dBm（2.4 GHz），带温度补偿
  - 适用于符合全球无线电频率规定的系统
  - ETSI EN 300 220 接收机类别 1.5 和 2，EN 300 328，EN 303 131，EN 303 204（欧洲）
  - EN 300 440 类别 2
  - FCC CFR47 第 15 部分
  - ARIB STD-T108 和 STD-T66
  - 广泛的标准支持
- 无线协议
  - Thread
 

 - Zigbee®
  - Bluetooth® 5 低功耗
  - IEEE 802.15.4g
  - 支持 IPv6 的智能对象（6LoWPAN）
  - 无线 M-Bus
  - Wi-SUN®
  - KNX RF
  - 专有系统
  - SimpleLink™ TI 15.4-Stack（次 1 GHz）
  - 动态多协议管理器（DMM）

### Launchpad 开发板

- 带有2.4GHz和次 1 GHz 无线电的 LaunchPad 开发板，用于无线应用，带有集成的 PCB 轨迹天线
- 宽带天线支持欧洲的868 MHz ISM频段和美国的915 MHz ISM频段，单个板上支持两个频段
- 内置仿真器可让您立即在 CCS Cloud 中进行代码开发
- 可与 LaunchPad 开发套件和 SmartRF™ Studio 应用程序一起使用
- 通过 BoosterPack 插件模块连接器访问所有 I/O 信号
- 兼容 LCD BoosterPack

## 固件镜像（可即时部署）

提供的可即用固件镜像包含下面标记的类库和功能支持。

| Gpio | Spi | I2c | Pwm | Adc | 串口 | 事件 | SWO | 网络 | 大堆 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| :heavy_check_mark: |  |  |  |  | |  | |  | |

[![最新版本 @ Cloudsmith](https://api-prd.cloudsmith.io/v1/badges/version/net-nanoframework/nanoframework-images/raw/TI_CC1352R1_LAUNCHXL_868/latest/x/?render=true)](https://cloudsmith.io/~net-nanoframework/repos/nanoframework-images/packages/detail/raw/TI_CC1352R1_LAUNCHXL_868/latest/)