# CD & CI 自动化

## 关于本文档

本文档描述了通过 Azure Pipelines 和 GitHub Action 实现的 CD-CI 自动化。

## nfbot 可理解的命令

nfbot 对传递给任何存储库的 PR 评论中的命令作出反应。
只有组织成员有权限发送这些命令。
成功执行命令后，nfbot 会以👍表示正确执行或以🚀表示成功启动异步操作。如果执行过程中出现错误或问题，它会以😕表示反应。如果未满足预期条件，则反应为👀。

命令语法为：`@nfbot comand <argument(s)>`。

可用命令：

| 命令 | 参数 | 描述 |
|:---|:---|:---|
| updatedependents | - | 更新依赖于该库的库 |
| updatedependencies | - | 检查引用库的更新版本，并在需要时进行更新 |
| updatedependencies all| - | 在**所有**类库中启动全局检查以更新引用库的更新版本 |
| startrelease | - | 为该库启动发布候选工作流。如果库中存在预览依赖项，则会失败。 |
| runpipeline | *branch* | 运行所述分支的 Azure Pipeline。如果未提及分支，则在默认分支上运行。 |