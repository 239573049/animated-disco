# .NET **nanoFramework** PE文件格式

.NET **nanoFramework**的PE数据格式基于ECMA-335规范，具体参考第II.22至II.24节。由于.NET **nanoFramework**所针对的系统的限制，PE文件格式与ECMA-335规范并不完全匹配/实现。.NET **nanoFramework**的PE文件格式实质上是ECMA-335规范中定义格式的扩展子集。

## 与ECMA-335的主要区别

- 为了尽可能降低内存占用，.NET **nanoFramework**中的元数据表的数量和大小受到限制。
- 剥离了Windows PE32/COFF头部、表格和信息。
- Switch指令的分支表索引限制为8位。
- 表索引限制为12位。
- 这也意味着元数据标记为16位而不是32位，因此实际的IL指令流在.NET **nanoFramework**中是不同的。
- 资源以一种非常不同的方式处理，具有自己在程序集头部的特殊表格。

## 文件数据结构

PE文件以[Assembly header](pe-file/AssemblyHeader.md)开头，这是每个.NET **nanoFramework** PE文件的顶层结构。在磁盘上，AssemblyHeader结构位于.PE文件的偏移量0处。在设备上，AssemblyHeader在一个已知的ROM/FLASH区域（Deployment区域）内以32位边界对齐，第一个程序集位于该区域的偏移量0处。紧随程序集头部之后的是元数据表数据。由于一个程序集不需要所有可能的表格，也不需要每个表格中的条目数量有固定的要求，每个表格数据的确切大小和位置完全由头部描述，包括程序集的结束位置，用于计算内存中任何后续程序集的起始位置。

```text
+-----------------+ <--- 在内存中以32位边界对齐
| AssemblyHeader  |
+-----------------+
| Metadata        |
+-----------------+
| { padding }     |
+-----------------+ <--- 在内存中以32位边界对齐
| AssemblyHeader  |
+-----------------+
| Metadata        |
+-----------------+
| { padding }     |
+-----------------+ <--- 在内存中以32位边界对齐
|  ...            |
```

## 其他表格条目的结构

- [AssemblyRef表格](pe-file/AssemblyRefTableEntry.md)
- [Attribute表格](pe-file/AttributeTableEntry.md)
- [ExceptionHandler表格](pe-file/ExceptionHandlerTableEntry.md)
- [FieldRef表格](pe-file/FieldRefTableEntry.md)
- [MethodDef表格](pe-file/MethodDefTableEntry.md)
- [MethodRef表格](pe-file/MethodRefTableEntry.md)
- [Resources表格](pe-file/ResourcesTableEntry.md)
- [TypeDef表格](pe-file/TypeDefTableEntry.md)
- [TypeRef表格](pe-file/TypeRefTableEntry.md)
- [TypeSpec表格](pe-file/TypeSpecTableEntry.md)
- [GenericParam表格](pe-file/GenericParamTableEntry.md)（v2.0中新增）
- [MethodSpec表格](pe-file/MethodSpecTableEntry.md)（v2.0中新增）
- [通用PE类型和枚举](pe-file/Common-PE-Types-and-Enumerations.md)

    > 注意1：上述结构体以1字节边界对齐。
    > 注意2：PE文件格式的文档取自.NET Micro Framework的原始文档。