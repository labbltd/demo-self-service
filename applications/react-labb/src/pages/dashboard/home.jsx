import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Typography
} from "@material-tailwind/react";
import { DemoBootstrap } from "@labb/demo-utilities";
import { clientsData } from "../../data/clients-data";
import { useState } from "react";
import { personasData, scenariosData } from "../../data/scenarios-data";

export function Home() {
  const [scenario, setScenario] = useState(null);
  const [persona, setPersona] = useState(null);

  function updateScenario(scenario) {
    DemoBootstrap.setCaseTypeId(scenario.caseTypeId);
    setScenario(scenario);
  }

  if (!persona) {
    return <>
      <Typography variant="h2" color="blue-gray" className="mb-1">
        Select your persona
      </Typography>
      <div className="mt-8">
        <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
          {personasData.map(persona => <Card onClick={() => setPersona(persona)} className="cursor-pointer overflow-hidden xl:col-span-1 border border-blue-gray-100 shadow-sm">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 flex items-center justify-between p-6"
            >
              <Typography variant="h6" color="blue-gray" className="mb-1">
                {persona.name}
              </Typography>
              <Avatar src={persona.image} size="sm" />
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 p-6">
              <ul className="list-disc list-inside">
                {persona.specs.map(spec => <li>{spec}</li>)}
              </ul>
            </CardBody>
          </Card>)}
        </div>
      </div>
    </>
  }
  if (!scenario) {
    return <>
      <Typography variant="h2" color="blue-gray" className="mb-1">
        Select your scenario
      </Typography>
      <div className="mt-8">
        <div className="mb-4 grid grid-cols-2 gap-6 xl:grid-cols-2">
          {scenariosData.map(scenario => <Card onClick={() => updateScenario(scenario)} className="cursor-pointer overflow-hidden xl:col-span-1 border border-blue-gray-100 shadow-sm">
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 flex items-center justify-between p-6"
            >
              <Typography variant="h6" color="blue-gray" className="mb-1">
                {scenario.industry}
              </Typography>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 p-6">
              <Typography variant="p" color="blue-gray" className="mb-4">
                {scenario.description}
              </Typography>
              <img src={scenario.image} />
            </CardBody>
          </Card>)}
        </div>
      </div>
    </>
  }
  return <>
    <Typography variant="h2" color="blue-gray" className="mb-1">
      Select your company
    </Typography>
    <div className="mt-8">
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {clientsData.map(client => <a href={client.link}><Card className="overflow-hidden xl:col-span-1 border border-blue-gray-100 shadow-sm">
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
