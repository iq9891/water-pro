import type { Locale } from '../locale-provider';

import Pagination from '../vc-pagination/locale/et_EE';
import DatePicker from '../date-picker/locale/et_EE';
import TimePicker from '../time-picker/locale/et_EE';
import Calendar from '../calendar/locale/et_EE';
import Input from '../input/locale/et_EE';

const localeValues: Locale = {
  locale: 'et',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Input,
  Table: {
    filterTitle: 'Filtri menüü',
    filterConfirm: 'OK',
    filterReset: 'Nulli',
    selectAll: 'Vali kõik',
    selectInvert: 'Inverteeri valik',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Tühista',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Tühista',
  },
  Transfer: {
    searchPlaceholder: 'Otsi siit',
    itemUnit: 'kogus',
    itemsUnit: 'kogus',
  },
  Upload: {
    uploading: 'Üleslaadimine...',
    removeFile: 'Eemalda fail',
    uploadError: 'Üleslaadimise tõrge',
    previewFile: 'Faili eelvaade',
    downloadFile: 'Laadige fail alla',
  },
  Empty: {
    description: 'Andmed puuduvad',
  },
};

export default localeValues;