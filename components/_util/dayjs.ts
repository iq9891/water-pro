import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import localeData from 'dayjs/plugin/localeData';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/zh-cn';

dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(isBetween);
dayjs.extend(localeData);
dayjs.locale('zh-cn');

export default dayjs;
