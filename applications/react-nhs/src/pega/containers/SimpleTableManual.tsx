import { GeneratePContainer } from '@labb/react-adapter';
import { SimpleTableManual } from '@labb/dx-engine';

export default function DxSimpleTableManual(props: { container: SimpleTableManual }) {
  const { container } = props;

  return <>
    {container.config.label && <h3>{container.config.label}</h3>}
    {container.readOnlyMode &&
      <table className="nhsuk-table">
        <thead className="nhsuk-table__head">
          <tr className="nhsuk-table__row">
            {container.processedFields.map(col => <th className="nhsuk-table__cell" key={col.config.name}>{col.config.name}</th>)}
          </tr>
        </thead>
        <tbody className="nhsuk-table__body">
          {container.rowData.map(row => <tr key={row.id} className="nhsuk-table__row">
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
