import { useMaterialTailwindController } from "@/context";
import routes from "@/routes";
import {
  Configurator,
  DashboardNavbar,
  Footer,
  Sidenav,
} from "@/widgets/layout";
import { Route, Routes } from "react-router-dom";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType, openConfigurator } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "./img/PW Logo - White.svg" : "./img/PW Logo - Black.svg"
        }
      />
      <div className="transition-transform duration-300 xl:ml-[18rem] flex flex-col h-screen justify-between">
        <DashboardNavbar />
        {openConfigurator && <Configurator />}
        <div className="mb-auto">
          <Routes>
            {routes.map(
              ({ layout, pages }) =>
                layout === "dashboard" &&
                pages.map(({ path, element }) => (
                  <Route path={path} element={element} />
                ))
            )}
          </Routes>
        </div>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
