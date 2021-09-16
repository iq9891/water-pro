import Layout from '../components/layout';

export default [
  {
    path: '',
    redirect: '/components/button-cn',
    component: Layout,
  },
  {
    path: 'icon-cn',
    beforeEnter: (to, from, next) => {
      window.location.href = 'https://2x.antdv.com/components/icon-cn';
    },
    component: () => import('../docs/typography/demo/index.vue'),
  },
  {
    path: 'avatar-cn',
    component: () => import('../docs/avatar/demo/index.vue'),
  },
  {
    path: 'statistic-cn',
    component: () => import('../docs/statistic/demo/index.vue'),
  },
  {
    path: 'badge-cn',
    component: () => import('../docs/badge/demo/index.vue'),
  },
  {
    path: 'breadcrumb-cn',
    component: () => import('../docs/breadcrumb/demo/index.vue'),
  },
  {
    path: 'button-cn',
    component: () => import('../docs/button/demo/index.vue'),
  },
  {
    path: 'card-cn',
    component: () => import('../docs/card/demo/index.vue'),
  },
  {
    path: 'checkbox-cn',
    component: () => import('../docs/checkbox/demo/index.vue'),
  },
  {
    path: 'grid-cn',
    component: () => import('../docs/grid/demo/index.vue'),
  },
  {
    path: 'image-cn',
    component: () => import('../docs/image/demo/index.vue'),
  },
  {
    path: 'input-cn',
    component: () => import('../docs/input/demo/index.vue'),
  },
  {
    path: 'mentions-cn',
    component: () => import('../docs/mentions/demo/index.vue'),
  },
  {
    path: 'select-cn',
    component: () => import('../docs/select/demo/index.vue'),
  },
  {
    path: 'select-api-cn',
    component: () => import('../docs/select-api/demo/index.vue'),
  },
  {
    path: 'menu-cn',
    component: () => import('../docs/menu/demo/index.vue'),
  },
  {
    path: 'pagination-cn',
    component: () => import('../docs/pagination/demo/index.vue'),
  },
  {
    path: 'popconfirm-cn',
    component: () => import('../docs/popconfirm/demo/index.vue'),
  },
  {
    path: 'popover-cn',
    component: () => import('../docs/popover/demo/index.vue'),
  },
  {
    path: 'radio-cn',
    component: () => import('../docs/radio/demo/index.vue'),
  },
  {
    path: 'rate-cn',
    component: () => import('../docs/rate/demo/index.vue'),
  },
  {
    path: 'tabs-cn',
    component: () => import('../docs/tabs/demo/index.vue'),
  },
  {
    path: 'tag-cn',
    component: () => import('../docs/tag/demo/index.vue'),
  },
  {
    path: 'tag-group-cn',
    component: () => import('../docs/tag-group/demo/index.vue'),
  },
  {
    path: 'tag-modal-list-cn',
    component: () => import('../docs/tag-modal-list/demo/index.vue'),
  },
  {
    path: 'tooltip-cn',
    component: () => import('../docs/tooltip/demo/index.vue'),
  },
  {
    path: 'dropdown-cn',
    component: () => import('../docs/dropdown/demo/index.vue'),
  },
  {
    path: 'divider-cn',
    component: () => import('../docs/divider/demo/index.vue'),
  },
  {
    path: 'collapse-cn',
    component: () => import('../docs/collapse/demo/index.vue'),
  },
  {
    path: 'notification-cn',
    component: () => import('../docs/notification/demo/index.vue'),
  },
  {
    path: 'message-cn',
    component: () => import('../docs/message/demo/index.vue'),
  },
  {
    path: 'spin-cn',
    component: () => import('../docs/spin/demo/index.vue'),
  },
  {
    path: 'switch-cn',
    component: () => import('../docs/switch/demo/index.vue'),
  },
  {
    path: 'auto-complete-cn',
    component: () => import('../docs/auto-complete/demo/index.vue'),
  },
  {
    path: 'affix-cn',
    component: () => import('../docs/affix/demo/index.vue'),
  },
  {
    path: 'cascader-cn',
    component: () => import('../docs/cascader/demo/index.vue'),
  },
  {
    path: 'cascader-api-cn',
    component: () => import('../docs/cascader-api/demo/index.vue'),
  },
  {
    path: 'back-top-cn',
    component: () => import('../docs/back-top/demo/index.vue'),
  },
  {
    path: 'modal-cn',
    component: () => import('../docs/modal/demo/index.vue'),
  },
  {
    path: 'alert-cn',
    component: () => import('../docs/alert/demo/index.vue'),
  },
  {
    path: 'time-picker-cn',
    component: () => import('../docs/time-picker/demo/index.vue'),
  },
  {
    path: 'steps-cn',
    component: () => import('../docs/steps/demo/index.vue'),
  },
  {
    path: 'calendar-cn',
    component: () => import('../docs/calendar/demo/index.vue'),
  },
  {
    path: 'date-picker-cn',
    component: () => import('../docs/date-picker/demo/index.vue'),
  },
  {
    path: 'locale-provider-cn',
    component: () => import('../docs/locale-provider/demo/index.vue'),
  },
  {
    path: 'slider-cn',
    component: () => import('../docs/slider/demo/index.vue'),
  },
  {
    path: 'progress-cn',
    component: () => import('../docs/progress/demo/index.vue'),
  },
  {
    path: 'timeline-cn',
    component: () => import('../docs/timeline/demo/index.vue'),
  },
  {
    path: 'table-cn',
    component: () => import('../docs/table/demo/index.vue'),
  },
  {
    path: 'table-pro-cn',
    component: () => import('../docs/table-pro/demo/index.vue'),
  },
  {
    path: 'input-number-cn',
    component: () => import('../docs/input-number/demo/index.vue'),
  },
  {
    path: 'transfer-cn',
    component: () => import('../docs/transfer/demo/index.vue'),
  },
  {
    path: 'upload-cn',
    component: () => import('../docs/upload/demo/index.vue'),
  },
  {
    path: 'tree-cn',
    component: () => import('../docs/tree/demo/index.vue'),
  },
  {
    path: 'tree-select-cn',
    component: () => import('../docs/tree-select/demo/index.vue'),
  },
  {
    path: 'layout-cn',
    component: () => import('../docs/layout/demo/index.vue'),
  },
  {
    path: 'form-cn',
    component: () => import('../docs/form/demo/index.vue'),
  },
  {
    path: 'form-pro-cn',
    component: () => import('../docs/form-pro/demo/index.vue'),
  },
  {
    path: 'anchor-cn',
    component: () => import('../docs/anchor/demo/index.vue'),
  },
  {
    path: 'list-cn',
    component: () => import('../docs/list/demo/index.vue'),
  },
  {
    path: 'carousel-cn',
    component: () => import('../docs/carousel/demo/index.vue'),
  },
  {
    path: 'drawer-cn',
    component: () => import('../docs/drawer/demo/index.vue'),
  },
  {
    path: 'skeleton-cn',
    component: () => import('../docs/skeleton/demo/index.vue'),
  },
  {
    path: 'comment-cn',
    component: () => import('../docs/comment/demo/index.vue'),
  },
  {
    path: 'config-provider-cn',
    component: () => import('../docs/config-provider/demo/index.vue'),
  },
  {
    path: 'empty-cn',
    component: () => import('../docs/empty/demo/index.vue'),
  },
  {
    path: 'result-cn',
    component: () => import('../docs/result/demo/index.vue'),
  },
  {
    path: 'descriptions-cn',
    component: () => import('../docs/descriptions/demo/index.vue'),
  },
  {
    path: 'page-header-cn',
    component: () => import('../docs/page-header/demo/index.vue'),
  },
  {
    path: 'space-cn',
    component: () => import('../docs/space/demo/index.vue'),
  },
  {
    path: 'typography-cn',
    component: () => import('../docs/typography/demo/index.vue'),
  },
  {
    path: 'scrollbar-cn',
    component: () => import('../docs/scrollbar/demo/index.vue'),
  },
  {
    path: 'color-picker-cn',
    component: () => import('../docs/color-picker/demo/index.vue'),
  },
  {
    path: 'basic-arrow-cn',
    component: () => import('../docs/basic-arrow/demo/index.vue'),
  },
  {
    path: 'basic-help-cn',
    component: () => import('../docs/basic-help/demo/index.vue'),
  },
  {
    path: 'basic-title-cn',
    component: () => import('../docs/basic-title/demo/index.vue'),
  },
  {
    path: 'container-collapse-cn',
    component: () => import('../docs/container-collapse/demo/index.vue'),
  },
  {
    path: 'container-scroll-cn',
    component: () => import('../docs/container-scroll/demo/index.vue'),
  },
  {
    path: 'modal-pro-cn',
    component: () => import('../docs/modal-pro/demo/index.vue'),
  },
  {
    path: 'upload-name-cn',
    component: () => import('../docs/upload-name/demo/index.vue'),
  },
  {
    path: 'upload-image-cn',
    component: () => import('../docs/upload-image/demo/index.vue'),
  },
  {
    path: 'upload-card-cn',
    component: () => import('../docs/upload-card/demo/index.vue'),
  },
  {
    path: 'preview-image-cn',
    component: () => import('../docs/preview-image/demo/index.vue'),
  },
  {
    path: 'classify-cn',
    component: () => import('../docs/classify/demo/index.vue'),
  },
];
