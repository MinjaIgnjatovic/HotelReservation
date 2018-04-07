import {Soba} from './soba';
import * as Rxjs from 'rxjs';
import {interval} from 'rxjs/observable/interval';

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
      
        const dugme=document.createElement("button");
        dugme.innerHTML="Book a room";
        dugme.className="bookDugme";
        divHotel.appendChild(dugme);
        const dugmeObservable=Rxjs.Observable.fromEvent(dugme,"click")
        .subscribe(()=>
        {Hotel.rezervacija(hotel);
        
        });
        
        const h=document.createElement("hr");
        divDesno.appendChild(h);
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

        const lab4=document.createElement("label");
        lab4.innerHTML="* Fields are requiered!"
        modalContent.appendChild(lab4);
        const novired4=document.createElement("br");
        modalContent.appendChild(novired4);

        //dugme za rezervaciju
        const rezervisi=document.createElement("button");
        rezervisi.innerHTML="Reserve";
        modalContent.appendChild(rezervisi);
       

    }

  
}