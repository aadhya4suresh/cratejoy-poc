/**
 * This test spec covers following functionality validations:
 * - Launch the applicaiton
 * - Navigate to best sellers page 
 * - Slect the 1st product
 * - Check the product details and price
 * - Choose the subscription and add to product to the cart
 * - Validate the product info and price on cart page
 * - Checkout and validate the price on checkout page
 */
const { test, expect } = require("@playwright/test")
const { HomePage } = require("../page-objects/home-page")
const { BestSellerPage } = require("../page-objects/best-seller-page")
const { ProductDetailsPage } = require("../page-objects/product-details-page")
const { CartPage } = require("../page-objects/cart-page")
const { CheckoutPage } = require("../page-objects/checkout-page")
const { LogGenerator } = require("../utils/log-generator")
const testdata = require("../fixtures/test-data.json")


var page, context, productPriceInDetailsPage, productPriceInCartPage, productPriceInCheckoutPage, cartPageProductPrice, checkoutPageProductPrice, homePage, bestSellerPage, productDetailsPage,
    cartPage, checkoutPage, logGenerator
test.describe.configure({ mode: 'serial' });

test.describe("Cratejoy Poc -> product add to cart", () => {

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext()
        page = await context.newPage()
        await page.evaluate(() => {
            Notification.permission = 'denied';
        });
        homePage = new HomePage(page)
        bestSellerPage = new BestSellerPage(page)
        productDetailsPage = new ProductDetailsPage(page)
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)
        logGenerator = new LogGenerator(page)
        logGenerator.customLogger("Test execution started....")
    })

    test("launch and verify the cratejoy application", async () => {
        await homePage.launchUrl(process.env.BASE_URL)
        logGenerator.customLogger("cratejoy applicaiton is launched successfully")
        await homePage.verifyUrl(testdata.crateJoyUrl)
        await homePage.verifyCratejoyLogo()
        logGenerator.customLogger("logo is verified")
        await homePage.closeDialog()
    })

    test("navigate to best seller page and verify headers", async () => {
        await homePage.navigateBestSellerPage(testdata.bestSellers)
        await homePage.verifyUrl(testdata.bestSellersUrl)
        logGenerator.customLogger("navigated to best seller page successfully")
        await bestSellerPage.verifyCollectionPageHeader(testdata.collectionPageHeader)
    })

    test("select and verify first product is opened", async () => {
        await bestSellerPage.selectProductBox(testdata.theraBox)
        await productDetailsPage.verifyProductBoxTitle(testdata.theraBox)
        logGenerator.customLogger("1st product selected and product details page is opened successfully")
    })

    test("select subscription and get price", async () => {
        await productDetailsPage.selectSubscription(testdata.month1)
        productPriceInDetailsPage = await productDetailsPage.getProductDetailsPagePrice()
        logGenerator.customLogger("product price is captured from product details page")
    })

    test("add product to cart and verify price", async () => {
        await productDetailsPage.clickAddToCard()
        logGenerator.customLogger("product is added to the cart")
        await cartPage.verifyShoppingCartHeader()
        cartPageProductPrice = await cartPage.getCartPageProductPrice()
        productPriceInCartPage = cartPageProductPrice.replace(/\s+/g, '')
        expect(await productPriceInDetailsPage).toEqual(productPriceInCartPage)
        logGenerator.customLogger("product price on details page is matched with cart page price")
    })

    test("go to secure checkout and verify the price", async () => {
        await cartPage.clickSecureCheckout()
        await checkoutPage.verifyCheckOutPageHeader()
        logGenerator.customLogger("checkout page is opened successfully")
        checkoutPageProductPrice = await checkoutPage.getCheckoutPageProductPrice()
        productPriceInCheckoutPage = checkoutPageProductPrice.replace(/\s+/g, '')
        expect(await productPriceInCartPage).toEqual(productPriceInCheckoutPage)
        logGenerator.customLogger("product price on cart page is matched with checkout page price")
        logGenerator.customLogger("Test execution ended!")
    })
})