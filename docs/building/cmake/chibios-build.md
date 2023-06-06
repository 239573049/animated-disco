＃构建ChibiOS源码的CMake文件

## 关于本文档

本文档描述了使用CMake配置文件从存储库源码构建ChibiOS的目的和工作流程。在调试与ChibiOS交互的.NET **nanoFramework**功能时，可能需要从源码构建ChibiOS。

## 目的

配置文件集合的目的是创建一个ChibiOS的CMake包并构建它。

## 推理

可以从ChibiOS的GitHub镜像存储库下载源码，或者如果已经在构建机器上可用，则可以将其复制到构建文件夹中。
在调用CMake时，可以通过指定```RTOS=CHIBIRTOS```和```CHIBI_SOURCE=本地存储库文件夹的路径```来传递这些选项。

_注意：在指定本地克隆的位置时，请确保检出了正确的分支。_

## 工作流程

ChibiOS HAL基于“板”。支持的板集合和相应的配置存储在hal/boards目录中。
.NET **nanoFramework**包含了一个用于ChibiOS的“覆盖层”，可以在其中添加支持的板。该集合也会被检查以用于目标板。在/ targets / CMSIS-OS / ChibiOS / nf-overlay / os / hal / boards目录中，实现了“覆盖层”的支持的板集合和相应的配置。

.NET **nanoFramework**目标还可以包括ChibiOS板定义。这是OEM板的建议方法。
在这种情况下，必须在目标目录中直接包含board.c和board.h文件。

.NET **nanoFramework**需要支持每个板。这是指定和/或配置配置详细信息和组件/功能的地方。CMakes会检查目标板是否在目标集合中可用。板支持集合位于/ targets / CMSIS-OS / ChibiOS。

成功找到ChibiOS和.NET **nanoFramework**目标中的板支持后，CMake会在受支持系列的列表中检查TARGET_SERIES，以便为以后使用确定系列。有关详细信息，请查看[FindCHIBIOS.cmake](https://github.com/nanoframework/nf-interpreter/blob/main/CMake/Modules/FindChibiOS.cmake)中的代码。
（注意：当前的代码仅针对STM板进行了验证）

_FindCHIBIOS.cmake_包括目标系列和相应GCC选项的特定内容。
文件命名逻辑如下：

- CHIBIOS_**STM32F0xx**_sources.cmake：系列的公共源文件（系列名称以粗体显示）
- CHIBIOS_**STM32F0xx**_GCC_options.cmake：系列的GCC选项（系列名称以粗体显示）

在添加新的供应商/系列/板时，请遵循以下一般准则：

1. 如果不确定，请尽量遵循存储库中的make文件。它们会

为您提供在CMake文件中复制所需的所有详细信息。
2. 检查系列文件是否存在。如果不存在，请创建它并添加源文件和包含目录。
3. 检查目标系列名称是否包含在`CHIBIOS_SUPPORTED_SERIES`列表中。如果没有，请将系列名称添加到其中。
4. 检查链接器文件名是否在系列文件中列出。如果没有，请添加它。