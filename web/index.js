const uri = 'http://localhost:4000';

//Obtendo o título do servidor
const titulo = document.querySelector('header h1'); //DOM
fetch(uri)
    .then(resp => resp.json())
    .then(resp => titulo.innerHTML = resp.titulo);

//Obtendo as consultas do servidor e exibindo na tabela
const corpo = document.querySelector('table tbody'); //DOM
fetch(uri + '/consultas')
    .then(resp => resp.json())
    .then(resp => {
        resp.forEach(c => {
            const linha = document.createElement('tr')
            linha.innerHTML = `
                <td>${c.consulta_id}</td>
                <td contenteditable="true">${c.nome_paciente}</td>
                <td contenteditable="true">${c.nome_medico}</td>
                <td contenteditable="true">${new Date(c.data_hora).toLocaleDateString('pt-BR')} ${c.data_hora.split('T')[1].split('.')[0].slice(0,5)}</td>
                <td><button onclick="alterar(this)">*</button><button onclick="excluir(${c.consulta_id})">-</button></td>
            `;
            corpo.appendChild(linha);
        });
    });

//Enviando uma nova consulta para o servidor
const form = document.querySelector('form'); //DOM
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const body = {
        paciente: form.paciente.value,
        medico: form.medico.value,
        data: form.data.value
    };

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/10.3.1' },
        body: JSON.stringify(body)
    };

    fetch(uri + '/consultas', options)
        .then(resp => resp.status)
        .then(resp => resp === 201 ? window.location.reload() : alert(resp))
        .catch(err => console.error(err));
});

//Alterar uma consulta no servidor
function alterar(botao) {
    const linha = botao.parentNode.parentNode;
    const id = linha.children[0].innerText;
    const paciente = linha.children[1].innerText;
    const medico = linha.children[2].innerText;
    const data = linha.children[3].innerText;

    const body = {
        paciente: paciente,
        medico: medico,
        data: new Date(data).toISOString()
    };

    const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/10.3.1' },
        body: JSON.stringify(body)
    };

    fetch(uri + '/consultas/' + id, options)
        .then(resp => resp.status)
        .then(resp => resp === 202 ? window.location.reload() : alert(resp))
        .catch(err => console.error(err));
}

//Excluir uma consulta do servidor
function excluir(id) {
    fetch(uri + '/consultas/' + id, { method: 'DELETE' })
        .then(resp => resp.status)
        .then(resp => resp === 204 ? window.location.reload() : alert(resp))
        .catch(err => console.error(err));
}