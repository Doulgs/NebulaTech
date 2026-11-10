import {
  ArrowDownLeft,
  ArrowLeftRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Bell,
  ChartNoAxesColumn,
  Check,
  ChevronLeft,
  CreditCard,
  Eye,
  EyeOff,
  House,
  LayoutGrid,
  LockKeyhole,
  LockKeyholeOpen,
  LogOut,
  Plus,
  Search,
  Orbit,
  Send,
  Tag,
  Users,
  X,
  type LucideIcon,
} from "lucide-react-native";
import Svg, { Path } from "react-native-svg";

import { palette } from "@/theme/colors";
const icons: Record<string, LucideIcon> = {
  home: House,
  history: ArrowLeftRight,
  cards: CreditCard,
  analytics: ChartNoAxesColumn,
  chat: Orbit,
  send: Send,
  plus: Plus,
  back: ChevronLeft,
  close: X,
  calendar: CalendarDays,
  bell: Bell,
  eye: Eye,
  hidden: EyeOff,
  members: Users,
  categories: LayoutGrid,
  search: Search,
  lock: LockKeyhole,
  unlock: LockKeyholeOpen,
  arrow: ArrowRight,
  in: ArrowDownLeft,
  out: ArrowUpRight,
  tr: ArrowLeftRight,
  check: Check,
  tag: Tag,
  logout: LogOut,
};
export function Icon({
  name,
  size = 22,
  tint = palette.text,
  path,
  filled = false,
}: {
  name?: string;
  size?: number;
  tint?: string;
  path?: string;
  filled?: boolean;
}) {
  if (path)
    return (
      <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={tint}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d={path} />
      </Svg>
    );
  const Component = icons[name || "tag"] || Tag;
  return (
    <Component
      size={size}
      color={tint}
      fill={filled ? tint : "none"}
      strokeWidth={1.7}
    />
  );
}
