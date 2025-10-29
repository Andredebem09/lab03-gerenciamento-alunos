// Espera o DOM carregar para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- EXERCÍCIO 2: CLASSE ALUNO ---
    // [cite: 24, 26]
    class Aluno {
        // Construtor para inicializar os dados [cite: 28]
        constructor(id, nome, idade, curso, notaFinal) {
            this.id = id;
            this.nome = nome;         // [cite: 27]
            this.idade = idade;       // [cite: 27]
            this.curso = curso;       // [cite: 27]
            this.notaFinal = notaFinal; // [cite: 27]
        }

        // Método isAprovado() [cite: 29]
        isAprovado() {
            return this.notaFinal >= 7;
        }

        // Método toString() [cite: 30]
        toString() {
            const status = this.isAprovado() ? 'Aprovado' : 'Reprovado';
            return `ID: ${this.id} | Nome: ${this.nome} | Idade: ${this.idade} | Curso: ${this.curso} | Nota: ${this.notaFinal} (${status})`;
        }
    }

    // --- ESTADO DA APLICAÇÃO ---

    // Exercício 1: Armazenamento em memória (array de objetos) [cite: 17]
    let alunos = [];
    let nextId = 1;
    let modoEdicao = false;
    let idEdicao = null;

    // --- SELETORES DO DOM ---
    const form = document.getElementById('aluno-form');
    const inputId = document.getElementById('aluno-id');
    const inputNome = document.getElementById('nome');
    const inputIdade = document.getElementById('idade');
    const inputCurso = document.getElementById('curso');
    const inputNotaFinal = document.getElementById('notaFinal');
    const btnSalvar = document.getElementById('btn-salvar');
    const tabelaCorpo = document.getElementById('tabela-corpo');
    const relatorioOutput = document.getElementById('relatorio-output');

    // --- EXERCÍCIO 3: EVENTOS (addEventListener) ---
    // [cite: 36, 38]

    // Evento de submit do formulário
    // Utiliza função anônima (neste caso, uma arrow function) [cite: 39]
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        // Captura os dados do formulário
        const nome = inputNome.value;
        const idade = parseInt(inputIdade.value);
        const curso = inputCurso.value;
        const notaFinal = parseFloat(inputNotaFinal.value);

        if (modoEdicao) {
            // --- LÓGICA DE EDIÇÃO ---
            // Usando arrow function para manipulação de dados [cite: 40]
            const index = alunos.findIndex(aluno => aluno.id === idEdicao);
            if (index !== -1) {
                // Atualiza o aluno existente
                alunos[index] = new Aluno(idEdicao, nome, idade, curso, notaFinal);
                exibirMensagem(`Aluno "${nome}" atualizado com sucesso!`); // [cite: 41]
            }
            // Reseta o modo de edição
            modoEdicao = false;
            idEdicao = null;
            btnSalvar.textContent = 'Salvar';
        } else {
            // --- LÓGICA DE CADASTRO ---
            // Cria nova instância da classe Aluno (Exercício 2) [cite: 24]
            const novoAluno = new Aluno(nextId, nome, idade, curso, notaFinal);
            nextId++; // Incrementa o ID para o próximo cadastro
            alunos.push(novoAluno); // Adiciona à lista [cite: 14]
            exibirMensagem(`Aluno "${nome}" cadastrado com sucesso!`); // [cite: 41]
        }

        renderizarTabela(); // Atualiza a tabela 
        form.reset(); // Limpa o formulário
    });

    // --- FUNÇÕES CRUD (CREATE, READ, UPDATE, DELETE) ---

    // Função para renderizar a tabela (READ)
    function renderizarTabela() {
        tabelaCorpo.innerHTML = ''; // Limpa a tabela antes de renderizar

        // Exercício 4: forEach (pode ser usado para renderizar) [cite: 57]
        alunos.forEach(aluno => {
            const tr = document.createElement('tr');
            
            tr.innerHTML = `
                <td>${aluno.nome}</td>
                <td>${aluno.idade}</td>
                <td>${aluno.curso}</td>
                <td>${aluno.notaFinal}</td>
                <td>
                    <button class="btn-editar">Editar</button>
                    <button class="btn-excluir">Excluir</button>
                </td>
            `;

            // Adiciona botões de "Editar" e "Excluir" [cite: 16]
            // Exercício 3: addEventListener para botões da tabela [cite: 38]
            
            // Botão Editar (UPDATE)
            const btnEditar = tr.querySelector('.btn-editar');
            // Usando função anônima [cite: 39]
            btnEditar.addEventListener('click', function() {
                iniciarEdicao(aluno);
            });

            // Botão Excluir (DELETE)
            const btnExcluir = tr.querySelector('.btn-excluir');
            // Usando arrow function [cite: 40]
            btnExcluir.addEventListener('click', () => {
                excluirAluno(aluno.id, aluno.nome);
            });

            tabelaCorpo.appendChild(tr);
        });
    }

    // Função para preparar o formulário para edição (UPDATE)
    function iniciarEdicao(aluno) {
        // Preenche o formulário com os dados do aluno
        inputId.value = aluno.id;
        inputNome.value = aluno.nome;
        inputIdade.value = aluno.idade;
        inputCurso.value = aluno.curso;
        inputNotaFinal.value = aluno.notaFinal;

        // Entra em modo de edição
        modoEdicao = true;
        idEdicao = aluno.id;
        btnSalvar.textContent = 'Atualizar';

        // Foca no campo nome
        inputNome.focus();
    }

    // Função para excluir um aluno (DELETE)
    function excluirAluno(id, nome) {
        if (confirm(`Tem certeza que deseja excluir o aluno "${nome}"?`)) {
            // Exercício 4 (filter) e Exercício 3 (arrow function) [cite: 57, 40]
            alunos = alunos.filter(aluno => aluno.id !== id);
            renderizarTabela(); // Atualiza a tabela
            exibirMensagem(`Aluno "${nome}" excluído com sucesso!`); // [cite: 41]
        }
    }

    // Função para exibir mensagens (Exercício 3)
    function exibirMensagem(msg) {
        console.log(msg); // Exibe no console [cite: 41]
        // Alternativamente, poderia usar alert(msg); [cite: 41]
    }

    // --- EXERCÍCIO 4: RELATÓRIOS ---
    // [cite: 46]

    // 1. Listar alunos aprovados
    document.getElementById('btn-aprovados').addEventListener('click', () => {
        // Uso do 'filter' [cite: 51, 57]
        const aprovados = alunos.filter(aluno => aluno.isAprovado());
        // Uso do 'map' [cite: 57]
        const lista = aprovados.map(a => a.toString()).join('\n');
        relatorioOutput.textContent = lista || 'Nenhum aluno aprovado.';
    });

    // 2. Calcular média das notas finais
    document.getElementById('btn-media-notas').addEventListener('click', () => {
        if (alunos.length === 0) {
            relatorioOutput.textContent = 'Nenhum aluno cadastrado.';
            return;
        }
        // Uso do 'reduce' [cite: 52, 57]
        const totalNotas = alunos.reduce((acc, aluno) => acc + aluno.notaFinal, 0);
        const media = (totalNotas / alunos.length).toFixed(2);
        relatorioOutput.textContent = `Média das notas finais da turma: ${media}`;
    });

    // 3. Calcular média das idades
    document.getElementById('btn-media-idades').addEventListener('click', () => {
        if (alunos.length === 0) {
            relatorioOutput.textContent = 'Nenhum aluno cadastrado.';
            return;
        }
        // Uso do 'reduce' [cite: 53, 57]
        const totalIdades = alunos.reduce((acc, aluno) => acc + aluno.idade, 0);
        const media = (totalIdades / alunos.length).toFixed(1);
        relatorioOutput.textContent = `Média de idade da turma: ${media} anos`;
    });

    // 4. Listar nomes em ordem alfabética
    document.getElementById('btn-ordem-alfabetica').addEventListener('click', () => {
        // Uso do 'map' e 'sort' [cite: 54, 57]
        const nomes = alunos.map(aluno => aluno.nome);
        nomes.sort(); // [cite: 57]
        relatorioOutput.textContent = nomes.join('\n') || 'Nenhum aluno cadastrado.';
    });

    // 5. Mostrar quantidade de alunos por curso
    document.getElementById('btn-alunos-curso').addEventListener('click', () => {
        // Uso do 'reduce' [cite: 55, 57]
        const contagemPorCurso = alunos.reduce((acc, aluno) => {
            if (acc[aluno.curso]) {
                acc[aluno.curso]++;
            } else {
                acc[aluno.curso] = 1;
            }
            return acc;
        }, {}); // Inicia com um objeto vazio

        let resultado = "Quantidade de Alunos por Curso:\n";
        for (const curso in contagemPorCurso) {
            resultado += `- ${curso}: ${contagemPorCurso[curso]} aluno(s)\n`;
        }
        relatorioOutput.textContent = resultado.trim() || 'Nenhum aluno cadastrado.';
    });

    // --- INICIALIZAÇÃO ---
    renderizarTabela(); // Renderiza a tabela (vazia) ao carregar a página
});