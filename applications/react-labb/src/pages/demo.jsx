import { ArrowPathIcon, BugAntIcon } from "@heroicons/react/24/solid";
import { DemoBootstrap } from "@labb/demo-utilities";
import {
  Button
} from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clientsData } from "../data/clients-data";
import { scenariosData } from "../data/scenarios-data";
import './scenarios.css';

export function Demo() {
  const location = useLocation();
  const navigate = useNavigate();
  const [_, __, scenarioId, clientId] = location.pathname.split('/');
  const scenario = DemoBootstrap.getScenarios().find(scenario => scenario.id === scenarioId);
  const client = clientsData.find(client => client.link.includes(clientId));
  if (DemoBootstrap.getAction() !== 'openCase') {
    DemoBootstrap.updateScenario(scenario);
  }

  function goTo(scenarioId, link) {
    const newUrl = `/scenarios/${scenarioId}/${link.split('/')[2]}`
    console.log(scenarioId, link, newUrl);
    if (scenarioId !== scenario.id) {
      DemoBootstrap.updateScenario(scenariosData.find(s => s.id === scenarioId));
    }
    navigate(newUrl);
    if (link === client.link) {
      // a new client link will already trigger an iframe refresh
      // but if the client stays the same and only scenario is changed, then we force a refresh
      // to let the client in the iframe load the new scenario
      reloadFrame();
    }
  }

  function toggleXRayFrame() {
    window.frames[0].window.PCore.getDebugger().toggle()
  }
  function reloadFrame() {
    window.frames[0].window.location.reload()
  }

  return <>
    <div className="flex justify-between">
      <div>
        <Link to={`/scenarios`}>
          <Button variant='outlined' className="mr-6 ml-4 mt-4">
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
        <a href={client.link} target="__blank"><Button variant='outlined' className="mr-4 mt-4">
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
          <BugAntIcon className="max-h-[21px] inline" onClick={() => toggleXRayFrame()} />
          <ArrowPathIcon className="max-h-[21px] inline" onClick={() => reloadFrame()} />
        </div>
        <div className="browser-column browser-middle">
          <select className="browser-url" value={scenario.id} onChange={(e) => goTo(e.target.value, client.link)}>
            {scenariosData
              .sort((a, b) => a.id.localeCompare(b.id))
              .map(c => <option key={c.id}>{c.id}</option>)}
          </select>
        </div>
        <div className="browser-column browser-middle">
          <select className="browser-url" value={client.link} onChange={(e) => goTo(scenario.id, e.target.value)}>
            {clientsData
              .sort((a, b) => a.link.localeCompare(b.link))
              .map(c => <option key={c.link} value={c.link}>{c.link.split('/')[2]}</option>)}
          </select>
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
