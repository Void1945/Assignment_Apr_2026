const { page } = require('@playwright/test');

class BookPage {

    constructor(page) {
        this.page = page;
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.usernameField = page.getByPlaceholder('UserName');
        this.passwordField = page.getByPlaceholder('Password');
        this.bookStoreButton = page.getByRole('button', { name: 'Go To Book Store' });
        this.searchField = page.getByPlaceholder('Type to search');
        this.resultsTable = page.locator('div.books-wrapper table tbody tr');
        this.logoutButton = page.getByRole('button', { name: 'Log out' });
    }

    async login() {
        await this.loginButton.click();
    }

    async enterUserName(username) {
        await this.usernameField.click();
        await this.usernameField.fill(username);

    }

    async enterPassword(password) {
        await this.passwordField.click();
        await this.passwordField.fill(password)
    }

    async gotoBookStore() {
        await this.bookStoreButton.click();
    }

    async searchForBook(searchText) {
        await this.searchField.fill(searchText);
    }

    async logout() {
        await this.logoutButton.click();
    }

    async retrieveAndPrintBookDetails(searchText) {
        const tableContents = await this.resultsTable.all();
        //console.log(tableContents.length);
        for (const tablecontent of tableContents) {
            if (await tablecontent.locator('td:nth-child(2)').textContent() == searchText) {
                const author = await tablecontent.locator('td:nth-child(3)').innerText();
                //console.log(author);
                const publisher = await tablecontent.locator('td:nth-child(4)').innerText();
                //console.log(publisher);
                return {tablecontent, author, publisher};
            }
        }
    }
}

module.exports = {BookPage};