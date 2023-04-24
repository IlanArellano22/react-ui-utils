import { EffectCallback, DependencyList } from "react";
declare type EffectResult = void | EffectCallback;
export default function useEffectInterval(effect: () => EffectResult, deps: DependencyList, interval: number, inmediate?: boolean): void;
export {};
