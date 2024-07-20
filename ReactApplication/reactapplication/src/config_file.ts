import { UEntityManager } from "./Core/JSON/JSONEntityManager"
import {AxiosInstance} from 'axios';
export const host_link: string = "http://localhost/drupal";
export let csrf_token: string = "None";
export let session: AxiosInstance | null = null;
export let EntityManager: UEntityManager | null = null;


export function GetCsrf_Token(): string {
    return csrf_token;
}

export function SetCsrf_Token(newValue: string): void {
    csrf_token = newValue;
}

export function GetSession(): AxiosInstance | null {
    return session;
}

export function SetSession(newValue: AxiosInstance): void {
    session = newValue;
}

export function GetEntityManager(): UEntityManager | null {
    return EntityManager;
}

export function SetEntityManager(newValue: UEntityManager): void {
    EntityManager = newValue;
}