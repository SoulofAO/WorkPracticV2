import * as config_file from './config_file';
import { useDrupalJSONAPI } from "react-drupal-json-api";

const GetWorkersRequest = async () => {
    const url = config_file.host_link + "/jsonapi/node/rabotnik"; 

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default GetWorkersRequest;
