const{test,expect}=require('@playwright/test');



test('First Playwright test', async ({browser})=>
{   
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     console.log(await page.title());
 

});

test ('Browser Context Playwright test', async({page})=>{

    await page.goto("https://google.com");
    console.log(await page.title());
    expect(await page.title()).toBe("Google");
 

});

test('@web Browser Context -Validating Error Login', async({page})=>{
    const username=page.locator('#username');
    const password=page.locator('#password');
    const signInBtn=page.locator('#signInBtn');
    const cardTitles=page.locator(".card-body a");
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await username.fill("rahulshetty");
    await password.fill("Learning@830$3mK2");
    await signInBtn.click();
   // console.log(await page.locator("[style*='none']").textContent());
    await expect(page.locator("[style*='none']")).toContainText("Incorrect");
    
    await username.fill("");
    await username.type("rahulshettyacademy");
    await signInBtn.click();
    console.log(await cardTitles.first().textContent());
    const allTitles=await cardTitles.allTextContents();
    console.log(allTitles);

});



