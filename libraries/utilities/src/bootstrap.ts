import { OAuth2Config, OAuth2Service } from '@labb/dx-engine';

export class DemoBootstrap {
    private static getConfig() {
        let config;
        try {
            config = JSON.parse(localStorage.getItem('LabbDemoConfig')!);
        } catch (e) {
            config = {};
        }
        return {
            pegaServerUrl: 'https://labbconsulting05.pegalabs.io/prweb',
            accessTokenUrl: 'https://labbconsulting05.pegalabs.io/prweb/PRRestService/oauth2/v1/token',
            staticContentUrl: 'https://cs-cdn.constellation.pega.io/stage/8.24.51-236/react/prod',
            redirectUrl: `${new URL(window.location.href).pathname}auth.html`,
            authService: 'pega',
            clientId: '12113341416804660893',
            clientSecret: '8164B7AEA010D996DB47D3881D9DC4EB',
            localeId: 'en-GB',
            pkce: false,
            caseTypeId: 'Labb-LabbCS-Work-Service-InsuranceIssuance',
            appAlias: 'LabbCS',
            username: 'demo@PW25',
            password: 'Labb@PW#32',
            authFlow: 'password',
            ...config
        }
    }

    private static updateConfig(prop: string, val: string) {
        localStorage.setItem('LabbDemoConfig', JSON.stringify({
            ...this.getConfig(),
            [prop]: val
        }))
    }

    public static setCaseTypeId(caseTypeId: string) {
        this.updateConfig('caseTypeId', caseTypeId);
    }

    public static setAccessTokenUrl(accessTokenUrl: string) {
        this.updateConfig('accessTokenUrl', accessTokenUrl);
    }

    public static setServerUrl(serverUrl: string) {
        this.updateConfig('pegaServerUrl', serverUrl);
    }

    public static getCaseTypeId() {
        return this.getConfig().caseTypeId;
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