import type {APIRequestContext} from "@playwright/test";
import {baseURL} from "./baseUrl";

export const cleanupUsers = async (request: APIRequestContext): Promise<void> => {
    const response = await request.get(`${baseURL}`);
    const users: Array<any> = await response.json();

    let i = 0;
    for (i; i < users.length; i = i + 1) {
        await request.delete(`${baseURL}/${users[i].id}`)
    }
    console.log(`Removed: ${i} users`);
}