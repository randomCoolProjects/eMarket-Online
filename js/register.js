$('.submit').click(() => {
    var item = $('#item').val();
    var description = $('#description').val();
    var price = $('#price').val();
    var category = $('#category').val();

    if (!item || !price)
    {
        alert('Pelo menos o nome e o preço do produto devem ser preenchidos!');return;
    }

    var product = CreateItem(item, description, price, category);
    RegisterItem(product);

    location.reload();
});

$('.directview').click(() => {
    var name = prompt('Item a procurar');
    if (!name)return;
    var it = GetItem(name);
    if (!it)
    {
        alert('Item não encontrado');return;
    }
    aboutItem(-1, it);
});

$('.clear').click(() => {
    if (confirm('Deseja mesmo apagar todos os produtos? Isso é impossível de recuperar!'))
    {
        localStorage.clear();
        location.reload();
    }
});

var __not = false;

for (i in Items)
{
    var item = Items[i];
    console.log(item);
    $('.right').html($('.right').html() + `<div class="item" id="it${i}" onclick="aboutItem(${i});">${item.Name}<button class="del" onclick="__not = true;RemoveItem(${i});location.reload();">X</button></div>`);
}

function aboutItem(index, dItem)
{
    if (__not && !dItem)return;
    var item = Items[index];
    if (dItem)
    item = dItem;
    alert(
`Produto: ${item.Name}
Descrição: ${item.Description}
Preço: R$ ${item.Price}
Categoria: ${item.Category}`
    );
}