let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");
let priceDetailsContainer = document.getElementById("price-details-container");

let basket = JSON.parse(localStorage.getItem("data")) || [];


let increment = (id) => {
    // console.log(price);
    let selectedItem = id;

    let search = basket.find((x) => x.id === selectedItem.id);

    if (search == undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
            // price: unit_price,               // RECENTLY UPDATED
        });
    }
    else{
        search.item += 1;
    }

    // console.log(basket);
    update(selectedItem.id);
    
    localStorage.setItem("data", JSON.stringify(basket));

    // calculation();
    generatePriceDetails();
};

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search == undefined) return;
    else if (search.item === 1) return;
    else{
        search.item -= 1;
    }

    // console.log(basket);
    update(selectedItem.id);
    
    basket = basket.filter((x) => x.item !== 0);
    localStorage.setItem("data", JSON.stringify(basket));

    // calculation();
    generatePriceDetails();
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;

    calculation();
};

let calculation = () => {
    let cartAmt = document.getElementById("cart-amt");
    cartAmt.innerHTML = basket.map((x) => x.item).reduce((x,y) => x + y, 0);


    // if (check==1){
    //     cartAmt.innerHTML = parseInt(cartAmt.innerHTML) + 1;
    // }
    // else{
    //     cartAmt.innerHTML -= 1;
    // }
};

calculation();


let rmvFromCart = (id) => {
    basket = basket.filter((x) => x.id !== id);
    calculation();
    generateCartItems();
    generatePriceDetails();
    localStorage.setItem("data", JSON.stringify(basket));
};





let generateCartItems = () => {
    shoppingCart.innerHTML = basket.map((x) => {
        let {id, item} = x;
        let search = shopItemsData.find((y) => y.id==id);
        return `
        <div id="cart-item-id-${search.id}" class="cart-items">
            
            <div class="c-item">
                <div class="img-name-stock">
                    <img class="cart-img" src="${search.img}" width="165" height="145">
                    <div class="name-stock-btn">
                        <div class="name-stock">
                            <h3>${search.name}</h3>
                            <p>In Stock</p>
                        </div>
                        <div class="rmv-btn">
                            <button class="rem-btn" onclick="rmvFromCart('${search.id}')">Remove</button>
                        </div>
                    </div>
                </div>
                <div class="price-qnty">
                    <h2>&#8377 ${search.price}/-</h2>
                    <div class="update-qty">
                        <i onclick="decrement(${id})" class="bi bi-dash"></i>
                        <div id=${id} class="qty">
                            ${x.item == undefined ? 0 : x.item}
                        </div>
                        <i onclick=increment(${id}) class="bi bi-plus"></i>
                    </div>
                </div>
            </div>

        </div>
        `
    }).join("")
};

let calculatePrice = (arg) => {
    let sum = 0;
    let totalItems = 0;
    basket.map((x) => {
        let {id,item}=x;
        let search = shopItemsData.find((y) => y.id==id);
        sum = sum + (search.price*item);
        totalItems = totalItems + item;
    })
    if(arg==0) return totalItems;
    return sum;
};

generateCartItems();

let generatePriceDetails = () => {
    priceDetailsContainer.innerHTML = `
    <div id="price-details" class="price-details">
        <div class="price-title"><h2>Price Details</h2></div>
        <div id="field" class="field"> 
            <div class="field">Price&nbsp<b>(${calculatePrice(0)} items)</b></div>
            <div class="value">&#8377 ${calculatePrice(1)} /-</div>
        </div>
        <div id="field" class="field"> 
            <div class="field">Discount</div>
            <div class="value">-</div>
        </div>
        <div id="field" class="field"> 
            <div class="field">Delivery Charges</div>
            <div class="value">FREE</div>
        </div>
        <div id="total-field" class="field"> 
            <div class="field">Total Amount</div>
            <div class="value">&#8377 ${calculatePrice(1)} /-</div>
        </div>
    </div>
    `
};

generatePriceDetails();