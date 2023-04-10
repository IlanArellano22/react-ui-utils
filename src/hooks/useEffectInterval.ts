import { EffectCallback, useEffect, useRef, DependencyList } from "react";
import { intervalHandler } from "../helpers";

type EffectResult = void | EffectCallback;

export default function useEffectInterval(
  effect: () => EffectResult,
  deps: DependencyList,
  interval: number,
  inmediate = false
) {
  const intervalRef = useRef(new intervalHandler()).current;
  useEffect(() => {
    let effectRes: EffectResult | undefined;
    if (inmediate) effectRes = effect();
    intervalRef.set(() => {
      effectRes = effect();
    }, interval);
    return () => {
      if (effectRes && typeof effectRes === "function") effectRes();
      intervalRef.clear();
    };
  }, deps);
}
