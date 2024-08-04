import * as JsonApplicationLibrary from './JsonApplicationLibrary';
import { UWorker } from '../Worker';
import { UDelegate } from '../Other/Delegates';
/*
    Это корневой абстрастый класс предназначенный для  получения сущностей. ЛЮБОЙ ОБЬЕКТ получаемый с сервера и имеющий потенциал к модификации во время работы приложения должен быть получен и обработан с помощью EntityManager.
    Модуль работает следующим образом:
    Раз в некий период времени он скачивает все виды сущностей, которые поддерживает этот EntityManager.
    Затем на основе полученных сущностей EntityManager хранит у себя копию сущностей в виде typescript instance classов.
    При повторном обновлении Entity сверяет новую копию и старую копию и делает поправки в свою копию при необходимости. 
    Таким образом на стороне приложения всегда присутствует актуальная копия. 
    Подобный подход гарантирует, что приложение будет стабильным даже в случае если несколько человек создают сущности одновременно. 

    Класс можно при желании и дополнительно доработать. Например, сделать его универсальным под все типы Entity, например, обьеденив Entity в единый общий класс UEntity,
    с стандартизированными методами вроде Serialize(), Deserialize, ect, на которые операется UEntityManager. Это позволит уменьшить количество кода на создание и поддержку новой Entity. 
    Однако я оставлю доработку этого класса потомкам. 

    Зависимости: 
    Workers,
    Delegates,
    JsonApplicationLibrary.
*/

/*
    This is the root abstract class for getting entities. ANY OBJECT received from the server and having the potential for modification in runtime must be received and processed using EntityManager.
    The module works as follows:
    Once in a certain period of time, it downloads all kinds of entities that this EntityManager supports. 
    Then, based on the received entities, EntityManager stores a copy of the entities in the form of typescript instance classes. 
    When updating again, the Entity reconciles the new copy and the old copy and makes corrections to its copy if necessary. 
    Thus, an up-to-date copy is always present on the application side. 
    This approach ensures that the application will be stable even if several people create entities at the same time.

    The class can be further modified if desired. For example, make it universal for all types of Entity, for example, by combining Entity into a single common UEntity class, with standardized methods like Serialize(),
    Deserialize, ect, which the UEntityManager relies on. This will reduce the amount of code needed to create and maintain a new Entity. 
    However, I will leave the refinement of this class to posterity.

    Workers,
    Delegates,
    JsonApplicationLibrary.
*/

export class UEntityManager {
    //Время обновления.
    //TimeToUpdate.
    public timeToUpdate: number;
    //Делегаты, срабатывающие при добавлении или удалении обслуживающий сущности. 
    //Delegates triggered when a serving entity is added or deleted.
    public new_entity_delegate: UDelegate;
    public remove_entity_delegate: UDelegate;
    public update_entity_delegate: UDelegate;

    constructor() {
        this.new_entity_delegate = new UDelegate();
        this.remove_entity_delegate = new UDelegate();
        this.update_entity_delegate = new UDelegate();
        this.timeToUpdate = 5000;
    }
    //Эта функция настраивает UEntityManager на работу. Конструктор не подходит, так как в нем есть операции с async-await.
    //This function adjusts the object to work. The constructor is not suitable, since there are async-await operations.
    public async Initialization() {
        this.SetupUpdateTimer();
        await this.UpdateEntity();
    }
    //Базовая функция настройки обновления EntityManager;
    //Basic update time setting.
    SetupUpdateTimer = () =>
    {
        setInterval(() => {
            this.UpdateEntity()
        },
        this.timeToUpdate);
    }
    //Базовая функция обновления своих Entities;
    //Base function to recive entities
    public async UpdateEntity()
    {

    }

}
