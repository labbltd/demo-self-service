import { useEffect, useState } from "react";

export default function MKBLicenseLookup(props: {
    label: string,
    value: string,
    onChange: (license: string) => void
}) {
    const [vehicle, setVehicle] = useState<{ brand: string, name: string, color: string } | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [halfValue, setHalfValue] = useState(props.value);

    useEffect(() => {
        setHalfValue(props.value?.toUpperCase());
    }, [props.value]);

    async function doSearch(license: string) {
        setLoading(true);
        const response = await fetch("https://www.mkb-brandstof.nl/api/aanmelden/license", {
            "headers": {
                "accept": "application/json",
                "content-type": "application/json",
            },
            "referrer": "https://www.mkb-brandstof.nl/aanmelden/formulier/passen",
            "body": JSON.stringify({ license }),
            "method": "POST"
        });
        setLoading(false);
        if (response.ok) {
            const car = await response.json();
            if (car.result === 'success' && car.vehicle.RDWStatus === 'FOUND') {
                const { Brand, CommercialName, MainColor } = car.vehicle.VehicleInformation;
                setVehicle({
                    brand: Brand,
                    name: CommercialName,
                    color: MainColor
                });
                props.onChange(license);
            } else {
                setError(true);
            }
        }
    }

    return <div className="f-item kenteken">
        <label htmlFor="Licence" className="f-item__label">{props.label}</label>
        <div className="f-items-wrap">
            <div className="licence-plate-field">
                <input name="Licence" id="Licence" type="text" className="field-valid"
                    value={halfValue}
                    onChange={(e) => {
                        setHalfValue(e.target.value?.toUpperCase());
                    }}
                    onBlur={(e) => {
                        doSearch(e.target.value);
                    }} />
                {vehicle && <span className="icon-check"></span>}
                <div className="field-loader" style={{ display: loading ? 'inline' : 'none' }}>
                    <span className="loading-icon"></span>
                </div>
            </div>
        </div>
        {vehicle && <span className="confirm-message">
            {vehicle.brand} {vehicle.name}<br />
            Kleur: {vehicle.color}
        </span>}
        <span className="notice-message" style={{ display: 'none' }}>Geef een kenteken op zodat je ook kunt straatparkeren. Het kenteken beheer je via jouw Dashboard. Hier kun je ook meerdere kentekens toevoegen.</span>
        {error && <span data-errorfield-id="Licence" className="error-message">We kunnen dit kenteken (nog) niet vinden bij de RDW. Controleer 'm alsjeblieft. Met het juiste kenteken kun je ook gebruikmaken van straatparkeren.</span>}
    </div>
}