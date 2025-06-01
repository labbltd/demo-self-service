import { SimpleTableManual } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import { useState } from 'react';

export default function DxSimpleTableManual(props: { container: SimpleTableManual }) {
  const { container } = props;
  const asTable = (container.config as any).viewName !== 'CarePlanOptions_InEligibleCarePlans';

  return <>
    {container.config.label && <h3>{container.config.label}</h3>}
    {asTable && <TableSimpleTableManual container={container} />}
    {!asTable && <TabsSimpleTableManual container={container} />}
  </>
}

function TabsSimpleTableManual(props: { container: SimpleTableManual }) {
  const { container } = props;
  const [activeTab, setActiveTab] = useState<any[]>(container.rowData[0]);
  return <div className="nhsuk-tabs" data-module="nhsuk-tabs">
    <ul className="nhsuk-tabs__list">
      {container.rowData.map((row, index) => <li key={index} className={"nhsuk-tabs__list-item" + (activeTab === row ? ' nhsuk-tabs__list-item--selected' : '')}>
        <a className="nhsuk-tabs__tab" onClick={() => setActiveTab(row)}>
          {row[(container as any).config.selectionKey?.replace(/^\./, '')]}
        </a>
      </li>)
      }
    </ul >
    <div className="nhsuk-tabs__panel">
      <dl className="nhsuk-summary-list">
        {container.processedFields.map((col, index) => <div key={index} className="nhsuk-summary-list__row">
          <dt className="nhsuk-summary-list__key">
            {col.config.label}
          </dt>
          <dd className="nhsuk-summary-list__value" dangerouslySetInnerHTML={{ __html: activeTab[col.config.name] }}>
          </dd>
        </div>)}
      </dl>
    </div>
  </div>
}

function TableSimpleTableManual(props: { container: SimpleTableManual }) {
  const { container } = props;
  return <>
    {container.readOnlyMode &&
      <table className="nhsuk-table">
        <thead className="nhsuk-table__head">
          <tr className="nhsuk-table__row">
            {container.processedFields.map(col => <th className="nhsuk-table__cell" key={col.config.label}>{col.config.label}</th>)}
          </tr>
        </thead>
        <tbody className="nhsuk-table__body">
          {container.rowData.map((row, index) => <tr key={index} className="nhsuk-table__row">
            {
              container.processedFields.map(col =>
                <td key={col.config.name} className="nhsuk-table__cell" dangerouslySetInnerHTML={{ __html: row[col.config.name] || '---' }}></td>
              )
            }
          </tr>)}
        </tbody>
      </table>
    }
    {container.editableMode &&
      <table className="nhsuk-table">
        <thead className="nhsuk-table__head">
          <tr className="nhsuk-table__row">
            {container.fieldDefs.map(col => <th className="nhsuk-table__cell" key={col.name}>{col.label}</th>)}
          </tr>
        </thead>
        <tbody className="nhsuk-table__body">
          {(container.elementsData || []).map((row, rowIndex) =>
            <tr key={rowIndex} className="nhsuk-table__row">
              {row.map((col, colIndex) => <td className="nhsuk-table__cell" key={colIndex}><GeneratePContainer container={col} /></td>)}
            </tr>
          )}
        </tbody>
      </table>
    }
  </>
}