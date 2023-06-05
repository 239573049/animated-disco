# FieldRefTableEntry（CLR_RECORD_FIELDDEF）

FieldDef表包含以下列：

| 名称         | 类型                  | 描述                                            |
|--------------|-----------------------|------------------------------------------------|
| 名称         | StringTableIndex      | 指向[字符串表](StringTable.md)中类型名称的索引  |
| Sig          | SigTableIndex         | 指向[签名表](SignatureTable.md)中描述该字段类型的索引 |
| DefaultValue | SigTableIndex         | 指向[签名表](SignatureTable.md)中描述该字段初始值的索引 |
| Flags        | uint16_t              | 定义字段的内部属性和访问修饰符的标志              |