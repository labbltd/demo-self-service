import {
  setOpenConfigurator,
  setOpenSidenav,
  useMaterialTailwindController,
} from "@/context";
import {
  Bars3Icon,
  Cog6ToothIcon
} from "@heroicons/react/24/solid";
import {
  IconButton,
  Navbar
} from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`transition-all ${fixedNavbar
        ? "sticky top-4 z-40 py-3 shadow-md shadow-light-blue-500/5"
        : "px-0 py-1"
        }`}
      style={{ background: 'black' }}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-row gap-6 md:flex-row md:items-end justify-between">
        <div>
          <Link to="/" className="xl:hidden">
            <img src="./img/PW Logo - White.svg" style={{ height: '40px' }} />
          </Link>
        </div>
        <div className="flex">
          <IconButton
            variant="text"
            color="light-blue"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
