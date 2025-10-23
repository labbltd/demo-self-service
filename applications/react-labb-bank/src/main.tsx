import {
  BankOutlined,
  BulbFilled,
  BulbOutlined,
  CreditCardOutlined,
  DollarOutlined,
  FileTextOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import { TokenInfo } from '@labb/constellation-core-types';
import { DemoBootstrap } from '@labb/demo-utilities';
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
import { Suspense, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './pega/ContainerMapping';
import logo from './public/Labb White Logo-RGB.png';
import profile from './public/team-4.jpeg';

const { Header, Content, Sider, Footer } = Layout;
const { Title, Text } = Typography;

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
  const [token, setToken] = useState<TokenInfo>();
  const [showEmbed, setShowEmbed] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string>();
  const [collapsed, setCollapsed] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState('1');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const action = DemoBootstrap.getAction();

  useEffect(() => {
    try {
      DemoBootstrap.getToken().then(setToken);
    } catch (e) {
      setAuthError(e as string);
    }
  }, []);

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

  const sideMenuItems = [
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
      icon: <SettingOutlined />,
      label: 'Services',
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
              src={logo}
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
              onSelect={({ key }) => setSelectedMenu(key)}
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
              {
                token && loadingStatus === false && (
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
              {/* <Button onClick={async () => {
                window.PCore.getAuthUtils().revokeTokens();
              }}>Refresh case</Button> */}
              {token && showEmbed ? (
                <PegaEmbed
                  caseID={action === 'openCase' ? DemoBootstrap.getCaseId() : undefined}
                  caseTypeID={action === 'createCase' ? DemoBootstrap.getCaseTypeId() : undefined}
                  pageID={action === 'openPage' ? DemoBootstrap.getPageId() : undefined}
                  className={action === 'openPage' ? DemoBootstrap.getPageClass() : undefined}
                  infinityServer={DemoBootstrap.getServerUrl()}
                  localeID={DemoBootstrap.getLocaleId()}
                  appID={DemoBootstrap.getAppId()}
                  token={token}
                  authConfig={{
                    ...DemoBootstrap.getAuthConfig(),
                    // authType: 'custom'
                  }}
                  loadingDone={(status) => {
                    setLoadingStatus(status);
                    props?.setTitle?.(
                      window.PCore.getStore().getState().data['app/primary_1']?.caseInfo
                        ?.caseTypeName
                    );
                    const endOfAssignment = window.PCore.getConstants().PUB_SUB_EVENTS.CASE_EVENTS.END_OF_ASSIGNMENT_PROCESSING;
                    window.PCore.getPubSubUtils().subscribe(endOfAssignment, (args) => {
                      console.log('End of assignment processing event received', args);
                    }, endOfAssignment);

                    const custReauth = window.PCore.getConstants().PUB_SUB_EVENTS.EVENT_CUSTOM_REAUTH;
                    window.PCore.getPubSubUtils().subscribe(custReauth, async (args) => {
                      console.log('Custom Re-Authentication', args);
                      setShowEmbed(false);
                      const token = await DemoBootstrap.getToken()
                      if (window.PCore) {
                        window.PCore.getPubSubUtils().publish('updateSession', { updateStatus: 'success' });
                      }
                      setTimeout(() => {
                        setToken(token);
                        setShowEmbed(true);
                      }, 2000)
                    }, custReauth);

                    const caseID = window.PCore.getStore().getState().data['app/primary_1']
                      ?.caseInfo.ID;
                    if (caseID) {
                      DemoBootstrap.setAction('openCase');
                      DemoBootstrap.setCaseId(caseID);
                    }
                  }}
                />
              ) : <pre>PegaEmbed removed</pre>}
            </Content>

            <Footer style={{ textAlign: 'center', background: 'transparent' }}>
              <Text type="secondary">
                Labb Bank Self-Service Portal © 2025 | Powered by Labb DX Accelerator
              </Text>
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

render();
