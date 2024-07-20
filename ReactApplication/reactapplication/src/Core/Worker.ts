import * as JsonLibrary from './JSON/JsonLibrary';
import * as fs from 'fs';

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
                        "type": "taxonomy_term--tip_podrazdeleniya",
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
        const body = newWorkerExample;
        JsonLibrary.replaceVariablesByName(body, "title", this.name);
        JsonLibrary.replaceVariablesByName(body, 'field_pochta', this.email);
        JsonLibrary.replaceVariablesByName(body, 'field_strana', this.country, 0);
        JsonLibrary.replaceVariablesByName(body, 'field_podrazdelenie', this.podrazdelenie);
        JsonLibrary.replaceVariablesByName(body, 'field_podrazdelenie', this.podrazdelenie);
        return body;
    }

    public DeserializePatchJSON(): any {
        const body = patchWorkerExample;
        JsonLibrary.replaceVariablesByName(body, "id", this.id);
        JsonLibrary.replaceVariablesByName(body, "title", this.name);
        JsonLibrary.replaceVariablesByName(body, 'field_pochta', this.email);
        JsonLibrary.replaceVariablesByName(body, 'field_strana', this.country, 0);
        JsonLibrary.replaceVariablesByName(body, 'field_podrazdelenie', this.podrazdelenie);
        return body;
    }
}