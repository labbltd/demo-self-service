import { DataOptions, ItemView, PConnectConfig } from '@labb/constellation-core-types';
import { PContainer, PContainerFactory } from '@labb/dx-engine';
import { GeneratePContainer } from '@labb/react-adapter';
import { Spin } from 'antd';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import { useEffect, useState } from 'react';

export default function Default(props: { container: PContainer }) {
  const { name, deferLoadId } = props.container.config;
  const [content, setContent] = useState<React.ReactElement | null>(null);
  const [isLoading, setLoading] = useState(true);

  const pConnect = props.container.pconnect;
  const localizedVal = window.PCore.getLocaleUtils().getLocaleValue;
  const constants = window.PCore.getConstants();
  const { CASE, PAGE, DATA } = constants.RESOURCE_TYPES;
  const loadViewCaseID: string = pConnect.getValue(constants.PZINSKEY) || pConnect.getValue(constants.CASE_INFO.CASE_INFO_ID);
  let containerName: string;
  let containerItemData;
  const targetName = pConnect.getTarget();
  if (targetName) {
    containerName = window.PCore.getContainerUtils().getActiveContainerItemName(targetName);

    containerItemData = window.PCore.getContainerUtils().getContainerItemData(targetName, containerName);
  }

  let resourceType = CASE;
  if (containerItemData?.resourceType) {
    resourceType = containerItemData.resourceType;
  } else if (!loadViewCaseID) {
    resourceType = PAGE;
  }

  const isContainerPreview = /preview_[0-9]*/g.test(pConnect.getContextName());
  const isContainerModal = /modal_[0-9]+$/.test(pConnect.getContextName());

  const getViewOptions = () => {
    let containerItem;
    if (isContainerPreview) {
      containerItem = 'preview';
    } else if (isContainerModal) {
      containerItem = 'modal';
    } else {
      containerItem = null;
    }
    return {
      viewContext: resourceType,
      pageClass: loadViewCaseID ? '' : (pConnect.getDataObject() as any)?.pyPortal?.classID,
      container: containerItem,
      containerName: containerItem,
      updateData: isContainerPreview || isContainerModal,
      viewLoadingContainer: {
        context: pConnect.getContextName()
      }
    };
  };

  const onResponse = async (data: ItemView) => {
    setLoading(false);
    if (deferLoadId) {
      window.PCore.getDeferLoadManager().start(
        name,
        pConnect.getCaseInfo().getKey(),
        pConnect.getPageReference().replace('caseInfo.content', ''),
        pConnect.getContextName(),
        deferLoadId
      );
    }

    if (data && !(data.type && data.type === 'error')) {
      const config: PConnectConfig = {
        meta: data,
        options: {
          context: pConnect.getContextName(),
          pageReference: pConnect.getPageReference(),
          target: pConnect.getTarget(),
          hasForm: true,
          viewName: (pConnect as any).viewName
        }
      };
      const configObject = window.PCore.createPConnect(config).getPConnect();
      const container = await PContainerFactory.create(configObject.getComponentName(), configObject)
      const contentRegion = <GeneratePContainer container={container} />;

      setContent(contentRegion);

      if (deferLoadId) {
        window.PCore.getDeferLoadManager().stop(deferLoadId, pConnect.getContextName());
      }
    }
  };

  const onError = () => {
    setLoading(false);
    const banner = <ErrorBoundary />;
    setContent(banner);
  };

  useEffect(() => {
    const pageReference = (window.PCore as any).getFieldUtils().formatPageReference(
      pConnect.getPageReference().replace(constants.CASE_INFO.CASE_INFO_CONTENT, '')
    );
    if (resourceType === DATA) {
      // Rendering defer loaded tabs in data context
      if (containerName) {
        const dataContext = window.PCore.getStoreValue<string>('.dataContext', 'dataInfo', containerName);
        const dataContextParameters = window.PCore.getStoreValue<object>('.dataContextParameters', 'dataInfo', containerName);

        (pConnect
          .getActionsApi()
          .showData(name, dataContext, dataContextParameters, {
            skipSemanticUrl: true,
            isDeferLoaded: true
          } as DataOptions) as unknown as Promise<ItemView>)
          .then((data) => {
            onResponse(data);
          })
          .catch((err) => {
            if (err?.code !== 'ERR_CANCELED') {
              onError();
            }
          });
      } else {
        // eslint-disable-next-line no-console
        console.error('Cannot load the defer loaded view without container information');
      }
    } else if (
      resourceType === PAGE ||
      (resourceType === CASE && pConnect.getValue('context_data.caseViewMode') === 'review' && !pageReference)
    ) {
      // Rendering defer loaded tabs in case/ page context
      (pConnect
        .getActionsApi()
        .loadView(encodeURI(loadViewCaseID), name, getViewOptions()) as unknown as Promise<ItemView>)
        .then((data) => {
          onResponse(data);
        })
        .catch((err) => {
          if (err?.code !== 'ERR_CANCELED') {
            onError();
          }
        });
    } else {
      const options = {
        skipDataMerge: (pConnect as any).options?.inheritedConfig?.template === 'HierarchicalForm'
      };
      pConnect
        .getActionsApi()
        .refreshCaseView(encodeURI(loadViewCaseID), name, pageReference, options)
        .then((data) => {
          onResponse(data.root as ItemView);
        })
        .catch((err) => {
          if (err?.code !== 'ERR_CANCELED') {
            onError();
          }
        });
    }
  }, [name, pConnect]);
  /* TODO Cosmos need to handle for now added a wrapper div with pos relative */
  let deferLoadContent;
  if (isLoading) {
    deferLoadContent = (
      <div style={{ position: 'relative', height: '100px' }}>
        <Spin />
      </div>
    );
  } else {
    deferLoadContent = <>{content}</>;
  }

  return deferLoadContent;
}
