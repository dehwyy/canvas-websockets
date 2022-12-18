export default class Debouncer<T> {
    time: ReturnType<typeof setTimeout> | undefined
    sideCbs: Function[]
    constructor(private ms: number,
                private debounceHandler: (e: T) => void,
                ...cbs: Function[]) {
                    this.sideCbs = cbs
                }
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
            this.sideCbs.forEach(cb => cb())
        }, this.ms)
    }
}