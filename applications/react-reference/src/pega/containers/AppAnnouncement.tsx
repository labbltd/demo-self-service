import { PContainer } from '@labb/dx-engine';

export default function AppAnnouncement(props: { container: PContainer }) {

  return <>
    <h2>{props.container.config.header}</h2>
    <p>{props.container.config.description}</p>
    <ul>
      {props.container.config.datasource.source.map((item: {name: string}, index: number) =>
        <li key={index}>{item.name}</li>
      )}
    </ul>
  </>
}
