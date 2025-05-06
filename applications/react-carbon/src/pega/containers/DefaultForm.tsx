import { PContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import { useContext } from 'react';
import { NavigationContext } from '../DxScreen';

export default function DxDefaultForm(props: { container: PContainer }) {
  const hideNavigation = useContext(NavigationContext);
  function getColumnClass(): string {
    if (hideNavigation) {
      return 'one-column';
    }
    switch (props.container.config.NumCols ? props.container.config.NumCols : '1') {
      case '1':
        return 'one-column';
      case '2':
        return 'two-column';
      case '3':
        return 'three-column';
      default:
        return 'one-column';
    }
  }

  if (!props.container.view && props.container.children.length === 0) {
    return null;
  }
  return <div style={{paddingTop: '15px'}}>
    {props.container.config.label && props.container.config.showLabel ? <h2>{props.container.config.label}</h2> : null}
    {props.container.config.instructions && props.container.config.instructions !== 'none' ? <div dangerouslySetInnerHTML={{__html:props.container.config.instructions}}></div> : null}
    {props.container.view && (
      <GeneratePContainer container={props.container.view} />
    )}
    {props.container.children.map((child, index) => (
      <GeneratePContainer key={child.id + index} container={child} />
    ))}
  </div>
}
