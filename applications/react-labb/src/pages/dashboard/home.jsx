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
import { clientsData } from "../../data/clients-data";
import { scenariosData } from "../../data/scenarios-data";

export function Home() {
  const [scenario, setScenario] = useState(null);
  const [caseTypes, setCaseTypes] = useState([]);

  useEffect(() => {
    DemoBootstrap.getToken()
      .then(t => BootstrapService.getCaseTypes(DemoBootstrap.getServerUrl(), t))
      .then(response => {
        setCaseTypes([...caseTypes, ...response.caseTypes]);
      });
  }, []);

  function updateScenario(scenario) {
    if (scenario.caseTypeId) {
      DemoBootstrap.setAction('createCase');
      DemoBootstrap.setCaseTypeId(scenario.caseTypeId);
    }
    if (scenario.pageId) {
      DemoBootstrap.setAction('openPage');
      DemoBootstrap.setCaseTypeId(scenario.pageId);
      DemoBootstrap.setPageClass(scenario.pageClass);
    }
    setScenario(scenario);
  }

  if (!scenario) {
    return <Scenarios updateScenario={s => updateScenario(s)} caseTypes={caseTypes} />
  }
  return <Clients scenario={scenario} setScenario={setScenario} />
}

function Scenarios(props) {
  const [allCaseTypes, setAllCaseTypes] = useState(false);
  const [open, setOpen] = useState('');
  const scenarios = [
    ...scenariosData,
    ...(allCaseTypes ? props.caseTypes : [])
      ?.filter(caseType => !scenariosData.find(scenario => scenario.caseTypeId === caseType.ID))
      .map(caseType => ({ type: caseType.name, caseTypeId: caseType.ID }))
  ]
  return <>
    <Typography variant="h2" color="blue-gray" className="mb-1">
      Select your scenario
    </Typography>
    <div className="mt-8">
      <div className="mb-4 grid gap-6 xl:grid-cols-1">
        {scenarios.map(scenario => <StructuredCard
          key={scenario.type}
          scenario={scenario}
          open={open}
          setOpen={setOpen}
          updateScenario={props.updateScenario} />)}
      </div>
    </div>
    <Button variant='outlined' className="mb-2" onClick={() => setAllCaseTypes(!allCaseTypes)}>
      {allCaseTypes ? 'Show less case types' : 'Show all case types'}
    </Button>
  </>;
}

function StructuredCard(props) {
  const { scenario, updateScenario } = props;
  return <Card>
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
        </div>
      </div>
    </CardBody>
  </Card>
}

function Clients(props) {
  const [useFilter, setUseFilter] = useState(true);
  return <>
    <Typography variant="h2" color="blue-gray" className="mb-1">
      Select your company
    </Typography>
    <Button variant='outlined' className="mr-6 mt-4" onClick={() => props.setScenario(null)}>
      &lt; Select different scenario
    </Button>
    {props.scenario.clients && <Button variant='outlined' className="mt-4" onClick={() => setUseFilter(!useFilter)}>
      Show {useFilter ? 'all' : 'less'} clients
    </Button>}
    <div className="mt-8">
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {clientsData
          .filter(client =>
            !useFilter || !props.scenario.clients || props.scenario.clients.includes(client.link.split('/')[2])
          )
          .map(client => <a href={client.link} key={client.link}><Card className="overflow-hidden xl:col-span-1 border border-blue-gray-100 shadow-sm">
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

export default Home;