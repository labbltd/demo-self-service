import { MutableRefObject } from "react";

interface InputProps {
  id: string;
  type: string;
  value?: string;
  onChange?: (v: string) => void;
  onBlur?: (v: string) => void;
  invalid?: boolean;
  reference?: MutableRefObject<HTMLInputElement | null>;
  readonly?: boolean;
  currencyCode?: string; // NEW
}

export default function LVCInput(props: InputProps) {
  return props.type === 'number' ? (
    <div className="container_he7NW">
      <div className="column_ycHBk width-2_cYEL9">
        <TextInput {...props} />
      </div>
    </div>
  ) : (
    TextInput(props)
  );
}

function TextInput(props: InputProps) {
  const getCurrencySymbol = (code?: string) => {
    if (!code) return '';
    try {
      const formatted = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: code,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(0);
      return formatted.replace(/\d/g, '').trim(); // Remove digits, leave symbol
    } catch {
      return '';
    }
  };

  const currencySymbol = getCurrencySymbol(props.currencyCode);

if (props.readonly) {
  // Try to parse number for formatting
  const num = Number(props.value);
  const formattedValue =
    !isNaN(num) && props.value !== undefined && props.value !== ''
      ? new Intl.NumberFormat(undefined, {
          style: 'currency',
          currency: props.currencyCode ?? 'USD',
        }).format(num)
      : props.value || '—';

  return (
    <div
      className={
        'readonlyDisplay fontSizeInput_iB7ra paddingVerticalInput_wCTe9 paddingHorizontalInput_tn7be' +
        (props.invalid ? ' invalid_Wd4pb' : '')
      }
      id={props.id}
    >
      {formattedValue}
    </div>
  );
}


  return (
    <div className="relative inline-flex items-center">
      {currencySymbol && (
        <span className="absolute left-3 text-gray-500">{currencySymbol}</span>
      )}
      <input
        className={
          'input_cSOEz fontSizeInput_iB7ra paddingVerticalInput_wCTe9 paddingHorizontalInput_tn7be' +
          (props.invalid ? ' invalid_Wd4pb' : '') +
          (currencySymbol ? ' pl-7' : '') // Add padding for symbol
        }
        ref={props.reference}
        id={props.id}
        name={props.id}
        type={props.type}
        value={props.value ?? ''}
        onChange={e => props.onChange?.(e.target.value)}
        onBlur={e => props.onBlur?.(e.target.value)}
      />
    </div>
  );
}
