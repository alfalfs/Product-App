import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from '../product-list/product.model';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

  
export class ProductDetailsComponent implements OnInit {
  title:String = "Edit Product";
  p_id="";
  constructor(private _route:ActivatedRoute, private productService: ProductsService,private router: Router) { }
  editItem = new ProductModel(null,null,null,null,null,null,null,null);
  ngOnInit(): void {
    this._route.params.subscribe(params =>{
      this.p_id = params['p_id'];
    });
    this.productService.editProduct(this.p_id).subscribe((data)=>{
      this.editItem=JSON.parse(JSON.stringify(data));
      //console.log(data);
      // console.log(this.editItem);                 
    });
  }
  UpdateProduct(){
    this.productService.updateProduct(this.editItem);
    console.log("called");
      // console.log(this.productItem);
      alert("Updated Successfully");
      this.router.navigate(['/']);
  }

}


