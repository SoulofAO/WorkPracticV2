import * as JsonLibrary from './JSON/JsonLibrary';
import * as fs from 'fs';

export class UWorker {
    public name: string;
    public email: string;
    public country: string;
    public work_position: string;
    public podrazdelenie: string;
    public id: string;

    constructor(name: string = "NoName", email: string = "", country: string = "None", work_position: string = "None", podrazdelenie: string = 'None', id: string = "None") {
        this.name = name;
        this.email = email;
        this.country = country;
        this.work_position = work_position;
        this.podrazdelenie = podrazdelenie;
        this.id = id;
    }

    public SerializeJSON(json: any): void {
        this.name = String(JsonLibrary.findVariablesByName(json, 'title')[0]);
        this.id = String(JsonLibrary.findVariablesByName(json, 'id')[0]);
        this.email = String(JsonLibrary.findVariablesByName(json, 'field_pochta')[0]);
        this.country = String(JsonLibrary.findVariablesByName(json, 'field_strana')[0]);
        this.podrazdelenie = String(JsonLibrary.findVariablesByName(json, 'field_podrazdelenie')[0]);
    }

    public DeserializeJSON(): any {
        const reader = fs.readFileSync("../../BaseWorkerExample.txt", "utf8");
        const body = JSON.parse(reader);
        JsonLibrary.replaceVariablesByName(body, "title", this.name);
        JsonLibrary.replaceVariablesByName(body, 'field_pochta', this.email);
        JsonLibrary.replaceVariablesByName(body, 'field_strana', this.country, 0);
        JsonLibrary.replaceVariablesByName(body, 'field_podrazdelenie', this.podrazdelenie);
        JsonLibrary.replaceVariablesByName(body, 'field_podrazdelenie', this.podrazdelenie);
        return body;
    }

    public DeserializePatchJSON(): any {
        const reader = fs.readFileSync("../../BaseWorkerPatchExample.txt", "utf8");
        const body = JSON.parse(reader);
        JsonLibrary.replaceVariablesByName(body, "id", this.id);
        JsonLibrary.replaceVariablesByName(body, "title", this.name);
        JsonLibrary.replaceVariablesByName(body, 'field_pochta', this.email);
        JsonLibrary.replaceVariablesByName(body, 'field_strana', this.country, 0);
        JsonLibrary.replaceVariablesByName(body, 'field_podrazdelenie', this.podrazdelenie);
        return body;
    }
}