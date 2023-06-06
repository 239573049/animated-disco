---
sidebar_position: 1
---


# .NET **nanoFramework** PE文件格式

.NET **nanoFramework**的PE数据格式基于ECMA-335规范，具体参考第II.22 - II.24节。由于.NET **nanoFramework**的系统限制，PE文件格式并不是ECMA-335规范的完全匹配/实现。.NET **nanoFramework**的PE文件格式本质上是ECMA-335中定义格式的扩展子集。

## 与ECMA-335的主要区别

- 在.NET **nanoFramework**中，元数据表的数量和大小受限，以尽可能降低总体内存占用。
- Windows PE32/COFF头部、表和信息被剥离。
- Switch指令的分支表索引限制为8位。
- 表索引限制为12位。
- 这也意味着元数据标记为16位而不是32位，因此实际的IL指令流在.NET **nanoFramework**中是不同的。
- 资源的处理方式与ECMA-335有很大不同，具有自己的特殊表格在程序集头部。

## 文件数据结构

PE文件以[程序集头部](AssemblyHeader.md)开头，它是每个.NET **nanoFramework** PE文件的顶层结构。在磁盘上，AssemblyHeader结构位于.PE文件的偏移0处。在设备上，AssemblyHeader在已知的ROM/FLASH区域（部署区域）内按32位边界对齐，第一个程序集在该区域的偏移0处。程序集头部紧随其后的是元数据表数据。由于程序集没有固定的要求需要所有可能的表格或每个表格中条目的数量，每个表格数据的确切大小和位置完全由头部描述，包括程序集的结束位置，用于计算内存中任何后续程序集的起始位置。

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

- [AssemblyRef表](AssemblyRefTableEntry.md)
- [Attribute表](AttributeTableEntry.md)
- [ExceptionHandler表](ExceptionHandlerTableEntry.md)
- [FieldRef表](FieldRefTableEntry.md)
- [MethodDef表](MethodDefTableEntry.md)
- [MethodRef表](MethodRefTableEntry.md)
- [Resources表](ResourcesTableEntry.md)
- [TypeDef表](TypeDefTableEntry.md)
- [TypeRef表](TypeRefTableEntry.md)
- [TypeSpec表](TypeSpecTableEntry.md)
- [GenericParam表](GenericParamTableEntry.md)（v2.0中新增）
- [MethodSpec表

](MethodSpecTableEntry.md)（v2.0中新增）
- [常用PE类型和枚举](Common-PE-Types-and-Enumerations.md)

    > 注意1：以上结构按1字节边界对齐。
    > 注意2：PE文件格式的文档取自.NET Micro Framework的原始文档。