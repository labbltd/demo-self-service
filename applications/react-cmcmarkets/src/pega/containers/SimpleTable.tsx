import { Datapage, PConnect } from "@labb/constellation-core-types";
import { PContainer, PContainerFactory } from "@labb/dx-engine";
import { GeneratePContainer } from "@labb/react-adapter";
import { useEffect, useState } from "react";

interface SimpleTableProps {
    multiRecordDisplayAs: string;
    contextClass: string;
    referenceList: {}[];
    visibility: boolean;
    fieldHeader: string;
    allowActions: {
        allowAdd: boolean;
        allowEdit: boolean;
        allowDelete: boolean;
    };
    heading: string;
}

export default function SimpleTable(props: { container: PContainer<SimpleTableProps> }) {
    const [resolvedChildren, setResolvedChildren] = useState<JSX.Element[] | null>(null);
    const {
        multiRecordDisplayAs,
        contextClass,
        referenceList,
        fieldHeader,
        allowActions,
        heading = 'Row'
    } = props.container.config;
    (props.container.pconnect as any)._referenceList = (props.container.config as any).authorContext;
    let { allowAdd, allowEdit, allowDelete } = allowActions ?? {};
    const { allowRowDelete } = props.container.pconnect.getComponentConfig() as any;
    const fieldGroupLabel = props.container.pconnect.getInheritedProps().label;

    allowDelete = allowDelete ?? true;
    allowEdit = allowEdit ?? true;
    allowAdd = allowAdd ?? true;

    const addFieldGroupItem = () => {
        const resolvedList = getReferenceList(props.container.pconnect);
        props.container.pconnect.getListActions().initDefaultPageInstructions(resolvedList as string, []);
        props.container.pconnect.getListActions().insert({ classID: contextClass }, referenceList.length);
    };

    const deleteFieldGroupItem = (index: number) => {
        const resolvedList = getReferenceList(props.container.pconnect);
        props.container.pconnect.getListActions().initDefaultPageInstructions(resolvedList as string, []);
        props.container.pconnect.getListActions().deleteEntry(index);
    };

    useEffect(() => {
        Promise.all(referenceList.map(async (item, index) => {
            const allowRowDeleting = evaluateAllowRowAction(allowRowDelete, item);
            return {
                id: index,
                name: fieldHeader === 'propertyRef' ? getDynamicHeaderProp(heading, item, index) : `${heading} ${index + 1}`,
                child: await getChild(
                    props.container.pconnect,
                    index,
                    true,
                    props.container
                ),
                ...(allowDelete && allowRowDeleting && { onDelete: deleteFieldGroupItem })
            };
        })).then(cs => setResolvedChildren(cs.map((c, idx) => <div key={c.id}>
            <GeneratePContainer container={c.child} />
            <button onClick={() => deleteFieldGroupItem(idx)} className="sc-jxOSlx efsLjW" style={{ left: '75%', position: 'relative', top: '-50px' }}><svg width="30" height="30" viewBox="4 4 18 18" xmlns="http://www.w3.org/2000/svg" className="sc-eHsDsR jnKNsW"><g fillRule="evenodd"><circle cx="8.901" cy="9.238" r="8.4" transform="rotate(45 6.558 16.376)" fill="#1B2429" fillOpacity="0.2"></circle><g stroke="#FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"><path d="M16.576 10.234l-6.357 6.358M16.576 16.592l-6.357-6.358"></path></g></g></svg></button>
        </div>
        )))
    }, [referenceList.length]);

    if (referenceList.length === 0) {
        addFieldGroupItem();
    }

    if (multiRecordDisplayAs === 'fieldGroup') {
        return <>
            {resolvedChildren}
            {allowAdd && <>
                <div data-valid="true" className="sc-jXbUNg kdpnEA">
                    <div className="sc-imWYAI jCqVct" style={{ width: '25%' }}></div>
                    <div className="sc-imWYAI jCqVct" style={{ width: '50%' }}>
                        <button type="button" onClick={() => addFieldGroupItem()} className="sc-jxOSlx efsLjW">
                            Add {heading}
                        </button>
                    </div>
                </div>
            </>}
        </>
    }
    return <>
        Simple Table
    </>
}

function getDynamicHeaderProp(heading: string, item: { [key: string]: string }, index: number): string {
    if (heading && item[heading.substring(1)]) {
        return item[heading.substring(1)];
    }
    return `Row ${index + 1}`;
};

function evaluateAllowRowAction(allowRowDelete: boolean | string, rowData: Object): boolean {
    if (allowRowDelete === undefined || allowRowDelete === true) return true;
    if (typeof allowRowDelete === 'string' && allowRowDelete.startsWith?.('@E ')) {
        const expression = allowRowDelete.replace('@E ', '');
        return window.PCore.getExpressionEngine().evaluate(expression, rowData);
    }
    return false;
}

function getReferenceList(pConn: PConnect) {
    let resolvePage = pConn.getComponentConfig().referenceList?.replace('@P ', '');
    if (resolvePage?.includes('D_')) {
        const resolveDatapage = pConn.resolveDatasourceReference(resolvePage) as Datapage;
        if (resolveDatapage?.pxResults) {
            return resolveDatapage?.pxResults;
        } else if (resolvePage.startsWith('D_') && !resolvePage.endsWith('.pxResults')) {
            return `${resolvePage}.pxResults`;
        }
    }
    return resolvePage;
};

async function getChild(
    pConn: PConnect,
    index: number,
    viewConfigPath: boolean,
    container: PContainer
) {
    const context = pConn.getContextName();
    const referenceList = getReferenceList(pConn) as string;
    const isDatapage = referenceList.startsWith('D_');
    const pageReference = isDatapage
        ? `${referenceList}[${index}]`
        : `${pConn.getPageReference()}${referenceList}[${index}]`;
    const meta = viewConfigPath ? pConn.getRawMetadata().children[0].children?.[0] : pConn.getRawMetadata().children[0];

    delete meta?.config?.ruleClass;
    const config = {
        meta: meta!,
        options: {
            context,
            pageReference,
            referenceList,
            hasForm: true,
            viewName: (pConn as any).viewName
        }
    };
    const pconnect = window.PCore.createPConnect(config).getPConnect();
    pconnect.setInheritedProp('pageReference', pageReference);
    return await PContainerFactory.create(pconnect.getComponentName(), pconnect);
}