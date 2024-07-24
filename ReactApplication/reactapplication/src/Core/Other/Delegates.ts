
/*
    Полноценное определение:
    Делегат — это тип, который представляет ссылки на методы с определенным списком параметров и типом возвращаемого значения. 
    При создании экземпляра делегата этот экземпляр можно связать с любым методом с совместимой сигнатурой и типом возвращаемого значения. Метод можно вызвать (активировать) с помощью экземпляра делегата.

    Определение для самых маленьких.
    Класс UDelegate — это специальный инструмент, который позволяет нам управлять списком функций (обработчиков).
    Мы можем добавлять функции, удалять их и вызывать все функции сразу, когда это необходимо.

    // Пример использования класса UDelegate
    const delegate = new UDelegate(); // Создаем новый экземпляр UDelegate

    // Определяем несколько функций-обработчиков
    const handler1 = (message: string) => {
        console.log(Handler 1 says: ${message});
    };

    const handler2 = (message: string) => {
        console.log(Handler 2 says: ${message});
    };

    // Добавляем обработчики в делегат
    delegate.AddHandler(handler1);
    delegate.AddHandler(handler2);

    // Вызываем все добавленные функции с сообщением
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
    // Массив для хранения обработчиков
    // Array to store handlers
    private handlers: Function[];

    // Конструктор класса, инициализирующий массив обработчиков
    // Constructor initializing the handlers array
    constructor() {
        this.handlers = [];
    }

    // Метод для удаления обработчика по имени
    // Method to remove a handler by its name
    public RemoveHandlerByName(handler: Function): void {
        const removeIndex = this.handlers.findIndex(h => h.name === handler.name);
        if (removeIndex >= 0) {
            this.handlers.splice(removeIndex, 1);
        }
    }

    // Метод для удаления конкретного обработчика. Багуется с лямбда функциями, поэтому добавлена RemoveHandlerByName.
    // Method to remove a specific handler. Bugs with lambda functions, so RemoveHandlerByName has been added.
    public RemoveHandler(handler: Function): void {
        const removeIndex = this.handlers.indexOf(handler);
        if (removeIndex >= 0) {
            this.handlers.splice(removeIndex, 1);
        }
    }

    // Метод для добавления нового обработчика в массив.
    // Method to add a new handler to the array
    public AddHandler(handler: Function): void {
        this.handlers.push(handler);
    }

    // Метод для вызова всех обработчиков с переданными аргументами
    // Method to call all handlers with the provided arguments
    public Broadcast(...args: any[]): void {
        for (const handler of this.handlers) {
            handler(...args);
        }
    }
}