# TypeDefTableEntry (CLR_RECORD_TYPEDEF)

MethodRef表包含以下结构的条目：

| 名称 | 类型 | 描述 |
|---------------------|---------------------|------------  |
| Name                | StringTableIndex | 类型名称在字符串表中的索引 |
| NameSpace           | StringTableIndex | 包含该类型的命名空间在字符串表中的索引 |
| Extends             | TypeDefOrRef | 指向[TypeDef表](TypeDefTableEntry.md)、[TypeRef表](TypeRefTableEntry.md)或[TypeSpec表](TypeSpecTableEntry.md)中的索引，更准确地说，是TypeDefOrRef |
| EnclosingType       | TypeDefOrRef | 指向[TypeDef表](TypeDefTableEntry.md)中的索引，如果这是一个嵌套类型，则更准确地说是TypeDefOrRef。|
| Interfaces          | SignatureTableIndex | 指向实现该类型的接口集的签名blob表中的索引 |
| FirstMethod         | MethodDefTableIndex | 指向[MethodDef表](MethodDefTableEntry.md)中该类型的第一个方法的索引 |
| VirtualMethodCount  | uint8_t | 该类型中虚方法的数量 |
| InstanceMethodCount | uint8_t | 该类型中实例方法的数量 |
| StaticMethodCount   | uint8_t | 该类型中静态方法的数量 |
| DataType            | DataType | 该类型的数据类型标识 |
| FirstStaticField    | FieldDefTableIndex | 指向[FieldDef表](FieldDefTableEntry.md)中该类型的第一个静态字段的索引 |
| FirstInstanceField  | FieldDefTableIndex | 指向[FieldDef表](FieldDefTableEntry.md)中该类型的第一个实例字段的索引 |
| StaticFieldsCount   | uint8_t | 该类型中静态字段的数量 |
| InstanceFieldsCount | uint8_t | 该类型中实例字段的数量 |
| FirstGenericParam   | GenericParamTableIndex | 指向[GenericParam表](GenericParamTableEntry.md)中该类型的第一个泛型参数的索引 |
| GenericParamCount   | uint8_t | 该类型的泛型参数数量 |
| Flags               | [TypeDefFlags](#typedefflags) | 定义该类型的内在属性和访问修饰符的标志 |

## TypeDefFlags

TypeDefFlags枚举提供了一组标志值，用于类型定义的各种内在属性和可访问性特征。

| 名称               | 值  | 描述  |
|--------------------|--------|------------|
|               None | 0      | 没有特殊属性或语义|
|          ScopeMask | 0x0007 | 用于提取可访问性范围值的掩码|
|          NotPublic | 0x0000 | 类不是公共范围。|
|             Public | 0x0001 | 类是公共范围。|
|       NestedPublic | 0x0002 | 类是具有公共可见性的嵌套类。|
|      NestedPrivate | 0x0003 | 类是具有私有可见性的嵌套类。|
|       NestedFamily | 0x0004 | 类是具有家族可见性的嵌套类。|
|     NestedAssembly | 0x0005 | 类是具有程序集可见性的嵌套类。|
|  NestedFamANDAssem | 0x0006 | 类是具有家族和程序集可见性的嵌套类。|
|   NestedFamORAssem | 0x0007 | 类是具有家族或程序集可见性的嵌套类。|
|       Serializable | 0x0008 | 类型是可序列化的|
|      SemanticsMask | 0x0030 | 用于提取与类型语义相关的位的掩码|
|              Class | 0x0000 | 类语义（特别是该字段的值为4和5位为0）|
|          ValueType | 0x0010 | 值类型语义|
|          Interface | 0x0020 | 接口语义|
|               Enum | 0x0030 | 枚举语义|
|           Abstract | 0x0040 | 类型是抽象的|
|             Sealed | 0x0080 | 类型是密封的|
|        SpecialName | 0x0100 | 类型是一个众所周知的特殊名称|
|           Delegate | 0x0200 | 类型是委托|
|  MulticastDelegate | 0x0400 | 类型是多路广播委托|
|            Patched | 0x0800 | （待办事项）|
|    BeforeFieldInit | 0x1000 | （待办事项）|
|        HasSecurity | 0x2000 | （待办事项）|
|       HasFinalizer | 0x4000 | （待办事项）|
|      HasAttributes | 0x8000 | （待办事项）|