function LoadData(Item){
    url =`https://openapi.programming-hero.com/api/phones?search=${Item}`
    fetch(url)
    .then(res => res.json())
    .then(data => GetProducts(data.data))
}
// when click the button- search value will set as LoadData parameter value for search item
const Search = document.getElementById("Search")
document.getElementById("SearchButton").addEventListener("click", function(){
    
    if(Search.value != ""){
        LoadData(Search.value);
        
        Search.value = ""
    }
    else{
        alert("please write the name of product in search field")
        Search.value =""
        
    }
})

// Now search the Product and display in HTML Page 
    const ProductBody = document.getElementById("ProductBody")
    const SeeMoreBtn = document.getElementById("SeeMoreBtn")
    function GetProducts(Items){
        console.log(Items)
        if(Items.length > 7){
            SeeMoreBtn.classList.remove("d-none");
            Items.slice(0,7).forEach(Item => {
                const ItemDIv = document.createElement("div");
                ItemDIv.classList.add("col")
                ItemDIv.innerHTML = `
                <div class="card p-4">
                    <img src="${Item.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${Item.phone_name}</h5>
                    </div>
                </div>
                `

                ProductBody.appendChild(ItemDIv)
            });

            SeeMoreBtn.addEventListener("click", function(){
                Items.forEach(Item => {
                    // console.log(Item)
                    const ItemDIv = document.createElement("div");
                    ItemDIv.classList.add("col")
                    ItemDIv.innerHTML = `
                    <div class="card p-4">
                        <img src="${Item.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${Item.phone_name}</h5>
                        </div>
                    </div>
                    `

                    ProductBody.appendChild(ItemDIv)

                    // to hide the see more button
                    SeeMoreBtn.classList.add("d-none")
                });
            })

        }
        else{
            SeeMoreBtn.classList.add("d-none")
        }
    }