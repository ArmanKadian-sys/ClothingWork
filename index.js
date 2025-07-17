let bagItems;
onLoad();


function onLoad()
{
  bagItems= localStorage.getItem("bagItems") ? JSON.parse(localStorage.getItem("bagItems")) : [];
  displayicon();
  displayHome();
}

function additem(id)
{  
    for(let i=0; i<bagItems.length; i++){
        if(id==bagItems[i])
        {
            alert("You can only add a single quantity per item!");
            return;
        }
    }
    bagItems.push(id);
    localStorage.setItem("bagItems",JSON.stringify(bagItems));
    displayicon();
    
}

function displayicon(){

    document.querySelector(".displayicon").innerHTML=JSON.parse(localStorage.getItem('bagItems'))?JSON.parse(localStorage.getItem('bagItems')).length:0;
    if(!JSON.parse(localStorage.getItem('bagItems')))
    {
         document.querySelector(".displayicon").style.visibility="hidden";
        return;
    }

    document.querySelector(".displayicon").style.visibility=JSON.parse(localStorage.getItem('bagItems')).length?"visible" :"hidden";
}

function displayHome()
{   if(!document.querySelector(".items-container")){
    return;
}
    
    let my_text='';
    items.forEach(item=>
{

my_text+=`
   <div class="item-container">
                
            <div class="image-container">
                <img src="${item.image}" alt="this is an item image" class="item-image">
                <p class="image-text">${item.rating.stars} ★ | ${item.rating.count}</p>
            </div>

            <div class="container-text">
                <div class="company-name">${item.company}</div>
                <div class="product-name">${item.item_name}</div>
            </div>

            <div class="price">
                <span class="final-price">${item.current_price}</span>
                <span class="original-price">${item.original_price}</span>
                <span class="discount">(${item.discount_percentage})%</span>
            </div>

            <div class="button-container">
                <button class="container-button" onclick="additem(${item.id})">ADD TO BAG</button>
            </div>
            
    </div>`
}
);
document.querySelector(".items-container").innerHTML=my_text;

}




   

   


   
