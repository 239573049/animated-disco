# GenericParamTableEntry（CLR_RECORD_GENERICPARAM）

GenericParam 表（自 v2.0 版本开始）包含以下列：

| Name   | Type             | Description  |
|--------|------------------|------------  |
| Number | uint16_t         | 泛型参数的 2 字节索引，从左到右编号，从零开始。|
| Flags  | uint16_t         | 类型为 GenericParamAttributes 的 2 字节位掩码。|
| Owner  | TypeOrMethodDef  | 对 TypeDef 或 MethodDef 表的索引，指定适用于此泛型参数的类型或方法；更准确地说，是一个 TypeOrMethodDef。|
| Name   | StringTableIndex | 对 [字符串表](StringTable.md) 的索引，提供泛型参数的名称。|