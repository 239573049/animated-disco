# nanoFramework.TestPlatform

目前，nanoFramework.TestPlatform框架存在一些限制，主要包括：

- 包含所有测试的程序集名称必须为“NFUnitTest”。这是我们正在努力消除的限制。您可以拥有尽可能多的类和测试项目。但是，到目前为止，您需要将程序集命名为“NFUnitTest”。单元测试项目模板已经设置好了，如果从模板开始，您不需要更改任何内容。
- 测试程序集的构建元素必须位于“nfproj”项目的子文件夹中。通常是“/directory_where_nfproj/bin/Debug/your.dll”。因此，请不要调整默认设置，它们对我们的用例完全有效。
- nanoCLR Win32主机存在一些限制，例如网络功能，我们正在尝试添加尽可能多的功能。