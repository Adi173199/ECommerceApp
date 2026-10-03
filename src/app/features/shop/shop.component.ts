import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopService } from '../../core/services/shop.service';
import { ProductItemComponent } from "./product-item/product-item.component";
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { ShopParams } from '../../shared/models/shopParams';
import { MatPaginator } from '@angular/material/paginator';
import { Pagination } from '../../shared/models/pagination';
import { FormsModule } from '@angular/forms';
import { EmptyStateComponent } from "../../shared/components/empty-state/empty-state.component";

@Component({
  selector: 'app-shop',
  imports: [
    ProductItemComponent,
    MatButton,
    MatIcon,
    MatMenu,
    MatSelectionList,
    MatListOption,
    MatMenuTrigger,
    MatPaginator,
    FormsModule,
    MatIconButton,
    EmptyStateComponent
],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  private shopService = inject(ShopService);
  private dialogService = inject(MatDialog);
  products = signal<Pagination<Product> | null>(null);
  
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' }
  ];

  shopParams = new ShopParams();
  pageSizeOptions = [5,10,15,20];

  title = 'Skinet';
  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop() {
    this.shopService.getBrands();
    this.shopService.getTypes();
    this.getProducts();
  }

  resetFilters() {
    this.shopParams = new ShopParams();
    this.getProducts();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: response => this.products.set(response),
      error: error => console.error(error)
    });
  }

  onSearchChange(){
    this.shopParams.pageNumber = 1; // Reset to first page when search changes
    this.getProducts();
  }

  handlePageEvent(event: any) {
    this.shopParams.pageNumber = event.pageIndex + 1;
    this.shopParams.pageSize = event.pageSize;
    this.getProducts();
  }

  onSortChange(event: MatSelectionListChange) {
    const selectedOption = event.options[0];
    if (selectedOption) {
      this.shopParams.sort = selectedOption.value;
      this.shopParams.pageNumber = 1; // Reset to first page when sorting changes
      this.getProducts();
    }
  }

  openFilterDialog() {
    const dialogRef = this.dialogService.open(FilterDialogComponent,{
    minWidth: '500px',
    data: {
      selectedBrands: this.shopParams.brands,
      selectedTypes: this.shopParams.types
    }
  });
  dialogRef.afterClosed().subscribe({
    next: result => {
      if (result) {
        console.log(result);
        this.shopParams.brands = result.selectedBrands;
        this.shopParams.types = result.selectedTypes;
        this.getProducts();
      }
    }
  })
}
}
