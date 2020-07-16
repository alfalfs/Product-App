import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

// import { Product } from '../ProductModel';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // selectedProduct: Product;
  // products: Product[];
  // readonly baseUrl = 'http://localhost:3000/products';

  constructor( private http:HttpClient) { }
  getProducts(){
    return this.http.get("http://localhost:3000/products");
  }
  newProduct(item){
    return this.http.post("http://localhost:3000/insert",{"product":item})
    .subscribe(data=>{console.log(data)})
  }

 deleteProduct(i){
    return this.http.delete(`http://localhost:3000/products/${i}`);
  }
  
}
