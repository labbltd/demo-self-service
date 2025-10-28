import {
  BankOutlined,
  BulbFilled,
  BulbOutlined,
  CalculatorOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  DollarOutlined,
  FileTextOutlined,
  FormOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import { TokenInfo } from '@labb/constellation-core-types';
import { DemoBootstrap } from '@labb/demo-utilities';
import { BootstrapService } from '@labb/dx-engine';
import { PegaEmbed } from '@labb/react-adapter';
import {
  Alert,
  Avatar,
  Button,
  ConfigProvider,
  Dropdown,
  Layout,
  Menu,
  Space,
  Spin,
  theme,
  Typography
} from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import { Suspense, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './pega/ContainerMapping';
import beBank from './public/be.logo.transparent.png';
import profile from './public/team-4.jpeg';

const { Header, Content, Sider, Footer } = Layout;
const { Text } = Typography;

const root = ReactDOM.createRoot(
  document.getElementsByTagName('app-root')[0] as HTMLElement
);

async function render() {
  root.render(
    <Suspense>
      <Main />
    </Suspense>
  );
}

function Main(props?: { setTitle?: Function }) {
  const [loadingStatus, setLoadingStatus] = useState<boolean | undefined>(undefined);
  const [token, setToken] = useState<TokenInfo | null>(null);
  const [authError, setAuthError] = useState<string>();
  const [collapsed, setCollapsed] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState('1');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [sideMenuItems, setSideMenuItems] = useState<ItemType<MenuItemType>[]>([
    {
      key: '1',
      icon: <BankOutlined />,
      label: 'Dashboard',
    },
    {
      key: '2',
      icon: <FileTextOutlined />,
      label: 'My Requests',
    },
    {
      key: '3',
      icon: <CreditCardOutlined />,
      label: 'Accounts',
    },
    {
      key: '4',
      icon: <DollarOutlined />,
      label: 'Transactions',
    },
    {
      key: '5',
      label: 'Services',
      icon: <SettingOutlined />,
      children: [],
    }
  ]);

  useEffect(() => {
    try {
      DemoBootstrap.getToken()
        .then(setToken)
    } catch (e) {
      setAuthError(e as string);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    (async () => {
      const types = await BootstrapService.getCaseTypes(`${DemoBootstrap.getServerUrl()}/app/${DemoBootstrap.getAppId()}`, token!);
      for (const casetype of types.caseTypes) {
        (casetype as any).caseTypeIcon = (await (await fetch(`${DemoBootstrap.getServerUrl()}/app/${DemoBootstrap.getAppId()}/api/application/v2/casetypes/${casetype.ID}/actions/Create`, {
          headers: {
            Authorization: `${token.token_type} ${token.access_token}`
          }
        })).json()).data.caseInfo.caseTypeIcon
      }

      (sideMenuItems[4] as any).children = types.caseTypes.map((type, idx) => ({
        key: type.ID,
        icon: toIcon((type as any).caseTypeIcon),
        label: type.name
      }))
      setSideMenuItems([...sideMenuItems]);
    })();
  }, [token]);

  const memoEmbed = useMemo(() => token && <PegaEmbed
    caseID={DemoBootstrap.getAction() === 'openCase' ? DemoBootstrap.getCaseId() : undefined}
    caseTypeID={DemoBootstrap.getAction() === 'createCase' ? DemoBootstrap.getCaseTypeId() : undefined}
    assignmentID={DemoBootstrap.getAction() === 'openAssignment' ? DemoBootstrap.getAssignmentId() : undefined}
    pageID={DemoBootstrap.getAction() === 'openPage' ? DemoBootstrap.getPageId() : undefined}
    className={DemoBootstrap.getAction() === 'openPage' ? DemoBootstrap.getPageClass() : undefined}
    infinityServer={DemoBootstrap.getServerUrl()}
    localeID={DemoBootstrap.getLocaleId()}
    appID={DemoBootstrap.getAppId()}
    token={token}
    authConfig={{
      ...DemoBootstrap.getAuthConfig(),
      // authType: 'custom'
    }}
    loadingDone={(status) => {
      // window.PCore.getDebugger().toggle();
      setLoadingStatus(status);
      props?.setTitle?.(
        window.PCore.getStore().getState().data['app/primary_1']?.caseInfo
          ?.caseTypeName
      );
      const endOfAssignment = window.PCore.getConstants().PUB_SUB_EVENTS.CASE_EVENTS.END_OF_ASSIGNMENT_PROCESSING;
      window.PCore.getPubSubUtils().subscribe(endOfAssignment, (args) => {
        console.log('End of assignment processing event received', args);
      }, endOfAssignment);

      const caseID = window.PCore.getStore().getState().data['app/primary_1']
        ?.caseInfo.ID;
      if (caseID) {
        DemoBootstrap.setAction('openCase');
        DemoBootstrap.setCaseId(caseID);
      }
    }}
  />, [token]);

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'My Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
    },
  ];

  const themeConfig = {
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: '#1890ff',
      borderRadius: 8,
    },
  };

  if (!token && !authError) {
    return (
      <ConfigProvider theme={themeConfig}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', maxHeight: '200px' }}>
          <Space direction="vertical" align="center">
            <Spin size="large" />
            <Text>Loading Labb Bank Portal...</Text>
          </Space>
        </div>
      </ConfigProvider>
    );
  }

  if (authError) {
    return (
      <ConfigProvider theme={themeConfig}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: 24 }}>
          <Alert
            message="Authentication Error"
            description={authError}
            type="error"
            showIcon
          />
        </div>
      </ConfigProvider>
    );
  }

  const toIcon = (iconName: string) => {
    switch (iconName) {
      case 'pi pi-user-solid': return <UserOutlined />;
      case 'pi pi-case-solid': return <FormOutlined />;
      case 'case-solid': return <FormOutlined />;
      case 'calculator-solid': return <CalculatorOutlined />;
      case 'calendar-solid': return <CalendarOutlined />;
    }
    return <FormOutlined />
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{
          background: '#001529',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', color: '#fff', marginRight: 16 }}
            />
            <img
              src={beBank}
              alt="Labb Bank Logo"
              style={{ height: 40, marginRight: 8 }}
            />
          </div>
          <Space size="large">
            <Button
              type="text"
              icon={isDarkMode ? <BulbFilled /> : <BulbOutlined />}
              onClick={() => setIsDarkMode(!isDarkMode)}
              style={{ fontSize: '18px', color: '#fff' }}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            />
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar src={profile} style={{ backgroundColor: '#1890ff' }} />
              </Space>
            </Dropdown>
          </Space>
        </Header>

        <Layout>
          <Sider
            breakpoint='md'
            collapsedWidth={0}
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            trigger={null}
            style={{
              background: isDarkMode ? 'black' : 'white',
              borderRight: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`,
            }}
          >
            <Menu
              mode="inline"
              selectedKeys={[selectedMenu]}
              items={sideMenuItems}
              style={{ borderRight: 0, paddingTop: 16 }}
              onSelect={async ({ key }) => {
                if (isNaN(+key)) {
                  await BootstrapService.createCase(key, 'app', {});
                  setSelectedMenu('5')
                } else {
                  setSelectedMenu(key);
                  if (key === '1') {
                    await BootstrapService.openPage('pyHome', 'Data-Portal', 'app');
                  }
                }
              }}
            />
          </Sider>

          <Layout style={{ padding: '24px' }}>
            <Content
              style={{
                minHeight: 280,
                background: isDarkMode ? 'black' : 'white',
                borderRadius: 8,
                width: '100%',
                maxWidth: '800px',
                margin: '0 auto'
              }}
            >
              {token && loadingStatus === undefined &&
                (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <Space direction="vertical" align="center">
                      <Spin size="large" />
                      <Text>Connecting to services...</Text>
                    </Space>
                  </div>
                )
              }
              {token && loadingStatus === false && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: 24 }}>
                  <Alert
                    message="Connection Error"
                    description="Unable to communicate with the server. Please try again later."
                    type="error"
                    showIcon
                  />
                </div>
              )
              }
              {memoEmbed}
            </Content>

            <Footer style={{ textAlign: 'center', background: 'transparent' }}>
              <Text type="secondary">
                Labb Be.Bank Self-Service Portal © 2025 | Powered by Labb DX Accelerator
              </Text>
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

render();
