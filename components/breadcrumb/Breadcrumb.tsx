import type { PropType, ExtractPropTypes } from 'vue';
import { cloneVNode, defineComponent } from 'vue';
import PropTypes from '../_util/vue-types';
import { flattenChildren, getPropsSlot } from '../_util/props-util';
import warning from '../_util/warning';
import BreadcrumbItem from './BreadcrumbItem';
import Menu from '../menu';
import type { VueNode } from '../_util/type';
import useConfigInject from '../_util/hooks/useConfigInject';

export interface Route {
  path: string;
  breadcrumbName: string;
  children?: Omit<Route, 'children'>[];
}

export const breadcrumbProps = () => ({
  prefixCls: String,
  routes: { type: Array as PropType<Route[]> },
  params: PropTypes.any,
  separator: PropTypes.any,
  itemRender: {
    type: Function as PropType<
      (opt: { route: Route; params: unknown; routes: Route[]; paths: string[] }) => VueNode
    >,
  },
});

export type BreadcrumbProps = Partial<ExtractPropTypes<ReturnType<typeof breadcrumbProps>>>;

function getBreadcrumbName(route: Route, params: unknown) {
  if (!route.breadcrumbName) {
    return null;
  }
  const paramsKeys = Object.keys(params).join('|');
  const name = route.breadcrumbName.replace(
    new RegExp(`:(${paramsKeys})`, 'g'),
    (replacement, key) => params[key] || replacement,
  );
  return name;
}
function defaultItemRender(opt: {
  route: Route;
  params: unknown;
  routes: Route[];
  paths: string[];
}): VueNode {
  const { route, params, routes, paths } = opt;
  const isLastItem = routes.indexOf(route) === routes.length - 1;
  const name = getBreadcrumbName(route, params);
  return isLastItem ? <span>{name}</span> : <a href={`#/${paths.join('/')}`}>{name}</a>;
}

export default defineComponent({
  name: 'ABreadcrumb',
  props: breadcrumbProps(),
  slots: ['separator', 'itemRender'],
  setup(props, { slots }) {
    const { prefixCls, direction } = useConfigInject('breadcrumb', props);

    const getPath = (path: string, params: unknown) => {
      path = (path || '').replace(/^\//, '');
      Object.keys(params).forEach((key) => {
        path = path.replace(`:${key}`, params[key]);
      });
      return path;
    };

    const addChildPath = (paths: string[], childPath: string, params: unknown) => {
      const originalPaths = [...paths];
      const path = getPath(childPath || '', params);
      if (path) {
        originalPaths.push(path);
      }
      return originalPaths;
    };

    const genForRoutes = ({
      routes = [],
      params = {},
      separator,
      itemRender = defaultItemRender,
    }: any) => {
      const paths = [];
      return routes.map((route: Route) => {
        const path = getPath(route.path, params);

        if (path) {
          paths.push(path);
        }
        const tempPaths = [...paths];
        // generated overlay by route.children
        let overlay = null;
        if (route.children && route.children.length) {
          overlay = (
            <Menu>
              {route.children.map((child) => (
                <Menu.Item key={child.path || child.breadcrumbName}>
                  {itemRender({
                    route: child,
                    params,
                    routes,
                    paths: addChildPath(tempPaths, child.path, params),
                  })}
                </Menu.Item>
              ))}
            </Menu>
          );
        }

        return (
          <BreadcrumbItem
            overlay={overlay}
            separator={separator}
            key={path || route.breadcrumbName}
          >
            {itemRender({ route, params, routes, paths: tempPaths })}
          </BreadcrumbItem>
        );
      });
    };
    return () => {
      let crumbs: VueNode[];

      const { routes, params = {} } = props;

      const children = flattenChildren(getPropsSlot(slots, props));
      const separator = getPropsSlot(slots, props, 'separator') ?? '/';

      const itemRender = props.itemRender || slots.itemRender || defaultItemRender;
      if (routes && routes.length > 0) {
        // generated by route
        crumbs = genForRoutes({
          routes,
          params,
          separator,
          itemRender,
        });
      } else if (children.length) {
        crumbs = children.map((element, index) => {
          warning(
            typeof element.type === 'object' &&
              (element.type.__ANT_BREADCRUMB_ITEM || element.type.__ANT_BREADCRUMB_SEPARATOR),
            'Breadcrumb',
            "Only accepts Breadcrumb.Item and Breadcrumb.Separator as it's children",
          );
          return cloneVNode(element, { separator, key: index });
        });
      }

      const breadcrumbClassName = {
        [prefixCls.value]: true,
        [`${prefixCls.value}-rtl`]: direction.value === 'rtl',
      };
      return <div class={breadcrumbClassName}>{crumbs}</div>;
    };
  },
});
