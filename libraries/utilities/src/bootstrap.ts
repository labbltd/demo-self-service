import { OAuth2Config, OAuth2Service } from '@labb/dx-engine';

export class DemoBootstrap {
    public static getConfig() {
        let config;
        try {
            config = JSON.parse(localStorage.getItem('LabbDemoConfig')!);
        } catch (e) {
            config = {};
        }
        return {
            localeId: 'en-US',
            appAlias: 'LabbCS',
            caseTypeId: 'Labb-LabbCS-Work-Service-InsuranceIssuance',
            caseId: 'Labb-LabbCS-Work-Service-InsuranceIssuance',
            action: 'openPage',
            pageId: 'pyWorklist',
            pageClass: 'Data-Portal',
            casePage: 'assignment',
            pegaServerUrl: 'https://labbconsulting05.pegalabs.io/prweb',
            accessTokenUrl: 'https://labbconsulting05.pegalabs.io/prweb/PRRestService/oauth2/v1/token',
            useChat: true,
            staticContentUrl: 'https://cs-cdn.constellation.pega.io/stage/8.24.51-236/react/prod',
            clientId: '12113341416804660893',
            clientSecret: '8164B7AEA010D996DB47D3881D9DC4EB',
            authFlow: 'password',
            username: 'demo@PW25',
            password: 'Labb@PW#32',
            authService: 'pega',
            redirectUrl: `${new URL(window.location.href).pathname}auth.html`,
            pkce: false,
            labbified: false,
            labbLogo: 'https://labbltd.github.io/demo-self-service/img/Labb%20Dark%20Blue%20Logo-RGB-1.png',
            ...config
        }
    }

    public static updateConfig(prop: string, val: string) {
        console.log('updateConfig("%s", "%s")', prop, val);
        localStorage.setItem('LabbDemoConfig', JSON.stringify({
            ...this.getConfig(),
            [prop]: val
        }));
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
        return this.getConfig().accessTokenUrl;
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
            clientSecret: this.getClientSecret()
        };
        if (this.getAuthFlow() === 'password') {
            config.username = this.getUsername();
            config.password = this.getPassword();
            config.grantType = 'password';
        }
        return OAuth2Service.getTokenCredentials(config);
    }
}