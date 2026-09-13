
const {LoginPage}= require('../pageObjects/LoginPage');
const {DashBoardPage}=require('../pageObjects/DashBoardPage');
const {CheckoutPage}=require('../pageObjects/CheckoutPage');
const{OrderReview}=require('../pageObjects/OrderReview');
const { get } = require('node:http');

class POManager {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashBoardPage = new DashBoardPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.OrderReviewPage = new OrderReview(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashBoardPage() {
        return this.dashBoardPage;
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }
    getOrderReviewPage() {
        return new OrderReview(this.page);
    }
}
module.exports = { POManager };