import { TableHead } from '@carbon/react';
import { TableBody } from '@carbon/react';
import { TableHeader } from '@carbon/react';
import { RadioButton } from '@carbon/react';
import { Checkbox } from '@carbon/react';
import { InlineNotification } from '@carbon/react';
import { TableCell } from '@carbon/react';
import { TableRow } from '@carbon/react';
import { Table } from '@carbon/react';
import { ListView } from '@labb/dx-engine';

export default function DxListView(props: { container: ListView }) {
  const { container } = props;
  return <>
    {container.label && <h4>{container.label}</h4>}
    {container.config.validatemessage && <InlineNotification
      kind="error"
      onClose={() => { }}
      onCloseButtonClick={() => { }}
      title={container.config.validatemessage}
    />}
    <Table>
      <TableHead>
        <TableRow>
          {(container.singleSelectionMode || container.multiSelectionMode) && <TableHeader>Select</TableHeader>}
          {container.fields.map(col => <TableHeader key={col.config.label}>{col.config.label}</TableHeader>)}
        </TableRow>
      </TableHead>
      <TableBody>
        {container.updatedRefList.map(row =>
          <TableRow key={row.id}>
            {container.singleSelectionMode &&
              <TableCell>
                <RadioButton
                  labelText=""
                  value={row[container.rowID]}
                  checked={row[container.rowID] === container.config.value}
                  onChange={() => container.selectRow(row)}
                />
              </TableCell>
            }
            {container.multiSelectionMode &&
              <TableHeader>
                <Checkbox
                  id=""
                  labelText=""
                  value={row[container.rowID]}
                  checked={row[container.rowID] === container.config.value}
                  onChange={(e: any) => container.selectRow(row, e.target.checked)} />
              </TableHeader>
            }
            {container.fields.map(col => container.showButton(col.config.name, col) ?
              <TableCell key={col.config.name}>
                <a type="button" href="#"
                  onClick={(e) => { e.preventDefault(); container.listViewClick(col.config, row) }}
                  dangerouslySetInnerHTML={{ __html: row[col.config.name] || '---' }} />
              </TableCell> :
              <td key={col.config.name} dangerouslySetInnerHTML={{ __html: row[col.config.name] || '---' }}></td>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  </>
}
