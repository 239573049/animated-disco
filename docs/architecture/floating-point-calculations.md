# 浮点数计算

## 关于本文档

本文档描述了在.NET **nanoFramework**中System.Math类库的特殊性和可用实现。

## 可用的API和浮点数实现

.NET System.Math API可使用`double`参数。对于通常运行代码的CPU来说，这没什么问题。
但当我们转移到嵌入式系统时，情况就完全不同了。

以下是一些更详细的信息以正确设置上下文：

- [`double`类型](https://docs.microsoft.com/zh-cn/dotnet/api/system.double)：表示双精度64位数，取值范围从负1.79769313486232e308到正1.79769313486232e308。精度约为15-17位数字。大小为8字节。
- [`float`类型](https://docs.microsoft.com/zh-cn/dotnet/api/system.single)：表示单精度32位数，取值范围从负3.402823e38到正3.402823e38。精度约为6-9位数字。大小为4字节。
- [浮点数数值类型的比较](https://docs.microsoft.com/zh-cn/dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types)。

在嵌入式世界中，处理浮点数和双精度数有各种各样的变体和组合。从CPU上的硬件支持到通过更多的代码和执行速度来执行这些计算的库。.NET **nanoFramework**针对32位MCU，因此支持64位计算需要额外的代码和处理。

除此之外，`double`类型提供的额外精度在典型的嵌入式应用程序用例中很少需要。

考虑到所有这些以及对节省闪存空间的持续追求，我们决定为System.Math API提供两种*变体*：标准版使用`double`类型参数，轻量版使用`float`类型参数。

这对API和代码重用没有任何影响，因为两者可以共存。唯一的区别在于固件映像。有一个构建选项(`DP_FLOATINGPOINT`)，用于在需要额外精度时使用DP浮点数来构建映像。

当API没有本机支持时，将抛出`NotImplementedException`。解决方法是使用*另一种*参数类型调用API。

```(csharp)
// 在支持DP浮点数的映像上运行时没有问题
Math.Pow(1.01580092094650000000000000, 0.19029495718363400000000000000);

// 在不支持DP浮点数的映像上运行时，这是正确的用法
Math.Pow(1.0158009209465f, 0.190294957183634f);
```