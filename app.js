// MAIN VARIABLES
const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result")

// API
const apiURL = "https://api.lyrics.ovh";

// GET API AND "SHOWDATA()"
async function getApi(search) {
  const res = await fetch(`${apiURL}/suggest/${search}`);
  const data = await res.json();

  showData(data);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim()
    if(!searchTerm){
      alert("plase type ina search term")
    }else{
      getApi(searchTerm)
    }

})

// SONG LIST
function showData(data){
  result.innerHTML = `
    <div class="result-containerr">
      <ul class="songs">
        ${data.data.map((song) => `
          <li>
            <a href="#" class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}"><strong>${song.artist.name}</strong> - ${song.title} </a>
          </li>
          `).join("")}
      </ul>
      </div>
  `
}

result.addEventListener("click", (e) =>{
  const targetElmt = e.target;

  if(targetElmt.tagName === "A"){
    const artist = targetElmt.getAttribute('data-artist');
    const songTitle = targetElmt.getAttribute("data-songtitle");

    // WEC GET THE LYRICS PAGE

    getLyrics(artist, songTitle)
  }
})


async function getLyrics(artist, songTitle){
   const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
   const data = await res.json();

   if(data.error){
     result.innerHTML = data.error
   }else{
     const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

     result.innerHTML = `
        <div class="result-containerr">
          <h2><strong>${artist}</strong> - ${songTitle}</h2>
          <span>${lyrics}</span>
        </div>
     `
   }
}
