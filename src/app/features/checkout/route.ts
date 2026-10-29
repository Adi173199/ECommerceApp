import { Route } from "@angular/router";
import { orderCompleteGuard } from "../../core/guards/order-complete-guard";
import { authGuard } from "../../core/guard/auth-guard";
import { CheckoutSuccessComponent } from "./checkout-success/checkout-success.component";
import { emptyCartGuardGuard } from "../../core/guard/empty-cart-guard-guard";
import { CheckoutComponent } from "./checkout.component";

export const checkoutRoute: Route[] = [
    { path: '', component: CheckoutComponent, canActivate: [authGuard, emptyCartGuardGuard] },
    { path: 'success', component: CheckoutSuccessComponent, canActivate: [authGuard, orderCompleteGuard] },
];