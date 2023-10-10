# 在STM32目标上进行工作

## 我可以在任何STM32开发板上调试本机代码吗？

要实现这个目标，您需要能够连接到MCU上的JTAG引脚。大多数STM32 Discovery和Nucleo开发板都包含一个ST-Link硬件，可以暴露调试端口。

## 如何将MCU引脚名称转换为nanoFramework引脚编号？

nanoFramework引脚编号的计算方式如下：`portNumber * 16 + pinNumber`。对于STM32来说，端口按字母顺序编号，因此PA=0，PB=1，PC=2，依此类推。例如，PD4对应于nanoFramework引脚编号52，因为 `3 * 16 + 4 = 52`。