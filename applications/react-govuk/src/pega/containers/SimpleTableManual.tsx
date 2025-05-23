import { GeneratePContainer } from '@labb/react-adapter';
import { SimpleTableManual } from '@labb/dx-engine';

export default function DxSimpleTableManual(props: { container: SimpleTableManual }) {
  const { container } = props;

  return <>
    {container.config.label && <h3>{container.config.label}</h3>}
    {container.readOnlyMode &&
      <table className="govuk-table">
        <thead className="govuk-table__head">
          <tr className="govuk-table__row">
            {container.processedFields.map(col => <th className="govuk-table__cell" key={col.config.name}>{col.config.name}</th>)}
          </tr>
        </thead>
        <tbody className="govuk-table__body">
          {container.rowData.map(row => <tr key={row.id} className="govuk-table__row">
            {
              container.processedFields.map(col =>
                <td key={col.config.name} className="govuk-table__cell" dangerouslySetInnerHTML={{ __html: row[col.config.name] || '---' }}></td>
              )
            }
          </tr>)}
        </tbody>
      </table>
    }
    {container.editableMode &&
      <table className="govuk-table">
        <thead className="govuk-table__head">
          <tr className="govuk-table__row">
            {container.fieldDefs.map(col => <th className="govuk-table__cell" key={col.name}>{col.label}</th>)}
          </tr>
        </thead>
        <tbody className="govuk-table__body">
          {container.elementsData.map((row, rowIndex) =>
            <tr key={rowIndex} className="govuk-table__row">
              {row.map((col, colIndex) => <td className="govuk-table__cell" key={colIndex}><GeneratePContainer container={col} /></td>)}
            </tr>
          )}
        </tbody>
      </table>
    }
  </>
}
