import { ListView } from '@labb/dx-engine';

export default function DxListView(props: { container: ListView }) {
  const { container } = props;
  return <table className="govuk-table">
    {container.label && <caption>{container.label}</caption>}
    <thead className="govuk-table__head">
      <tr className="govuk-table__row">
        {(container.singleSelectionMode || container.multiSelectionMode) && <th scope="col" className="govuk-table__header">Select</th>}
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
  </table >
}
