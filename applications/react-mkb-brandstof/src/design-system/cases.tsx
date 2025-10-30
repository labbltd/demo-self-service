export default function MkbCases(props: {
  onCaseSelected: (key: string) => void,
  cases: { name: string, ID: string }[]
}) {
  return <section className="usp-cta-block section-general color-bg-tertiary">
    <div className="wrapper-bounded usp-cta-block__wrapper">
      <h2 className="usp-cta-block__title">Kies wat je wilt doen</h2>
      <div className="usp-cta-block__columns" style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
        {
          props.cases.map(c => <div key={c.ID} className="usp-cta-block__columns__block">
            <h3 className="usp-cta-block__column__title">{c.name}</h3>
            {/* <ul className="usp-cta-block__list">
            <li className="usp-cta-block__list__item">Voor € 7,60 per maand</li>
            <li className="usp-cta-block__list__item">Onbeperkt laden en parkeren</li>
            <li className="usp-cta-block__list__item">Geen starttarief per laadbeurt</li>
          </ul> */}
            <a className="usp-cta-block__columns__block__cta btn color-brand-primary" onClick={() => props.onCaseSelected(c.ID)}><span>Start</span></a>
          </div>)
        }
      </div>
    </div>
  </section>
}