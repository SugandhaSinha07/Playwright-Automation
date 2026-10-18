const{base}=require('@playwright/test');

base.test.extend({
    username:"sugandhasinhadiv@gmail.com",
    password:process.env.TEST_PASSWORD,
    product_name:"ZARA COAT 3"
}
)
