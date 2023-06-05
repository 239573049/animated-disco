# AssemblyRefTableEntry（CLR_RECORD_ASSEMBLYREF）

程序集引用表包含对其他程序集的引用。运行时将根据名称和版本查找程序集，以解析对程序集头的引用。

AssemblyRefTableEntry的格式如下：

| 名称       | 类型                  | 描述             |
|-----------|-----------------------|-----------------|
| 名称       | StringTableIndex      | 在字符串表中的索引，用于引用程序集的名称     |
| 版本       | VersionInfo           | 版本信息结构，用于表示程序集的版本（在运行时检查是否完全匹配）|