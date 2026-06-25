async function GetItems(){
    let data = await fetch("http://localhost:3000", {method:"GET"})
    let result = await data.json();
    let admin = document.getElementsByClassName("itens-admin")[0];
    admin.replaceChildren(admin.firstElementChild);
    for(let index in result){
        const item = document.createElement("li");
        item.className = "item";
        admin.appendChild(item);
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
        
        const deletar_button = document.createElement("button");
        deletar_button.className = "delete-button";
        const txt = document.createTextNode("Excluir");        
        deletar_button.appendChild(txt);
        deletar_button.onclick = async (e) => {
            const response = await fetch("http://localhost:3000/" + result[index].Name, { method: "DELETE" } )
            GetItems();
        }
        item.appendChild(deletar_button);
    }
}

const form = document.querySelector("#form-new-item");
async function CreateItem(){
    const data = new FormData(form);

    try {
        const response = await fetch("http://localhost:3000", {
            method: "POST",
            body: JSON.stringify({
                name: data.get("pname"),
                description: data.get("pdesc"),
                URL: data.get("link"),
                price: data.get("pprice"),
            }), headers: {"Content-Type": 'application/json'},
        });
        GetItems();
        form.reset();
    } catch (e) {
        console.error(e);
    }
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  CreateItem();
});



GetItems()
