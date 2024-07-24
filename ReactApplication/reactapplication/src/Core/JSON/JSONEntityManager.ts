import * as JsonApplicationLibrary from './JsonApplicationLibrary';
import { UWorker } from '../Worker';
import { UDelegate } from '../Other/Delegates';
/*
    ��� �������� ���������� ����� ��������������� ���  ��������� ���������. ����� ������ ���������� � ������� � ������� ��������� � ����������� �� ����� ������ ���������� ������ ���� ������� � ��������� � ������� EntityManager.
    ������ �������� ��������� �������:
    ��� � ����� ������ ������� �� ��������� ��� ���� ���������, ������� ������������ ���� EntityManager.
    ����� �� ������ ���������� ��������� EntityManager ������ � ���� ����� ��������� � ���� typescript instance class��.
    ��� ��������� ���������� Entity ������� ����� ����� � ������ ����� � ������ �������� � ���� ����� ��� �������������. 
    ����� ������� �� ������� ���������� ������ ������������ ���������� �����. 
    �������� ������ �����������, ��� ���������� ����� ���������� ���� � ������ ���� ��������� ������� ������� �������� ������������. 

    ����� ����� ��� ������� � ������������� ����������. ��������, ������� ��� ������������� ��� ��� ���� Entity, ��������, ��������� Entity � ������ ����� ����� UEntity,
    � �������������������� �������� ����� Serialize(), Deserialize, ect, �� ������� ��������� UEntityManager. ��� �������� ��������� ���������� ���� �� �������� � ��������� ����� Entity. 
    ������ � ������� ��������� ����� ������ ��������. 

    �����������: 
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
    //����� ����������.
    //TimeToUpdate.
    public timeToUpdate: number;
    //��������, ������������� ��� ���������� ��� �������� ������������� ��������. 
    //Delegates triggered when a serving entity is added or deleted.
    public new_entity_delegate: UDelegate;
    public remove_entity_delegate: UDelegate;

    constructor() {
        this.new_entity_delegate = new UDelegate();
        this.remove_entity_delegate = new UDelegate();
        this.timeToUpdate = 5000;
    }
    //��� ������� ����������� UEntityManager �� ������. ����������� �� ��������, ��� ��� � ��� ���� �������� � async-await.
    //This function adjusts the object to work. The constructor is not suitable, since there are async-await operations.
    public async Initialization() {
        this.SetupUpdateTimer();
        await this.UpdateEntity();
    }
    //������� ������� ��������� ���������� EntityManager;
    //Basic update time setting.
    SetupUpdateTimer = () =>
    {
        setInterval(() => {
            this.UpdateEntity()
        },
        this.timeToUpdate);
    }
    //������� ������� ���������� ����� Entities;
    //Base function to recive entities
    public async UpdateEntity()
    {

    }

}
