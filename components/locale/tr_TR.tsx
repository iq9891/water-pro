/* eslint-disable no-template-curly-in-string */

import type { Locale } from '../locale-provider';

import Pagination from '../vc-pagination/locale/tr_TR';
import DatePicker from '../date-picker/locale/tr_TR';
import TimePicker from '../time-picker/locale/tr_TR';
import Calendar from '../calendar/locale/tr_TR';
import Input from '../input/locale/tr_TR';
import PreviewImage from '../preview-image/locale/tr_TR';
import UploadImage from '../upload-image/locale/tr_TR';
import UploadCard from '../upload-card/locale/tr_TR';
import UploadName from '../upload-name/locale/tr_TR';
import TagGroup from '../tag-group/locale/tr_TR';
import TagModalList from '../tag-modal-list/locale/tr_TR';
import SelectApi from '../select-api/locale/tr_TR';
import ColorPicker from '../color-picker/locale/tr_TR';
import FormPro from '../form-pro/locale/tr_TR';
import ModalUser from '../modal-user/locale/tr_TR';
import Classify from '../classify/locale/tr_TR';

const typeTemplate = '${label} geçerli bir ${type} değil';

const localeValues: Locale = {
  locale: 'tr',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Input,
  SelectApi,
  ModalUser,
  Classify,
  PreviewImage,
  UploadImage,
  UploadCard,
  UploadName,
  TagGroup,
  TagModalList,
  FormPro,
  ColorPicker,
  global: {
    placeholder: 'Lütfen seçiniz',
  },
  Table: {
    filterTitle: 'Filtre menüsü',
    filterConfirm: 'Tamam',
    filterReset: 'Sıfırla',
    filterEmptyText: 'Filtre yok',
    selectAll: 'Tüm sayfayı seç',
    selectInvert: 'Tersini seç',
    selectionAll: 'Tümünü seç',
    sortTitle: 'Sırala',
    expand: 'Satırı genişlet',
    collapse: 'Satırı daralt',
    triggerDesc: 'Azalan düzende sırala',
    triggerAsc: 'Artan düzende sırala',
    cancelSort: 'Sıralamayı kaldır',
  },
  Modal: {
    okText: 'Tamam',
    cancelText: 'İptal',
    justOkText: 'Tamam',
  },
  Popconfirm: {
    okText: 'Tamam',
    cancelText: 'İptal',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Arama',
    itemUnit: 'Öğe',
    itemsUnit: 'Öğeler',
    remove: 'Kaldır',
    selectCurrent: 'Tüm sayfayı seç',
    removeCurrent: 'Sayfayı kaldır',
    selectAll: 'Tümünü seç',
    removeAll: 'Tümünü kaldır',
    selectInvert: 'Tersini seç',
  },
  Upload: {
    uploading: 'Yükleniyor...',
    removeFile: 'Dosyayı kaldır',
    uploadError: 'Yükleme hatası',
    previewFile: 'Dosyayı önizle',
    downloadFile: 'Dosyayı indir',
  },
  Empty: {
    description: 'Veri Yok',
  },
  Icon: {
    icon: 'ikon',
  },
  Text: {
    edit: 'Düzenle',
    copy: 'Kopyala',
    copied: 'Kopyalandı',
    expand: 'Genişlet',
  },
  PageHeader: {
    back: 'Geri',
  },
  Form: {
    optional: '(opsiyonel)',
    defaultValidateMessages: {
      default: 'Alan doğrulama hatası ${label}',
      required: '${label} gerekli bir alan',
      enum: '${label} şunlardan biri olmalı: [${enum}]',
      whitespace: '${label} sadece boşluk olamaz',
      date: {
        format: '${label} tarih biçimi geçersiz',
        parse: '${label} bir tarihe dönüştürülemedi',
        invalid: '${label} geçersiz bir tarih',
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate,
      },
      string: {
        len: '${label} ${len} karakter olmalı',
        min: '${label} en az ${min} karakter olmalı',
        max: '${label} en çok ${max} karakter olmalı',
        range: '${label} ${min}-${max} karakter arası olmalı',
      },
      number: {
        len: '${label} ${len} olmalı',
        min: '${label} en az ${min} olmalı',
        max: '${label} en çok ${max} olmalı',
        range: '${label} ${min}-${max} arası olmalı',
      },
      array: {
        len: '${label} sayısı ${len} olmalı',
        min: '${label} sayısı en az ${min} olmalı',
        max: '${label} sayısı en çok ${max} olmalı',
        range: '${label} sayısı ${min}-${max} arası olmalı',
      },
      pattern: {
        mismatch: '${label} şu kalıpla eşleşmeli: ${pattern}',
      },
    },
  },
};

export default localeValues;
