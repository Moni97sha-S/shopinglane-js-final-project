if (localStorage.getItem("cartNumber") != null) {
    $("#cartCount").html(localStorage.getItem("cartNumber"));
  } else {
    $("#cartCount").html("0");
  }

$(document).ready(function () {

    // https://test-hosting-8f9bf.web.app/product/details.html?p=3
    const productId = window.location.search.split('=')[1];
    // console.log(productId);

    function createProdImages(url, id) {
        var mainImage = $("<img>").attr('src', url);

        if(id === 0){
            mainImage.addClass('active-image');
        }

        mainImage.click(function(){
            // console.log('Clicked');
            $("#prod-images img").removeClass("active-image");
            mainImage.addClass('active-image');
            $('#prevImg').attr('src', url);
        });
        return mainImage;
    }

    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product/" + productId, 
    function(data, status){
        // console.log(data);
        // console.log(status);

        $('#prevImg').attr("src", data.preview);
        $('#prod-title').html(data.name);
        $('#prod-brand').html(data.brand);
        $('#prod-description').html(data.description);
        $('#prod-price').html(data.price);

        for(let i = 0;  i < data.photos.length; i++) {
            $('#prod-images').append(createProdImages(data.photos[i], i));
        }

        //AddToCartBtn
        $('#addToCartBtn').click(function () {
            // console.log('Clicked');
            //** Animation **//
            $('#addToCartBtn').addClass('bigger');
            setTimeout(function () {
                $('#addToCartBtn').removeClass('bigger');
            }, 200);
            
            //** Saving Number of times we adding an item into cart in 'n' variable **//
            let n = window.localStorage.getItem('cartNumber');
            if( n === null){
                n = 0;
            }
            n++;
            console.log(n);
            
            // Changing Cart Number 
            // location.reload();
            if(n != null){
                $('#cartCount').html(n);
                // localStorage.getItem('cartNumber')
            }else{                
                $('#cartCount').html('0');
            }

            // console.log(cartItems.length);

            localStorage.setItem('cartNumber', n);
            console.log('cartNumber', n);
            
            //! Adding/Pushing every Item into (an Empty array) Cart
            let productList = [];
            let arr=JSON.parse(localStorage.getItem("cartItems") || "[]");
            console.log("line 78 ==> ", arr);
            if(arr != null){
                let duplicate = arr.some((item) => {
                    if(item.name == data.name){
                        item.counter++;
                        console.log("Duplicate Found");
                        return true;
                    }
                });
            
                if(!duplicate){
                    data["counter"] = 1;
                    console.log("line no 90 ==>", data);
                    arr.push(data);
                    localStorage.setItem("cartItems", JSON.stringify(arr));
                } else {
                    console.log("line no 94 ==>", arr);
                    localStorage.setItem("cartItems", JSON.stringify(arr));
                }
            } else {
                let productList = [];
                data["counter"] = 1;
                console.log("line no 100 ==>", data);
                productList.push(data);
                localStorage.setItem("cartItems", JSON.stringify(productList));
            }
            
            //** Getting Selected cart Items are saved in 'cartItems' variable **//
            /* let cartItems = window.localStorage.getItem('cartItems');
            if(cartItems != null){
                productList.push(...JSON.parse(cartItems));
                productList.push(data);
                localStorage.setItem('cartItems', JSON.stringify(productList));
                // let result = localStorage.getItem('cartItems');
                console.log('cartItems:', JSON.parse(cartItems));
            } else {
                productList.push(data);
                localStorage.setItem('cartItems', JSON.stringify(productList));
                // let result = localStorage.getItem('cartItems');
                console.log('cartItems:', JSON.parse(cartItems));
            }
            console.log(productList);
            //console.log(localStorage.getItem('cartNumber'));     */
        });
    });
});