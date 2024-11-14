var cart = document.getElementsByClassName('cart-items')[0];
var cartNum = 0;

var USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

var cartTotalPrice = document.getElementsByClassName('cart-total-price')[0];
function CreateCartItem(name, price, imgsrc){
    //cart row
    let cartRow = document.createElement('div');
    cartRow.className = `cart-row`;
    cartRow.value = cartNum;
    //cart item (container)
    let cartItem = document.createElement('div');
    cartItem.className = 'cart-item cart-column';
        //cart item children
        let cartItemImg = document.createElement('img');
        cartItemImg.className = 'cart-item-image';
        cartItemImg.width = '100';
        cartItemImg.height = '100';
        cartItemImg.src = imgsrc;
        let cartItemTitle = document.createElement('span');
        cartItemTitle.className = 'cart-item-title';
        cartItemTitle.innerHTML = name;
    //adding to cartItem
    cartItem.appendChild(cartItemImg);
    cartItem.appendChild(cartItemTitle);
    //cart price4
    let cartPrice = document.createElement('span');
    cartPrice.className = 'cart-price cart-column';
    cartPrice.innerHTML = '$'+ price;
    //cart quantity (container)
    let cartQuantity = document.createElement('div');
    cartQuantity.className = 'cart-quantity cart-column';
        //cart quantity children
        let cartQuantityInput = document.createElement('input');
        cartQuantityInput.className = 'cart-quantity-input';
        cartQuantityInput.type = 'number';
        cartQuantityInput.value = '1';
        cartQuantityInput.price = price;
        cartQuantityInput.onchange = function(){UpdateTotalPrice(this, cartNum)}
        let cartQuantityButton = document.createElement('button');
        cartQuantityButton.className = 'btn btn-danger';
        cartQuantityButton.type = 'button';
        cartQuantityButton.innerHTML = "REMOVE";
        cartQuantityButton.onclick = function(){DeleteCartItem(cartNum);}
    //adding to cartQuantity
    cartQuantity.appendChild(cartQuantityInput);
    cartQuantity.appendChild(cartQuantityButton);
    //adding to cartRow
    cartRow.appendChild(cartItem);
    cartRow.appendChild(cartPrice);
    cartRow.appendChild(cartQuantity);
    //adding to cart
    cart.appendChild(cartRow);
    UpdateTotalPrice();
}
function DeleteCartItem(num){
    let cartRows = document.body.getElementsByClassName('cart-row');
    for(let cartRow of cartRows){
        if(cartRow.value == num){
            cart.removeChild(cartRow);
            break;
        }
        
    }
    
    UpdateTotalPrice();
}
function UpdateTotalPrice(thi, cartNum){
    if (thi != undefined){
        if (thi.value <= 0){
            DeleteCartItem(cartNum);
            return
        }
    }
    let cartInputs = document.body.getElementsByClassName('cart-quantity-input');
    let total = 0;
    for(let i = 0; i < cartInputs.length; i++){
        total += cartInputs[i].value * cartInputs[i].price;
        
    }
    
    cartTotalPrice.innerHTML = USDollar.format(total);
}
function ClearCart(){
    cart.innerHTML = '';
    UpdateTotalPrice();
}