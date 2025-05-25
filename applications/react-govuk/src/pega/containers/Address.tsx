import { PContainer } from '@labb/dx-engine';

export default function DxAddress(props: { container: PContainer }) {
  function update() {
    props.container.updateFieldValue('GBR');
    props.container.triggerFieldChange('GBR');
  }

  return (<>
    <pre>Address component</pre>
    <button onClick={e => update()}>Update address</button>
  </>);
}  
