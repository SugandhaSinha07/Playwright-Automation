
import { test, expect, request } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL = 'https://api.eventhub.rahulshettyacademy.com/api';

const yahooUser = {
    email: 'your_yahoo_email@yahoo.com',
    password: 'your_password'
};

const gmailUser = {
    email: 'gmail_user@example.com',
    password: 'YourPassword123'
};


// ==========================================
// Login through UI
// ==========================================
async function loginAs(page, user) {

    await page.goto(BASE_URL);

    await page.locator('#email').fill(user.email);

    await page.locator('#password').fill(user.password);

    await page.locator('#login-btn').click();

}


// ==========================================
// Test
// ==========================================
test(
    'Yahoo user booking cannot be accessed by Gmail user',
    async ({ page }) => {

        const apiContext = await request.newContext();


        // ==========================================
        // STEP 1: Login as Yahoo user using API
        // ==========================================

        const loginResponse = await apiContext.post(
            `${API_URL}/auth/login`,
            {
                data: yahooUser
            }
        );

        console.log(
            'Login status:',
            loginResponse.status()
        );

        const loginResponseText =
            await loginResponse.text();

        console.log(
            'Login response:',
            loginResponseText
        );

        expect(loginResponse.ok()).toBeTruthy();


        const loginResponseJson =
            JSON.parse(loginResponseText);


        // Get token
        const token =
            loginResponseJson.token ||
            loginResponseJson.data?.token ||
            loginResponseJson.accessToken ||
            loginResponseJson.data?.accessToken;

        console.log(
            'Login token:',
            token
        );

        expect(token).toBeTruthy();


        // ==========================================
        // STEP 2: Get Events
        // ==========================================

        const eventRes = await apiContext.get(
            `${API_URL}/events`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log(
            'Event status:',
            eventRes.status()
        );

        const eventResponseText =
            await eventRes.text();

        console.log(
            'Event response:',
            eventResponseText
        );

        expect(eventRes.ok()).toBeTruthy();


        const eventResJson =
            JSON.parse(eventResponseText);

        console.log(
            'Event JSON:',
            eventResJson
        );


        // Make sure events exist
        expect(eventResJson.data).toBeTruthy();

        expect(
            eventResJson.data.length
        ).toBeGreaterThan(0);


        // Get first event ID
        const eventId =
            eventResJson.data[0].id;

        console.log(
            'Event ID:',
            eventId
        );


        // ==========================================
        // STEP 3: Create booking as Yahoo user
        // ==========================================

        const eventBookingResponse =
            await apiContext.post(
                `${API_URL}/bookings`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },

                    data: {
                        eventId: eventId,
                        customerName: 'YahooUser',
                        customerEmail: yahooUser.email,
                        customerPhone: '9876543210',
                        quantity: 1
                    }
                }
            );


        console.log(
            'Booking status:',
            eventBookingResponse.status()
        );


        const bookingResponseText =
            await eventBookingResponse.text();

        console.log(
            'Booking response:',
            bookingResponseText
        );


        expect(
            eventBookingResponse.ok()
        ).toBeTruthy();


        const eventResponse =
            JSON.parse(bookingResponseText);


        console.log(
            'Booking JSON:',
            eventResponse
        );


        // Get booking ID
        const yahooBookingId =
            eventResponse.data?.id ||
            eventResponse.id;


        console.log(
            'Yahoo Booking ID:',
            yahooBookingId
        );


        expect(
            yahooBookingId
        ).toBeTruthy();


        // ==========================================
        // STEP 4: Login as Gmail user through UI
        // ==========================================

        await loginAs(
            page,
            gmailUser
        );


        // ==========================================
        // STEP 5: Gmail user tries to access
        // Yahoo user's booking
        // ==========================================

        await page.goto(
            `${BASE_URL}/bookings/${yahooBookingId}`,
            {
                waitUntil: 'networkidle'
            }
        );


        // ==========================================
        // STEP 6: Verify Access Denied
        // ==========================================

        await expect(
            page.getByText(
                'Access Denied',
                {
                    exact: true
                }
            )
        ).toBeVisible();


        await expect(
            page.getByText(
                'You are not authorized to view this booking',
                {
                    exact: true
                }
            )
        ).toBeVisible();


        // ==========================================
        // Cleanup
        // ==========================================

        await apiContext.dispose();

    }
);

