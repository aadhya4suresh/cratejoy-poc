const { expect } = require("@playwright/test")

class HomePage {
    constructor(page) {
        this.page = page
        this.crateJoyLogo = this.page.locator('.header-logo-link')
        this.closeDialogButton = this.page.getByRole('button', { name: 'Close dialog 1' })
    }

    async launchUrl(testUrl) {
        await this.page.goto(testUrl)
        const url = await this.page.url()
        expect(url).toContain("cratejoy");
    }

    async verifyCratejoyLogo() {
        await expect(this.crateJoyLogo).toBeVisible()
    }

    async verifyUrl(url) {
        await expect(this.page).toHaveURL(url)
    }

    async navigateBestSellerPage(navigatePage) {
        const bestSeller = await this.page.locator('.header a:has-text("' + navigatePage + '")')
        await bestSeller.click()
    }

    async closeDialog() {
        await this.closeDialogButton.click()
    }
}

module.exports = { HomePage }