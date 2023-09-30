

class Admin {

    get fieldEmail() { return $('#email'); };
    get fieldPassword() { return $('#password'); };
    get buttonConfirm() { return $('.btn-primary'); };
    get fieldSearch() { return $('[type="search"]');}; 
    get buttonDelete() { return $('.fa-trash');};
    get buttonUserDelete() { return $('.btn-sm');};
    get buttonSubmit() { return $('[type="submit"]');};
    
    async open() {
        await browser.reloadSession();
        await browser.url('/prihlaseni');
    };
   
    async login(username, password) {
        await this.fieldEmail.setValue(username);
        await this.fieldPassword.setValue(password);
        await this.buttonConfirm.click();
    };

    async openUsersList() {
        await browser.url('/admin/uzivatele')
        await $('#DataTables_Table_0_processing').waitForDisplayed({ reverse: true});
    };

    async userDelete (userName) {
        await this.fieldSearch.setValue(userName);
        await browser.pause(2000);
        await this.buttonDelete.click();
        await this.buttonUserDelete.click();
        await this.buttonSubmit.click();
    };
};
export default new Admin();