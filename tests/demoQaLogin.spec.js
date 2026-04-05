const {test, expect} = require('@playwright/test');
const path = require('path');
const dotenv = require('dotenv');
const testData = require('../utilities/testData.json')
dotenv.config({ path: '../.env' });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

test('test', async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('link', { name: 'Book Store Application' }).click();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('UserName').click();
  await page.getByPlaceholder('UserName').fill(process.env.APP_USERNAME);
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(process.env.APP_PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Go To Book Store' }).click();
  await page.getByPlaceholder('Type to search').click();
  await page.getByPlaceholder('Type to search').fill(testData.searchText);
  //await expect(page.locator('[id="see-book-Learning JavaScript Design Patterns"]')).toContainText('Learning JavaScript Design Patterns');
  //await expect(page.getByRole('cell', { name: 'Addy Osmani' })).toBeVisible();
  //await expect(page.getByRole('cell', { name: 'O\'Reilly Media' })).toBeVisible();
  //await expect(page.getByRole('link', { name: 'Learning JavaScript Design' })).toBeVisible();
  const tableContents=await page.locator('div.books-wrapper table tbody tr').all();
  console.log(tableContents.length);
  for(const tablecontent of tableContents){
    if(await tablecontent.locator('td:nth-child(2)').textContent()=='Learning JavaScript Design Patterns')
    {
      const author = await tablecontent.locator('td:nth-child(3)').innerText();
      console.log(author);
      const publisher = await tablecontent.locator('td:nth-child(4)').innerText();
      console.log(publisher);
    }
  }
  await page.getByRole('button', { name: 'Log out' }).click();
});