import InternalTabs from './tabs';
import Tab from './tab';

export type {TabsProps} from './tabs';
export type {TabProps} from './tab';

type InternalTabsType = typeof InternalTabs;
interface TabsInterface extends InternalTabsType {
  Tab: typeof Tab;
}

const Tabs = InternalTabs as TabsInterface;
Tabs.Tab = Tab

export default Tabs;
