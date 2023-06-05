# 容器维护

## 调整 Dockerfile 图像

Dockerfile 的源图像位于 `.devcontainer/sources`。每当您需要进行调整时，请按照以下步骤进行检查：

* [ ] 当您调整克隆存储库的版本时，请检查**所有**的 Dockerfile
* [ ] 在 `.github/workflows` 中更改生成图像的版本
* [ ] 在 `.devcontainer` 中调整相应 Dockerfile 的版本

示例：

* [X] 当您调整克隆存储库的版本时，请检查**所有**的 Dockerfile
  * 您更改了文件 `targets/TI-SimpleLin/CMakeLists.txt`，并在 `set(TI_SL_CC13x2_26x2_SDK_TAG "4.40.04.04" CACHE INTERNAL "TI CC13x2_26x2 SDK tag")` 中调整了版本
  * 您还需要在 `.devcontainer/sources/Dockerfile.All` 中调整此版本，并在此处进行调整 `git clone --branch 4.40.04.04 https://github.com/nanoframework/SimpleLink_CC13x2_26x2_SDK.git --depth 1 ./sources/SimpleLinkCC13 \`
  * 您还需要在 `.devcontainer/sources/Dockerfile.TI` 中调整此版本，并在此处进行调整 `git clone --branch 4.40.04.04 https://github.com/nanoframework/SimpleLink_CC13x2_26x2_SDK.git --depth 1 ./sources/SimpleLinkCC13 \`
  * 请注意，某些克隆的存储库存在于几乎所有文件中。因此，请确保您调整了所有这些版本。
* [X] 在 `.github/workflows` 中更改生成图像的版本
  * 在 `all.yaml` 中通过增加小版本号（如果这是一个真正的重大更改，则增加主版本号）更改容器的版本，例如，如果版本是 1.5，则更改为 `GCR_VERSION: v1.6`
  * 在 `ti.yaml` 中通过增加小版本号（如果这是一个真正的重大更改，则增加主版本号）更改容器的版本，例如，如果版本是 1.2，则更改为 `GCR_VERSION: v1.3`
  * 请注意，根据所做的更改，不同容器的版本可能会有所不同。
* [X] 在 `.devcontainer` 中调整相应 Dockerfile 的版本
  * 在 `Dockerfile.All` 中相应地更改版本为 `FROM ghcr.io/ellerbach/dev-container-all:v1.6`
  * 在 `Dockerfile.TI` 中相应地更改版本为 `FROM ghcr.io/ellerbach/dev-container-all:v1.6`

## 发布新软件包

默认情况下，新软件包的可见性为私有。您需要按照以下步骤调整潜在新的开发容器的可见性：

1. 进入 <https://github.com/orgs/nanoframework/packages>
1. 选择软件包
1. 点击“连接存储库”
1.

 选择 `nf-interpreter`
1. 点击“查看所有标记版本”
1. 点击“选项”
1. 调整可见性为公共
1. 同样勾选“从源存储库继承访问权限”