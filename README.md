# **Team Flow: gestione tasks**

## **Prerequisiti:** 

### - Per l'utilizzo:

*  Avere un browser recente ( Chrome, Firefox, Safari...ecc ).

### - Per lo sviluppo, richiede npm:

* Installare tutte le dipendenze tramite `npm`
* Creare e compilare adeguatamente il file `.env` seguendo le indicazione del file `.env.develompment`
* Per il back-end info a questo [link](https://github.com/giovannipacelli2/teamflow_be)

Comando di installazione:

    npm install

Comando di avvio:

    npm run start

Comando compilazione api:

    npm generate-api

Indicare in package.json il percorso dove risiede il file swagger di input.

</br>

## **Linguaggi e framework utilizzati:** 

* HTML, CSS, JavaScript, TypeScript, React.

## **Funzioni principali:** 

* Creazione ed eliminazione account
* Modifica informazioni personali
* Creazione, modifica ed eliminazione task
* Possibilità di visualizzare task condivisi da altri utenti
* Possibilità di aggiungere commenti ai task propri e di altri utenti

<br></br>

# Organizzazione dei file:


## Cartella `./src` contiene:

* il file `index.tsx` ovvero **l'entry** point dell'app, essa renderizza il componente `App` avvolto da `<QueryClientProvider>` che gestisce le chiamate al server e `<AppProvider>` che si occupa di gestire stati e funzioni condivise.

* `App.tsx` contiene l'intera struttura di routing e incorpora le logiche di accesso/autenticazione.

## Cartella `./api` contiene:

* cartella creata automaticamente utilizzando swagger, lanciando il comando `npm run generate-api` necessita di java per essere lanciato. Al suo interno ci tutte le funzioni già pronte per comunicare con il server.

## Cartella `./components` contiene:

* tutti i componenti che vengono utilizzati.

## Cartella `./context` contiene:

* `context.tsx` gestisce funzioni e variabli globali per autenticazione e gestione dell'utente corrente
* `alertContext.tsx` rende disponibili una serie di funzionalità legate agli alert 

## Cartella `./hooks` contiene tutte le custom hooks:

* gestione dati server: `authHook.tsx`, `useAccount.tsx` e `useTodos.tsx`
* gestione cookie: `useCookie.tsx`
* gestione crittografia: `useCrypto.tsx`
* gestione loader (UI): `useLoading.tsx`

## Cartella `./interceptors` contiene:

* un interceptor che aggiunge il token di autorizzazione alle richeste prima che esse partano
* un interceptor che si occupa di gestire il logout/invalidare la sessione se una richiesta fallisce (401)

## Cartella `./library` contiene una serie di funzioni riutilizzabili

## Cartella `./pages` contiene:

* Tutte le pagine

* `rootPage.tsx` che viene mostrato sempre e renderizzato per primo, si occupa di gestire correttamente il redirect in caso di mancata autenticazione o in caso di refresh page.

* `DashboardPage.tsx` contiene l'insieme di rotte dove vi si può accedere solo se autenticati

## Cartella `./reducers` contiene i pezzi dello stato globale:

* salva i dati dell'utente corrente ed i dati relativi all'autenticazione

## Cartella `./routerConfig` contiene la gestione del routing:

* `./Redirect.tsx` interviene quando si cerca di accedere alla rotta `/` questo può succedere all'avvio dell'app o dopo un refresh. Nel caso in cui non si è autenticati si viene reindirizzati alla login, altrimenti alla pagina principale.

* `./PrivateRoute.tsx` interviene ogni volta che si cambia rotta nel range delle rotte autenticate, salva in un context la rotta corrente e verifica se si è loggati altrimenti blocca la navigazione. La rotta corrente servirà poi a RootPage in caso di refresh o in caso si visiti `/` oppure quando si visita `/login` mentre si è loggati.

* `./routes.ts` contiene gli enums con i nomi delle rotte e un oggetto `Routes` che contiene i path completi di tutte le rotte

</br>


## # [Team Flow](https://teamflow.gplans.it/login)


### 1. Clicca su "registrati" per creare un nuovo utente
![Step 1 screenshot](https://images.tango.us/workflows/b24040f1-248f-4edb-97e7-4584ddfb66ad/steps/ba73211a-5340-4fb9-9340-8d4f55fb07b2/3dde932c-7041-4499-a80a-a4662f972591.png?crop=focalpoint&fit=crop&fp-x=0.4319&fp-y=0.6601&fp-z=2.8788&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=518&mark-y=333&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xNjQmaD02MSZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 2. Dopo aver compilato tutti i campi premi su SIGN UP per confermare la registrazione
![Step 2 screenshot](https://images.tango.us/workflows/b24040f1-248f-4edb-97e7-4584ddfb66ad/steps/c5474ad0-87c5-420b-b718-79a6db9aa339/ae50146f-c7f7-4048-805e-eecbbaa2f5aa.png?crop=focalpoint&fit=crop&fp-x=0.5003&fp-y=0.5958&fp-z=1.7996&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=324&mark-y=332&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz01NTImaD02MyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 3. Ora potrai accedere con il tuo nuovo account
![Step 3 screenshot](https://images.tango.us/workflows/b24040f1-248f-4edb-97e7-4584ddfb66ad/steps/b600a968-a2a6-454e-bc7f-cf8e0e9916c7/d523d2c0-b426-4dc3-bda7-8de31422ee28.png?crop=focalpoint&fit=crop&fp-x=0.5003&fp-y=0.6119&fp-z=1.8038&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=325&mark-y=332&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz01NTEmaD02MyZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 4. Fai click su AGGIUNGI per creare un nuovo task
![Step 4 screenshot](https://images.tango.us/workflows/b24040f1-248f-4edb-97e7-4584ddfb66ad/steps/ca31ee98-bb6a-406e-aadc-73a9846865fa/2cbbe0d4-ae3c-4eb1-a9c4-7ce1a28214ef.png?crop=focalpoint&fit=crop&fp-x=0.8787&fp-y=0.1397&fp-z=2.8721&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=634&mark-y=242&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yOTUmaD0xMDEmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D)


### 5. Inserisci i dati nei campi e premi poi su CONFERMA
![Step 5 screenshot](https://images.tango.us/workflows/b24040f1-248f-4edb-97e7-4584ddfb66ad/steps/bd201b41-e8e2-4110-bdbb-ff27bb3d5a1c/e7f8388e-0036-486e-8e7b-920498b5d977.png?crop=focalpoint&fit=crop&fp-x=0.4961&fp-y=0.5503&fp-z=1.4112&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=253&mark-y=310&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02OTMmaD0xMDgmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D)


### 6. Premi qui per condividere il task con un altro utente
![Step 6 screenshot](https://images.tango.us/workflows/b24040f1-248f-4edb-97e7-4584ddfb66ad/steps/621010c0-5e81-4bdc-8ebc-0e6efe1cd6f0/ffcd84d7-7977-43e3-9167-b1869a8dfb0e.png?crop=focalpoint&fit=crop&fp-x=0.0629&fp-y=0.3587&fp-z=2.7021&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=90&mark-y=322&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yMjcmaD04NCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 7. Cerca l'utente con il quale condividere il task
![Step 7 screenshot](https://images.tango.us/workflows/b24040f1-248f-4edb-97e7-4584ddfb66ad/steps/1aed975a-a3bc-4376-bcdd-3d67f68368af/1177361e-28dd-4994-882e-e18183ee615b.png?crop=focalpoint&fit=crop&fp-x=0.4121&fp-y=0.3630&fp-z=1.8878&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=340&mark-y=330&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz01MjAmaD02OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 8. Click su CONFERMA
![Step 8 screenshot](https://images.tango.us/workflows/b24040f1-248f-4edb-97e7-4584ddfb66ad/steps/d2e781d1-2278-4bc1-9551-10fe5a23f05b/20863623-9230-4990-aa8c-c58d4e0ef249.png?crop=focalpoint&fit=crop&fp-x=0.6762&fp-y=0.8549&fp-z=2.8018&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=489&mark-y=383&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yMjMmaD05OCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 9. Accediamo ora come "lucaneri"

Vai nella sezione del menù "Task condivisi", li troverai tutti i task condivisi con te da altri utenti

![Step 9 screenshot](https://images.tango.us/workflows/b24040f1-248f-4edb-97e7-4584ddfb66ad/steps/fc292274-1987-4cf5-a0f5-756e15ff1ce8/98f787e4-d248-4665-b957-323f3547a92f.png?crop=focalpoint&fit=crop&fp-x=0.0714&fp-y=0.1552&fp-z=2.2853&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=7&mark-y=208&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zNzcmaD0xMDAmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D)


### 10. Clicca su COMMENTA

Si aprirà una modale con tutti i dettagli del task con una sezione relativa ai commenti

![Step 10 screenshot](https://images.tango.us/workflows/b24040f1-248f-4edb-97e7-4584ddfb66ad/steps/43ab07f9-abd8-4d4f-98d5-877109cd6ef1/82182f85-1576-45e2-9fd5-cd2774d4b3e6.png?crop=focalpoint&fit=crop&fp-x=0.0681&fp-y=0.3587&fp-z=2.6283&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=88&mark-y=323&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yNTQmaD04MiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 11. Inserisci il tuo commento
![Step 11 screenshot](https://images.tango.us/workflows/b24040f1-248f-4edb-97e7-4584ddfb66ad/steps/f7c2b40c-c9b1-4427-8e84-b93d55979e48/905771b9-3ba8-4ec9-8173-38b20b5387ca.png?crop=focalpoint&fit=crop&fp-x=0.4899&fp-y=0.6777&fp-z=1.6182&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=291&mark-y=333&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MTcmaD02MCZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 12. Clicca qui per salvare il commento
![Step 12 screenshot](https://images.tango.us/workflows/b24040f1-248f-4edb-97e7-4584ddfb66ad/steps/5a541772-9db3-4671-a6b0-eab4bf93e6af/6e593c4a-9d56-4053-ae75-20fec4a4451f.png?crop=focalpoint&fit=crop&fp-x=0.6775&fp-y=0.6777&fp-z=2.8563&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=520&mark-y=306&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xNjAmaD0xMTYmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D)


### 13. Tornando ora come "rossimario"

Troveremo il task aggiornato con il commento di lucaneri

![Step 13 screenshot](https://images.tango.us/workflows/b24040f1-248f-4edb-97e7-4584ddfb66ad/steps/0bc9ce86-4945-4c12-978c-2437a0166f48/624f26e8-03ed-4e7f-8bab-8a57f652460b.png?crop=focalpoint&fit=crop&fp-x=0.4961&fp-y=0.6317&fp-z=1.4112&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=253&mark-y=324&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02OTMmaD03OSZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 14. Puoi aggiungere a tua volta un commento
![Step 14 screenshot](https://images.tango.us/workflows/b24040f1-248f-4edb-97e7-4584ddfb66ad/steps/cf56fca3-c3a0-4644-87f7-4fce0f9cb654/ccc4fd32-5c0c-4ef9-8f77-a538ea0d1368.png?crop=focalpoint&fit=crop&fp-x=0.4961&fp-y=0.6660&fp-z=1.4112&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=253&mark-y=345&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02OTMmaD03OSZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 15. Premi su COMPLETATO e poi su CONFERMA

"lucaneri" dopo aver completato il task può chiuderlo

![Step 15 screenshot](https://images.tango.us/workflows/b24040f1-248f-4edb-97e7-4584ddfb66ad/steps/fc09a4e0-9ad7-4a4d-9865-bd30a7deb5e7/87b1d3ea-65d8-49d4-91da-fb48a2f44905.png?crop=focalpoint&fit=crop&fp-x=0.3673&fp-y=0.5182&fp-z=2.8286&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=545&mark-y=309&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0xMTAmaD0xMTAmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D)


### 16. Apparirà ora con un colore diverso
![Step 16 screenshot](https://images.tango.us/workflows/b24040f1-248f-4edb-97e7-4584ddfb66ad/steps/675f6489-b618-4bab-b83e-59a839f3f002/3fcdb137-5a29-4485-80ee-cb744a4d9bab.png?crop=focalpoint&fit=crop&fp-x=0.1343&fp-y=0.2757&fp-z=1.9112&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=52&mark-y=278&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz01MTImaD0xNzEmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D)


### 17. Tornando come "mariorossi" potremmo consultare il task in "Task completati"
![Step 17 screenshot](https://images.tango.us/workflows/b24040f1-248f-4edb-97e7-4584ddfb66ad/steps/7071f2c4-b447-4e24-86ee-071285d7072d/19a18f32-540b-41dc-9c30-d8eec52776ce.png?crop=focalpoint&fit=crop&fp-x=0.0714&fp-y=0.2066&fp-z=2.2853&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=7&mark-y=294&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zNzcmaD0xMDAmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D)


### 18. Clicca su ELIMINA e poi CONFERMA

Potrai eliminare il task

![Step 18 screenshot](https://images.tango.us/workflows/b24040f1-248f-4edb-97e7-4584ddfb66ad/steps/d5cef3fa-c2f5-4b7e-bf64-9e36f282e5e8/c50759db-4c30-47c4-897d-3d2e80d9b49d.png?crop=focalpoint&fit=crop&fp-x=0.2096&fp-y=0.3587&fp-z=2.7602&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=497&mark-y=321&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0yMDYmaD04NiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 19. Alert di conferma
![Step 19 screenshot](https://images.tango.us/workflows/b24040f1-248f-4edb-97e7-4584ddfb66ad/steps/9f0054fb-0b6b-45dc-9667-f93de5efec64/0c020472-1c6f-4487-aef0-297b73df213e.png?crop=focalpoint&fit=crop&fp-x=0.8215&fp-y=0.0578&fp-z=2.6519&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=434&mark-y=37&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zOTYmaD0xNDkmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D)


### 20. Clicca su Profilo dal menù
![Step 20 screenshot](https://images.tango.us/workflows/b24040f1-248f-4edb-97e7-4584ddfb66ad/steps/ec24d80c-7d8f-4403-8fbe-88bf2f2acbed/ef6706c4-a661-45cd-8069-a10b465c3e8d.png?crop=focalpoint&fit=crop&fp-x=0.0714&fp-y=0.2580&fp-z=2.2853&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=7&mark-y=314&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zNzcmaD0xMDAmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D)


### 21. Troverai qui i tuoi dati

Potrai cambiarli in qualsiasi momento, modificando i campi e confermando poi sull'icona SALVA in alto a destra

![Step 21 screenshot](https://images.tango.us/workflows/b24040f1-248f-4edb-97e7-4584ddfb66ad/steps/fec558a9-6880-4bb3-984e-ebcd6b8d9fe0/282f6936-3d8f-4d10-bcb9-87ee9197f175.png?crop=focalpoint&fit=crop&fp-x=0.2897&fp-y=0.5450&fp-z=1.5898&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=239&mark-y=329&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz02MjgmaD02OSZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 22. Cliccando su ELIMINA ACCOUNT e poi CONFERMA

Eliminerai definitivamente il tuo account eliminando con se tutti i tuoi task.

Gli altri utenti non potranno più visualizzarli

![Step 22 screenshot](https://images.tango.us/workflows/b24040f1-248f-4edb-97e7-4584ddfb66ad/steps/ed972b3d-7d77-4d76-bc0e-b14a2bdca4d8/d770a211-a539-42f0-bcab-ef558bef51e1.png?crop=focalpoint&fit=crop&fp-x=0.2502&fp-y=0.8774&fp-z=2.4410&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=439&mark-y=467&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz0zMjEmaD04NiZmaXQ9Y3JvcCZjb3JuZXItcmFkaXVzPTEw)


### 23. Alert di Successo
![Step 23 screenshot](https://images.tango.us/workflows/b24040f1-248f-4edb-97e7-4584ddfb66ad/steps/ee91929a-4bb9-451e-8139-9eb3714de632/2c22062b-a1b4-49f7-ba84-73b170539749.png?crop=focalpoint&fit=crop&fp-x=0.8394&fp-y=0.0578&fp-z=2.6519&w=1200&border=2%2CF4F2F7&border-radius=8%2C8%2C8%2C8&border-radius-inner=8%2C8%2C8%2C8&blend-align=bottom&blend-mode=normal&blend-x=0&blend-w=1200&blend64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL21hZGUtd2l0aC10YW5nby13YXRlcm1hcmstdjIucG5n&mark-x=465&mark-y=37&m64=aHR0cHM6Ly9pbWFnZXMudGFuZ28udXMvc3RhdGljL2JsYW5rLnBuZz9tYXNrPWNvcm5lcnMmYm9yZGVyPTQlMkNGRjc0NDImdz00NDgmaD0xNDkmZml0PWNyb3AmY29ybmVyLXJhZGl1cz0xMA%3D%3D)

## **Link utili:**

### - [Link alla web app'](https://teamflow.gplans.it)

### - [Breve presentazione](./presentation/teamflow_presentation.pdf)