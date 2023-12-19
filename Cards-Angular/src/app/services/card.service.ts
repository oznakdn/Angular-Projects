import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Card } from '../models/card';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {


baseUrl:string='https://localhost:7141/api/Cards';

  constructor(private httpClient:HttpClient) { }


  //Get all cards
  getAllCards():Observable<Card[]>{
  return  this.httpClient.get<Card[]>(this.baseUrl);
  }

  //Add cards
  addCard(card:Card):Observable<Card>{
   card.id='00000000-0000-0000-0000-000000000000';
   return this.httpClient.post<Card>(this.baseUrl,card);
  }

  //Delete cards
  deleteCard(id:string):Observable<Card>{
    return this.httpClient.delete<Card>(`${this.baseUrl}/${id}`);
  }

  updateCard(card:Card):Observable<Card>{
   return this.httpClient.put<Card>(`${this.baseUrl}/${card.id}`,card);

  }



}
