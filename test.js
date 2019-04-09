const puppeteer = require('puppeteer');

(async () => {
    let a = [], email = '';
    const browser = await puppeteer.launch({
        'defaultViewport': { 'width': 1920, 'height': 1080 }
    });
    const page = await browser.newPage();
    await page.goto('https://secure.helpscout.net/search/?query=reward');
    const inputText = 'april.c@istarmax.com'
    await page.type('#email', inputText, { delay: 0 });
    await page.type('#password', inputText, { delay: 0 });
    await page.keyboard.press('Enter');
    await page.waitForNavigation();
    // document.querySelector('a.page.prevNext')[1].click();
    // let buttonSelector = 'a.page.prevNext';
    // await page.evaluate((buttonSelector) => {
    //     document.querySelector(buttonSelector).click();
    // }, buttonSelector);
    // await page.waitForNavigation();
    await page.waitForSelector('a.prevNext');
    // let buttons = page.$$('a.page.prevNext');
    // console.log(buttons);
    // await buttons[1].click();
    // let name = 'a.prevNext'
    const result = await page.$eval('a.prevNext', el=> {
        let list = document.querySelectorAll('a.prevNext');
        for (let k = 0; k < list.length; k++) {
            let c = list[k];
            console.log(k);
            c.id = `prevNext${k}`;
        }
        console.log(list);
        return list;
    });
    // console.?log(result);
    // page.$('a.prevNext')[0].click();
    await page.click('#prevNext0');
    await page.waitFor(2000);
    // await page.waitFor(2000);
    await page.screenshot({ path: 'test.png' });
    //   await page.screenshot({path: 'example.png'});
    // for (let i = 1; i < 5000; i++) {
    //     await page.waitForSelector('#tblTickets');
    //     await page.mouse.click(1250, 300);
    //     await page.waitFor(2000);
    //     await page.screenshot({ path: 'example.png' });
    //     for (let j = 1; j < 50; j++) {
    //         await page.waitForSelector('.js-from');
    //         email = await page.$eval('.js-from', el => el.innerText);
    //         if (!a.includes(email)) {
    //             a.push(email);
    //             console.log(a.length, a);
    //         }
    //         await page.waitForSelector('.prev');
    //         await page.click('.prev');
    //         await page.waitFor(800);
    //         await page.waitForSelector('.js-from');
    //         // await page.waitFor(1000);
    //         email = await page.$eval('.js-from', el => el.innerText);
    //         if (!a.includes(email)) {
    //             a.push(email);
    //             console.log(a.length, a);
    //         }
    //         if (j == 49) {
    //             await page.mouse.click(1850, 300);
    //             await page.$$('a.prevNext')[2].click();
    //             await page.waitFor(2000);
    //             j = 50;
    //             await page.screenshot({ path: '50.png' });
    //         }
    //     }
    // }

    // const button = await page.$('.icon-caret-down')

    // await button.click();


    //   for(let i=1;i<5000;i++){
    //     await page.waitForSelector('#nextTicket');
    //     await page.click('#nextTicket');
    //     await page.waitFor(2000);
    //     await page.waitForSelector('.js-emailsAndPhones a');
    //     email = await page.$eval('.js-emailsAndPhones a', el => el.innerText);
    //     if(!a.includes(email)){
    //     a.push(email);
    //     }
    //     console.log(i, '|', a);
    //     await page.waitFor(2000);
    //   }

    await browser.close();
})();