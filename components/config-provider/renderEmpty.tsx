import { inject, VNodeChild } from 'vue';
import Empty from '../empty';
import { defaultConfigProvider } from '.';

export interface RenderEmptyProps {
  componentName?: string;
}

const RenderEmpty = (props: RenderEmptyProps) => {
  // TODO [fix] 解决使用的过程中未用 configProvider 报错
  const configProvider = inject('configProvider', defaultConfigProvider) || defaultConfigProvider;
  const renderHtml = (componentName?: string) => {
    const { getPrefixCls } = configProvider;
    const prefix = getPrefixCls('empty');
    switch (componentName) {
      case 'Table':
      case 'List':
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;

      case 'Select':
      case 'TreeSelect':
      case 'Cascader':
      case 'Transfer':
      case 'Mentions':
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} class={`${prefix}-small`} />;

      default:
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
    }
  };
  return renderHtml(props.componentName);
};

function renderEmpty(componentName?: string): VNodeChild | JSX.Element {
  return <RenderEmpty componentName={componentName} />;
}

export type RenderEmptyHandler = typeof renderEmpty;

export default renderEmpty;
