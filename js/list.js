var itemList = [];
var index = 0;
var totalPrice = 0;

function toFixedIfNecessary( value, dp ){
    return +parseFloat(value).toFixed( dp );
} // From stackoverflow - https://stackoverflow.com/questions/32229667/have-max-2-decimal-places

function update()
{
    var list = document.querySelector('#list');
    list.scrollTop = list.scrollHeight;

    totalPrice = toFixedIfNecessary(totalPrice, 2);
    $('#total').text(totalPrice);
}

function _removeItem(itemIndex)
{
    $(`#item${itemIndex}`).remove();
    totalPrice -= parseFloat(itemList[itemIndex].Price); update();
    delete(itemList[itemIndex]);
    index--;
}

$('#add').click(() => {
    var item = GetItem($('#item-name').val());
    if (!item)
    {
        alert('Produto não encontrado!');return;
    }

    var html = `<div id="item${index}" class="product-list">${item.Name}<div class="float-right">&nbsp;R$ ${item.Price}&nbsp;<span onclick="_removeItem(${index});">X</span></div></div>`;
    $('#list').html(
        $('#list').html() + html
    );

    itemList.push(item);
    totalPrice += parseFloat(item.Price); update();
    index++;

    $('#item-name').val('');
    $('#item-name').focus();
});

$('#item-name').keydown((key) => {
    if (key == 13 || key.keyCode == 13 || key.key == 'Enter')
    $('#add').click();
});

//Finish
var recivedMoney;
var change;

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
  

function CreateNF()
{
    var size = {w: 450, h: 550};
    var nf = window.open('about:blank', 'Nota fiscal', `left=${screen.width / 2 - size.w /2},top=${screen.height / 2 - size.h / 2},width=${size.w},height=${size.h}`);
    if (!nf)
    {
        alert('Parece que seu navegador está bloqueando pop-ups.\nDesative isso para gerar a nota fiscal.'); return;
    }
    var today = new Date();
    nf.document.write('<title>Nota Fiscal</title>');
    nf.document.write('<a id="print" href="#">Imprimir</a> | <a id="download" href="#">Salvar</a>');
    nf.document.write('<h2>Nota fiscal&nbsp;<span style="font-size: 8px;">(Não oficial)</span></h2><h3>' + today.toLocaleDateString() + ' - ' + today.toLocaleTimeString() + '</h3>');
    for (i in itemList)
    {
        var item = itemList[i];
        nf.document.write(item.Name + ' - R$ ' + item.Price + '<br>');
    }
    nf.document.write(`<h3>Total: R$ ${totalPrice}</h3><h4>Valor pago: R$ ${recivedMoney}<br>Troco: R$ ${change}</h4>`);
    nf.document.querySelector('#print').addEventListener('click', () => {
        nf.print();
    });

    nf.document.querySelector('#download').addEventListener('click', () => {
        var dfname = ('nf-' + (today.toLocaleDateString().replace('/', '_') + '-' + today.toLocaleTimeString().replace(':', '_')));
        download(dfname + '.html', nf.document.documentElement.outerHTML);
    });
}

function Submit()
{
    recivedMoney = $('#recived').val();
    if (itemList.length < 1)
    {
        alert('A lista está vazia!');
        return false;
    }
    if (!recivedMoney || recivedMoney == 0)
    {
        alert('Preencha o campo "Valor recebido"!');
        $('#recived').focus();
        return false;
    }
    change = toFixedIfNecessary(recivedMoney - totalPrice, 2);
    if (change < 0)
    {
        alert('Dinheiro insuficiente para finalizar a compra!'); return false;
    }
    $('#change').text(change);

    return true;
}

$('#finish').click(() => {
    if (Submit())
    CreateNF();
});