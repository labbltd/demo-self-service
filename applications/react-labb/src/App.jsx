import { DemoBootstrap } from "@labb/demo-utilities";
import { BootstrapService } from "@labb/dx-engine";
import { useEffect, useState } from "react";
import { Footer } from "react-day-picker";
import { Navigate, Route, Routes } from "react-router-dom";
import { useMaterialTailwindController } from "./context";
import { scenariosData } from "./data/scenarios-data";
import { ClientList } from "./pages/dashboard/clients";
import { Demo } from "./pages/dashboard/demo";
import { Home } from "./pages/dashboard/home";
import OotbPegaEmbed from "./pages/dashboard/ootb-pega-embed";
import { ScenarioList } from "./pages/dashboard/scenarios";
import { Videos } from "./pages/dashboard/videos";
import routes from "./routes";
import Configurator from "./widgets/layout/configurator";
import DashboardNavbar from "./widgets/layout/dashboard-navbar";
import Sidenav from "./widgets/layout/sidenav";

export default function App() {
  const [controller] = useMaterialTailwindController();
  const { sidenavType, openConfigurator } = controller;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    DemoBootstrap.getToken()
      .then(t => BootstrapService.getCaseTypes(DemoBootstrap.getServerUrl(), t))
      .then(response => {
        const allScenarios = [
          ...scenariosData,
          ...response.caseTypes
            ?.filter(caseType => !scenariosData.find(scenario => scenario.caseTypeId === caseType.ID))
            .map(caseType => ({ type: caseType.name, caseTypeId: caseType.ID, id: caseType.ID }))
        ];
        DemoBootstrap.setScenarios(allScenarios);
        setLoading(false);
      });
  }, []);
  return <div className="min-h-screen bg-blue-gray-50/50">
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
        {loading ? <h1>Loading....</h1> : <Routes>
          <Route path="dashboard" element={<Home />} />
          <Route path="scenarios" element={<ScenarioList />} />
          <Route path="scenarios/:scenarioId" element={<ClientList />} />
          <Route path="scenarios/:scenarioId/:clientId" element={<Demo />} />
          <Route path="videos" element={<Videos />} />
          <Route path="constellation" element={<OotbPegaEmbed />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>}
      </div>
      <div className="text-blue-gray-600">
        <Footer />
      </div>
    </div>
  </div>
}
