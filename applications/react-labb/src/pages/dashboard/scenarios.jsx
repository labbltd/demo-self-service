import { BugAntIcon } from "@heroicons/react/24/solid";
import { DemoBootstrap } from "@labb/demo-utilities";
import { BootstrapService } from "@labb/dx-engine";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Typography
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { clientsData } from "../../data/clients-data";
import { scenariosData } from "../../data/scenarios-data";
import './scenarios.css';

export function Scenarios() {
  const location = useLocation();
  const [scenario, setScenario] = useState(null);
  const [caseTypes, setCaseTypes] = useState([]);
  const [useFilter, setUseFilter] = useState(true);
  const [url, setUrl] = useState(getUrl());
  const navigate = useNavigate();

  function getScenarioIndex() {
    const match = location.pathname.match(/dashboard\/scenarios\/(\d+)/);
    if (match) return +match[1];
  }

  function getScenario() {
    const index = getScenarioIndex();
    if (index != undefined) return scenariosData[index];
    return null;
  }

  function getUrl() {
    const match = location.pathname.match(/dashboard\/scenarios\/(\d+)\/(.+)$/);
    if (match) return `/demo-self-service/${match[2]}/`;
    return null;
  }

  useEffect(() => {
    DemoBootstrap.getToken()
      .then(t => BootstrapService.getCaseTypes(DemoBootstrap.getServerUrl(), t))
      .then(response => {
        setCaseTypes([...caseTypes, ...response.caseTypes]);
      });
    const s = getScenario();
    if (s) {
      updateScenario(s, true);
    }
  }, []);

  function updateScenario(scenario, skipNav = false) {
    if (DemoBootstrap.getAction() !== 'openCase' && !skipNav) {
      if (scenario?.caseTypeId) {
        DemoBootstrap.setAction('createCase');
        DemoBootstrap.setCaseTypeId(scenario.caseTypeId);
      }
      if (scenario?.pageId) {
        DemoBootstrap.setAction('openPage');
        DemoBootstrap.setCaseTypeId(scenario.pageId);
        DemoBootstrap.setPageClass(scenario.pageClass);
      }
    }
    if (!skipNav) {
      const scenarioIndex = scenariosData.findIndex(s => s === scenario)
      if (scenarioIndex > -1) {
        navigate(`./${scenarioIndex}`);
      } else {
        navigate(`./`);
      }
    }
    setScenario(scenario);
  }

  function updateUrl(url) {
    navigate(url ? `${getScenarioIndex()}/${url.split('/')[2]}` : `${getScenarioIndex()}`);
    setUrl(url);
  }

  return <>
    <div className="flex justify-between">
      <div>
        {!scenario && <Typography variant="h2" color="blue-gray" className="my-2 ml-[1.5rem]">
          Select your scenario
        </Typography>}
        {(scenario && !url) && <Typography variant="h2" color="blue-gray" className="my-2 ml-[1.5rem]">
          Select a company
        </Typography>}
      </div>
      <div>
        {scenario && <Button variant='outlined' className="mr-6 mt-4" onClick={() => { updateScenario(null); updateUrl(null) }}>
          &lt; Select different scenario
        </Button>}
        {url && <Button variant='outlined' className="mr-6 mt-4" onClick={() => { updateUrl(null) }}>
          &lt; Select different company
        </Button>}
        {url && <a href={url} target="__blank"><Button variant='outlined' className="mr-6 mt-4">
          Open in new tab
        </Button></a>}
        {(scenario && !url) && <Button variant='outlined' className="mt-4 mr-4" onClick={() => setUseFilter(!useFilter)}>
          Show {useFilter ? 'more' : 'less'} companies
        </Button>}
      </div>
    </div>
    {!scenario && <ScenarioList updateScenario={s => updateScenario(s)} caseTypes={caseTypes} />}
    {(scenario && !url) && <ClientList scenario={scenario} updateUrl={updateUrl} useFilter={useFilter} />}
    {url &&
      <div className="browser-container mt-4">
        <div className="browser-row">
          <div className="browser-column browser-left">
            <span className="browser-dot" style={{ background: '#ED594A' }}></span>
            <span className="browser-dot" style={{ background: '#FDD800' }}></span>
            <span className="browser-dot" style={{ background: '#5AC05A' }}></span>
            <BugAntIcon className="max-h-[21px] inline" onClick={() => window.frames[0].window.PCore.getDebugger().toggle()} />
          </div>
          <div className="browser-column browser-middle">
            <input className="browser-url" type="text" value={url} onChange={(e) => updateUrl(e.target.value)} />
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
          <iframe src={url} style={{ width: '100%', height: 'calc(100vh - 180px)' }} />
        </div>
      </div>
    }
  </>
}

