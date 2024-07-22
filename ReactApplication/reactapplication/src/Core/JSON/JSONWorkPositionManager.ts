import * as JsonApplicationLibrary from './JsonApplicationLibrary';
import { UEntityManager } from "./JSONEntityManager"
import { UWorkPosition } from "../Worker"

export class UWorkPositionEntityManager extends UEntityManager {

    public workPositions: UWorkPosition[] = [];
    constructor() {
        super();
    }

    public GetWorkerNames(): string[] {
        const names : string[]=[]
        for (const workPosition of this.workPositions) {
            names.push(workPosition.name)
        }
        return names
    }

    public FindWorkPositionByID(workPositionId: string, workPositions: UWorkPosition[]): UWorkPosition | null {
        return workPositions.find(workPosition => workPosition.id === workPositionId) || null;
    }

    public FindWorkPositionByName(workPositionName: string, workPositions: UWorkPosition[]): UWorkPosition | null {
        return workPositions.find(workPosition => workPosition.name === workPositionName) || null;
    }

    private AddWorkPosition(workPosition: UWorkPosition): void {
        this.workPositions.push(workPosition);
        this.new_entity_delegate.Broadcast(workPosition);
    }

    private RemoveWorkPosition(workPosition: UWorkPosition): void {
        const index = this.workPositions.indexOf(workPosition);
        if (index > -1) {
            this.workPositions.splice(index, 1);
        }
        this.remove_entity_delegate.Broadcast(workPosition);
    }


    public async UpdateEntity() {
        const newWorkPositions: UWorkPosition[] = [];
        const response = await JsonApplicationLibrary.GetWorkPositionsRequest();
        if (response != null && response.status === 200) {
            const body = await response.data;
            for (const json_entity of body.data) {
                const worker = new UWorkPosition();
                worker.SerializeJSON(json_entity);
                newWorkPositions.push(worker);
            }
        }

        const workPositionToRemove: UWorkPosition[] = [];
        for (const workPosition of this.workPositions) {
            if (!this.FindWorkPositionByID(workPosition.id, newWorkPositions)) {
                workPositionToRemove.push(workPosition)
            }
        }
        workPositionToRemove.forEach(worker => this.RemoveWorkPosition(worker));

        const workPositionsToAdd: UWorkPosition[] = [];
        for (const workPosition of newWorkPositions) {
            if (!this.FindWorkPositionByID(workPosition.id, this.workPositions)) {
                workPositionsToAdd.push(workPosition)
            }
        }
        workPositionsToAdd.forEach(worker => this.AddWorkPosition(worker));
    }
}