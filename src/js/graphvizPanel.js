Ext.onReady(function(){
    Ext.ns('Tools','Tools.graphviz');
    /****************************************************************************************/
    Tools.graphviz.GraphPanel = Ext.create('Ext.grid.Panel', {
        region:'west',
        width:230,
        split:true,
        margins: '0 0 5 5',
        title:Tools.graphviz.graphText,
        collapsible:true,
        store: Tools.graphviz.GraphStore,
        hideHeaders:true,
        columns: [{
            text: Tools.graphviz.nameText,
            flex:1,
            dataIndex: 'name'
        },{
            text: Tools.graphviz.typeText,
            dataIndex: 'type'
        }],
        tbar:[
        {
            iconCls: 'icon-add',
            text:Tools.graphviz.newGraphText,
            menu : {
                items: [{
                    text:Tools.graphviz.normalModeText,
                    handler:function(){
                        var win = Tools.graphviz.GraphFormWindow;
                        var form =  win.down('form');
                        win.setTitle(Tools.graphviz.newGraphText);
                        form.getForm().reset();
                        form.getForm().setValues({
                            });
                        win.down('button[text="'+Tools.graphviz.saveText+'"]').show();
                        win.down('button[text="'+Tools.graphviz.cancelText+'"]').show();
                        win.down('button[text="'+Tools.graphviz.deleteText+'"]').hide();
                        win.show();
                    }
                },{
                    text:Tools.graphviz.codeModeText,
                    handler:function(){
                        var win = Tools.graphviz.GraphCodeFormWindow;
                        var form =  win.down('form');
                        win.setTitle(Tools.graphviz.newGraphText);
                        form.getForm().reset();
                        form.getForm().setValues({
                            });
                        win.down('button[text="'+Tools.graphviz.saveText+'"]').show();
                        win.down('button[text="'+Tools.graphviz.cancelText+'"]').show();
                        win.down('button[text="'+Tools.graphviz.deleteText+'"]').hide();
                        win.show();
                    }
                }]
            }

        },{
            iconCls: 'icon-application_view_list',
            text:Tools.graphviz.attributeText,
            handler:function(btn){
                var win = Tools.graphviz.GraphAttrWindow;
                var p = Tools.graphviz.CenterPanel.getPosition();
                win.setPosition(p[0],p[1]);
                var  grid   = win.down('propertygrid');
                var selects = Tools.graphviz.GraphPanel.getSelectionModel().getSelection();
                if(selects.length == 0){
                    alert(Tools.graphviz.pleaseSelectAPictureText);
                    return;
                }else{
                    if(parseInt(selects[0].data.advanced) == 1){
                        alert(Tools.graphviz.codeModeAttributeUnUseAbleText);
                        return;
                    }

                    var attrs = Ext.clone(Tools.graphviz.GraphAtts);
                    var data = selects[0].data.attrs;
                    if(data.length > 0){
                        data = Ext.decode(data);
                        for(var key in data){
                            attrs[key] = data[key];
                        }
                    }
                    grid.setSource(attrs);
                    win.setTitle(Tools.graphviz.editGraphAttributeText);
                    win.show();
                }
            }
        },'->',{
            iconCls: 'icon-export',
            text:Tools.graphviz.exportText,
            menu : {
                items: [{
                    text:Tools.graphviz.dotFormatText,
                    tooltip:Tools.graphviz.dotFormatTooltipText,
                    handler:function(button){
                        button.el.insertHtml(
                            'beforeBegin',
                            '<form action="core/index.php?m=grahp&do=exportdot&id='+Tools.graphviz.currentGid+'&t='+(new Date().getTime())+'" target="_blank" method="post" style="display:none"></form>'
                            ).submit();
                    }
                },{
                    text:Tools.graphviz.csvFormatText,
                    tooltip:Tools.graphviz.csvFormatTooltipText,
                    handler:function(button){
                        button.el.insertHtml(
                            'beforeBegin',
                            '<form action="core/index.php?m=grahp&do=exportcsv&id='+Tools.graphviz.currentGid+'&t='+(new Date().getTime())+'" target="_blank" method="post" style="display:none"></form>'
                            ).submit();
                    }
                }]
            }

        },{
            tooltip:Tools.graphviz.refreshText,
            iconCls: 'icon-refresh',
            handler:function(btn){
                var panel = btn.up('gridpanel'),store;
                store = panel.getStore();
                store.load();
                Etao.msg.info('刷新成功','载入 '+ store.getTotalCount() + ' 条数据');
            }
        }
        ],
        dockedItems:[{
            xtype: 'pagingtoolbar',
            prependButtons:false,
            store: Tools.graphviz.GraphStore,
            dock: 'bottom',
            displayInfo : false,
            beforePageText:'',
            afterPageText:'',
            inputItemWidth:16
        }],
        listeners:{
            itemdblclick:function(view,record,item,index,e,options){
                var win = Tools.graphviz.GraphFormWindow;
                win.setTitle('编辑图 [普通模式]');
                if(parseInt(record.data.advanced) == 1){
                    win = Tools.graphviz.GraphCodeFormWindow;
                    win.setTitle('编辑图 [代码模式]');
                }
                var form = win.down('form');

                form.getForm().setValues(record.data);
                win.down('button[text="删除"]').show();
                win.show();
            },
            selectionchange:function(view,selections,options){
                if(selections.length > 0){
            }
            },
            itemclick: function(view, record, item, index, e){
                //点击节点时记录下节点和 index
                Tools.graphviz.currentGraphRecord = record;
                var gid = Tools.graphviz.currentGid = record.data.id;
                Tools.graphviz.functionUpdateImageAndcode();
                //选择节点时改变右侧Grid的内容

                Ext.apply(Tools.graphviz.EdgeStore.proxy.extraParams,{
                    gid:gid
                });
                Tools.graphviz.EdgeStore.load();
                Ext.apply(Tools.graphviz.NodeStore.proxy.extraParams,{
                    gid:gid
                });
                Tools.graphviz.NodeStore.load();

            }
        }
    });
    /****************************************************************************************/
    Tools.graphviz.NodePanel = Ext.create('Ext.grid.Panel', {
        title:'节点',
        collapsible:true,
        store: Tools.graphviz.NodeStore,
        hideHeaders:false,
        columns: [{
            text: '名称',
            width:80,
            dataIndex: 'name'
        },{
            text: '标签',
            flex:1,
            dataIndex: 'label'
        },{
            text:'引用',
            width:40,
            dataIndex:'use_count'
        }],
        tbar:[
        {
            iconCls: 'icon-add',
            text:'新建节点',
            handler:function(){
                var win = Tools.graphviz.NodeFormWindow;
                var form =  win.down('form');
                win.setTitle('新建节点');
                form.getForm().reset();
                form.getForm().setValues({
                    });
                win.down('button[text="保存"]').show();
                win.down('button[text="删除"]').hide();
                win.show();
            }
        },{
            iconCls: 'icon-application_view_list',
            text:'节点属性',
            handler:function(btn){
                var win = Tools.graphviz.NodeAttrWindow;
                var p = Tools.graphviz.EastPanel.getPosition();
                win.setPosition(p[0],p[1]+50);
                win.setWidth(Tools.graphviz.EastPanel.getWidth());
                var  grid   = win.down('propertygrid');
                var selects = Tools.graphviz.NodePanel.getSelectionModel().getSelection();
                if(selects.length == 0){
                    alert('请先选择一个节点');
                    return;
                }else{
                    var attrs = Ext.clone(Tools.graphviz.NodeAtts);
                    var data = selects[0].data.attrs;
                    if(data.length > 0){
                        data = Ext.decode(data);
                        for(var key in data){
                            attrs[key] = data[key];
                        }
                    }
                    grid.setSource(attrs);
                    win.setTitle('编辑节点属性');
                    win.show();
                }
            }
        },'->',{
            tooltip:'刷新',
            iconCls: 'icon-refresh',
            handler:function(btn){
                var panel = btn.up('gridpanel'),store;
                store = panel.getStore();
                store.load();
                Etao.msg.info('刷新成功','载入 '+ store.getTotalCount() + ' 条数据');
            }
        }
        ],
        dockedItems:[{
            xtype: 'pagingtoolbar',
            prependButtons:false,
            store: Tools.graphviz.NodeStore,
            dock: 'bottom',
            displayInfo : false
        }],
        listeners:{
            itemdblclick:function(view,record,item,index,e,options){
                var win = Tools.graphviz.NodeFormWindow;
                var form = win.down('form');
                win.setTitle('编辑节点');
                form.getForm().setValues(record.data);
                win.down('button[text="删除"]').show();
                win.show();
            },
            beforeactivate:function( panel, options ){
            // panel.getStore().load();
            },
            itemclick: function(view, record, item, index, e){
                //点击节点时记录下节点和 index
                Tools.graphviz.currentNodeRecord = record;
                Tools.graphviz.currentNid = record.data.id;
            }
        }
    });
    /****************************************************************************************/
    Tools.graphviz.EdgePanel = Ext.create('Ext.grid.Panel', {
        title:'关系',
        collapsible:true,
        store: Tools.graphviz.EdgeStore,
        hideHeaders:false,
        columns: [{
            text:'类型',
            dataIndex:'typeString',
            align:'center',
            width:50,
            sortable:false
        },{
            text: 'Node1',
            width:80,
            dataIndex: 'node1'
        },{
            text: 'Node2',
            width:100,
            dataIndex: 'node2'
        },{
            text: '标签',
            flex:1,
            dataIndex: 'label'
        }],
        tbar:[
        {
            iconCls: 'icon-add',
            text:'增加关系',
            handler:function(){
                var win = Tools.graphviz.EdgeFormWindow;
                var form =  win.down('form');
                win.setTitle('新建一条对应关系');
                form.getForm().reset();
                form.getForm().setValues({
                    'type':1,
                    'gid':Tools.graphviz.currentGid
                });
                var type = form.down('*[name=type]');
                type.show();
                win.down('button[text="保存"]').show();
                win.down('button[text="取消"]').show();
                win.down('button[text="删除"]').hide();
                win.show();
            }
        },{
            iconCls: 'icon-application_view_list',
            text:'边属性',
            handler:function(btn){
                var win = Tools.graphviz.EdgeAttrWindow;
                var p = Tools.graphviz.EastPanel.getPosition();
                win.setPosition(p[0],p[1]+50);
                win.setWidth(Tools.graphviz.EastPanel.getWidth());
                var  grid   = win.down('propertygrid');
                var selects = Tools.graphviz.EdgePanel.getSelectionModel().getSelection();
                if(selects.length == 0){
                    alert('请先选择一条边');
                    return;
                }else{
                    var attrs = Ext.clone(Tools.graphviz.EdgeAtts);
                    var data = selects[0].data.attrs;
                    if(data.length > 0){
                        data = Ext.decode(data);
                        for(var key in data){
                            attrs[key] = data[key];
                        }
                    }
                    grid.setSource(attrs);
                    win.setTitle('修改边属性');
                    win.show();
                }
            }
        },'->',{
            iconCls: 'icon-import',
            text:'导入',
            tooltip:'CSV 文件中只能包含一对一关系，每条关系占一行，节点间用 , 隔开',
            handler:function(btn){
                var win = Tools.graphviz.EdgeImportFormWindow;
                var selects = Tools.graphviz.GraphPanel.getSelectionModel().getSelection();
                if(selects.length == 0){
                    alert('请先选择一个图');
                    return;
                }else{
                    win.setTitle('导入边');
                    var form = win.down('form');
                    var gid = Tools.graphviz.currentGid;
                    var gidField = form.down('*[name=gid]');
                    gidField.setValue(gid);

                    win.show();
                }
            }
        },{
            tooltip:'导出 CSV 格式文件，一对多和链式结构的边会被展开为一对一格式',
            text:'导出',
            iconCls: 'icon-export',
            handler:function(btn){
                button.el.insertHtml(
                    'beforeBegin',
                    '<form action="core/index.php?m=grahp&do=exportcsv&id='+Tools.graphviz.currentGid+'&t='+(new Date().getTime())+'" target="_blank" method="post" style="display:none"></form>'
                    ).submit();
            }
        },{
            tooltip:'刷新',
            iconCls: 'icon-refresh',
            handler:function(btn){
                var panel = btn.up('gridpanel'),store;
                store = panel.getStore();
                store.load();
                Etao.msg.info('刷新成功','载入 '+ store.getTotalCount() + ' 条数据');
            }
        }
        ],
        dockedItems:[{
            xtype: 'pagingtoolbar',
            prependButtons:false,
            store: Tools.graphviz.EdgeStore,
            dock: 'bottom',
            displayInfo : false
        }],
        listeners:{
            itemdblclick:function(view,record,item,index,e,options){
                var win = Tools.graphviz.EdgeFormWindow;
                var form = win.down('form');
                var type = form.down('*[name=type]');
                type.hide();
                win.setTitle('编辑边 ['+ Tools.graphviz.functionTypeToString(record.data.type)+']');
                form.getForm().setValues(record.data);
                win.down('button[text="删除"]').show();
                win.show();
            },
            itemclick: function(view, record, item, index, e){
                //点击节点时记录下节点和 index
                Tools.graphviz.currentEdgeRecord = record;
                Tools.graphviz.currentEid = record.data.id;
            }
        }
    });
    /****************************************************************************************/
    Tools.graphviz.CodePanel = Ext.create('Ext.panel.Panel', {
        title:'代码',
        bodyPadding:5,
        autoScroll: true,
        tbar:[{
            iconCls: 'icon-save',
            text:'保存',
            handler : function(button) {
                button.el.insertHtml(
                    'beforeBegin',
                    '<form action="core/index.php?m=grahp&do=exportdot&id='+Tools.graphviz.currentGid+'&t='+(new Date().getTime())+'" target="_blank" method="post" style="display:none"></form>'
                    ).submit();
            }
        },'->',{
            iconCls: 'icon-refresh',
            tooltip:'刷新',
            handler:function(btn){
                var panel = btn.up('panel');
                Ext.Ajax.request({
                    method:'GET',
                    url: 'core/index.php?m=grahp&do=code',
                    params:{
                        'id':Tools.graphviz.currentGid
                    },
                    success: function(response) {
                        panel.update(response.responseText);
                    }
                });

            }
        }]
    });
    /****************************************************************************************/
    Tools.graphviz.ImagePanel = Ext.create('Ext.panel.Panel', {
        title:'预览',
        bodyPadding:5,
        autoScroll: true,
        collapsible:true,
        tbar:[{
            iconCls: 'icon-image',
            text:'打开',
            handler : function(button) {
                button.el.insertHtml(
                    'beforeBegin',
                    '<form action="core/index.php?m=grahp&do=image&id='+Tools.graphviz.currentGid+'&t='+(new Date().getTime())+'" target="_blank" method="post" style="display:none"></form>'
                    ).submit();
            }
        },'->',{
            iconCls: 'icon-refresh',
            tooltip:'刷新',
            handler:function(btn){
                var width = Tools.graphviz.CenterPanel.getWidth() - 30;
                var panel = btn.up('panel');
                panel.update('<a href="core/index.php?m=grahp&do=image&id='+Tools.graphviz.currentGid+'&t='+(new Date().getTime())+'" target="_blank">'
                    +'<img width="'+width+'" src="core/index.php?m=grahp&do=image&id='+Tools.graphviz.currentGid+'&t='+(new Date().getTime())+'" /></a>');
            }
        }]
    });
    /****************************************************************************************/
    Tools.graphviz.CenterPanel = Ext.create('Ext.tab.Panel', {
        region:'center',
        margins: '0 0 5 0',
        title:'预览',
        tabPosition:'bottom',
        items:[Tools.graphviz.ImagePanel,Tools.graphviz.CodePanel]
    });
    /****************************************************************************************/
    Tools.graphviz.EastPanel = Ext.create('Ext.tab.Panel', {
        region:'east',
        split:true,
        margins: '0 5 5 0',
        title:'数据',
        collapsible:true,
        //hideCollapseTool:false,
        width:350,
        tabPosition:'top',
        items:[Tools.graphviz.EdgePanel,Tools.graphviz.NodePanel]
    });
    /****************************************************************************************/
    Tools.graphviz.functionUpdateImageAndcode = function (){
        var width = Tools.graphviz.CenterPanel.getWidth() - 30;
        Tools.graphviz.ImagePanel.update('<a href="core/index.php?m=grahp&do=image&id='+Tools.graphviz.currentGid+'&t='+(new Date().getTime())+'" target="_blank">'
            +'<img width="'+width+'" src="core/index.php?m=grahp&do=image&id='+Tools.graphviz.currentGid+'&t='+(new Date().getTime())+'" /></a>');

        Ext.Ajax.request({
            method:'GET',
            url: 'core/index.php?m=grahp&do=code',
            params:{
                'id':Tools.graphviz.currentGid
            },
            success: function(response) {
                Tools.graphviz.CodePanel.update(response.responseText);
            }
        });
    };
    /****************************************************************************************/
    Ext.create('Ext.container.Viewport', {
        layout: 'border',
        renderTo: Ext.getBody(),
        items: [{
            region: 'north',
            id: 'header',
            xtype: 'box',
            html: '<div class="title"><h1>Wephi 0.1 beta</h1></div><div class="site"><a href="http://wephi.googlecode.com" target="_blank">http://wephi.googlecode.com</a></div>',
            height:30,
            border: false,
            margins: '0 0 5 0'
        },Tools.graphviz.GraphPanel,Tools.graphviz.CenterPanel,Tools.graphviz.EastPanel]
    });

/****************************************************************************************/
//初始化
//setTimeout(Tools.graphviz.functionUpdateImageAndcode,1000);
/****************************************************************************************/
});