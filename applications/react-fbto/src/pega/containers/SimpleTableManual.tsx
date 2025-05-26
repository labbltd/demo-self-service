import { SimpleTableManual } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import Button from '../../design-system/fbto-button';

export default function DxSimpleTableManual(props: { container: SimpleTableManual }) {
  const { container } = props;
  return <>
    {container.config.label && <h3>{container.config.label}</h3>}
    {container.readOnlyMode &&
      <table>
        <thead>
          <tr>
            {container.processedFields.map(col => <th key={col.config.name}>{col.config.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {container.rowData.map((row, index) => <tr key={index}>
            {
              container.processedFields.map(col =>
                <td key={col.config.name} dangerouslySetInnerHTML={{ __html: row[col.config.name] || '---' }}></td>
              )
            }
          </tr>)}
        </tbody>
      </table>
    }
    {container.editableMode && <>
      <table>
        <thead>
          <tr>
            {container.fieldDefs.map(col => <th key={col.name}>{col.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {container.elementsData?.map((row, rowIndex) =>
            <tr key={rowIndex}>
              {row.map((col, colIndex) => <td key={colIndex}><GeneratePContainer container={col} /></td>)}
            </tr>
          )}
          {!container.elementsData && <tr><td colSpan={container.fieldDefs.length}>No entries found</td></tr>}
        </tbody>
      </table>
      <Button variant="secondary" onClick={() => { }}>+ Add entry</Button>
    </>
    }
  </>
}
