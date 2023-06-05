# 语义化版本控制

.NET **nanoFramework** 的版本控制遵循[语义化版本控制](http://semver.org/)准则。

语义化版本控制关注发布版本，我们的持续集成基础设施使用[Nerdbank GitVersioning](https://github.com/AArnott/Nerdbank.GitVersioning)来根据每个代码仓库的配置自动进行版本控制。

.NET **nanoFramework** 遵循[GitFlow分支模型](http://nvie.com/posts/a-successful-git-branching-model/)，该模型允许更结构化的发布和版本控制。

.NET **nanoFramework** 有三种不同的工作流程来控制版本控制。

## 开发构建

从*develop*分支构建的版本会有一个alpha后缀，以便在排序时排在发布构建之上，这样团队可以在需要时手动将开发构建发布为NuGet的预发布版本。

GitVersion被配置为[持续部署](http://gitversion.readthedocs.io/en/stable/reference/continuous-deployment/)模式，它会根据每次提交自动增加版本号。

## 拉取请求构建

从拉取请求构建的版本会有一个test$BuildNumber后缀，并且不会自动发布到NuGet（如果通过NuGet分发），但可以从AppVeyor下载相应的包或工件，以便团队或其他感兴趣的人可以测试该更改的单元而无需将其合并到develop分支中。

## 发布构建

从主分支（master）构建的版本不会有后缀，并且GitVersion被配置为[持续交付](https://gitversion.net/docs/reference/configuration/)模式。如果某个提交被打上标签，标签中的版本号将覆盖自动版本控制策略。

## 版本控制

.NET **nanoFramework** 遵循以下版本模式：MAJOR.MINOR.PATCH[-PREVIEW\ALPHA\RC-BUILDNUMBER]。

**Major** 或 **Breaking**（重大变更）：

* 删除/添加对平台的支持
* 删除公共API
* 引入不兼容的API更改
* 采用现有依赖项的新MAJOR版本
* 默认关闭兼容性修复

**Minor**（次要变更）：

* 添加公共API
* 添加新行为
* 添加新功能
* 采用现有依赖项的新版本
* 引入新的依赖项
* 以向后兼容的方式添加功能
* 其他任何更改（无法归类到其他类别）

**Patch**（补丁）：

* 向后兼容的错误修复
* 任何其他向后兼容的较小更改或改进