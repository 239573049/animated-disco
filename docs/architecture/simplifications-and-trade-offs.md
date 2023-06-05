# .NET **nanoFramework** 中的简化和权衡

## 关于本文档

本文档描述了在与完整框架进行比较时，.NET **nanoFramework** 中引入的简化和权衡。

## 枚举

我们对`enums`进行了简化。它们是特殊的类，基本上包含常量字段。
ECMA-335 允许进行一些简化，我们的CLR正是利用了这些简化。这在标准中通过第 II.14.3 节中的以下说明得到了明确阐述：“这些限制允许非常高效的枚举实现。”

由于存储值名称和它们所代表的常量没有实际价值，我们选择不这样做。这样可以在字段表中节省一个条目，并且在签名表和字符串表中也可以节省对应的空间（用于值名称）。在PE文件中，最少会占用 8 + 2 + (n) 字节的空间，具体取决于名称字符串的大小。

因此，我们不支持`Enum.GetNames()`、`Enum.GetValues()`和`Enum.IsDefined()`。
但是我们有`HasFlag()`！

备注：

- 这些功能可以通过增加PE文件的大小来提供。
- 对于`Enum.IsDefined()`，您始终可以在代码中使用 switch 指令创建类似的功能，具体取决于您的用例。
- 枚举值的 ToString() 方法将返回数字值的字符串，而不是枚举名称，这与其他平台不同。

## 多维数组

由于底层的复杂性和内存使用，不支持多维数组，只支持[锯齿数组](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/jagged-arrays)。从最终结果来看，它们几乎是等效的，因此如果您需要多维数组，只需根据可用的选项调整您的代码即可。

## String.Format 和 numeric.ToString 函数

.NET **nanoFramework** 支持[标准数字格式字符串](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings)（D/F/G/N/X）和[组合格式化](https://docs.microsoft.com/en-us/dotnet/standard/base-types/composite-formatting)（左对齐和右对齐）的子集。它不支持任何[自定义数字格式字符串](https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-numeric-format-strings)。**nanoFramework**中的字符串都受到UTF-8的限制，因此有字符显示的限制。支持以下格式说明符：

| 说明符 | 示例 |
| ------- | ------- |
| [D-十进制](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings#DFormatString) | [十进制单元测试输出](string-format-examples.md#d-decimal) |
| [F-定点](https://docs.microsoft.com

/en-us/dotnet/standard/base-types/standard-numeric-format-strings#FFormatString) | [定点单元测试输出](string-format-examples.md#f-fixed-point) |
| [G-通用](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings#GFormatString) | [通用单元测试输出](string-format-examples.md#g-general) |
| [N-数值](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings#NFormatString) | [数值单元测试输出](string-format-examples.md#n-number) |
| [X-十六进制](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings#XFormatString) | [十六进制单元测试输出](string-format-examples.md#x-hexadecimal) |

## 泛型

.NET nanoFramework 不支持泛型。我们正在积极开发中！（您可以通过关注[此](https://github.com/nanoframework/Home/issues/782) GitHub 问题跟踪进展）
这是一件容易被忽视的事情，因为已经有一些在mscorlib中的类来支持它。对于绝大多数代码来说，不会出现编译错误。