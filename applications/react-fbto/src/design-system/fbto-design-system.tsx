import React from 'react';
import MainTemplate from './fbto-main-template';
import StepperHeader from './fbto-stepper-header';

interface FormPageProps {
    children: React.ReactNode
}

export default function FormPage({ children }: FormPageProps) {
    return (
        <MainTemplate>
            <StepperHeader steps={['Opzegdatum', 'Personen', 'Uw gegevens', 'Overzicht']} currentStep={2} />
            <form>
                {children}
            </form>
        </MainTemplate>
    );
}
