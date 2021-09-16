import Text from './Text';
import Title from './Title';
import Paragraph from './Paragraph';
import PropTypes from '../_util/vue-types';
import { defineComponent, HTMLAttributes, App, Plugin } from 'vue';
import useConfigInject from '../_util/hooks/useConfigInject';
import Link from './Link';
import Base from './Base';
import classNames from '../_util/classNames';

export interface TypographyProps extends HTMLAttributes {
  prefixCls?: string;
  size?: 'default' | 'small' | 'large';
}

interface InternalTypographyProps extends TypographyProps {
  component?: string;
  resetable?: boolean;
  styleReset?: boolean;
}

const Typography = defineComponent<InternalTypographyProps>({
  name: 'ATypography',
  Base,
  Text,
  Title,
  Paragraph,
  Link,
  inheritAttrs: false,
  setup(props, { slots, attrs }) {
    const { prefixCls } = useConfigInject('typography', props);
    return () => {
      const {
        prefixCls: _prefixCls,
        class: _className,
        component: Component = 'article' as any,
        ...restProps
      } = { ...props, ...attrs };
      return (
        <Component
          class={classNames(prefixCls.value, attrs.class, {
            [`${prefixCls.value}-size`]: props.resetable,
            [`${prefixCls.value}-reset`]: props.styleReset,
            [`${prefixCls.value}-${props.size}`]: props.size && props.size !== 'default',
          })}
          {...restProps}
        >
          {slots.default?.()}
        </Component>
      );
    };
  },
});

Typography.props = {
  prefixCls: PropTypes.string,
  component: PropTypes.string,
  size: PropTypes.oneOf(['large', 'small', 'default']).def('default'),
  resetable: PropTypes.looseBool,
  styleReset: PropTypes.looseBool,
};

Typography.install = function(app: App) {
  app.component(Typography.name, Typography);
  app.component(Typography.Text.displayName, Text);
  app.component(Typography.Title.displayName, Title);
  app.component(Typography.Paragraph.displayName, Paragraph);
  app.component(Typography.Link.displayName, Link);
  return app;
};

export default Typography as typeof Typography &
  Plugin & {
    readonly Text: typeof Text;
    readonly Title: typeof Title;
    readonly Paragraph: typeof Paragraph;
    readonly Link: typeof Link;
    readonly Base: typeof Base;
  };
