
/*
    ����������� �����������:
    ������� � ��� ���, ������� ������������ ������ �� ������ � ������������ ������� ���������� � ����� ������������� ��������. 
    ��� �������� ���������� �������� ���� ��������� ����� ������� � ����� ������� � ����������� ���������� � ����� ������������� ��������. ����� ����� ������� (������������) � ������� ���������� ��������.

    ����������� ��� ����� ���������.
    ����� UDelegate � ��� ����������� ����������, ������� ��������� ��� ��������� ������� ������� (������������).
    �� ����� ��������� �������, ������� �� � �������� ��� ������� �����, ����� ��� ����������.

    // ������ ������������� ������ UDelegate
    const delegate = new UDelegate(); // ������� ����� ��������� UDelegate

    // ���������� ��������� �������-������������
    const handler1 = (message: string) => {
        console.log(Handler 1 says: ${message});
    };

    const handler2 = (message: string) => {
        console.log(Handler 2 says: ${message});
    };

    // ��������� ����������� � �������
    delegate.AddHandler(handler1);
    delegate.AddHandler(handler2);

    // �������� ��� ����������� ������� � ����������
    delegate.Broadcast("Hello, World!");
*/

/*
    Full definition:
    A delegate is a type that represents references to methods with a specific list of parameters and the type of return value. 
    When creating a delegate instance, this instance can be associated with any method with a compatible signature and return type. The method can be called (activated) using a delegate instance.

    The definition is for the youngest.
    The UDelegate class is a special tool that allows us to manage a list of functions (handlers).
    We can add functions, remove them, and call all functions at once when needed.

    // Example of using the UDelegate class
    const delegate = new UDelegate(); // Creating a new instance of UDelegate

    // Defining several handler functions
    const handler1 = (message: string) => {
        console.log(Handler 1 says: ${message});
    };

    const handler2 = (message: string) => {
        console.log(Handler 2 says: ${message});
    };

    // Adding handlers to the delegate
    delegate.AddHandler(handler1);
    delegate.AddHandler(handler2);

    // Calling all the added functions with the message
    delegate.Broadcast("Hello, World!"); */

export class UDelegate {
    // ������ ��� �������� ������������
    // Array to store handlers
    private handlers: Function[];

    // ����������� ������, ���������������� ������ ������������
    // Constructor initializing the handlers array
    constructor() {
        this.handlers = [];
    }

    // ����� ��� �������� ����������� �� �����
    // Method to remove a handler by its name
    public RemoveHandlerByName(handler: Function): void {
        const removeIndex = this.handlers.findIndex(h => h.name === handler.name);
        if (removeIndex >= 0) {
            this.handlers.splice(removeIndex, 1);
        }
    }

    // ����� ��� �������� ����������� �����������. �������� � ������ ���������, ������� ��������� RemoveHandlerByName.
    // Method to remove a specific handler. Bugs with lambda functions, so RemoveHandlerByName has been added.
    public RemoveHandler(handler: Function): void {
        const removeIndex = this.handlers.indexOf(handler);
        if (removeIndex >= 0) {
            this.handlers.splice(removeIndex, 1);
        }
    }

    // ����� ��� ���������� ������ ����������� � ������.
    // Method to add a new handler to the array
    public AddHandler(handler: Function): void {
        this.handlers.push(handler);
    }

    // ����� ��� ������ ���� ������������ � ����������� �����������
    // Method to call all handlers with the provided arguments
    public Broadcast(...args: any[]): void {
        for (const handler of this.handlers) {
            handler(...args);
        }
    }
}