function ScenarioList(props) {
  const [allCaseTypes, setAllCaseTypes] = useState(false);
  const [open, setOpen] = useState('');
  const scenarios = [
    ...scenariosData,
    ...(allCaseTypes ? props.caseTypes : [])
      ?.filter(caseType => !scenariosData.find(scenario => scenario.caseTypeId === caseType.ID))
      .map(caseType => ({ type: caseType.name, caseTypeId: caseType.ID }))
  ]
  return <>
    <div className="mt-2">
      <div className="mb-4 grid gap-6 xl:grid-cols-1">
        {scenarios.map(scenario => <StructuredCard
          key={scenario.type}
          scenario={scenario}
          open={open}
          setOpen={setOpen}
          updateScenario={props.updateScenario} />)}
      </div>
    </div>
    <Button variant='outlined' className="mb-4 ml-5" onClick={() => setAllCaseTypes(!allCaseTypes)}>
      {allCaseTypes ? 'Show less case types' : 'Show all case types'}
    </Button>
  </>;
}

function StructuredCard(props) {
  const { scenario, updateScenario } = props;
  return <Card style={{ margin: '0 1.5rem' }}>
    <CardHeader floated={false}
      shadow={false}
      color="transparent">
      <div>
        <Typography variant="h4" color="blue-gray" className="mb-1">
          {scenario.type}
        </Typography>
        {scenario.title && <Typography variant="small"
          className="flex items-center gap-1 font-normal text-blue-gray-600">
          {scenario.title}
        </Typography>}
      </div>
    </CardHeader>
    <CardBody>
      <div className="grid gap-y-10 gap-x-6 sm:grid-cols-1 md:grid-cols-2">
        <div>
          {scenario.description && <Typography variant="paragraph" color="blue-gray" className="mb-4">
            {scenario.description}
          </Typography>}
          {scenario.image && <img src={scenario.image} width="100%" />}
        </div>
        <div>
          {scenario.proofPoints && <ul className="list-disc list-inside">
            {scenario.proofPoints.map(point => <li key={point} dangerouslySetInnerHTML={{ __html: point }}></li>)}
          </ul>}
          <div className="text-center">
            <Button variant='outlined' className="mt-12" onClick={() => updateScenario(scenario)}>
              Get started
            </Button>
          </div>
          {scenario.technologies && <ul className="list-disc list-inside">
            {scenario.technologies.map(tech => <li key={tech} dangerouslySetInnerHTML={{ __html: tech }}></li>)}
          </ul>}
        </div>
      </div>
    </CardBody>
  </Card>
}

function ClientList(props) {
  const { useFilter } = props;
  return <>
    <div className="mt-4 mx-4">
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {clientsData
          .filter(client =>
            !useFilter || !props.scenario.clients || props.scenario.clients.includes(client.link.split('/')[2])
          )
          .map(client => <a onClick={() => props.updateUrl(client.link)} key={client.link}><Card className="overflow-hidden xl:col-span-1 border border-blue-gray-100 shadow-sm">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 flex items-center justify-between p-6"
            >
              <Typography variant="h6" color="blue-gray" className="mb-1">
                {client.region} {client.name} {!client.available && <Chip
                  variant="gradient"
                  color={client.available ? "green" : "orange"}
                  value={client.available ? "available" : "under construction"}
                  className="py-0.5 px-2 text-[11px] font-medium w-fit"
                />}
              </Typography>
              <Avatar src={client.framework} size="sm" />
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 p-4 m-auto">
              <img src={client.logo} className="h-40 w-60 object-scale-down" />
            </CardBody>
          </Card>
          </a>)}
      </div>
    </div>
  </>
}