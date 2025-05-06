import { PContainer } from '@labb/dx-engine';

export default function Warningtext(props: {
  container: PContainer;
}): JSX.Element {
  return (
    <div>
      <div>{props.container.config.label}</div>
      <div>{props.container.config.value}</div>
    </div>
  );
}
