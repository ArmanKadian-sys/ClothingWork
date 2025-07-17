
let bags;
onbagload();

function onbagload()
{  loadbag();
   displayicon();

}



function loadbag(){
    console.log();
    if(!localStorage.getItem("bagItems") || '[]'==localStorage.getItem("bagItems"))
    {

        document.querySelector(".bags").innerHTML="<h1 class='bag_heading'>You have not added any item in the bag</h1>"
        return;

    }

    fillbag();
    displayBag();
    displaying_price();


}




function fillbag(){
    let myItems=JSON.parse(localStorage.getItem("bagItems"));
    console.log(myItems);

    let newArr=myItems.map((number)=>{
        for(let i=0; i<items.length; i++){
            if(number==items[i].id){
               return items[i];
            }

        }
    })

    console.log(newArr);

    bags=newArr;
   
    

}



function displayBag(){


    let bagText='';

    bags.forEach(object => {
        bagText+= ` 
          <div class="bag-items">
                <div class="bag_image">
                    <img src="${object.image}" alt="bag item image">
                </div>
                <div class="bag_text">
                    <div class="bag_company_name">${object.company}</div>
                    <div class="bag_product_name">${object.item_name}</div>
                    <div class="bag_price">
                        <div class="bag_original_price">Rs ${object.current_price}</div>
                        <div class="bag_final_price">Rs ${object.original_price}</div>
                        <div class="bag_discount">${object.discount_percentage}% OFF</div>
                    </div>
                </div>
                
                <button class="close-button" onclick="removing(${object.id})">X</button>
                
            </div>
            </div>
            `

        
    });


   document.querySelector(".bag-container").innerHTML=bagText;
}




function removing(number)
{
  let remove_item=JSON.parse(localStorage.getItem("bagItems"));

console.log(number);

   let new_remove_item=remove_item.filter(
   (object)=>{

    if(object==number)
    {
        return false;
    }

    return true;

    })

    localStorage.setItem("bagItems",JSON.stringify(new_remove_item));


     displayicon();
     fillbag();
     displayBag();
     displaying_price();
     if(!localStorage.getItem("bagItems") || '[]'==localStorage.getItem("bagItems")){

        document.querySelector(".bags").innerHTML="<h1>You have not added any item in the bag</h1>"
        return;

    }




}




function displaying_price(){
    let total_original_price=0;
    let total_discount_price=0;
    let total_price=0;
    let price_text='';

    bags.forEach((object)=>{
      total_original_price+=object.original_price;
      total_discount_price+=object.original_price-object.current_price;
    })

    total_price= total_original_price-total_discount_price+99;
    price_text=`
    <div class="bag_border">
    <div class="bag_total_price">Total MRP <span class="left_align">${total_original_price} </span></div>
    <div class="bag_discount_price">Discount on MRP <span class="left_align">${total_discount_price}</span></div>
    <div class="cov">Convinence fee <span class="left_align">Rs 99 </span></div>
    <hr>
    <div class="bag_finally_price">Total Amount <span class="left_align">${total_price}</span></div>
    <button class="pay_button">Pay</button>
    </div>
    `
    document.querySelector(".price_to_pay").innerHTML=price_text;

}