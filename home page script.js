//using event bubbling

const albums=document.getElementById("albums");
let items;
if(localStorage.getItem("cart-Array")!== null)
{
    items=JSON.parse(localStorage.getItem("cart-Array"));
}
else
{
    items=[];
}
function item_exists(name){
    let flag=false;
    items.forEach(item => {
            
        if(item.item_name===name)
        {
            flag=true;
        }
    });
    if(flag)
        return true;
    else
        return false;
}
albums.addEventListener("click",(event)=>{
    event.preventDefault();
    const album=event.target.parentNode;
    let img_src=album.childNodes[3].src;
    let price=album.childNodes[5].innerText;
    let name=album.childNodes[1].innerText;

    if(item_exists(name)===false){
        let obj={
            image_src:img_src,
            item_price:price,
            item_name:name,
            item_qnty:1
         }
        
        items.push(obj);
        localStorage.setItem("cart-Array",JSON.stringify(items));
    }  
    else
        alert("Item Already exists in the cart!!  You can increase the number of units of this items by going to the cart");     
});
