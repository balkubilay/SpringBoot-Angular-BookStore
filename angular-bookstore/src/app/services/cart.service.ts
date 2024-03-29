import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

    addToCart(theCartItem: CartItem){

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if(this.cartItems.length > 0){

    existingCartItem =  this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);
    
    alreadyExistsInCart = (existingCartItem != undefined)
    }
    
    if(alreadyExistsInCart){
      existingCartItem.quantity++;
    }else{
      this.cartItems.push(theCartItem);
    }

    this.calculateTotalPrice();
    
  
  }
  calculateTotalPrice() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    //calculate the total price and total quantity
    for(let currentCartItem of this.cartItems){
        totalPriceValue +=  currentCartItem.quantity * currentCartItem.unitPrice;
         totalQuantityValue +=  currentCartItem.quantity;

    }

    console.log(`total price: ${totalPriceValue}, Total quantity: ${totalQuantityValue}`);
    //publish the events
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);


  }
  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;

    if(cartItem.quantity  === 0){
      this.remove(cartItem);
    }else{
          this.calculateTotalPrice();

    }
  }

  remove(cartItem: CartItem){
   const itemIndex = this.cartItems.findIndex((tempCartItem)=> tempCartItem.id === cartItem.id);
  
    if(itemIndex >-1){
      this.cartItems.splice(itemIndex,1);
      this.calculateTotalPrice();
    }
  }

}
