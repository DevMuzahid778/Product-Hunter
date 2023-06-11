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
        // console.log(Items)
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
                    <button onclick="GetDetails('${Item.slug}')" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">See Details</button>
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
                        <button onclick="GetDetails('${Item.slug}')" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">See Details</button>
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

    function GetDetails(Id){
        URl = `https://openapi.programming-hero.com/api/phone/${Id}`
        fetch(URl)
        .then(res => res.json())
        .then(data => DisplayDetails(data.data))
    }
    
    const ModalDialog = document.getElementById("ModalDialog");
    function DisplayDetails(Details){
        // console.log(Details)
        // to clear before displayed modal
        ModalDialog.innerHTML =""

        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content")
        modalContent.innerHTML=`
            <div class="modal-header">
                <h1>${Details.name}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <p><h4>Release Date:</h4>${Details.releaseDate}</p>
                <p><h5>Storage:</h5>${Details.mainFeatures.storage}</p>
                <p><h5>Others:</h5>${Details.mainFeatures.sensors[0]}</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        `
        ModalDialog.appendChild(modalContent);
    }