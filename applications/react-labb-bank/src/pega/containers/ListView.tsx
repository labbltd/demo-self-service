import { ListView } from '@labb/dx-engine';
import { Radio, Table } from 'antd';

export default function DxListView(props: { container: ListView }) {
  const { container } = props;
  const hasSelection = container.singleSelectionMode || container.multiSelectionMode;
  const fields = hasSelection ?
    [{
      config: {
        label: 'Select',
        name: 'select'
      }
    }, ...container.fields] : container.fields;
  return <>
    {hasSelection ?
      <Radio.Group
        value={container.config.value}
        onChange={e => {
          container.selectRow(container.updatedRefList.find(row => row[container.rowID] === e.target.value));
        }}>
        <Table
          columns={fields.map(col => ({
            title: col.config.label,
            dataIndex: col.config.name,
            key: col.config.name,
            render: (text: string, record: any) => {
              return col.config.name === 'select' ?
                <Radio value={record[container.rowID]} /> :
                <span dangerouslySetInnerHTML={{ __html: text }}></span>;
            }
          }))}
          dataSource={container.updatedRefList}
          rowKey="id"
          pagination={false}
          style={{ marginTop: 12 }}
        />
      </Radio.Group>
      : <Table
        columns={fields.map(col => ({
          title: col.config.label,
          dataIndex: col.config.name,
          key: col.config.name,
          render: (text: string, record: any) => {
            return <span dangerouslySetInnerHTML={{ __html: text }}></span>;
          }
        }))}
        onRow={(record) => ({
          onClick: () => {
            if (props.container.config.rowClickAction === 'openAssignment') {
              const { pxRefObjectClass, pzInsKey } = record;
              const sTarget = props.container.pconnect.getContainerName();
              const options: any = { containerName: sTarget };
              props.container.pconnect.getActionsApi().openAssignment(pzInsKey, pxRefObjectClass, options);
            }
          }
        })}
        dataSource={container.updatedRefList}
        rowKey="id"
        pagination={false}
        style={{ marginTop: 12, cursor: props.container.config.rowClickAction === 'openAssignment' ? 'pointer' : 'default' }}
      />
    }
  </>
}
