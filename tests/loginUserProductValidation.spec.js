const { test, expect } = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const testData = require('../utilities/testData.json')
dotenv.config({ path: '../.env' });
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const { HomePage } = require('../pages/homePage');
const { BookPage } = require('../pages/bookspage');

test('Verify the scenario where the search results in proper book list', async ({ page }) => {
    const bookPage = new BookPage(page);
    const homePage = new HomePage(page);
    await page.goto('/');
    await homePage.clickOnBookStorebutton();
    await bookPage.login();
    await bookPage.enterUserName(process.env.APP_USERNAME);
    await bookPage.enterPassword(process.env.APP_PASSWORD);
    await bookPage.login();
    await bookPage.gotoBookStore();
    await bookPage.searchForBook(testData.searchText);
    const bookDetails = await bookPage.retrieveAndPrintBookDetails(testData.searchText);
    await expect(bookDetails.tablecontent).toContainText(testData.searchText);
    console.log(bookDetails.author);
    console.log(bookDetails.publisher);
    await bookPage.logout();
});