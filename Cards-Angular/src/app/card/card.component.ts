import { Component, OnInit } from '@angular/core';
import { empty } from 'rxjs';
import { Card } from '../models/card';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {


  cards:Card[]=[];
  card:Card={
    id:'',
    cardHolderName:'',
    cardNumber:'',
    expiryMonth:0,
    expiryYear:0,
    cvc:0
  }
  constructor(private cardService:CardService) { }

  ngOnInit(): void {
    this.getAllCards();
  }


  /* GetAll Card */
  getAllCards(){
    this.cardService.getAllCards().subscribe(res=>{
      this.cards=res;
    });
  }


  /* Add Card */
  addCard(){
    if(this.card.id==='')
    {
      this.cardService.addCard(this.card).subscribe(res=>{
        alert("Card added successfully");
        this.getAllCards();
        this.card={
          id:'',
          cardHolderName:'',
          cardNumber:'',
          expiryMonth:0,
          expiryYear:0,
          cvc:0
        };
      });
    }
    else
    {
      this.updateCard(this.card);
    }

  }

  /* Delete Card */
  deleteCard(id:string){
    this.cardService.deleteCard(id).subscribe(res=>{
      alert("card deleted successfully");
      this.getAllCards();
    });
  }



  /* Update Card */
  updateCard(card:Card){
    this.cardService.updateCard(card).subscribe(res=>{
      alert("Card updated successfully");
      this.getAllCards();
    });

  }

  /* Fill the inputs */
  populateForm(card:Card){
    this.card=card;
  }

}
