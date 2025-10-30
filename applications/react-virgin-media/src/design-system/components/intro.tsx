export default function VmIntro(props: { title: string }) {
    return <div className="container-fluid vm-bg-red component">
        <div className="richText variantConfigurable general component rte">
            <div className="rte-content" data-unique-id="1333482367">
                <h1 style={{ textAlign: 'center' }}>
                    <span className="vm-white"><br />
                        {props.title}&nbsp;
                    </span>
                </h1>
                <p style={{ textAlign: 'center' }}>
                    <span className="vm-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/>
                        Morbi ultricies lorem turpis, eget commodo dolor laoreet eu.<br/>
                        Aenean ultricies ex dignissim finibus ultrices.<br/>
                        Suspendisse vitae eleifend urna.<br/>
                    </span><br />
                </p>
                <p style={{ textAlign: 'center' }}><span className="vm-white">&nbsp;</span></p>
            </div>
        </div>
    </div>
}