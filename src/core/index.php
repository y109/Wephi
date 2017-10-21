<?php
define('CORE_PATH', substr(__FILE__, 0, -9));
define('DS', DIRECTORY_SEPARATOR);

$availableModels = array('graph' => 'GraphvizGraph', 'node' => 'GraphvizNode', 'edge' => 'GraphvizEdge');

$model = isset($_GET['m']) && key_exists($_GET['m'], $availableModels) ? $_GET['m'] : 'graph';
$modelName = 'Model_' . $availableModels[$model];
$controllerName = 'Controller_' . $availableModels[$model];
$action = isset($_GET['do']) ? $_GET['do'] : 'index';
$actionName = $action . 'Action';

$controller = new $controllerName;
$controller->dispatch($actionName);
//自动加载类
function __autoload($class)
{
    if(class_exists($class, false)) {
        return;
    }
    $file = str_replace('_', DS, $class) . '.php';
    if(file_exists($file)) {
        require_once(CORE_PATH . $file);
    }
}