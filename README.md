# one-public-icons 同创图标管理项目

## packages/tools 
 该项目会使用`@iconify-icons`包提供的方法。 根据ui在figma画的图标，生成的svg json文件,并且自动生成`@one-public/icon-json`项目并且推送到npm仓库中


## packages/svgs

  该项目是用来保存svg图标



### 发布流程
  <!-- ui 在 figma 上设计图标，然后点击 one-public-icon-plugin 插件,点击预览，
这个时候创建一个beta分支，并发送到github上，同时，github里面有一个监听beta分支的改变，触发actions。
运行相应的脚本：脚本步骤，下载当前分支并且下载figma上的图标，生成@one-public/icon-json@beta版本的包并且推送
同时运行 playground包提供的build方法，发布到vercel中。因为此包是用当前文件中的icon-json包，所以可以获取到所有的图标。
同时在插件上展示示例项目地址，UI确定没有问题之后，点击发布按钮

  发布功能
将 beta 分支的代码合并到master分支，然后将包的版本改为正式版本。然后再次运行playground中的build，将包发布到vercel中，同时提示发布成功 -->

 - package/plugin 用来实现设计工具的插件,在设计工具中选择图标,获取选择的图标,
 - package/json 用来保存图标信息,并且发布到npm
 - package/svgs 用来保存svg图标
 - package/tools 用来根据figma上的图标,生成svg,并且发布到npm
 - playground 用来预览图标,并且提供一个示例项目,方便UI查看
