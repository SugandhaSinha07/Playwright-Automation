
class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#userEmail');
        this.passwordInput = page.locator('#userPassword');
        this.loginButton = page.locator('#login');
        
    }

    async goto() {
        await this.page.goto("https://rahulshettyacademy.com/client");
       
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = { LoginPage };

