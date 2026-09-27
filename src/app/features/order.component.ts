import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../core/services/order.service';
import { Order } from '../shared/models/order';
import { RouterLink } from '@angular/router';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order',
  imports: [
    RouterLink,
    CurrencyPipe,
    DatePipe,
    AsyncPipe
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
// export class OrderComponent implements OnInit {
//   private orderService = inject(OrderService);
//   orders: Order[] = [];

//   ngOnInit(): void {
//     this.orderService.getOrdersForUser().subscribe({
//       next: orders => this.orders = orders,
//     });
//   }
// }

export class OrderComponent {
  orders$: Observable<Order[]>;

  constructor(private orderService: OrderService) {
    this.orders$ = this.orderService.getOrdersForUser();
  }
}
