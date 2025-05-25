import { ListView } from '@labb/dx-engine';
import HsbcPanel from 'applications/react-hsbc/design-system/hsbc-panel';

export default function DxListView(props: { container: ListView }) {
  const { container } = props;
  return <div className="formItem_P5zj_ marginBottom3_cHPnK clearfix_hhLma">
    {container.config.referenceList === "D_CareplanList" && <div className="grid">
      {container.response.map(plan => <HsbcPanel key={plan.CareLevel}
        onSelect={() => {
          container.updateFieldValue(plan.CareLevel);
          container.triggerFieldChange(plan.CareLevel);
        }}
        selected={container.config.value === plan.CareLevel}
        price={plan.MonthlyCost}
        label={plan.pyLabel}
        description={plan.pyDescription}
        benefits={plan.Benefits}
        level={plan.CareLevel} />)}
    </div>
    }
    {container.config.referenceList !== "D_CareplanList" && <table>
      {container.label && <caption>{container.label}</caption>}
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
                <button type="button"
                  onClick={() => container.listViewClick(col.config, row)}
                  dangerouslySetInnerHTML={{ __html: row[col.config.name] || '---' }}></button>
              </td> :
              <td key={col.config.name} dangerouslySetInnerHTML={{ __html: row[col.config.name] || '---' }}></td>
            )}
          </tr>
        )}
      </tbody>
    </table>}
  </div>
}
