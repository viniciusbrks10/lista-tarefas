const novaTarefa = document.querySelector('.nova-tarefa');
const addTarefa = document.querySelector('.add-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
    const li = document.createElement('li');
    return li;
}

novaTarefa.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        if (!novaTarefa.value) return;
        criaTarefa(novaTarefa.value);
    }
});

function limpaInput() {
    novaTarefa.value = '';
    novaTarefa.focus();
}

function criaBotaoApagar(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    li.appendChild(botaoApagar);
    botaoApagar.setAttribute('class', 'apagar');
}

function criaTarefa(textoInput) {
    const elementoLi = criaLi();
    elementoLi.innerText = textoInput;
    tarefas.appendChild(elementoLi);
    limpaInput();
    criaBotaoApagar(elementoLi)
    salvarTarefas();
}

addTarefa.addEventListener('click', function () {
    if (!novaTarefa.value) return;
    criaTarefa(novaTarefa.value);
});

document.addEventListener('click', function (e) {
    const el = e.target;

    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas()
    }
});

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

adicionaTarefasSalvas();