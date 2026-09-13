import { test, expect } from '@playwright/test';
const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const email = "sugandhasinhadiv@gmail.com";
const password = "Divisha@123";
const fullName = "John Doe";
const emailAddress = "john.doe@example.com";
const phoneNumber = "1234567890";
async function loginAndGoToBooking(page) {
    await page.goto(`${BASE_URL}/login`);
    await page.locator("#email").fill(email);
    await page.locator("#password").fill(password);
    await page.locator("#login-btn").click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

test('Single Event Booking and Refund', async ({ page }) => {
    await loginAndGoToBooking(page);
    await page.goto(`${BASE_URL}/events`);
    const eventCard = page.locator('[data-testid="event-card"]').nth(0);

    await expect(eventCard).toBeVisible();

    await eventCard
        .getByRole('link', { name: 'Book Now' })
        .click();

    await page.locator('#customerName').fill("John Doe");
    await page.locator('#customer-email').fill("john.doe@example.com");
    await page.locator('#phone').fill("1234567890");
    await page.getByRole('button', { name: 'Confirm Booking' }).click();
    await page.getByText("Booking Confirmed!").isVisible();
    await page.getByRole('link', { name: 'View My Bookings' }).click();
    await expect(page.url()).toContain('/bookings');
    await page.locator("#booking-card").first().getByRole('button', { name: 'View Details' }).click();
    await expect(page.getByText("Booking Information")).toBeVisible();
    const bookingRef = await page.locator("div.flex span.font-mono").textContent();
    const evenTitle = await page.locator("h1").textContent();
    const bookingRef1char = bookingRef.charAt(0);
    const eventTitleValue = evenTitle.trim().charAt(0);
    await expect(bookingRef1char).toEqual(eventTitleValue);
    await page.locator("#check-refund-btn").click();
    // await expect(page.locator("#refund-spinner")).toBeVisible();
    await expect(page.locator('#refund-spinner')).toBeHidden({
        timeout: 6000
    });
    const refundResult = page.locator("#refund-result");

    await expect(refundResult).toBeVisible();

    await expect(refundResult).toContainText("Eligible for refund");
    await expect(refundResult).toContainText(
        "Single-ticket bookings qualify for a full refund."
    );
});
test('Multiple Event Booking and Refund', async ({ page }) => {
    await loginAndGoToBooking(page);
    await page.goto(`${BASE_URL}/events`);
    await expect(
        page.locator('[data-testid="event-card"]').nth(0)).toBeVisible();
    await page.locator('[data-testid="event-card"]').nth(0).getByRole('link', { name: 'Book Now' }).click();
    await page.getByRole('button', { name: '+' }).click({ clickCount: 2 });
    await page.locator('#customerName').fill("John Doe");
    await page.locator('#customer-email').fill("john.doe@example.com");
    await page.locator('#phone').fill("1234567890");

    await page.getByRole('button', { name: 'Confirm Booking' }).click();

    await page.getByText("Booking Confirmed!").isVisible();
    await page.getByRole('link', { name: 'View My Bookings' }).click();
    await expect(page.url()).toContain('/bookings');
    await page.locator("#booking-card").first().getByRole('button', { name: 'View Details' }).click();
    await expect(page.getByText("Booking Information")).toBeVisible();
    const bookingRef = await page.locator("div.flex span.font-mono").textContent();
    const evenTitle = await page.locator("h1").textContent();
    const bookingRef1char = bookingRef.charAt(0);
    const eventTitleValue = evenTitle.trim().charAt(0);
    await expect(bookingRef1char).toEqual(eventTitleValue);
    await page.locator("#check-refund-btn").click();
    //await expect(page.locator("#refund-spinner")).toBeVisible();
    await expect(page.locator('#refund-spinner')).toBeHidden({
        timeout: 6000
    });

        const refundResult = page.locator("#refund-result");

    await expect(refundResult).toBeVisible();

    await expect(refundResult).toContainText("Not eligible for refund");
    await expect(refundResult).toContainText(
        "non-refundable"
    );
  
});
