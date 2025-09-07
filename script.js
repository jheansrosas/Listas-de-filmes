// Espera o DOM (Document Object Model) ser completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // FUNÇÕES PARA PERSISTÊNCIA DE DADOS
    
    // Funcao para carregar filmes do localStorage
    function carregarFilmesDoLocalStorage() {
        const filmesSalvos = localStorage.getItem('filmes');
        if (filmesSalvos) {
            return JSON.parse(filmesSalvos);
        }
        return [];
    }
    
    // Funcao para salvar filmes no localStorage
    function salvarFilmesNoLocalStorage(filmes) {
        localStorage.setItem('filmes', JSON.stringify(filmes));
    }

    // Seleciona a lista de filmes (a tag <ul>)
    const listaDeFilmesUl = document.querySelector('ul');
    
    // Lista de filmes estáticos (do seu HTML original)
    const filmesEstaticos = [
        {
            titulo: "Piratas do Caribe",
            sinopse: "O capitão Jack Sparrow, com sua atitude excêntrica e ética duvidosa, parte em aventuras pelo oceano, mas sempre acaba no meio de maldições antigas, monstros marinhos e disputas de poder. No fim, a busca por tesouros e a liberdade se tornam sua única bússola.",
            posterUrl: "imagens/Piratas_do_Caribe_poster.jpg"
        },
        {
            titulo: "Planeta dos Macacos",
            sinopse: "Em um futuro distante, ou num passado alternativo, a humanidade perdeu a guerra para uma espécie mais inteligente: os macacos. Seja por mutação ou por revolução, agora a Terra pertence a eles. Alguns humanos buscam a paz, outros a guerra, mas a luta pela sobrevivência nunca acaba.",
            posterUrl: "imagens/planeta_dos_macacos_poster.jpg"
        },
        {
            titulo: "Transformers",
            sinopse: "Guerra alienígena no planeta Terra. Robôs gigantes que se transformam em carros (e outras coisas) buscam um artefato poderoso, e uma antiga rivalidade se reacende entre os mocinhos (Autobots) e os vilões (Decepticons), deixando a humanidade no meio do caos.",
            posterUrl: "imagens/Transformers_poster.jpg"
        },
        {
            titulo: "Jurassic Park/World",
            sinopse: "O sonho de recriar dinossauros vira pesadelo quando as criaturas escapam do controle. Entre parques falidos e monstros pré-históricos à solta, humanos tentam sobreviver ao caos jurássico que eles mesmos causaram.",
            posterUrl: "imagens/Jurassic_Park_poster.jpg"
        },
        {
            titulo: "Velozes e Furiosos",
            sinopse: "O que começou com rachas e carros tunados virou uma saga de espionagem, família e ação insana. Dominic Toretto e sua 'família' enfrentam vilões, governos e leis da física — sempre acelerando até o limite.",
            posterUrl: "imagens/Veelozes_e_Furiosos.jpg"
        }
    ];

    // Variável para guardar o índice do filme que está sendo editado
    let filmeSendoEditadoIndex = -1;

    // Seleciona os elementos do modal de edição
    const modalEdicao = document.getElementById('modal-edicao');
    const inputEditTitulo = document.getElementById('edit-titulo');
    const inputEditSinopse = document.getElementById('edit-sinopse');
    const inputEditPosterUrl = document.getElementById('edit-poster-url');
    const btnSalvarEdicao = document.getElementById('btn-salvar-edicao');
    const btnCancelarEdicao = document.getElementById('btn-cancelar-edicao');

    // Função que cria um novo card de filme no HTML
    function criarCardFilme(filme, index) {
        const novoFilmeLi = document.createElement('li');
        novoFilmeLi.className = 'bg-gray-800 p-6 rounded-lg shadow-lg';
        novoFilmeLi.dataset.index = index; // Adicionando um índice para identificação

        novoFilmeLi.innerHTML = `
            <h2 class="text-2xl font-semibold mb-2">${filme.titulo}</h2>
            <img src="${filme.posterUrl}" alt="Poster de ${filme.titulo}" class="w-full h-auto rounded-md mb-4">
            
            <div class="sinopse" style="display: none;">
                <p class="text-sm text-gray-400 leading-relaxed mb-2">${filme.sinopse}</p>
            </div>
            <button class="toggle-sinopse bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mt-4">Ver Sinopse</button>
            <button class="editar-filme bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full mt-4 ml-2">Editar</button>
            <button class="excluir-filme bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full mt-4 ml-2">Excluir</button>
        `;
        
        // Adiciona o evento de clique no botão de sinopse
        const novoBotaoSinopse = novoFilmeLi.querySelector('.toggle-sinopse');
        novoBotaoSinopse.addEventListener('click', function() {
            const sinopseCompleta = novoFilmeLi.querySelector('.sinopse');
            if (sinopseCompleta.style.display === 'none' || sinopseCompleta.style.display === '') {
                sinopseCompleta.style.display = 'block';
                this.textContent = 'Ver Menos';
            } else {
                sinopseCompleta.style.display = 'none';
                this.textContent = 'Ver Sinopse';
            }
        });

        // Adiciona o evento de clique para o novo botão 'Editar'
        const novoBotaoEditar = novoFilmeLi.querySelector('.editar-filme');
        novoBotaoEditar.addEventListener('click', function() {
            const indexFilme = parseInt(this.closest('li').dataset.index);
            const filmeParaEditar = filmesSalvos[indexFilme];

            inputEditTitulo.value = filmeParaEditar.titulo;
            inputEditSinopse.value = filmeParaEditar.sinopse;
            inputEditPosterUrl.value = filmeParaEditar.posterUrl;

            filmeSendoEditadoIndex = indexFilme;
            modalEdicao.classList.remove('hidden');
        });

        // Adiciona o evento de clique para o novo botão 'Excluir'
        const novoBotaoExcluir = novoFilmeLi.querySelector('.excluir-filme');
        novoBotaoExcluir.addEventListener('click', function() {
        const confirmaExclusao = confirm("Tem certeza que deseja excluir este filme?");
        if (confirmaExclusao) {
            // Encontra o índice do filme que está sendo removido
            const indexFilme = parseInt(this.closest('li').dataset.index);

            // Remove o filme do array filmesSalvos
            filmesSalvos.splice(indexFilme, 1);
        
            // Salva a nova lista sem o filme excluído
            salvarFilmesNoLocalStorage(filmesSalvos);

            // Remove o elemento HTML (o card do filme) diretamente da tela
            this.closest('li').remove();

        // Atenção: A partir daqui, os data-index dos cards estarão incorretos.
        // A lógica de exclusão precisa ser melhorada para reindexar os cards,
        // mas para o momento, esta solução é a mais simples para funcionar.
        }
    });

        listaDeFilmesUl.appendChild(novoFilmeLi);
    }
    
    // --- LÓGICA DE CARREGAMENTO E ADIÇÃO ---
    // Pega os filmes salvos ou usa a lista estática se não houver
    let filmesSalvos = carregarFilmesDoLocalStorage();
    if (filmesSalvos.length === 0) {
        filmesSalvos = filmesEstaticos;
        salvarFilmesNoLocalStorage(filmesSalvos);
    }

    // Carrega os filmes para a tela
    filmesSalvos.forEach((filme, index) => criarCardFilme(filme, index));

    // Seleciona o botão e os campos do formulário
    const btnAdicionar = document.getElementById('btn-adicionar');
    const inputTitulo = document.getElementById('titulo');
    const inputSinopse = document.getElementById('sinopse');
    const inputPosterUrl = document.getElementById('poster-url');

    // Adiciona um "ouvinte de evento" no botão de "Adicionar Filme"
    btnAdicionar.addEventListener('click', function(event) {
        event.preventDefault();
        const titulo = inputTitulo.value;
        const sinopse = inputSinopse.value;
        const posterUrl = inputPosterUrl.value;
        
        if (titulo === '' || sinopse === '' || posterUrl === '') {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        
        const novoFilme = { titulo, sinopse, posterUrl };
        
        filmesSalvos.push(novoFilme);
        salvarFilmesNoLocalStorage(filmesSalvos);
        
        criarCardFilme(novoFilme, filmesSalvos.length - 1);
        
        inputTitulo.value = '';
        inputSinopse.value = '';
        inputPosterUrl.value = '';
    });

    // Seleciona o novo campo de busca
    const inputBusca = document.getElementById('filme-busca');

    // Adiciona um 'ouvinte de evento' para a busca
    inputBusca.addEventListener('input', function(event) {
        const termoDeBusca = event.target.value.toLowerCase();
        const filmesNaPagina = document.querySelectorAll('li');
        
        filmesNaPagina.forEach(filme => {
            const nomeFilme = filme.querySelector('h2').textContent.toLowerCase();
            if (nomeFilme.includes(termoDeBusca)) {
                filme.style.display = '';
            } else {
                filme.style.display = 'none';
            }
        });
    });

    // --- LÓGICA DO MODAL DE EDIÇÃO ---

    // Evento para salvar as edições
    btnSalvarEdicao.addEventListener('click', function() {
        if (filmeSendoEditadoIndex !== -1) {
            const tituloAtualizado = inputEditTitulo.value;
            const sinopseAtualizada = inputEditSinopse.value;
            const posterUrlAtualizado = inputEditPosterUrl.value;

            filmesSalvos[filmeSendoEditadoIndex].titulo = tituloAtualizado;
            filmesSalvos[filmeSendoEditadoIndex].sinopse = sinopseAtualizada;
            filmesSalvos[filmeSendoEditadoIndex].posterUrl = posterUrlAtualizado;

            salvarFilmesNoLocalStorage(filmesSalvos);

            const cardParaAtualizar = document.querySelector(`li[data-index="${filmeSendoEditadoIndex}"]`);
            if (cardParaAtualizar) {
                cardParaAtualizar.querySelector('h2').textContent = tituloAtualizado;
                cardParaAtualizar.querySelector('img').src = posterUrlAtualizado;
                cardParaAtualizar.querySelector('.sinopse p').textContent = sinopseAtualizada;
            }

            modalEdicao.classList.add('hidden');
            filmeSendoEditadoIndex = -1;
        }
    });

    // Evento para cancelar a edição
    btnCancelarEdicao.addEventListener('click', function() {
        modalEdicao.classList.add('hidden');
        filmeSendoEditadoIndex = -1;
    });
});