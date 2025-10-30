import React, { ChangeEventHandler, HTMLInputTypeAttribute, useState } from 'react';

// ======================
// TYPES
// ======================

interface Product {
    id: string;
    name: string;
    license: string;
    pin: string;
    monthlyPrice: number;
    originalPrice: number;
    deposit: number;
}

interface FormData {
    gender: 'Male' | 'Female' | 'Other' | '';
    firstName: string;
    prefixLastName: string;
    lastName: string;
    emailAddress: string;
    emailAddressConfirmed: string;
    phoneNumber: string;
    newsletterSubscription: boolean;
    companySearchTerm: string;
}

// ======================
// REUSABLE COMPONENTS
// ======================

export const TextInput: React.FC<{
    id: string;
    name: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onBlur: ChangeEventHandler<HTMLInputElement>;
    type?: HTMLInputTypeAttribute;
    error?: string;
    disabled?: boolean
}> = ({ id, name, label, placeholder, required, value, onChange, onBlur, type = 'text', error, disabled }) => (
    <fieldset>
        <div className="f-item">
            {label && (
                <label htmlFor={id}>
                    {label} {required && <span className="required">*</span>}
                </label>
            )}
            <div className="input-wrapper">
                <input
                    id={id}
                    name={name}
                    type={type}
                    disabled={disabled}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e)}
                    onBlur={(e) => onBlur(e)}
                    required={required}
                />
            </div>
            {error && <span data-errorfield-id="phonenumber" className="error-message">{error}</span>}
        </div>
    </fieldset>
);

export const RadioGroup: React.FC<{
    legend: string;
    name: string;
    options: { value: string; key: string }[];
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    error?: string;
}> = ({ legend, name, options, value, onChange, required, error }) => (
    <fieldset>
        <div className="f-item f-item-gender">
            <legend>
                {legend} {required && <span className="required">*</span>}
            </legend>
            <div className="f-element-radio__wrap">
                {options.map((option) => (
                    <div key={`${name}-${option.key}`} className="f-element-radio">
                        <input
                            id={`${name}-${option.key}`}
                            name={name}
                            type="radio"
                            value={option.key}
                            checked={value === option.key}
                            required={required}
                        />
                        <label onClick={() => onChange(option.key)} htmlFor={`${name}-${option.value}`}>{option.value}</label>
                    </div>
                ))}
            </div>
            {error && <span data-errorfield-id="phonenumber" className="error-message">{error}</span>}
        </div>
    </fieldset>
);

export const Checkbox: React.FC<{
    id: string;
    name: string;
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}> = ({ id, name, label, checked, onChange }) => (
    <div className="f-item">
        <input
            id={id}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
        />
        <label htmlFor={id}>{label}</label>
    </div>
);

// ======================
// LAYOUT COMPONENTS
// ======================

export const NavigationHeader: React.FC<{ goHome: Function }> = (props: { goHome: Function }) => (
    <div className="navigation-header-wrapper">
        <div className="navigation-header">
            <div className="navigation-header-inner">
                <nav className="wrapper-bounded">
                    <a onClick={() => props.goHome()} title="homepage" className="logo-tom">
                        <img src="https://www.mkb-brandstof.nl/build/img/svg/logo-mkb-brandstof.svg" alt="MKB Brandstof" />
                    </a>
                    <div className="registration-support">
                        <span className="registration-support-content">
                            Bel voor vragen:{' '}
                            <a href="tel:0885885861">
                                <span className="registration-support__phone-number">0885 885 861</span>
                            </a>
                        </span>
                    </div>
                </nav>
            </div>
        </div>
    </div>
);

