import { PContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';

export default function DefaultForm(props: { container: PContainer }) {
  const { container } = props;
  function getClassName() {
    let style = {};
    switch (container.config.NumCols ?? '1') {
      case '1':
        style = {};
        break;
      case '2':
        style = {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '8px'
        };
        break;
      case '3':
        style = {
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px'
        };
        break;
      default:
        style = {};
        break;
    }
    // if (container.children.length <= 2) {
    //   divClass = 'one-column';
    // }
    return style
  }

  return <div style={getClassName()}>
    {props.container.children.map((child) => (
      <GeneratePContainer container={child} key={child.id} />
    ))}
  </div>
}
