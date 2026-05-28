# git
-开发的目录
    -多人协作，如何分布式存储
    github
    gitee 码云
    中央仓库，A/B/C......
-操作冲突
    git可以帮我们管理文件的版本，
    将一个文件，多个版本
    文件系统升级为版本控制系统
    回溯项目工程，更安全、好评估
    git只管文件

## learn git
目前是空的项目文件夹
代码文件（硬盘坏了，改了忘了、多人协作
本地文件 分布式、版本管理）
让git接管它，成为代码仓库
    -github 中央仓库
    
    -git init 本地仓库（文件->版本（快照））

-git init
    项目->仓库 转变
    . git 仓库隐藏目录 （为了安全，不能随便操作 要按git的约束来执行
    git bash 微型的linux bash环境

shell脚本
ls 

文件 1：n 文件版本（快照）

-git staus
    仓库当前状态
    常用，做任何git操作前，明确仓库状态
-git add  readme.md
    readme.md文件untracted
    将一个未被仓库跟踪的文件，添加到暂存区（stage）
    to be commited等待提交
-git commit -m‘wrote a readme file’
    存储的.git仓库中，有了第一个快照
    2 insertinons 新增内容2行

    -git 配置
    git config  --global user.name" "
    git config  --global email" "

## reop 仓库

    -remote origin 远程源
    -remote push origin master/main




