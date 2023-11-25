
var contatos = [];
var flag = 0;
var propostas = [];
var htmldaProposta = '';
var qtdpropostas;
var detalhes;
document.addEventListener('click', function(e){
    const el = e.target;

    if(el.classList.contains('criarcontato')){ //Cria novo Cliente
        var novoContato = {
            nome: prompt('Digite o nome'),
            endereco: prompt('Digite o endereco'),
            telefone: prompt('Digite o telefone'),
            email: prompt("Digite o email")
        }
        contatos.push(novoContato);
        //Usar o localStorage aqui
        var contatoNaLista = document.createElement("li");  
        contatoNaLista.setAttribute('id', `contato${contatos.length}`) //Adicionar um id para poder utilizar depois 
        var nomeDoContato = document.createTextNode(novoContato.nome);
        contatoNaLista.appendChild(nomeDoContato);
        
        detalhes = document.createElement('div');
        detalhes.classList.add("info");
        detalhes.setAttribute('id', `detalhe${contatos.length}`);
        detalhes.style.display = 'none';
        detalhes.innerHTML = `<p>Nome: ${novoContato.nome}</p> <p>Endereço: ${novoContato.endereco}</p> <p>Telefone: ${novoContato.telefone}</p> <p>E-mail: ${novoContato.email}</p> <button id="btneditar">Editar Contato</button> <button id="btnexcluir">Excluir Contato</button> <button id="btnproposta">Nova Proposta</button> <button id="btnmostrar">Propostas</button>`;

        document.getElementById("lista").appendChild(contatoNaLista); //Adiciona o cliente à lista
        contatoNaLista.parentNode.insertBefore(detalhes, contatoNaLista.nextSibling); //Adiciona os detalhes após o novo cliente

    }

    if (el.getAttribute('id') === "btnproposta") {
        qtdpropostas = propostas.length;
        var novaProposta = {
            num: propostas.length + 1,
            data: prompt("Digite a data de hoje"),
            valor: prompt("Digite o valor da proposta"),
            status: 'ativa'
        }
        propostas.push(novaProposta);
        // LocalStorage aqui
    
        var novaLinha = document.createElement("p");
        novaLinha.innerHTML = `Proposta ${novaProposta.num}: Data - ${novaProposta.data}, Valor - R$${novaProposta.valor}, Status - ${novaProposta.status}`;

        detalhes.appendChild(novaLinha);
    }
    
    
    
/*     if(el.getAttribute('id') === "btnexcluir")
    if(el.getAttribute('id') === "btnproposta") */


    //Ligar e Desligar exibição dos detalhes
    for(let i = 1; i <= contatos.length; i++) {             
        let detalheAtual = document.getElementById(`detalhe${i}`)

        if(el.getAttribute('id') === `contato${i}`){  
            if(flag === 0) {
                flag = 1;
                detalheAtual.style.display = "block";
            } else {
                flag = 0;
                detalheAtual.style.display = "none";
            }

        }
    }

})