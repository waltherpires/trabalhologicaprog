
var contatos = [];
var flag = 0;
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
        
        var detalhes = document.createElement('div');
        detalhes.classList.add("info");
        detalhes.setAttribute('id', `detalhe${contatos.length}`);
        detalhes.style.display = 'none';
        detalhes.innerHTML = `<p>Nome: ${novoContato.nome}</p> <p>Endereço: ${novoContato.endereco}</p> <p>Telefone: ${novoContato.telefone}</p> <p>E-mail: ${novoContato.email}</p> <button>Editar Contato</button> <button>Excluir Contato</button> <button>Nova Proposta</button> <button>Propostas</button> <button>Propostas</button> <tr> <th>Num</th> <th>Data</th> <th>Valor</th> <th>Status</th> </tr> </table>`;
    
        document.getElementById("lista").appendChild(contatoNaLista); //Adiciona o cliente à lista
    
        contatoNaLista.parentNode.insertBefore(detalhes, contatoNaLista.nextSibling); //Adiciona os detalhes após o novo cliente
    }

    for(let i = 1; i <= contatos.length; i++) {             //Ligar e Desligar exibição dos detalhes
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