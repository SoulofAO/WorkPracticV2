import * as JsonApplicationLibrary from './JsonApplicationLibrary';
import { UWorker } from '../Worker';
import { UEntityManager } from "./JSONEntityManager"

//Тип UEntityManager обслуживающий всех workers. Читайте общее устройство в  описании абстрактного класса UEntityManager.
//The type of UEntityManager that serves all workers. Read the general device in the description of the abstract UEntityManager class.
export class UWorkerEntityManager extends UEntityManager {
    public workers: UWorker[] = [];
    public serverStatus: boolean = false;
    //HelperFunctions
    //Вспомогательные функции
    private FindWorkerInWorkersByName(worker_name: string, workers: UWorker[]): UWorker | null {
        return workers.find(worker => worker.name === worker_name) || null;
    }

    private FindWorkerByID(worker_id: string, workers: UWorker[]): UWorker | null {
        return workers.find(worker => worker.id === worker_id) || null;
    }

    //Функции добавления или удаления Worker в локальную копию. Вызывает делегат, на который подписаны Widgets.
    //Functions for adding or removing Worker to a local copy. Calls the delegate that Widgets are subscribed to.
    private AddWorker(worker: UWorker): void {
        this.workers.push(worker);
        this.new_entity_delegate.Broadcast(worker);
    }

    private RemoveWorker(worker: UWorker): void {
        const index = this.workers.indexOf(worker);
        if (index > -1) {
            this.workers.splice(index, 1);
        }
        this.remove_entity_delegate.Broadcast(worker);
    }

    //Принцип таков. Entity Manager получает все необходимые сущности, инициализирует их и проверяет их существование в своей копии. В случае новой копии или отсутсвия копии, добавляет ее или удаляет.
    //The principle is as follows.Entity Manager gets all the necessary entities, initializes them and checks their existence in its copy. In case of a new copy or missing copy, add it or delete it.
    public async UpdateEntity()
    {
        await super.UpdateEntity();
        const new_workers: UWorker[] = [];
        const response = await JsonApplicationLibrary.GetWorkersRequest();
        if (response != null && response.status === 200) {
            this.serverStatus = true;
            this.update_entity_delegate.Broadcast(true);
            const body = await response.data;
            for (const json_entity of body.data) {
                const worker = new UWorker();
                worker.SerializeJSON(json_entity);
                new_workers.push(worker);
            }
        }
        else
        {
            this.serverStatus = false;
            this.update_entity_delegate.Broadcast(false);
        }

        const workers_to_remove: UWorker[] = [];
        for (const worker of this.workers)
        {
            if(!this.FindWorkerByID(worker.id, new_workers))
            { 
                workers_to_remove.push(worker)
            }
        } 
        workers_to_remove.forEach(worker => this.RemoveWorker(worker));

        const workers_to_add: UWorker[] = [];
        for (const worker of new_workers)
        {
            if (!this.FindWorkerByID(worker.id, this.workers))
            {
                workers_to_add.push(worker)
            }
        }
        workers_to_add.forEach(worker => this.AddWorker(worker));
    }
    //Management functions of the corresponding Entities on the server.
    //Функции управления соответствующими объектами на сервере.
    public async DeleteWorker(worker: UWorker) {
        await JsonApplicationLibrary.DeleteWorker(worker);
        this.UpdateEntity();
    }

    public async NewWorker(worker: UWorker) {
        await JsonApplicationLibrary.PostNewWorker(worker);
        this.UpdateEntity();
    }

    public async PatchWorker(worker: UWorker) {
        await JsonApplicationLibrary.PatchWorker(worker);
        this.UpdateEntity();
    }
}
