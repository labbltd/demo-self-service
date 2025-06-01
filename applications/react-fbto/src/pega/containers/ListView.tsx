import { ListView } from '@labb/dx-engine';

export default function DxListView(props: { container: ListView }) {
  const { container } = props;
  return <table>
    <div className={
      "d-flex row ml-0 xforms-cc xforms-ap-full ui-date-picker col-sm-4" +
      (props.container.config.validatemessage ? 'xforms-invalid' : 'xforms-valid')
    }>
      <label className="col-lg-3 col-form-label pl-lg-0" htmlFor={props.container.id}>
        {props.container.config.label}
      </label>
      {props.container.config.helperText && <div className="offset-lg-3 order-1 col-lg-9">
        <small className="form-text text-muted xforms-field-info xforms-field-help ">
          <span className="xforms-help-box">{props.container.config.helperText}</span>
        </small>
      </div>}
    </div>
    {props.container.config.validatemessage && <span className="xforms-field-info order-2 offset-lg-3 col-lg-9 xforms-field-alert text-danger small">
      {props.container.config.validatemessage}
      <ul className="wcag-alerts"></ul>
    </span>}
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
              <a href="#" type="button"
                onClick={(e) => { e.preventDefault(); container.listViewClick(col.config, row); }}
                dangerouslySetInnerHTML={{ __html: row[col.config.name] || '---' }} />
            </td> :
            <td key={col.config.name} dangerouslySetInnerHTML={{ __html: row[col.config.name] || '---' }}></td>
          )}
        </tr>
      )}
    </tbody>
  </table >
}
