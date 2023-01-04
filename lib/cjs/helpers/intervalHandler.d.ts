export declare class intervalHandler {
    private interval;
    set: (callback: TimerHandler, ms?: number | undefined) => void;
    clear: () => void;
}
