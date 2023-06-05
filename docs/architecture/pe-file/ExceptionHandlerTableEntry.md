# 异常处理表项（CLR_RECORD_EH）

异常处理表包含方法内异常处理块的条目。如果方法设置了`MethodDefFlags::HasExceptionHandlers`标志，那么方法的字节码表的最后一个字节是该方法的异常处理程序数量。异常处理程序在字节码流中的计数之前（例如，与大小之间存在负偏移）。

## 重要注意事项

这意味着在PE映像中存储的此结构的实例可能存储在**不正确对齐**的地址上。因此，使用者应始终将数据复制到正确对齐的缓冲区中。

**_REVIEW:_**
在PE二进制格式的未来修订中，应通过在字节码流中插入填充来管理此问题，以便无需复制和处理未对齐的数据。

| 名称           | 类型                 | 描述                 |
|----------------|----------------------|---------------------|
| Mode          | ExceptionHandlerMode | 异常处理程序的模式   |
| ClassToken([1](#notes)) | TypeDefOrRef | 处理程序的类令牌     |
| FilterStart   | MetadataOffset       | 过滤器代码的IL字节码流偏移量 |
| TryStart      | MetadataOffset       | 此处理程序覆盖的起始范围的IL字节码流偏移量 |
| TryEnd        | MetadataOffset       | 此处理程序覆盖的结束范围的IL字节码流偏移量 |
| HandlerStart  | MetadataOffset       | 异常处理程序的起始IL字节码流偏移量 |
| HandlerEnd    | MetadataOffset       | 异常处理程序的结束IL字节码流偏移量 |

### 注释

1. Mode、ClassToken和FilterStart形成一个具有模式作为鉴别器的联合，ClassToken和FilterStart共享相同的内存位置。也就是说，ClassToken和FilterStart可以表示为C/C++的匿名联合。
2. 起始和结束偏移量包括在内。

## ExceptionHandlerMode

异常处理程序模式确定异常处理程序的具体模式，枚举的基本类型为uint16_t。

| 名称     | 值     | 描述                           |
|----------|--------|-------------------------------|
| Catch    | 0x0000 | 异常处理程序为特定类型的catch处理程序 |
| CatchAll | 0x0001 | 异常处理程序捕获所有类型的异常      |
| Finally  | 0x0002 | 异常处理程序为Finally块           |
| Filter   | 0x0003 | 异常处理程序为过滤器块           |