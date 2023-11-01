const { expect } = require("@playwright/test")
class CheckoutPage {
    constructor(page) {
        this.page = page
        this.checkOutpageHeader = this.page.locator('h2#main-header')
        this.productPrice = this.page.locator('//*[text()="Subtotal"]/..//span').nth(0)
    }

    async verifyCheckOutPageHeader() {
        await expect(this.checkOutpageHeader).toBeVisible()
    }

    async getCheckoutPageProductPrice() {
        return this.productPrice.textContent()
    }
}

module.exports = { CheckoutPage }