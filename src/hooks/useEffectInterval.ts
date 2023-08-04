import { EffectCallback, useEffect, DependencyList } from "react";
import { intervalHandler } from "../helpers";

type EffectResult = void | EffectCallback;

export default function useEffectInterval(
  effect: () => EffectResult,
  deps: DependencyList,
  ms: number,
  inmediate = false
) {
  useEffect(() => {
    const interval = new intervalHandler();
    let effectRes: EffectResult | undefined;
    if (inmediate) effectRes = effect();
    interval.set(() => {
      effectRes = effect();
    }, ms);
    return () => {
      if (effectRes && typeof effectRes === "function") effectRes();
      interval.clear();
    };
  }, deps);
}
