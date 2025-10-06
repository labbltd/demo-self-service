import { OAuth2Config, OAuth2Service } from '@labb/dx-engine';

export class DemoBootstrap {
  public static getConfig() {
    let config;
    try {
      config = JSON.parse(localStorage.getItem('LabbDemoConfig') || '{}');
    } catch (e) {
      config = {};
    }
    for (const [key, value] of new URLSearchParams(window.location.search).entries()) {
      config[key] = ['true', 'false'].includes(value) ? value === 'true' : value;
    }

    return {
      ...this.defaultConfig(),
      ...config,
    };
  }

  private static defaultConfig() {
    return {
      accessTokenUrl: undefined,
      action: 'createCase',
      appAlias: 'LabbCS',
      assignmentId: 'ASSIGN-WORKLIST OOUG64-MORTGAGE-WORK M-138102!APPLICATIONINTAKE_FLOW',
      authFlow: 'client-credentials',
      authorizationUrl: undefined,
      authService: 'pega',
      caseId: '<Case ID>',
      casePage: 'assignment',
      caseTypeId: 'OOUG64-Mortgage-Work-MortgageApplication',
      clientId: '45081509181474503700',
      clientSecret: 'FF1BC82F3B232AAFE5DF31B7ECA6A637',
      labbified: false,
      labbLogo: 'https://labbltd.github.io/demo-self-service/img/Labb%20Dark%20Blue%20Logo-RGB-1.png',
      localeId: 'en-US',
      pageClass: 'Data-Portal',
      pageId: 'pyWorklist',
      password: '<Password>',
      pegaServerUrl: `https://labbconsulting05.pegalabs.io/prweb`,
      pkce: true,
      redirectUrl: `${new URL(window.location.href).pathname}auth.html`,
      staticContentUrl: 'https://cs-cdn.constellation.pega.io/prod/25.1.0-dev-15134/react/prod',
      useChat: false,
      username: '<Username>'
    } as { [key: string]: string | undefined | boolean };
  }

  public static getBookmark() {
    const defConfig = this.defaultConfig();
    const curConfig = this.getConfig();
    const params = new URLSearchParams();
    Object.keys(defConfig).forEach(key => {
      if (defConfig[key] !== curConfig[key]) {
        params.set(key, curConfig[key]);
      }
    });
    return window.location.origin + window.location.pathname + window.location.hash + '?' + params.toString();
  }

  public static updateConfig(prop: string, val: string) {
    console.log("updateConfig('%s', '%s')", prop, val);
    localStorage.setItem(
      'LabbDemoConfig',
      JSON.stringify({
        ...this.getConfig(),
        [prop]: val,
      }, null, 2)
    );
  }

  public static updateScenario(scenario: any) {
    if (scenario?.caseTypeId) {
      DemoBootstrap.setAction('createCase');
      DemoBootstrap.setCaseTypeId(scenario.caseTypeId);
    }
    if (scenario?.pageId) {
      DemoBootstrap.setAction('openPage');
      DemoBootstrap.setCaseTypeId(scenario.pageId);
      DemoBootstrap.setPageClass(scenario.pageClass);
    }
  }

  public static setScenarios(scenarios: any) {
    localStorage.setItem('LabbDemoScenarios', JSON.stringify(scenarios));
  }

  public static getScenarios() {
    return JSON.parse(localStorage.getItem('LabbDemoScenarios') || '[]');
  }

  public static setAction(action: string) {
    this.updateConfig('action', action);
  }

  public static setCaseTypeId(caseTypeId: string) {
    this.updateConfig('caseTypeId', caseTypeId);
  }

  public static setCaseId(caseId: string) {
    this.updateConfig('caseId', caseId);
  }

  public static setPageId(pageId: string) {
    this.updateConfig('pageId', pageId);
  }

  public static setPageClass(pageClass: string) {
    this.updateConfig('pageClass', pageClass);
  }

  public static setAccessTokenUrl(accessTokenUrl: string) {
    this.updateConfig('accessTokenUrl', accessTokenUrl);
  }

  public static setServerUrl(serverUrl: string) {
    this.updateConfig('pegaServerUrl', serverUrl);
  }

  public static getLabbLogo() {
    const config = this.getConfig();
    return config.labbified ? config.labbLogo : null;
  }

  public static getAction() {
    return this.getConfig().action;
  }

  public static getPageId() {
    return this.getConfig().pageId;
  }

  public static getAssignmentId() {
    return this.getConfig().assignmentId;
  }

  public static getPageClass() {
    return this.getConfig().pageClass;
  }

  public static getCasePage() {
    return this.getConfig().casePage;
  }

  public static getCaseTypeId() {
    return this.getConfig().caseTypeId;
  }

  public static getCaseId() {
    return this.getConfig().caseId;
  }

  public static getAccessTokenUrl() {
    return this.getConfig().accessTokenUrl ||
      `${this.getConfig().pegaServerUrl}/PRRestService/oauth2/v1/token`;
  }

  public static getAuthorizationUrl(): string {
    return this.getConfig().authorizationUrl ||
      `${this.getConfig().pegaServerUrl}/PRRestService/oauth2/v1/authorize`;
  }

  public static getPkce(): boolean {
    return this.getConfig().pkce;
  }

  public static getServerUrl() {
    return this.getConfig().pegaServerUrl;
  }
  public static getAppId() {
    return this.getConfig().appAlias;
  }
  public static getLocaleId() {
    return this.getConfig().localeId;
  }

  public static getAuthFlow() {
    return this.getConfig().authFlow;
  }

  public static getUsername() {
    return this.getConfig().username;
  }

  public static getPassword() {
    return this.getConfig().password;
  }

  public static getStaticContentUrl() {
    return this.getConfig().staticContentUrl;
  }

  public static getAuthService() {
    return this.getConfig().authService;
  }

  public static getClientId() {
    return this.getConfig().clientId;
  }

  public static getClientSecret() {
    return this.getConfig().clientSecret;
  }

  public static useChat() {
    return this.getConfig().useChat;
  }

  public static async getToken() {
    const config: OAuth2Config = {
      accessTokenUrl: this.getAccessTokenUrl(),
      clientId: this.getClientId(),
      clientSecret: this.getClientSecret(),
    };
    if (this.getAuthFlow() === 'password') {
      config.username = this.getUsername();
      config.password = this.getPassword();
      config.grantType = 'password';
    }
    if (this.getAuthFlow() === 'oauth2') {
      config.authorizationUrl = this.getAuthorizationUrl();
      config.appId = this.getAppId();
      config.authService = this.getAuthService();
      config.pkce = this.getPkce();
      return OAuth2Service.getTokenAuthorizationCode(config);
    }
    return OAuth2Service.getTokenCredentials(config);
  }
}
