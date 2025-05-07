import { GeneratePContainer } from '@labb/react-adapter';
import { SimpleTable } from '@labb/dx-engine';

export default function SimpleTableSelect(props: { container: SimpleTable }) {
  const { label } = props.container.config;

  return <table className="govuk-table">
    <caption className="govuk-table__caption govuk-table__caption--m">{label}</caption>
    <tbody className="govuk-table__body">
      {props.container.cells.map((row, rowIndex) => (
        <tr className="govuk-table__row" key={rowIndex}>
          {row.map((child, colIndex) => (
            <td className="govuk-table__cell" key={`${rowIndex}.${colIndex}`} >
              <GeneratePContainer container={child} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>;
}
