var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var scheduler = require('node-schedule');
var cheerio = require('cheerio');
var fetcher = require('node-fetch');
var _a = require('./types'), Volumen = _a.Volumen, Coleccion = _a.Coleccion;
var downloadData = function (obj, url) { return __awaiter(_this, void 0, void 0, function () {
    var response, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4, fetcher(url, {})];
            case 1:
                response = _b.sent();
                if (!response.ok)
                    return [2];
                obj.success = true;
                _a = obj;
                return [4, response.text()];
            case 2:
                _a.data = _b.sent();
                return [2];
        }
    });
}); };
var col = new Coleccion({});
var proxy = new Proxy({
    success: false,
    data: "",
    job: scheduler.scheduleJob('*/1 * * * * *', function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, downloadData(proxy, "https://www.listadomanga.es/coleccion.php?id=3515")];
            case 1:
                _a.sent();
                return [2];
        }
    }); }); })
}, {
    set: function (t, p, v) {
        switch (p) {
            case 'success':
                if (v)
                    t.job.cancel(false);
                break;
            case 'data':
                var $_1 = cheerio.load(v);
                var elems = $_1('center:nth-child(1) > table:nth-child(3) td.cen');
                col.data = {
                    title: $_1('center:nth-child(1) > table:nth-child(1) > tbody > tr:nth-child(1) > td > table > tbody > tr > td > h2').text().trim(),
                    descripcion: $_1('center:nth-child(1) > table:nth-child(8) > tbody > tr:nth-child(2) > td > table > tbody > tr > td').html().split("<hr>")[1].replace('.', '.\n'),
                    volumes: [],
                    info: ["TO DO"]
                };
                elems.each(function (_item, elem) {
                    var info = $_1(elem).html().split(/(?:<br>|<img src="|" alt="">|<div style="height: 8px"><\/div>)+/).splice(1);
                    col.data.volumes.push(new Volumen({}, {
                        data: {
                            title: info.slice(1, info.indexOf(info.find(function (value) { return value.includes("páginas"); }))).join(""),
                            price: parseFloat(info.find(function (value) { return value.includes("€"); }).split(" €")[0]).toFixed(2),
                            date: info.slice(-1)[0],
                            numPages: info.find(function (value) { return value.includes("páginas"); }),
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
                elems = $_1('center:nth-child(1) > table:nth-child(5) td.cen');
                elems.each(function (_item, elem) {
                    var info = $_1(elem).html().split(/(?:<br>|<img src="|" alt="">|<div style="height: 8px"><\/div>)+/).splice(1);
                    col.data.volumes.push(new Volumen({}, {
                        data: {
                            title: info.slice(1, info.indexOf(info.find(function (value) { return value.includes("páginas"); }))).join(""),
                            price: parseFloat(info.find(function (value) { return value.includes("€"); }).split(" €")[0]).toFixed(2),
                            date: info.slice(-1)[0],
                            numPages: info.find(function (value) { return value.includes("páginas"); }),
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
                elems = $_1('center:nth-child(1) > table:nth-child(7) td.cen');
                elems.each(function (_item, elem) {
                    var info = $_1(elem).html().split(/(?:<br>|<img src="|" alt="">|<div style="height: 8px"><\/div>)+/).splice(1);
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
                console.log("Property: \"".concat(p.toString(), "\" has been updated."));
                Reflect.set(t, p, v);
                break;
        }
        return true;
    }
});
