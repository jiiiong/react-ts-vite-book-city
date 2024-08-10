import  {useEffect, useState} from "react";
import cx from 'classnames';
import './index.scss';
import { getTimeItems } from "./utils";

export interface CownDownProps {
  time: number;
  timeFormat?: string;
  endText?:string;
  numberClassName?: string;
  symbolClassName?: string;
  endTextClassName?: string;
}

const cssPrefix = 'jiiiong-count-down';
function CountDown(props: CownDownProps) {
  // 当限时变化时，重新渲染；
  return <InternalCountDown key={props.time} {...props}/>;
}


function InternalCountDown({
  time,
  timeFormat='hh:mm:ss',
  endText,
  numberClassName,
  symbolClassName,
  endTextClassName,
}: CownDownProps) {
  const [leftTime, setLeftTime] = useState<number>(time);

  useEffect(() => {
    const interId = setInterval(() => {
      setLeftTime((t) => t - 1000);
    }, 1000);
    return () => clearInterval(interId);
  }, [time]);

  // 计时结束
  if (endText && leftTime <= 0)
    return (
      <div className={cx(endTextClassName)}>
        {endText}
      </div>
    );

  // 格式化
  const timeItems = getTimeItems(timeFormat, leftTime);
  return (
    <div className={cssPrefix}>
      {timeItems.map((item, index) => (
        <div className={cssPrefix+'-item'} key={index}>
          <div className={cx(numberClassName)}>{item.num}</div>
          <div className={cx(symbolClassName)}>{item.symbol}</div>
        </div>
      ))}
    </div>
  );
}

export default CountDown;


