# 基本原理

PE文件格式以多种常见类型的形式表示。在代码中，通常将它们实现为枚举、typedef或某种类型别名，以确保代码的清晰性和正确性。与直接使用原始基本类型相比，这种额外的清晰性和类型安全性更受青睐，因为它们除了基本范围之外没有实际意义，使得代码的正确使用不太明显且更容易出错。

## 表索引

许多PE数据结构将某个表索引存储为字段。该表定义了用于存储索引的类型名称以及索引所指向的表。

|名称                             | 基础类型               | 描述|
|---------------------------------|-------------------------|------------|
|StringTableIndex                 | 无符号16位整数 | 指向字符串表的索引（有关详细信息，请参见：[StringTables](StringTable.md)）|
|TypeDefTableIndex                | 无符号16位整数 | 指向类型定义表的索引|
|TypeRefTableIndex                | 无符号16位整数 | 指向类型引用表的索引|
|FieldDefTableIndex               | 无符号16位整数 | 指向字段定义表的索引|
|MethodDefTableIndex              | 无符号16位整数 | 指向方法定义表的索引|
|SigTableIndex                    | 无符号16位整数 | 指向签名表的索引（有关详细信息，请参见：[SignatureBlobs](SignatureTable.md)）|
|GenericParamTableIndex           | 无符号8位整数 | 指向通用参数表的索引（可以使用1字节索引，因为我们不支持超过255个通用参数）|
|MethodSpecTableIndex             | 无符号16位整数 | 指向方法规范表的索引|

## EmptyIndex常量

由于索引值用于访问表的成员，并且（在C、C++和许多其他语言中）表的索引以索引== 0的第一个元素为索引，值0不能用作指示“无”或“空”的常量。因此，在.NET **nanoFramework**元数据表中使用了专用值。具有值0xFFFF的任何索引均被视为EmptyIndex，并且通常将其定义为整个代码库的清晰常量进行测试。

## 表类型

CLR_TABLESENUM枚举标识程序集元数据中的特定表。

|名称                   | 值  | 描述|
|-----------------------|----|--------------|
|AssemblyRef            | 0x0000 | 程序集引用表|
|TypeRef                | 0x0001 | 类型引用表|
|FieldRef               | 0x0002 | 字段引用表|
|MethodRef              | 0x0003 | 方法引用表|
|TypeDef                | 0x0004 | 类型定义表|
|FieldDef               | 0x0005 | 字段定义

表|
|MethodDef              | 0x0006 | 方法定义表|
|GenericParam           | 0x0007 | 通用参数表|
|MethodSpec             | 0x0008 | 方法规范表|
|Attributes             | 0x0009 | 属性表|
|TypeSpec               | 0x000A | 类型规范表|
|Resources              | 0x000B | 资源表|
|ResourcesData          | 0x000C | 资源数据Blob表|
|Strings                | 0x000D | 字符串Blob表|
|Signatures             | 0x000E | 签名Blob表|
|ByteCode               | 0x000F | IL字节码流Blob表|
|ResourcesFiles         | 0x0010 | 资源文件表|
|EndOfAssembly          | 0x0011 | 程序集结束表（用于快速查找程序集的结束位置）|
|Max                    | 0x0012 | 枚举结束值，有效的枚举值必须小于此值|

## 其他类型

|名称                | 基础类型               | 描述|
|--------------------|-------------------------|------------|
|MetadataOffset      | 无符号16位整数 | 从IL指令流Blob数据的起始位置偏移|
|MetadataPtr         | 指向const byte的指针 | 指向IL指令流Blob数据内部的指针|

## 标记

IL中的许多指令和数据结构的字段包含标记。IL Metadata中的标记引用程序集中的其他元数据。标记将标记引用的表和索引合并为单个原始整数值。在.NET **nanoFramework** PE文件中，有两种类型的标记：MetadataToken和更紧凑的BinaryToken。

### Metadata Token

