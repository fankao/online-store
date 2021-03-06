import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProduct, Product } from 'app/shared/model/product.model';
import { ProductService } from './product.service';
import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductUpdateComponent } from './product-update.component';

@Injectable({ providedIn: 'root' })
export class ProductResolve implements Resolve<IProduct> {
  constructor(private service: ProductService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProduct> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((product: HttpResponse<Product> | HttpResponse<any>) => product.body));
    }
    return of(new Product());
  }
}

export const productRoute: Routes = [
  {
    path: '',
    component: ProductComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams,
    },
    data: {
      authorities: Authority.USER,
      defaultSort: 'id,asc',
      pageTitle: 'storeApp.product.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProductDetailComponent,
    resolve: {
      product: ProductResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'storeApp.product.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProductUpdateComponent,
    resolve: {
      product: ProductResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'storeApp.product.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProductUpdateComponent,
    resolve: {
      product: ProductResolve,
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'storeApp.product.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
