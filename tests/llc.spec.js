const{test,expect}=require('@playwright/test');
test('Locator Playwright test', async ({page})=>
{   const slowExpext=expect.configure({timeout: 10000});

    const password='Divisha@123';
    const product_name="Nokia Edge";
    page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await expect(page.getByLabel('Check me out if you Love IceCreams!')).toBeChecked();
    await page.getByLabel('Gender').selectOption('Female');
    await expect(page.getByLabel('Gender')).toHaveValue('Female');
    await page.getByLabel('Employed').check();
    await expect(page.getByLabel('Employed')).toBeChecked();
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByText('Success! The Form has been submitted successfully!').isVisible();
    await page.getByRole('link', { name: 'SHOP' }).click();  
    await slowExpext(page.getByRole('heading', { name: 'Shop Name' })).toBeVisible();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click(); 

  //  await page.pause();




});