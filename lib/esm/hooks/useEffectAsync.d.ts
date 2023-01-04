import { DependencyList, EffectCallback } from "react";
declare type EffectResult = void | EffectCallback;
export declare function useEffectAsync(effect: () => Promise<EffectResult>, deps: DependencyList): void;
export {};
