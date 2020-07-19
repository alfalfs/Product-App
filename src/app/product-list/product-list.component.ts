import { Component, OnInit } from '@angular/core';
import { ProductModel } from './product.model';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title:String = "Product List"
  //Products is the  model class for a product item
  products: ProductModel[];
  //image properties
  imageWidth:number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  //creating service object for calling getProduct()
  constructor( private productService: ProductsService ,private _authService: AuthService) { }
  toggleImage(): void{
    this.showImage = !this.showImage;
  }
  
  ngOnInit(): void {
    //calling getProducts() and loading the products array
    this.productService.getProducts().subscribe((data)=>{
      this.products=JSON.parse(JSON.stringify(data));
    })
  }

  loggedIn()
  {
    return !! localStorage.getItem('token')
  }
  delete(i:string){
    console.log(i);
    if(confirm('Are you sure?')===true){
    this.productService.deleteProduct(i)
    .subscribe((response:{id})=>{
      console.log(`product with id ${response.id} deleted successfully`);
      this.productService.getProducts()
      .subscribe((data)=>{
        this.products= JSON.parse(JSON.stringify(data))
      })
    })
  }
}

  // searchTitle(): void {
  //   this.productService.findByTitle(this.title)
  //     .subscribe(
  //       data => {
  //         this.products = data;
  //         console.log(data);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }
}

