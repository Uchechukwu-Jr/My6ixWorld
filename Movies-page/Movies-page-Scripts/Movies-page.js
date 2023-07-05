// Get the header contents
var headerContents = `
<div class="header">
<div class="menu-button" onclick="toggleMenu()">
<i class="fa fa-bars"></i>
</div>
<div class="logo-container">
<span class="logo-1" style="font-family: 'EB Garamond', serif;">My6ix</span><span class="logo-2" style="font-family: 'Chokokutai', cursive; color: #4FCE5D;">WORLD</span>
</div>
</div>

<div id="menu" class="menu">
<div class="close-button" onclick="toggleMenu()">
<i class="fa fa-times"></i>
</div>
<nav>
<ul>
<li><a href="../index.html"><i class="fa fa-home"></i> Home</a></li>
<li><a href="../movies.html"><i class="fa fa-film"></i> Movies</a></li>
<li><a href="../seriesAndTvshows.html"><i class="fa fa-tv"></i> Series & TV shows</a></li>
<li><a href="../genres.html"><i class="fa fa-list"></i> Genres</a></li>
<li style="display: inline;"><a href="#"><i class="fab fa-telegram"></i></a></li>
<li style="display: inline;"><a href="#"><i class="fab fa-facebook"></i></a></li>
<li style="display: inline;"><a href="#"><i class="fa fa-envelope"></i></a></li>
</ul>
</nav>
</div>
`;


// Find the main div element
const mainDiv = document.getElementById("mainDiv");

// Check if the main div exists
if (mainDiv) {
  // Get the ID of the div inside mainDiv
  const divId = mainDiv.firstElementChild.id;

  // Search for the corresponding product in the array based on the ID
  const product = products.find((p) => p.id === divId);

  if (product) {
    // Set the page title
    document.title = product.name;

    // Generate the HTML for the product
    const productHTML = `
      <div class="movie">
        <div class="movie-banner">
          <img src="../${product.image}" alt="${product.name}" class="product-image"/>
        </div>
        <p class="movie-genre">${product.genre}</p>
        <h2 class="movie-name">${product.name}</h2>
        <p class="movie-details">${product.details}</p>
        <div class="trailer">
          <h2 class="trailer-h2">Trailer</h2>
          <iframe src="${product.trailer}"></iframe>
        </div>
        <a href="${product.downloadLink}"><button class="download-button"><i class="fa fa-download"></i>Download</button></a>
      </div>
    `;

    // Append the generated HTML to the main div
    mainDiv.innerHTML = productHTML;
  } else {
    console.log(`Product with ID ${divId} not found.`);
  }
} else {
  console.log("Main div not found.");
}




// Select the header element
var headerElement = document.querySelector("header");

// Set the inner HTML of the header element to the header contents
headerElement.innerHTML = headerContents;
// Get the footer contents
var footerContents = `
<div class="footer-Father">
<div class="column">
<h3>Latest Movies</h3>
<ul class="latestMovies" id="latestMoviesList">
</ul>
</div>
<div class="column">
<h3>Trending Movies</h3>
<ul class="trendingMovies" id="trendingMoviesList">
</ul>
</div>
<div class="column">
<h3>Just Updated Shows</h3>
<ul class="justUpdatedShows" id="justUpdatedShowsList">
</ul>
</div>
<div class="column">
<h3>Popular Shows</h3>
<ul class="popularShows" id="popularShowsList">
</ul>
</div>
</div>
<div class="footer-bottom">
<p>
copyright &copy; <a href="index.html">My6ixWorld</a>
</p>
</div>
`;
// Select the header element
var footerElement = document.querySelector("footer");

// Set the inner HTML of the header element to the header contents
footerElement.innerHTML = footerContents;

var menu = document.getElementById('menu');
var menuButton = document.getElementsByClassName('menu-button')[0];

document.addEventListener('click', function(event) {
    var isClickInsideMenu = menu.contains(event.target);
    var isClickOnMenuButton = menuButton.contains(event.target);

    if (!isClickInsideMenu && !isClickOnMenuButton && menu.classList.contains('open')) {
        toggleMenu();
    }
});

function toggleMenu() {
    menu.classList.toggle('open');
};


function populateMovieList(movies, listId) {
    const list = document.getElementById(listId);

    movies.forEach(movie => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = movie.downloadLink;
        link.textContent = movie.name;
        listItem.appendChild(link);
        list.appendChild(listItem);
    });
}

// Call the function for each list
populateMovieList(latestMovies, "latestMoviesList");
populateMovieList(trendingMovies, "trendingMoviesList");
populateMovieList(justUpdatedShows, "justUpdatedShowsList");
populateMovieList(popularShows, "popularShowsList");