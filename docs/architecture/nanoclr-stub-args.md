# 本地技巧和提示，为本地项目生成存根，NANOCLR宏，参数和返回类型

当您想要使用本地代码并创建相关的托管代码C#库时，您应该首先阅读[这篇文章](https://jsimoesblog.wordpress.com/2018/06/19/interop-in-net-nanoframework/)。该文章将为您提供创建托管C#项目、生成存根以及将所有内容组合在一起的所有步骤。

完成这些步骤后，您仍然需要了解与`NANOCLR`宏、参数和类型转换相关的几个元素。

## NANOCLR宏

生成存根后，您将得到如下所示的函数：

```cpp
HRESULT Library_sys_dev_pwm_native_System_Device_Pwm_PwmChannel::NativeInit___VOID( CLR_RT_StackFrame &stack )
{
    NANOCLR_HEADER();

    NANOCLR_SET_AND_LEAVE(stack.NotImplementedStub());

    NANOCLR_NOCLEANUP();
}
```

每个本地代码与托管C#代码一起公开的函数都会生成预设的`NANOCLR`宏。您可以在[`src\CLR\Include\nanoCLR_Interop.h`](https://github.com/nanoframework/nf-interpreter/blob/f5d026224116bd671f42d5c482701447b1bf6e70/src/CLR/Include/nanoCLR_Interop.h)中找到所有这些宏。通过下面的所有元素，您将能够了解如何最佳使用它们。

### NANOCLR_HEADER

`NANOCLR_HEADER`始终出现在每个生成的函数的顶部。它的目的是创建`HRESULT hr`变量。

### NANOCLR_CLEANUP或NANOCLR_NOCLEANUP，LABEL或NOLABEL

`CLEANUP`系列包括4种变体和更多元素：

```cpp
#define NANOCLR_LEAVE()  goto nanoCLR_Cleanup // 注意：这是当未使用调试时的简化版本
#define NANOCLR_RETURN() return hr

#define NANOCLR_CLEANUP()     hr = S_OK; nanoCLR_Cleanup:
#define NANOCLR_CLEANUP_END() NANOCLR_RETURN()
#define NANOCLR_NOCLEANUP()   NANOCLR_CLEANUP(); NANOCLR_CLEANUP_END()
#define NANOCLR_NOCLEANUP_NOLABEL() hr = S_OK; NANOCLR_RETURN()
```

因此，为了揭示和理解应使用哪个变体，`NANOCLR_NOCLEANUP_NOLABEL();`等效于`hr = S_OK; return hr;`。因此，如果您不需要清理任何内容，而且代码很简单，那么这是您可以使用的一般情况。

查看`NANOCLR_NOCLEANUP`，您会发现其中添加了一个标签：`hr = S_OK; nanoCLR_Cleanup:; return hr;`。如您所见，已添加了标签，并且通过查看更多定义，`NANOCLR_LEAVE`宏是`goto nanoCLR_Cleanup`，这意味着任何需要进行检查并且可能提前退出的情况都需要使用

带有标签的版本。

`CLEANUP_END`变体仅返回`hr`，当您没有要检查的内容时，可以使用它。而`NANOCLR_CLEANUP`将`hr`设置为ok并放置标签。它不能单独使用，必须在之后使用`NANOCLR_LEAVE`。

### NANOCLR_SET_AND_LEAVE、NANOCLR_CHECK_HRESULT和NANOCLR_EXIT_ON_SUCCESS

这些宏允许您检查对函数或表达式的调用是否失败或成功，然后，如前面所述，转到`nanoCLR_Cleanup`。在调用其他返回`HRESULT`的类似函数时，这经常使用。

```cpp
#define NANOCLR_CHECK_HRESULT(expr)   { if(FAILED(hr = (expr))) NANOCLR_LEAVE(); }
#define NANOCLR_EXIT_ON_SUCCESS(expr) { if(SUCCEEDED(hr = (expr))) NANOCLR_LEAVE(); }
#define NANOCLR_SET_AND_LEAVE(expr)   { hr = (expr); NANOCLR_LEAVE(); }
```

