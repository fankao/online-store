"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CustomerComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var pagination_constants_1 = require("app/shared/constants/pagination.constants");
var customer_delete_dialog_component_1 = require("./customer-delete-dialog.component");
var CustomerComponent = /** @class */ (function () {
    function CustomerComponent(customerService, activatedRoute, router, eventManager, modalService) {
        this.customerService = customerService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.eventManager = eventManager;
        this.modalService = modalService;
        this.totalItems = 0;
        this.itemsPerPage = pagination_constants_1.ITEMS_PER_PAGE;
        this.ngbPaginationPage = 1;
    }
    CustomerComponent.prototype.loadPage = function (page, dontNavigate) {
        var _this = this;
        var pageToLoad = page || this.page || 1;
        this.customerService
            .query({
            page: pageToLoad - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        })
            .subscribe(function (res) { return _this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate); }, function () { return _this.onError(); });
    };
    CustomerComponent.prototype.ngOnInit = function () {
        this.handleNavigation();
        this.registerChangeInCustomers();
    };
    CustomerComponent.prototype.handleNavigation = function () {
        var _this = this;
        rxjs_1.combineLatest(this.activatedRoute.data, this.activatedRoute.queryParamMap, function (data, params) {
            var _a;
            var page = params.get('page');
            var pageNumber = page !== null ? +page : 1;
            var sort = ((_a = params.get('sort')) !== null && _a !== void 0 ? _a : data['defaultSort']).split(',');
            var predicate = sort[0];
            var ascending = sort[1] === 'asc';
            if (pageNumber !== _this.page || predicate !== _this.predicate || ascending !== _this.ascending) {
                _this.predicate = predicate;
                _this.ascending = ascending;
                _this.loadPage(pageNumber, true);
            }
        }).subscribe();
    };
    CustomerComponent.prototype.ngOnDestroy = function () {
        if (this.eventSubscriber) {
            this.eventManager.destroy(this.eventSubscriber);
        }
    };
    CustomerComponent.prototype.trackId = function (index, item) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        return item.id;
    };
    CustomerComponent.prototype.registerChangeInCustomers = function () {
        var _this = this;
        this.eventSubscriber = this.eventManager.subscribe('customerListModification', function () { return _this.loadPage(); });
    };
    CustomerComponent.prototype["delete"] = function (customer) {
        var modalRef = this.modalService.open(customer_delete_dialog_component_1.CustomerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.customer = customer;
    };
    CustomerComponent.prototype.sort = function () {
        var result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    };
    CustomerComponent.prototype.onSuccess = function (data, headers, page, navigate) {
        this.totalItems = Number(headers.get('X-Total-Count'));
        this.page = page;
        if (navigate) {
            this.router.navigate(['/customer'], {
                queryParams: {
                    page: this.page,
                    size: this.itemsPerPage,
                    sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
                }
            });
        }
        this.customers = data || [];
        this.ngbPaginationPage = this.page;
    };
    CustomerComponent.prototype.onError = function () {
        var _a;
        this.ngbPaginationPage = (_a = this.page) !== null && _a !== void 0 ? _a : 1;
    };
    CustomerComponent = __decorate([
        core_1.Component({
            selector: 'jhi-customer',
            templateUrl: './customer.component.html'
        })
    ], CustomerComponent);
    return CustomerComponent;
}());
exports.CustomerComponent = CustomerComponent;
