/* tslint:disable */
/* eslint-disable */
/**
 * S2I final
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.8
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import type { AccountsResponse } from './accounts-response';

/**
 * 
 * @export
 * @interface GetAllAccounts200Response
 */
export interface GetAllAccounts200Response {
    /**
     * 
     * @type {Array<AccountsResponse>}
     * @memberof GetAllAccounts200Response
     */
    'data'?: Array<AccountsResponse>;
    /**
     * 
     * @type {string}
     * @memberof GetAllAccounts200Response
     */
    'message'?: string;
}

