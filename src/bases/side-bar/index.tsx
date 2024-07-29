import InnerSidebar from './Sidebar';
import SidebarItem from './SidebarItem';
export type { SidebarProps } from './Sidebar';
export type { SidebarItemProps } from './SidebarItem';

type InnerSidebarType = typeof InnerSidebar
interface SidebarInterface extends InnerSidebarType {
  Item: typeof SidebarItem;
}

const Sidebar = InnerSidebar as SidebarInterface;
Sidebar.Item = SidebarItem;

export default Sidebar