`NANOCLR_SET_AND_LEAVE`函数只会设置`HRESULT`并转到`nanoCLR_Cleanup`。

您可以在[`src\CLR\Include\nf_errors_exceptions.h`](https://github.com/nanoframework/nf-interpreter/blob/f5d026224116bd671f42d5c482701447b1bf6e70/src/CLR/Include/nf_errors_exceptions.h)文件中找到典型HRESULT的详细列表。`FAILED`和`SUCCEEDED`定义如下：

```cpp
#define SUCCEEDED(Status) ((HRESULT)(Status) >= 0)
#define FAILED(Status)    ((HRESULT)(Status)<0)
```

### NANOCLR_MSG_SET_AND_LEAVE和NANOCLR_MSG1_SET_AND_LEAVE

这两个宏定义如下：

```cpp
#define NANOCLR_MSG_SET_AND_LEAVE(expr, msg)       { hr = (expr); NANOCLR_LEAVE(); }
#define NANOCLR_MSG1_SET_AND_LEAVE(expr, msg, arg) { hr = (expr); NANOCLR_LEAVE(); }
```

因此，它们允许您设置返回元素并退出。到目前为止，它们仅在`src\CLR\Core\TypeSystem.cpp`文件中使用。但这并不妨碍您也使用它们。

## CLR_RT_StackFrame &stack

在每次调用这些本地函数时，栈都会通过一个名为CLR_RT_StackFrame的结构传递。该定义可以在`src\CLR\Include\nanoCLR_Runtime.h`中找到。在这个描述中，我们只关注其中的几个元素。

### 如果函数位于静态类中

在这种情况下，您将得到的栈类是C#类的"静态实例"。类实例的指针仅在非静态调用时可用。原因是当存在类的实例时，执行引擎会向IL堆栈中添加一个指向类实例的指针。

### 获取和检查非静态类中的堆栈

使用以下模式：

```cpp
CLR_RT_HeapBlock* pThis = stack.This();
FAULT_ON_NULL(pThis);
```

`FAULT_ON_NULL`是一个类似于前面介绍的宏

，它将检查栈是否为null。如果为null，则会转到`nanoCLR_Cleanup`标签并将`HRESULT`设置为null错误。

其定义可以在`src\CLR\Include\nanoCLR_Interop.h`中找到。

```cpp
#define FAULT_ON_NULL(ptr)     if(!(ptr)) NANOCLR_SET_AND_LEAVE(CLR_E_NULL_REFERENCE)
#define FAULT_ON_NULL_ARG(ptr) if(!(ptr)) NANOCLR_SET_AND_LEAVE(CLR_E_ARGUMENT_NULL)
```

您可以将这些宏用于参数。我们将在后面的某个部分中看到这一点。

### 从堆栈中获取任何公开的字段

一旦您检查了堆栈的有效性，您可以获取指向任何类字段的指针。以下是一个典型的示例：

```cpp
int pinNumber = (int)(pThis[Library_sys_dev_pwm_native_System_Device_Pwm_PwmChannel::FIELD___pinNumber].NumericByRef().u4);
```

栈是`CLR_RT_HeapBlock`。这种类型是允许您访问堆块的核心类型，堆块是放置在IL堆栈中的对象。

使用的模式是数组：`pThis[要获取的字段]`，您必须确保字段存在。为避免任何问题，建议使用长名称，例如`Library_sys_dev_pwm_native_System_Device_Pwm_PwmChannel::FIELD___pinNumber`。但如果它在同一个类中，您不需要使用长名称，`pThis[FIELD___pinNumber]`也可以正常工作。

然后，`NumericByRef()`允许您获取数值类型，`u4`将其转换为`uint32`。对于数值，您还可以使用`NumericByRefConst()`将其转换为常量。然后，对于非带符号的数值，可以使用`u`，1、2、4和8用于字节数，`i`表示有符号，`r4`表示`float`，`r8`表示`double`。

> 专业提示：生成的函数定义包含类型和返回类型。例如：`NativeSetActiveDutyCyclePercentage___VOID__U4`返回void，并且第一个参数为U4，即uint32。这是故意为了帮助管理返回类型和参数。

## Arg0、Arg1、ArgsN

这些是可用于访问参数的辅助函数。我们将在本节中查看这些内容。

### 静态类

在静态类中，`stack.Arg0()`指向在IL堆栈上传递的第一个堆块。如前所述，请**不要**使用`CLR_RT_HeapBlock* pThis = stack.This();`，因为那不会是指向类实例的指针（再次强调：这是对静态方法的调用，因此不存在类的实例）。

### 非静态类

在非静态类中，`stack.Arg0()`等同于`stack.This()`。从C#方法传递的第一个参数可以使用`Arg1()`访问，后续参数可以使用与参数索引相同

的等效调用进行访问。

#### 解引用数组

作为示例，这次让我们使用一个具有数组的函数：

```cpp
HRESULT Library_sys_dev_spi_native_System_Device_Spi_SpiDevice::NativeTransfer___VOID__SZARRAY_U2__SZARRAY_U2__BOOLEAN(CLR_RT_StackFrame &stack)
```

在这个函数中，返回类型是void，它是一个非静态函数，第一个和第三个参数是`SZARRAY`，第二个和第四个参数是`U2`。在这个示例中，您可以像这样访问第一个数组：

```cpp
CLR_RT_HeapBlock_Array *writeBuffer;
uint8_t *writeData = NULL;
writeBuffer = stack.Arg1().DereferenceArray();
if (writeBuffer != NULL)
{
     writeData = (unsigned char *)writeBuffer->GetFirstElementUInt16();
    // 在它不为null的情况下执行一些操作
}
```

`DereferenceArray()`数组函数允许您获取数组并访问第一个元素（在本例中它是一个UInt16数组），您可以使用`GetFirstElementUInt16()`。数组具有自己的堆类型：`CLR_RT_HeapBlock_Array`。正如您所猜到的，对于各种系统类型，还有其他元素函数。

#### 解引用对象

类似于数组，您可以解引用对象、类或结构。然后，您将能够访问其字段。让我们以`SpanByte`结构为例。

```cpp
CLR_RT_HeapBlock *writeSpanByte;
CLR_RT_HeapBlock_Array *writeBuffer;
uint8_t *writeData = NULL;
int16_t writeSize = 0;
int16_t writeOffset = 0;
writeSpanByte = stack.Arg1().Dereference();
if (writeSpanByte != NULL)
{
    // 获取缓冲区
    writeBuffer = writeSpanByte[SpanByte::FIELD___array].DereferenceArray();
    if (writeBuffer != NULL)
    {
        // 获取写入偏移量，仅应写入Span定义的元素，而不是整个数组
        writeOffset = writeSpanByte[SpanByte::FIELD___start].NumericByRef().s4;

        // 使用Span长度作为写入大小，仅应写入Span定义的元素
        writeSize = writeSpanByte[SpanByte::FIELD___length].NumericByRef().s4;
        writeData = (unsigned char *)writeBuffer->GetElement(writeOffset);
    }
}
```

SpanByte包含内部字段，其中包括一个字节数组、一个起始int32和一个长度int32的元素，指定要使用的缓冲区的起始和长度。因此，模式实际上是获取对SpanByte的引用，检查其是否为null，然后获取对数组的引用，并检查其是否为null，然后您就可以获得数组的大小了。`GetElement()`函数将指向您需要的元素。

#### ArgN

只有定义了8个Arg，当您需要进一步访问它们时，可以使用`ArgN(要访问的数字)`。

> 注意：当您开始获取太多参数时，建议切换到

类或结构。

### 获取字符串

从堆栈获取字符串的模式是使用`RecoverString()`函数，它将返回一个字符串。

```cpp
const char* szText = stack.Arg1().RecoverString();
// 您可以检查它是否为有效的非空字符串，就像检查其他堆元素一样：
FAULT_ON_NULL(szText);
```

### 设置结果

您可以使用`SetResult_`系列函数设置返回结果。系统类型可以直接使用，例如U1或R4，或者使用`SetResult_Object`返回任何有效的对象、类或结构。

要返回字符串，`SetResult_String`是您最好的朋友。请注意，此函数返回一个`HRESULT`，应进行检查。

### 具有引用参数的函数以及如何设置它们

可以有一个具有引用参数的函数，并在本地端设置它们。

这里是一个具有静态函数的示例，但它也适用于非静态函数（您只需要从Arg1开始为第一个参数）：

```csharp
[MethodImpl(MethodImplOptions.InternalCall)]
private extern static void NativeGetVoltage(ref TouchHighVoltage touchHighVoltage, ref TouchLowVoltage touchLowVoltage, ref TouchHighVoltageAttenuation touchHighVoltageAttenuation);
```

下面是一个完整的简单示例，演示如何设置参数：

```cpp
HRESULT Library_nanoFramework_hardware_esp32_native_nanoFramework_Hardware_Esp32_Touch_TouchPad::NativeGetVoltage___STATIC__VOID__BYREF_nanoFrameworkHardwareEsp32TouchTouchHighVoltage__BYREF_nanoFrameworkHardwareEsp32TouchTouchLowVoltage__BYREF_nanoFrameworkHardwareEsp32TouchTouchHighVoltageAttenuation( CLR_RT_StackFrame &stack )
{
    NANOCLR_HEADER();

    touch_high_volt_t refh;
    touch_low_volt_t refl;
    touch_volt_atten_t atten;

    // 获取电压
    if (touch_pad_get_voltage(&refh, &refl, &atten) == ESP_OK)
    {
        CLR_RT_HeapBlock bhRefh;
        CLR_RT_HeapBlock bhRefl;
        CLR_RT_HeapBlock bhAtten;
        bhRefh.SetInteger(refh);
        NANOCLR_CHECK_HRESULT(bhRefh.StoreToReference(stack.Arg0(), 0));
        bhRefl.SetInteger(refl);
        NANOCLR_CHECK_HRESULT(bhRefl.StoreToReference(stack.Arg1(), 0));
        bhAtten.SetInteger(atten);
        NANOCLR_CHECK_HRESULT(bhAtten.StoreToReference(stack.Arg2(), 0));
    }
    else
    {
        NANOCLR_SET_AND_LEAVE(CLR_E_INVALID_OPERATION);
    }

    NANOCLR_NOCLEANUP();
}
```

这里的关键元素是首先创建一个堆块`CLR_RT_HeapBlock bhRefh;`，然后设置值`bhRefh.SetInteger(refh);`，最后将其存储到参数中`NANOCLR_CHECK_HRESULT(bhRefh.StoreToReference(stack.Arg0(), 0));`。

请注意，这也适用于对象、数组或字符串。

## 生成异常和其他HAL元素

您可以从本机端生成各种异常。还可以访问更多的HAL元素。

### 生成异常

这很简单，您可以使用`

NANOCLR_SET_AND_LEAVE(THE_EXCEPTION)`。异常的列表可以在[此包含文件](https://github.com/nanoframework/nf-interpreter/blob/main/src/CLR/Include/nf_errors_exceptions.h)中找到。

您可以像这样使用它：

```cpp
NANOCLR_HEADER();

// 一些代码

if (somethingWrong)
{
    NANOCLR_SET_AND_LEAVE(CLR_E_INVALID_OPERATION);
}

// 如果somethingWrong，则此处的代码将不会执行。您将直接到达末尾

// 您将到达的位置
NANOCLR_NOCLEANUP();
```

### 检查函数的结果

您可以使用`NANOCLR_CHECK_HRESULT`等函数来检查`HRESULT`函数的结果是否成功。所有这些宏在[此包含文件](https://github.com/nanoframework/nf-interpreter/blob/main/src/CLR/Include/nanoCLR_Interop.h)中可用并进行了文档化。它们都需要使用与上述相同的模式，例如：

```cpp
NANOCLR_HEADER();

// 一些代码

NANOCLR_CHECK_HRESULT(AnotherNativeFunctionOfHRESULT);

// 如果somethingWrong，则此处的代码将不会执行。您将直接到达末尾

// 您将到达的位置
NANOCLR_NOCLEANUP();
```

## 在软复位之前访问回调

您是否需要在软复位之前清理资源？是的，那么您已经得到了解决。函数`HAL_AddSoftRebootHandler(FeatureSoftRebootHandler);`在这里为您提供帮助！

`FeatureSoftRebootHandler`是一个简单的`void FunctionName()`处理程序。将其添加到初始化函数中，您将确保在软复位之前调用它。

## 在本机端检查对象类型

在许多场合下，您希望在本机端传递一个接口对象。类似于以下情况：

```csharp
[MethodImpl(MethodImplOptions.InternalCall)]
private extern static void NativeStartFilter(IFilterSetting periodSetting);

// 具有一个简单的IFilterSetting接口和实现接口的2个类
public interface IFilterSetting
{
}

public class Esp32FilterSetting : IFilterSetting
{
    // 您将在本机端访问的一些私有字段
    private uint _period;
    // 还有一些公共字段
}

public class S2S3FilterSetting : IFilterSetting
{
    // 不同的字段在这里
    private int _anotherField
    // 还有更多的公共字段
}
```

在本机端，您将获得一个生成的函数和结构，它们看起来像这样：

```cpp
// 函数定义，非常经典
HRESULT Lib_Name::NativeStartFilter___STATIC__VOID__nanoFrameworkHardwareEsp32TouchIFilterSetting(CLR_RT_StackFrame &stack)

struct Lib_Name_Esp32FilterSetting
{
    static const int FIELD___period = 1;

    //--//
};

struct Lib_Name_S2S3FilterSetting
{
    static const int FIELD___anotherField = 1;
  
    //--//
};
```

问题是，在本机端，您如何检查是否传递了`Esp32FilterSetting`或`S

2S3FilterSetting`？

以下代码片段显示了如何实现此目的：

```cpp
CLR_RT_TypeDescriptor typeParamType;
CLR_RT_HeapBlock *bhPeriodeSetting;

// 静态函数，参数0是第一个参数
bhPeriodeSetting = stack.Arg0().Dereference();

// 获取参数的类型描述符
NANOCLR_CHECK_HRESULT(typeParamType.InitializeFromObject(*bhPeriodeSetting));

CLR_RT_TypeDef_Index esp32FilteringTypeDef;
CLR_RT_TypeDescriptor esp32FilteringType;
CLR_RT_TypeDef_Index s2s3FilteringTypeDef;    
CLR_RT_TypeDescriptor s2s3FilteringType;

// 初始化类型以与bhPeriodeSetting参数进行比较
// 这里需要完整的命名空间
g_CLR_RT_TypeSystem.FindTypeDef("Esp32FilterSetting", "nanoFramework.Hardware.Esp32.Touch", esp32FilteringTypeDef);
esp32FilteringType.InitializeFromType(esp32FilteringTypeDef);

// 这里需要完整的命名空间
g_CLR_RT_TypeSystem.FindTypeDef("S2S3FilterSetting", "nanoFramework.Hardware.Esp32.Touch", s2s3FilteringTypeDef);
s2s3FilteringType.InitializeFromType(s2s3FilteringTypeDef);


// 对参数类型进行基本检查
if (!CLR_RT_ExecutionEngine::IsInstanceOf(typeParamType, esp32FilteringType, false))
{
    // 我们有一个Esp32FilterSetting
    // 使用此类实现您的逻辑
}
else if (!CLR_RT_ExecutionEngine::IsInstanceOf(typeParamType, s2s3FilteringType, false))
{
    // 我们有一个S2S3FilterSetting
    // 使用此类实现您的逻辑
}
else
{
    // 不是我们所期望的！
    NANOCLR_SET_AND_LEAVE(CLR_E_INVALID_PARAMETER);
}
```

这使您能够处理本地执行的复杂场景。它还允许在硬件问题和具有通用类但具有特定硬件设置的特定硬件场景中进行区分。现在，它完全取决于您的想象力！