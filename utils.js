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
exports.Data = void 0;
var ExtendableProxy = (function (_super) {
    __extends(ExtendableProxy, _super);
    function ExtendableProxy(handler) {
        var _this = _super.call(this) || this;
        return new Proxy(_this, handler);
    }
    return ExtendableProxy;
}(Object));
function isEmpty(obj) {
    for (var _ in obj)
        return false;
    return true;
}
function commonConstructor(req, obj) {
    if (isEmpty(obj.data))
        obj.data = {};
    for (var prop in req.data)
        obj.data[prop] = req.data[prop];
}
var Data = (function (_super) {
    __extends(Data, _super);
    function Data(handler, req) {
        var _this = _super.call(this, handler) || this;
        commonConstructor(req !== null && req !== void 0 ? req : {}, _this !== null && _this !== void 0 ? _this : {});
        return _this;
    }
    return Data;
}(ExtendableProxy));
exports.Data = Data;
