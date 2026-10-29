import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ShopComponent } from './features/shop/shop.component';
import { ProductDetailsComponent } from './features/shop/product-details/product-details.component';
import { TestErrorComponent } from './features/test-error/test-error.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ServerErrorComponent } from './shared/components/server-error/server-error.component';
import { CartComponent } from './features/cart/cart.component';
import { authGuard } from './core/guard/auth-guard';
import { OrderComponent } from './features/order.component';
import { OrderDetailedComponent } from './features/order-detailed/order-detailed.component';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'shop', component: ShopComponent},
    {path: 'shop/:id', component: ProductDetailsComponent},
    {path: 'cart', component: CartComponent},
    {path: 'checkout', loadChildren: () => import('./features/checkout/route').then((m): Routes => Array.isArray(m.checkoutRoute) ? m.checkoutRoute : [m.checkoutRoute])},
    {path: 'account', loadChildren: () => import('./features/account/route').then((m): Routes => Array.isArray(m.accountRoute) ? m.accountRoute : [m.accountRoute])},
    {path: 'orders', component: OrderComponent, canActivate: [authGuard]},
    {path: 'orders/:id', component: OrderDetailedComponent, canActivate: [authGuard]},
    {path: 'test-error', component: TestErrorComponent},
    {path: 'not-found', component: NotFoundComponent},
    {path: 'server-error', component: ServerErrorComponent},
    {path: 'admin', loadComponent: () => import('./features/admin/admin.component').then((c) => c.AdminComponent), canActivate: [authGuard, adminGuard]},
    {path: '**', redirectTo: 'not-found', pathMatch: 'full'},
];