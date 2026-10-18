const { test, expect } = require('@playwright/test');
test('@Website Event Booking', async ({ page }) => {
    
    const email = "sugandhasinhadiv@gmail.com";
    const password = process.env.TEST_PASSWORD;
    const eventTitle = "gBC 12";
    page.goto("https://eventhub.rahulshettyacademy.com/");
    const totalSeats = 100;
    await page.getByText("Sign in to EventHub").isVisible();
    await page.locator("#email").fill(email);
    await page.locator("#password").fill(password);
    await page.locator("#login-btn").click();
    await page.getByRole('button', { name: 'Admin' }).isVisible();
    await page.getByRole('button', { name: 'Admin' }).click();
    await page.locator(".flex a[href*='/admin/events']").click();
    await page.locator("#event-title-input").fill(eventTitle);
    await page.getByPlaceholder("Describe the event…").fill("This is a sample event description.");
    await page.locator("#category").selectOption("Concert");
    await page.locator("#city").fill("Bangalore");
    await page.locator("#venue").fill("Sample Venue");
    await page.getByLabel('Event Date & Time').fill('2029-07-15T19:00');
    await page.getByLabel("Price ($)").fill("50");
    await page.locator("#total-seats").fill(`${totalSeats}`);
    await page.locator("#add-event-btn").click();
    await page.locator("#nav-home").click();
    await page.locator("div.p-4").filter({ hasText: eventTitle }).isVisible();
    await page.locator('[data-testid="event-card"]')
        .filter({ hasText: eventTitle })
        .locator('[data-testid="book-now-btn"]')
        .click();
    //await page.getByText(eventTitle).isVisible();
    await page.locator('#customerName').fill("John Doe");
    await page.locator('#customer-email').fill("john.doe@example.com");
    await page.locator('#phone').fill("1234567890");
    await page.getByRole('button', { name: 'Confirm Booking' }).click();
    await page.getByText("Booking Confirmed!").isVisible();
    await expect(page.getByText("Booking Confirmed!")).toBeVisible();

    const remainingSeats = totalSeats - 1;
    await page.locator("#nav-home").click();
    await page.locator("div.p-4").filter({ hasText: eventTitle }).isVisible();
    
   const eventCard = page
    .locator('[data-testid="event-card"]')
    .filter({ hasText: eventTitle });


     await expect(eventCard.locator("span.text-emerald-600"))
    .toHaveText(`${remainingSeats} seats available`);
        
  
});
