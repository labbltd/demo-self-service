import { DemoBootstrap } from "@labb/demo-utilities";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Typography
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { clientsData } from "../../data/clients-data";
import './scenarios.css';

export function ClientList() {
  const [useFilter, setUseFilter] = useState(true);
  const location = useLocation();
  const scenarioId = location.pathname.split('/')[2];
  const scenario = DemoBootstrap.getScenarios().find(scenario => scenario.id === scenarioId);

  function url(client) {
    return `/scenarios/${scenarioId}/${client.link.split('/')[2]}`
  }

  return <>
    <div className="flex justify-between">
      <Link to={`/scenarios`}>
        <Button variant='outlined' className="mt-4 mx-4">
          &lt; Select different scenario
        </Button>
      </Link>
      <Typography variant="h2" color="blue-gray" className="my-2 ml-[1.5rem]">
        Select a company
      </Typography>
      {<Button variant='outlined' className="mt-4 mr-4" onClick={() => setUseFilter(!useFilter)}>
        Show {useFilter ? 'more' : 'less'} companies
      </Button>}
    </div>
    <div className="mt-4 mx-4">
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {clientsData
          .filter(client =>
            !useFilter || !scenario.clients || scenario.clients.includes(client.link.split('/')[2])
          )
          .map(client => <Card key={client.link} className="overflow-hidden xl:col-span-1 border border-blue-gray-100 shadow-sm h-100">
            <Link to={url(client)} className={url(client)}>
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
              <CardBody className="overflow-x-scroll px-0 pt-0 p-4 flex justify-center">
                <img src={client.logo} className="h-40 object-scale-down" />
              </CardBody>
            </Link>
          </Card>)}
      </div>
    </div>
  </>
}