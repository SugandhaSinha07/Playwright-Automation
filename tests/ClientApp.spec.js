const { test, expect } = require('@playwright/test');

test.only('Client App Login Test', async ({ page }) => {
    
    const product_name = "ZARA COAT 3";
    const creditCard=page.locator(".payment__cc input.text-validated");
    const email="sugandhasinhadiv@gmail.com";
    const password=process.env.TEST_PASSWORD;
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
   
    const userEmail = page.locator("#userEmail");
    const userPassword = page.locator("#userPassword");
    const loginBtn = page.locator("#login");
    const cardTitles = page.locator(".card-body");
    const coupon=page.locator("[name='coupon']");
    await userEmail.fill(email);
    await userPassword.fill(password);
    await loginBtn.click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    console.log(await cardTitles.allTextContents());
    const count = await cardTitles.count();
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === product_name) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    const cartBtn = await page.locator("[routerlink*='cart']");
    await cartBtn.click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3') ").isVisible();
    console.log(bool);
    // await page.pause();
    await page.locator("text=Checkout").click();
    await creditCard.fill("1234 5678 9012 3456");
    await page.locator(".input.ddl").nth(0).selectOption("10");
   await page.locator(".input.ddl").nth(1).selectOption("18");
   await coupon.fill("rahulshettyacademy");
   await page.locator("button.mt-1").click();
   await page.locator("p.ng-star-inserted").isVisible();
   expect(await page.locator("p.ng-star-inserted").textContent()).toEqual("* Coupon Applied");
   await page.locator("div.field.small")
          .filter({ hasText: "CVV Code" })
          .locator("input")
          .fill("123");
    await page.locator("div.field")
          .filter({ hasText: "Name on Card" })
          .locator("input")
          .fill("Divisha Sugandha");
    
    await page.locator("[placeholder='Select Country']").pressSequentially("ind", { delay: 100 }   );
    const dropdown = await page.locator(".ta-results button");
    const options = await page.locator(".ta-results button");
    await options.first().waitFor();
    for (let i = 0; i < await options.count(); ++i) {
        if (await dropdown.nth(i).textContent() === " India") {
            await dropdown.nth(i).click();
            break;
        }
    }
    const userName = page.locator(".user__name label");

    console.log(await userName.textContent());

    await expect(userName).toHaveText(email);   
 
    await page.locator(".action__submit").click();
    const msg=await page.locator(".hero-primary").textContent();
    console.log(msg);
    expect(msg).toEqual(" Thankyou for the order. ");
    const orderId=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    const orderHistoryBtn=page.locator("button[routerlink*='myorders']");
    await orderHistoryBtn.click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
 
    for (let i= 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();

          if (orderId.includes(rowOrderId)) {
            
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    console.log(orderIdDetails);
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

});



test('UI Controls', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator("#username");
    const userPassword = page.locator("#password");
    const signInBtn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    const radioBtn = page.locator(".radiotextsty");
    const okBtn = page.locator("#okayBtn");
    const termsCheckBox = page.locator("#terms");
    const documentLink = page.locator("a[href*='smart']");
    // Select an option from the dropdown
    await dropdown.selectOption("consult");
    // Click the User radio button
    await radioBtn.last().click();
    // Click OK on the popup
    await okBtn.click();
    // Verify the radio button is selected
    await expect(radioBtn.last()).toBeChecked();
    await termsCheckBox.check();
    await expect(termsCheckBox).toBeChecked();
    await termsCheckBox.uncheck();
    await expect(termsCheckBox).not.toBeChecked();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveClass("blinkingText");
});

test('Child Windows Handling', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("a[href*='documents-request']");
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ])
    const text = await newPage.locator(".red").textContent();
    text.split();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    const userName = page.locator("#username");
    await userName.fill(domain);
   // await page.pause();
});

