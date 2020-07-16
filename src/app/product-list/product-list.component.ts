import { Component, OnInit } from '@angular/core';
import { ProductModel } from './product.model';
import { ProductsService } from '../products.service';


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
  constructor( private productService: ProductsService) { 

  }
  toggleImage(): void{
    this.showImage = !this.showImage;
  }
  
  ngOnInit(): void {
    //calling getProducts() and loading the products array
    this.productService.getProducts().subscribe((data)=>{
      this.products=JSON.parse(JSON.stringify(data));
    })
  }

}

