# 在C#中使用自动属性吗

不可以，你必须声明后备字段。

# 我有一个旨在同时针对nanoFramework和标准.NET的解决方案，想要在两个平台中共享/重用代码。我知道我不能引用一个平台的程序集到另一个平台。我该如何实现这一目标

你最好的选择是使用一个共享项目来保存通用代码。将那些在两个平台中都要使用的类放在共享项目中。你可以通过使用编译器常量、编译器定义甚至局部类来实现这种可重用性。
关于这一点的一个小例子，请查看我们示例仓库中的[ToString示例](https://github.com/nanoframework/Samples/tree/master/samples/ToStringTest)。它使用这种技术来在nanoFramework应用程序和.NET控制台应用程序之间共享代码。

# 我需要在一个类库中调试某些内容，如何轻松地将NuGet引用替换为实际项目

你可以使用一个方便的Visual Studio扩展工具，叫做[NuGet Reference Switcher](https://marketplace.visualstudio.com/items?itemName=RicoSuter.NuGetReferenceSwitcherforVisualStudio2017)。将类库项目添加到你的解决方案中，然后使用该工具将NuGet包引用切换到最近添加的项目。在调试完成后，你可以切换回NuGet引用。