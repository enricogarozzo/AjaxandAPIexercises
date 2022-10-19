document.addEventListener("DOMContentLoaded",()=>{
    console.log("ciao")

    document.getElementById("cercaITunes").addEventListener("submit", (event)=>{

        event.preventDefault();
        const nomeArtista = encodeURIComponent(document.getElementById("artista").value);      
        console.log(nomeArtista);

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function (){
            if (xhr.readyState === 4 && xhr.status === 200){
                
                let response = JSON.parse(xhr.responseText);
                console.log(response);

                let songs = response.results;
                //console.log(songs)
                let titolo = `
                <h3> Trovati ${response.resultCount} risultati per ${nomeArtista}</h3>
                `
                let contentTHead = `
                <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">Track Name</th>
                        <th scope="col">Track Price</th>
                        <th scope="col" class="text-center">Track Audio</th>
                        </tr>
                    </thead> 
                `
                let contentTBody="";
                for (let song in songs){
                    let nome = songs[song].trackName;
                    let price = songs[song].trackPrice;
                    let audio = songs[song].previewUrl;
                    contentTBody +=
                    `   <tbody>
                            <tr>
                                <td> ${nome}</th>
                                <td> ${price}</th>
                                <td class="text-center"> <audio controls src="${audio}"></audio></th>
                            </tr>
                        </tbody> 
                    `
                }
                document.getElementById("listaTracks").innerHTML = titolo + contentTHead +contentTBody;
            }
        }
        xhr.open("GET",`https://iTunes.apple.com/search?term=${nomeArtista}&media=music&limit=10`, true);
        xhr.send();
        })

    
})