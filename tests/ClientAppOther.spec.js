const{test,expect}=require('@playwright/test');
test('@Website Client App Login', async ({page})=>
{   const email="sugandhasinhadiv@gmail.com";
    const password=process.env.TEST_PASSWORD;
    page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder('email@example.com').fill(email);
    await page.getByPlaceholder('enter your passsword').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByText("ZARA COAT 3").isVisible();
    await page.locator(".card-body").filter({hasText: 'ZARA COAT 3'})
    .getByRole("button", { name: 'Add To Cart' }).click();
    await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
    await page.locator("div li").first().waitFor();
    await expect(page.locator("h3:has-text('ZARA COAT 3') ")).toBeVisible();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 100 });
    await page.getByRole('button', { name: 'India' }).nth(1).click();
    await page.getByText("Place Order").click();
    await page.getByText("Thankyou for the order.").isVisible();
    await expect(page.locator("h1")).toHaveText(" Thankyou for the order. ");




});
