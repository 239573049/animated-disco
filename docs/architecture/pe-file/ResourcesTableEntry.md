# 资源表条目（CLR_RECORD_RESOURCE）

资源表用于描述绑定到程序集的资源

| 名称          | 类型                 | 描述  |
|---------------|----------------------|------------  |
| Id            | uint16_t             | 资源的ID|
| Kind          | ResourceKind         | 资源的类型|
| Flags         | uint8_t              | 资源的标志|
| Offset        | ResourcesDataTableIndex | 指向ResourcesData blob表的索引|

## ResourceKind

| 名称    | 值 | 描述|
|---------|------|-----|
| Invalid | 0x00 | 无效条目|
| Bitmap  | 0x01 | 资源是位图|
| Font    | 0x02 | 资源是TinyCLR字体格式的字体|
| String  | 0x03 | 资源是字符串|
| Binary  | 0x04 | 资源是二进制blob|

## 常量

| 名称 | 值 | 描述|
|------|-------|------------|
| SentinelId       | 0x7FFF | 标记（详见[注释](#notes)）|
| FlagsPaddingMask | 0x03   | 用于检索标志的低两位的掩码，以获取填充（详见[注释](#notes)）|

## 注释

资源表中的最后一个条目将具有：

| 字段  | 值|
|--------|-------|
| Id     | SentinelId|
| Kind   | Invalid|
| Offset | ResourceData表的大小|
| Flags  | 0|

这用于确保前面的条目可以使用最后一个条目的偏移量来计算ResourceData blob表中其数据的大小。

标志的低两位是用于对齐此条目数据的填充。也就是说，前一个条目的数据大小是此条目的偏移量减去前一个条目的偏移量减去此条目的填充。或者换句话说，计算资源大小需要引用表中的下一个条目。使用下一个条目，可以使用以下公式计算大小：

`sizeOfResource = next.Offset - Offset + ( next.Flags & FlagsPaddingMask )`