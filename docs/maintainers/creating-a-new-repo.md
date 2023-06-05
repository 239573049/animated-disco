# 创建新存储库的流程

## 关于本文档

本文档描述了在GitHub上创建新存储库的步骤。适用于类库。

## 简介

严格遵循此流程是为了保持存储库的一致性和连贯性，并利用构建工具、测试和发布自动化的优势。如果有疑问，请向高级团队成员之一提问。

## 在GitHub上创建存储库

1. 基本上就是在GitHub上点击创建新存储库按钮。
   注意：类库存储库通常以前缀“*nanoFramework*.*命名空间*”命名，其余大部分存储库为“**nf**-*某个相关名称*”。
2. 由于我们遵循[GitFlow分支模型](http://nvie.com/posts/a-successful-git-branching-model/)，必须创建两个分支：`main`和`develop`。
3. 确保创建一个空的readme.md文件，以便更容易fork和克隆新的存储库。

## 调整存储库设置（第一部分）

1. 转到存储库的**设置**，然后进入**选项**。
2. 在**功能**部分禁用Wikis、Issues和Projects。
3. 在**合并按钮**部分禁用Allow merge commits。我们更喜欢在PR上进行整洁的合并，而无需打扰贡献者来压缩提交。
4. 进入**分支**并将`develop`设置为默认分支。

## 设置Sonarcloud项目

对于类库项目，需要设置Sonarcloud项目以运行和处理项目分析。

您的计算机上必须安装以下内容：

- [.NET的SonarScanner（.NET Framework 4.6+）](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner-for-msbuild/)
- Java SDK。[推荐](https://code.visualstudio.com/docs/languages/java)

安装上述内容后，需要在本地运行分析工具进行首次分析。

1. 在项目文件夹中打开VS开发人员命令提示符。
2. 运行准备步骤：

```console
PATH-TO-YOUR-LOCAL-INSTALL-FOLDER\SonarScanner.MSBuild.exe begin /k:"nanoframework.WHATEVER.CLASS.NAME" /o:nanoframework /d:sonar.host.url=https://sonarcloud.io /d:sonar.login=TOKEN_FOR_SONARCLOUD
```

3. 构建解决方案

```console
msbuild  nanoFramework.WHATEVER.CLASS.NAME.sln /t:Rebuild /p:platform="Any CPU" /p:configuration="Release" 
```

4. 运行分析工具并上传文件

```console
PATH-TO-YOUR-LOCAL-INSTALL-FOLDER\SonarScanner.MSBuild.exe end /d:sonar.login=TOKEN_FOR_SONARCLOUD
```

## 设置Azure DevOps

1. 在已登录GitHub帐

户的新浏览器窗口中，转到存储库**设置**，然后导航到**Integrations & Services**。
2. 单击Azure Pipelines的“Configure”按钮。
3. 下一步将带您转到[Azure DevOps](https://dev.azure.com/nanoframework)网站。
4. 点击“创建新项目”。
5. 使用GitHub存储库名称命名项目。选择**Public**作为可见性选项。
6. 创建项目后，显示了一个包含GitHub存储库的列表。选择刚刚创建的存储库。
7. 下一步要求进行管道配置。选择“Starter Pipeline”以开始构建并允许配置管道。接下来的步骤将显示最简单的yaml。
8. 单击“Variables”并添加以下变量。
9. 添加`DiscordWebhook`变量，并从我们的Discord服务器上“build-monitor”频道的Azure Webhook中获取值。请确保通过单击适当的选项将变量设置为`secret`。
10. 添加另一个变量`GitHubToken`，并从GitHub的nfbot个人令牌中获取值。请确保通过单击锁图标将变量设置为`secret`。
11. 添加另一个变量`NbgvParameters`，将其保留为空，并选中“让用户在运行此管道时覆盖此值”。
12. 添加另一个变量`StartReleaseCandidate`，将内容设置为`false`，并选中“让用户在运行此管道时覆盖此值”。
13. 添加另一个变量`UPDATE_DEPENDENTS`，将内容设置为`false`，并选中“让用户在运行此管道时覆盖此值”。
14. 添加两个秘密变量`SignClientUser`和`SignClientSecret`，并填写用于.NET Foundation签名服务的凭据。请确保通过单击适当的选项将变量设置为`secret`。
15. 在变量弹出窗口中单击“Save”按钮（它会带您回到管道yaml）。
16. 单击右上角的“Save”按钮，然后按照提交消息的要求操作。
17. 返回到管道，选择它，然后单击“Edit”（右上角）。然后点击三个垂直点（再次在右上角），然后点击“Triggers”。
18. 确保**不**勾选“连续集成”中的覆盖YAML选项。取消选中“拉取请求验证”的相同选项，并选中“使密码在分支构建中可用”。
19. 在工具栏中点击“Save”（而不是“Save & Queue”）。
20. 转到`General Project`项目，并导航到Project Settings - Service Connections。
21. 打开每个服务连接，点击三个垂直点（再次在右上角），然后点击“Security”。滚动到“Project permissions”，点击右侧的+图标，然后选择新创建的项目。这

将添加一个使用此共享服务连接的权限。
22. 返回到管道视图，选择当前的管道，点击省略号图标，然后点击“Status badge”。复制弹出窗口中显示的markdown代码。稍后将需要将正确的构建徽章添加到存储库readme中。

## 准备初始提交

1. 将存储库fork到您首选的GitHub帐户并将其克隆到本地。
2. 最好的选择是从现有的存储库中复制/粘贴，这样您可以更高效地进行操作。但请注意更改名称！复制以下文件：
    - .github_changelog_generator
    - .gitignore **（无需更改）**
    - azure-pipelines.yml
    - LICENSE.md **（无需更改）**
    - README.md
    - template.vssettings **（无需更改）**
    - version.json
    - NuGet.Config
    - assets\readme.txt
    - assets\nf-logo.png
    - config\filelist.txt
    - config\SignClient.json
3. 打开“azure-pipelines.yml”
    1. 使用新名称重命名`nugetPackageName`变量（注意nanoframework前缀）。
    2. 使用存储库名称重命名`repoName`变量。
    3. 使用等效名称重命名`sourceFileName`参数。可能最好等到类库的第一个成功构建后，然后使用正确的名称返回到此处进行程序集声明源文件的更改。
    4. 使用存储库名称重命名`sonarCloudProject`变量。
    5. 如果有依赖于此类库的其他类库，请从CorLib的“azure-pipelines.yml”中复制“update dependencies”作业。如果没有，请跳过此步骤。
4. 打开“.github_changelog_generator”，并将**project**设置为存储库名称。
5. 打开“version.json”，并将**version**设置为适当的版本。请确保遵循我们的版本号指南。如有疑问，请向高级团队成员之一提问。
6. 打开“README.md”
    1. 使用新名称替换类库名称的出现。
    2. 为NuGet徽章的包名称进行更名。
    3. 使用从Azure DevOps复制的徽章替换构建状态徽章。直到主分支有第二个流水线为止，它们将保持相同。
7. 在根目录下创建一个名为新类库的文件夹。
8. 在VS解决方案中添加类库项目。再次，最好是遵循现有的类库，并在有疑问时询问。
    1. 确保遵循命名模式。
    2. 确保从初始存储库（或CorLib存储库）复制`key.snk`。**不要**创建新的。
9. 根据需要重命名、编辑和调整"nuspec"文件以创建NuGet包。
10. 在`assets

`文件夹中编辑"readme.txt"，并重命名存储库名称。
11. 在`config`文件夹中编辑"files.txt"，并重命名文件模式。
12. 仍在“azure-pipelines.yml”中，并且仅当有依赖于此类库的其他类库时。
    1. 使用依赖于此新类库的类库的存储库名称调整`repositoriesToUpdate`列表。

## 调整存储库设置（第二部分）

1. 转到GitHub上的存储库设置，并进入**Branches**。
2. 转到“develop”分支的规则，并进行以下更改：
      - 启用“要求在合并之前进行拉取请求审查”
      - 启用“要求合并之前通过状态检查”并选择以下选项：
        - “要求分支在合并之前处于最新状态”
        - “状态检查：nanoframework.**azure-devops-project-name**”
        - “状态检查：license/cla”（针对main分支）

## 向上更新依赖关系

至少，新类库依赖于mscorlib。如果只有这一个依赖项，请编辑[`azure-pipelines.yml`](https://github.com/nanoframework/CoreLibrary/blob/main/azure-pipelines.yml)文件，并将这个新存储库添加到`repositoriesToUpdate`列表中。
现在，如果它还依赖于其他类库，则必须确定哪一个在依赖链的**最后**，并将此新存储库添加到**那个**`azure-pipelines.yml`文件中。例如，“System.Device.Gpio”依赖于“CoreLibrary”和“Runtime.Events”（后者又依赖于“CoreLibrary”）。更新依赖关系必须在`Runtime.Events`而不是`CoreLibrary`上触发，因为存在链式依赖关系。

## 将类库添加到文档项目中

如果此类库具有必须作为nanoFramework文档的一部分发布的文档（这很可能），则需要在文档项目中引用它。

1. 编辑文档存储库的[`azure-pipelines.yml`](https://github.com/nanoframework/nanoframework.github.io/blob/pages-source/azure-pipelines.yml)，并在步骤`clone`、`restore`和`build`中为此新存储库添加条目。只需按照已存在的条目之一进行操作即可。
2. 在类库文档的[文档](../architecture/class-libraries.md)中，根据正在使用的模式和格式，在适当的表格中添加新类库的条目。

