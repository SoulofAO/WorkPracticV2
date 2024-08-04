import * as JsonLibrary from './JSON/JsonLibrary';
import * as fs from 'fs';
import * as JSONApplicationLibrary from './JSON/JsonApplicationLibrary'
import * as config_file from '../config_file'

/*
    Это примеры того, как должна выглядеть итоговая Body запроса в Drupal. 
    Дело в том, что данная запись содержит огромное количество переменных.
    Поэтому вместо того что бы конструировать ее с нуля я беру существующую в качестве примера и заменяю там элементы. 
    patchWorkerExample используется для обновления существующего Worker и за его Body отвечает DeserializePatchJSON, 
    newWorkerExample используется для создание нового Worker и за его Body отвечает DeserializeJSON


    These are examples of what the final Request Body in Drupal should look like.
    The fact is that this record contains many variables. 
    Therefore, instead of designing it from scratch, I take the existing one as an example and replace the elements there.
    patchWorkerExample is used to update an existing Worker and DeserializePatchJSON is responsible for its Body, 
    newWorkerExample is used to create a new Worker and DeserializeJSON is responsible for its Body
*/

const patchWorkerExample =
{
    "data":
    {
        "type": "node--rabotnik",
        "id": "test_id",
        "attributes": {
            "revision_log": null,
            "status": true,
            "title": "НЕ Пушкин V3",
            "created": "2024-07-05T08:41:06+00:00",
            "promote": true,
            "sticky": false,
            "revision_translation_affected": true,
            "path": {
                "alias": null,
                "pid": null,
                "langcode": "us"
            },
            "body": null,
            "field_pochta": "gjkhhjkhbkb@gmail.com",
            "field_podrazdelenie": "Отдел маркетинга",
            "field_strana": "US"
        },
        "relationships": {
            "field_tip_dolzhnosti": {
                "data": {
                    "type": "taxonomy_term--tip_dolzhnosti",
                    "id": "5a131f8d-9d85-4454-b4d0-fc84404ace77"
                },
                "links": {
                    "related": {
                        "href": "http://localhost/drupal/jsonapi/node/rabotnik/b343a75c-8d8d-4f93-8d95-967a72563fff/field_tip_dolzhnosti?resourceVersion=id%3A9"
                    },
                    "self": {
                        "href": "http://localhost/drupal/jsonapi/node/rabotnik/b343a75c-8d8d-4f93-8d95-967a72563fff/relationships/field_tip_dolzhnosti?resourceVersion=id%3A9"
                    }
                }
            }
        }
    }
}

const newWorkerExample =
    {
        "data":
        {
            "type": "node--rabotnik",
            "links": {
                "self": {
                    "href": "http://localhost/drupal/jsonapi/node/rabotnik/b343a75c-8d8d-4f93-8d95-967a72563fff?resourceVersion=id%3A9"
                }
            },
            "attributes": {
                "revision_log": null,
                "status": true,
                "title": "НЕ Пушкин V3",
                "created": "2024-07-05T08:41:06+00:00",
                "promote": true,
                "sticky": false,
                "revision_translation_affected": true,
                "path": {
                    "alias": null,
                    "pid": null,
                    "langcode": "us"
                },
                "body": null,
                "field_pochta": "gjkhhjkhbkb@gmail.com",
                "field_podrazdelenie": "Отдел маркетинга",
                "field_strana": "US"
            },
            "relationships": {
                "node_type": {
                    "data": {
                        "type": "node_type--node_type",
                        "id": "0c22e7b5-7a69-4503-8db8-e0195d714b77"
                    },
                    "links": {
                        "related": {
                            "href": "http://localhost/drupal/jsonapi/node/rabotnik/b343a75c-8d8d-4f93-8d95-967a72563fff/node_type?resourceVersion=id%3A9"
                        },
                        "self": {
                            "href": "http://localhost/drupal/jsonapi/node/rabotnik/b343a75c-8d8d-4f93-8d95-967a72563fff/relationships/node_type?resourceVersion=id%3A9"
                        }
                    }
                },
                "uid": {
                    "data": {
                        "type": "user--user",
                        "id": "8ce981d0-5ecb-4f54-96c2-eafcf1d33456"
                    },
                    "links": {
                        "related": {
                            "href": "http://localhost/drupal/jsonapi/node/rabotnik/b343a75c-8d8d-4f93-8d95-967a72563fff/uid?resourceVersion=id%3A9"
                        },
                        "self": {
                            "href": "http://localhost/drupal/jsonapi/node/rabotnik/b343a75c-8d8d-4f93-8d95-967a72563fff/relationships/uid?resourceVersion=id%3A9"
                        }
                    }
                },
                "field_foto": {
                    "data": null,
                    "links": {
                        "related": {
                            "href": "http://localhost/drupal/jsonapi/node/rabotnik/b343a75c-8d8d-4f93-8d95-967a72563fff/field_foto?resourceVersion=id%3A9"
                        },
                        "self": {
                            "href": "http://localhost/drupal/jsonapi/node/rabotnik/b343a75c-8d8d-4f93-8d95-967a72563fff/relationships/field_foto?resourceVersion=id%3A9"
                        }
                    }
                },
                "field_tip_dolzhnosti": {
                    "data": {
                        "type": "taxonomy_term--tip_dolzhnosti",
                        "id": "5a131f8d-9d85-4454-b4d0-fc84404ace77"
                    },
                    "links": {
                        "related": {
                            "href": "http://localhost/drupal/jsonapi/node/rabotnik/b343a75c-8d8d-4f93-8d95-967a72563fff/field_tip_dolzhnosti?resourceVersion=id%3A9"
                        },
                        "self": {
                            "href": "http://localhost/drupal/jsonapi/node/rabotnik/b343a75c-8d8d-4f93-8d95-967a72563fff/relationships/field_tip_dolzhnosti?resourceVersion=id%3A9"
                        }
                    }
                }
            }
        }
    } 
