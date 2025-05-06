import { useState } from "react"

export default function HsbcDate(props: {
    id: string,
    invalid?: boolean,
    value?: string,
    onError?: (m: string) => void,
    onChange?: (v: string) => void
    onBlur?: (v: string) => void
}) {
    const [date, setDate] = useState<string[]>(props.value?.split('-') ?? ['', '', '']);

    function upDate(v: string, idx: number) {
        date[idx] = v;
        const d = new Date(date.join('-'));
        if (areNumbers([...date, d.getTime()])) {
            props.onChange?.(date.join('-'));
        } else {
            if (!Number.isNaN(d.getTime())) {
                props.onError?.('Please check your date is correct');
            }
        }
        setDate([...date]);
    }

    function areNumbers(arr: (string | number)[]) {
        return arr.reduce((numbers, item) => numbers && item !== '' && !Number.isNaN(item), true);
    }

    return <div className="container_he7NW">
        <div className="day_QnYAz">
            <label className="label_dQA2Y marginBottomHalf_HqntJ regular_u61RY fontSize3_hUHe0"
                htmlFor={props.id + '-day'}>
                DD
            </label>
            <input className={
                'input_cSOEz fontSizeInput_iB7ra paddingVerticalInput_wCTe9 paddingHorizontalInput_tn7be'
                + (props.invalid ? ' invalid_Wd4pb' : '')
            }
                onChange={e => upDate(e.target.value, 2)}
                value={date[2]}
                id={props.id + '-day'}
                maxLength={2}
                pattern="\d+"
                type="tel" />
        </div>
        <div className="month_aFPWZ">
            <label className="label_dQA2Y marginBottomHalf_HqntJ regular_u61RY fontSize3_hUHe0"
                htmlFor={props.id + '-month'}>
                MM
            </label>
            <input className={
                'input_cSOEz fontSizeInput_iB7ra paddingVerticalInput_wCTe9 paddingHorizontalInput_tn7be'
                + (props.invalid ? ' invalid_Wd4pb' : '')
            }
                onChange={e => upDate(e.target.value, 1)}
                value={date[1]}
                id={props.id + '-month'}
                maxLength={2}
                pattern="\d+"
                type="tel" />
        </div>
        <div className="year_YxGSV">
            <label className="label_dQA2Y marginBottomHalf_HqntJ regular_u61RY fontSize3_hUHe0"
                htmlFor={props.id + '-year'}>
                YYYY
            </label>
            <input className={
                'input_cSOEz fontSizeInput_iB7ra paddingVerticalInput_wCTe9 paddingHorizontalInput_tn7be'
                + (props.invalid ? ' invalid_Wd4pb' : '')
            }
                onChange={e => upDate(e.target.value, 0)}
                onBlur={e => props.onBlur?.(e.target.value)}
                value={date[0]}
                id={props.id + '-year'}
                maxLength={4}
                pattern="\d+"
                type="tel" />
        </div>
    </div>
}