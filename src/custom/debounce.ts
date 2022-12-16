export default class Debouncer<T> {
    time: ReturnType<typeof setTimeout> | undefined
    constructor(private ms: number, private debounceHandler: (fnArg: T) => void) {}
    public debounce(p: T) {
        this.setDeb(p)
    }

    private setDeb(p: T) {
        if (this.time) clearTimeout(this.time)
        this.time = this.timeout(p)
    }
    private timeout(p: T) {
        return setTimeout(() => {
            this.debounceHandler(p)
        }, this.ms)
    }
}