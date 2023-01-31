const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = [];

form.addEventListener("submit", (evento) => {
    evento.preventDefault(); //preventDefault trava o padrão de enviar os dados para a url

    //1 forma de capturar o valor digitado
    //console.log(evento.target[0].value);
    //console.log(evento.target[1].value);

    //2 forma de capturar o valor digitado
    //console.log(evento.target.elements["nome"].value);
    //console.log(evento.target.elements["quantidade"].value);

    //Quando clicar em submit, nome e quantidade digitados na tela serão armazenados nas suas respectivas constantes através do evento
    const nome = evento.target.elements["nome"];
    const quantidade = evento.target.elements["quantidade"];

    //Chama a função que cria o elemento e envia as duas constantes armazenadas através do evento
    criaElemento(nome.value, quantidade.value);
    
    //Limpa os dados do form ao final do processo
    nome.value = "";
    quantidade.value = "";
});

function criaElemento (nome, quantidade) {
    //console.log(nome, quantidade);

    //<li class="item"><strong>quantidade</strong>nome</li>
    const novoItem = document.createElement('li');//Cria um novo elemento li no html
    novoItem.classList.add('item');//Adiciona um classe ao elemento

    const numeroItem = document.createElement('strong');//Cria um novo elemento strong igual ao do html
    numeroItem.innerHTML = quantidade;//Adiciona o valor quantidade recebido na função ao elemento

    novoItem.appendChild(numeroItem);//Manipula o numero item como objeto através do appendChild e adiciona um elemento dentro de outro elemento
    novoItem.innerHTML += nome;//adicionando o valor nome recebido na função ao elemento

    lista.appendChild(novoItem);//Manipula o numero item como objeto através do appendChild e adiciona o elemento novoItem dentro do elemento lista

    //Cria um objeto para receber os dados
    const itemAtual = {
        "nome": nome,
        "quantidade": quantidade
    }

    //Através do push, adiciona cada objeto ao array itens
    itens.push(itemAtual);

    //Adiciona o array ao local storage e converte o array em string através do json.stringify(), pois o local storage só lê string
    localStorage.setItem("item", JSON.stringify(itens));

}