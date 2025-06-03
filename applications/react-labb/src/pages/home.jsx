import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate();

    return <div className="flex flex-col h-screen">
        <div className="p-10 flex" style={{ margin: 'auto 0', textAlign: 'center' }}>
            <div className="w-1/2">
                <Typography variant="h5" color="light-blue">Experience. Delivered.</Typography>
                <Typography variant="h1" className="mb-4">Tame the chaos.<br />Lead the change.</Typography>
                <Typography variant="paragraph" className="pt-10 mb-4">
                    Welcome to Labb's Self-Service Experience Hub.
                </Typography>

                <Typography variant="paragraph" className="mb-10">
                    Discover the future of customer empowerment through intuitive self-service. This application is designed to immerse you in real-life scenarios, showcasing how our solutions simplify everyday interactions — from onboarding and troubleshooting to account management and more.
                </Typography>

                <Typography variant="paragraph" className="mb-10">
                    Explore interactive demos that put you in the driver's seat. Whether you're a customer, employee, or partner, you'll experience first-hand how seamless, smart, and scalable self-service can be.
                </Typography>

                <Typography variant="paragraph" className="mb-10">
                    Get started now and see how we bring self-service to life.
                </Typography>
                <Button variant='outlined' className="mr-6 mb-4" onClick={() => navigate("/scenarios")}>
                    Explore scenarios
                </Button>
                <Button variant='outlined' className="mr-6 mb-4" onClick={() => navigate("/media")}>
                    Explore demo videos
                </Button>
            </div>
            <div className="w-1/2">
                <img src="img/pw-labb-lion-head.svg" style={{ height: '80%' }} className="absolute bottom-[10%]" />
            </div>
        </div>
        <img src="img/labb-banner.png" className="z-10" />
    </div>
}