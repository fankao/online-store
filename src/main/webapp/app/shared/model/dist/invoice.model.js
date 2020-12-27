"use strict";
exports.__esModule = true;
exports.Invoice = void 0;
var Invoice = /** @class */ (function () {
    function Invoice(id, date, details, status, paymentMethod, paymentDate, paymentAmount, shipments, order, code) {
        this.id = id;
        this.date = date;
        this.details = details;
        this.status = status;
        this.paymentMethod = paymentMethod;
        this.paymentDate = paymentDate;
        this.paymentAmount = paymentAmount;
        this.shipments = shipments;
        this.order = order;
        this.code = code;
    }
    return Invoice;
}());
exports.Invoice = Invoice;
