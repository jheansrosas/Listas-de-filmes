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

        console.log('Novo filme capturado:', novoFilme);

        //Limpa o formulário após o envio
        filmeForm.reset();
        alert('Filme capturado com sucesso!');
    });
});