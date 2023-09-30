/*
Aplikace umožňuje uživateli v menu Pro učitele vytvoření nové Objednávky pro MŠ/ZŠ
Po kliknutí na Pro učitele > Objednávka pro MŠ/ZŠ se otevře formulář, kde může uživatel vyplnit detail objednávky
Po vyplnění IČO do formuláře objednávky se automaticky načte jméno odběratele a adresa odběratele z ARESu
Uživatel může odeslat vyplněnou objednávku na příměstský tábor
Objednávku nelze odeslat pokud není řádně vyplněna

*/

describe('Vytvoření nové Objednávky pro MŠ/ZŠ', async() => {

    beforeEach(async() => {
        await browser.reloadSession();
        await browser.url('/');

    });

    it('Aplikace otevře novy formulář', async() =>{
       const forTeachersLink = await $('*=Pro učitelé');
       const orderLink = await $('*=Objednávka pro MŠ/ZŠ');
       await expect (forTeachersLink).toBeDisplayed();
       await forTeachersLink.click();
       await expect(orderLink).toBeDisplayed();

    });
    describe('Vyplnit detaily objednávky', async() => {
        beforeEach(async() => {
            await await $('*=Pro učitelé').click();
            await await $('*=Objednávka pro MŠ/ZŠ').click();

    });

    it('Po vyplnění IČO do formuláře objednávky se automaticky načte jméno odběratele', async() =>{
       const icoField = await $('#ico');

       await icoField.setValue('05351791');
       await browser.keys('Enter');
       await $('.toast-message').waitForDisplayed();
       await expect ($('#client')).toHaveValue('Monika Protivová')
 
     });

     it('Uživatel může odeslat vyplněnou objednávku na příměstský tábor', async() => {
        const icoField = await $('#ico');

       await icoField.setValue('05351791');
       await browser.keys('Enter');
       await $('.toast-message').waitForDisplayed();
       await $('#substitute').setValue('Monika Protivová');
       await $('#contact_name').setValue('Monika Protivová');
       await $('#contact_tel').setValue('666888111');
       await $('#contact_mail').setValue('test@test.com');
       await $('#start_date_1').setValue('01.03.2024');
       await $('#end_date_1').setValue('10.03.2024');
       await $('#nav-home-tab').click();
       
       const selectBox = await $('#camp-date_part');
       const value = await selectBox.getValue();
       await selectBox.selectByAttribute('value', 'afternoon');
       await $('#camp-students').setValue('10');
       await $('#camp-age').setValue('8-10');
       await $('#camp-adults').setValue('2');
       const saveButton = $('.btn-primary');
       await saveButton.click();

       const header = await $('h3');
       await expect (header).toHaveText('Děkujeme za objednávku');
       await browser.pause(5000);
     });
     it('Objednávku nelze odeslat pokud není řádně vyplněna', async() => {
        const icoField = await $('#ico');

       await icoField.setValue('05351791');
       await browser.keys('Enter');
       await $('.toast-message').waitForDisplayed();
       //await $('#substitute').setValue('Monika Protivová');
       await $('#contact_name').setValue('Monika Protivová');
       await $('#contact_tel').setValue('666888111');
       //await $('#contact_mail').setValue('test@test.com');
       await $('#start_date_1').setValue('01.03.2024');
       await $('#end_date_1').setValue('10.03.2024');
       await $('#nav-home-tab').click();
       
       const selectBox = await $('#camp-date_part');
       const value = await selectBox.getValue();
       await selectBox.selectByAttribute('value', 'afternoon');
       await $('#camp-students').setValue('10');
       await $('#camp-age').setValue('8-10');
       await $('#camp-adults').setValue('2');
       const saveButton = $('.btn-primary');
       await saveButton.click();

       const header = await $('h3');
       await expect (header).toHaveText('Objednávka akce');
       await browser.pause(5000);
     });

})
})