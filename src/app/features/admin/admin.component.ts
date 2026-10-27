import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Order } from '../../shared/models/order';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AdminService } from '../../core/services/admin.service';
import { OrderParams } from '../../shared/models/orderParams';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { MatLabel, MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { DialogService } from '../../core/services/dialog.service';

@Component({
  selector: 'app-admin',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButton,
    MatIcon,
    MatSelectModule,
    DatePipe,
    CurrencyPipe,
    MatLabel,
    MatTooltipModule,
    MatTabsModule,
    MatIconButton,
    RouterLink
],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements  OnInit {
  displayedColumns: string[] = ['id', 'buyerEmail','total','orderDate', 'status', 'actions'];
  dataSource = new MatTableDataSource<Order>([]);
  private adminService = inject(AdminService);
  private dialogService = inject(DialogService);
  orderParams = new OrderParams();
  totalOrders = 0;
  statusOptions = ['All', 'PaymentReceived', 'PaymentMismatch', 'Refunded', 'Pending'];

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.adminService.getOrders(this.orderParams).subscribe({
      next: (response) => {
        this.dataSource.data = response.data;
        this.totalOrders = response.count;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.orderParams.pageNumber = event.pageIndex + 1;
    this.orderParams.pageSize = event.pageSize;
    this.loadOrders();
  }

  onFilterSelect(event: MatSelectChange) {
    this.orderParams.filter = event.value;
    this.orderParams.pageNumber = 1; // Reset to first page when filter changes
    this.loadOrders();
  }

  async openRefundDialog(orderId: number) {
    const confirmed = await this.dialogService.confirm('Confirm Refund', 'Are you sure you want to refund this order? This action cannot be undone.');
    if (confirmed) {
      this.refundOrder(orderId);
    }
  }

  refundOrder(id: number) {
    this.adminService.refundOrder(id).subscribe({
      next: order => {
        this.dataSource.data = this.dataSource.data.map(o => o.id === id ? order as Order : o);
      }
    });
  }
}
