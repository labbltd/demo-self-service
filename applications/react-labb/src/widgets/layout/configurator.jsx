import {
  setOpenConfigurator,
  useMaterialTailwindController
} from "@/context";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { DemoBootstrap } from "@labb/demo-utilities";
import {
  Alert,
  Button,
  Checkbox,
  IconButton,
  Input
} from "@material-tailwind/react";
import { useState } from "react";
import FormControl from "../../pega/components/FormControl";

export function Configurator() {
  const [controller, dispatch] = useMaterialTailwindController();
  const [serverConfig, setServerConfig] = useState(DemoBootstrap.getConfig())
  const [showAlert, setShowAlert] = useState(false);
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
          <Button onClick={() => {
            DemoBootstrap.reset();
          }}>Reset to default</Button>
          <Button onClick={async () => {
            const bookmark = DemoBootstrap.getBookmark();
            console.log(bookmark);
            await window.navigator.clipboard?.writeText(bookmark);
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 2000)
          }}>Bookmark</Button>
          {showAlert && <Alert
            icon={<svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>}
            className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]"
          >
            Bookmark has been copied to clipboard
          </Alert>}
          {Object.entries(serverConfig).map(([key, value]) => <FormControl key={key}>
            {typeof value === 'boolean' ? <Checkbox
              checked={value}
              onChange={v => {
                setServerConfig({ ...serverConfig, [key]: v.target.checked })
                DemoBootstrap.updateConfig(key, v.target.checked)
              }}
              label={key[0].toUpperCase() + key.replace(/([A-Z])/g, ' $1').slice(1)}
              size="md"
            /> : <Input
              value={value}
              onChange={v => setServerConfig({ ...serverConfig, [key]: v.target.value })}
              onBlur={v => DemoBootstrap.updateConfig(key, v.target.value)}
              label={key[0].toUpperCase() + key.replace(/([A-Z])/g, ' $1').slice(1)}
              size="md"
            />}
          </FormControl>)}
        </div>
      </div>
    </aside>
  );
}

Configurator.displayName = "/src/widgets/layout/configurator.jsx";

export default Configurator;
