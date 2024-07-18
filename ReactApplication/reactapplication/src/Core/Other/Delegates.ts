export class UDelegate {
    private handlers: Function[];

    constructor() {
        this.handlers = [];
    }


    public RemoveHandler(handler: Function): void {
        const Remove_index = this.handlers.indexOf(handler)
        if (Remove_index > 0) {
            this.handlers.splice(Remove_index);
        }
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

