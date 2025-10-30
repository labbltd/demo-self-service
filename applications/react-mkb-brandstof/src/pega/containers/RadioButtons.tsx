import { PContainer } from '@labb/dx-engine';
import { RadioGroup } from '../../design-system/design';
import { PicklistProps } from '@labb/constellation-core-types';
import { useState } from 'react';
import iconRemove from '../../../img/svg/icon-remove.svg'

export default function RadioButtons(props: { container: PContainer<PicklistProps> }) {
  const [showHelperText, setShowHelperText] = useState<boolean>(false);
  const isReadOnly = props.container.config.readOnly;
  const additionalInformation = (props.container.config.fieldMetadata as any)?.additionalInformation;
  const isCardType = props.container.pconnect.getStateProps().value === '.CardType';
  const isChargingCardType = props.container.pconnect.getStateProps().value === '.ECardSubtype';
  const isFuelCardType = props.container.pconnect.getStateProps().value === '.FCardSubtype';
  if (isReadOnly && isFuelCardType) {
    return <div className="features-options__row__subscription">
      <span className="features-options__row__buttons__label__inner-title">{props.container.config.datasource[0].value}</span>
    </div>
  }
  if (props.container.config.readOnly) {
    return <><dt>{props.container.config.label}</dt><dd>{props.container.config.value ?? '--'}</dd>
    </>;
  }
  if (isCardType || isChargingCardType) {
    return <fieldset className="features-options__row">
      <legend className="features-options__row__title">{props.container.config.label}
        {additionalInformation && <div className="features-options__row__title__tooltip">
          <button type="button" onClick={() => setShowHelperText(true)} className="features-options__row__title__tooltip__button">
            <span></span>
          </button>
          <div className="field-info-popup" style={{ display: showHelperText ? 'block' : 'none' }}>
            <button type="button" className="field-info-popup__close-button link">
              <img src={iconRemove} style={{fill: 'white'}} onClick={() => setShowHelperText(false)} alt="close" className="field-info-popup__close-button__icon" />
            </button> <div className="field-info-popup__content">
              <p className="field-info-popup__content__text" dangerouslySetInnerHTML={{ __html: additionalInformation }}></p>
            </div>
          </div>
        </div>}
      </legend>
      <div className="features-options__row__buttons">
        {props.container.config.datasource.map(option => <label className="features-options__row__buttons__label">
          <input type="radio"
            onChange={() => {
              props.container.updateFieldValue(option.key);
              props.container.triggerFieldChange(option.key);
            }}
            name={props.container.id}
            value={option.key}
            id={props.container.id + option.key}
            className="features-options__row__buttons__input" />
          <span className="features-options__row__buttons__label__inner">
            {isCardType && <><span className={`features-options__row__buttons__icon features-options__row__buttons__icon--${option.key.toLowerCase().includes('fuel') ? 'fuel' : 'electrical'}`}></span>{option.key}</>}
            {isChargingCardType && <span className="features-options__row__buttons__label__inner-title">{option.key}</span>}
          </span>
        </label>)}
      </div>
    </fieldset>
  }
  return (<>
    <RadioGroup
      legend={props.container.config.label}
      required={props.container.config.required}
      name={props.container.id}
      options={props.container.config.datasource}
      value={props.container.config.value}
      error={props.container.config.validatemessage}
      onChange={(e) => {
        props.container.updateFieldValue(e);
        props.container.triggerFieldChange(e);
      }}
    />
  </>
  );
}
