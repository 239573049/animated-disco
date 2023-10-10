# 开发者指南

我们正在进行中！请保持关注！提交PR将有助于我们找到良好的建议。

在此之前，以下是一些未排序的提示。
这些不是完整的参考，但它们提供了一些线索，指导你下一步该去哪里。

## 关于托管和本机部分之间的兼容性的快速说明

托管库和固件之间存在一个接口机制。这个接口是围绕着用 `MethodImpl(MethodImplOptions.InternalCall)` 属性装饰的方法构建的。在构建托管库时，会生成一个考虑方法名称、参数和返回类型的校验和值。这个校验和值用于描述库接口，并存储在存根文件中。
只要接口没有更改，双方都可以发生变化而不会出现兼容性问题。

有关校验和值的更多详细信息，请参阅[NativeMethodsChecksum](../architecture/pe-file/AssemblyHeader.md#nativemethodschecksum) `AssemblyHeader` 字段的描述。

有关整体版本控制的更多详细信息，请参阅[NuGet、程序集和本机版本](https://www.nanoframework.net/nuget-assembly-and-native-versions/)博客文章。

## 如何从托管代码调用本机代码

假设你想要从NanoFramework的mscorlib（源代码可以在CoreLibrary存储库中找到）的C#代码（例如System.Number类）调用一些你想放在其nanoCLR（源代码在nf-interpreter存储库中）的C++代码中的实现。请按照以下步骤操作：

1. 构建nf-CoreLibrary解决方案，不做任何更改。
2. 复制以下文件夹以备将来使用：
   - `nanoFramework.CoreLibrary\bin\Debug\Stubs`
   - `nanoFramework.CoreLibrary.NoReflection\bin\Debug\Stubs`
3. 在你的C#类中声明你的C++函数：

   ```csharp
   [MethodImpl(MethodImplOptions.InternalCall)]
   private static extern String FormatNative(
      Object value,
      bool isInteger,
      String format,
      String numberDecimalSeparator,
      String negativeSign,
      String numberGroupSeparator,
      int[] numberGroupSizes);
   ```

4. 添加调用上面函数的代码，根据你的需要。
5. 如果你更改了程序集签名（通过添加或修改 `extern` 函数），你应该在 `AssemblyInfo.cs` 文件中增加程序集版本：

   ```csharp
   [assembly: AssemblyNativeVersion("100.5.0.5")]
   ```

6. 构建解决方案。
7. 比较 `nanoFramework.CoreLibrary\bin\Debug\Stubs` 文件夹的实际状态与保存的状态。应该更改的文件包括：
   - `corlib_native.cpp`
   - `corlib_native.h`
   - 你的类的C++对应项，例如在示例中的 `corlib_native_System_Number.cpp`

   还要在 `nanoFramework.CoreLibrary.NoReflection\bin\Debug\Stubs` 下执行相同的操作。
8. 将你发现的更改应用到 `nf-interpreter/src/CLR/CorLib` 下的相同文件中。

   请不要覆盖那里的文件！nf-interpreter下的文件可能包含额外的声明等。
   打开文件，查找 `#if (NANOCLR_REFLECTION ==` 行。可能会有更多这样的行。
   有意义地复制差异：
   - 来自 `nanoFramework.CoreLibrary\bin\Debug\Stubs` 的更改将进入 `NANOCLR_REFLECTION == TRUE` 块
   - 来自 `nanoFramework.CoreLibrary.NoReflection\bin\Debug\Stubs` 的更改将进入 `NANOCLR_REFLECTION == FALSE` 块。
9. 你将发现一个用以下签名生成的函数存根：

   ```cpp
   HRESULT Library_corlib_native_System_Number::
       FormatNative___STATIC__STRING__OBJECT__BOOLEAN__STRING__STRING__STRING__STRING__SZARRAY_I4(CLR_RT_StackFrame &stack)
   ```

10. 现在你可以实现你的函数。

## 如何处理从C#调用收到的C++参数值

让我们看一下在(#How-to-call-native-code-from-managed-code)提示中讨论的示例方法。由lib-CoreLibrary解决方案构建生成的C++存根将具有 `CLR_RT_StackFrame &stack` 参数。
可以按以下方式访问这些值：

### `object value`

```cpp
// 获取值容器的引用
CLR_RT_HeapBlock *value;
value = &(stack.Arg0());

// 如果需要，执行拆箱操作
CLR_RT_TypeDescriptor desc;
NANOCLR_CHECK_HRESULT(desc.InitializeFromObject(*value));
NANOCLR_CHECK_HRESULT(value->PerformUnboxing(desc.m_handlerCls));

// 获取值容器中值的CLR_DataType，比如对于Byte，它是DATATYPE_U1，对于Double，它是DATATYPE_R8
CLR_DataType dataType = value->DataType();

// 根据上面的dataType，获取实际值
int32_t int32Value = value->NumericByRef().s4;
```

### `bool isInteger`

```cpp
// 获取值
bool isInteger;
isInteger = (bool)stack.Arg1().NumericByRef().u1;
```

### `String format`

```cpp
// 获取值
char *format;
format = (char *)stack.Arg2().RecoverString();
```

### `int[] numberGroupSizes`

```cpp
// 获取值容器的引用
CLR_RT_HeapBlock_Array *numberGroupSizes;
numberGroupSizes = stack.Arg6().DereferenceArray();

// 获取元素的数量
CLR_UINT32 numOfElements = numberGroupSizes->m_numOfElements;

// 获取第五个元素
// 需要进行强制转换，因为GetElement声明为CLR_INT8*，
// 但C#代码调用将Int32类型的项目放入数组中。
int the5thElement = *((CLR_INT32 *)numberGroupSizes->GetElement(5));
```

## 从C++函数返回给C#代码

应该通过 `CLR_RT_StackFrame &stack` 参数返回值。

### 字符串

```cpp
char * ret;
// ... 分配

值给ret ...

// 使用辅助方法设置返回值
NANOCLR_SET_AND_LEAVE(stack.SetResult_String(ret));
```

## 带有异常返回

```cpp
// 查看其他CLR_E_*定义的值
NANOCLR_SET_AND_LEAVE(CLR_E_FAIL);
```

不确定差异，但是 `CLR_RT_StackFrame &stack` 参数上可能还有一个 `NotImplementedStub` 辅助方法，也可以使用：

```cpp
NANOCLR_SET_AND_LEAVE(stack.NotImplementedStub());
```

## 示例托管-本机开发周期

托管-本机边界跨越开发周期可能会带来显着的时间成本。
没有任何快捷方式，所需的步骤包括：

1. 编译本机代码更改。
2. 将本机代码更改下载到设备上。
3. 编译托管代码。
4. 将托管代码下载到设备上。
5. 执行代码。

因此，需要两次构建，两次下载，并涉及两个开发环境。

下面是一个建议，可在不影响物理设备功能（如GPIO端口等）的情况下使用，仅需要执行nanoCLR的设备，例如实现数字ToString()功能。这可以节省大量时间。

1. 编写需要本机代码支持的托管代码（请参阅#如何从托管代码调用本机代码）但是不要将本机部分声明为 `extern` 方法。只需将其声明为“正常”的私有方法。添加一些简单的实现，支持你的托管代码的当前开发状态，例如从本机调用预期从本机调用中获得的常量。根据这个存根完成你的托管编码。你还可以为你的代码编写测试，因为你有一个“模拟”的本机行为。无需离开托管代码开发环境。
2. 将存根替换为正确的 `extern` 声明。重新构建解决方案以获取如#如何从托管代码调用本机代码中描述的适当的 corlib 更改。
3. 切换到本机代码开发环境。
4. 为 `extern` 对应的C++函数添加最小的实现：只需从它们的CLR形式提取参数到C++形式（请参阅#如何处理从C#调用收到的C++参数值）。目标是：将托管调用特定的东西转换成纯粹的本机C++。使用从提取的参数将调用转发到具有相同逻辑签名的私有函数。现在你有一个没有任何CLR特定参数处理逻辑的“干净”的C++函数。
5. [调试一次](../building/build-esp32.md#debugging-nanoclr-without-special-hardware)。检查你的“干净”C++函数是否从托管调用中适当地接收到所有参数。
6. 实现“干净”C++函数的主体。此时，你不依赖于托管调用，因此可以随时以任何开发方法在任何地方编写和调试你的代码，使用测试调用你的函数，无需设置大量的CLR对象来测试你正在开发的代码。例如，你可以在<https://www.onlinegdb.com/>上编写和调试你的代码。