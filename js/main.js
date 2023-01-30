const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");

form.addEventListener("submit", (evento) => {
    evento.preventDefault(); //preventDefault trava o padrão de enviar os dados para a url

    //1 forma de capturar o valor digitado
    //console.log(evento.target[0].value);
    //console.log(evento.target[1].value);

    //2 forma de capturar o valor digitado
    //console.log(evento.target.elements["nome"].value);
    //console.log(evento.target.elements["quantidade"].value);

    criaElemento(evento.target.elements["nome"].value, evento.target.elements["quantidade"].value);

});

function criaElemento (nome, quantidade) {
    //console.log(nome, quantidade);

    //<li class="item"><strong>7</strong>Camisas</li>
    const novoItem = document.createElement('li');//Criando um novo elemento li igual ao do html
    novoItem.classList.add('item');//adicionando um classe ao elemento

    const numeroItem = document.createElement('strong');//Criando um novo elemento strong igual ao do html
    numeroItem.innerHTML = quantidade;//adicionando o valor quantidade recebido na função ao elemento

    novoItem.appendChild(numeroItem);//manipulando o numero item como objeto através do appendChild e adicionando um elemento dentro de outro elemento
    novoItem.innerHTML += nome;//adicionando o valor nome recebido na função ao elemento

    lista.appendChild(novoItem);//manipulando o numero item como objeto através do appendChild e adicionando o elemento novoItem dentro do elemento lista

}