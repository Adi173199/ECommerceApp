import { Component, inject } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../shared/models/order';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { AddressPipe } from '../../shared/pipe/address-pipe';
import { PaymentCardPipe } from '../../shared/pipe/payment-card-pipe';
import { AccountService } from '../../core/services/account.service';
import { AdminService } from '../../core/services/admin.service';

@Component({
  selector: 'app-order-detailed',
  imports: [
    MatCardModule,
    MatButton,
    DatePipe,
    CurrencyPipe,
    AsyncPipe,
    AddressPipe,
    PaymentCardPipe,
  ],
  templateUrl: './order-detailed.component.html',
  styleUrl: './order-detailed.component.css',
})
export class OrderDetailedComponent {
  private orderService = inject(OrderService);
  private activatedRoute = inject(ActivatedRoute);
  private accountService = inject(AccountService);
  private adminService = inject(AdminService);
  private router = inject(Router);
  order?: Order;

  buttonText = this.accountService.isAdmin() ? 'Return to admin' : 'Return to orders';

  onReturnClick() {
    this.accountService.isAdmin()
      ? this.router.navigateByUrl('/admin')
      : this.router.navigateByUrl('/orders');
  }

  order$ = this.accountService.isAdmin()
    ? this.adminService.getOrder(+this.activatedRoute.snapshot.paramMap.get('id')!)
    : this.orderService.getOrderDetailsForUser(+this.activatedRoute.snapshot.paramMap.get('id')!);
}
