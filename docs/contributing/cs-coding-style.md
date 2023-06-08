# C# 编码风格

对于非代码文件（如 xml 等），我们目前的最佳指导是保持一致性。在编辑文件时，新代码和更改应与文件中的样式保持一致。对于新文件，应符合该组件的样式。最后，如果有一个全新的组件，任何合理广泛接受的样式都可以。

我们遵循的一般规则是“使用 Visual Studio 默认设置”。有关详细信息，请查看 .NET 指南的 [命名指南](https://docs.microsoft.com/zh-cn/dotnet/standard/design-guidelines/naming-guidelines)。

1. 我们使用 [Allman 风格](http://en.wikipedia.org/wiki/Indent_style#Allman_style) 的大括号，每个大括号都从新的一行开始。即使是单行语句块也应该使用大括号，并嵌套在使用大括号的其他语句块中。
2. 我们使用四个空格的缩进（不使用制表符）。
3. 我们使用 `_camelCase` 命名内部和私有字段，并在可能的情况下使用 `readonly`。静态字段可以使用 `s_` 前缀，线程静态字段可以使用 `t_` 前缀。当用于静态字段时，`readonly` 应该在 `static` 之后（即 `static readonly` 而不是 `readonly static`）。
4. 除非绝对必要，否则我们避免使用 `this.`。
5. 我们始终指定可见性，即使它是默认的（例如，`private string _foo` 而不是 `string _foo`）。可见性应该是第一个修饰符（即 `public abstract` 而不是 `abstract public`）。
6. 命名空间导入应该在文件顶部指定，*在* `namespace` 声明之外，并按字母顺序排序。
7. 避免在任何时候使用多个空行。例如，不要在类型的成员之间有两个空行。
8. 在闭合括号 `}` 后添加一个额外的空行，除非后面跟着另一个闭合括号或另一个指令（如 `else`）。
9. 避免不必要的空格。例如，避免 `if (someVar == 0)...`，其中点表示不必要的空格。如果使用 Visual Studio，请考虑启用“查看空格（Ctrl+E，S）”以帮助检测。提示：在 Visual Studio 中使用 `clrl+k+d` 清除缩进和额外的空格。
10. 如果文件与这些指南的样式不同（例如，私有成员的名称为 `m_member` 而不是 `_member`），则该文件中现有的样式优先。
11. 只有在变量类型显然时才使用 `var`（例如，`var stream = new FileStream(...)` 而不是 `var stream = OpenStandardInput()`）。
12. 我们使用语言关键字而不是 BCL 类型（例如，`int、string、float` 而不是 `Int32、String、Single` 等）来引用类型以及方法调用（例如，`int.Parse` 而不是 `Int32.Parse`）。
13. 我们使用 PascalCasing 命名所有常量局部变量和字段。唯一的例外是在互操作代码中，常量值应该与您通过互操作调用的代码的名称和值完全匹配。
14. 我们在可能和相关的情况下使用 ```nameof(...)``` 而不是 ```"..."```。
15. 字段应在类型声明中的顶部指定。
16. 在所有公共元素上始终添加智能感知（/// 注释），包括返回类型、参数。
17. 在智能感知注释中使用 *exception* 描述异常，并**避免**在引发的异常中添加文本。这将节省 PE 代码上的空间。但是，如果对工具（如 nanoff）做出贡献，则**应**使用它们。
18. 不要忘记头部，可以使用 2 行简化版本。
19. 尽量避免缩写，尽可能使用更长的名称，并在有意义的情况下使用它们。对于非常知名的缩写，如 HTTP，可以使用它们。此外，如果使用缩写，名称应遵循该模式。例如，如果您在名为 `Something` 的函数的名称中使用了 `HTTP`，则它将是 `HttpSomething`。这也适用于命名空间、类、属性、变量名。

我们在每个存储库的根目录下提供了一个 Visual Studio 2013 vssettings 文件 `nnnnn.vssettings`，可启用符合上述指南的 C# 自动格式设置。请注意，规则 7 和 8 不包含在 vssettings 中，因为这些规则目前不受 VS 格式设置支持。## 示例文件

``ObservableLinkedList`1.cs:``

```C#
// 根据一个或多个协议，.NET 基金会授权此文件给您。
// .NET 基金会根据 MIT 许可证向您授权此文件。

using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.ComponentModel;
using System.Diagnostics;
using Microsoft.Win32;

namespace System.Collections.Generic
{
    /// <summary>
    /// 这是一个清晰的描述。
    /// </summary>
    /// <typeparam name="T">这个泛型参数的描述。</typeparam>
    public partial class ObservableLinkedList<T> : INotifyCollectionChanged, INotifyPropertyChanged
    {
        // 所有常量，公共或私有，都放在最前面
        private const int CountDefualt = 42;
        // 所有变量声明都放在最上面
        // 以任何静态内容开头
        private ObservableLinkedListNode<T> _head;
        private int _count;

        /// <summary>
        /// 实例化 ObservableLinkedList 类。
        /// </summary>
        /// <param name="items">一个可枚举的项。</param>
        /// <exception cref="ArgumentNullException">items 参数不能为空。</exception>
        public ObservableLinkedList(IEnumerable<T> items)
        {
            if (items == null)
            {
                throw new ArgumentNullException(nameof(items));
            }

            foreach (T item in items)
            {
                AddLast(item);
            }
        }

        /// <summary>
        /// 集合更改事件。
        /// </summary>
        public event NotifyCollectionChangedEventHandler CollectionChanged;

        /// <summary>
        /// 获取计数。
        /// </summary>
        public int Count => _count;        

        /// <summary>
        /// 另一个好的描述。所有句子都应该以句号结束。
        /// </summary>
        /// <param name="value">这个变量的好描述。</param>
        /// <returns>当然还有返回类型！</returns>
        public ObservableLinkedListNode AddLast(T value)
        {
            var newNode = new LinkedListNode<T>(this, value);

            InsertNodeBefore(_head, node);
        }

        protected virtual void OnCollectionChanged(NotifyCollectionChangedEventArgs e)
        {
            NotifyCollectionChangedEventHandler handler = CollectionChanged;
            if (handler != null)
            {
                handler(this, e);
            }
        }

        private void InsertNodeBefore(LinkedListNode<T> node, LinkedListNode<T> newNode)
        {
            ...
        }

        ...
    }
}
```