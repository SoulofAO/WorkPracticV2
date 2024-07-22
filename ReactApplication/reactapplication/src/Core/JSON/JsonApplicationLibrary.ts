import * as config_file from '../../config_file';
import axios from 'axios';
import { UWorker } from '../Worker';
import base64 from 'base-64';

const username = 'Oleg';
const password = '12099021qQ!!!';
const credentials = username + ":" + password;
const encodedCredentials = base64.encode(credentials);

export const GetWorkersRequest = async () =>
{


    const url = config_file.host_link + "/jsonapi/node/rabotnik";

    const config = {
        headers: {
            'Content-Type': 'application/vnd.api+json',
            'Authorization': 'Basic ' + encodedCredentials 
        }
    };

    try {
        const response = await axios.get(url, config);

        if (response.status === 200) {
            return response;
        } else {
            console.log('Error executing GET request');
            console.log("Error status code: " + response.status);
            console.log("Error text: " + response.data);
            return null;
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return null;
    }
};

export const GetTokenRequest = async () => {
    const url = config_file.host_link + "/session/token";
    try {
        const response = await fetch(url);
        return await response.text();
    } catch (error) {
        console.error(error);
        return "None";
    }
};

export const PostNewWorker = async (newWorker: UWorker): Promise<void> => {
    const url = config_file.host_link + "/jsonapi/node/rabotnik";
    const body = newWorker.DeserializeJSON();
    console.log(body);
    const headers = {
        'Content-Type': 'application/vnd.api+json',
        'Authorization': 'Basic ' + encodedCredentials
    };

    try {
        const response = await axios.post(url, body, { headers });

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
        console.error('An error POST occurred:', error);
    }
};



export const DeleteWorker = async (removeWorker: UWorker): Promise<void> => {
    const url = config_file.host_link + "/jsonapi/node/rabotnik" + "/" + removeWorker.id;
    const headers = {
        'Content-Type': 'application/vnd.api+json',
        'Authorization': 'Basic ' + encodedCredentials
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

export const PatchWorker = async (patchWorker: UWorker): Promise<void> => {
    const url = config_file.host_link + "/jsonapi/node/rabotnik" + "/" + patchWorker.id;
    const body = patchWorker.DeserializePatchJSON();
    const headers = {
        'Content-Type': 'application/vnd.api+json',
        'Authorization': 'Basic ' + encodedCredentials
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


export const GetWorkPositionsRequest = async () => {
    const url = config_file.host_link + '/jsonapi/taxonomy_term/tip_dolzhnosti';

    const config = {
        headers: {
            'Content-Type': 'application/vnd.api+json',
            'Authorization': 'Basic ' + encodedCredentials
        }
    };

    try {
        const response = await axios.get(url, config);

        if (response.status === 200) {
            return response;
        } else {
            console.log('Error executing GET request');
            console.log("Error status code: " + response.status);
            console.log("Error text: " + response.data);
            return null;
        }
    } catch (error) {
        console.error('An error occurred:', error);
        return null;
    }
};