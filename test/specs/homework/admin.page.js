
import BasicUser from "./basic.page.js";

class Admin extends BasicUser {

    get fieldSearch() { return $('[type="search"]');}; 
    get buttonDelete() { return $('.fa-trash');};
    get buttonUserDelete() { return $('.btn-sm');};
    get buttonSubmit() { return $('[type="submit"]');};
    get loading() {return $('#DataTables_Table_0_processing');};
    //open web on login form
    async open() {
        await browser.reloadSession();
        await browser.url('/prihlaseni');
    };
   //open list of all registered users
    async openUsersList() {
        await browser.url('/admin/uzivatele')
        await this.loading.waitForDisplayed({ reverse: true});
    };
    //find user by name and delete the user
    async userDelete (userName) {
        await this.fieldSearch.setValue(userName);
        await browser.pause(2000);
        await this.buttonDelete.click();
        await this.buttonUserDelete.click();
        await this.buttonSubmit.click();
    };
};
export default new Admin();