// Work Position. Используется для представления Taxonomy Work Position на стороне Client. Обрабатывается UWorkPositionEntityManager.
// Work Position. It is used to represent the Taxonomy Work Position on the Client side. The UWorkPositionEntityManager is being processed.
export class UWorkPosition
{
    public name: string;
    public id: string;

    constructor(name: string = "NoName", id: string = "") {
        this.name = name;
        this.id = id;
    }

    // Преобразование данных из JSON в свойства объекта
    // Converting data from JSON to object properties
    public async SerializeJSON(json: any): void {
        this.name = String(JsonLibrary.findVariablesByName(json, 'name')[0]);
        this.id = String(JsonLibrary.findVariablesByName(json, 'id')[0]);
    }


}

// Worker. Используется для представления типа материала Worker на стороне Client. Обрабатывается UWorkerEntityManager.
// Worker. It is used to represent the type of Worker material on the Client side. The UWorkerEntityManager is being processed.
export class UWorker {
    public name: string;
    public email: string;
    public country: string;
    public workPosition: UWorkPosition| null;
    public podrazdelenie: string;
    public id: string;

    constructor(name: string = "NoName", email: string = "", country: string = "None", workPosition: UWorkPosition | null, podrazdelenie: string = "None", id: string = "None") {
        this.name = name;
        this.email = email;
        this.country = country;
        this.workPosition = workPosition;
        this.podrazdelenie = podrazdelenie;
        this.id = id;
    }

    // Преобразование данных из JSON в свойства объекта
    // Converting data from JSON to object properties
    public SerializeJSON(json: any): void {
        this.name = String(JsonLibrary.findVariablesByName(json, 'title')[0]);
        this.id = String(JsonLibrary.findVariablesByName(json, 'id')[0]);
        this.email = String(JsonLibrary.findVariablesByName(json, 'field_pochta')[0]);
        this.country = String(JsonLibrary.findVariablesByName(json, 'field_strana')[0]);
        this.podrazdelenie = String(JsonLibrary.findVariablesByName(json, 'field_podrazdelenie')[0]);
        const workPositionID = String(JsonLibrary.findVariablesByName(json, 'field_tip_dolzhnosti')[0].data.id)
        this.workPosition = config_file.GetWorkPositionEntityManager().FindWorkPositionByID(workPositionID, config_file.GetWorkPositionEntityManager()?.workPositions);
    }

    // Преобразование обьекта в Json для создания нового Worker на стороне сервера.
    //Converting an object to Json to create a new Worker on the server side.
    public DeserializeJSON(): any {
        const body = newWorkerExample;
        JsonLibrary.replaceVariablesByName(body, "title", this.name, 0);
        JsonLibrary.replaceVariablesByName(body, 'field_pochta', this.email, 0);
        JsonLibrary.replaceVariablesByName(body, 'field_strana', this.country, 0);
        JsonLibrary.replaceVariablesByName(body, 'field_podrazdelenie', this.podrazdelenie, 0);
        const workPositionData = JsonLibrary.findVariablesByName(body, 'field_tip_dolzhnosti')[0];
        JsonLibrary.replaceVariablesByName(workPositionData, 'id', this.workPosition?.id, 0);
        JsonLibrary.replaceVariablesByName(body, 'field_tip_dolzhnosti', workPositionData, 0);
        return body;
    }

    // Преобразование обьекта в Json для обновления Worker на стороне сервера.
    // Converting an object to Json for updating Worker on the server side.

    public DeserializePatchJSON(): any {
        const body = patchWorkerExample;
        JsonLibrary.replaceVariablesByName(body, "id", this.id);
        JsonLibrary.replaceVariablesByName(body, "title", this.name);
        JsonLibrary.replaceVariablesByName(body, 'field_pochta', this.email);
        JsonLibrary.replaceVariablesByName(body, 'field_strana', this.country, 0);
        JsonLibrary.replaceVariablesByName(body, 'field_podrazdelenie', this.podrazdelenie);
        const workPositionData = JsonLibrary.findVariablesByName(body, 'field_tip_dolzhnosti')[0];
        JsonLibrary.replaceVariablesByName(workPositionData, 'id', this.workPosition?.id, 0);
        JsonLibrary.replaceVariablesByName(body, 'field_tip_dolzhnosti', workPositionData, 0);
        return body;
    }
}