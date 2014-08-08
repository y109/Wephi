Ext.onReady(function(){
    Ext.ns('Tools','Tools.graphviz');
    if(Tools.graphviz){
        Tools.graphviz.graphText = '图';
        Tools.graphviz.nameText = '名称';
        Tools.graphviz.typeText = '类型';
        Tools.graphviz.newGraphText = '新建';
        Tools.graphviz.normalModeText = '普通模式';
        Tools.graphviz.codeModeText = '代码模式';
        Tools.graphviz.saveText = '保存';
        Tools.graphviz.cancelText = '取消';
        Tools.graphviz.deleteText = '删除';		
        Tools.graphviz.attributeText = '属性';
        Tools.graphviz.pleaseSelectAPictureText = '请先选择一个图';
        Tools.graphviz.codeModeAttributeUnUseAbleText = '代码模式下编辑属性无效';
        Tools.graphviz.editGraphAttributeText = '编辑图属性';
        Tools.graphviz.exportText = '导出';
        Tools.graphviz.dotFormatText = 'Dot 格式';
        Tools.graphviz.csvFormatText = 'CSV 格式';
        Tools.graphviz.dotFormatTooltipText = 'Graphviz Dot 格式';
        Tools.graphviz.csvFormatTooltipText = '包含节点关系的 CSV 文件，所有自定义属性都将丢失';
        Tools.graphviz.refreshText = '刷新';
    }
});