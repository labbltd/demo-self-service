import { ListView } from '@labb/dx-engine';

export default function DxListView(props: { container: ListView }) {
  const { container } = props;
  return <>
    <div className="input-group">
      <div className="input-text">
        <label className="input-text__label">
          {container.config.label}
        </label>
        {container.config.validatemessage && <div className="input-message input-message--error">
          {container.config.validatemessage}
        </div>}
      </div>
    </div>
    <table>
      <thead>
        <tr>
          {(container.singleSelectionMode || container.multiSelectionMode) && <th>Select</th>}
          {container.fields.map(col => <th key={col.config.label}>{col.config.label}</th>)}
        </tr>
      </thead>
      <tbody>
        {container.updatedRefList.map(row =>
          <tr key={row.id}>
            {container.singleSelectionMode &&
              <td>
                <input type="radio"
                  name={container.id}
                  value={row[container.rowID]}
                  checked={row[container.rowID] === container.config.value}
                  onChange={() => container.selectRow(row)} />
              </td>
            }
            {container.multiSelectionMode &&
              <td>
                <input type="checkbox"
                  name={container.id}
                  value={row[container.rowID]}
                  checked={row[container.rowID] === container.config.value}
                  onChange={e => container.selectRow(row, e.target.checked)} />
              </td>
            }
            {container.fields.map(col => container.showButton(col.config.name, col) ?
              <td key={col.config.name}>
                <a type="button" href="#"
                  onClick={(e) => { e.preventDefault(); container.listViewClick(col.config, row) }}
                  dangerouslySetInnerHTML={{ __html: row[col.config.name] || '---' }} />
              </td> :
              <td key={col.config.name} dangerouslySetInnerHTML={{ __html: row[col.config.name] || '---' }}></td>
            )}
          </tr>
        )}
      </tbody>
    </table>
  </>
}
