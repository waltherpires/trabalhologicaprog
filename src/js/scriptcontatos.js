
var contatos = [];
var flag = 0;
var propostas = [];
var htmldaProposta = '';
var qtdpropostas;
var detalhes;

//----------------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    var contatosSalvos = localStorage.getItem('contatos');
    var propostasSalvas = localStorage.getItem('propostas');

    if (contatosSalvos) {
        contatos = JSON.parse(contatosSalvos);
        renderContatos();
    }

    if (propostasSalvas) {
        propostas = JSON.parse(propostasSalvas);
        renderPropostas();
    }

    // Renderizar os contatos
    function renderContatos() {
        var lista = document.getElementById("lista");

        contatos.forEach(function (contato) {
            var contatoNaLista = document.createElement("li");
            contatoNaLista.setAttribute('id', `contato${contatos.indexOf(contato) + 1}`);
            var nomeDoContato = document.createTextNode(contato.nome);
            contatoNaLista.appendChild(nomeDoContato);

            var detalhes = document.createElement('div');
            detalhes.classList.add("info");
            detalhes.setAttribute('id', `detalhe${contatos.indexOf(contato) + 1}`);
            detalhes.style.display = 'none';
            detalhes.innerHTML = `<p>Nome: ${contato.nome}</p> <p>Endereço: ${contato.endereco}</p> <p>Telefone: ${contato.telefone}</p> <p>E-mail: ${contato.email}</p> <button id="btneditar">Editar Contato</button> <button id="btnexcluir${contato.numero}">Excluir Contato</button> <button id="btnproposta">Nova Proposta</button> <button id="btnmostrar">Propostas</button>`;

            lista.appendChild(contatoNaLista);
            contatoNaLista.parentNode.insertBefore(detalhes, contatoNaLista.nextSibling);
        });
    }

    // Renderizar as propostas
    function renderPropostas() {
        var detalhes = document.getElementById(`detalhe${contatos.length}`); 

        var textoProposta = document.createElement("table");
        textoProposta.innerHTML = `<tr> <th>Num</th> <th>Data</th> <th>Valor</th> <th>Status</th></tr>`;

        propostas.forEach(function (proposta) {
        htmldaProposta += `<tr> <td>${proposta.num}</td> <td>${proposta.data}</td> <td>${proposta.valor}</td> <td>${proposta.status}</td> <td><button id="excluir">Excluir</button></td> </tr>`;
        });

        textoProposta.innerHTML += htmldaProposta;
        detalhes.appendChild(textoProposta);
    }

});

   
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener('click', function(e){
    const el = e.target;

    //Cria novo Cliente
    if(el.classList.contains('criarcontato')){ 
        var novoContato = {
            numero: contatos.length + 1,
            nome: prompt('Digite o nome'),
            endereco: prompt('Digite o endereco'),
            telefone: prompt('Digite o telefone'),
            email: prompt("Digite o email")
        }

        if(novoContato.nome === "" || novoContato.endereco === "" || novoContato.telefone === "" || novoContato.email === ""){
            alert('Valor invalido. Por favor, insira um valor valido')
        }
        else {
            contatos.push(novoContato);

            //LocalStorage
            salvarLocalStorage();
            
            var contatoNaLista = document.createElement("li");  
            contatoNaLista.setAttribute('id', `contato${contatos.length}`) //Adicionar um id para poder utilizar depois 
            var nomeDoContato = document.createTextNode(novoContato.nome);
            contatoNaLista.appendChild(nomeDoContato);
            
            detalhes = document.createElement('div');
            detalhes.classList.add("info");
            detalhes.setAttribute('id', `detalhe${contatos.length}`);
            detalhes.style.display = 'none';
            detalhes.innerHTML = `<p>Nome: ${novoContato.nome}</p> <p>Endereço: ${novoContato.endereco}</p> <p>Telefone: ${novoContato.telefone}</p> <p>E-mail: ${novoContato.email}</p> <button id="btneditar">Editar Contato</button> <button id="btnexcluir${novoContato.numero}">Excluir Contato</button> <button id="btnproposta">Nova Proposta</button> <button id="btnmostrar">Propostas</button>`;

            document.getElementById("lista").appendChild(contatoNaLista); //Adiciona o cliente à lista
            contatoNaLista.parentNode.insertBefore(detalhes, contatoNaLista.nextSibling); //Adiciona os detalhes após o novo cliente

            renderContatos();
        }
        

    }
    //Adicionar Proposta
    if (el.getAttribute('id') === "btnproposta") {
        detalhes = document.getElementById(`detalhe${contatos.length}`); 
        qtdpropostas = propostas.length;
        var novaProposta = {
            num: propostas.length + 1,
            data: prompt("Digite a data de hoje"),
            valor: prompt("Digite o valor da proposta"),
            status: 'ativa'
        }
        
        // LocalStorage
        if(novaProposta.data === '' || novaProposta.valor === '') {
            alert('Valor invalido. Por favor, insira um valor valido')
        } else{
            propostas.push(novaProposta);
            salvarLocalStorage();
            

            var novaLinha = document.createElement("p");
            novaLinha.innerHTML = `Num: ${novaProposta.num}; Data: ${novaProposta.data}; Valor: ${novaProposta.valor}; Status: ${novaProposta.status}`
            detalhes.appendChild(novaLinha);

            renderPropostas();
        }
    
    }
   
   for(let i = 1; i <= contatos.length; i++) {
    if(el.getAttribute('id') === `btnexcluir${i}`) {
        var confirmar = prompt("Tem certeza que deseja excluir este contato?");
        if(confirmar === "sim" || "SIM" ||"s" ||"S") {
            var x = document.getElementById(`btnexcluir${i}`).parentElement;
            x = x.id.toString();
            x = x.slice(-1);
            console.log(x);
        }
       }
   }

    /*  if(el.getAttribute('id') === "btnproposta") */


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

    //Função do LocalStorage
    function salvarLocalStorage() {
        localStorage.setItem('contatos', JSON.stringify(contatos));
        localStorage.setItem('propostas', JSON.stringify(propostas));
    }
})


//Verificar se existe algo salvo

