async function GetItems(){
    let data = await fetch("http://localhost:3000", {method:"GET"})
    let result = await data.json();
    let painel = document.getElementsByClassName("itens")[0];
    for(let index in result){
        const item = document.createElement("li");
        item.className = "item";
        painel.appendChild(item);
        const nome = document.createElement("p");
        nome.className = "name-item";
        nome.textContent = result[index].Name;
        item.appendChild(nome);
        const img = document.createElement("img");
        img.src = result[index].URL;
        img.alt = result[index].Name;
        img.width = "150";
        img.height = "150";
        img.className = "img-item";
        item.appendChild(img);
        const preço = document.createElement("p");
        preço.textContent = "R$ ".concat(parseInt(result[index].Price));
        preço.className = "price-item";
        item.appendChild(preço);
        
        const comprar_button = document.createElement("button");
        comprar_button.className = "buy-button";
        const txt = document.createTextNode("Comprar");        
        comprar_button.appendChild(txt);
        item.appendChild(comprar_button);
    }
}
GetItems()
