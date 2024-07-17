import * as configFile from '../../config_file';
import * as JsonLibrary from './JsonLibrary';


function MyComponent() {
    const [data, setData] = useState(null);

    return (
        data
    );
}

export default MyComponent;

interface Worker {
    DeserializeJSON(): any;
    DeserializePatchJSON(): any;
    id: string;
}

export async function GetWorkersRequest(): Promise<[number, any]>
{
    const url = `${configFile.host_link}/jsonapi/node/rabotnik`;
    const response: AxiosResponse = await <string>(configFile.session).post(url, body, { params, headers });
    console.log(response.data);

}

export async function LoginOnDrupal(): Promise<void> {
    const axios = require('axios');
    configFile.SetSession(axios.create());
    const url = `${configFile.host_link}/user/login`;
    const username = 'Oleg';
    const password = '12099021qQ!!';

    const body = {
        name: username,
        pass: password
    };
    const params = {
        _format: 'json'
    };

    const headers = {
        'Content-Type': 'application/vnd.api+json'
    };

        const response: AxiosResponse = axios.login(url, body, { params, headers });
        configFile.SetSession(response.session)

        console.log(response.data);
        configFile.SetCsrf_Token(String(JsonLibrary.findVariablesByName(response.data, 'csrf_token')[0]));
    } catch (error : any) {
        console.error("Ошибка при выполнении POST запроса:");
        console.error(`Статус код ошибки: ${error.response?.status}`);
        console.error(`Текст ошибки: ${error.response?.data}`);
    }
}

export async function PostNewWorker(new_worker: Worker): Promise<void> {
    const url = `${configFile.host_link}/jsonapi/node/rabotnik`;

    const body = new_worker.DeserializeJSON();

    const headers = {
        'Content-Type': 'application/vnd.api+json',
        'X-CSRF-Token': String(configFile.csrf_token)
    };
    console.log(String(headers));

    try {
        const response: AxiosResponse = await configFile.session.post(url, body, { headers });
        console.log("Новый рабочий создан:");
        console.log(response.data);
    } catch (error) {
        console.error("Ошибка при выполнении POST запроса:");
        console.error(`Статус код ошибки: ${error.response?.status}`);
        console.error(`Текст ошибки: ${error.response?.data}`);
    }
}

export async function DeleteWorker(delete_worker: Worker): Promise<void> {
    const url = `${configFile.host_link}/jsonapi/node/rabotnik/${delete_worker.id}`;

    const headers = {
        'X-CSRF-Token': String(configFile.csrf_token)
    };

    try {
        await configFile.session.delete(url, { headers });
        console.log("Sucsess delete");
    } catch (error) {
        console.error("Ошибка при выполнении DELETE запроса:");
        console.error(`Статус код ошибки: ${error.response?.status}`);
        console.error(`Текст ошибки: ${error.response?.data}`);
    }
}

export async function PatchWorker(patch_worker: Worker): Promise<void> {
    const url = `${configFile.host_link}/jsonapi/node/rabotnik/${patch_worker.id}`;
    const body = patch_worker.DeserializePatchJSON();

    const headers = {
        'Content-Type': 'application/vnd.api+json',
        'X-CSRF-Token': String(configFile.csrf_token)
    };

    try {
        await configFile.session.patch(url, body, { headers });
        console.log("Sucsess patch");
    } catch (error) {
        console.error("Ошибка при выполнении Patch запроса:");
        console.error(`Статус код ошибки: ${error.response?.status}`);
        console.error(`Текст ошибки: ${error.response?.data}`);
    }
}

export async function GetAllPodrazdelenieOptions(): Promise<[number, any]> {
    const url = `${configFile.host_link}/jsonapi/taxonomy_term/tip_podrazdeleniya`;

    try {
        const response: AxiosResponse = await axios.get(url);
        return [response.status, response.data];
    } catch (error) {
        console.error("Ошибка при выполнении GET запроса");
        console.error(`Статус код ошибки: ${error.response?.status}`);
        console.error(`Текст ошибки: ${error.response?.data}`);
        throw error;
    }
}

export async function GetAllPodrazdelenieOptionNames(): Promise<string[]> {
    try {
        const [status, data] = await GetAllPodrazdelenieOptions();
        if (status === 200) {
            return data.data.map((json_entity: any) => {
                const name = JsonLibrary.find_variables_by_name(json_entity, "name");
                return String(name).slice(2, -2);
            });
        } else {
            return ["None"];
        }
    } catch (error) {
        console.error(error);
        return ["None"];
    }