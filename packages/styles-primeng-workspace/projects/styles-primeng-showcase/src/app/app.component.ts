import { Component, HostBinding } from '@angular/core';

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  @HostBinding('class') containerClasses = 'd-block container my-32 py-24';
  @HostBinding('class.bg-dark') hasDarkBackground = false;

  datatableStyleClass = '';

  private readonly products: Product[] = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1001',
      code: 'nvklal433',
      name: 'Black Watch',
      description: 'Product Description',
      image: 'black-watch.jpg',
      price: 72,
      category: 'Accessories',
      quantity: 61,
      inventoryStatus: 'INSTOCK',
      rating: 4,
    },
    {
      id: '1002',
      code: 'zz21cz3c1',
      name: 'Blue Band',
      description: 'Product Description',
      image: 'blue-band.jpg',
      price: 79,
      category: 'Fitness',
      quantity: 2,
      inventoryStatus: 'LOWSTOCK',
      rating: 3,
    },
    {
      id: '1003',
      code: '244wgerg2',
      name: 'Blue T-Shirt',
      description: 'Product Description',
      image: 'blue-t-shirt.jpg',
      price: 29,
      category: 'Clothing',
      quantity: 25,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1004',
      code: 'h456wer53',
      name: 'Bracelet',
      description: 'Product Description',
      image: 'bracelet.jpg',
      price: 15,
      category: 'Accessories',
      quantity: 73,
      inventoryStatus: 'INSTOCK',
      rating: 4,
    },
  ];

  productsSortable = [...this.products];

  productsFilterable = [
    ...this.products,
    {
      id: '1005',
      code: 'nfiu783m0',
      name: 'Black Dress',
      description: 'Product Description',
      image: 'black-dress.jpg',
      price: 53,
      category: 'Clothing',
      quantity: 67,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
  ];

  productsOrderable = [...this.products];
  columnsOrderable = [
    { field: 'code', header: 'Code' },
    { field: 'name', header: 'Name' },
    { field: 'category', header: 'Category' },
    { field: 'quantity', header: 'Quantity' },
  ];

  productsCheckboxes = [...this.products];
  selectedProductsCheckboxes?: Product;

  productsRadioButtons = [...this.products];
  selectedProductsRadioButtons?: Product;

  productsSelectable = [...this.products];
  selectedProductsSelectable = 'none';
  setSelectedProductsSelectable(value: Product[]) {
    this.selectedProductsSelectable = value.length ? value.map(p => p.name).join(', ') : 'none';
  }
}
