# 发布工作流和策略

## 关于本文档

本文档描述了.NET **nanoFramework**采用的处理合并、分支和发布的工作流和策略。

## 拉取请求

包含贡献的拉取请求始终合并到 _main_ 分支中。
在每个拉取请求构建完成后，相应的 NuGet 包会发布到 nanoFramework 的 [Azure DevOps NuGet feed](https://dev.azure.com/nanoframework/feed/_packaging?_a=feed&feed=sandbox)（如果这是一个使用该分发渠道的组件）。通过访问此 NuGet feed，测试拉取请求的人可以立即引用它，无需进一步操作。
除此之外，无需执行其他操作，因为包的标识和版本会自动增加。

## 开发

一旦拉取请求合并到 _main_ 分支，将自动生成并发布一个新版本到 nanoFramework 的 [Azure DevOps NuGet feed](https://dev.azure.com/nanoframework/feed/_packaging?_a=feed&feed=sandbox)（如果这是一个使用该分发渠道的组件）。
除此之外，无需执行其他操作，因为包的标识和版本会自动增加。

## 版本管理

如果发布包含了破坏性变更，主版本号（MAJOR）应该增加一，将次版本号（MINOR）重置为零，并将修订版本号（PATCH）保持为零。否则，只需将次版本号（MINOR）增加一，将修订版本号（PATCH）保持为零。

在此阶段，提议发布新版本的贡献者必须执行一些行政任务。发布批准者有责任验证这些任务是否正确执行。

有关发布准备的详细信息可以在 Nerdbank GitVersioning 文档的[这里](https://github.com/AArnott/Nerdbank.GitVersioning/blob/master/doc/nbgv-cli.md#preparing-a-release)中阅读。

如果完美地按照合并各个拉取请求的过程进行，除了验证所有拉取请求是否已分配里程碑和适当的标签外，几乎没有其他工作要做。
标签用于对变更类型进行分类，是必需的，因为发布说明会自动根据此信息生成。
对于自动生成发布说明的目的，只需拉取请求遵循严格的标签映射即可，无需对问题进行相同的操作。这是因为问题管理集中在 Home 仓库中（而不是每个仓库）。
解决生成的发布说明文档中的任何问题，请在 GitHub 中为拉取请求分配适当的标签，然后在 Azure DevOps 中重新运行合并提交的构建。

## 生产环境

此过程始于从 _release-vN.N.N_ 分支向 _main_ 分支发起拉取请求。

在 Home 仓库中，编辑 vNext 里

程碑并将其更改为此发布的版本号。

一旦批准了拉取请求，请使用“merge commit”选项（**不要使用 squash and merge**）。这将触发新的 CI 构建，之后将生成一个新的草稿式发布和发布说明。如果在上述 _release-vN.N.N_ 步骤中已经验证了它们的有效性，则无需进行进一步更正。

点击发布发布按钮将使用发布版本给仓库打上一个 git 标签，覆盖任何自动版本控制策略，并触发新的构建，该构建将自动发布到 NuGet（如果这是一个使用该分发渠道的组件）。

在标签发布的构建完成后，编辑 source/version.json 文件，并将 `version` 字段增加到 vNext 版本，包括预览标签。然后从 _release-vN.N.N_ 分支向 develop 分支发起新的 PR。这将删除已做出更改的分支。

在 CI 完成 _squash and merge_（**确实是 squash and merge**）拉取请求后，_release-vN.N.N_ 分支现在可以安全地删除。

完成此步骤后，在 Home 仓库中创建一个新的 vNext 里程碑。