import { PContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';

export default function CaseView(props: { container: PContainer }) {
  return <Layout>
    <Content style={{width: '80%'}}>{props.container.children.filter((_, idx) => idx > 0).map(child => <GeneratePContainer key={child.id} container={child} />)}</Content>
    <Sider style={{marginLeft: '10px', backgroundColor: 'black', position: 'absolute', right: '-20px'}} breakpoint='xxl' width='100%' collapsedWidth={0}>
      <GeneratePContainer container={props.container.children[0]} />
    </Sider>
  </Layout>
}
