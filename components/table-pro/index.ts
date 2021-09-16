/** @format */

import TablePro from './src/table-pro';
export { default as TableAction } from './src/components/table-action';
export { default as EditTableHeaderIcon } from './src/components/edit-table-header-icon';
export { default as TableImage } from './src/components/table-img';
export { default as TableCard } from './src/components/table-card';

import { withInstall } from '../_util/type';

export * from './src/types/table';
export * from './src/types/pagination';
export * from './src/types/table-action';

export { useTable } from './src/hooks/use-table';

export type { FormSchema, FormProps } from '../form-pro/src/types/form';

export {
  TablePro,
}

export default withInstall(TablePro);
