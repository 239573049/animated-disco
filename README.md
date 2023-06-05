# 网站

这个网站是使用[Docusaurus 2](https://docusaurus.io/)，一个现代静态网站生成器构建的。

### 安装

```
$ yarn
```

### 本地开发

```
$ yarn start
```

这个命令启动了一个本地开发服务器并打开了一个浏览器窗口。大多数更改都可以实时反映，无需重新启动服务器。

### 构建

```
$ yarn build
```

这个命令将静态内容生成到`build`目录中，并可以使用任何静态内容托管服务进行服务。

### 部署

使用SSH：

```
$ USE_SSH=true yarn deploy
```

不使用SSH：

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

如果您使用GitHub页面进行托管，这个命令是一个方便的方式来构建网站并推送到`gh-pages`分支。
