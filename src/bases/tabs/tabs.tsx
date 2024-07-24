import { isValidElement, ReactElement, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import cx from 'classnames';
import { TabProps } from "./tab";
import Tab from "./tab";
import { traverReactNode } from "../utils";
import './styles/tabs.scss';

export interface TabsProps {
  activeKey: string;
  children?: ReactNode;

  // tab line
  showTabLine?: boolean;
  type?: 'line' | 'card';

  /** 点击 tab 切换后的回调 */
  onChange?: (key: string) => void;

  tabActiveClassName?: string;
  tabListClassName?: string;
  tabContentClassName?: string;
}

const CSSPrefix = 'jiiiong-tabs';

export default function Tabs({
  activeKey,
  children,
  showTabLine = false,
  type = 'line',
  onChange,
  tabActiveClassName,
  tabListClassName,
  tabContentClassName,
}: TabsProps) {
  const [active, setActive] = useState(activeKey);
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabLineRef = useRef<HTMLDivElement>(null);
  const isMountRef = useRef<boolean>(false);

  const keyToIndex: Record<string, number> = useMemo(()=>({}),[]);
  const panels: ReactElement<TabProps, typeof Tab>[] = [];
  traverReactNode(children, (child) => {
    if (!isValidElement(child)) return;
    if (!child.key) return;
    const length = panels.push(child as ReactElement<TabProps, typeof Tab>);
    keyToIndex[child.key] = length - 1;
  })

  const updateLineStyle = useCallback(()=>{
    if (!showTabLine || !tabListRef.current || !tabLineRef.current) return;
    const activeIndex = keyToIndex[active];
    const activeTabWrapper = tabListRef.current.children.item(activeIndex+1) as HTMLDivElement;
    const activeTab = activeTabWrapper.children.item(0) as HTMLDivElement;
    const lineStyle = {
      width: `${activeTab.offsetWidth}px`,
      transform: `translate3d(${activeTab.offsetLeft}px,0,0)`,
      transitionDuration: isMountRef.current ? '300ms' : '',
    }
    Object.assign(tabLineRef.current.style, lineStyle);

  },[active, keyToIndex, showTabLine])

  useEffect(
    ()=>{
      return () => {
        isMountRef.current = false;
      };
    }, []
  )

  useEffect(()=>{
    window.addEventListener('resize', updateLineStyle);
    return (() => {
      window.removeEventListener('resize', updateLineStyle);
    });
  }, [updateLineStyle])

  useEffect(()=>{
    updateLineStyle()
    if (!isMountRef.current) {
      isMountRef.current = true;
    }
  },[updateLineStyle]);

  return (
    <div className={CSSPrefix}>
      <div
        className={cx(
          CSSPrefix + "-tab-list",
          tabListClassName,
          `${CSSPrefix}-tab-list-${type}`,
        )}
        ref={tabListRef}
      >
        {showTabLine && (
          <div className={CSSPrefix + "-tab-line"}
          ref={tabLineRef}
          ></div>
        )}

        {panels.map((item) => (
          <div
            key={item.key}
            className={cx(CSSPrefix + "-tab", {
              [CSSPrefix + "-tab-active"]: item.key === active,
              [tabActiveClassName!]: tabActiveClassName && item.key === active,
            })}
            onClick={() => {
              setActive(item.key!);
              onChange?.(item.key!);
            }}
          >
            <div className={CSSPrefix + "-tab-title"}>{item.props.title}</div>
          </div>
        ))}
      </div>

      <div className={cx(CSSPrefix + "-content", tabContentClassName)}>
        {panels[keyToIndex[active]]}
      </div>
    </div>
  );
}
