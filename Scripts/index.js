// loader
var myVar;

function loader() {
    myVar = setTimeout(showPage, 3000);
}
function showPage() {
    document.getElementById("preloader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}

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
<li><a href="index.html"><i class="fa fa-home"></i> Home</a></li>
<li><a href="movies.html"><i class="fa fa-film"></i> Movies</a></li>
<li><a href="seriesAndTvshows.html"><i class="fa fa-tv"></i> Series & TV shows</a></li>
<li><a href="genres.html"><i class="fa fa-list"></i> Genres</a></li>
<li style="display: inline;"><a href="#"><i class="fab fa-telegram"></i></a></li>
<li style="display: inline;"><a href="#"><i class="fab fa-facebook"></i></a></li>
<li style="display: inline;"><a href="#"><i class="fa fa-envelope"></i></a></li>
</ul>
</nav>
</div>
<div class="search-bar-container">
<input class="search-bar search-products" placeholder="Search Movies & Tv Shows" />
</div>`;

// Select the header element
var headerElement = document.querySelector("header");

// Set the inner HTML of the header element to the header contents
headerElement.innerHTML = headerContents;
// Get the footer contents
var footerContents = `
<div class="footer-Father">
<div class="column">
<h3>Latest Movies</h3>
<ul class="latestMovies footer-list" id="latestMoviesList">
</ul>
</div>
<div class="column">
<h3>Trending Movies</h3>
<ul class="trendingMovies footer-list" id="trendingMoviesList">
</ul>
</div>
<div class="column">
<h3>Just Updated Shows</h3>
<ul class="justUpdatedShows footer-list" id="justUpdatedShowsList">
</ul>
</div>
<div class="column">
<h3>Popular Shows</h3>
<ul class="popularShows footer-list" id="popularShowsList">
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

// Search and Movies

// Initial products rendering
// Variables
const productsPerPage = 20; // Number of products to display per page
let currentPage = 1; // Current page number
let startIndex = 0; // Start index of products to display

// Function to render products based on current page and products per page
function renderProducts() {
    const endIndex = startIndex + productsPerPage;
    const visibleProducts = products.slice(startIndex,
        endIndex);

    let productsHTML = '';

    visibleProducts.forEach((product) => {
        productsHTML += `
        <div class="product-container">
        <div class="product-image-container">
        <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
        ${product.name}
        </div>

        <div class="product-rating-count link-primary">
        ${product.genre}
        </div>
        <br>

        <div class="product-spacer"></div>

        <a href="movies-page/${product.movieLink}">
        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-name="${product.name}">
        Download
        </button>
        </a>
        </div>
        `;
    });

    const productsGrid = document.querySelector('.js-products-grid');
    if (startIndex === 0) {
        // If it's the first page, replace the existing HTML
        productsGrid.innerHTML = productsHTML;
    } else {
        // If it's a subsequent page, append the new products
        productsGrid.innerHTML += productsHTML;
    }

    // Hide the "Load More" button if there are no more products
    const loadMoreButton = document.querySelector('.load-more-button');
    if (endIndex >= products.length) {
        if (loadMoreButton) {
            loadMoreButton.style.display = 'none';
        }
    } else {
        if (loadMoreButton) {
            loadMoreButton.style.display = 'block';
        } else {
            // Create and append the "Load More" button
            const loadMoreButton = document.createElement('button');
            loadMoreButton.textContent = 'Load More';
            loadMoreButton.classList.add('load-more-button', 'button-primary');
            loadMoreButton.addEventListener('click', loadMore);
            productsGrid.parentNode.appendChild(loadMoreButton);
        }
    }
}

// Initial products rendering
renderProducts();

// Function to handle "Load More" button click
function loadMore() {
    currentPage++;
    startIndex = (currentPage - 1) * productsPerPage;
    renderProducts();
}

// Search functionality
document.querySelector('.search-products').addEventListener('input', searchProducts);

function searchProducts() {
    const searchValue = document.querySelector('.search-products').value.toLowerCase();
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchValue)
    );

    let filteredProductsHTML = '';

    filteredProducts.forEach((product) => {
        filteredProductsHTML += `
        <div class="product-container">
        <div class="product-image-container">
        <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
        ${product.name}
        </div>
        <div class="product-rating-count link-primary">
        ${product.genre}
        </div>
        <br>

        <div class="product-spacer"></div>

        <a href="movies-page/${product.movieLink}"><button class="add-to-cart-button button-primary js-add-to-cart" data-product-name="${product.name}">
        Download
        </button></a>
        </div>
        `;
    });

    document.querySelector('.js-products-grid').innerHTML = filteredProductsHTML;
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