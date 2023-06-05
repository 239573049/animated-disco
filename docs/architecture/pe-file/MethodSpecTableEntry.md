# MethodSpecTableEntry (CLR_RECORD_METHODSPEC)

MethodSpec 表（v2.0 中新增）包含以下列：

| 名称           | 类型                   | 描述                                                          |
|---------------|---------------------|------------                                                  |
| Method        | MethodDefOrRef      | 索引指向 [MethodDef 表](MethodDefTableEntry.md) 或 [MemberRef 表](MethodRefTableEntry.md)，指定该行引用的泛型方法；也就是说，该行是哪个泛型方法的实例化；更准确地说，是一个 MethodDefOrRef。|
| Instantiation | SignatureTableIndex | 索引指向 [signature 表](SignatureTable.md)，其中存储了该实例化的签名。|