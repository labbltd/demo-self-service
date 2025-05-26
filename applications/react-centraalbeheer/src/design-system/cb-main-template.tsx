export default function MainTemplate(props: { children: JSX.Element | JSX.Element[] }) {
    return (
        <div className="main legacy" role="main" id="maincontent">
            <div className="site ng-scope">
                <article className="cb-strip-funnel">{props.children}</article>
            </div>
        </div>
    );
}
