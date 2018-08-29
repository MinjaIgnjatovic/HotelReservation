import * as Rxjs from 'rxjs';
import {interval} from 'rxjs/observable/interval';
import {HotelsService} from './hotels-service';
import {DatabaseService}from './database-service';

const hotelsService=new HotelsService();
const choosenCity=document.getElementById("from-place");
const searchButton=document.getElementById("dugme");
Rxjs.Observable.fromEvent(searchButton,"click")
.subscribe(()=>{
     DatabaseService.getCityHotels(choosenCity.value)
     .then(response=>{
         const result=response.json()
         .then(hotels=>{              
               hotelsService.drawHotelsList(hotels);      
         })
     })
});





















