import * as Rxjs from 'rxjs';
import {interval} from 'rxjs/observable/interval';
import {DatabaseService} from './database-service';

export class HotelsService{

     drawHotelsList(hotels){  
        const hotelsDiv=document.getElementsByClassName('divDesno')[0];
        hotels.forEach(hotel=>{   
        const divHotel=document.createElement("div");
        divHotel.className="divHotel";
        divHotel.innerHTML="<b>"+hotel.ime+"</b>"+"<br>"+hotel.adresa+", "+hotel.grad+"<br>Phone number: "+hotel.kontakt+"<br><br>";
        const description=document.createElement("p");
        description.innerHTML="<i>"+hotel.opis;
        description.className="opis";
        divHotel.appendChild(description);
        const image=document.createElement("img");
        image.setAttribute("src", hotel.slika);
        image.className="slika";
        divHotel.appendChild(image);
        hotelsDiv.appendChild(divHotel);
     
        const bookButton=document.createElement("button");
        bookButton.innerHTML="Book a room";
        bookButton.className="bookDugme";
        divHotel.appendChild(bookButton);
        Rxjs.Observable.fromEvent(bookButton,"click")
        .subscribe(()=>
        {
            this.bookARoom(hotel);
        });
        
        const imagesLink=document.createElement("label");
        imagesLink.className="link";
        imagesLink.innerHTML="Click here for more images!";
        divHotel.appendChild(imagesLink);
        Rxjs.Observable.fromEvent(imagesLink,"click")
        .subscribe(()=> {
        this.drawMoreInformations(hotel.slike);
         });

        const line=document.createElement("hr");
        hotelsDiv.appendChild(line);
         })
    }

    drawMoreInformations(hotelImages){
    const imagesModal=document.getElementsByClassName("myModal2")[0];
    imagesModal.style.display="block"
    const modalContent=document.getElementsByClassName("modal-content2")[0];
    const closeButton=document.getElementsByClassName("close")[0];
    closeButton.onclick=function(){
        imagesModal.style.display="none";
    }
    hotelImages.forEach(hotelImage=> {
            const image=document.createElement("img");
            image.setAttribute("src",hotelImage.src);
            image.className="slikaSlideshow";
            modalContent.appendChild(image);
            const description=document.createElement("p");
            description.innerHTML=hotelImage.opis;
            description.className="opisSlike";
            modalContent.appendChild(description);
            const emptyRow=document.createElement("br");
            modalContent.appendChild(emptyRow);
        })    
    }

     bookARoom(hotel){
        const bookModal=document.getElementsByClassName('myModal')[0];
        bookModal.style.display='block';
        const closeButton=document.getElementsByClassName('close')[1];
        closeButton.onclick=function()
        {
            bookModal.style.display="none";
        }
        const reserveButton=document.getElementsByClassName('reserve')[0];       
        Rxjs.Observable.fromEvent(reserveButton,"click")
        .subscribe(()=> {
            this.checkAndAddToDatabase(hotel);
        });    
    }

    checkAndAddToDatabase(hotel) {

        const startDate=document.getElementById("date-start");
        const endDate=document.getElementById("date-end");
        const typeOfRoom=document.getElementById("typeOfRoom");
        const firstName=document.getElementsByClassName("inputIme")[0];
        const lastName=document.getElementsByClassName("inputPrezime")[0];
        const email=document.getElementsByClassName("inputEMail")[0];
        const numberOfPersons=document.getElementById("persons");
        const phone=document.getElementsByClassName("inputPhone")[0];

        if(firstName.value=="" || lastName.value=="" || phone.value=="" || email.value=="" ||endDate.value=="" || startDate.value=="" ) { 
            window.alert("Please fill up all fields!");
        }
        else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
            const reservation={
                "hotelId":hotel.id,
                "firstName":firstName.value,
                "lastName":lastName.value,
                "emailAddress":email.value,
                "contactNumber":phone.value,
                "numberOfPersons":numberOfPersons.value,
                "typeOfRoom":typeOfRoom.value,
                "from":datumStartSelekt.value,
                "to":datumEndSelekt.value
            };
           DatabaseService.addReservation(reservation);
           const bookModal=document.getElementsByClassName("modal-content")[0];
           const reservationInfo=document.createElement("div");
           reservationInfo.className="reserved";
           reservationInfo.innerHTML="Thank you for your reservation! You will receive more information on your email!";
           bookModal.appendChild(reservationInfo);
        }
        else
            window.alert("You have entered an invalid email address!");
    }
}