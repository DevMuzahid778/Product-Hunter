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

    function GetProducts(data){
        console.log(data)
    }