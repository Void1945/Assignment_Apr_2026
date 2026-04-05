const { test, expect, request } = require('@playwright/test');
const testData = require('../../utilities/testData.json')
const { writeToTestData } = require('../../utilities/fileInsertTestData')
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

let apiContext;

test.beforeAll(async () => {
    apiContext = await request.newContext({ baseURL: process.env.API_BASE_URL, extraHTTPHeaders: { 'x-api-key': process.env.API_KEY } })
});

test.afterAll(async () => {
    await apiContext.dispose();
});

test('Creating new user record', async () => {

    const response = await apiContext.post('register', { data: { "email": `${testData.email}`, "password": `${testData.password}` } });
    console.log(response.status());
    const body = await response.json();
    console.log(body);
    writeToTestData({ userId: body.id })
    //console.log(userId);
    expect(response.status()).toBe(200);
});

test('Validating newly created user details', async () => {
    const response = await apiContext.get(`users/${testData.userId}`);

    console.log(response.status());
    const body = await response.json();
    console.log(body);
    expect(body.data.email).toBe(testData.email);
    expect(body.data.first_name).toBe("Eve");
    expect(body.data.last_name).toBe("Holt")
    expect(response.status()).toBe(200);
});

test('Updating the user record', async () => {
    const response = await apiContext.put(`users/${testData.userId}`, { data: { "name": `${testData.updatedName}`, "job": `${testData.updatedJob}` } });
    console.log(response.status());
    const body = await response.json();
    console.log(body);
    expect(body.name).toBe(testData.updatedName);
    expect(body.job).toBe(testData.updatedJob)
    expect(response.status()).toBe(200);
});