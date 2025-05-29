import {
  ComputerDesktopIcon,
  FilmIcon,
  HomeIcon,
  UsersIcon
} from "@heroicons/react/24/solid";
import { Home } from "./pages/dashboard/home";
import OotbPegaEmbed from "./pages/dashboard/ootb-pega-embed";
import { Scenarios } from "./pages/dashboard/scenarios";
import './pega/ContainerMapping';
import { Videos } from "./pages/dashboard/videos";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "Scenarios",
        path: "/scenarios/*",
        element: <Scenarios />,
      },
      {
        icon: <FilmIcon {...icon} />,
        name: "Video Gallery",
        path: "/videos",
        element: <Videos />,
      },
      {
        icon: <ComputerDesktopIcon {...icon} />,
        name: "Constellation Embed",
        path: "/constellation",
        element: <OotbPegaEmbed caseTypeID='Labb-LabbCS-Work-Service-MakePayment' />,
      }
    ],
  },
];

export default routes;
