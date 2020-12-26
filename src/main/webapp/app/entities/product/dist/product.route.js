"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.productRoute = exports.ProductResolve = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var authority_constants_1 = require("app/shared/constants/authority.constants");
var user_route_access_service_1 = require("app/core/auth/user-route-access-service");
var product_model_1 = require("app/shared/model/product.model");
var product_component_1 = require("./product.component");
var product_detail_component_1 = require("./product-detail.component");
var product_update_component_1 = require("./product-update.component");
var ProductResolve = /** @class */ (function () {
    function ProductResolve(service, router) {
        this.service = service;
        this.router = router;
    }
    ProductResolve.prototype.resolve = function (route) {
        var _this = this;
        var id = route.params['id'];
        if (id) {
            return this.service.find(id).pipe(operators_1.flatMap(function (product) {
                if (product.body) {
                    return rxjs_1.of(product.body);
                }
                else {
                    _this.router.navigate(['404']);
                    return rxjs_1.EMPTY;
                }
            }));
        }
        return rxjs_1.of(new product_model_1.Product());
    };
    ProductResolve = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], ProductResolve);
    return ProductResolve;
}());
exports.ProductResolve = ProductResolve;
exports.productRoute = [
    {
        path: '',
        component: product_component_1.ProductComponent,
        data: {
            authorities: [authority_constants_1.Authority.USER],
            defaultSort: 'id,asc',
            pageTitle: 'storeApp.product.home.title'
        },
        canActivate: [user_route_access_service_1.UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: product_detail_component_1.ProductDetailComponent,
        resolve: {
            product: ProductResolve
        },
        data: {
            authorities: [authority_constants_1.Authority.USER],
            pageTitle: 'storeApp.product.home.title'
        },
        canActivate: [user_route_access_service_1.UserRouteAccessService]
    },
    {
        path: 'new',
        component: product_update_component_1.ProductUpdateComponent,
        resolve: {
            product: ProductResolve
        },
        data: {
            authorities: [authority_constants_1.Authority.USER],
            pageTitle: 'storeApp.product.home.title'
        },
        canActivate: [user_route_access_service_1.UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: product_update_component_1.ProductUpdateComponent,
        resolve: {
            product: ProductResolve
        },
        data: {
            authorities: [authority_constants_1.Authority.USER],
            pageTitle: 'storeApp.product.home.title'
        },
        canActivate: [user_route_access_service_1.UserRouteAccessService]
    },
];
