
class BasicUser {
    get fieldEmail() { return $('#email'); };
    get fieldPassword() { return $('#password'); };
    get buttonConfirm() { return $('.btn-primary'); };
    get navbarRight() { return $('.navbar-right'); };
    get userNameDropdown() { return this.navbarRight.$('[data-toggle="dropdown"]'); };
    get logoutLink() { return $('#logout-link'); };

   //common user login
    async login(username, password) {
        await this.fieldEmail.setValue(username);
        await this.fieldPassword.setValue(password);
        await this.buttonConfirm.click();
    };
    //common user logout
    async logout() {
        await browser.pause(2000); //waiting all messagies disappears
        await this.userNameDropdown.click();
        await this.logoutLink.click();
    };
     //random string generation for new users credentials
     generateString(length) {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
};
export default BasicUser;