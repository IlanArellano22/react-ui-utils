import { BaseHandler } from "../common/classes/ValueHandler";
declare type Value<IValue> = IValue | (() => IValue);
declare type ValueSetter<IValue> = IValue | ((prev: IValue) => IValue);
declare type ValueHandlerResult<IValue> = [
    () => IValue,
    (value: ValueSetter<IValue>, cb?: (newValue: IValue) => void) => void,
    Omit<BaseHandler<IValue>, "value">
];
/**Hook que maneja un estado interno sin controlar. A diferencia de @see React.useState este hook no actualiza el componente
 * si no que guarda su estado por medio de una referencia que no cambia durante el lifecycle.
 */
export default function useValueHandler<IValue>(initial?: Value<IValue>): ValueHandlerResult<IValue>;
export {};
