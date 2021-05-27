let cart_items=JSON.parse(localStorage.getItem("cart-Array"));
let total_amount,stored_amount_flag=false;
if(localStorage.getItem("totalAmount")!=null){
    total_amount=parseFloat(localStorage.getItem("totalAmount"));
    stored_amount_flag=true;
}
else{
    total_amount=0;
}

cart_items.forEach(item => {
    //console.log(item);
    
    let img_src=item.image_src;
    let price=item.item_price;
    let name=item.item_name;
    let qty=item.item_qnty;

    if(stored_amount_flag==false){
        total_amount+=parseFloat(price.slice(1));
    }
  
    let cart_item=document.createElement("div");
    cart_item.classList.add("cart-item");

    let item_identity=document.createElement("div");
    item_identity.classList.add("item-identity");

    let img_container=document.createElement("div");
    img_container.classList.add("cart-img-con");

    let img=document.createElement("img");
    img.src=img_src;
    img.className="cart-img";

    let item_name=document.createElement("div");
    item_name.classList.add("cart-item-name");
    item_name.innerText=name;

    let cart_item_price=document.createElement("div");
    cart_item_price.classList.add("price");
    let price_text = document.createTextNode(price);
    cart_item_price.appendChild(price_text);

    let quantity_con=document.createElement("div");
    quantity_con.classList.add("quantity-container");

    let quantity=document.createElement("span");
    quantity.classList.add("quantity");
    let quantity_text = document.createTextNode(qty);
    quantity.appendChild(quantity_text);

    let plus_btn=document.createElement("button");
    plus_btn.classList.add("change-qnty");
    plus_btn.id="plus";
    let plus_symbol=document.createTextNode("+");
    plus_btn.appendChild(plus_symbol);

    let minus_btn=document.createElement("button");
    minus_btn.classList.add("change-qnty");
    minus_btn.id="minus";
    let minus_symbol=document.createTextNode("-");
    minus_btn.appendChild(minus_symbol);

    let remove_btn=document.createElement("button");
    remove_btn.classList.add("remove");
    let remove_text = document.createTextNode("REMOVE");
    remove_btn.appendChild(remove_text);

    cart_item.appendChild(item_identity);
    item_identity.appendChild(img_container);
    img_container.appendChild(img);
    item_identity.appendChild(item_name);

    cart_item.appendChild(cart_item_price);

    cart_item.appendChild(quantity_con);
    quantity_con.appendChild(minus_btn);
    quantity_con.appendChild(quantity);
    quantity_con.appendChild(plus_btn);
    quantity_con.appendChild(remove_btn);
    

    //console.log(cart_item);

    const cart_container=document.getElementById("cart-container");
    cart_container.appendChild(cart_item);
})

let cartContainer=document.getElementById("cart-container");

cartContainer.addEventListener("click",(e)=>{

    e.preventDefault();
    let btn=e.target;
    if(btn.className=="remove"){
        
        let item=btn.parentNode.parentNode;
        let name=item.childNodes[0].childNodes[1].innerText;
        
        cartContainer.removeChild(item);
        
        let k;
        for(let i=0;i<cart_items.length;i++){ 
              
            if(cart_items[i].item_name==name){
                k=i;
                break;
            }
        }
        let subtract_amt=parseFloat(cart_items[k].item_price.slice(1))*cart_items[k].item_qnty
        total_amount-=subtract_amt;
        document.getElementById("total-amt").innerText=`$ ${total_amount.toFixed(2)}`;
        localStorage.setItem("totalAmount",total_amount);
        
        cart_items.splice(k,1);
        localStorage.setItem("cart-Array",JSON.stringify(cart_items));    
    }
    else if(btn.id=="plus")
    {
        let qnty=btn.parentNode.childNodes[1];
        qnty.innerText=parseInt(qnty.innerText)+1;


        let name=btn.parentNode.parentNode.childNodes[0].childNodes[1].innerText;
        let k;
        for(let i=0;i<cart_items.length;i++){ 
              
            if(cart_items[i].item_name==name){
                cart_items[i].item_qnty+=1;
                k=i;
                break;
            }
        }

        let add_amt=parseFloat(cart_items[k].item_price.slice(1));
        total_amount+=add_amt;
        document.getElementById("total-amt").innerText=`$ ${total_amount.toFixed(2)}`;
        localStorage.setItem("totalAmount",total_amount);

        localStorage.setItem("cart-Array",JSON.stringify(cart_items)); 
        
    }
    else if(btn.id=="minus")
    {
        let qnty=btn.parentNode.childNodes[1];
        if(parseInt(qnty.innerText)!=1){
            
            qnty.innerText=parseInt(qnty.innerText)-1;


            let name=btn.parentNode.parentNode.childNodes[0].childNodes[1].innerText;
            let k;
            for(let i=0;i<cart_items.length;i++){ 
                
                if(cart_items[i].item_name==name){
                    cart_items[i].item_qnty-=1;
                    k=i;
                    break;
                }
            }
            
            let subtract_amt=parseFloat(cart_items[k].item_price.slice(1));
            total_amount-=subtract_amt;
            document.getElementById("total-amt").innerText=`$ ${total_amount.toFixed(2)}`;
            localStorage.setItem("totalAmount",total_amount);

            localStorage.setItem("cart-Array",JSON.stringify(cart_items)); 
        }
    }

});


document.getElementById("total-amt").innerText=`$ ${total_amount.toFixed(2)}`;
