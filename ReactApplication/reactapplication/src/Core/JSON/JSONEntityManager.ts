import * as JsonApplicationLibrary from './JsonApplicationLibrary';
import { UWorker } from '../Worker';
import { UDelegate } from '../Other/Delegates';

export class UEntityManager {
    private workers: UWorker[] = [];
    public new_worker_delegate: UDelegate = new UDelegate();
    public remove_worker_delegate: UDelegate = new UDelegate();

    constructor() {
        this.SetupUpdateTimer();
        this.UpdateWorkers();
    }

    private SetupUpdateTimer(): void {
       setInterval(this.UpdateWorkers, 5.0);
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

    private async UpdateWorkers()
    {
        console.log("Update Complete");
        const new_workers: UWorker[] = [];
        const response = await JsonApplicationLibrary.GetWorkersRequest();
        if (response.status === 200) {
            const body = await response.json();
            for (const json_entity of body)
            {
                const worker = new UWorker();
                worker.SerializeJSON(json_entity);
                new_workers.push(worker);
            };
        }

        const workers_to_remove = this.workers.filter(worker =>
            !this.FindWorkerInWorkersByID(worker.id, new_workers));
        workers_to_remove.forEach(worker => this.RemoveWorkerFromWorkers(worker));

        const workers_to_add = new_workers.filter(worker =>
            !this.FindWorkerInWorkersByID(worker.id, this.workers));
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
