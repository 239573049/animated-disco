# AttributeTableEntry（CLR_RECORD_ATTRIBUTE）

属性表包含以下结构的条目：

| 名称           | 类型                 | 描述            |
|---------------|----------------------|------------    |
| OwnerType     | TableKind            | `TableKind::TypeDef`、`TableKind::MethodDef` 或 `TableKind::FieldDef`之一的类型    |
| OwnerIndex    | uint16_t             | 指向OwnerType指定的表中的索引    |
| Constructor   | MethodDefOrRef       | 表示属性构造函数的MethodRef或MethodDef的二进制标记    |
| Data          | SigTableIndex        | 指向定义属性各部分的签名表中的索引    |

## 签名表的使用方法

（待完成：定义属性的有效签名表序列）