export const StepProgressBar: React.FC<{
    currentStep: number;
    steps: { id: number; label: string; route: string }[];
}> = ({ currentStep, steps }) => (
    steps.length > 1 && <div className="steps-progress">
        <ol>
            {steps.map((step, index) => (
                <li
                    key={step.id}
                    className={`step-item ${currentStep === step.id ? 'active' : ''}`}
                >
                    <a href={step.route}
                        className={`step-item-link step-item-container ${currentStep === step.id ? 'router-link-exact-active router-link-active' : ''}`}
                    >
                        <span className="step-item-label">{step.label}</span>
                        <span className={`dot ${currentStep > step.id ? 'dot--done' : ''}`}></span>
                    </a>
                    <svg width="46" height="35" viewBox="0 0 46 35" fill="none" style={{ display: currentStep === step.id ? '' : 'none' }}>
                        <path
                            d="M11.4817 1.48507L11.4325 1.5035L11.3856 1.532698C10.4916 1.97394 9.18111 2.83629 8.77086 4.36745C8.5434 4.97839 7.99475 6.52187 7.5012 7.91741C7.24641 8.63786 7.00483 9.32308 6.82695 9.82815L6.77 9.98997H4.6689C2.74652 9.98997 1 11.5275 1 13.6589C1 15.2506 2.05407 16.7217 3.62657 17.1807C2.9647 18.1913 2.9656 19.239 2.96649 20.2861C2.96652 20.3245 2.96655 20.3629 2.96655 20.4013V29.2508C2.96655 31.7697 4.95942 33.7625 7.47826 33.7625C9.80081 33.7625 11.6762 32.0682 11.9544 29.8294H23H34.0457C34.3238 32.0682 36.1992 33.7625 38.5217 33.7625C41.0406 33.7625 43.0334 31.7697 43.0334 29.2508V20.4013C43.0334 20.3629 43.0335 20.3245 43.0335 20.2861C43.0344 19.239 43.0353 18.1913 42.3734 17.1807C43.9459 16.7217 45 15.2506 45 13.6589C45 11.5275 43.2535 9.98997 41.3311 9.98997H39.23L39.173 9.82815C38.9952 9.32308 38.7536 8.63786 38.4988 7.91741C38.0053 6.52188 37.4566 4.9784 37.2291 4.36746C36.8189 2.83629 35.5084 1.97394 34.6144 1.52698L34.5675 1.5035L34.5183 1.48507C33.2247 0.999942 32.2324 0.999973 31.3768 1L31.3579 1H23H14.6421L14.6232 1C13.7676 0.999973 12.7753 0.999942 11.4817 1.48507ZM32.2353 7.37309L32.2352 7.3731L32.2386 7.38285L33.6413 11.4507C33.834 12.0381 33.3726 12.6589 32.7625 12.6589H23H13.2375C12.6273 12.6589 12.1659 12.0381 12.3588 11.4506L13.7614 7.38285L13.7615 7.38287L13.7647 7.37308C13.8384 7.15219 13.8878 7.00575 13.9367 6.88838C13.9535 6.84804 13.9674 6.81834 13.9782 6.79695C14.0025 6.79458 14.0359 6.79264 14.0803 6.79264H23H31.9197C31.9641 6.79264 31.9975 6.79458 32.0217 6.79695C32.0326 6.81834 32.0465 6.84805 32.0633 6.88838C32.1122 7.00575 32.1616 7.15219 32.2353 7.37309ZM10.1472 22.0702C9.29476 22.0702 8.61873 21.3942 8.61873 20.5418C8.61873 19.6894 9.29476 19.0134 10.1472 19.0134C10.9996 19.0134 11.6756 19.6894 11.6756 20.5418C11.6756 21.3942 10.9996 22.0702 10.1472 22.0702ZM37.3813 20.5418C37.3813 21.3942 36.7052 22.0702 35.8528 22.0702C35.0004 22.0702 34.3244 21.3942 34.3244 20.5418C34.3244 19.6894 35.0004 19.0134 35.8528 19.0134C36.7052 19.0134 37.3813 19.6894 37.3813 20.5418Z"
                            fill="#00AEAB"
                            stroke="white"
                            strokeWidth="2"
                        />
                    </svg>
                </li>
            ))}
        </ol>
        <div className="steps-progress-bar">
            <div className="steps-progress-bar__inner" style={{ width: `${(((2 * currentStep <= steps.length) ? (currentStep - 1) : currentStep) / steps.length) * 100}%` }}></div>
        </div>
    </div>
);

export const OrderSummary: React.FC<{ products: Product[] }> = ({ products }) => {
    const [showPin, setShowPin] = useState(false);

    const totalMonthly = products.reduce((sum, p) => sum + p.monthlyPrice, 0);

    return (
        <div className="case-summary">
            <div className="case-summary-cart">
                <h2 className="case-summary-title">Jouw bestelling</h2>
                <div className="case-summary-products">
                    <div className="products-overview">
                        {products.map((product) => (
                            <div key={product.id} className="product-item">
                                <div className="product-item-overview">
                                    <div className="product-item-card">
                                        <img
                                            src="https://www.mkb-brandstof.nl/build/img/svg/blank-pass-fuel.svg"
                                            alt="Preview card"
                                            loading="lazy"
                                            className="product-item-card__pass lazyload"
                                        />
                                    </div>
                                    <div className="product-item-card-details">
                                        <div>
                                            <span className="product-item-name">{product.name}</span>
                                        </div>
                                        <div className="product-item-card-details__inner">
                                            <div className="product-item-card-details__inner-wrap">
                                                <span className="product-item-licence">{product.license}</span>
                                                <div className="product-item-pin">
                                                    Pin{' '}
                                                    <span className="product-item-pin-value">
                                                        <span className="product-item-pin-value--hidden">
                                                            {showPin ? product.pin : '••••'}
                                                        </span>
                                                    </span>
                                                    <button type="button" onClick={() => setShowPin(!showPin)}>
                                                        <img src="https://www.mkb-brandstof.nl/build/img/svg/icon-eye.svg" alt="eye icon" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="product-item-price">
                                                <span className="amount">€ {product.monthlyPrice.toFixed(2)} p/m</span>
                                                <span className="amount-slashed">€ {product.originalPrice.toFixed(2)} p/m</span>
                                                <span className="amount">+ eenmalige borg € {product.deposit}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="totals">
                            <div className="totals-monthly">
                                <span className="totals-amount-label">Totaal</span>
                                <span className="totals-amount">
                                    <span>€ {totalMonthly.toFixed(2)} p/m</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const HelpBanner: React.FC = () => (
    <div className="registration-hulpbanner">
        <section className="section-general">
            <div className="wrapper-bounded">
                <div className="row no-gutter">
                    <div className="registration-hulpbanner__inner">
                        <img src="https://www.mkb-brandstof.nl/build/img/test.jpg" alt="Support" />
                        <div className="registration-hulpbanner__content">
                            <h3>Hulp nodig bij je aanvraag?</h3>
                            <p>Wij zijn bereikbaar tussen 8.00 en 17.00 uur.</p>
                            <a href="tel:0885885861" className="registration-hulpbanner__content__phone">
                                <span>0885 885 861</span>
                            </a>
                            <a href="mailto:servicedesk@mkbbrandstof.nl" className="registration-hulpbanner__content__email">
                                <span>servicedesk@mkb-brandstof.nl</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
);

export const NavigationFooter: React.FC = () => (
    <div className="navigation-footer">
        <nav className="wrapper-bounded">
            <a href="/" title="homepage" className="logo-tom">
                <img src="https://www.mkb-brandstof.nl/build/img/svg/logo-mkb-brandstof.svg" alt="MKB Brandstof" />
            </a>
        </nav>
    </div>
);


