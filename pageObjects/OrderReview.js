
class OrderReview {
    constructor(page) {
        this.page = page;  
        this.orderHistoryBtn=page.locator("button[routerlink*='myorders']"); 
        this.tableRows = page.locator("tbody");
        this.rowsDetails = page.locator("tbody tr");  
        this.getOrderIdDetails = page.locator(".col-text");
    }

async navigateToOrderHistory(orderId) {  
    await this.orderHistoryBtn.click();
    await this.tableRows.waitFor();
     const rows = await this.rowsDetails;
     for (let i= 0; i < await rows.count(); ++i) {
             const rowOrderId = await rows.nth(i).locator("th").textContent();
     
               if (orderId.includes(rowOrderId)) {
                 
                 await rows.nth(i).locator("button").first().click();
                 break;
             }
         }
         
 }

  getOrderIdDetail() {
    return this.getOrderIdDetails.textContent() ;
  }

}
module.exports = { OrderReview };
    