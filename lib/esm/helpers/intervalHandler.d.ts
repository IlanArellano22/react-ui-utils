export declare class intervalHandler {
    private interval;
    set: (callback: TimerHandler, ms?: number) => void;
    clear: () => void;
}
