# 使用nanoFramework.TestPlatform

准备测试的核心组件是`nanoFramework.TestPlatform`。

## 属性

使用属性来识别类和测试方法。以下是可用的属性：

- `[TestClass]`：此属性用于类上，在没有此属性的情况下，该类将不被视为有效的单元测试，并且其中的测试方法将被忽略。您可以拥有任意数量带有此属性的类。每个类可以包含任意多个测试方法、设置和清理方法。
- `[TestMethod]`：此属性用于任何包含测试的方法。您可以拥有任意数量带有此属性的方法。
- `[Setup]`：此属性用于任何方法。此测试将首先被调用。虽然从技术上讲，每个类可以有多个此类函数，但建议每个类只使用一个。典型的用法是设置在所有测试方法中都需要运行的硬件。
- `[Cleanup]`：此属性用于任何方法。此测试将在所有测试方法之后被调用。虽然从技术上讲，每个类可以有多个此类函数，但建议每个类只使用一个。

## 属性的使用

下面是一个典型的属性使用示例：

```csharp
namespace nanoFramework.TestFramework.Test
{
    [TestClass]
    public class TestOfTest
    {
        [TestMethod]
        public void TestRaisesException()
        {
            Debug.WriteLine("测试将引发异常");
            Assert.Throws(typeof(Exception), ThrowMe);
        }

        private void ThrowMe()
        {
            throw new Exception("测试失败，这太糟糕了");
        }

        [Setup]
        public void RunSetup()
        {
            Debug.WriteLine("设置");
        }

        [TestMethod]
        public void TestStringComparison()
        {
            Debug.WriteLine("测试字符串的 Contains、EndsWith、StartWith");
            // 准备
            string tocontains = "this text contains and end with contains";
            string startcontains = "contains start this text";
            string contains = "contains";
            string doesnotcontains = "this is totally something else";
            string empty = string.Empty;
            string stringnull = null;
            // 断言
            Assert.Contains(contains, tocontains);
            Assert.DoesNotContains(contains, doesnotcontains, "Your own error message");
            Assert.DoesNotContains(contains, empty);
            Assert.DoesNotContains(contains, stringnull);
            Assert.StartsWith(contains, startcontains);
            Assert.EndsWith(contains, tocontains);
        }

        [TestMethod]
        public void MethodWillSkippIfFloatingPointSupportNotOK()
        {
            var sysInfoFloat = SystemInfo.FloatingPointSupport;
            if ((sysInfoFloat != FloatingPoint.DoublePrecisionHardware) && (sysInfoFloat != FloatingPoint.DoublePrecisionSoftware))
            {
                Assert.SkipTest("不支持双精度浮点数，跳过 Assert.Double 测试");
            }

            double on42 = 42.1;
            double maxDouble = double.MaxValue;
            Assert.Equal(42.1, on42);
            Assert.Equal(double.MaxValue, maxDouble);
        }

        public void Nothing()
        {
            Debug.WriteLine("什么也不做，不应该被调用");
        }

        [Cleanup]
        public void Cleanup()
        {
            Debug

.WriteLine("清理");
        }
    }
}
```

如您所见，在此示例中，只需使用属性修饰类和函数即可。

函数应为`void`类型，并且不接受任何参数。

如果函数中没有发生异常，则测试*通过*。如果函数中发生任何异常，则视为*失败*。

## 函数可见性

所有用于测试的带有属性的函数都必须是`public void`，如果将它们设置为私有或内部，它们将无法被发现。

## 在测试函数中进行断言

与大多数著名的.NET单元测试平台一样，**nanoFramework**中也存在`Assert`的概念。在前面的示例中，您可以看到一些`Assert`函数的使用方式。它们接受一个或两个参数，并且非常直观易用。

如果在这些`Assert`函数中出现问题，将引发异常。

请注意，所有的`Assert`函数都可以传递自定义消息。例如：`Assert.Equal(42, 43, "My custom message saying that 42 is not equal to 43");`

### Assert.Throws

这个函数检查特定的函数是否会引发异常。用法如下：

```csharp
Assert.Throws(typeof(ExceptionTypeToCatch), AFunctionToCall);
```

其中：

- `ExceptionTypeToCatch` 必须是异常的类型。典型的例子是检查您尝试调用的函数是否引发了 `ArgumentException`。
- `AFunctionToCall` 是一个 `Action`，也就是您可以调用的函数，用于检查是否引发了异常。

在前面的示例中可以看到这个模式。

### Assert.True 和 Assert.False

简单地检查某个条件是否为真或为假。

```csharp
bool boola = true;
Assert.True(boola);
```

### Assert.Equal 和 Assert.NotEqual

`Assert.Equal` 是一组函数，接受所有的内置值类型以及数组，并检查数组中的元素是否相等（对于值类型）或是否为同一个对象（对于非值类型）。

```csharp
Assert.Equal(elementa, elementb);
```

`Assert.NotEqual` 的行为与之相同，但是检查两个元素是否不相等。

```csharp
Assert.NotEqual(elementa, elementb);
```

### Assert.Null 和 Assert.NotNull

这些函数检查一个元素是否为 null 或非 null。

```csharp
object objnull = null;
object objnotnull = new object();
Assert.Null(objnull);
Assert.NotNull(objnotnull);
```

### Assert.IsType 和 Assert.IsNotType

这些函数允许检查一个元素是否为特定类型或不是特定类型。

```csharp
Type typea = typeof(int);
Type typeb = typeof(int);
Type typec = typeof(long);
Assert.IsType(typea, typeb);
Assert.IsNotType(typea, typec);
```

### Assert.Empty 和 Assert.NotEmpty

### Assert.Same 和 Assert.NotSame

用于检查对象是否相同或不同的函数。

```csharp
object obja = new object();
object objb = new object();
Assert.NotSame(obja, objb);
objb =

 obja;
Assert.Same(obja, objb);
```

### 用于字符串检查的 Assert

提供了一组函数来帮助检查字符串，这些函数允许执行大多数常见的场景，例如检查一个字符串是否包含特定的元素、以某个元素开头、以某个元素结尾，以及不包含某些元素。

```csharp
// 准备
string tocontains = "this text contains and end with contains";
string startcontains = "contains start this text";
string contains = "contains";
string doesnotcontains = "this is totally something else";
string empty = string.Empty;
string stringnull = null;
// 断言
Assert.Contains(contains, tocontains);
Assert.DoesNotContains(contains, doesnotcontains);
Assert.DoesNotContains(contains, empty);
Assert.DoesNotContains(contains, stringnull);
Assert.StartsWith(contains, startcontains);
Assert.EndsWith(contains, tocontains);
```

### 从测试中输出消息

可以使用 `OutputHelper.Write` 和 `OutputHelper.WriteLine` 从单元测试中输出消息。它们的使用方式与 `Debug.Write` 和 `Debug.WriteLine` 完全相同，因此可以进行简单或格式化的输出。

```csharp
OutputHelper.WriteLine("This is a message from Unit Test XYZ!");
```

```csharp
OutputHelper.WriteLine($"This is another message from Unit Test XYZ, showing that {someVariable.Length} can be output too.");
```

### 跳过一个测试

可以使用 `Assert.SkipTest` 跳过一个测试，并提供相应的说明，例如：

```csharp
Assert.SkipTest("不支持双精度浮点数，跳过 Assert.Double 测试");
```

**重要提示**：如果跳过了 `Setup` 测试，那么所有的 `TestMethod` 类都将被跳过。这是一种方便的方式，可以跳过一些特定的硬件测试，例如当前的硬件不支持它们。这将允许为不同的硬件构建不同的类，并且只执行正确的测试。