const { expect } = require("@playwright/test")

class ProductDetailsPage {
    constructor(page) {
        this.page = page
        this.productBoxTitle = this.page.locator('#pdp-sidebar h1')
        this.selectSubscriptions = this.page.locator(".term-label span").nth(0)
        this.addCardButton = this.page.locator('#add-to-cart')
    }

    async verifyProductBoxTitle(name) {
        await expect(this.productBoxTitle).toHaveText(name)
    }

    async selectSubscription(monthOption) {
        const month = await this.page.locator('[class="term-label"] h6:has-text("' + monthOption + '")')
        await month.click()
    }

    async getProductDetailsPagePrice() {
        return this.selectSubscriptions.textContent()
    }

    async clickAddToCard() {
        await this.addCardButton.click()
    }
}

module.exports = { ProductDetailsPage }