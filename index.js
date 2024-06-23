const puppeteer = require('puppeteer');

async function openWebPage() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    });

    try {
        const page = await browser.newPage();

        await page.goto('https://www.facebook.com/groups/VoleibolCentroMadridTorneos?locale=es_ES', {
            waitUntil: 'networkidle2' // Espera a que la página se cargue completamente
        });

        // Esperar a que el primer selector esté disponible
        const firstSelector = 'body > div#mount_0_0_HD > div > div: nth - child(1) > div > div:nth - child(5) > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div > div.x92rtbv.x10l6tqk.x1tk7jg1.x1vjfegm > div > div';


        // Imprimir mensaje de éxito
        console.log("First selector found!");
        await page.click(firstSelector);

        // Ahora, esperar a que el segundo selector esté disponible
        const secondSelector = 'body';
        await page.waitForSelector(secondSelector);

        // Imprimir mensaje de éxito
        console.log("Second selector found!");

        await page.click(secondSelector);
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

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
    }
}

openWebPage();



