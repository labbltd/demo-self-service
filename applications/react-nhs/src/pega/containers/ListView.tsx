import { ListView } from '@labb/dx-engine';
import { Fragment, useState } from 'react';

export default function DxListView(props: { container: ListView }) {
  const { container } = props;
  const asTable = props.container.config.referenceList !== 'D_CareplanList';
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
    {asTable && <TableListView container={container} />}
    {!asTable && <TabsListView container={container} />}
  </>
}

function TabsListView(props: { container: ListView }) {
  const { container } = props;
  const [activeTab, setActiveTab] = useState(container.updatedRefList[0]);

  return <div className="nhsuk-tabs" data-module="nhsuk-tabs">
    <ul className="nhsuk-tabs__list">
      {container.updatedRefList.map((row, index) => <li key={index} className={"nhsuk-tabs__list-item" + (activeTab === row ? ' nhsuk-tabs__list-item--selected' : '')}>
        <a className="nhsuk-tabs__tab" onClick={() => setActiveTab(row)}>
          {row[container.rowID] === container.config.value && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="20" height="20">
            <path strokeWidth="4" strokeLinecap="round" d="M18.4 7.8l-8.5 8.4L5.6 12" stroke="#007f3b"></path>
          </svg>}{row[container.rowID]}
        </a>
      </li>)
      }
    </ul >
    <div className="nhsuk-tabs__panel">
      <dl className="nhsuk-summary-list">
        {container.fields.map((col, index) => <div key={index} className="nhsuk-summary-list__row">
          <dt className="nhsuk-summary-list__key">
            {col.config.label}
          </dt>
          <dd className="nhsuk-summary-list__value" dangerouslySetInnerHTML={{ __html: activeTab[col.config.name] }}>
          </dd>
        </div>)}
      </dl>
      <div className="nhsuk-form-group">
        <div className="nhsuk-radios__item">
          <input type="radio"
            className="nhsuk-radios__input"
            name={container.id}
            id={container.id}
            value={activeTab[container.rowID]}
            checked={activeTab[container.rowID] === container.config.value}
            onChange={() => container.selectRow(activeTab)} />
          <label className="nhsuk-label nhsuk-radios__label" htmlFor={container.id}>Select</label>
        </div>
      </div>
    </div>
  </div >
}

function TableListView(props: { container: ListView }) {
  const { container } = props;
  return <table className="nhsuk-table">
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
          {container.fields.map(col => <Fragment key={col.config.name}>
            {container.showButton(col.config.name, col) &&
              <td>
                <a role="button" className="nhsuk-link"
                  onClick={() => container.listViewClick(col.config, row)}
                  dangerouslySetInnerHTML={{ __html: row[col.config.name] || '---' }} />
              </td>
            }
            {!container.showButton(col.config.name, col) && <td key={col.config.name} dangerouslySetInnerHTML={{ __html: row[col.config.name] || '---' }}></td>}
          </Fragment>
          )}
        </tr>
      )}
    </tbody>
  </table>
}