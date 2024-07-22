import * as JsonApplicationLibrary from './JsonApplicationLibrary';
import { UWorker } from '../Worker';
import { UEntityManager } from "./JSONEntityManager"

export class UWorkerEntityManager extends UEntityManager {
    public workers: UWorker[] = [];

    private FindWorkerInWorkersByName(worker_name: string, workers: UWorker[]): UWorker | null {
        return workers.find(worker => worker.name === worker_name) || null;
    }

    private FindWorkerByID(worker_id: string, workers: UWorker[]): UWorker | null {
        return workers.find(worker => worker.id === worker_id) || null;
    }

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

    public async UpdateEntity()
    {
        const new_workers: UWorker[] = [];
        const response = await JsonApplicationLibrary.GetWorkersRequest();
        if (response!=null && response.status === 200) {
            const body = await response.data;
            for (const json_entity of body.data)
            {
                const worker = new UWorker();
                worker.SerializeJSON(json_entity);
                new_workers.push(worker);
            }
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
