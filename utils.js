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
var ExtendableProxy = (function (_super) {
    __extends(ExtendableProxy, _super);
    function ExtendableProxy(handler) {
        var _this = _super.call(this) || this;
        return new Proxy(_this, handler);
    }
    return ExtendableProxy;
}(Object));
function commonConstructor(req, obj) { req.forEach(function (prop) { return obj.data[prop] = req[prop]; }); }
var Base = (function (_super) {
    __extends(Base, _super);
    function Base(handler, req) {
        var _this = _super.call(this, handler !== null && handler !== void 0 ? handler : {}) || this;
        if (req)
            commonConstructor(req, _this);
        return _this;
    }
    return Base;
}(ExtendableProxy));
var Volumen = (function (_super) {
    __extends(Volumen, _super);
    function Volumen(h, r) {
        return _super.call(this, h, r) || this;
    }
    ;
    return Volumen;
}(Base));
exports.Volumen = Volumen;
var Coleccion = (function (_super) {
    __extends(Coleccion, _super);
    function Coleccion(h, r) {
        return _super.call(this, h, r) || this;
    }
    ;
    return Coleccion;
}(Base));
exports.Coleccion = Coleccion;
