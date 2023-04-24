declare type Callback<IValue> = ((value?: IValue) => void) | undefined;
export declare class EventHandler<IValue = any> {
    private list;
    private selectedId;
    suscribe(callback: Callback<IValue>, id?: string): void;
    isAnyEventSuscribed: () => boolean;
    isSuscribed: (id?: string | undefined) => boolean;
    listen(value?: IValue): void;
    private executeEvent;
    listenAll(): void;
    clear(id?: string): void;
    clearAll(): void;
    setSelectedId(id: string): void;
}
export {};