元数据标记是一个无符号32位值，其中最高字节是表类型，最低的16位是表索引（在.NET **nanoFramework** PE格式中，表索引仅为16位，因此在MetadataToken中有8位未使用的数据）。

### Binary Token

Binary Token是一种紧凑表示对一个或多个表的索引的形式。.NET **nanoFramework**遵循ECMA-335规范（I I.24.2.66）中的_coded index_约定，其中最低有效位用于确定可能的表中的哪个，其余位提供表条目的索引。除了因遗留代码而使用最高有效位的几个标记之外，由于其大小较小，只使用2字节版本。下表提供了在.NET **nanoFramework** PE元数据中使用的各种表组合的类型名称别名。

|TypeRefOrAssemblyRef:（1位用于编码标记） | 标记|
|--------------------------------------------|-----|
|AssemblyRef | 0|
|TypeRef     | 1|

|TypeDefOrRef:（2位用于编码标记） | 标记|
|-------------------------------------|-----|
|TypeDef  | 0|
|TypeRef  | 1|
|TypeSpec | 2|

|MethodDef

OrRef:（1位用于编码标记） | 标记|
|--------------------------------------|-----|
|MethodDef | 0|
|MemberRef | 1|

|MemberRefParent:（3位用于编码标记） | 标记|
|-------------------------------------|-----|
|TypeDef   | 0|
|TypeRef   | 1|
|ModuleRef | 2|
|MethodDef | 3|
|TypeSpec  | 4|

|TypeOrMethodDef:（1位用于编码标记） | 标记|
|---------------------------------------|-----|
|TypeDef   | 0|
|MethodDef | 1|

|FieldRefOrFieldDef:（1位用于编码标记） | 标记|
|------------------------------------------|-----|
|FieldDef | 0|
|FieldRef | 1|

## VersionInfo

许多.NET **nanoFramework** PE数据结构包含一个版本信息。版本通常以可读性的方式表示为由点分隔的4个整数值的四重数（例如1.2.3.4）。以下表定义了PE文件中用于表示版本的Version info结构。

|名称     | 类型                    | 描述|
|---------|-------------------------|------------|
|Major    | 无符号16位整数 | 共同版本四重数的主要组件|
|Minor    | 无符号16位整数 | 共同版本四重数的次要组件|
|Build    | 无符号16位整数 | 共同版本四重数的构建组件|
|Revision | 无符号16位整数 | 共同版本四重数的修订组件|

## DataType

`DataType`枚举对应于ECMA-335 ELEMENT_TYPE_xxxx，但实际数值与解释器使用的标准值不同，只使用了减少的子集。

|名称        | 描述|
|------------|------------|
|Void        | 0字节的void值|
|Boolean     | 1字节的布尔值|
|I1          | 8位有符号整数|
|U1          | 8位无符号整数|
|CHAR        | 16位UTF-16字符|
|I2          | 16位有符号整数|
|U2          | 16位无符号整数|
|I4          | 32位有符号整数|
|U4          | 32位无符号整数|
|R4          | 32位IEEE-754浮点数|
|I8          | 64位有符号整数|
|U8          | 64位无符号整数|
|R8          | 64位IEEE-754浮点数|
|DateTime    | 8字节 - System.DateTime的快捷方式|
|TimeSpan    | 8字节 - System.TimeSpan的快捷方式|
|String      | 4字节 - 对System.String的引用的快捷方式|
|Object      | 4字节 - 对System.Object的引用的快捷方式|
|Class       | CLASS `<class Token>`|
|ValueType   | VALUETYPE `<class Token>`|
|SZArray     | 单维零下界数组的快捷方式 SZARRAY `<type>`|
|ByRef       | BYREF `<type>`|
|Var        

 | VAR泛型类型定义中的泛型参数，表示为数字（v2.0中新增）|
|GenericInst | GENERICINST泛型类型实例化（v2.0中新增）|
|MVar        | MVAR泛型方法定义中的泛型参数，表示为数字（v2.0中新增）|