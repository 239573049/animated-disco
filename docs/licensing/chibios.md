# 使用ChibiOS作为RTOS时的许可选项

## 关于本文档

本文档提供了在使用ChibiOS作为.NET **nanoFramework** RTOS组件时可用的许可选项的概述。nanoFramework团队与ChibiOS销售团队保持联系，以确保以下信息的准确性（截至2017年10月）。

有关详细信息或讨论您的特定情况，我们强烈建议与ChibiOS [销售团队](http://chibios.org/dokuwiki/doku.php?id=chibios:licensing:quote)联系。

## 在.NET **nanoFramework**固件中使用ChibiOS的具体内容

.NET **nanoFramework**通过镜像（以确保稳定性）构建了针对未经修改的ChibiOS源代码。它使用了：

* [HAL](http://chibios.org/dokuwiki/doku.php?id=chibios:product:hal:start)，以Apache License 2.0发布，意味着可以100%免费使用或分发，无需支付任何版税，可用于任何目的。
* [RT](http://chibios.org/dokuwiki/doku.php?id=chibios:product:rt:start)，以GPL3发布。有关许可选项的详细信息可能因特定用途而异，请参阅下文。

## 我可以在家中进行业余或个人开发时免费使用ChibiOS吗

是的，在自由和开源软件项目或个人使用中使用ChibiOS是完全可以的。

## 如果我正在开发商业产品，我可以免费使用ChibiOS吗

是的，但如果以任何方式修改了ChibiOS源代码，请注意以下选项：

* 您必须遵守[GPL3](https://www.gnu.org/licenses/gpl.html)许可条款。基本上，您**必须**保持ChibiOS部分的开源。

或者

* 如果您同意ChibiOS公开使用您的产品，并清楚地声明您的产品正在使用ChibiOS，您可以保持您的修改部分闭源。

## 我可以使用ChibiOS的“组件许可证”吗

“组件许可证”是指您仅购买ChibiOS的部分，例如带有CM4端口的RT内核。此选项**必须**与ChibiOS销售团队讨论。

## 什么是“运行时许可证”

“运行时许可证”是指在向第三方出售的软件产品中使用ChibiOS的部分的选项。此选项**必须**与ChibiOS销售团队讨论。

## .NET **nanoFramework**固件如何处理

[nanoframework固件](nanoframework/nf-interpreter)根据Apache 2许可发布，并且使用ChibiOS作为RTOS没有任何影响。

## 在.NET **nanoFramework**上运行的托管应用程序（C

#）如何处理

加载到并由[nanoframework固件](nanoframework/nf-interpreter)固件镜像执行的应用程序（C#代码）不是由它进行编译或构建的，因为它是即时从内存中解释的。因此，从许可的角度来看，它可以被视为一个独立的组件，您的C#托管代码与固件是分开的。为了讨论，假设您永远不会在固件镜像上加载托管应用程序。.NET **nanoFramework**仍将是完全可工作的软件，只是没有太多功能。因此，这意味着ChibiOS许可不适用于C#托管应用程序，并且其使用不受ChibiOS许可条款的影响。