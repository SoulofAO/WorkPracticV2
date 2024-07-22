export class UDelegate {
    private handlers: Function[];

    constructor() {
        this.handlers = [];
    }

    public RemoveHandlerByName(handler: Function): void {
        const removeIndex = this.handlers.findIndex(handler => handler.name === handler.name);
        if (removeIndex >= 0) {
            this.handlers.splice(removeIndex, 1);
        }
    }

    public RemoveHandler(handler: Function): void {
        const removeIndex = this.handlers.indexOf(handler);
        if (removeIndex >= 0) {
            this.handlers.splice(removeIndex, 1);
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

