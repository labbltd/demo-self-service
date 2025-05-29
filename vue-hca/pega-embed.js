customElements.get("pega-embed") || customElements.define("pega-embed", class extends HTMLElement {
    #t = !0;
    #e = !1;
    #s = !0;
    #i = null;
    #n = null;
    #o = null;
    #a = null;
    #r = !1;
    #h = !1;
    #l;
    #c;
    #g;
    #d;
    #u = null;
    #p = null;
    #m = "app/primary";
    #C = [];
    #S = ["authCode", "customBearer", "clientCreds", "passwordCreds", "none"];
    #b = null;
    constructor() {
        super(),
        this.#n = this.#t ? null : "root",
        this.theme = {},
        this.startingFields = {},
        this.ssKeyTokenInfo = null,
        this.#t && !this.#s && this.#f()
    }
    set popupReauth(t) {
        this.setAttribute("popupReauth", t)
    }
    get popupReauth() {
        return "true" === this.getAttribute("popupReauth") && "authCode" === this.grantType
    }
    set authFailUI(t) {
        this.setAttribute("authFailUI", t)
    }
    get authFailUI() {
        return "false" !== this.getAttribute("authFailUI")
    }
    set noPopups(t) {
        this.setAttribute("noPopups", t)
    }
    get noPopups() {
        return "true" === this.getAttribute("noPopups")
    }
    set deferLoad(t) {
        this.setAttribute("deferLoad", t)
    }
    get deferLoad() {
        return "true" === this.getAttribute("deferLoad")
    }
    set autoReauth(t) {
        this.setAttribute("autoReauth", t)
    }
    get autoReauth() {
        return "true" === this.getAttribute("autoReauth")
    }
    set assignmentHeader(t) {
        this.setAttribute("assignmentHeader", t)
    }
    get assignmentHeader() {
        return "false" !== this.getAttribute("assignmentHeader")
    }
    set authHeader(t) {
        this.#p = t,
        this.#h && window.PCore?.getAuthUtils().setAuthorizationHeader && PCore.getAuthUtils().setAuthorizationHeader(t)
    }
    #E(t) {
        return this.#S.includes(t) ? t : this.#S[0]
    }
    set grantType(t) {
        this.setAttribute("grantType", this.#E(t))
    }
    get grantType() {
        let t = this.#E(this.getAttribute("grantType"));
        return "none" === t || this.getAttribute("clientId") || (t = "none"),
        t
    }
    #A() {
        const t = this.getAttribute("authHeader");
        t && (this.#p = t,
        this.removeAttribute("authHeader"))
    }
    #v() {
        const t = this.getAttribute("clientId");
        this.#g = `peCI_${t}`;
        const e = this.getAttribute("ssKeyTokenInfo");
        null !== e && (this.ssKeyTokenInfo = e),
        this.#d = this.ssKeyTokenInfo ? this.ssKeyTokenInfo : `peTI_${t}`
    }
    connectedCallback() {
        this.#k(),
        this.getAttribute("id") || this.setAttribute("id", `pe${Date.now()}`),
        "none" === this.grantType ? this.#A() : this.#v(),
        this.deferLoad || this.load()
    }
    disconnectedCallback() {
        this.#t,
        this.#P()
    }
    #f() {
        if (this.#t) {
            /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent) && (window.SC_DISABLE_SPEEDY = !0);
            const t = this.attachShadow({
                mode: this.#e ? "closed" : "open"
            });
            t.innerHTML = '<style>:host{display:block}</style>\n            <div id="styles" style="display:none"></div>\n            <div id="root"></div>',
            this.#a = t.getElementById("styles"),
            this.#o = t.getElementById("root"),
            Object.defineProperty(t, "defaultView", {
                value: window
            }),
            Object.defineProperty(t, "documentElement", {
                value: document.documentElement
            }),
            Object.defineProperty(this.#o, "ownerDocument", {
                value: t
            }),
            t.createElement = (...t) => document.createElement(...t),
            t.createElementNS = (...t) => document.createElementNS(...t),
            t.createTextNode = (...t) => document.createTextNode(...t),
            this.#y(!0)
        }
    }
    #k() {
        if (this.#s && this.#t && !this.#o && (this.#e = "closed" === this.getAttribute("shadowDOM"),
        this.#f()),
        !this.#t && !this.#o) {
            const t = document.createElement("div");
            t.id = "styles",
            this.append(t),
            t.style.display = "none",
            this.#a = t;
            const e = document.createElement("div");
            e.id = "root",
            this.append(e),
            this.#o = e,
            this.#y(!0)
        }
    }
    #T() {
        if (this.#l)
            return;
        this.#c = {
            en: {
                "Log in to access this content": "Log in to access this content",
                "Log in": "Log in"
            },
            da: {
                "Log in to access this content": "Log in om toegang te krijgen tot deze inhoud",
                "Log in": "Log in"
            },
            de: {
                "Log in to access this content": "Melden Sie sich an, um auf diesen Inhalt zuzugreifen",
                "Log in": "Einloggen"
            },
            es: {
                "Log in to access this content": "Inicie sesión para acceder al contenido",
                "Log in": "Iniciar sesión"
            },
            fr: {
                "Log in to access this content": "Connectez-vous pour accéder à ce contenu",
                "Log in": "Connexion"
            },
            it: {
                "Log in to access this content": "Accedi per accedere a questo contenuto",
                "Log in": "Accesso"
            },
            ja: {
                "Log in to access this content": "このコンテンツにアクセスするにはログインしてください",
                "Log in": "ログイン"
            },
            pt: {
                "Log in to access this content": "Faça login para acessar este conteúdo",
                "Log in": "Conecte-se"
            },
            sv: {
                "Log in to access this content": "Logga in för att komma åt detta innehåll",
                "Log in": "Logga in"
            }
        };
        let {languages: t} = window.navigator;
        void 0 === t && (t = [window.navigator.language]),
        t.forEach((t => {
            if (!this.#l) {
                const e = t.trim().split(/-|_/)[0];
                this.#c[e] && (this.#l = e)
            }
        }
        )),
        this.#l || (this.#l = "en")
    }
    #w(t) {
        return this.#l || this.#T(),
        this.#c[this.#l][t]
    }
    #I(t, e) {
        let s = {};
        try {
            s = JSON.parse(this.#U(t, e, !1))
        } catch (t) {}
        return s
    }
    #_(t, e) {
        const s = t ? window.sessionStorage.getItem(t) : null;
        let i = {};
        if (s)
            try {
                i = JSON.parse(s)
            } catch (e) {
                i = this.#I(t, s)
            }
        return e ? i[e] : i
    }
    #D(t, e) {
        e && 0 !== Object.keys(e).length ? window.sessionStorage.setItem(t, this.#U(t, JSON.stringify(e), !0)) : window.sessionStorage.removeItem(t)
    }
    #R(t, e) {
        const s = this.#_(t);
        Object.keys(e).forEach((t => {
            s[t] = e[t]
        }
        )),
        this.#D(t, s)
    }
    #U(t, e, s) {
        const i = t => {
            const e = t.length
              , i = e % 2;
            return t.substring(e / 2 + (s ? i : 0)) + t.substring(0, e / 2 + (s ? i : 0))
        }
          , n = t === this.#d;
        n && !s && (e = window.atob(i(e)));
        let o = s ? window.btoa(e) : window.atob(e);
        return n && s && (o = i(window.btoa(o))),
        o
    }
    #y(t) {
        this.#o.innerHTML = t ? '<style>\n        .progress-ring {\n            position: relative;\n            min-width: 16px;\n            min-height: 1px;\n            width: 32px;\n            height: 32px;\n        }\n        .progress-ring > svg {\n            display: block;\n            position: absolute;\n            height: 100%;\n        }\n        .progress-ring > svg circle:nth-child(2) {\n            stroke: #076bc9;\n            transition: stroke-dashoffset calc(0.5 * 0.25s) cubic-bezier(0.4,0.6,0.1,1);\n            animation: LoadingRing calc(4 * 0.25s) linear infinite;\n        }\n        .progress-ring > svg circle {\n            fill: transparent;\n            stroke: #f5f5f5;\n            stroke-width: 2;\n            r: 45%;\n            cx: 50%;\n            cy: 50%;\n            transform: rotate(-90deg);\n            transform-origin: 50% 50%;\n        }\n        @keyframes LoadingRing {\n           0% {\n                transform: rotate(0deg);\n            }\n            100% {\n              transform: rotate(360deg);\n            }\n        }\n        .progress-wrapper {\n            padding:32px 0px;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n        }\n        </style>\n        <div class="progress-wrapper">\n          <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuetext="Loading" class="progress-ring">\n            <svg viewBox="0 0 20 20">\n              <circle></circle>\n              <circle stroke-dasharray="56.548667764616276" style="stroke-dashoffset: 37.8876;"></circle>\n            </svg>\n          </div>\n        <div>' : ""
    }
    #N() {
        return new Promise(( (t, e) => {
            if (this.#u)
                t(this.#u);
            else {
                let s = null || this.staticContentUrl;
                s = s?.replace(/\/$/, ""),
                import(`${s}/embed/auth.js`).then((e => (this.#u = e.default,
                t(this.#u)))).catch((t => e(t)))
            }
        }
        ))
    }
    #O = () => new Promise(( (t, e) => {
        if (this.staticContentBuild) {
            const e = "true" === this.staticContentBuild ? "" : `${this.staticContentBuild}/`;
            return this.constellationConfig.staticContentServerUrl = `${this.staticContentUrl}/${e}`,
            void t(!0)
        }
        const s = this.constellationConfig.authorizationHeader ? null : this.constellationConfig.authInfo?.tokenInfo
          , i = this.constellationConfig.authorizationHeader || (s ? `${s.token_type} ${s.access_token}` : "")
          , n = this.getAttribute("appAlias");
        let o = "";
        n && (o = `/app/${n}`),
        fetch(`${this.constellationConfig.restServerUrl}${o}/api/application/v2/data_views/D_pxBootstrapConfig`, {
            method: "GET",
            headers: i ? new Headers({
                Authorization: i
            }) : new Headers
        }).then((t => {
            if (t.ok)
                this.loginRetries = 0;
            else if (401 === t.status)
                return this.loginRetries++,
                this.loginRetries < 2 && this.#B(),
                null;
            return t.json()
        }
        )).then((s => {
            if (s) {
                const e = JSON.parse(s.pyConfigJSON);
                this.constellationConfig.appStaticContentServer = e.serviceConfig.appStaticContentServer,
                t(!0)
            } else
                e(!1)
        }
        )).catch((t => {
            console.log(`D_pxBootstrapConfig load failed: ${t}`),
            e(!1)
        }
        ))
    }
    ));
    #L() {
        const t = () => {
            this.#i.bootstrapWithAuthHeader(this.constellationConfig, this.#n, [], this.#o, this.#a).then(( () => {
                console.log("Bootstrap successful!"),
                this.action = this.getAttribute("action"),
                this.#x()
            }
            )).catch((t => {
                console.log(`Bootstrap failed. ${t}`),
                this.#$()
            }
            ))
        }
        ;
        this.#i ? t() : this.#O().then(( () => {
            const e = `${Date.now()}`;
            import(`${this.constellationConfig.staticContentServerUrl}bootstrap-shell.js?&v=${e}`).then((e => {
                this.#i = e,
                t()
            }
            )).catch((t => {
                console.log(t)
            }
            ))
        }
        ))
    }
    #H(t) {
        if (t && t.access_token) {
            t.session_index && this.#R(this.#g, {
                sessionIndex: t.session_index
            }),
            this.#R(this.#d, t);
            const e = this.#_(this.#d);
            "customBearer" === this.grantType ? (this.authHeader = `${e.token_type} ${e.access_token}`,
            this.constellationConfig.authorizationHeader = this.#p) : (this.#h && window.PCore && PCore.getAuthUtils().setTokens(e),
            this.constellationConfig.authInfo.tokenInfo = e)
        }
    }
    #M() {
        if ("customBearer" === this.grantType && this.#b)
            try {
                const t = this.#b();
                t && this.#R(this.#g, {
                    customTokenParams: t
                })
            } catch (t) {
                console.error(`Error on customTokenParams callback. ${t}`)
            }
    }
    async login(t=!1) {
        return new Promise((e => {
            if ("none" === this.grantType)
                return void e();
            this.#N().then((s => {
                this.#M();
                new s(this.#g).login().then((e => {
                    this.#H(e),
                    t || this.#L()
                }
                )).catch((t => {
                    const e = (t => {
                        let e;
                        switch (t) {
                        case "blocked":
                            e = "popup_blocked";
                            break;
                        case "closed":
                            e = "login_cancelled";
                            break;
                        case "no-popups":
                            e = "popup_disallowed";
                            break;
                        default:
                            e = "server_error"
                        }
                        return e
                    }
                    )(t);
                    if (this.#y(!1),
                    this.#F(e),
                    this.authFailUI && ("blocked" === t || "closed" === t || "no-popups" === t)) {
                        const t = this.getAttribute("id");
                        this.#o.innerHTML = `<div style="font-family:'Open Sans',sans-serif;padding:32px 0px 32px 0px;min-height:64px;text-align:center">\n                      <div><img src="${this.staticContentUrl}/embed/lock-closed-solid.svg" style="width:3rem;height:3rem" /></div>\n                      <div style="padding:2rem 0px 1rem 0px">${this.#w("Log in to access this content")}</div>\n                      <button style="\n                      color: rgb(7, 107, 201);\n                      background-color: rgb(255, 255, 255);\n                      display: inline-flex;\n                      align-items: center;\n                      outline: none;\n                      text-decoration: none;\n                      transition: all calc(0.125s) cubic-bezier(0.4, 0.6, 0.1, 1) 0s;\n                      cursor: pointer;\n                      justify-content: center;\n                      line-height: 1;\n                      border: 0.0625rem solid rgb(7, 107, 201);\n                      position: relative;\n                      min-height: 32px;\n                      min-width: 32px;\n                      border-radius: calc(4999.5rem);\n                      user-select: none;\n                      padding: 0px 1rem;" onclick="document.getElementById('${t}').login()">${this.#w("Log in")}</button>\n                    </div>`
                    }
                }
                )).finally(( () => {
                    e()
                }
                ))
            }
            ))
        }
        ))
    }
    setCustomTokenParamsCB(t) {
        "function" == typeof t && (this.#b = t)
    }
    #$() {
        if (this.autoReauth) {
            const t = this.#_(this.#d);
            t.access_token = null,
            t.refresh_token = null,
            this.#R(this.#d, t),
            this.constellationConfig.authorizationHeader = null,
            this.login(!0)
        } else {
            const t = new Event("embedreauth");
            this.dispatchEvent(t)
        }
    }
    #V(t) {
        this.#N().then((e => {
            new e(this.#g).refreshToken(t.refresh_token).then((t => {
                t && t.access_token ? (this.#H(t),
                this.#L()) : this.#$()
            }
            ))
        }
        ))
    }
    #B() {
        if (this.#p)
            this.#z(),
            this.#L();
        else {
            const t = this.#_(this.#d);
            t?.refresh_token ? this.#V(t) : this.#$()
        }
    }
    #F(t) {
        const e = new Event("embedauthfail");
        e.detail = t,
        this.dispatchEvent(e)
    }
    #z() {
        const t = new Event("embedreauth");
        this.dispatchEvent(t)
    }
    #K(t) {
        this.#R(this.#d, t)
    }
    #j() {
        const t = new Event("embedcaseopened");
        this.dispatchEvent(t)
    }
    #G() {
        const t = new Event("embedcaseclosed");
        this.dispatchEvent(t)
    }
    #J() {
        const t = new Event("embedassignmentopened");
        this.dispatchEvent(t)
    }
    #W() {
        const t = new Event("embedeventcancel");
        this.dispatchEvent(t)
    }
    #q() {
        const t = new Event("embedassignmentsubmission");
        this.dispatchEvent(t)
    }
    #Y() {
        "createCase" === this.action && (this.assignmentID = null,
        this.#Q("assignmentID"));
        const t = new Event("embedprocessingend");
        this.dispatchEvent(t)
    }
    #X() {
        const t = new Event("embedcloseconfirmview");
        this.dispatchEvent(t)
    }
    #Z(t, e, s) {
        t && (PCore.getPubSubUtils().subscribe(t, e, s),
        this.#C.push({
            sEvent: t,
            sName: s
        }))
    }
    #P() {
        if (window.PCore && this.#C?.length) {
            const t = PCore.getPubSubUtils();
            let e = this.#C.pop();
            for (; e; )
                t.unsubscribe(e.sEvent, e.sName),
                e = this.#C.pop()
        }
    }
    #tt() {
        this.#h = !0,
        "none" === this.grantType ? this.#Z(PCore.getConstants().PUB_SUB_EVENTS.EVENT_CUSTOM_REAUTH, this.#z.bind(this), "peDoReauth") : this.#Z("customBearer" === this.grantType ? PCore.getConstants().PUB_SUB_EVENTS.EVENT_CUSTOM_REAUTH : PCore.getConstants().PUB_SUB_EVENTS.EVENT_FULL_REAUTH, this.#$.bind(this), "peDoFullReauth"),
        this.#Z(PCore.getConstants().PUB_SUB_EVENTS.CASE_EVENTS.CASE_OPENED, this.#j.bind(this), "peDoCaseOpened"),
        this.#Z(PCore.getConstants().PUB_SUB_EVENTS.CASE_EVENTS.CASE_CLOSED, this.#G.bind(this), "peDoCaseClosed"),
        this.#Z(PCore.getConstants().PUB_SUB_EVENTS.CASE_EVENTS.ASSIGNMENT_OPENED, this.#J.bind(this), "peDoAssignmentOpened"),
        this.#Z(PCore.getConstants().PUB_SUB_EVENTS.EVENT_CANCEL, this.#W.bind(this), "peDoEventCancel"),
        this.#Z(PCore.getConstants().PUB_SUB_EVENTS.CASE_EVENTS.ASSIGNMENT_SUBMISSION, this.#q.bind(this), "peDoAssignmentSubmission"),
        this.#Z(PCore.getConstants().PUB_SUB_EVENTS.CASE_EVENTS.END_OF_ASSIGNMENT_PROCESSING, this.#Y.bind(this), "peDoEndOfAssignmentProcessing"),
        this.#Z(PCore.getConstants().PUB_SUB_EVENTS.CASE_EVENTS.CLOSE_CONFIRM_VIEW, this.#X.bind(this), "peDoCloseConfirmView"),
        "createCase" === this.action ? (this.assignmentID = this.getEmbedData("nextAssignmentInfo.ID"),
        this.#R(this.#g, {
            assignmentID: this.assignmentID
        })) : (this.assignmentID = null,
        this.#Q("assignmentID"));
        const t = new Event("embedready");
        this.dispatchEvent(t)
    }
    #et(t, e) {
        const s = {};
        if (["clientId", "clientSecret", "authService", "authorizeUri", "tokenUri", "revokeUri", "redirectUri", "userIdentifier", "password", "silentTimeout"].forEach((t => {
            const e = this.getAttribute(t);
            t && e && (s[t] = e)
        }
        )),
        s.appAlias = e,
        s.grantType = this.grantType,
        s.tokenUri || (s.tokenUri = `${t}/PRRestService/oauth2/v1/token`),
        s.revokeUri || (s.revokeUri = `${t}/PRRestService/oauth2/v1/revoke`),
        "authCode" === this.grantType) {
            if (s.authorizeUri || (s.authorizeUri = `${t}/PRRestService/oauth2/v1/authorize`),
            s.redirectUri || (s.redirectUri = `${this.staticContentUrl}/embed/auth.html`),
            s.silentTimeout) {
                const t = parseInt(s.silentTimeout, 10);
                "number" == typeof t ? s.silentTimeout = t : delete s.silentTimeout
            }
            s.iframeLoginUI = "true" === this.getAttribute("iframeLoginUI"),
            s.noPopups = this.noPopups
        }
        return s
    }
    async load() {
        this.#y(!0),
        this.#h = !1,
        this.loginRetries = 0;
        const t = document.getElementsByTagName("pega-embed");
        if (t.length > 1 && this !== t[0])
            return console.error("Multiple pega-embed elements detected on same page. Unsupported."),
            void this.#y(!1);
        this.#P();
        let e = this.getAttribute("pegaServerUrl");
        e = e?.replace(/\/$/, "");
        const s = this.getAttribute("appAlias");
        let i = this.getAttribute("staticContentUrl");
        i = i?.replace(/\/$/, ""),
        this.staticContentUrl = i,
        this.staticContentBuild = this.getAttribute("staticContentBuild");
        const n = this.getAttribute("theme");
        if (null !== n)
            try {
                this.theme = JSON.parse(n)
            } catch (t) {
                this.theme = {}
            }
        if (this.constellationConfig = {
            authorizationHeader: null,
            appStaticContentServer: null,
            staticContentServerUrl: `${i}/`,
            restServerUrl: e,
            appAlias: s,
            dynamicSetCookie: !0,
            theme: this.theme,
            renderingMode: "EMBED"
        },
        "none" === this.grantType)
            this.constellationConfig.authorizationHeader = this.#p,
            this.#L();
        else {
            this.#st() ? await this.logout() : this.#Q("userIdentifier,password");
            const t = this.#et(e, s);
            this.#R(this.#g, t);
            const i = this.#_(this.#d);
            "customBearer" === this.grantType ? i && (this.#p = `${i.token_type} ${i.access_token}`,
            this.constellationConfig.authorizationHeader = this.#p) : this.constellationConfig.authInfo = {
                authType: "OAuth2.0",
                tokenInfo: i,
                popupReauth: this.popupReauth,
                client_id: t.clientId,
                authentication_service: t.authService,
                redirect_uri: t.redirectUri,
                endPoints: {
                    authorize: t.authorizeUri,
                    token: t.tokenUri,
                    revoke: t.revokeUri
                },
                onTokenRetrieval: this.#K.bind(this)
            },
            i?.access_token ? this.#L() : this.login()
        }
    }
    reload() {
        this.#r = !0,
        "createCase" === this.action && (this.action = "openAssignment",
        this.assignmentID || (this.assignmentID = this.getEmbedData("nextAssignmentInfo.ID"))),
        this.#x(),
        this.#r = !1
    }
    #it(t, e) {
        PCore.getMashupApi().getNextWork && PCore.getMashupApi().getNextWork(t, e).then(( () => {
            this.#tt()
        }
        ))
    }
    #nt() {
        const t = ["assignment", "assignmentWithStages", "full"];
        let e = this.getAttribute("casePage");
        e || (e = t[0]);
        const s = t.indexOf(e);
        return -1 === s ? e : ["pyEmbedAssignment", "pyEmbedAssignmentWithStages", "pyDetails"][s]
    }
    #ot(t) {
        let e = this.getAttribute("startingFields");
        if (null !== e) {
            e = e.replace(/([{:,])'/g, '$1"').replace(/'([}:,])/g, '"$1');
            try {
                this.startingFields = JSON.parse(e)
            } catch (t) {
                this.startingFields = {},
                console.log(`Invalid JSON for startingFields: ${e}`)
            }
        }
        t.startingFields = this.startingFields
    }
    #at() {
        const t = {}
          , e = this.#nt();
        return e && ("openPage" === this.action ? t.defaultCasePage = e : t.pageName = e),
        t.disableAssignmentHeader = !this.assignmentHeader,
        "createCase" === this.action && this.#ot(t),
        t
    }
    #x() {
        if (!PCore)
            return;
        const t = PCore.getConstants().APP.APP
          , e = this.#at();
        switch (this.action) {
        case "createCase":
            PCore.getMashupApi().createCase(this.getAttribute("caseTypeID"), t, e).then(( () => {
                this.#tt()
            }
            ));
            break;
        case "openCase":
            PCore.getMashupApi().openCase(this.getAttribute("caseID"), t, e).then(( () => {
                this.#tt()
            }
            ));
            break;
        case "openAssignment":
            this.#r || (this.assignmentID = this.getAttribute("assignmentID")),
            PCore.getMashupApi().openAssignment(this.assignmentID, t, e).then(( () => {
                this.#tt()
            }
            ));
            break;
        case "openPage":
            PCore.getMashupApi().openPage(this.getAttribute("pageID"), this.getAttribute("pageClass"), t, e).then(( () => {
                this.#tt()
            }
            ));
            break;
        case "getNextWork":
            this.#it(t, e)
        }
    }
    #st() {
        let t = !1;
        const e = this.#_(this.#g)
          , {authorizeUri: s, sessionIndex: i} = e;
        if (i && ((s && 0 !== s.indexOf(this.getAttribute("pegaServerUrl")) || this.grantType !== e.grantType) && (t = !0),
        !t)) {
            const s = ["clientId", "appAlias", "clientSecret", "authService", "userIdentifier"];
            for (let i = 0; i < s.length; i += 1) {
                const n = s[i]
                  , o = this.getAttribute(n)
                  , a = e[n];
                if (a !== o && (void 0 !== a || null !== o)) {
                    console.log(`Clearing credentials due to mismatch for attribute: ${n};config value (${a}) does not match element attribute value (${o})`),
                    console.log(`config: ${JSON.stringify(e)}`),
                    t = !0;
                    break
                }
            }
        }
        return t
    }
    #Q(t) {
        const e = this.#_(this.#g);
        if (e && t) {
            let s = !1;
            const i = t.split(",");
            for (let t = 0; t < i.length; t++)
                e[i[t]] && (delete e[i[t]],
                s = !0);
            s && this.#D(this.#g, e)
        }
    }
    #rt() {
        const t = "openPage" === this.action
          , e = t ? this.#m : `${PCore.getContainerUtils().getActiveContainerItemName(this.#m)}/workarea`
          , s = PCore.getContainerUtils().getActiveContainerItemContext(e)
          , i = t ? "" : PCore.getConstants().CASE_INFO.CASE_INFO_CONTENT;
        return PCore.getMashupApi().getCurrentContextAPI(i, s)
    }
    getEmbedData(t) {
        return this.#rt().getValue(t)
    }
    setEmbedData(t, e) {
        this.#rt().setValue(t, e)
    }
    getEmbedInfo() {
        const t = "openPage" === this.action ? this.#m : `${PCore.getContainerUtils().getActiveContainerItemName(this.#m)}/workarea`
          , e = PCore.getContainerUtils().getActiveContainerItemContext(t)
          , s = PCore.getFormUtils().getChanges(e);
        return {
            isLoaded: this.#h,
            isDirty: 0 !== Object.keys(s).length
        }
    }
    updateTokens(t) {
        this.#H(t)
    }
    async logout() {
        this.#P();
        const t = this.#_(this.#d);
        if (t && t.access_token) {
            const e = () => {
                this.#D(this.#d, null),
                this.#D(this.#g, null)
            }
            ;
            window.PCore && "authCode" === this.grantType ? await PCore.getAuthUtils().revokeTokens().then(( () => {
                e()
            }
            )).catch((t => {
                console.log("Error:", t?.message)
            }
            )) : await this.#N().then((s => {
                new s(this.#g).revokeTokens(t.access_token, t.refresh_token).then(( () => {
                    e()
                }
                ))
            }
            )).catch((t => {
                console.log("Error:", t?.message)
            }
            ))
        }
        this.#o.innerHTML = ""
    }
}
);
