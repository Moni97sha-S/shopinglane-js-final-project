$(document).ready(function () {
    let n = window.localStorage.getItem('cartNumber');
    let cartItems = window.localStorage.getItem('cartItems');
    // console.log(cartItems)
    console.log(n)
    if (cartItems != null) {
        let arr = JSON.parse(cartItems);
        console.log(`checkout-data: ${arr}`);
        console.log(arr);
        if(n != null){
            $("#cartCount").html(n);
        } else {
            $("#cartCount").html("0");
        }
        
        for(let j = 0; j < arr.length; j++){
            console.log(n);
            $("#countItems").html(n);
            let prodCheckoutContainer = $("<div>").addClass("prodCheckoutContainer")
            let  imageLeftBlock = $("<div>").addClass("imageLeftBlock");
            let  leftProdImg = $("<img>").attr("src", arr[j].preview);
            let  rightDetails = $("<div>").addClass("rightDetails");
            let  rightHeading = $("<h4>").addClass("rightHead").html(arr[j].name);
            let  rightProdCount = $("<p>")
            .addClass("rightProdCount")
            .html("x" + arr[j].counter);
            let  rightProdPrice = $("<p>")
            .addClass("rightProdPrice")
            .html("Amount: Rs " + arr[j].price * arr[j].counter);
            // let icon = $("i").attr("onclick", "removeItemFromCart(arr[j].id)");
            $("#cartList").append(prodCheckoutContainer);
            prodCheckoutContainer.append(imageLeftBlock);
            prodCheckoutContainer.append(rightDetails);
            imageLeftBlock.append(leftProdImg);
            rightDetails.append(rightHeading);
            rightDetails.append(rightProdCount);
            rightDetails.append(rightProdPrice);

            // Redirect to Order Confirmation Page
            console.log(typeof arr);
            console.log(arr);
            console.log(typeof arr[j].counter)
            console.log(arr[j].counter)
            let total_Amt = 0;
            for(cost of arr){
                // console.log(cost);
                total_Amt += (cost.counter * cost.price);
            }
            console.log(total_Amt);
            $("#totalAmount").html(total_Amt);

            $('.placeOrder').on("click",function() {
                let orderItemsArr = [];
                for(let i = 0; i < arr.length; i++) {
                    console.log(typeof arr[i].id);
                    
                    let prodObj = {
                        "id": arr[i].id,
                        "name": arr[i].name,
                        "quantity":arr[i].counter,
                        "brand": arr[i].brand,
                        "price": arr[i].price,
                        "preview": arr[i].preview,
                        "isAccessory": arr[i].isAccessory
                    }
                    // console.log(prodObj);
                    let prodObjCopy = prodObj;
                    orderItemsArr.push(prodObjCopy);
                }
                
                console.log(orderItemsArr);
                console.log(total_Amt);

                let dataObj = {
                    amount: total_Amt,
                    products: orderItemsArr
                }
                $.post("https://jsonplaceholder.typicode.com/todos", dataObj, function() {
                    alert("Order Placed Successfully!");
                    localStorage.setItem('orderItemsArr', JSON.stringify(orderItemsArr));
                    localStorage.setItem('dataObj', JSON.stringify(dataObj));
                    location.assign('../OrderConfirmationPg/orderPlaced.html')
                })

            });
        }
        
        let prodCheckoutContainer = document.querySelector(".prodCheckoutContainer");
       
            for(let i = 0; i < arr.length;i++){
            arr.forEach((item) => {
                    prodCheckoutContainer[i].innerHTML += `<i class="fa fa-trash" aria-hidden="true" onclick = "removeItemFromCart(${item.id})"></i>`;
                });
            }
        
        console.log(prodCheckoutContainer);
        // Remove item from cart
        function removeItemFromCart(id){
            // console.log(cartItems);
            // console.log(arr);
            console.log("Clicked", id);
            cart = arr.filter((item) => item.id !== id);
            updateCart();
        }

        // Update count onclick of trash icon
        function updateCart(){

        }
    }else{
        console.log("No data available");
        cartItems = [];
    }
}); 
    // window.onload = function() {
        //     $('.placeOrder').on("click",function() {
        //         $.ajax({
        //             type: 'GET',
        //             url:"https://5d76bf96515d1a0014085cf9.mockapi.io/order",
        //             success:function(data){
        //                 console.log("Clicked");
        //                 // console.log(data);
        //             },
        //             cache: false
        //         });
        //     });
        // }
        //Try to use this API instead. 
        /* $("#plceordrBtn").click(function (e){ 
            var itemInmyCart={ 
                let product: productItems, 
                var totalAmount: totalcost 
            } 
            $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/order", function(){
                $.post("https://jsonplaceholder.typicode.com/todos", function() { 
                    alert('Your order is Successfully Placed');
                     localStorage.setItem('product-list', []); 
                    location.assign("order_confirm.html"); 
                }) 
            })
        }) */
            
