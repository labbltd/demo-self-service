import { OAuth2Service } from '@labb/dx-engine';

export class DemoBootstrap {
    private static config = DemoBootstrap.init();

    private static init() {
        try {
            return JSON.parse(localStorage.getItem('LabbDemoConfig') || '');
        } catch (e) {
            return {
                appAlias: 'LabbCS',
                pegaServerUrl: 'https://labbconsulting05.pegalabs.io/prweb',
                accessTokenUrl: 'https://labbconsulting05.pegalabs.io/prweb/PRRestService/oauth2/v1/token',
                staticContentUrl: 'https://cs-cdn.constellation.pega.io/stage/8.24.51-236/react/prod',
                redirectUrl: `${new URL(window.location.href).pathname}auth.html`,
                authService: 'pega',
                clientId: '12113341416804660893',
                clientSecret: '8164B7AEA010D996DB47D3881D9DC4EB',
                localeId: 'en-US',
                pkce: false,
                caseTypeId: 'Labb-LabbCS-Work-Service-BikeTourBooking'
            };
        }
    }

    public static getCaseTypeId() {
        return DemoBootstrap.fromUrl('caseTypeId') || this.config.caseTypeId;
    }

    public static getServerUrl() {
        return DemoBootstrap.fromUrl('serverUrl') || this.config.pegaServerUrl;
    }
    public static getAppId() {
        return DemoBootstrap.fromUrl('appId') || this.config.appAlias;
    }
    public static getLocaleId() {
        return DemoBootstrap.fromUrl('localeId') || this.config.localeId;
    }

    public static async getToken() {
        return OAuth2Service.getTokenCredentials({
            accessTokenUrl: this.config.accessTokenUrl,
            clientId: this.config.clientId,
            clientSecret: this.config.clientSecret
        });
    }

    private static fromUrl(param: string) {
        return new URLSearchParams(window.location.search).get(param);
    }
}