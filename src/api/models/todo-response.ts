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
import type { CommentResponse } from './comment-response';
// May contain unused imports in some cases
// @ts-ignore
import type { TodoResponseSharedWithInner } from './todo-response-shared-with-inner';

/**
 * 
 * @export
 * @interface TodoResponse
 */
export interface TodoResponse {
    /**
     * 
     * @type {string}
     * @memberof TodoResponse
     */
    'id'?: string;
    /**
     * 
     * @type {string}
     * @memberof TodoResponse
     */
    'title'?: string;
    /**
     * 
     * @type {string}
     * @memberof TodoResponse
     */
    'description'?: string;
    /**
     * 
     * @type {string}
     * @memberof TodoResponse
     */
    'note'?: string;
    /**
     * 
     * @type {string}
     * @memberof TodoResponse
     */
    'category'?: string;
    /**
     * 
     * @type {boolean}
     * @memberof TodoResponse
     */
    'checked'?: boolean;
    /**
     * 
     * @type {string}
     * @memberof TodoResponse
     */
    'created_at'?: string;
    /**
     * 
     * @type {string}
     * @memberof TodoResponse
     */
    'updated_at'?: string;
    /**
     * 
     * @type {string}
     * @memberof TodoResponse
     */
    'account_id'?: string;
    /**
     * 
     * @type {Array<TodoResponseSharedWithInner>}
     * @memberof TodoResponse
     */
    'sharedWith'?: Array<TodoResponseSharedWithInner>;
    /**
     * 
     * @type {boolean}
     * @memberof TodoResponse
     */
    'isShared'?: boolean;
    /**
     * 
     * @type {Array<CommentResponse>}
     * @memberof TodoResponse
     */
    'comments'?: Array<CommentResponse>;
}

