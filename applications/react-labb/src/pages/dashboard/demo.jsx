import { BugAntIcon } from "@heroicons/react/24/solid";
import { DemoBootstrap } from "@labb/demo-utilities";
import {
  Button
} from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import { clientsData } from "../../data/clients-data";
import './scenarios.css';

export function Demo() {
  const location = useLocation();
  const [_, __, scenarioId, clientId] = location.pathname.split('/');
  const scenario = DemoBootstrap.getScenarios().find(scenario => scenario.id === scenarioId);
  const client = clientsData.find(client => client.link.includes(clientId));
  if (DemoBootstrap.getAction() !== 'openCase') {
    DemoBootstrap.updateScenario(scenario);
  }

  return <>
    <div className="flex justify-between">
      <div>
        <Link to={`/scenarios`}>
          <Button variant='outlined' className="mr-6 mt-4">
            &lt; Select different scenario
          </Button>
        </Link>
        <Link to={`/scenarios/${scenarioId}`}>
          <Button variant='outlined' className="mr-6 mt-4">
            &lt; Select different company
          </Button>
        </Link>
      </div>
      <div>
        <a href={client.link} target="__blank"><Button variant='outlined' className="mr-6 mt-4">
          Open in new tab
        </Button></a>
      </div>
    </div>
    <div className="browser-container mt-4">
      <div className="browser-row">
        <div className="browser-column browser-left">
          <span className="browser-dot" style={{ background: '#ED594A' }}></span>
          <span className="browser-dot" style={{ background: '#FDD800' }}></span>
          <span className="browser-dot" style={{ background: '#5AC05A' }}></span>
          <BugAntIcon className="max-h-[21px] inline" onClick={() => window.frames[0].window.PCore.getDebugger().toggle()} />
        </div>
        <div className="browser-column browser-middle">
          <input className="browser-url" type="text" value={client.link} onChange={(e) => updateUrl(e.target.value)} />
        </div>
        <div className="browser-column browser-right">
          <div style={{ float: 'right' }}>
            <span className="browser-bar"></span>
            <span className="browser-bar"></span>
            <span className="browser-bar"></span>
          </div>
        </div>
      </div>
      <div className="browser-content">
        <iframe src={client.link} style={{ width: '100%', height: 'calc(100vh - 180px)' }} />
      </div>
    </div>
  </>
}
