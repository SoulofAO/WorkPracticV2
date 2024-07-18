import * as config_file from './config_file';
import axios from 'axios';
import { replaceVariablesByName, findVariablesByName } from "./Core/JSON/JsonLibrary"


export const GetWorkersRequest = async () => {
    const url = config_file.host_link + "/jsonapi/node/rabotnik"; 

    try {
        const response = await fetch(url);
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
};



export const LoginOnDrupal = async () => {
    try {
        const url = config_file.host_link + "/jsonapi/node/rabotnik"; 
        const response = await axios.post((url),
            {
            name: 'Oleg',
            pass: '12099021qQ!!!'
            },
            {
            params: {
                _format: 'json'
            },
            headers: {
                'Content-Type': 'application/vnd.api+json'
            }
            }
        );

        if (response.status === 200) {
            const data = response.data;
            console.log(data);
            const csrfToken = data.csrf_token;
            config_file.SetCsrf_Token(csrfToken);
        } else {
            console.error('Error executing LOGIN request:');
            console.error("Error status code: " + String(response.status));
            console.error("Error text: " + String(response.data));
        }
    }
    catch (error) {
        console.error('An error occurred:', error);
    }

    return null;
};


export const postNewWorker = async (newWorker: NewWorker): Promise<void> => {
    const url = config_file.host_link + "/jsonapi/node/rabotnik"; 
    const body = newWorker.DeserializeJSON();
    const headers = {
        'Content-Type': 'application/vnd.api+json',
        'X-CSRF-Token': String(config_file.GetCsrf_Token())
    };

    try {
        const response= await axios.post(url, body, { headers });

        if (response.status === 201) {
            const newPost = response.data;
            console.log("New Worker Create");
            console.log(newPost);
        } else {
            console.error('Error executing POST request:');
            console.error("Error status code: " + String(response.status));
            console.error("Error text: " + String(response.data));
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
};



export const DeleteWorker = async (remove_Worker: NewWorker): Promise<void> => {
    const url = config_file.host_link + "/jsonapi/node/rabotnik" + "/" + remove_Worker.id ;
    const headers = {
        'X-CSRF-Token': String(config_file.GetCsrf_Token())
    };

    try {
        const response = await axios.delete(url, { headers });

        if (response.status === 204) {
            console.log("Remove Worker Delete");
        } else {
            console.error('Error executing DELETE request:');
            console.error("Error status code: " + String(response.status));
            console.error("Error text: " + String(response.data));
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

export const PatchWorker = async (patch_Worker: NewWorker): Promise<void> => {
    const url = config_file.host_link + "/jsonapi/node/rabotnik" + "/" + remove_Worker.id;
    const body = patch_Worker.DeserializePatchJSON();
    const headers = {
        'Content-Type': 'application/vnd.api+json',
        'X-CSRF-Token': String(config_file.GetCsrf_Token())
    };
    

    try {
        const response = await axios.patch(url, body, { headers });

        if (response.status === 200) {
            console.log("patch Worker Patch");
        } else {
            console.error('Error executing PATCH request:');
            console.error("Error status code: " + String(response.status));
            console.error("Error text: " + String(response.data));
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
};


export const GetAllPodrazdelenieOptions = async () => {
    const url = config_file.host_link + '/jsonapi/taxonomy_term/tip_podrazdeleniya';

    try {
        const response = await fetch(url);
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const GetAllPodrazdelenieOptionNames = async () => {
    const response = await GetAllPodrazdelenieOptions();
    if (response != null && response.status === 200) {
        const items: string[] = [];
        const body = await response.json();
        for (const val of body.data)
        {
            const option: string = String(findVariablesByName(val, "name"));
            items.push(option);
        }
        return items;

    }
    else {
        const items: string[] = ["None"];
        return items;
    }
};