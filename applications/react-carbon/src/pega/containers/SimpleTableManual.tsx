import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';
import { SimpleTableManual } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';

export default function DxSimpleTableManual(props: { container: SimpleTableManual }) {
  const { container } = props;
  return <>
    {container.config.label && <h3>{container.config.label}</h3>}
    {container.readOnlyMode &&
      <Table>
        <TableHead>
          <TableRow>
            {container.processedFields.map(col => <TableHeader key={col.config.name}>{col.config.name}</TableHeader>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {container.rowData.map((row, index) => <TableRow key={index}>
            {
              container.processedFields.map(col =>
                <TableCell key={col.config.name} dangerouslySetInnerHTML={{ __html: row[col.config.name] || '---' }}></TableCell>
              )
            }
          </TableRow>)}
        </TableBody>
      </Table>
    }
    {container.editableMode &&
      <table>
        <TableHead>
          <TableRow>
            {container.fieldDefs.map(col => <TableHeader key={col.name}>{col.label}</TableHeader>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {container.elementsData.map((row, rowIndex) =>
            <TableRow key={rowIndex}>
              {row.map((col, colIndex) => <TableCell key={colIndex}><GeneratePContainer container={col} /></TableCell>)}
            </TableRow>
          )}
        </TableBody>
      </table>
    }
  </>
}
