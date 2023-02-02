const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const botao_exclusao = document.getElementById("botao_exclusao");
const itens = JSON.parse(localStorage.getItem("itens")) || [];//pega os itens do localStorage e converte (parse) em array

//Ao iniciar é realizado um forEach no array itens e cada objeto elemento é enviado para a função criaElemento.
//Essa ação faz com que os itens armazenados no localStorage sejam criados na tela novamente.
itens.forEach( (elemento) => {
    criaElemento(elemento);
})

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

    //Verifica se existe algum elemento com o mesmo nome. Caso exista, ele guarda o objeto na const existe, ou undefined caso não exista.
    const existe = itens.find(elemento => elemento.nome === nome.value);

    //Cria um objeto para receber os dados
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    //Se existir um elemento com o mesmo nome na variavel existe: 
    //  -atualiza o id do item atual para o id que ja existe;
    //  -envia o itemAtual para a função atualizaElemento;
    //  -subscreve no array itens o item atual.
    if (existe) {
        itemAtual.id = existe.id;
        atualizaElemento(itemAtual);
        itens[existe.id] = itemAtual;
    } 
    
    //Senão existir um elemento com o mesmo nome na variavel existe:
    //  -atualiza o campo id do itemAtual com o valor da contagem length;
    //  -envia o itematual para a função criaElemento;
    //Através do push, adiciona cada objeto ao array itens.
    else {
        itemAtual.id = itens.length;
        criaElemento(itemAtual);
        itens.push(itemAtual);
    }

    //Adiciona o array ao local storage e converte o array em string através do json.stringify(), pois o local storage só lê string
    localStorage.setItem("itens", JSON.stringify(itens));
    
    //Limpa os dados do form ao final do processo
    nome.value = "";
    quantidade.value = "";
});

function criaElemento (itemAtual) {
    //console.log(nome, quantidade);

    //<li class="item"><strong>quantidade</strong>nome</li>
    const novoItem = document.createElement('li');//Cria um novo elemento li no html
    novoItem.classList.add('item');//Adiciona um classe ao elemento

    const numeroItem = document.createElement('strong');//Cria um novo elemento strong igual ao do html
    numeroItem.innerHTML = itemAtual.quantidade;//Adiciona o valor quantidade recebido na função ao elemento
    numeroItem.dataset.id = itemAtual.id;//Adiciona o valor id recebido na função ao elemento
    novoItem.appendChild(numeroItem);//Manipula o numero item como objeto através do appendChild e adiciona um elemento dentro de outro elemento

    novoItem.innerHTML += itemAtual.nome;//adicionando o valor nome recebido na função ao elemento

    lista.appendChild(novoItem);//Manipula o numero item como objeto através do appendChild e adiciona o elemento novoItem dentro do elemento lista
}

//Recebe o itemAtual, localiza o elemento através do data attribute (data-id) e insere a quantidade que veio no itemAtual
function atualizaElemento(itemAtual) {
    document.querySelector("[data-id='"+itemAtual.id+"']").innerHTML = itemAtual.quantidade;
}

//Ao clicar no botao "Excluir lista" o localStorage é limpo e a pagina recarregada 
botao_exclusao.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
})