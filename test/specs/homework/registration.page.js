import BasicUser from "./basic.page.js";

class Register extends BasicUser {
   
    constructor() {
        super();
        this.url = '/registrace';
    };

    get fieldNameAndSurname() {return $('#name');}    
    get fieldPasswordConfirm() {return $('#password-confirm'); };  
    get errorMessage() { return $('.invalid-feedback'); };
    
    //open registration page
    async open() {
    await browser.reloadSession();
    await browser.url(this.url);
    };
    //new user registration
    async registrationNewUser(name, email, password) {
    await this.fieldNameAndSurname.setValue(name);
    await this.fieldEmail.setValue(email); 
    await this.fieldPassword.setValue(password);
    await this.fieldPasswordConfirm.setValue(password);
    await this.buttonConfirm.click();    
    };
}
export default new Register();




