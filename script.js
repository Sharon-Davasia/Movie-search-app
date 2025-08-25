const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const movieList = document.getElementById("movieList");

const API_KEY = "4a309ade"; 
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=`;

// Fetch movies
async function fetchMovies(query) {
  try {
    const res = await fetch(API_URL + query);
    const data = await res.json();

    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      movieList.innerHTML = `<p>No movies found for "${query}"</p>`;
    }
  } catch (err) {
    console.error("Error fetching movies:", err);
    movieList.innerHTML = `<p>Error fetching data. Try again later.</p>`;
  }
}

// Display movies
function displayMovies(movies) {
  movieList.innerHTML = ""; // Clear old results

  movies.forEach(movie => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x400?text=No+Image"}" alt="${movie.Title}">
      <div class="movie-info">
        <h3>${movie.Title}</h3>
        <p>Year: ${movie.Year}</p>
        <p>Type: ${movie.Type}</p>
      </div>
    `;

    movieList.appendChild(movieCard);
  });
}

// Search button click
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) fetchMovies(query);
});

// Press Enter to search
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) fetchMovies(query);
  }
});
