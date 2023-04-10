import { useMemo, useRef } from "react";
import { omit } from "common";
import { BaseHandler, ValueHandler } from "../common/classes/ValueHandler";

type Value<IValue> = IValue | (() => IValue);

type ValueSetter<IValue> = IValue | ((prev: IValue) => IValue);

type ValueHandlerResult<IValue> = [
  () => IValue,
  (value: ValueSetter<IValue>, cb?: (newValue: IValue) => void) => void,
  Omit<BaseHandler<IValue>, "value">
];

/**Hook que maneja un estado interno sin controlar. A diferencia de @see React.useState este hook no actualiza el componente
 * si no que guarda su estado por medio de una referencia que no cambia durante el lifecycle.
 */
export default function useValueHandler<IValue>(
  initial?: Value<IValue>
): ValueHandlerResult<IValue> {
  const value = useRef(
    new ValueHandler(initial instanceof Function ? initial() : initial)
  ).current;

  const get = () => value.get() as IValue;

  const set = (newValue: ValueSetter<IValue>, cb?: (value: IValue) => void) => {
    const final =
      newValue instanceof Function ? newValue(value.get() as IValue) : newValue;
    value.set(final);
    if (cb) cb(final);
  };

  const valueMethods = useMemo(
    () => omit(value as ValueHandler<IValue>, "get", "set"),
    []
  );

  return [get, set, valueMethods];
}
