import {
  setOpenConfigurator,
  useMaterialTailwindController
} from "@/context";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { DemoBootstrap } from "@labb/demo-utilities";
import {
  IconButton,
  Input,
  Typography
} from "@material-tailwind/react";
import FormControl from "../../pega/components/FormControl";
import { useState } from "react";

export function Configurator() {
  const [controller, dispatch] = useMaterialTailwindController();
  const [serverConfig, setServerConfig] = useState({
    serverUrl: DemoBootstrap.getServerUrl(),
    accessTokenUrl: DemoBootstrap.getAccessTokenUrl(),
    caseTypeId: DemoBootstrap.getCaseTypeId()
  })
  const { openConfigurator } = controller;

  if (!openConfigurator) {
    return null;
  }

  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-96 bg-white px-2.5 shadow-lg transition-transform duration-300 ${openConfigurator ? "translate-x-0" : "translate-x-96"
        }`}
    >
      <div className="flex items-start justify-between px-6 pt-8 pb-6">
        <div>
          <Typography variant="h5" color="light-blue">
            Dashboard Configurator
          </Typography>
        </div>
        <IconButton
          variant="text"
          color="light-blue"
          onClick={() => setOpenConfigurator(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>
      <div className="py-4 px-6">
        <div className="mb-12">
          <Typography variant="h6" color="light-blue">
            Infinity configuration
          </Typography>
          <div className="mt-3 flex flex-col gap-2">
            <FormControl>
              <Input
                value={serverConfig.serverUrl}
                onChange={v => setServerConfig({ ...serverConfig, serverUrl: v.target.value })}
                onBlur={v => DemoBootstrap.setServerUrl(v.target.value)}
                label="Server URL"
                size="lg"
              />
            </FormControl><FormControl>
              <Input
                value={serverConfig.accessTokenUrl}
                onChange={v => setServerConfig({ ...serverConfig, accessTokenUrl: v.target.value })}
                onBlur={v => DemoBootstrap.setAccessTokenUrl(v.target.value)}
                label="Access Token URL"
                size="lg"
              />
            </FormControl><FormControl>
              <Input
                value={serverConfig.caseTypeId}
                onChange={v => setServerConfig({ ...serverConfig, caseTypeId: v.target.value })}
                onBlur={v => DemoBootstrap.setCaseTypeId(v.target.value)}
                label="Case Type ID"
                size="lg"
              />
            </FormControl>
          </div>
        </div>
      </div>
    </aside>
  );
}

Configurator.displayName = "/src/widgets/layout/configurator.jsx";

export default Configurator;
