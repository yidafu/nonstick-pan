
-- vs ===> visualization screen

DROP TABLE IF EXISTS `vs_screen`;
create TABLE `vs_screen` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '大屏ID',

  `name` varchar(32) NOT NULL COMMENT '大屏名称',
  `width` INT DEFAULT 0 DEFAULT 1920 COMMENT '大屏宽度',
  `height` INT DEFAULT 0 DEFAULT 1080 COMMENT '大屏高度',
  `backgroup_color` varchar(32) NOT NULL DEFAULT '' COMMENT '大屏背景色',
  `backgroup_image` varchar(1024) NOT NULL DEFAULT '' COMMENT '大屏图片',
  `snapshot_url` varchar(1024) NOT NULL DEFAULT '' COMMENT '大屏截图',
  `fill_type` TINYINT(4) DEFAULT 0 COMMENT '大屏填充方式',

  `is_published` TINYINT DEFAULT 0 COMMENT '大屏是否发布',
  `is_template` TINYINT DEFAULT 0 COMMENT '是否为模板大屏',

  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',

  PRIMARY KEY (`id`)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '大屏表';


DROP TABLE IF EXISTS `vs_component`;
CREATE TABLE `vs_components` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '组件ID',
  `screen_id` BIGINT NOT NULL COMMENT '组件归属大屏',
  `group_id` BIGINT NOT NULL DEFAULT 0 COMMENT '当前组件归属的组 ID',
  `name` varchar(32) NOT NULL DEFAULT '' COMMENT '前端组件名称,前端会根据这个找到对应的组件进行渲染. 组没有 name',
  `layer_name` varchar(64) NOT NULL DEFAULT '未命名组件' COMMENT '组件可读中文名;当时group时就是图层名称',
  `is_group` TINYINT NOT NULL DEFAULT 0 COMMENT '0 -- 单个组件; 1 -- 组件组',
  `width` INT DEFAULT 0   COMMENT '组件宽度',
  `height` INT DEFAULT 0  COMMENT '组件高度',
  `offset_x` INT DEFAULT 0  COMMENT '组件与画布原点的X轴偏移量',
  `offset_y` INT DEFAULT 0  COMMENT '组件与画布原点的Y轴偏移量',
  `z_index` INT DEFAULT 0  COMMENT '组件之间的层叠顺序',

  `is_lock` TINYINT NOT NULL DEFAULT 0 COMMENT '是否锁定组件',
  `is_lock_aspect_ratio` TINYINT NOT NULL DEFAULT 0 COMMENT '是否锁定组件横纵比',

  `category` varchar(32) NOT NULL DEFAULT 'unkown' COMMENT '组件所属一级分类',
  `sub_category` varchar(32) NOT NULL DEFAULT '' COMMENT '组件所属二级分类',

  `style_config` JSON NOT NULL  COMMENT '样式配置',
  `request_config` JSON NOT NULL  COMMENT '数据请求配置',
  `interact_config` JSON NOT NULL COMMENT '交互配置',

  `umd_js_url` varchar(1024) DEFAULT '' COMMENT '组件 JS 地址. 用于扩展',

  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',

  PRIMARY KEY (`id`)
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin COMMENT = '大屏组件表';

