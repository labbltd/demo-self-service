import { Home } from "@/pages/dashboard";
import {
  ChatBubbleBottomCenterIcon,
  ComputerDesktopIcon,
  HomeIcon
} from "@heroicons/react/24/solid";
import Chat from "./pages/dashboard/chat";
import OotbPegaEmbed from "./pages/dashboard/ootb-pega-embed";
import './pega/ContainerMapping';

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <ChatBubbleBottomCenterIcon {...icon} />,
        name: "chat",
        path: "/chat",
        element: <Chat />,
      },
      {
        icon: <ComputerDesktopIcon {...icon} />,
        name: "Constellation Embed",
        path: "/constellation",
        element: <OotbPegaEmbed caseTypeID='Labb-LabbCS-Work-Service-MakePayment'/>,
      }
    ],
  },
];

export default routes;
