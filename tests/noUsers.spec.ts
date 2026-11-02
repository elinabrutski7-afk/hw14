import {test, expect} from '@playwright/test';
import type {APIRequestContext} from '@playwright/test';
import { StatusCodes } from 'http-status-codes'
import {response} from "express";
import {base} from "@faker-js/faker";
import {cleanupUsers} from "../helpers/cleanupUsers";
import {baseURL} from "../helpers/baseUrl";

test('GET with no users', async ({ request }) => {
    await cleanupUsers(request);

    const response = await request.get(`${baseURL}`);
    const respBody = await response.json();

    console.log(respBody);

    expect(response.status()).toBe(200);
    expect(respBody).toEqual([]);

})