import { setOpenSidenav, useMaterialTailwindController } from "@/context";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Typography
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import { Link, NavLink, useLocation } from "react-router-dom";

export function Sidenav({ routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const location = useLocation();

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${openSidenav ? "translate-x-0" : "-translate-x-80"
        } fixed inset-0 z-50 h-[100vh] w-72 transition-transform duration-300 xl:translate-x-0`}
      style={location.pathname === '/dashboard' ? { backgroundColor: 'black' } : {
        backgroundImage: 'url(./img/pw-labb-lion-head.png)',
        backgroundSize: '500px',
        backgroundPositionX: '-200px',
        backgroundPositionY: 'bottom',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'black',
      }}
    >
      <div
        className={`relative`}
      >
        <Link to="/" className="py-6 px-8 flex justify-center">
          <img src="./img/PW Logo - White.svg" />
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4" style={{ background: 'white' }}>
        <ul className="mb-4 flex flex-col gap-1">
          {routes.map(({ icon, name, path }) => (
            <li key={name}>
              <NavLink to={path}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "gradient" : "text"}
                    color={
                      isActive
                        ? sidenavColor
                        : sidenavType === "dark"
                          ? "white"
                          : "blue-gray"
                    }
                    className="flex items-center gap-4 px-4 capitalize rounded-none"
                    fullWidth
                  >
                    {icon}
                    <Typography
                      color="inherit"
                      className={`font-medium capitalize ${openSidenav ? '' : 'xs:hidden'}`}
                    >
                      {name}
                    </Typography>
                  </Button>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "./img/logo-ct.png",
  brandName: "Material Tailwind React",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
