// import styles from './navigation.css';

import { useState } from "react";

export default function Navigation(props: { steps: { name: string, ID: string, visited_status: string }[] }) {
    const [opened, setOpened] = useState(false);
    return <>
        <div className="sc-bVHCgj ktGFTL">
            <div className="sc-fMMURN jaFjwx">
                <div className="sc-dSIIpw fkTkEK sidebarToggleButton" onClick={() => setOpened(!opened)}>
                    Step {props.steps.findIndex(s => s.visited_status === 'current') + 1} of {props.steps.length}
                    <div style={{
                        transform: `rotate(${opened ? 180 : 0}deg)`,
                        display: 'inline-block',
                        width: '20px',
                        height: '100%',
                        'marginLeft': '12px',
                        'marginRight': '4px'
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="sc-ktPPKK fcbSDp">
                            <path d="M7.406 8.578L12 13.172l4.594-4.594L18 9.984l-6 6-6-6z"></path>
                        </svg>
                    </div>
                </div>
                <div className={"sc-dlWCHZ " + (opened ? 'jAjdQE' : 'jAejzN')}>
                    <div className="sc-hHOBiw dMNenC sidebarMenu">
                        {props.steps.map((step, index) => <div key={index} className="sidebar-item">
                            {step.visited_status === 'success' && <div className="sc-ecPEgm cZqZsf">
                                <div className="sc-kzqdkY cntQaL"><svg width="24" height="24" className="sc-kWtpeL hYZXDv">
                                    <path
                                        d="M19.293 5.293L9 15.586l-4.293-4.293a.999.999 0 10-1.414 1.414l5 5a.999.999 0 001.414 0l11-11a.999.999 0 10-1.414-1.414z">
                                    </path>
                                </svg></div>
                                {step.name}
                            </div>}
                            {step.visited_status === 'current' && <div className="sidebar-item">
                                <div className="sc-ecPEgm bnlyjx">
                                    <div className="sc-kzqdkY cntQaL">
                                        <span className="sc-gdyeKB gSVJuS">{index + 1}</span>
                                    </div>
                                    {step.name}
                                </div>
                            </div>}
                            {step.visited_status === 'future' && <div className="sidebar-item">
                                <div className="sc-ecPEgm dPsfrA">
                                    <div className="sc-kzqdkY cntQaL"><span className="sc-gdyeKB fMsMfg">{index + 1}</span></div>
                                    {step.name}
                                </div>
                            </div>}
                        </div>)}
                    </div>
                </div>
            </div>
            {opened ? <div className="sc-bDpDS kLxrmJ"></div> :
                <div className="sc-bDpDS eeTfqG"></div>}
        </div>
        {/* <ul>
            {props.steps.map((step, i) => (
                <li key={`first_${i}`}>
                    {step.name} ({step.ID}: {step.visited_status})
                </li>
            ))}
        </ul> */}
    </>

}