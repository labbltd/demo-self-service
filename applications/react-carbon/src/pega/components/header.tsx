import { useState } from 'react';
import {
    Header,
    HeaderName,
    HeaderGlobalBar,
    HeaderGlobalAction,
    HeaderPanel,
} from '@carbon/react';
import {
    Search,
    Notification,
    Switcher
} from '@carbon/icons-react';

export default function LabbHeader(props: React.PropsWithChildren): JSX.Element {
    const [open, setOpen] = useState<string | null>(null);

    return <Header aria-label="Labb">
        <HeaderName prefix="Labb">DX Engine</HeaderName>
        <HeaderGlobalBar>
            <HeaderGlobalAction
                aria-label="Search"
                onClick={() => setOpen(open == null ? 'search' : null)}
                isActive={open === 'search'}>
                <Search size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
                onClick={() => setOpen(open == null ? 'notifications' : null)}
                aria-label="Notifications"
                isActive={open === 'notifications'}>
                <Notification size={20} />
            </HeaderGlobalAction>
            <HeaderGlobalAction
                onClick={() => setOpen(open == null ? 'switcher' : null)}
                aria-label="App Switcher"
                tooltipAlignment="end"
                isActive={open === 'switcher'}>
                <Switcher size={20} />
            </HeaderGlobalAction>
        </HeaderGlobalBar>
        <HeaderPanel aria-label="Header Panel" expanded={open != null}>
            {props.children}
        </HeaderPanel>
    </Header>
}