export default function MdsVerticalNavigationItem(props: {
    label: string,
    type: string,
    expanded: string,
    icon?: string,
    href: string
}) {
    return <div role="presentation">
        <div className="vertical-navigation-item vertical-navigation-item--heading vertical-navigation-item--inverse" role="heading" aria-level={2}>
            {props.label}
        </div>
    </div>
}