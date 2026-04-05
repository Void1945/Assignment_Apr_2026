const {page} = require('@playwright/test');

class HomePage{

    constructor(page){
        this.page=page;
        this.bookStoreApplicationButton = page.getByRole('link', { name: 'Book Store Application' });
    }

    async clickOnBookStorebutton(){
        await this.bookStoreApplicationButton.click();
    }
}

module.exports = {HomePage};