import {
  setOpenConfigurator,
  useMaterialTailwindController
} from "@/context";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { DemoBootstrap } from "@labb/demo-utilities";
import {
  Checkbox,
  IconButton,
  Input
} from "@material-tailwind/react";
import { useState } from "react";
import FormControl from "../../pega/components/FormControl";

export function Configurator() {
  const [controller, dispatch] = useMaterialTailwindController();
  const [serverConfig, setServerConfig] = useState(DemoBootstrap.getConfig())
  const { openConfigurator } = controller;

  if (!openConfigurator) {
    return null;
  }

  return (
    <aside
      className={`overflow-auto fixed top-0 right-0 z-50 h-screen w-[42rem] bg-white px-2.5 shadow-lg transition-transform duration-300 ${openConfigurator ? "translate-x-0" : "translate-x-96"}`}
    >
      <div className="flex items-start justify-between px-6 pt-8 pb-6">
        <IconButton
          variant="text"
          color="light-blue"
          onClick={() => setOpenConfigurator(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>
      <div className="px-6">
        <div className="mt-3 flex flex-col gap-2">
          {Object.entries(serverConfig).map(([key, value]) => <FormControl>
            {typeof value === 'boolean' ? <Checkbox
              checked={value}
              onChange={v => {
                setServerConfig({ ...serverConfig, [key]: v.target.checked })
                DemoBootstrap.updateConfig(key, v.target.checked)
              }}
              label={key[0].toUpperCase() + key.replace(/([A-Z])/g, ' $1').slice(1)}
              size="sm"
            /> : <Input
              value={value}
              onChange={v => setServerConfig({ ...serverConfig, [key]: v.target.value })}
              onBlur={v => DemoBootstrap.updateConfig(key, v.target.value)}
              label={key[0].toUpperCase() + key.replace(/([A-Z])/g, ' $1').slice(1)}
              size="sm"
            />}
          </FormControl>)}
        </div>
      </div>
    </aside>
  );
}

Configurator.displayName = "/src/widgets/layout/configurator.jsx";

export default Configurator;
