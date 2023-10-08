let shop = document.getElementById("shop");


let generateShop =()=>{
    return (shop.innerHTML = shopItemsData.map((x)=>{
        let {id, name, price, desc, img} = x;
        // console.log(basket);
        let search = basket.find((y) => y.id === id) || [];
        return `
        <div id=product-id-${id} class="item">
            <img width="219" height="197" src="${img}">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-qty">
                    <div class="price">
                        <h2>&#8377 ${price}</h2>
                    </div>
                    <div class="add-to-cart" id="${id}">
                        <!-- <i onclick="decrement(${id})" class="bi bi-dash"></i>
                        <div id=${id} class="qty">
                        ${search.item == undefined ? 0 : search.item}
                        </div>
                        <i onclick=increment(${id}) class="bi bi-plus"></i> -->
                        <button class="cart-btn" onclick="increment(${id})">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
        `
    }).join(""));
};

let basket = JSON.parse(localStorage.getItem("data")) || [];

let goToCartbtn = (cartbtnId) =>{
    // console.log(cartbtn);
    let cartBTN = document.getElementById(cartbtnId);
    cartBTN.innerHTML = `
    <a href="cart.html" class="go-to-cart">Go to Cart</a>
    `;
}

let checkBasket = () => {
    basket.map((x) => {
        goToCartbtn(x.id);
    })
}

generateShop();
checkBasket();

let increment = (id) => {
    console.log("card:",id);
    let selectedItem = id;

    let search = basket.find((x) => x.id === selectedItem.id);

    if (search == undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
        // selectedItem.innerHTML = `
        // <!-- <button onclick="remove('${selectedItem.id}')">Remove from cart</button> -->`
        goToCartbtn(selectedItem.id);
        
    }
    else{
        return;
    }
    
    localStorage.setItem("data", JSON.stringify(basket));
    calculation();

};



// Shows on Cart-logo
let calculation = () => {
    let cartAmt = document.getElementById("cart-amt");
    cartAmt.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y, 0);

};

calculation();
