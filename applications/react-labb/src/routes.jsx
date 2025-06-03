import {
  ComputerDesktopIcon,
  FilmIcon,
  HomeIcon,
  UsersIcon
} from "@heroicons/react/24/solid";
import './pega/ContainerMapping';

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    icon: <HomeIcon {...icon} />,
    name: "Dashboard",
    path: "/home"
  },
  {
    icon: <UsersIcon {...icon} />,
    name: "Scenarios",
    path: "/scenarios"
  },
  {
    icon: <FilmIcon {...icon} />,
    name: "Media Gallery",
    path: "/media"
  },
  {
    icon: <ComputerDesktopIcon {...icon} />,
    name: "Constellation Embed",
    path: "/constellation"
  }
];

export default routes;
