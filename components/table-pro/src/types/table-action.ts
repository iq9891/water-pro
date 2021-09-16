/** @format */

import { ButtonProps } from '../../../button/buttonTypes';

export interface ActionItem extends ButtonProps {
  onClick?: Fn;
  label: string;
  color?: 'success' | 'danger' | 'warning';
  icon?: string;
  popConfirm?: PopConfirm;
  disabled?: boolean;
  divider?: boolean;
}

export interface PopConfirm {
  title: string;
  okText?: string;
  cancelText?: string;
  confirm: Fn;
  cancel?: Fn;
  icon?: string;
}
