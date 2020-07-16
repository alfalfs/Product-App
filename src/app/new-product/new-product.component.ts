import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ProductModel } from '../product-list/product.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  title:String = "Add Product";
  constructor(private productService: ProductsService, private router: Router) { }
  productItem = new ProductModel(null,null,null,null,null,null,null,null);
  ngOnInit(): void {
  }
  AddProduct(){
    this.productService.newProduct(this.productItem);
    console.log("Called");
    alert("Success");
    this.router.navigate(['/']);
  }

}
