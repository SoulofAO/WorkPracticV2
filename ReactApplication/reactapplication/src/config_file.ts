import { UWorkerEntityManager } from "./Core/JSON/JSONWorkerManager"
import { UWorkPositionEntityManager } from "./Core/JSON/JSONWorkPositionManager"
import { AxiosInstance } from 'axios';

//config_file это хранилище основных глобальных констант, переменных и Subsistem. Может использоваться для упрощенного доступа к коду из разных частей программы.
//config_file is a repository of basic global constants, variables, and Subsistem. It can be used for simplified access to code from different parts of the program.
export const host_link: string = "http://localhost/drupal";
export let WorkerEntityManager: UWorkerEntityManager | null = null;
export let WorkPositionEntityManager: UWorkPositionEntityManager | null = null;


export function GetWorkPositionEntityManager(): UWorkPositionEntityManager | null {
    return WorkPositionEntityManager;
}

export function SetWorkPositionEntityManager(newValue: UWorkPositionEntityManager): void {
    WorkPositionEntityManager = newValue;
}

export function GetWorkerEntityManager(): UWorkerEntityManager | null {
    return WorkerEntityManager;
}

export function SetWorkerEntityManager(newValue: UWorkerEntityManager): void {
    WorkerEntityManager = newValue;
}