import { DependencyList, EffectCallback } from "react";
declare type EffectResult = void | EffectCallback;
export default function useEffectAsync(effect: () => Promise<EffectResult>, deps: DependencyList): void;
export {};
