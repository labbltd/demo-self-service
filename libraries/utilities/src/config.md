## Connectivity
```
pegaServerUrl: <URL ending with /prweb>
appAlias: <Application URL Alias>
localeId: <Locale ID>
```

## Functionality
```
action: createCase
caseTypeId: <Case Type ID>
```
```
action: openCase
caseId: <Case ID>
```
```
action: openAssignment
assignmentId: <Assignment ID>
```
```
action: openPage
pageId: <Page ID>
pageClass: <Page Classname>
```

## Authentication
```
clientId: <Client registration ID>>
clientSecret: <Client secret for server to server>
```
```
authFlow: oauth2
authService: <Auth service name, e.g. pega>
pkce: true | false
```
```
authFlow: password
username: <Operator id>
password: <Operator Password>
```