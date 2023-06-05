# AssemblyHeader（CLR_RECORD_ASSEMBLY）

AssemblyHeader 结构包含一些用于验证运行时程序集合法性的标记和 CRC。此外，Assembly 标头还包含了 MetadataTables 和 BLOB 存储区的位置信息。

AssemblyHeader 的结构如下：

| 名称                                            | 类型                  | 描述  |
|-------------------------------------------------|-----------------------|------------  |
| [Marker](#marker)                               | `uint8_t[8]`          | 用于表示程序集的标记符号  |
| [HeaderCRC](#headercrc)                         | `uint32_t`            | AssemblyHeader 结构本身的 CRC32 校验值|
| [AssemblyCRC](#assemblycrc)                     | `uint32_t`            | 完整程序集的 CRC32 校验值|
| [Flags](#flags)                                 | [AssemblyHeaderFlags](#flags) | 程序集的标志位|
| [NativeMethodsChecksum](#nativemethodschecksum) | `uint32_t`            | Native 方法校验和|
| [NativeMethodsOffset](#nativemethodsoffset)     | `uint32_t`            | Native 方法偏移量|
| [Version](#version)                             | `VersionInfo`         | 该程序集的版本信息数据结构|
| [AssemblyName](#assemblyname)                   | `uint16_t`            | 程序集名称在字符串表中的索引|
| [StringTableVersion](#stringtableversion)       | `uint16_t`            | 字符串表版本|
| [StartOfTables](#startoftables)                 | `uint32_t[16]`        | 用于存储元数据表在 PE 文件中的偏移量的数组|
| NumberOfPatchedMethods                          | `uint32_t`            | 修补方法的数量|
| [PaddingOfTables](#paddingoftables)             | `uint8_t[16]`         | 每个元数据表的对齐填充字节数|

## 字段详细信息

以下部分描述了 AssemblyHeader 结构的各个字段。

### Marker

程序集标记是由八个字符组成的标记，由非零终止的 ASCII 编码字符组成。它用于明确识别磁盘上和运行时内存中的 .NET **nanoFramework** PE 文件。它还指示了此数据结构的版本，因此将来版本中对此结构的任何修改**必须**使用新的标记字符串。

| 版本  | 标记   | 描述|
|----------|----------|------------  |
| 1.0      | 'NFMRK1' | 版本 1.0 的标记|
| 2.0      | 'NFMRK2' | 版本 2.0 的标记（在添加泛型支持后）|

### HeaderCRC

AssemblyHeader 的 ANSI X3.66 32 位 CRC。假设 HeaderCRC 为 0 进行计算。

### AssemblyCRC

Assembly PE 数据内容从 [PaddingOfTables](#paddingoftables) 开始的 ANSI X3.66 32 位 CRC。

### Flags

flags 属性用于存储位标志值。在 .NET **nanoFramework** 中不

使用这些标志，仅出于历史原因和结构兼容性而保留。

### NativeMethodsChecksum

***NativeMethodsChecksum*** 是一个唯一值，用于与存储在 CLR 固件中的原生方法表进行匹配，以确保方法匹配。用于计算此校验和的实际算法在 [NativeMethodsChecksum 算法文档] 中有记录。需要注意的是，实际算法并不重要。运行时不会计算此值。运行时只会将程序集的值与为给定程序集注册的原生代码的值进行比较，以确保它们匹配。只要生成程序集的工具和原生方法存根的标头和代码文件使用相同的值，实际算法就基本上无关紧要。选择算法的最重要方面是，对于任何类型或方法签名的更改，**必须**生成不同的校验和值。当前的 MetadataProcessor 算法构建了原生方法的变形字符串名称（用于生成存根），对它们进行排序，并在其中运行 CRC32，以获得一个不同的值。由于 CRC 基于完全限定的方法名称和所有参数的类型，任何签名的更改都将生成一个新值，表示不匹配。

### NativeMethodsOffset

(TBD)

### Version

***Version*** 字段保存了程序集的版本号（与 AssemblyHeader 结构本身的版本号不同）。调试器在部署时使用该版本号进行版本检查。运行时本身不使用版本来解析引用，因为一次只能加载一个程序集的一个版本。因此，PE 格式中的程序集引用不包含版本信息。

### AssemblyName

程序集名称在 [字符串表](StringTable.md) 中的索引。

### StringTableVersion

应为 1。

### StartOfTables

固定的偏移量数组，用于指向不同表的表数据。此数组中的条目是相对于 AssemblyHeader 本身的起始偏移量（如果 PE 映像来自文件，则是文件寻址偏移量）。

| 名称                                                         | .NET **nanoFramework** 源元素名称 | 描述 |
|--------------------------------------------------------------|-----------------------------------|-----------|
| [AssemblyRef](AssemblyRefTableEntry.md)                      | CLR_RECORD_ASSEMBLYREF            | 程序集引用表|
| [TypeRef](TypeRefTableEntry.md)                              | CLR_RECORD_TYPEREF                | 引用其他程序集中的类型|
| [FieldRef](FieldRefTableEntry.md)                            | CLR_RECORD_FIELDREF               | 引用其他程序集中的类型的字段|
| [MethodRef](MethodRefTableEntry.md)                          | CLR_RECORD_METHODREF              | 引用其他程序集中类型的方法|
| [TypeDef](TypeDefTableEntry.md)                              | CLR_RECORD_TYPEDEF                | 此程序集中类型的定义|
| [FieldDef](FieldDefTableEntry.md)                            | CLR_RECORD_FIELDDEF               | 此程序集中类型的字段定义|
| [MethodDef](MethodDefTableEntry.md)                          | CLR_RECORD_METHODDEF              |

 此程序集中类型的方法定义|
| [GenericParam](GenericParamTableEntry.md)                    | CLR_RECORD_GENERICPARAM           | 泛型参数定义（2.0 版本新增）|
| [MethodSpec](MethodSpecTableEntry.md)                        | CLR_RECORD_METHODSPEC             | 方法规范（2.0 版本新增）|
| [Attributes](AttributeTableEntry.md)                        | CLR_RECORD_ATTRIBUTE              | 此程序集中定义的属性类型|
| [TypeSpec](TypeSpecTableEntry.md)                            | CLR_RECORD_TYPESPEC               | 用于此程序集的类型规范（签名）|
| [Resources](ResourcesTableEntry.md)                          | CLR_RECORD_RESOURCE               | 绑定到此程序集的资源文件中的资源项|
| [ResourcesData](ResourcesTableEntry.md)                        | \                           | 资源的 Blob 表数据|
| [Strings](StringTable.md)                                    | \                           | 字符串的 Blob 表数据|
| [Signatures](SignatureTable.md)                              | \                           | 元数据签名的 Blob 表数据|
| [ByteCode](Common-PE-Types-and-Enumerations.md)                                  | \                           | IL 字节码指令的 Blob 表数据|
| [ResourcesFiles](ResourcesTableEntry.md)                | CLR_RECORD_RESOURCE_FILE          | 绑定到此程序集的资源文件的资源文件描述符|
| [EndOfAssembly](Common-PE-Types-and-Enumerations.md)                            | \<N/A>                            | 从技术上讲，这不是一个表。而是此条目包含了程序集末尾的偏移量，用于找到 DAT 区域中的下一个程序集|

### NumberOfPatchedMethods

应为 0。在 .NET nanoFramework 中不支持。

### PaddingOfTables

对于每个表，填充到表末尾以使下一个表对齐到 32 位边界的字节数。每个表的起始位置对齐到 32 位边界，并在 32 位边界结束。
因此，其中一些表将不需要填充，所有表的值都在 [0-3] 范围内。这不是保存此信息的最紧凑形式，但每个程序集只需额外 16 字节。只对其中的一些表进行对齐比较麻烦，不值得。此字段本身也必须对齐到 32 位边界。这个填充用于使用以下公式计算给定表的大小（包括 Blob 数据）：

`TableSize = StartOfTables[tableindex + 1] - StartOfTables[tableindex] - PaddingOfTables[tableindex]`