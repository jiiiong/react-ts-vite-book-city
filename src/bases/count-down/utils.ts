const DAY_MILLISECONDS = 24 * 60 * 60 * 1000;
const HOUR_MILLISECONDS = 60 * 60 * 1000;
const MIN_MILLISECONDS = 60 * 1000;
import {timeItemType} from './type';

function formatTime(val:number) {
  if (val <= 0) return '00';
  else if (val < 10) return `0${val}`;
  return `${val}`
}

function getTime(format: string, timeLeft: number) {
  let t = timeLeft;

  let [, s, m, h] = [1000, 60, 60, 24].map(unit => {
    const num = t % unit;
    t = Math.floor(t/unit);
    return num
  });

  const d = t

  if (timeLeft > DAY_MILLISECONDS && format.indexOf('d') === -1)
    h += d * 24;
  if (timeLeft > HOUR_MILLISECONDS && format.indexOf('h') === -1)
    m += h * 24;
  if (timeLeft > MIN_MILLISECONDS && format.indexOf('m') === -1)
    s += m * 24;

  return {
    dd: formatTime(d),
    hh: formatTime(h),
    mm: formatTime(m),
    ss: formatTime(s),
    d,
    h,
    m,
    s,
  }
}

type formatType = 'dd' | 'hh' | 'mm' | 'ss';

export function getTimeItems(format: string, timeLeft: number): timeItemType[] {
  const timePattern = format!.match(/[a-zA-Z]{1,3}/g) || [];
  const symbols = format.match(/[\u4e00-\u9fa5]+|[^a-zA-Z]/g) || [];
  const times = getTime(format, timeLeft);

  return timePattern.map((item, i) => ({
    num: times[item.toLocaleLowerCase() as formatType],
    symbol: symbols[i] ? symbols[i] : '',
  }));
}
