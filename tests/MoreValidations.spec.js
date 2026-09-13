const { test, expect } = require('@playwright/test');
test('More validations Test', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com/");
    //await page.goBack();
    //  await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.locator("#show-textbox").click();
    await expect(page.locator("#displayed-text")).toBeVisible();
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    
});

test('Take the sceenshot', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path:'partialScreenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
});

test.only('visual', async({page})=>{

    await page.goto("https://www.flightaware.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
 

});