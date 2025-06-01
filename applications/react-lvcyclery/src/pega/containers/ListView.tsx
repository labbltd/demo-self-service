import { ListView } from '@labb/dx-engine';
import LvcError from 'applications/react-lvcyclery/design-system/lvc-error';
import LVCPanel from 'applications/react-lvcyclery/design-system/lvc-panel';

export default function DxListView(props: { container: ListView }) {
  const { container } = props;

  const isSelected = (row: any) =>
    container.singleSelectionMode
      ? row[container.rowID] === container.config.value
      : Array.isArray(container.config.value) && container.config.value.includes(row[container.rowID]);

  return <>
    {props.container.config.validatemessage && <LvcError error={props.container.config.validatemessage} />}
    <div className="formItem_P5zj_ marginBottom3_cHPnK clearfix_hhLma">
      {/* Care plan grid */}
      {container.config.referenceList === "D_CareplanList" && (
        <div className="grid">
          {container.response.map(plan => (
            <LVCPanel
              key={plan.CareLevel}
              onSelect={() => {
                container.updateFieldValue(plan.CareLevel);
                container.triggerFieldChange(plan.CareLevel);
              }}
              selected={container.config.value === plan.CareLevel}
              price={plan.MonthlyCost}
              label={plan.pyLabel}
              description={plan.pyDescription}
              benefits={plan.Benefits}
              level={plan.CareLevel}
            />
          ))}
        </div>
      )}

      {/* Custom card view */}
      {container.config.referenceList !== "D_CareplanList" && (
        <div className="card-container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {container.label && <h4>{container.label}</h4>}
          {container.updatedRefList.map(row => {
            const selected = isSelected(row);
            return (
              <div
                key={row.id}
                className={`card ${selected ? 'selected' : ''}`}
                onClick={() =>
                  container.selectRow(
                    row,
                    container.multiSelectionMode ? !selected : undefined
                  )
                }
                style={{
                  border: selected ? '2px solid #007bff' : '1px solid #ccc',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  cursor: 'pointer',
                  backgroundColor: selected ? '#f0f8ff' : 'white',
                }}
              >
                {/* Hidden input for accessibility */}
                {(container.singleSelectionMode || container.multiSelectionMode) && (
                  <input
                    type={container.singleSelectionMode ? 'radio' : 'checkbox'}
                    name={container.id}
                    value={row[container.rowID]}
                    checked={selected}
                    readOnly
                    style={{ display: 'none' }}
                  />
                )}

                {/* Field values */}
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  {container.fields.map((col) => {
                    const fieldValue = row[col.config.name] || '---';
                    return (
                      <div key={col.config.name} style={{ display: 'flex', gap: '0.5rem' }}>
                        <strong>{col.config.label}:</strong>
                        {container.showButton(col.config.name, col) ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent card click from firing
                              container.listViewClick(col.config, row);
                            }}
                            dangerouslySetInnerHTML={{ __html: fieldValue }}
                            style={{ background: 'none', border: 'none', padding: 0, color: '#007bff', cursor: 'pointer' }}
                          />
                        ) : (
                          <span dangerouslySetInnerHTML={{ __html: fieldValue }} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </>
}
