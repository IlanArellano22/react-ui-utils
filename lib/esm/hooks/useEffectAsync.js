import { useEffect } from "react";
export default function useEffectAsync(effect, deps) {
    var res = null;
    useEffect(function () {
        effect().then(function (result) { return (res = result); });
        return function () {
            if (res && typeof res === "function")
                res();
        };
    }, deps);
}
//# sourceMappingURL=useEffectAsync.js.map