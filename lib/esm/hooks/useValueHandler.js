import { useCallback, useRef } from "react";
import { ValueHandler } from "../common/classes/ValueHandler";
/**Hook que maneja un estado interno sin controlar. A diferencia de @see React.useState este hook no actualiza el componente
 * si no que guarda su estado por medio de una referencia que no cambia durante el lifecycle.
 */
export default function useValueHandler(initial) {
    var value = useRef(new ValueHandler(initial instanceof Function ? initial() : initial)).current;
    var get = useCallback(function () { return value.get(); }, []);
    var set = useCallback(function (newValue, cb) {
        var final = newValue instanceof Function
            ? newValue(value.get())
            : newValue;
        value.set(final);
        if (cb)
            cb(final);
    }, []);
    var getDeepCopy = useCallback(function () { return value.getDeepCopy(); }, []);
    return [get, set, { getDeepCopy: getDeepCopy }];
}
//# sourceMappingURL=useValueHandler.js.map