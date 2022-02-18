const scheduler = require('node-schedule');
const cheerio = require('cheerio');
const fetcher = require('node-fetch');
const { Volumen, Coleccion } = require('./types');
const downloadData = async (obj: any, url: string) => {
    const response: Response = await fetcher(url, {});
    if(!response.ok) return;
    obj.success = true;
    obj.data = await response.text();
}
let col = new Coleccion({});
let proxy = new Proxy({
    success: false,
    data: "",
    job: scheduler.scheduleJob('*/1 * * * * *', async () => { await downloadData(proxy, "https://www.listadomanga.es/coleccion.php?id=3515"); } )
}, { 
    set(t: any, p: PropertyKey, v: any) {
        switch (p) {
            case 'success':
                if(v) t.job.cancel(false);
                break;
            case 'data':
                const $ = cheerio.load(v);                
                let elems = $('center:nth-child(1) > table:nth-child(3) td.cen');
                col.data = {
                    title: $('center:nth-child(1) > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr > td > h2').text().trim(),
                    descripcion: $('center:nth-child(1) > table:nth-child(8) > tbody > tr:nth-child(2) > td > table > tbody > tr > td').html().split("<hr>")[1].replace('.', '.\n'),
                    volumes: [],
                    info: ["TO DO"]
                };
                elems.each((_item: any, elem: any) => {
                    let info = $(elem).html().split(/(?:<br>|<img src="|" alt="">|<div style="height: 8px"><\/div>)+/).splice(1);
                    col.data.volumes.push(new Volumen({}, {
                        data: {
                            title: info.slice(1, info.indexOf(info.find(value => value.includes("páginas")))).join(""),
                            price: parseFloat(info.find(value => value.includes("€")).split(" €")[0]).toFixed(2),
                            date: info.slice(-1)[0],
                            numPages: info.find(value => value.includes("páginas")),
                            estado: "Editado",
                            exDescripcion: col.data.descripcion,
                            images: [
                                {
                                    url: info[0],
                                    origin: "Internet",
                                    resolution: {
                                        width: 102,
                                        height: 150
                                    }
                                }
                            ]
                        }
                    }));
                });
                elems = $('center:nth-child(1) > table:nth-child(5) td.cen');
                elems.each((_item: any, elem: any) => {
                    let info = $(elem).html().split(/(?:<br>|<img src="|" alt="">|<div style="height: 8px"><\/div>)+/).splice(1);
                    col.data.volumes.push(new Volumen({}, {
                        data: {
                            title: info.slice(1, info.indexOf(info.find(value => value.includes("páginas")))).join(""),
                            price: parseFloat(info.find(value => value.includes("€")).split(" €")[0]).toFixed(2),
                            date: info.slice(-1)[0],
                            numPages: info.find(value => value.includes("páginas")),
                            estado: "En Preparacion",
                            exDescripcion: col.data.descripcion,
                            images: [
                                {
                                    url: info[0],
                                    origin: "Internet",
                                    resolution: {
                                        width: 102,
                                        height: 150
                                    }
                                }
                            ]
                        }
                    }));
                });
                elems = $('center:nth-child(1) > table:nth-child(7) td.cen');
                elems.each((_item: any, elem: any) => {
                    let info = $(elem).html().split(/(?:<br>|<img src="|" alt="">|<div style="height: 8px"><\/div>)+/).splice(1);
                    col.data.volumes.push(new Volumen({}, {
                        data: {
                            title: info.slice(1).join(""),
                            price: 0.0,
                            date: "",
                            numPages: "",
                            estado: "No Editado",
                            exDescripcion: col.data.descripcion,
                            images: [
                                {
                                    url: info[0],
                                    origin: "Internet",
                                    resolution: {
                                        width: 102,
                                        height: 150
                                    }
                                }
                            ]
                        }
                    }));
                });
                console.log(col.data.volumes);
                break;
            default:
                console.log(`Property: "${p.toString()}" has been updated.`);
                Reflect.set(t, p, v);
                break;
        }
        return true;
    }
});
