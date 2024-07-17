class UDelegate {
    private handlers: Function[];

    constructor() {
        this.handlers = [];
    }

    public AddHandler(handler: Function): void {
        this.handlers.push(handler);
    }

    public Broadcast(...args: any[]): void {
        for (const handler of this.handlers) {
            handler(...args);
        }
    }
}

