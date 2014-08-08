<?php
$d = dirname(__FILE__);
define('ROOT', $d == '' ? '/' : $d . '/');
if(!file_exists(ROOT . 'core/config.php')) {
    header('Location: install/index.php');
    exit();
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Wephi</title>
        <link rel="shortcut icon" href="images/favicon.ico"/>
        <link rel="stylesheet" type="text/css" href="js/ext/resources/css/ext-all.css" />
        <link href="style/style.css" media="screen" rel="stylesheet" type="text/css" />
        <link href="style/icons.css" media="screen" rel="stylesheet" type="text/css" />
        <link href="style/ext-patch.css" media="screen" rel="stylesheet" type="text/css" />
        <script type="text/javascript" src="js/ext/ext-all.js"></script>
        <script type="text/javascript" src="js/ext/locale/ext-lang-zh_CN.js"></script>
        <script type="text/javascript" src="js/common.js"></script>
        <script type="text/javascript" src="js/etao.js"></script>
        <script type="text/javascript" src="js/wephi-lang-en.js"></script>
        <script type="text/javascript" src="js/graphvizForm.js"></script>
        <script type="text/javascript" src="js/graphvizStore.js"></script>
        <script type="text/javascript" src="js/graphvizWindow.js"></script>
        <script type="text/javascript" src="js/graphvizPanel.js"></script>
        <script type="text/javascript">
            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', 'UA-27731746-1']);
            _gaq.push(['_setDomainName', 'googlecode.com']);
            _gaq.push(['_setAllowLinker', true]);
            _gaq.push(['_trackPageview']);

            (function() {
                var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
            })();

        </script>
    </head>
    <body>
    </body>
</html>
