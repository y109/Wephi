-- ----------------------------
-- Table structure for `wephi_graphviz_edge`
-- ----------------------------
DROP TABLE IF EXISTS `wephi_graphviz_edge`;
CREATE TABLE `wephi_graphviz_edge` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `gid` int(10) unsigned NOT NULL,
  `node1` varchar(100) NOT NULL COMMENT '节点名称',
  `node2` varchar(200) NOT NULL COMMENT '标签',
  `type` int(10) unsigned NOT NULL COMMENT '类型(1:1to1;2:1ton;3:link)',
  `label` varchar(255) NOT NULL COMMENT '标签',
  `attrs` text NOT NULL COMMENT '边属性',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='Graphviz_边';

-- ----------------------------
-- Table structure for `wephi_graphviz_graph`
-- ----------------------------
DROP TABLE IF EXISTS `wephi_graphviz_graph`;
CREATE TABLE `wephi_graphviz_graph` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT '图名',
  `label` varchar(200) NOT NULL COMMENT '标签',
  `type` varchar(20) NOT NULL COMMENT '类型',
  `directed` tinyint(4) unsigned NOT NULL DEFAULT '1' COMMENT '是否有向图',
  `strict` tinyint(4) unsigned NOT NULL DEFAULT '0' COMMENT '严格模式',
  `file_format` varchar(10) NOT NULL DEFAULT 'svg' COMMENT '图像格式',
  `attrs` text NOT NULL COMMENT '属性',
  `advanced` tinyint(4) unsigned NOT NULL DEFAULT '0' COMMENT '高级模式',
  `code` text NOT NULL COMMENT 'GraphViz源码',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='Graphviz_图';

-- ----------------------------
-- Table structure for `wephi_graphviz_node`
-- ----------------------------
DROP TABLE IF EXISTS `wephi_graphviz_node`;
CREATE TABLE `wephi_graphviz_node` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `gid` int(10) unsigned NOT NULL,
  `name` varchar(100) NOT NULL COMMENT '节点名称',
  `label` varchar(200) NOT NULL COMMENT '标签',
  `use_count` int(10) unsigned NOT NULL COMMENT '使用次数',
  `attrs` text NOT NULL COMMENT '属性',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='Graphviz_节点';

