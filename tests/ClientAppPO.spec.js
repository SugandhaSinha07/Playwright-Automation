const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager');
const dataSet = require("../utils/placeOrderTestData.json");
const { OrderReview } = require('../pageObjects/OrderReview');
for (const data of dataSet) {
    test(`Client App Login Test-PO Model - ${data.product_name}`, async ({ page }) => {

        const creditCard = page.locator(".payment__cc input.text-validated");

        const products = page.locator(".card-body");
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goto();
        await loginPage.login(data.username, data.password);
        const dashBoardPage = poManager.getDashBoardPage();
        await dashBoardPage.searchProductAndAddtoCart(data.product_name);
        await dashBoardPage.navigateToCart();


        // await page.pause();
        const checkoutPage = poManager.getCheckoutPage();
        await checkoutPage.nvigatecheckOut(data.product_name);
        await checkoutPage.verifyUserName(data.username);
        await checkoutPage.fillChkOutPageDetails();
        await checkoutPage.selectCountry("India");
        await checkoutPage.submitOrder();

        // const userName = page.locator(".user__name label");


        const reviewOrderPge = new OrderReview(page);
        const orderId = await checkoutPage.getOrderId();

        await reviewOrderPge.navigateToOrderHistory(orderId);

        const orderIdDetails =
            await reviewOrderPge.getOrderIdDetail();

        expect(orderId.includes(orderIdDetails)).toBeTruthy();

    });



}



