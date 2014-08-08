<?php

/**
 * nod
 *
 * @author y109
 */
class Controller_GraphvizNode extends Controller_Base
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

    public function listAction()
    {
        $limit = $this->getParam('limit') ? $this->getParam('limit') : 25;
        $start = $this->getParam('start') ? $this->getParam('start') : 0;
        $page = $this->getParam('page') ? $this->getParam('page') : 1;

        $select = $this->nodeObj->getSelect();
        $conditions = array();
        $_gid = $this->getParam('gid');
        if(strlen($_gid) > 0) {
            $select->where('gid = "' . (int)$_gid . '"');
        }
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
        $list = $this->nodeObj->queryAll($select, $conditions);
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
            $this->_hasParam('gid') && $data['gid'] = $this->getParam('gid');
            $this->_hasParam('name') && $data['name'] = $this->getParam('name');
            $this->_hasParam('label') && $data['label'] = $this->getParam('label');
            if($this->_hasParam('attrs') && strlen(trim($this->getParam('attrs'))) > 0) {
                $attrs = trim($this->getParam('attrs'));
                json_decode($attrs) && $data['attrs'] = $attrs;
            }

            if($_id == 0) {
                $id = $this->nodeObj->addGraphvizNode($data);
            } else {
                $data['id'] = $_id;
                $id = $this->nodeObj->updateGraphvizNode($data);
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
                    $id = $data['id'] = $_id;
                    $this->nodeObj->updateGraphvizNode($data);
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
            $this->nodeObj->deleteGraphvizNode($id);
            echo '删除成功';
        }
    }

}