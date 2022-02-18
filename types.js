"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Coleccion = exports.Volumen = void 0;
var Data = require('./utils').Data;
var Volumen = (function (_super) {
    __extends(Volumen, _super);
    function Volumen(h, r) {
        return _super.call(this, h, r) || this;
    }
    ;
    return Volumen;
}(Data));
exports.Volumen = Volumen;
var Coleccion = (function (_super) {
    __extends(Coleccion, _super);
    function Coleccion(h, r) {
        return _super.call(this, h, r) || this;
    }
    ;
    return Coleccion;
}(Data));
exports.Coleccion = Coleccion;
