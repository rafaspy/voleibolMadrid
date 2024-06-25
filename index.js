const puppeteer = require('puppeteer');

async function openWebPage() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    });


    const FB_USERNAME = 'rafa.sanchez19@hotmail.com';
    const FB_PASSWORD = 'sonicsim';


    const page = await browser.newPage();

    const client = await page.target().createCDPSession();
    await client.send('Network.clearBrowserCookies');

    await page.goto('https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2Fgroups%2FVoleibolCentroMadridTorneos%3Flocale%3Des_ES', {
        waitUntil: 'networkidle2' // Espera a que la página se cargue completamente
    });

    // Esperar a que el primer selector esté disponible
    const firstSelector = 'body > div._10.uiLayer._4-hy._3qw > div._59s7._9l2g > div > div > div > div > div:nth-child(3) > div.x1exxf4d.x13fuv20.x178xt8z.x1l90r2v.x1pi30zi.x1swvt13 > div > div:nth-child(1) > div.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x87ps6o.x1lku1pv.x1a2a7pz.x9f619.x3nfvp2.xdt5ytf.xl56j7k.x1n2onr6.xh8yej3 > div > div.x6s0dn4.x78zum5.xl56j7k.x1608yet.xljgi0e.x1e0frkt';


    // Imprimir mensaje de éxito

    await page.waitForSelector(firstSelector);
    await page.click(firstSelector);
    console.log("First selector found!");

    // Ahora, esperar a que el segundo selector esté disponible

    await page.waitForSelector('input[name="email"]')
    await page.type('input[name="email"]', FB_USERNAME);


    await page.waitForSelector('input[name="pass"]')
    await page.type('input[name="pass"]', FB_PASSWORD);

    await page.waitForSelector('button[name="login"]')
    await page.click('button[name="login"]');
    // page.evaluate(() => {
    //     document.querySelector(secondSelector).click()
    // })

    // // Imprimir mensaje de éxito
    // console.log("Second selector found!");

    // await page.click(secondSelector);


    // Esperar a que los posts estén disponibles en la página
    const postSelector = '.x1i10hfl.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x87ps6o.x1a2a7pz.xmjcpbm.x5lnw11.x1lliihq.x1n2onr6.x1lku1pv';
    await page.waitForSelector(postSelector);

    // Evaluar y obtener los posts
    const result = await page.evaluate((postSelector) => {
        const posts = document.querySelectorAll(postSelector);
        console.log(posts); // Imprimir los elementos encontrados para verificar el selector
        return Array.from(posts).map(post => post.innerText);
    }, postSelector);

    console.log(result); // Imprimir el resultado


    await browser.close();

}

openWebPage();


