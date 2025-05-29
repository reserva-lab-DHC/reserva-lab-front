
// import { Injectable, Injector, inject } from '@angular/core';
// import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
// import { catchError, Observable, OperatorFunction, throwError } from 'rxjs';
// import { AuthService } from './auth.service';


// @Injectable({ providedIn: 'root' })
// export class HttpService {

//     //TODO: Definir a URL da API
//     // private API_URL: string = '' 

//     private http = inject(HttpClient);
//     private injector = inject(Injector);

//      private accountToken: string = 'account-token'; // Substitua pelo token real da conta

//     // Cabeçalhos padrão das requisições HTTP (HttpHeaders são imutáveis, então é necessário redefini-los ao atualizar)
//     private API_HEADERS: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

//     /**
//      * Executa uma requisição HTTP POST para um endpoint específico.
//      *
//      * @param target - Endpoint da API a ser acessado.
//      * @param body - Corpo da requisição.
//      * @param loggedArea - Indica se deve utilizar configurações de usuário logado.
//      * @returns Um Observable com a resposta da requisição.
//      */
//     post<T = object>(target: string, body?: Record<string, unknown>, loggedArea?: boolean): Observable<T> {
//         this.setHeaders(loggedArea ?? false, body);
//         const url = this.getUrl(target);

//         return this.http.post<T>(url, body, { headers: this.API_HEADERS }).pipe(this.handleAuthError());
//     }

//     // /**
//     //  * Executa uma requisição HTTP GET para um endpoint específico.
//     //  * Caso seja passado um objeto no corpo da requisição, ele será convertido em parâmetros de URL.
//     //  *
//     //  * @param target - Endpoint da API a ser acessado.
//     //  * @param body - Objeto contendo parâmetros a serem convertidos para a URL.
//     //  * @param loggedArea - Indica se deve utilizar configurações de usuário logado.
//     //  * @returns Um Observable com a resposta da requisição.
//     //  */
//     // get<T = object>(target: string, body?: Record<string, unknown>, loggedArea?: boolean): Observable<T> {
//     //     const authorization = (body?.['authorization'] as string) ?? undefined;

//     //     this.setHeaders(loggedArea ?? false, body, authorization);
//     //     const url = this.getUrl(target);
//     //     const params = this.objectToHttpParams({ ...(body ?? {}), _: Date.now() });

//     //     return this.http.get<T>(url, { headers: this.API_HEADERS, params }).pipe(this.handleAuthError());
//     // }

//     // /**
//     //  * Autentica um usuário utilizando um token.
//     //  *
//     //  * @param {string} [token] - O token de autenticação em formato Base64 (formato - login:código).
//     //  * @returns {Observable<object>} Um Observable com a resposta da requisição de autenticação.
//     //  * @throws {string} Se o usuário já estiver logado.
//     //  */
//     // authenticate<T = object>(token?: string): Observable<T> | undefined {
//     //     const alreadyLoggedIn = this.getUserToken() !== undefined;
//     //     if (alreadyLoggedIn) return;

//     //     this.API_HEADERS = this.API_HEADERS.set('Authorization', 'Basic ' + token)
//     //         .set('x-explorer-authentication-class', 'crm.person')
//     //         .set('x-explorer-account-token', this.accountToken);

//     //     const url = this.getUrl('apideautenticacao');
//     //     const params = this.objectToHttpParams();

//     //     return this.http.get<T>(url, { headers: this.API_HEADERS, params });
//     // }

//     /**
//      * Converte um objeto de chave-valor em HttpParams.
//      *
//      * @param query - Objeto contendo os parâmetros a serem convertidos.
//      * @returns HttpParams construído a partir do objeto.
//      */
//     private objectToHttpParams(query?: Record<string, unknown>): HttpParams {
//         let params = new HttpParams();
//         if (query === undefined) return params;

//         Object.keys(query).forEach((key) => {
//             const value = query[key];
//             // Adiciona o parâmetro apenas se o valor não for nulo ou indefinido.
//             if (value !== null && value !== undefined) {
//                 params = params.append(key, value.toString());
//             }
//         });

//         return params;
//     }

//     /**
//      * Obtém o token do usuário armazenado no localStorage.
//      *
//      * @returns O token de acesso do usuário ou null caso não esteja disponível.
//      */
//     private getUserToken(): string | undefined {
//         let token: string | undefined;

//         try {
//             const explorerUser = JSON.parse(sessionStorage.getItem('currentUser') ?? '{}');
//             token = explorerUser?.accessToken?.token;
//         } catch (e) {
//             console.error('Erro ao processar currentUser do localStorage', e);
//         }

//         return token;
//     }

// //     /**
// //    * Retorna a URL apropriada da API com base no estado de autenticação.
// //    *
// //    * @param target - Endpoint da API a ser acessado.
// //    * @returns A URL completa da API correspondente ao endpoint e ao estado de autenticação.
// //    */
// //     private getUrl(target: string): string {
// //         return `${this.API_URL}${target}`;
// //     }

//     /**
//      * Define os cabeçalhos da requisição de acordo com o estado de autenticação.
//      *
//      * @param loggedArea - Define se a requisição é para uma área logada.
//      * @param body - Corpo da requisição (para credenciais alternativas).
//      * @param loginToken - Token opcional passado diretamente.
//      */
//     private setHeaders(loggedArea: boolean = false, body?: Record<string, unknown>, loginToken?: string): void {
//         if (!loggedArea) {
//             this.API_HEADERS = this.API_HEADERS.set('Authorization', 'Bearer')
//                 .set('x-explorer-account-token',)
//                 .delete('x-explorer-authentication-class');
//             return;
//         }

//         const token = loginToken ?? this.getUserToken();

//         if (token === '' || token === undefined || token === null) {
//             this.API_HEADERS = this.API_HEADERS.set('Authorization', 'Basic ' + body?.['authorization'])
//                 .set('x-explorer-authentication-class', 'crm.person')
//                 .set('x-explorer-account-token', this.accountToken);
//         } else {
//             this.API_HEADERS = this.API_HEADERS.set('Authorization', 'Bearer ' + token)
//                 .set('x-explorer-account-token', this.accountToken)
//                 .delete('x-explorer-authentication-class');
//         }
//     }

//     /**
//      * Detecta um erro de autenticação (HttpErrorResponse com 401), desloga o usuário
//      *
//      * Este método deve ser usado com o pipe do rxjs
//      */
//     private handleAuthError<T>(): OperatorFunction<T, T> {
//         return catchError((e: unknown): Observable<T> => {

//             if (e instanceof HttpErrorResponse && (e.status === 401 || e.status === 403)) {
//                 const authService = this.injector.get(AuthService);

//                 authService.logout();
//                 return throwError(() => new Error('Usuário não autenticado ou sessão expirada.'));
//             }

//             return throwError(() => e);
//         });
//     }
// }
