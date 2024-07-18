import * as JsonApplicationLibrary from './JsonApplicationLibrary';
import { UWorker } from '../Worker';
import { UDelegate } from '../Other/Delegates';
import * as config_file from "../../config_file"

export class UEntityManager {
    public workers: UWorker[] = [];
    public new_worker_delegate: UDelegate;
    public remove_worker_delegate: UDelegate;

    constructor() {
        this.new_worker_delegate = new UDelegate();
        this.remove_worker_delegate = new UDelegate();
    }

    public async Initialization() {
        this.SetupUpdateTimer();
        await this.UpdateWorkers();
    }

    private SetupUpdateTimer(): void {

        setInterval(() => {
            if (config_file.GetEntityManager() != null)
            { config_file.GetEntityManager().UpdateWorkers() }},
            5000.0);
        
    }

    private FindWorkerInWorkersByName(worker_name: string, workers: UWorker[]): UWorker | null {
        return workers.find(worker => worker.name === worker_name) || null;
    }

    private FindWorkerInWorkersByID(worker_id: string, workers: UWorker[]): UWorker | null {
        return workers.find(worker => worker.id === worker_id) || null;
    }

    private AddWorkerInWorkers(worker: UWorker): void {
        this.workers.push(worker);
        this.new_worker_delegate.Broadcast(worker);
    }

    private RemoveWorkerFromWorkers(worker: UWorker): void {
        const index = this.workers.indexOf(worker);
        if (index > -1) {
            this.workers.splice(index, 1);
        }
        this.remove_worker_delegate.Broadcast(worker);
    }

    public async UpdateWorkers()
    {
        console.log("Update Complete");
        const new_workers: UWorker[] = [];
        const response = await JsonApplicationLibrary.GetWorkersRequest();
        if (response!=null && response.status === 200) {
            const body = await response.json();
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
            if(!this.FindWorkerInWorkersByID(worker.id, new_workers))
            { 
                workers_to_remove.push(worker)
            }
        } 
        workers_to_remove.forEach(worker => this.RemoveWorkerFromWorkers(worker));

        const workers_to_add: UWorker[] = [];
        for (const worker of new_workers)
        {
            if (!this.FindWorkerInWorkersByID(worker.id, this.workers))
            {
                workers_to_add.push(worker)
            }
        }
        workers_to_add.forEach(worker => this.AddWorkerInWorkers(worker));
    }

    public CreateNewWorker(): void {
        // Implementation not provided in the original code
    }

    public DeleteWorker(worker: UWorker): void {
        JsonApplicationLibrary.LoginOnDrupal();
        JsonApplicationLibrary.DeleteWorker(worker);
        this.UpdateWorkers();
    }

    public NewWorker(worker: UWorker): void {
        JsonApplicationLibrary.LoginOnDrupal();
        JsonApplicationLibrary.PostNewWorker(worker);
        this.UpdateWorkers();
    }

    public PatchWorker(worker: UWorker): void {
        JsonApplicationLibrary.LoginOnDrupal();
        JsonApplicationLibrary.PatchWorker(worker);
        this.UpdateWorkers();
    }
}
