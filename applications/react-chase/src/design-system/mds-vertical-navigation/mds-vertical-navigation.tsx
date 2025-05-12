import './mds-vertical-navigation.css';

export default function MdsVerticalNavigation(props: {
    inverse: string,
    children: JSX.Element | JSX.Element[]
}) {
    return <nav className="vertical-navigation vertical-navigation--inverse">
        {props.children}
    </nav>
}