"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductComponent = void 0;
var core_1 = require("@angular/core");
var pagination_constants_1 = require("app/shared/constants/pagination.constants");
var product_delete_dialog_component_1 = require("./product-delete-dialog.component");
var ProductComponent = /** @class */ (function () {
    function ProductComponent(productService, parseLinks, activatedRoute, dataUtils, router, eventManager, modalService) {
        var _this = this;
        this.productService = productService;
        this.parseLinks = parseLinks;
        this.activatedRoute = activatedRoute;
        this.dataUtils = dataUtils;
        this.router = router;
        this.eventManager = eventManager;
        this.modalService = modalService;
        this.totalItems = 0;
        this.itemsPerPage = pagination_constants_1.ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(function (data) {
            _this.page = data.pagingParams.page;
            _this.previousPage = data.pagingParams.page;
            _this.reverse = data.pagingParams.ascending;
            _this.predicate = data.pagingParams.predicate;
        });
    }
    ProductComponent.prototype.loadAll = function () {
        var _this = this;
        this.productService
            .query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        })
            .subscribe(function (res) { return _this.paginateProducts(res.body, res.headers); });
    };
    ProductComponent.prototype.loadPage = function (page) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    };
    ProductComponent.prototype.transition = function () {
        this.router.navigate(['/product'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    };
    ProductComponent.prototype.clear = function () {
        this.page = 0;
        this.router.navigate([
            '/product',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            },
        ]);
        this.loadAll();
    };
    ProductComponent.prototype.ngOnInit = function () {
        this.loadAll();
        this.registerChangeInProducts();
    };
    ProductComponent.prototype.ngOnDestroy = function () {
        if (this.eventSubscriber) {
            this.eventManager.destroy(this.eventSubscriber);
        }
    };
    ProductComponent.prototype.trackId = function (index, item) {
        return item.id;
    };
    ProductComponent.prototype.byteSize = function (base64String) {
        return this.dataUtils.byteSize(base64String);
    };
    ProductComponent.prototype.openFile = function (contentType, base64String) {
        if (contentType === void 0) { contentType = ''; }
        return this.dataUtils.openFile(contentType, base64String);
    };
    ProductComponent.prototype.registerChangeInProducts = function () {
        var _this = this;
        this.eventSubscriber = this.eventManager.subscribe('productListModification', function () { return _this.loadAll(); });
    };
    ProductComponent.prototype["delete"] = function (product) {
        var modalRef = this.modalService.open(product_delete_dialog_component_1.ProductDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.product = product;
    };
    ProductComponent.prototype.sort = function () {
        var result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    };
    ProductComponent.prototype.paginateProducts = function (data, headers) {
        this.links = this.parseLinks.parse(headers.get('link') || '');
        this.totalItems = parseInt(headers.get('X-Total-Count') || '0', 10);
        this.products = data || [];
    };
    ProductComponent = __decorate([
        core_1.Component({
            selector: 'jhi-product',
            templateUrl: './product.component.html'
        })
    ], ProductComponent);
    return ProductComponent;
}());
exports.ProductComponent = ProductComponent;
