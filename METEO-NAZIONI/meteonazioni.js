const API_KEYMETEO = "282491ea46f06a5ed50a99495a7359c6";

document.addEventListener("DOMContentLoaded",()=>{

    creaMenu();

    document.getElementById("form").addEventListener("submit",(e)=>{
        e.preventDefault();

    gestisciInvio();       
    })

    document.getElementById("form").addEventListener("reset",()=>{
        gestisciReset();
        
    })
})

function creaMenu(){

    fetch('https://raw.githubusercontent.com/pmontrasio/codici-stati/master/dist/countries.json')
   .then(
        ((res) =>{
            if(res.ok){
                return res.json()
            }
        })
   ).then((nazioni) => {
        //console.log(nazioni)
        
        let select = "<option value='' selected>Scegli una nazione</option>";
        //console.log(select)
        for (n in nazioni){
            let nomeStato = nazioni[n].italian_country_name_1
            //console.log(nomeStato)
            if(nomeStato){
                select += `<option value='${nazioni[n].iso3361_2_characters}'>${nazioni[n].italian_country_name_1}</option>`
            }           
        }
        document.getElementById("nazione").innerHTML = select;          
   }).catch((errore)=>{
    console.log(errore)
   })



}

function stampaIcona(meteo){
    let iconurl = `http://openweathermap.org/img/w/${meteo.weather[0].icon}.png` 
    document.getElementById("meteoIcon").setAttribute("src",`http://openweathermap.org/img/w/${meteo.weather[0].icon}.png`);
     document.getElementById("meteoIcon").classList.remove("d-none"); 
}

function creaCard(meteo){

    let citta = document.getElementById("citta").value;  
    let codiceStato = document.getElementById("nazione").value;  
    let titolo = document.getElementById("titolo");
    titolo.innerHTML = `Le previsioni meteo per ${citta} - ${codiceStato}`;
    let table1 = document.getElementById("tbl1");
    let contentTable = `
    <thead>
    <tr>
    <th scope="row">Condizioni:</th>
    <td class="text-end">${meteo.weather[0].description}</td>
    </tr>
    <tr>
      <th scope="row">Temperatura:</th>
      <td class="text-end">${meteo.main.temp} °C</td>
    </tr>
  </thead>
  <tbody>
  <tr>
    <th scope="row" class="text-left">Temperatura percepita:</th>
    <td class="text-end">${meteo.main.feels_like} °C</td>
  </tr>
  <tr>
    <th scope="row">Temperatura minima:</th>
    <td class="text-end">${meteo.main.temp_min} °C</td>
  </tr>
  <tr>
    <th scope="row">Temperatura massima:</th>
    <td class="text-end">${meteo.main.temp_max} °C</td>
  </tr>
  
  <tr>
    <th scope="row">Pressione:</th>
    <td class="text-end">${meteo.main.pressure} mbar</td>
  </tr>
  <tr>
    <th scope="row">Umidità:</th>
    <td class="text-end">${meteo.main.humidity} %</td>
  </tr>         
   </tbody>
    `
    table1.innerHTML = contentTable;  
}


function gestisciInvio (){

        let citta = document.getElementById("citta").value;
        let codiceStato = document.getElementById("nazione").value;
        console.log(citta,codiceStato)

        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${citta},${codiceStato}&appid=${API_KEYMETEO}&units=metric&lang=it`)
        .then(
        ((response) =>{
            if(response.ok){
                return response.json()
            }
        })
        ).then((meteo) => {
        console.log(meteo)
        //mettiamo un'iconcina prima del testo, rimuoviamo la classe d-none (altrimenti appare il quadratino)
        if(citta !== ""){
            if(codiceStato !== ""){
                stampaIcona(meteo); 
                creaCard(meteo);
            }else{
                document.getElementById("err").classList.add("alert");
                document.getElementById("err").classList.add("alert-danger");
                document.getElementById("err").innerHTML="Devi selezionare lo Stato"
            }           
            }else{
            document.getElementById("err").classList.add("alert");
            document.getElementById("err").classList.add("alert-danger");
            document.getElementById("err").innerHTML="Devi scrivere il nome della città"
            }               
        }).catch((errore)=>{
            console.log(errore)
        })
    }
function gestisciReset(){
         document.getElementById("citta").value="";
        document.getElementById("nazione").value="";
        document.getElementById("meteoCard").innerHTML="";
        location.reload();
}
    