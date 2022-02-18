//const fetch = require('node-fetch');
//const Manga = require('./manga').Manga;
const scheduler = require('node-schedule');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const downloadData = async (obj, url) => {
    const response = await fetch(url);
    if(!response.ok) return;
    obj.success = true;
    obj.data = await response.text();
}
let base = {
    success: false, 
    data: "",
    job: scheduler.scheduleJob('*/1 * * * * *', async () => { await downloadData(proxy, "https://www.listadomanga.es/coleccion.php?id=3515"); } )
};
let handler = { 
    set(t, p, v) {
        switch (p) {
            case 'success':
                if(v) t.job.cancel(false);
                break;
            case 'data':
                const $ = cheerio.load(v);
                console.log($('body > center > center:nth-child(1) > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr > td > h2').text())
                break;
            default:
                console.log(`Property: "${p.toString()}" has been updated.`);
                Reflect.set(t, p, v);
                break;
        }
        return true;
    }
}
let proxy = new Proxy(base, handler);