/// <reference types="react" />
import { ShowViewFunc, ShowViewFuncSync } from "./manager";
export interface ViewManager {
    Viewer: () => JSX.Element;
    show: ShowViewFunc;
    showSync: ShowViewFuncSync;
    removeAllEntries: () => void;
}
export declare function createViewManager(): ViewManager;
