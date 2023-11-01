const { expect } = require("@playwright/test")
class BestSellerPage {
    constructor(page) {
        this.page = page
        this.collectionPageHeader = this.page.locator("h1.heading")
    }

    async selectProductBox(productBoxName) {
        await this.page.getByRole('link', { name: `${productBoxName}` }).click()
    }

    async verifyCollectionPageHeader(headerText) {
        await expect(this.collectionPageHeader).toContainText(headerText)
    }
}

module.exports = { BestSellerPage }