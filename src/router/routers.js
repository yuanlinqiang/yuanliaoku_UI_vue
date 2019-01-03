import Main from '@/view/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/hide-in-menus',
    name: 'hide-in-menus',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      { path: 'person-edit',name: 'person-edit',meta: {title: '修改人民'}, component: () => import('@/view/manage/person/person-edit.vue')},
      { path: 'crawling-edit',name: 'crawling-edit',meta: {title: '修改数据'}, component: () => import('@/view/manage/crawling/crawling-edit.vue')},
      { path: 'alllink-edit',name: 'alllink-edit',meta: {title: '子连接'}, component: () => import('@/view/manage/alllink/alllink-edit.vue')},
      { path: 'words-edit',name: 'words-edit',meta: {title: '词库'}, component: () => import('@/view/manage/words/words-edit.vue')},
      { path: 'people-edit',name: 'people-edit',meta: {title: '人物名称'}, component: () => import('@/view/manage/people/people-edit.vue')},
      { path: 'job-edit',name: 'job-edit',meta: {title: '职务名称'}, component: () => import('@/view/manage/job/job-edit.vue')},
      { path: 'address-edit',name: 'address-edit',meta: {title: '地点名称'}, component: () => import('@/view/manage/address/address-edit.vue')},
    ]
  },
  {
    path: '/corpora-manage',
    name: 'corpora-manage',
    meta: {
      icon: 'logo-buffer',
      title: '语料库'
    },
    component: Main,
    children: [
      {
        path: 'person-manage',
        name: 'person-manage',
        meta: {
          icon: 'ios-alert',
          title: '人民'
        },
        component: () => import('@/view/manage/person/person-manage.vue')
      },
      {
        path: 'crawling-manage',
        name: 'crawling-manage',
        meta: {
          icon: 'ios-alert',
          title: '栏目网址'
        },
        component: () => import('@/view/manage/crawling/crawling-manage.vue')
      },
      {
        path: 'alllink-manage',
        name: 'alllink-manage',
        meta: {
          icon: 'ios-alert',
          title: '子连接'
        },
        component: () => import('@/view/manage/alllink/alllink-manage.vue')
      },
      {
        path: 'words-manage',
        name: 'words-manage',
        meta: {
          icon: 'ios-alert',
          title: '爬虫2'
        },
        component: () => import('@/view/manage/words/words-manage.vue')
      }
    ]
  },

  {
    path: '/words',
    name: 'words',
    meta: {
      icon: 'logo-buffer',
      title: '词库'
    },
    component: Main,
    children: [
      {
        path: 'people-manage',
        name: 'people-manage',
        meta: {
          icon: 'md-contacts',
          title: '人物名称'
        },
        component: () => import('@/view/manage/people/people-manage.vue')
      },
      {
        path: 'address-manage',
        name: 'address-manage',
        meta: {
          icon: 'ios-timer-outline',
          title: '地点名称'
        },
        component: () => import('@/view/manage/address/address-manage.vue')
      },
      {
        path: 'job-manage',
        name: 'job-manage',
        meta: {
          icon: 'md-trending-up',
          title: '职务名称'
        },
        component: () => import('@/view/manage/job/job-manage.vue')
      },
    ]
  },

  {
    path: '/components',
    name: 'components',
    meta: {
      icon: 'logo-buffer',
      title: '组件'
    },
    component: Main,
    children: [
      {
        path: 'count_to_page',
        name: 'count_to_page',
        meta: {
          icon: 'md-trending-up',
          title: '数字渐变'
        },
        component: () => import('@/view/components/count-to/count-to.vue')
      },
      {
        path: 'tables_page',
        name: 'tables_page',
        meta: {
          icon: 'md-grid',
          title: '多功能表格'
        },
        component: () => import('@/view/components/tables/tables.vue')
      },
      {
        path: 'split_pane_page',
        name: 'split_pane_page',
        meta: {
          icon: 'md-pause',
          title: '分割窗口'
        },
        component: () => import('@/view/components/split-pane/split-pane.vue')
      },
      {
        path: 'markdown_page',
        name: 'markdown_page',
        meta: {
          icon: 'logo-markdown',
          title: 'Markdown编辑器'
        },
        component: () => import('@/view/components/markdown/markdown.vue')
      },
      {
        path: 'editor_page',
        name: 'editor_page',
        meta: {
          icon: 'ios-create',
          title: '富文本编辑器'
        },
        component: () => import('@/view/components/editor/editor.vue')
      },
      {
        path: 'icons_page',
        name: 'icons_page',
        meta: {
          icon: '_bear',
          title: '自定义图标'
        },
        component: () => import('@/view/components/icons/icons.vue')
      }
    ]
  },
  
  {
    path: '/doc-manage',
    name: 'doc-manage',
    meta: {
      icon: 'logo-buffer',
      title: '文档库'
    },
    component: Main,
    children: [
      {
        path: '',
        name: 'doc',
        meta: {
          title: '文档',
          href: 'https://lison16.github.io/iview-admin-doc/#/',
          icon: 'ios-book'
        }
      }
    ]
  },
  //*
  {
    path: '/update',
    name: 'update',
    meta: {
      icon: 'md-cloud-upload',
      title: '数据上传'
    },
    component: Main,
    children: [
      {
        path: 'update_table_page',
        name: 'update_table_page',
        meta: {
          icon: 'ios-document',
          title: '上传Csv'
        },
        component: () => import('@/view/update/update-table.vue')
      },
      {
        path: 'update_paste_page',
        name: 'update_paste_page',
        meta: {
          icon: 'md-clipboard',
          title: '粘贴表格数据'
        },
        component: () => import('@/view/update/update-paste.vue')
      }
    ]
  },
  {
    path: '/excel',
    name: 'excel',
    meta: {
      icon: 'ios-stats',
      title: 'EXCEL导入导出'
    },
    component: Main,
    children: [
      {
        path: 'upload-excel',
        name: 'upload-excel',
        meta: {
          icon: 'md-add',
          title: '导入EXCEL'
        },
        component: () => import('@/view/excel/upload-excel.vue')
      },
      {
        path: 'export-excel',
        name: 'export-excel',
        meta: {
          icon: 'md-download',
          title: '导出EXCEL'
        },
        component: () => import('@/view/excel/export-excel.vue')
      }
    ]
  },
  {
    path: '/tools_methods',
    name: 'tools_methods',
    meta: {
      hide: true
    },
    component: Main,
    children: [
      {
        path: 'tools_methods_page',
        name: 'tools_methods_page',
        meta: {
          icon: 'ios-hammer',
          title: '工具方法'
        },
        component: () => import('@/view/tools-methods/tools-methods.vue')
      }
    ]
  },
  {
    path: '/directive',
    name: 'directive',
    meta: {
      hide: true
    },
    component: Main,
    children: [
      {
        path: 'directive_page',
        name: 'directive_page',
        meta: {
          icon: 'ios-navigate',
          title: '指令'
        },
        component: () => import('@/view/directive/directive.vue')
      }
    ]
  },
  {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      icon: 'md-menu',
      title: '多级菜单'
    },
    component: Main,
    children: [
      {
        path: 'level_2_1',
        name: 'level_2_1',
        meta: {
          icon: 'md-funnel',
          title: '二级-1'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'level_2_2',
        name: 'level_2_2',
        meta: {
          access: ['super_admin'],
          icon: 'md-funnel',
          showAlways: true,
          title: '二级-2'
        },
        component: parentView,
        children: [
          {
            path: 'level_2_2_1',
            name: 'level_2_2_1',
            meta: {
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import('@/view/multilevel/level-2-2/level-3-1.vue')
          }
        ]
      },
      {
        path: 'level_2_3',
        name: 'level_2_3',
        meta: {
          icon: 'md-funnel',
          title: '二级-3'
        },
        component: () => import('@/view/multilevel/level-2-3.vue')
      },
    ]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: '动态路由'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: '带参路由'
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },
  //*/
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
