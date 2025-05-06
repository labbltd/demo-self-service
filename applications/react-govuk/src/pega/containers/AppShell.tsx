import { CaseType, Page } from '@pega/constellationjs';
import { PContainer } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';

export default function AppShell(props: { container: PContainer }) {
  async function search(target: any): Promise<void> {
    const searchValue = target.value;
    if ('' === searchValue) {
      return props.container.pconnect
        .getActionsApi()
        .showPage('pySearchPage', 'Data-Portal');
    }
    const cleanedSearchValue = searchValue.replace(/['"]+/g, '');
    const dataResponse = await window.PCore.getDataApiUtils().getData(
      'D_pySearch',
      JSON.stringify({
        dataViewParameters: {
          SearchString: encodeURIComponent(cleanedSearchValue),
        },
      })
    );
    if (
      null === dataResponse.data.data ||
      1 !== dataResponse.data.resultCount ||
      dataResponse.data.data[0].pyID.toUpperCase() !==
      cleanedSearchValue.toUpperCase()
    ) {
      props.container.pconnect
        .getActionsApi()
        .showPage('pySearchPage', 'Data-Portal');
    } else {
      props.container.pconnect
        .getActionsApi()
        .openWorkByHandle(
          dataResponse.data.data[0].pzInsKey,
          dataResponse.data.data[0].pzCategoryActionKeys
        );
    }
  }

  async function createCase(caseType: CaseType): Promise<void> {
    await props.container.pconnect
      .getActionsApi()
      .createWork(caseType.pyClassName, {
        containerName: 'primary',
        flowType: caseType.pyFlowType || 'pyStartCase',
      });
  }

  async function openPage(page: Page): Promise<void> {
    await props.container.pconnect
      .getActionsApi()
      .showPage(page.pyRuleName, page.pyClassName, { containerName: 'app' });
  }
  return <>
    <label>
      Search
      <input type="text" onChange={e => search(e.target)} />
    </label>
    Create new case
    <ul>
      {
        props.container.config.caseTypes.map((caseType: CaseType) => <li key={caseType.pyLabel} onClick={() => createCase(caseType)}>
          {caseType.pxPageViewIcon} {caseType.pyLabel}
        </li>)
      }
    </ul>
    Navigate to page
    <ul>
      {
        props.container.config.pages.map((page: Page) => <li key={page.pyLabel} onClick={() => openPage(page)}>
          {page.pxPageViewIcon} {page.pyLabel}
        </li>)
      }
    </ul >
    {
      props.container.children.map((child, index) =>
        <GeneratePContainer key={child.id + index + '.1'} container={child} />
      )
    }
  </>
}
