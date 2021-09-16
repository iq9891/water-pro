/** @format */

import { ref } from 'vue';
import { hasOwn, isUndefined } from '@fe6/shared';
import message from '../../message';
import { FileItem, FileInfo } from '../types/types';

export const acceptList = ['image/png', 'image/jpeg'];
export const acceptListString = acceptList.join(',');

export function useUpload(props: Recordable, params: Recordable) {
  const loading = ref<boolean>(false);
  const imageName = ref<string>('');
  const imageUrl = ref<string>('');

  const beforeUpload = (file: FileItem, accept: string[] = acceptList) => {
    return new Promise((resolve, reject) => {
      const isJpgOrPng = accept.includes('*') ? true : accept.includes(String(file.type));
      if (!isJpgOrPng) {
        message.error('请上传正确格式的文件');
        loading.value = false;
        reject(false);
      }
      const uploadLimitSize = props.limitSize || 2;
      const isLt2M = file.size / 1024 / 1024 < uploadLimitSize;
      if (!isLt2M) {
        message.error(`图片必须小于 ${uploadLimitSize}MB!`);
        loading.value = false;
        reject(false);
      }
      resolve(isLt2M);
    });
  };

  const emitMethods = (url: string, name: string, info: FileInfo) => {
    const emitData = {
      [props.urlKey]: url,
      [props.nameKey]: name,
    };
    const uploadChange = isUndefined(props.mergeOriginDatas)
      ? emitData
      : props.mergeOriginDatas(emitData, info);
    params.emit('changeUpload', uploadChange);
    props.onFormChange(uploadChange);
  };

  const handleChange = (info: FileInfo) => {
    // [fix] formPro 中 autoUpload = false 的时候没有 emit 事件不方便操作
    if (!props.autoUpload) {
      emitMethods(imageUrl.value, imageName.value, info);
      return;
    }
    if (info.file.status === 'uploading') {
      loading.value = true;
      return;
    }
    if (info.file.status === 'done') {
      loading.value = false;
      const imageData =
        props.resultKey && hasOwn(info.file.response, props.resultKey)
          ? info.file.response[props.resultKey]
          : info.file.response;
      imageName.value = imageData[props.nameKey];
      imageUrl.value = imageData[props.urlKey];

      emitMethods(imageUrl.value, imageName.value, info);
    }
    if (info.file.status === 'error') {
      loading.value = false;
      message.error('upload error');
    }
  };

  const removeImage = () => {
    if (!props.disabled) {
      imageName.value = '';
      imageUrl.value = '';
      emitMethods('', '', {} as FileInfo);
    }
  };

  return {
    imageName,
    imageUrl,
    loading,
    beforeUpload,
    removeImage,
    handleChange,
    headers: props.headers,
  };
}

export function useMoreUpload(props: Recordable, params: Recordable) {
  const moreLoading = ref<boolean>(false);
  const imageList = ref<string[]>([]);

  const beforeUpload = (file: FileItem, accept: string[] = acceptList) => {
    return new Promise((resolve, reject) => {
      const isJpgOrPng = accept.includes('*') ? true : accept.includes(String(file.type));
      if (!isJpgOrPng) {
        message.error('请上传正确格式的文件');
        moreLoading.value = false;
        reject(false);
      }
      const uploadLimitSize = props.limitSize || 2;
      const isLt2M = file.size / 1024 / 1024 < uploadLimitSize;
      if (!isLt2M) {
        message.error(`图片必须小于 ${uploadLimitSize}MB!`);
        moreLoading.value = false;
        reject(false);
      }
      resolve(isLt2M);
    });
  };

  const emitMoreMethods = (urlList: string[], info: FileInfo) => {
    const uploadChange = isUndefined(props.mergeOriginDatas)
      ? urlList
      : props.mergeOriginDatas(urlList, info);
    params.emit('changeUpload', uploadChange);
    props.onFormChange(uploadChange);
  };

  const handleMoreChange = (info: FileInfo) => {
    // [fix] formPro 中 autoUpload = false 的时候没有 emit 事件不方便操作
    if (!props.autoUpload) {
      emitMoreMethods(imageList.value, info);
      return;
    }
    if (info.file.status === 'uploading') {
      moreLoading.value = true;
      return;
    }
    if (info.file.status === 'done') {
      moreLoading.value = false;
      const imageData =
        props.resultKey && hasOwn(info.file.response, props.resultKey)
          ? info.file.response[props.resultKey]
          : info.file.response;

      imageList.value.push(imageData[props.urlKey]);

      emitMoreMethods(imageList.value, info);
    }
    if (info.file.status === 'error') {
      moreLoading.value = false;
      message.error('upload error');
    }
  };

  const removeOneImage = (idx: number) => {
    imageList.value.splice(idx, 1);
    emitMoreMethods(imageList.value, {} as FileInfo);
  };

  return {
    imageList,
    moreLoading,
    beforeUpload,
    removeOneImage,
    handleMoreChange,
    headers: props.headers,
  };
}
