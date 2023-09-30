
class Register {
   
    constructor() {
        this.url = '/registrace';
    };

    
    get fieldEmail() { return $('#email'); };
    get fieldPassword() { return $('#password'); };
    get buttonConfirm() { return $('.btn-primary'); };
    get fieldPasswordConfirm() {return $('#password-confirm'); };  
    get errorMessage() { return $('.invalid-feedback'); };
    
    generateString(length) {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

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




