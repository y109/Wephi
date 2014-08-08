@ECHO off 
cls 
color 0a 

SET SVN_URI= https://wephi.googlecode.com/svn/trunk/
SET ZIP_URL="7za.exe"

ECHO 正在从 %SVN_URI% 导出最新版本文件

svn export --force %SVN_URI% wephi

del wephi\core\config.php
del wephi\core\version.php
del wephi\images\demo.jpg
rmdir "wephi\docs" /s/q
rmdir "wephi\nbproject" /s/q

ping -n 5 127.1>nul


FOR /R wephi %%i in (.) DO (
    ECHO. > %%~fi\\index.htm
)
del wephi\install\index.htm
del wephi\index.htm

ECHO 文件导出成功...

ECHO 开始打包
%ZIP_URL% a wephi.zip wephi
ECHO 创建压缩包完成

ECHO 删除临时文件
ping -n 5 127.1>nul
rmdir wephi /s/q

ECHO 安装包生成成功！

pause