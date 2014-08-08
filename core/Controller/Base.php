<?php

class Controller_Base
{

    protected $_params = array();
    protected $_classMethods;

    public function __construct()
    {

    }

    /**
     * 设置请求参数
     * @param array $params
     */
    public function setParams($params)
    {
        $this->_params = $params;
    }

    /**
     * 获取请求参数
     * @param string $key
     * @param mix $default 默认值
     * @return string
     */
    public function getParam($key, $default = null)
    {
        if(isset($this->_params[$key])) {
            return $this->_params[$key];
        } elseif(isset($_GET[$key])) {
            return $_GET[$key];
        } elseif(isset($_POST[$key])) {
            return $_POST[$key];
        }
        return $default;
    }

    /**
     * 获取所有请求参数
     * @return array
     */
    public function getParams()
    {
        $return = $this->_params;
        if(isset($_GET) && is_array($_GET)) {
            $return += $_GET;
        }
        if(isset($_POST) && is_array($_POST)) {
            $return += $_POST;
        }
        return $return;
    }

    /**
     * 分发请求到Action
     * @param string $action
     */
    public function dispatch($action)
    {
        if(null === $this->_classMethods) {
            $this->_classMethods = get_class_methods($this);
        }

        //__call 方法兼容
        if(in_array($action, $this->_classMethods)) {
            $this->$action();
        } else {
            $this->__call($action, array());
        }
    }

    /**
     * __call 魔术方法，在Action不存在时运行
     * 可以用来做个性化Url
     * @param string $methodName 调用的成员函数名称
     * @param array $args 调用函数时传入的参数
     */
    public function __call($methodName, $args)
    {
        if('Action' == substr($methodName, -6)) {
            $action = substr($methodName, 0, strlen($methodName) - 6);
            throw new Exception(sprintf('Action "%s" does not exist and was not trapped in __call()', $action), 404);
        }

        throw new Exception(sprintf('Method "%s" does not exist and was not trapped in __call()', $methodName), 500);
    }

    public function _hasParam($key)
    {
        return $this->getParam($key) !== null;
    }

    /**
     * Return the method by which the request was made
     *
     * @return string
     */
    public function getMethod()
    {
        return $_SERVER['REQUEST_METHOD'];
    }

    /**
     * Was the request made by POST?
     *
     * @return boolean
     */
    public function isPost()
    {
        if('POST' == $this->getMethod()) {
            return true;
        }

        return false;
    }

}