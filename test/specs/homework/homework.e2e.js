import Register from './registration.page.js'
import Admin from './admin.page.js'

describe('Homework', async () => {

   
   describe ('Registration page', async() =>{
   
    beforeEach (async() => {
        await Register.open();
    });

       it('should open page and create screenshot', async () => {
        await browser.saveScreenshot('registration_page.png');
        await browser.pause(2000);
    });
    it ('should show the registration page', async () => {
        await expect(Register.fieldNameAndSurname).toBeDisplayed();
        await expect(Register.fieldNameAndSurname).toBeEnabled();
        await expect(Register.fieldEmail).toBeDisplayed();
        await expect(Register.fieldEmail).toBeEnabled();
        await expect(Register.fieldPassword).toBeDisplayed();
        await expect(Register.fieldPassword).toBeEnabled();
        await expect(Register.fieldPasswordConfirm).toBeDisplayed();
        await expect(Register.fieldPasswordConfirm).toBeEnabled();
        await expect(Register.buttonConfirm).toBeDisplayed();
        await expect(Register.buttonConfirm).toHaveText('Zaregistrovat');
    });
   });

    describe ('New user registration', async() => {
        
        const name = 'Lorem Ipsum';

        it('should register new user account with valid credentials', async () => {
            await Register.open();
            const email = Register.generateString(8)+'@test.com';
            const password = Register.generateString(8);
            await Register.registrationNewUser(name, email, password);
            await expect (await $('strong').getText()).toEqual(name);
        });

        after(async() => {
            await Admin.open();
            const adminEmail = 'da-app.master@czechitas.cz';
            const adminPassword = 'AppRoot123';
            await Admin.login(adminEmail, adminPassword);
            await Admin.openUsersList();
            await Admin.userDelete(name);
        });
    });

    describe('Invalid registration', async() => {
        beforeEach (async() => {
            await Register.open();
           });

           it('should not register new user account with the same email', async () => {
            const name = Register.generateString(5)+ ' ' + Register.generateString(7);
            const email = 'da-app.admin@czechitas.cz';
            const password = Register.generateString(10);
            await Register.registrationNewUser(name, email, password);
            await expect(Register.errorMessage).toBeDisplayed();
        });

        it('should not register new user account with invalid password', async () => {
            const name = Register.generateString(5)+ ' ' + Register.generateString(7);
            const email = Register.generateString(6)+'@test.com';
            const password = '123456';
            await Register.registrationNewUser(name, email, password);
            await expect(Register.errorMessage).toBeDisplayed();
        });
    })
});
