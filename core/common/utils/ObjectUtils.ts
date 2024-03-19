import {
    clone,
    cloneDeep,
    get,
    isArray,
    isBoolean,
    isDate,
    isEqual,
    isFunction,
    isNull,
    isObject,
    isString,
    isUndefined,
    keyBy,
    merge,
    pickBy,
    transform,
} from 'lodash';

export class ObjectUtils {
    public static isObject(object: any): boolean {
        return isObject(object);
    }

    public static isNull(object: any): boolean {
        return isNull(object);
    }

    public static isUndefined(object: any): boolean {
        return isUndefined(object);
    }

    public static isNullOrUndefined(object: any): boolean {
        return isNull(object) || isUndefined(object);
    }

    public static isFunction(object: any): boolean {
        return isFunction(object);
    }

    public static isEmpty(input: any): boolean {
        if (isNull(input) || isUndefined(input)) {
            return true;
        }

        if (isDate(input)) {
            return false;
        }

        if (isString(input) || isArray(input)) {
            return input.length <= 0;
        }

        if (isObject(input)) {
            return Object.keys(input).length <= 0;
        }

        return false;
    }

    public static isNumber(object: any): boolean {
        if (object === '') {
            return false;
        }

        const valueNumber = Number(object);
        if (isNaN(valueNumber)) {
            return false;
        }

        return true;
    }

    public static isString(object: any): boolean {
        return isString(object);
    }

    public static isArray(object: any): boolean {
        return Array.isArray(object);
    }

    public static isBoolean(object: any): boolean {
        return isBoolean(object);
    }

    public static isDate(object: any): boolean {
        return isDate(object);
    }

    public static get<T, O>(value: T, prop: string, defaultValue?: O): O {
        return get(value, prop, defaultValue);
    }

    public static merge<TObject, TSource>(
        object: TObject,
        source: TSource,
    ): TObject & TSource {
        return merge(object, source);
    }

    public static parse(value: string, defaultValue = null): any {
        if (!ObjectUtils.isString(value)) {
            return value;
        }
        try {
            return JSON.parse(value);
        } catch {
            return defaultValue;
        }
    }

    public static stringify(value: any): string {
        return JSON.stringify(value);
    }

    public static clean<T>(input: T, fields: string[], falsy = false): T {
        const keysToOmitIndex = keyBy(fields);

        const data = ObjectUtils.transform(
            input,
            (_: any, key: string) => key in keysToOmitIndex,
        );

        if (!falsy) {
            return data;
        }

        return ObjectUtils.transform(data, (value: any, _: string) =>
            ObjectUtils.isEmpty(value),
        );
    }

    public static cleanOut<T>(input: T, fields: string[], falsy = false): T {
        const keysToOmitIndex = keyBy(fields);

        const data = ObjectUtils.transform(
            input,
            (_: any, key: string) => !(key in keysToOmitIndex),
        );

        if (!falsy) {
            return data;
        }

        return ObjectUtils.transform(data, (value: any, _: string) =>
            ObjectUtils.isEmpty(value),
        );
    }

    public static transform<T>(
        input: T,
        next: (v: any, k: string) => boolean,
    ): T {
        if (ObjectUtils.isEmpty(input)) {
            return {} as any;
        }

        const omitFromObject = (object: any): any => {
            return transform(object, (result: T, value: any, key: string) => {
                if (next(value, key)) {
                    return;
                }

                if (value instanceof Date) {
                    result[key] = value;
                } else if (isObject(value)) {
                    result[key] = omitFromObject(value);
                } else {
                    result[key] = value;
                }
            });
        };

        return omitFromObject(input);
    }

    public static cloneDeep<T>(value: T): T {
        return cloneDeep(value);
    }

    public static copy<T>(value: any, isDeep = true): T {
        return isDeep ? cloneDeep(value) : clone(value);
    }

    public static pickBy(object: any, predicate: any) {
        return pickBy(object, predicate);
    }

    static difference<T>(source: any, target: any): T {
        return transform(source, (result, value, key) => {
            if (isEqual(value, target[key])) {
                return;
            }

            if (isObject(value) && isObject(target[key])) {
                result[key] = ObjectUtils.difference(value, target[key]);
            } else {
                result[key] = value;
            }
        });
    }
}
