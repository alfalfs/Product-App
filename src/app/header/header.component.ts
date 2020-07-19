import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../products.service";
import { Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private productService: ProductsService,private router : Router) { }
  title:String = "Product Management";
  ngOnInit(): void {
  }
  loggedIn()
  {
    return !! localStorage.getItem('token')
  }

  logoutUser(){
    localStorage.removeItem("token")
    this.router.navigate["/"]
  }

}
