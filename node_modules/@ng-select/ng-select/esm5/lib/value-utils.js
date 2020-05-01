/**
 * @fileoverview added by tsickle
 * Generated from: lib/value-utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var unescapedHTMLExp = /[&<>"']/g;
/** @type {?} */
var hasUnescapedHTMLExp = RegExp(unescapedHTMLExp.source);
/** @type {?} */
var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;'
};
/**
 * @param {?} string
 * @return {?}
 */
export function escapeHTML(string) {
    return (string && hasUnescapedHTMLExp.test(string)) ?
        string.replace(unescapedHTMLExp, (/**
         * @param {?} chr
         * @return {?}
         */
        function (chr) { return htmlEscapes[chr]; })) :
        string;
}
/**
 * @param {?} value
 * @return {?}
 */
export function isDefined(value) {
    return value !== undefined && value !== null;
}
/**
 * @param {?} value
 * @return {?}
 */
export function isObject(value) {
    return typeof value === 'object' && isDefined(value);
}
/**
 * @param {?} value
 * @return {?}
 */
export function isPromise(value) {
    return value instanceof Promise;
}
/**
 * @param {?} value
 * @return {?}
 */
export function isFunction(value) {
    return value instanceof Function;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsdWUtdXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abmctc2VsZWN0L25nLXNlbGVjdC8iLCJzb3VyY2VzIjpbImxpYi92YWx1ZS11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7SUFBTSxnQkFBZ0IsR0FBRyxVQUFVOztJQUM3QixtQkFBbUIsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDOztJQUNyRCxXQUFXLEdBQUc7SUFDaEIsR0FBRyxFQUFFLE9BQU87SUFDWixHQUFHLEVBQUUsTUFBTTtJQUNYLEdBQUcsRUFBRSxNQUFNO0lBQ1gsR0FBRyxFQUFFLFFBQVE7SUFDYixJQUFJLEVBQUUsT0FBTztDQUNoQjs7Ozs7QUFFRCxNQUFNLFVBQVUsVUFBVSxDQUFDLE1BQWM7SUFDckMsT0FBTyxDQUFDLE1BQU0sSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCOzs7O1FBQUUsVUFBQSxHQUFHLElBQUksT0FBQSxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQWhCLENBQWdCLEVBQUMsQ0FBQyxDQUFDO1FBQzNELE1BQU0sQ0FBQztBQUNmLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLFNBQVMsQ0FBQyxLQUFVO0lBQ2hDLE9BQU8sS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDO0FBQ2pELENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxLQUFVO0lBQy9CLE9BQU8sT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6RCxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxTQUFTLENBQUMsS0FBVTtJQUNoQyxPQUFPLEtBQUssWUFBWSxPQUFPLENBQUM7QUFDcEMsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsVUFBVSxDQUFDLEtBQVU7SUFDakMsT0FBTyxLQUFLLFlBQVksUUFBUSxDQUFDO0FBQ3JDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB1bmVzY2FwZWRIVE1MRXhwID0gL1smPD5cIiddL2c7XG5jb25zdCBoYXNVbmVzY2FwZWRIVE1MRXhwID0gUmVnRXhwKHVuZXNjYXBlZEhUTUxFeHAuc291cmNlKTtcbmNvbnN0IGh0bWxFc2NhcGVzID0ge1xuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7JyxcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICAnXFwnJzogJyYjMzk7J1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGVzY2FwZUhUTUwoc3RyaW5nOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gKHN0cmluZyAmJiBoYXNVbmVzY2FwZWRIVE1MRXhwLnRlc3Qoc3RyaW5nKSkgP1xuICAgICAgICBzdHJpbmcucmVwbGFjZSh1bmVzY2FwZWRIVE1MRXhwLCBjaHIgPT4gaHRtbEVzY2FwZXNbY2hyXSkgOlxuICAgICAgICBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RlZmluZWQodmFsdWU6IGFueSkge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNPYmplY3QodmFsdWU6IGFueSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIGlzRGVmaW5lZCh2YWx1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Byb21pc2UodmFsdWU6IGFueSkge1xuICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlOiBhbnkpIHtcbiAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbjtcbn1cbiJdfQ==