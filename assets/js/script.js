document.addEventListener('DOMContentLoaded', () => {

    //Seleciona os elementos do DOM
    const filmeForm = document.getElementById('filme-form');
    const inputTitulo = document.getElementById('titulo');
    const inputSinopse = document.getElementById('sinopse');
    const inputPoster = document.getElementById('poster-url');

    //Escuta o evento de envio (submit) do formulário
    filmeForm.addEventListener('submit', (event) => {
        //Impede a página de recarregar
        event.preventDefault();

        //Cria um objeto com os valores dos inputs
        const novoFilme = {
            titulo: inputTitulo.value,
            sinopse: inputSinopse.value,
            poster: inputPoster.value 
        };

        renderizarFilme(novoFilme);

        //Limpa o formulário após o envio
        filmeForm.reset();
    });

    const listaFilmes = document.getElementById('lista-filmes');

    //Função para criar o HTML do card
    function renderizarFilme(filme) {
        const li = document.createElement('li');
        li.classList.add('movie-card');

        li.innerHTML = `
            <img src="${filme.poster}" alt="Poster de ${filme.titulo}">
            <div class="movie-card-content">
                <h3>${filme.titulo}</h3>
                <p>${filme.sinopse}</p>
            </div>
        `;

        listaFilmes.appendChild(li);
    }
});