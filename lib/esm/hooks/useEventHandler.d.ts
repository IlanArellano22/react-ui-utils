/**Hook que genera un eventHandler donde se pueden suscribir callbacks en distintos eventos */
export default function useEventHandler<IEvents extends string, IValue = any>(): {
    addEventListenner: (event: IEvents, fn: (value: IValue) => void) => void;
    removeEventListenner: (event: IEvents) => void;
    listen: (event: IEvents, value: IValue) => void;
    listenAll: () => void;
    clearAll: () => void;
};
