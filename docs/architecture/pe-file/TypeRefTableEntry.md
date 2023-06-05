# TypeRefTableEntry（CLR_RECORD_TYPEREF）

TypeRef表包含以下列：

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| Name | StringTableIndex | 类型名称在[string table](StringTable.md)中的索引 |
| Namespace | StringTableIndex | 命名空间在[string table](StringTable.md)中的索引 |
| Scope | TypeRefOrAssemblyRef | 二进制标记，指向[TypeRef表](TypeRefTableEntry.md)或[AssemblyRef表](AssemblyRefTableEntry.md)之一 |