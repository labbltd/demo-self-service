import { ListView } from '@labb/dx-engine';
import { Radio, Table } from 'antd';

export default function DxListView(props: { container: ListView }) {
  const { container } = props;
  const fields = container.singleSelectionMode || container.multiSelectionMode ?
    [{
      config: {
        label: 'Select',
        name: 'select'
      }
    }, ...container.fields] : container.fields;
  return <>
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
  </>
}
