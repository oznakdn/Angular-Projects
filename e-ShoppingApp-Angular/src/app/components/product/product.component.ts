import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public productList:any;
  constructor(private apiService:ApiService, private cartService:CartService) { }


  ngOnInit(): void {

    this.apiService.getProduct()
    .subscribe(res => {
      this.productList=res;

      this.productList.foreach((a:any)=>{
        Object.assign(a,{quantity:1,total:a.price});
      })
    });
  }

  addToCart(item:any){
      this.cartService.addToCart(item);
  }

}




