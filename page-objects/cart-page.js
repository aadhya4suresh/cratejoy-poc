const { expect } = require("@playwright/test")
class CartPage {
    constructor(page) {
        this.page = page
        this.productboxamount = this.page.locator('#cart-products div .text-sm')
        this.secureCheckBoxButton = this.page.locator('.button--secondary')
        this.shoppingCartHeader = this.page.locator('#cart h4')
    }

    async getCartPageProductPrice() {
        return this.productboxamount.textContent()
    }

    async clickSecureCheckout() {
        await this.secureCheckBoxButton.click()
    }

    async verifyShoppingCartHeader() {
        await expect(this.shoppingCartHeader).toBeVisible()
    }
}

module.exports = { CartPage }