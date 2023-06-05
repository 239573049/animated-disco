# FieldRefTableEntry（CLR_RECORD_FIELDREF）

FieldRef 表包含以下列：

| 名称       | 类型                  | 描述            |
|-----------|----------------------|------------  |
| Name      | StringTableIndex     | 指向[字符串表](StringTable.md)中类型名称的索引  |
| Owner     | TypeRefTableIndex    | 指向包含此字段的类型的[TypeRef 表](TypeRefTableEntry.md)中的索引  |
| Sig       | SigTableIndex        | 指向描述此字段类型的[签名表](SignatureTable.md)中的索引  |