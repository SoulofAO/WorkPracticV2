import * as JsonLibrary from './JSON/JsonLibrary';
import * as fs from 'fs';

class UWorker {
    name: string;
    email: string;
    country: string;
    work_position: string;
    podrazdelenie: string;
    id: string;

    constructor(name: string = "NoName", email: string = "", country: string = "None", work_position: string = "None", podrazdelenie: string = 'None', id: string = "None") {
        this.name = name;
        this.email = email;
        this.country = country;
        this.work_position = work_position;
        this.podrazdelenie = podrazdelenie;
        this.id = id;
    }

    SerializeJSON(json: any): void {
        this.name = String(JsonLibrary.(json, 'title')[0]);
        this.id = String(JsonLibrary.find_variables_by_name(json, 'id')[0]);
        this.email = String(JsonLibrary.find_variables_by_name(json, 'field_pochta')[0]);
        this.country = String(JsonLibrary.find_variables_by_name(json, 'field_strana')[0]);
        this.podrazdelenie = String(JsonLibrary.find_variables_by_name(json, 'field_podrazdelenie')[0]);
    }

    DeserializeJSON(): any {
        const reader = fs.readFileSync("BaseWorkerExample.txt", "utf8");
        const body = JSON.parse(reader);
        JsonLibrary.replace_variables_by_name(body, "title", this.name);
        JsonLibrary.replace_variables_by_name(body, 'field_pochta', this.email);
        JsonLibrary.replace_variables_by_name(body, 'field_strana', this.country, 0);
        JsonLibrary.replace_variables_by_name(body, 'field_podrazdelenie', this.podrazdelenie);
        JsonLibrary.replace_variables_by_name(body, 'field_podrazdelenie', this.podrazdelenie);
        return body;
    }

    DeserializePatchJSON(): any {
        const reader = fs.readFileSync("BaseWorkerPatchExample.txt", "utf8");
        const body = JSON.parse(reader);
        JsonLibrary.replace_variables_by_name(body, "id", this.id);
        JsonLibrary.replace_variables_by_name(body, "title", this.name);
        JsonLibrary.replace_variables_by_name(body, 'field_pochta', this.email);
        JsonLibrary.replace_variables_by_name(body, 'field_strana', this.country, 0);
        JsonLibrary.replace_variables_by_name(body, 'field_podrazdelenie', this.podrazdelenie);
        return body;
    }