# MethodDefTableEntry（CLR_RECORD_METHODDEF）

MethodRef 表包含以下结构的条目

| 名称 | 类型 | 描述 |
|-------------------|------------------|------------  |
| Name | StringTableIndex | 方法名称在 [字符串表](StringTable.md) 中的索引 |
| RVA | MetadataOffset | 方法的 IL 字节码表中操作码的偏移量 |
| Flags | MethodDefFlags | 标志，指示方法的内在属性和语义 |
| RetVal | DataType | 方法的返回值的数据类型 |
| ArgumentsCount | uint8_t | 方法的参数数量 |
| LocalsCount | uint8_t | 方法的局部变量数量 |
| LengthEvalStack | uint8_t | 方法的评估堆栈长度 |
| Locals | SigTableIndex | 描述方法的局部变量的 [签名表](SignatureTable.md) 中的索引 |
| FirstGenericParam | GenericParamTableIndex | 方法的第一个泛型参数在 [GenericParam 表](GenericParamTableEntry.md) 中的索引 |
| GenericParamCount | uint8_t | 方法的泛型参数数量 |
| Signature | SigTableIndex | 描述方法本身的 [签名表](SignatureTable.md) 中的索引 |

## Signature 表的使用

方法定义中的方法 Def 对签名表有多个引用，每个引用以不同的方式描述方法的某个方面。本节描述了签名的条目顺序及其在方法定义中的含义。

### Locals Signature 表

（TODO：定义局部签名的允许序列链。ECMA 使用图表进行说明-考虑在此处使用 SVG）

### 方法签名

（TODO：定义方法签名的允许序列链。ECMA 使用图表进行说明-考虑在此处使用 SVG）