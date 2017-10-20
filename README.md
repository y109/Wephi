# Wephi

Wephi - Graphviz Web GUI

WebGraphivz 可视化的 Graphviz 工具

## 简介

Wephi 是一个图形化 Graphviz 画图工具。Graphviz为AT&T 实验室所维护，一种纯文字的图形描述语言，它的强大主要体现在“所思即所得"（WYTIWYG，what you think is what you get），这是和office的“所见即所得“（WYSIWYG，what you see is what you get）完全不同的一种方式。它的输入是一个用dot语言 编写的绘图脚本，通过对输入脚本的解析，分析出其中的点，边以及子图，然后根据属性进行绘制。用graphviz来绘图的时候，你的主要工作就是编写dot脚本，你只要关注图中各个点之间的关系就好了，你不需要考虑如何安排各个节点的位置，怎样布局能够使你所绘制的图看起来更美观一些。依据其提供的内容转换成一般现有的图形档格式，如GIF、PNG、SVG ……等等，常被用来做流程图或系通分析图的图形产生工具，其最大特点是仅需提供节点(Node)之间的关系，其相关座标位置由程式自动产生。

## 特性

Wephi 基于 PHP,MySQL 和 Extjs 构建 * 自动生成 dot 代码 * 半可视化画图 * 支持 一对一，一对多，链式三种关系

## 安装

Wephi 依赖 Graphviz 完成绘图，所以要先安装 Graphviz 软件。

### 安装 Graphviz

#### Windows

http://www.graphviz.org/Download_windows.php

Redhat/Fedora/CentOS

cd /etc/yum.repos.d/ && wget http://www.graphviz.org/graphviz-rhel.repo yum install graphviz

#### Debian/Ubuntu

apt-get install graphviz

#### FreeBSD

可以直接用包来安装 pkg_add -r graphviz 或者使用ports编译 cd /usr/ports/graphics/graphviz/ make install

#### MacOS

http://www.graphviz.org/Download_macos.php

### 安装 Wephi

安装方法与一般的 PHP + MySQL 程序一样。

## 注意事项

在安装过程中需要提供 dot 文件的路径，注意不带 dot ,而且以 / 结尾 默认情况下 * Windows ：保持空白即可，不需要填写 * Redhat/Fedora/CentOS ：/usr/bin/ * Debian/Ubuntu ：/usr/bin/ * FreeBSD ：/usr/local/bin/ * MacOS ：/usr/local/bin/

默认情况下生成的是 SVG 格式，只有 IE8 以上版本，或者 FireFox，Chrome 才可以查看 IE8 以下版本请在图属性里把格式设置为 PNG或者JPEG

非 Windows 系统中文字体的问题

当使用非 SVG 格式，如 PNG ,JPEG 等文件格式生产图片时，中文字体可能不能正确显示，这是因为缺少中文字体造成的，请按照下面的方法安装中文字体,或者随意装一种中文字体就可以

Debian/Ubuntu
```
apt-get install ttf-arphic-bkai00mp ttf-arphic-bsmi00lp ttf-arphic-gbsn00lp ttf-arphic-gbsn00lp
```

Redhat/Fedora/CentOS FreeBSD
freebsd上安装中文字体略微麻烦，我选择的是微软的字体,bsd下有一个ports叫msttf 首先需要把windows的fonts目录下的 simhei.ttf,simsun.ttc,tahoma.ttf复制到 /var/ports/distfiles/msttf 下面然后就可以按照下面步骤安装了. cd /usr/ports/chinese/msttf make install clean

