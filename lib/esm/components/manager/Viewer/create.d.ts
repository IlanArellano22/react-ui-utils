/// <reference types="react" />
import { ShowViewFunc, ShowViewFuncSync } from "./manager";
export interface ViewManager {
    Viewer: () => JSX.Element;
    show: ShowViewFunc;
    showSync: ShowViewFuncSync;
    removeAllEntries: () => void;
}
export interface ViewManagerOptions {
    limit?: number;
}
/**Comentario */
export declare function createViewManager(options: Partial<ViewManagerOptions>): ViewManager;
