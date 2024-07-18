import { UEntityManager } from "./Core/JSON/JSONEntityManager"

export const host_link: string = "http://localhost/drupal";
export let csrf_token: string = "None";
export let session: object | null = null;
export let EntityManager: UEntityManager | null = null;


export function GetCsrf_Token(): string {
    return csrf_token;
}

export function SetCsrf_Token(newValue: string): void {
    csrf_token = newValue;
}

export function GetSession(): object | null {
    return session;
}

export function SetSession(newValue: object): void {
    session = newValue;
}

export function GetEntityManager(): UEntityManager | null {
    return EntityManager;
}

export function SetEntityManager(newValue: UEntityManager): void {
    EntityManager = newValue;
}