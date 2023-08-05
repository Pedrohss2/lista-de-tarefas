function listaDeTarefa() {
    let inputTarefa = document.querySelector('.input-nova-tarefa');
    let btnTarefa = document.querySelector('.button')
    let tarefas = document.querySelector('.tarefas')

    function criaLista() {
        const lista = document.createElement('li');
        return lista;
   }

   function criaBotao(li) {
        li.innerHTML += '';
        const botao = document.createElement('button');
        botao.innerHTML = "Apagar";
        botao.setAttribute('class', 'apagar');

        li.appendChild(botao)
   }
   

   function limpaTarefa() {
        inputTarefa.value = "";
        inputTarefa.focus();
   }


    function criaTarefa(texto){
        const li = criaLista();
        li.innerText = texto;
        tarefas.appendChild(li);

        criaBotao(li);
    }   

   btnTarefa.addEventListener('click', function() {
        if(!inputTarefa.value) {
            throw Error('Input vazio, Escreva algo')
        }
        criaTarefa(inputTarefa.value);
        salvaTarefa()
   })

   document.addEventListener('click', function(e) {
        const el = e.target;
        if(el.classList.contains('apagar')) {
            el.parentElement.remove();
            salvaTarefa();
        }
   })

   function salvaTarefa() {
        const liTarefas = tarefas.querySelectorAll('li')
        let arrayOfTarefas = [];
        for(let tarefa of liTarefas) {
            let tarefaTexto =  tarefa.innerText;
            tarefaTexto = tarefaTexto.replace('Apagar',  '').trim();
            arrayOfTarefas.push(tarefaTexto);
        }
       
        const tarefasJSON = JSON.stringify(arrayOfTarefas);
        localStorage.setItem('tarefas', tarefasJSON)
    }

    function addTarefasSalvas() {
        const tarefas = localStorage.getItem('tarefas')
        const listaDeTarefas = JSON.parse(tarefas)

        for(let tarefa of listaDeTarefas ) {
            criaTarefa(tarefa);
        }
    }
    addTarefasSalvas()
    
}

listaDeTarefa();