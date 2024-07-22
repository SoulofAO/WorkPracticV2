import * as JsonApplicationLibrary from './JsonApplicationLibrary';
import { UWorker } from '../Worker';
import { UDelegate } from '../Other/Delegates';
import * as config_file from "../../config_file"

export class UEntityManager {
    public timeToUpdate: number;
    public new_entity_delegate: UDelegate;
    public remove_entity_delegate: UDelegate;

    constructor() {
        this.new_entity_delegate = new UDelegate();
        this.remove_entity_delegate = new UDelegate();
        this.timeToUpdate = 5000;
    }

    public async Initialization() {
        this.SetupUpdateTimer();
        await this.UpdateEntity();
    }
    SetupUpdateTimer = () =>
    {
        setInterval(() => {
            this.UpdateEntity()
        },
        this.timeToUpdate);
    }

    public async UpdateEntity()
    {

    }

}
