import { ListView } from '@labb/dx-engine';

export default function DxListView(props: { container: ListView }) {
  const { container } = props;
  return <>
    <div className={"govuk-form-group" + (props.container.config.validatemessage ? ' govuk-form-group--error' : '')}>
      <label className="govuk-label" htmlFor={props.container.id}>
        {props.container.label}{container.selectionMode && !props.container.config.required && ' (Optional)'}
      </label>
      {props.container.config.helperText && <div className="govuk-hint">
        {props.container.config.helperText}
      </div>}
      {props.container.config.validatemessage && <p className="govuk-error-message">
        <span className="govuk-visually-hidden">Error:</span> {props.container.config.validatemessage}
      </p>}
    </div>
    <table className="govuk-table">
      <thead className="govuk-table__head">
        <tr className="govuk-table__row">
          {(container.singleSelectionMode || container.multiSelectionMode) && <th scope="col" className="govuk-table__header"></th>}
          {container.fields.map(col => <th key={col.config.label} scope="col" className="govuk-table__header">{col.config.label}</th>)}
        </tr>
      </thead>
      <tbody className="govuk-table__body">
        {container.updatedRefList.map((row, idx) =>
          <tr key={idx} className="govuk-table__row">
            {container.singleSelectionMode &&
              <td key={-1} className="govuk-table__cell">
                <div className="govuk-form-group">
                  <fieldset className="govuk-fieldset">
                    <div className="govuk-radios govuk-radios--inline" data-module="govuk-radios">
                      <div className="govuk-radios__item">
                        <input
                          className="govuk-radios__input"
                          type="radio"
                          onChange={() => container.selectRow(row)}
                          checked={row[container.rowID] === container.config.value}
                          value={row[container.rowID]}
                        />{' '}
                        <label className="govuk-label govuk-radios__label"></label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </td>
            }
            {container.multiSelectionMode &&
              <td key={-1} className="govuk-table__cell">
                <input type="checkbox"
                  name={container.id}
                  value={row[container.rowID]}
                  checked={row[container.rowID] === container.config.value}
                  onChange={e => container.selectRow(row, e.target.checked)} />
              </td>
            }
            {container.fields.map(col => container.showButton(col.config.name, col) ?
              <td key={col.config.name} className="govuk-table__cell">
                <a type="button" className="govuk-link" href="#"
                  onClick={() => container.listViewClick(col.config, row)}
                  dangerouslySetInnerHTML={{ __html: row[col.config.name] || '---' }}></a>
              </td> :
              <td key={col.config.name} className="govuk-table__cell" dangerouslySetInnerHTML={{ __html: row[col.config.name] || '---' }}></td>
            )}
          </tr>
        )}
      </tbody>
    </table>
  </>
}
