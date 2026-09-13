const { test, expect } = require('@playwright/test');
class CheckoutPage {

    constructor(page) {
        this.page = page;

        this.productDiv = page.locator("div li").first();
        this.chkOutButton = page.locator("text=Checkout");

        this.creditCard =
            page.locator(".payment__cc input.text-validated");

        this.countryInput =
            page.locator("[placeholder='Select Country']");

        this.dropdown =
            page.locator(".ta-results button");

        this.userName =
            page.locator(".user__name label");
        this.submitOrderBtn = page.locator(".action__submit");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.chkOutButton = page.locator("text=Checkout");
        this.msg = page.locator(".hero-primary");
    }
    async getOrderId() {

        const orderId = await this.orderId.textContent();

        return orderId.trim();
    }

    async nvigatecheckOut(productName) {

        await this.productDiv.waitFor();

        const bool = await this.page
            .locator(`h3:has-text('${productName}')`)
            .isVisible();

        console.log("Product visible:", bool);

        await this.chkOutButton.click();
    }

    async fillChkOutPageDetails() {

        await this.creditCard.fill("1234 5678 9012 3456");

        await this.page
            .locator(".input.ddl")
            .nth(0)
            .selectOption("10");

        await this.page
            .locator(".input.ddl")
            .nth(1)
            .selectOption("18");

        await this.page
            .locator("div.field.small")
            .filter({ hasText: "CVV Code" })
            .locator("input")
            .fill("123");

        await this.page
            .locator("div.field")
            .filter({ hasText: "Name on Card" })
            .locator("input")
            .fill("Divisha Sugandha");
    }

    async selectCountry(countryName) {

        await this.countryInput.pressSequentially(
            countryName,
            { delay: 100 }
        );

        await this.dropdown.first().waitFor();

        const count = await this.dropdown.count();

        for (let i = 0; i < count; ++i) {

            const country =
                await this.dropdown.nth(i).textContent();

            console.log("Country:", country);

            if (country.trim() === countryName.trim()) {

                await this.dropdown.nth(i).click();

                break;
            }
        }
    }

    async verifyUserName(userNameOrder) {

        const userNameonCheckOutPage =
            await this.userName.textContent();

        console.log(userNameonCheckOutPage);

        expect(userNameonCheckOutPage.trim())
            .toEqual(userNameOrder);
    }
    async submitOrder() {
        await this.submitOrderBtn.click()
        const message = await this.msg.textContent();
        console.log(message);
        expect(message).toEqual(" Thankyou for the order. ");
        const orderId = await this.orderId.textContent();
        console.log(orderId);
    }
}

module.exports = { CheckoutPage };