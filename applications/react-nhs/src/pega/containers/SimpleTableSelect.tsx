import { GeneratePContainer } from '@labb/react-adapter';
import { SimpleTable } from 'packages/libs/dx-engine/src/lib/sdk';

export default function SimpleTableSelect(props: { container: SimpleTable }) {
  const { label } = props.container.config;

  return <table className="nhsuk-table">
    <caption className="nhsuk-table__caption nhsuk-table__caption--m">{label}</caption>
    <tbody className="nhsuk-table__body">
      {props.container.cells.map((row, rowIndex) => (
        <tr className="nhsuk-table__row" key={rowIndex}>
          {row.map((child, colIndex) => (
            <td className="nhsuk-table__cell" key={`${rowIndex}.${colIndex}`} >
              <GeneratePContainer container={child} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>;
}
