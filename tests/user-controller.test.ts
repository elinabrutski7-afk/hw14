// tests/api.spec.ts
import {test, expect} from '@playwright/test';
import type {APIRequestContext} from '@playwright/test';
import { StatusCodes } from 'http-status-codes'
import {response} from "express";
import {base} from "@faker-js/faker";
import {cleanupUsers} from "../helpers/cleanupUsers";
import {baseURL} from "../helpers/baseUrl";

test.describe('User management API', () => {

    test('all users: should return empty array when no users', async ({ request }) => {
        await cleanupUsers(request);
        const responseAfterCleanup = await request.get(`${baseURL}`);
        const usersAfterCleanUp = await responseAfterCleanup.json();
        expect(usersAfterCleanUp.length).toBe(0);
    });

    test('find user: should return a user by ID', async ({ request }) => {
        const user = await request.post(`${baseURL}`);
        const userBody = await user.json();
        const userId = userBody.id;

        const response = await request.get(`${baseURL}/${userId}`);
        const respBody = await response.json();

        console.log(respBody);

        expect(response.status()).toBe(StatusCodes.OK);
        expect(respBody.id).toBe(userId);
    });

    test('find user: should return 404 if user not found', async ({ request }) => {
    const invalidUserId = 101;

    const response = await request.get(`${baseURL}/${invalidUserId}`);
    const respBody = await response.json();

    console.log(respBody);

    expect(response.status()).toBe(StatusCodes.NOT_FOUND);
    }); // always more than 100, id > 100

    test('create user: should add a new user', async ({ request }) => {
        const response = await request.post(`${baseURL}`);
        const respBody = await response.json();

        console.log(respBody);

        expect(response.status()).toBe(StatusCodes.CREATED);
    });

    test('delete user: should delete a user by ID', async ({ request }) => {
        const user = await request.post(`${baseURL}`);
        const userBody = await user.json();
        const userId = userBody.id;

        const response = await request.delete(`${baseURL}/${userId}`);
        const respBody = await response.json();

        console.log(respBody);

        expect(response.status()).toBe(StatusCodes.OK);
    });

    test('delete user: should return 404 if user not found', async ({ request }) => {
        const invalidUserId = 101;

        const response = await request.delete(`${baseURL}/${invalidUserId}`);
        const respBody = await response.json();

        console.log(respBody);

        expect(response.status()).toBe(StatusCodes.NOT_FOUND);
    });
});
