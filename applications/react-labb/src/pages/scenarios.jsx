import { DemoBootstrap } from "@labb/demo-utilities";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography
} from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function ScenarioList() {
  const [allCaseTypes, setAllCaseTypes] = useState(false);
  const scenarios = DemoBootstrap.getScenarios();
  return <>
    <div className="text-center">
      <Typography variant="h2" color="blue-gray" className="my-2 ml-[1.5rem] text-center">
        Select your scenario
      </Typography>
    </div>
    <div className="mt-2">
      <div className="mb-4 grid gap-6 xl:grid-cols-1">
        {scenarios
          .filter(caseType => allCaseTypes || !!caseType.proofPoints)
          .map(scenario => <StructuredCard
            key={scenario.type}
            scenario={scenario} />)}
      </div>
    </div>
    <Button variant='outlined' className="mb-4 ml-5" onClick={() => setAllCaseTypes(!allCaseTypes)}>
      {allCaseTypes ? 'Show less case types' : 'Show all case types'}
    </Button>
  </>;
}

function StructuredCard(props) {
  const { scenario } = props;

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
            <Link to={`/scenarios/${scenario.id}`} onClick={() => DemoBootstrap.updateScenario(scenario)}>
              <Button variant='outlined' className="mt-12">
                Get started
              </Button>
            </Link>
          </div>
          {scenario.technologies && <ul className="list-disc list-inside">
            {scenario.technologies.map(tech => <li key={tech} dangerouslySetInnerHTML={{ __html: tech }}></li>)}
          </ul>}
        </div>
      </div>
    </CardBody>
  </Card>
}