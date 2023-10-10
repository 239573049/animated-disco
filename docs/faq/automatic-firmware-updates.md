# 自动固件更新

自动固件更新是作为从Visual Studio扩展 for nanoFramework 启动的构建过程的一部分运行的。请参阅以下博文：<https://www.nanoframework.net/automatic-firmware-updates/>

## 这个自动更新支持哪些目标？

目前，所有STM32目标都受支持，包括官方支持的参考目标和在我们的nf-Community-Targets仓库中找到的社区目标。

## 如果我有一个运行自己固件的自定义板，我可以使用这个吗？

目前还不支持。当前，此功能依赖于Cloudsmith API以及我们在那里发布固件包的仓库。支持自定义仓库需要一种标准的访问包存储和版本查询的方法。如果您希望您的板支持开箱即用，请随时向.NET nanoFramework nf-Community-Targets仓库提交PR。

## 如何防止板子在使用自定义固件时进行更新？

如果您在本地运行构建，最好的方法是使用`BUILD_VERSION`属性，并将其设置为一个几乎不可能找到更好版本的值，例如`99.999.0.0`。