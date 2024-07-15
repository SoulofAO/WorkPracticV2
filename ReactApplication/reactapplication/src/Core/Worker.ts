
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

    SerializeJSON(json: any) {
        this.name = String(json.title);
        this.id = String(json.id);
        this.email = String(json.field_pochta);
        this.country = String(json.field_strana);
        this.podrazdelenie = String(json.field_podrazdelenie);
    }

    DeserializeJSON() {
        let body = JSON.parse(fs.readFileSync("src/BaseWorkerExample.txt", "utf8"));
        body.title = this.name;
        body.field_pochta = this.email;
        body.field_strana = this.country;
        body.field_podrazdelenie = this.podrazdelenie;
        return body;
    }

    DeserializePatchJSON() {
        let body = JSON.parse(fs.readFileSync("src/BaseWorkerPatchExample.txt", "utf8"));
        body.id = this.id;
        body.title = this.name;
        body.field_pochta = this.email;
        body.field_strana = this.country;
        body.field_podrazdelenie = this.podrazdelenie;
        return body;
    }
}
