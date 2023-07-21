/* <a href="path/to/shopping/cart" aria-label="View 3 items in your shopping cart">
  <i class="fa fa-shopping-cart" aria-hidden="true"></i>
</a>
 AddToCart
https://stackoverflow.com/questions/59424119/how-to-remove-or-avoid-duplicate-values-in-localstorage
*/
function navSlide() {
  $(".hamburger").click(function(){
    $('.navLinks').toggleClass('activeNav');
    $('.hamburger').toggleClass('toggle');
  });
}

  navSlide();

//Slides
let slideIndex = 0;
let slides = document.getElementsByClassName("mySlides");
let dots = document.getElementsByClassName("dot");
showSlides();

function currentSlide(index){
slideIndex = index;
(slideIndex > slides.length) ? index = 1 : index = slides.length;
for( let i = 0; i < slides.length; i++){
  slides[i].style.display = "none";
}
for( let i = 0; i < dots.length; i++){
  dots[i].className = dots[i].className.replace(" active","");
}
slides[index-1].style.display = "block";
dots[index-1].className += " active";
}


function showSlides() {
  var i;
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].className = dots[i].className.replace(" active","");
  }
  slideIndex++;
  if(slideIndex > slides.length){
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides,2000); // change carousel image every 2 seconds
}

$(document).ready(function (){
  // Add To Cart Section
  if(localStorage.getItem('cartNumber') != null) {
    $('#cartCount').html(localStorage.getItem('cartNumber'));
  } else {
    $('#cartCount').html('0');
  }
  // Clothing & Accessories Section
  // const url = ;
  function createindexPgProdCard(obj){
    const prodCards = $("<div>").addClass("prodCards");
    const prodImagesDiv = $("<div>").addClass("prodImagesDiv");
    let indvImageSec = $("<div>").addClass("indvImageSection").prop({id: "image" + obj.id});
    let prodLink = $("<a>").attr("href", "./ProdPrevDetailsPg/2nd_prod_prev_details.html?p=" + obj.id);
    let prodImages = $("<img>").addClass("prodImages").attr("src", obj.preview).attr("alt", obj.name + ' Image');
    prodLink.append(prodImages);
    prodImagesDiv.append(prodLink);
    indvImageSec.append(prodImagesDiv)
    prodCards.append(indvImageSec);

    const imageDesc = $("<div>").addClass("image-desc");
    let h2 = $("<h2>").addClass("image-name").html(obj.name);
    let h4 = $("<h4>").addClass("image-brand").html(obj.brand);
    let h5 = $("<h5>").addClass("image-price").html("Rs "+ obj.price);
    imageDesc.append(h2); 
    imageDesc.append(h4); 
    imageDesc.append(h5); 
    // imageDesc.append(link);
    indvImageSec.append(imageDesc);
    prodCards.append(indvImageSec);

    return prodCards;
  }

  $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product", function(response){
    // console.log(response);
    for(let x = 0; x < response.length; x++) {
      // console.log(x);
      // console.log(response[x]);
      // console.log(response[x].isAccessory);
      if(!response[x].isAccessory){
        $("#clothingGrid").append(createindexPgProdCard(response[x]));
      } else {
        $("#accessoriesGrid").append(createindexPgProdCard(response[x]));
      }
    }
    for(let k = 0; k < response.length; k++) {
      $("#image" + k).click(function () {
        console.log('Clicked');
      });
    }
  });
});