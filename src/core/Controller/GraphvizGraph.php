<?php

/**
 * graph
 */
class Controller_GraphvizGraph extends Controller_Base
{

    private $graphObj;
    private $nodeObj;
    private $edgeObj;

    public function __construct()
    {
        parent::__construct();
        $this->graphObj = new Model_GraphvizGraph();
        $this->nodeObj = new Model_GraphvizNode();
        $this->edgeObj = new Model_GraphvizEdge();
    }

    public function indexAction()
    {
        echo 'Wephi Core';
    }

    public function listAction()
    {
        $limit = $this->getParam('limit') ? $this->getParam('limit') : 25;
        $start = $this->getParam('start') ? $this->getParam('start') : 0;
        $page = $this->getParam('page') ? $this->getParam('page') : 1;

        $select = $this->graphObj->getSelect();
        $conditions = array();
        $_name = $this->getParam('name');
        if(strlen($_name) > 0) {
            $conditions['name'] = '%' . $_name . '%';
            $select->where('name LIKE :name');
        }
        $_sort = $this->getParam('sort');
        if(strlen($_sort) > 0) {
            $sort = json_decode($_sort);
            foreach($sort as $s)
            {
                $select->order($s->property . ' ' . $s->direction);
            }
        }

        $select->order('id ASC');
        $list = $this->graphObj->queryAll($select, $conditions);
        $paginator = Zend_Paginator::factory($list);
        $paginator->setCurrentPageNumber($page);
        //每页条数
        $paginator->setItemCountPerPage($limit);
        $data = $paginator->getCurrentItems()->getArrayCopy();
        $list = new Etao_Ext_GridList();
        $list->setStart($start);
        $list->setLimit($limit);
        $list->setTotal($paginator->getTotalItemCount());
        $list->setRows($data);
        echo json_encode($list);
    }

    /**
     * 保存
     */
    public function saveAction()
    {
        $data = array();
        if($this->isPost()) {
            $_id = $this->getParam('id', 0);
            $this->_hasParam('name') && $data['name'] = $this->getParam('name');
            $this->_hasParam('label') && $data['label'] = $this->getParam('label');
            $this->_hasParam('type') && $data['type'] = $this->getParam('type');
            $this->_hasParam('directed') && $data['directed'] = $this->getParam('directed');
            $this->_hasParam('file_format') && $data['file_format'] = $this->getParam('file_format');
            $this->_hasParam('strict') && $data['strict'] = $this->getParam('strict');
            if($this->_hasParam('attrs') && strlen(trim($this->getParam('attrs'))) > 0) {
                $attrs = trim($this->getParam('attrs'));
                json_decode($attrs) && $data['attrs'] = $attrs;
            }
            $this->_hasParam('advanced') && $data['advanced'] = $this->getParam('advanced');
            $this->_hasParam('code') && $data['code'] = $this->getParam('code');

            if($_id == 0) {
                $id = $this->graphObj->addGraphvizGraph($data);
            } else {
                $id = $data['id'] = $_id;
                $this->graphObj->updateGraphvizGraph($data);
            }

            if($id > 0) {
                echo '{"msg":"保存成功","success":true,"data":{"id":' . $id . '}}';
            } else {
                echo '{"msg":"保存失败","success":false,"data":{"id":' . $id . '}}';
            }
        }
    }

    /**
     * 保存
     */
    public function saveattrAction()
    {
        $data = array();
        if($this->isPost()) {
            $_id = $this->getParam('id', 0);
            $id = 0;
            if($this->_hasParam('attrs') && strlen(trim($this->getParam('attrs'))) > 0) {
                $attrs = trim($this->getParam('attrs'));
                if(json_decode($attrs)) {
                    $data['attrs'] = $attrs;
                    $data['attrs'] = $this->getParam('attrs');
                    $id = $data['id'] = $_id;
                    $this->graphObj->updateGraphvizGraph($data);
                }
            }

            if($id > 0) {
                echo '{"msg":"保存成功","success":true,"data":{"id":' . $id . '}}';
            } else {
                echo '{"msg":"保存失败","success":false,"data":{"id":' . $id . '}}';
            }
        }
    }

    public function delAction()
    {
        $id = $this->getParam('id');
        if($id > 0) {
            $this->graphObj->deleteGraphvizGraph($id);
            echo '删除成功';
        }
    }

    /**
     * 获取代码
     */
    public function codeAction()
    {
        $_id = $this->getParam('id', 0);
        if((int)$_id > 0) {
            echo nl2br($this->graphObj->getCode($_id));
        }
    }

    /**
     * 画图
     */
    public function imageAction()
    {
        $_id = $this->getParam('id', 0);
        if((int)$_id > 0) {
            $this->graphObj->getImage($_id);
        }
    }

    /**
     * 导出Dot格式
     */
    public function exportdotAction()
    {
        $_id = $this->getParam('id', 0);
        if((int)$_id > 0) {
            $code = $this->graphObj->getCode($_id);
            header('Content-Type: text/plain');
            header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
            header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
            header('Content-Disposition: attachment; filename="graphviz_' . $_id . '.dot"');
            header('Content-Length: ' . strlen($code));
            echo $code;
        }
    }

    /**
     * 导出Dot格式
     */
    public function exportcsvAction()
    {
        $_id = $this->getParam('id', 0);
        if((int)$_id > 0) {
            $code = $this->graphObj->getCsvData($_id);
            header('Content-Type: text/plain');
            header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
            header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
            header('Content-Disposition: attachment; filename="graphviz_' . $_id . '.csv"');
            header('Content-Length: ' . strlen($code));
            echo $code;
        }
    }

}

