import { Home, Notifications, Profile, Tables } from "@/pages/dashboard";
import {
  ChatBubbleBottomCenterIcon,
  HomeIcon,
  InformationCircleIcon,
  RectangleStackIcon,
  ServerStackIcon,
  TableCellsIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
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
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
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
    title: "services",
    layout: "dashboard",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "Make Payment",
        path: "/make-payment",
        element: <OotbPegaEmbed caseTypeID='Labb-LabbCS-Work-Service-MakePayment'/>,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "Update Contact Profile",
        path: "/update-contact-profile",
        element: <LabbPegaEmbed caseTypeID='Labb-LabbCS-Work-Service-UpdateContactProfile'/>,
      },
    ],
  },
];

export default routes;
