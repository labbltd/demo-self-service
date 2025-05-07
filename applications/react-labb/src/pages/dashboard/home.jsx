import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Typography
} from "@material-tailwind/react";
import { clientsData } from "../../data/clients-data";

export function Home() {
  return (
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
              {client.name}
            </Typography>
            <Avatar src={client.framework} size="sm" />
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 p-4 m-auto">
            <img src={client.logo} className="h-40 w-60 object-scale-down" />
          </CardBody>
        </Card>
        </a>)}
      </div>
    </div >
  );
}

export default Home;
