const toString = Object.prototype.toString;

export const TYPE_FUNCTION = "Function";
export const TYPE_ASYNC_FUNCTION = "AsyncFunction";
export const TYPE_OBJECT = "Object";
export const TYPE_DATE = "Date";
export const TYPE_NUMBER = "Number";
export const TYPE_PROMISE = "Promise";
export const TYPE_STRING = "String";
export const TYPE_BOOLEAN = "Boolean";

/**
 * 类型判断
 */
export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

/**
 * 是否为方法
 */
export function isFunction(val: unknown) {
  return is(val, TYPE_FUNCTION);
}

/**
 * 是否为对象
 */
export function isObject(val: unknown) {
  return is(val, TYPE_OBJECT);
}
