const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    let a = [], email = '', type = '', name = 'a.prevNext';
    function toEmail(str) {
        const p = /\<([^()]+)\>/g;
        if (str.includes('<')) {
            const c = p.exec(str);
            return c[1];
        } else {
            return str.slice(6);
        }
    }
    function toType(str) {
        return str ? str.split('\n')[3].replace(/^\s*|\s*$/g, "") : '';
    }
    async function editJson() {
        try {
            await page.waitForSelector('.messageBody tr',{timeout:1500});
            type = await page.$eval('.messageBody tr', el => el.innerText);
        } catch (error) {
            type = '';
            email = '';
        }
        try {
            await page.waitForSelector('.js-from',{timeout:1500});
            email = await page.$eval('.js-from', el => el.innerText);
        } catch (error) {
            email = '';
        }
        console.log(toEmail(email), '|', toType(type));
        if (email !== '') {
            a.push({ 'email': toEmail(email), 'type': toType(type) });
        }
    }
    const browser = await puppeteer.launch({
        'defaultViewport': { 'width': 1920, 'height': 1080 }
    });
    const page = await browser.newPage();
    // 在这里隐去了真实网址
    await page.goto('https://www.baidu.com');
    const inputText = 'april.c@istarmax.com'
    await page.type('#email', inputText, { delay: 0 });
    await page.type('#password', inputText, { delay: 0 });
    await page.keyboard.press('Enter');
    await page.waitForNavigation();
    await page.screenshot({ path: `login.png`, fullPage: true });


    //   await page.screenshot({path: 'example.png'});
    for (let i = 1; i < 5000; i++) {
        await page.waitForSelector('#tblTickets');
        await page.screenshot({ path: `login.png`, fullPage: true });
        await page.screenshot({ path: `${i}example.png`, fullPage: true });
        await page.mouse.click(1250, 300);
        await page.waitFor(2500);

        try {
            await editJson();
            // 写入文件
            let writerStream = fs.createWriteStream('email.txt');
            writerStream.write(JSON.stringify(a), 'UTF8');
            console.log(a.length);
            writerStream.end();
        } catch (error) {
            console.log('edit1', error);
            await page.screenshot({ path: 'err.png', fullPage: true });
        }

        for (let j = 1; j < 50; j++) {



            try {
                await page.waitForSelector('.prev');
                await page.click('.prev');
                await page.waitFor(2200);
                await editJson();
                if (j == 49) {
                    await page.mouse.click(1850, 300);
                    await page.waitFor(600);
                    await page.waitForSelector('a.prevNext');

                    if (i == 1) {
                        await page.click('a.prevNext');
                        // await page.waitFor(1200);
                        console.log('i');
                    } else if (i == 2) {
                        await page.waitFor(500);
                        const result = await page.$eval('a.prevNext', el => {
                            let list = document.querySelectorAll('a.prevNext');
                            for (let k = 0; k < list.length; k++) {
                                let c = list[k];
                                console.log(k);
                                c.id = `prevNext${k}`;
                            }
                            console.log(list);
                            return list;
                        });
                        await page.click('#prevNext2');
                        await page.waitFor(600);
                        console.log(i);
                    } else {
                        await page.click('#prevNext2');
                        // await page.waitFor(1200);
                        console.log(i);
                    }


                    await page.waitFor(2000);
                    j = 50;
                }
            } catch (error) {
                console.log('edit1', error);
                await page.screenshot({ path: 'err.png', fullPage: true });
                await page.mouse.click(1850, 300);
                await page.waitFor(1000);
                await page.waitForSelector('a.prevNext');
                if (i == 1) {
                    await page.click('a.prevNext')[0];
                    console.log('i');
                } else if (i == 2) {
                    let list = await this.page.$eval((name) => {
                        let list = document.querySelector(name)
                        for (let k = 0; k < list.length; k++) {
                            let c = list[k];
                            c.id = `prevNext${k}`;
                        }
                        return list;
                    });
                    await page.click('#prevNext2');
                    console.log(i);
                } else {
                    await page.click('#prevNext2');
                    console.log(i);
                }
                await page.waitFor(4000);
                j = 50;
                await page.screenshot({ path: '50.png' });
            }

        }
    }


    await browser.close();
})();