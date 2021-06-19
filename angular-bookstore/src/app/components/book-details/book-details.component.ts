import { CartItem } from './../../common/cart-item';
import { BookService } from './../../services/book.service';
import { Book } from 'src/app/common/book';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

book: Book = new Book();

  constructor(private _acitivatedRoute: ActivatedRoute, private _bookService: BookService, private _cartService: CartService) { }

  ngOnInit(): void {
  
    this._acitivatedRoute.paramMap.subscribe(
      () =>{
        this.getBookInfo();
      }
    )

  }

  getBookInfo(){
    const id: number = +this._acitivatedRoute.snapshot.paramMap.get('id');

    this._bookService.get(id).subscribe(
      data => {
        this.book = data;
      }
    )
  }

  addToCart(){
    const cartItem = new CartItem(this.book);
    this._cartService.addToCart(cartItem);
  }

}
