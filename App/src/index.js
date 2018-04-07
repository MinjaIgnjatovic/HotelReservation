import * as Rxjs from 'rxjs';
import {interval} from 'rxjs/observable/interval';
import {Hotel} from './hotels-service';



const gradSelekt=document.getElementById("from-place");
const datumStartSelekt=document.getElementById("date-start");
const datumEndSelekt=document.getElementById("date-end");
const brOsobaSelekt=document.getElementById("persons");

const dugme=document.getElementById("dugme");
Rxjs.Observable.fromEvent(dugme,"click")
.subscribe(()=>{
    //const res=Hotel.preuzmiHotele(gradSelekt.value) Pokusaj ovo preko klase!
    
    fetch("http://localhost:3000/hotels?grad=" +gradSelekt.value)
     .then(response=>{
         const res=response.json()
         .then(res=>{              
                Hotel.crtajHotel(res);          
         })
     })
});


/*var hoteli=Hotel.get()
.then(hotels=>{
    debugger;
    console.log(hotels);
})*/




















