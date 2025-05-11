import { Home } from "@/pages/dashboard";
import {
  ChatBubbleBottomCenterIcon,
  HomeIcon,
  LockOpenIcon,
  RectangleStackIcon,
  ServerStackIcon
} from "@heroicons/react/24/solid";
import SignIn from "./pages/auth/sign-in";
import Chat from "./pages/dashboard/chat";
import LabbPegaEmbed from "./pages/dashboard/labb-pega-embed";
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
    ],
  },
  {
    layout: "auth",
    pages: [
      {
        icon: <LockOpenIcon {...icon} />,
        name: "Sign In",
        path: "/sign-in",
        element: <SignIn />,
      }
    ],
  },
  {
    title: "services",
    layout: "dashboard",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "Constellation Embed",
        path: "/constellation",
        element: <OotbPegaEmbed caseTypeID='Labb-LabbCS-Work-Service-MakePayment'/>,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "DX Accelerator Embed",
        path: "/dx-accelerator",
        element: <LabbPegaEmbed caseTypeID='Labb-LabbCS-Work-Service-UpdateContactProfile'/>,
      },
    ],
  },
];

export default routes;
