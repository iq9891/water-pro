import type { Locale } from '../locale-provider';

import Pagination from '../vc-pagination/locale/fi_FI';
import DatePicker from '../date-picker/locale/fi_FI';
import TimePicker from '../time-picker/locale/fi_FI';
import Calendar from '../calendar/locale/fi_FI';
import Input from '../input/locale/fi_FI';

const localeValues: Locale = {
  locale: 'fi',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Input,
  Table: {
    filterTitle: 'Suodatus valikko',
    filterConfirm: 'OK',
    filterReset: 'Tyhjennä',
    selectAll: 'Valitse kaikki',
    selectInvert: 'Valitse päinvastoin',
    sortTitle: 'Lajittele',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Peruuta',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Peruuta',
  },
  Transfer: {
    searchPlaceholder: 'Etsi täältä',
    itemUnit: 'kohde',
    itemsUnit: 'kohdetta',
  },
  Upload: {
    uploading: 'Lähetetään...',
    removeFile: 'Poista tiedosto',
    uploadError: 'Virhe lähetyksessä',
    previewFile: 'Esikatsele tiedostoa',
    downloadFile: 'Lataa tiedosto',
  },
  Empty: {
    description: 'Ei kohteita',
  },
  Text: {
    edit: 'Muokkaa',
    copy: 'Kopioi',
    copied: 'Kopioitu',
    expand: 'Näytä lisää',
  },
};

export default localeValues;
