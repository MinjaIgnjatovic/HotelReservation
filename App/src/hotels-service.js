import * as Rxjs from 'rxjs';
import {interval} from 'rxjs/observable/interval';
import {DatabaseService} from './database-service';

export class Hotel{

    static get()
    { 
        fetch("http://localhost:3000/hotels")
        .then(response=>response.json())  
    }

    static crtajHotel(hoteli)
    {
        const kontejner=document.getElementsByClassName("kontejnerDesno")[0];
        const divDesno=document.createElement("divDesno");
        divDesno.className="divDesno";
        kontejner.appendChild(divDesno);
       
     hoteli.forEach(hotel=>{   
        const divHotel=document.createElement("div");
        divHotel.className="divHotel";
        divHotel.innerHTML="<b>"+hotel.ime+"</b>"+"<br>"+hotel.adresa+", "+hotel.grad+"<br>Phone number: "+hotel.kontakt+"<br><br>";
        const opis=document.createElement("p");
        opis.innerHTML="<i>"+hotel.opis;
        opis.className="opis";
        divHotel.appendChild(opis);
        const slika=document.createElement("img");
        slika.setAttribute("src", hotel.slika);
        slika.className="slika";
        divHotel.appendChild(slika);
        divDesno.appendChild(divHotel);
      //book dugme
        const dugme=document.createElement("button");
        dugme.innerHTML="Book a room";
        dugme.className="bookDugme";
        divHotel.appendChild(dugme);
        const dugmeObservable=Rxjs.Observable.fromEvent(dugme,"click")
        .subscribe(()=>
        {
            this.rezervacija(hotel);
        });
        
        const lin=document.createElement("label");
        lin.className="link";
        lin.innerHTML="Click here for more images!";
        divHotel.appendChild(lin);
        Rxjs.Observable.fromEvent(lin,"click")
        .subscribe(()=>
    {
        this.crtajViseInformacija(hotel.slike);
    });

        const h=document.createElement("hr");
        divDesno.appendChild(h);
        })
    }

   static crtajViseInformacija(slike)
   {
    const bod=document.getElementsByTagName("body")[0];
    const myModal=document.createElement("div");
    myModal.className="myModal2";
   bod.appendChild(myModal);

   myModal.style.display="block";
    const modalContent=document.createElement("div");
    modalContent.className="modal-content2";
    myModal.appendChild(modalContent);
    //x dugme
    const sp=document.createElement("span");
    sp.className="close";
    sp.innerHTML="&times;";
            modalContent.appendChild(sp);
    sp.onclick=function()
    {
        myModal.style.display="none";
    }
     
  
    slike.forEach(slika=>
        {
            const sl=document.createElement("img");
            sl.setAttribute("src",slika.src);
            sl.className="slikaSlideshow";
            modalContent.appendChild(sl);
            const opis=document.createElement("p");
            opis.innerHTML=slika.opis;
            opis.className="opisSlike";
            modalContent.appendChild(opis);
            const pauza=document.createElement("br");
            modalContent.appendChild(pauza);
        })    
    }


    static rezervacija(hotel)
    {
        const bod=document.getElementsByTagName("body")[0];
        const myModal=document.createElement("div");
        myModal.className="myModal";
        bod.appendChild(myModal);

        myModal.style.display="block";
        const modalContent=document.createElement("div");
        modalContent.className="modal-content";
        myModal.appendChild(modalContent);
        //x dugme
        const sp=document.createElement("span");
        sp.className="close";
        sp.innerHTML="&times;";
                modalContent.appendChild(sp);
        sp.onclick=function()
        {
            myModal.style.display="none";
        }
       
        //ime
        const lab=document.createElement("label");
        lab.className="for";
        lab.innerHTML="*First Name:  ";
        modalContent.appendChild(lab);
       const inp1=document.createElement("input");
       inp1.className="inputIme";
        modalContent.appendChild(inp1);
        const novired=document.createElement("br");
        modalContent.appendChild(novired);
        //prezime
        const lab2=document.createElement("label");
        lab2.className="for";
        lab2.innerHTML="*Last Name:  ";
        modalContent.appendChild(lab2);
        const inp2=document.createElement("input");
        inp2.className="inputPrezime";
        modalContent.appendChild(inp2);
        const novired2=document.createElement("br");
        modalContent.appendChild(novired2);
        //e-mail adresa
        const lab3=document.createElement("label");
        lab3.className="for";
        lab3.innerHTML="*E-mail address:  " ;
        modalContent.appendChild(lab3);
       const inp3=document.createElement("input");
        inp3.className="inputEMail";
        modalContent.appendChild(inp3);
        const novired3=document.createElement("br");
        modalContent.appendChild(novired3);
        //phone
        const lab5=document.createElement("label");
        lab5.className="for";
        lab5.innerHTML="*Phone number:  " ;
        modalContent.appendChild(lab5);
       const inp4=document.createElement("input");
        inp4.className="inputPhone";
        modalContent.appendChild(inp4);
        const novired5=document.createElement("br");
        modalContent.appendChild(novired5);
        
        const lab4=document.createElement("label");
        lab4.innerHTML="* Fields are requiered!"
        modalContent.appendChild(lab4);
        const novired4=document.createElement("br");
        modalContent.appendChild(novired4);
        //dugme za rezervaciju
        const rezervisi=document.createElement("button");
        rezervisi.innerHTML="Reserve";
        rezervisi.className="reserve";
        modalContent.appendChild(rezervisi);
        Rxjs.Observable.fromEvent(rezervisi,"click")
        .subscribe(()=>
        {
            this.upisUBazu(hotel);
        
        });    
    }

    static upisUBazu(hotel)
    {
        const datumStartSelekt=document.getElementById("date-start");
        const datumEndSelekt=document.getElementById("date-end");
        const typeOfRoom=document.getElementById("typeOfRoom");
        const firstName=document.getElementsByClassName("inputIme")[0];
        const lastName=document.getElementsByClassName("inputPrezime")[0];
        const email=document.getElementsByClassName("inputEMail")[0];
        const brOsoba=document.getElementById("persons");
        const phone=document.getElementsByClassName("inputPhone")[0];

    //provera da li su sva polja uneta
     if(firstName.value=="" || lastName.value=="" || phone.value=="" || email.value=="" ||datumEndSelekt.value=="" || datumStartSelekt.value=="" )
      { 
        window.alert("Please fill up all fields!");
      }

        //validacija emaila
        else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))
        {
            const obj={
                "hotelId":hotel.id,
                "firstName":firstName.value,
                "lastName":lastName.value,
                "emailAddress":email.value,
                "contactNumber":phone.value,
                "numberOfPersons":persons.value,
                "typeOfRoom":typeOfRoom.value,
                "from":datumStartSelekt.value,
                "to":datumEndSelekt.value
            };
         const url="http://localhost:3000/rezervacije";
           DatabaseService.addToDatabase(url,obj);

           const modal=document.getElementsByClassName("modal-content")[0];
           const rez=document.createElement("div");
           rez.className="reserved";
           rez.innerHTML="Thank you for your reservation! You will receive more information on your email!";
           modal.appendChild(rez);
        }
        else
            window.alert("You have entered an invalid email address!");
    }

  
}