class DashBoardPage{

    constructor(page){
        this.page=page;
        this.products = page.locator(".card-body");
        this.coupon=page.locator("[name='coupon']");
        this.productsText= page.locator(".card-body b")     ;
        this.cart =page.locator("[routerlink*='cart']");   
    }

 async searchProductAndAddtoCart(product_name) {

    await this.products.first().waitFor();

    const product = this.products.filter({
        hasText: product_name
    });

    await product.getByRole("button", { name: "Add To Cart" }).click();
}

    async navigateToCart(){
        await this.cart.click();

    }
}
module.exports = { DashBoardPage };