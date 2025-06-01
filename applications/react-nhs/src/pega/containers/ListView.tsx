import { ListView } from '@labb/dx-engine';

export default function DxListView(props: { container: ListView }) {
  const { container } = props;

  return <>
    <div className={"nhsuk-form-group" + (container.config.validatemessage ? " nhsuk-form-group--error" : "")}>
      <label className="nhsuk-label" htmlFor={container.id}>
        {container.config.label}
      </label>
      {container.config.helperText && <div className="nhsuk-hint">
        {container.config.helperText}
      </div>}
      {container.config.validatemessage && <p className="nhsuk-error-message">
        <span className="nhsuk-visually-hidden">Error:</span> {container.config.validatemessage}
      </p>}
    </div>
    <table className="nhsuk-table">
      <thead className="nhsuk-table__head">
        <tr className="nhsuk-table__row">
          {(container.singleSelectionMode || container.multiSelectionMode) && <th>Select</th>}
          {container.fields.map(col => <th key={col.config.label}>{col.config.label}</th>)}
        </tr>
      </thead>
      <tbody className="nhsuk-table__body">
        {container.updatedRefList.map(row =>
          <tr key={row.id} className="nhsuk-table__row">
            {container.singleSelectionMode &&
              <td>
                <div className="nhsuk-form-group">
                  <div className="nhsuk-radios__item">
                    <input type="radio"
                      className="nhsuk-radios__input"
                      name={container.id}
                      value={row[container.rowID]}
                      checked={row[container.rowID] === container.config.value}
                      onChange={() => container.selectRow(row)} />
                    <label className="nhsuk-label nhsuk-radios__label"></label>
                  </div>
                </div>
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
            {container.fields.map(col => <>
              {container.showButton(col.config.name, col) &&
                <td>
                  <a role="button" className="nhsuk-link"
                    onClick={() => container.listViewClick(col.config, row)}
                    dangerouslySetInnerHTML={{ __html: row[col.config.name] || '---' }} />
                </td>
              }
              {!container.showButton(col.config.name, col) && <td key={col.config.name} dangerouslySetInnerHTML={{ __html: row[col.config.name] || '---' }}></td>}
            </>
            )}
          </tr>
        )}
      </tbody>
    </table>
  </>
}
