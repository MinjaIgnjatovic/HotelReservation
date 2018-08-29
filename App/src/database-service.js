const ReservationUrl='http://localhost:3000/rezervacije';
const HotelsUrl='http://localhost:3000/hotels';
const CityHotelsUrl="http://localhost:3000/hotels?grad=";

export class DatabaseService{

    static addReservation(obj){
        return fetch(ReservationUrl,{
            method:"post",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify(obj) 
        })
        .then(response=>response.json())
        .then(json=>{
            console.log("parsed json: ",json);
            return true;
        })
    }

    static getHotels(){
      return  fetch(HotelsUrl,{
        method:"get",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
        },
     })
   }

    static getCityHotels(city){
        return fetch(CityHotelsUrl+city,{
            method:"get",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
         })
    }
}