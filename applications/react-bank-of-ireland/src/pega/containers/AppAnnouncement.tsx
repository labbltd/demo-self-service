import { PContainer } from "@labb/dx-engine";

export default function AppAnnouncement(props: { container: PContainer }) {
    const { header, image, description, details, whatsNewLink, whatsNewText } = props.container.config;
    return <>
        <h2>{header}</h2>
        <div>
            {description && <p>{description}</p>}
            {details && (
                <ul>
                    {(details as any[]).map((item, index) => {
                        // eslint-disable-next-line react/no-array-index-key
                        return <li key={index}>{item}</li>;
                    })}
                </ul>
            )}
            {whatsNewLink && (
                <a href={whatsNewLink} target='_blank'>
                    {whatsNewText}
                </a>
            )}
        </div>
        {image && <img src={image.replace(/ /g, '+')} style={{
            width: '300px',
            margin: '0 auto',
            borderRadius: '6px',
            padding: '10px',
            display: 'block'
        }} />}
    </>
}