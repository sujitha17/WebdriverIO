describe('ecom app', async()=>
{
//Scenario 1: Access a Product via category after applying multiple filters
it('Access a Product via category after applying multiple filters',async()=>
{

    //Go to ebay.com
    await browser.url("https://www.ebay.com/")

    //Navigate to Search by category > Electronics > Cell Phones & accessories
    await $('#gh-shop-a').click()
    await $("=Cell phones & accessories").click()

    //After the page loads, click Cell Phones & Smartphones in the left hand side navigation section.
    await $("=Cell Phones & Smartphones").click()

    //Now, click – All Filters (appears at the end of the filter drop downs)
    await $("button[aria-label='All Filters']").click()

    //Add 3 filters - Condition, Price and Item location appearing in the pop-up and click apply.
    const condition_filter = $('.x-overlay-aspect__label=Condition')
    await condition_filter.click()
    const checkbox_used = await $('#c3-subPanel-LH_ItemCondition_Used .checkbox__control')
    await checkbox_used.click()

    const price_filter = $('.x-overlay-aspect__label=Price')
    await price_filter.click()
    const priceFromBox = await $('.x-textrange__input.x-textrange__input--from')
    await priceFromBox.setValue("400")
    const priceToBox = await $('.x-textrange__input.x-textrange__input--to')
    await priceToBox.setValue("800")

    const location_filter = $('.x-overlay-aspect__label=Item Location')
    await location_filter.click()
    const radio_btn = await $('input[value="US Only"]')
    await radio_btn.click()

    await $('button=Apply').click()

    //Verify that the filter tags are applied.
    await $('.b-pageheader__text=Cell Phones & Smartphones between US $500.00 and US $600.00').isDisplayed

})


//Scenario 2: Access a Product via Search
it('Access a Product via Search',async()=>
{
    //Go to ebay.com
    await browser.url("https://www.ebay.com/")

    //Type any search string in the search bar. For example: MacBook.
    let searchstring = "MacBook"
    await $('#gh-ac').setValue(searchstring)

   //Change the Search category. For example: Computers/Tablets & Networking and click Search.
    const dropdown = await $('#gh-cat')
    await dropdown.selectByAttribute('value','15032')
    await $('#gh-btn').click()

    //Verify that the page loads completely.Verify that the first result name matches with the search string.
    await expect($$('.s-item__title')[1]).toHaveText(expect.stringContaining(searchstring))

})

//Scenario 3: Access a Product via category after applying multiple filters( Not asked in the assingment - I tried to add some different filter )
it('applying different filters',async()=>
{
    //Go to ebay.com
    await browser.url("https://www.ebay.com/")

    //Navigate to Search by category > Electronics > Cell Phones & accessories
    await $('#gh-shop-a').click()
    await $("=Cell phones & accessories").click()

    //After the page loads, click Cell Phones & Smartphones in the left hand side navigation section.
    await $("=Cell Phones & Smartphones").click()

    //Now, click – All Filters (appears at the end of the filter drop downs)
    await $("button[aria-label='All Filters']").click()

    //Add 3 filters - Network, Brand and Condition appearing in the pop-up and click apply.
    const network_filter = $('.x-overlay-aspect__label=Network')
    await network_filter.click()
    const checkbox_airtel = await $('#c3-subPanel-Network_Airtel .checkbox__control')
    await checkbox_airtel.click()

    const brand_filter = $('.x-overlay-aspect__label=Brand')
    await brand_filter.click()
    const checkbox_apple = await $('#c3-subPanel-Brand_Apple .checkbox__control')
    await checkbox_apple.click()

    const condition_filter = $('.x-overlay-aspect__label=Condition')
    await condition_filter.click()
    const checkbox_used = await $('#c3-subPanel-LH_ItemCondition_Used .checkbox__control')
    await checkbox_used.click()

    await $('button=Apply').click()

    //Verify that the filter tags are applied.
    let filterapplied = await $('.brm__flyout__btn-label=3 filters applied')
    await expect(filterapplied).toHaveText('3 filters applied')
    await filterapplied.click()
    await $('.brm__item-label=Network: Airtel').isDisplayed()
    await $('.brm__item-label=Brand: Apple').isDisplayed()
    await $('.brm__item-label=Condition: Used').isDisplayed()
})

})
