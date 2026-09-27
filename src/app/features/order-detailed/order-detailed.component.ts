import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Order } from '../../shared/models/order';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { AddressPipe } from "../../shared/pipe/address-pipe";
import { PaymentCardPipe } from "../../shared/pipe/payment-card-pipe";

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
    RouterLink
],
  templateUrl: './order-detailed.component.html',
  styleUrl: './order-detailed.component.css',
})
export class OrderDetailedComponent {
  private orderService = inject(OrderService);
  private activatedRoute = inject(ActivatedRoute);

  order$ = this.orderService.getOrderDetailsForUser(
    +this.activatedRoute.snapshot.paramMap.get('id')!
  );
}
