function detectmob() { 
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
       return true;
     }
    else {
       return false;
     }
   }

if (detectmob())
{
    alert('Esse app é projetado somente para plataformas desktop!'); location.replace('about:blank');
}

var Items = [];

function Load()
{
    if (localStorage.getItem('items'))
    {
        var data = localStorage.getItem('items');
        Items = JSON.parse(data);
    }
}

function Save()
{
    localStorage.setItem('items', JSON.stringify(Items));
}

function RegisterItem(Item)
{
    Items.push(Item);
    Save();
}

function RemoveItem(index)
{
    if (confirm('Deseja mesmo apagar o produto ' + Items[index].Name + '?')){
    Items.splice(index, 1);
    Save();
    }
}

function GetItem(name)
{
    for (i in Items)
    {
        var item = Items[i];
        if (item.Name.toLowerCase() == name.toLowerCase())
        {
            return item;
        }
    }
}

function CreateItem(itemName, itemDescription, price, category)
{
    var item = 
    {
        Name: itemName,
        Description: itemDescription,
        Price: price,
        Category: category
    };

    return item;
}

Load();