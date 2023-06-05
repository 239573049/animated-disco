# MethodRefTableEntry（CLR_RECORD_METHODREF）

MethodRef 表包含具有以下结构的条目

| 名称       | 类型                  | 描述                |
|-----------|----------------------|--------------------|
| Name      | StringTableIndex     | 方法名称在[字符串表](StringTable.md)中的索引 |
| Container | TypeRefTableIndex    | 包含该方法的类型在[TypeRef 表](TypeRefTableEntry.md)中的索引 |
| Sig       | SignatureTableIndex  | 方法签名在[签名表](SignatureTable.md)中的索引 |