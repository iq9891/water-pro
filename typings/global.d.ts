/** @format */

declare module 'vue-drag-resize';
declare module '@fe6/water-pro' {
  export type {
    FormSchema,
    RenderCallbackParams,
  } from '@fe6/water-pro'
  export {
    utils,
    useForm,
    message,
    Modal,
    useModal,
    notification,
    useTable,
    TableAction,
    Button,
    Empty,
    Input,
    Tooltip,
    Typography,
    BasicColumn,
    Space,
    Mentions,
    TreeSelect,
    TreeDataItem,
    SelectEvent,
    TreeDragEvent,
    DropEvent,
    CheckEvent,
    ValidateErrorEntity,
    RuleObject,
    TableState,
    TableStateFilters,
    ColumnProps,
    RadioChangeEvent,
  } from '@fe6/water-pro';
}

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

declare interface IObj<T = any> {
  [key: string]: T;
  [key: number]: T;
}

declare function parseInt(s: string | number, radix?: number): number;

declare function parseFloat(string: string | number): number;

declare type Nullable<T> = T | null;

declare type RefType<T> = T | null;

declare type CustomizedHTMLElement<T> = HTMLElement & T;

declare type Indexable<T extends any = any> = {
  [key: string]: T;
};

declare type Recordable<T extends any = any> = Record<string, T>;

declare type ReadonlyRecordable<T extends any = any> = {
  readonly [key: string]: T;
};

declare type Hash<T> = Indexable<T>;

declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

declare type LabelValueOptions = {
  label: string;
  value: any;
}[];

declare type EmitType = (event: string, ...args: any[]) => void;

declare type TargetContext = '_self' | '_blank';

declare type TimeoutHandle = ReturnType<typeof setTimeout>;

declare type IntervalHandle = ReturnType<typeof setInterval>;

declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T;
}

declare type ComponentRef<
  T extends HTMLElement = HTMLDivElement
> = ComponentElRef<T> | null;

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

type IsSame<A, B> = A | B extends A & B ? true : false;
