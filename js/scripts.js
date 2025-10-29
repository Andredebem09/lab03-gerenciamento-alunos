class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.notaFinal = notaFinal;
    }

    isAprovado() {
        return this.notaFinal >= 7;
    }

    toString() {
        return `Nome: ${this.nome}, Idade: ${this.idade}, Curso: ${this.curso}, Nota Final: ${this.notaFinal}, Aprovado: ${this.isAprovado() ? 'Sim' : 'Não'}`;
    }
}

class AlunoController {
    constructor() {
        this.alunos = [];
        this.init();
    }

    init() {
        document.getElementById("formulario").addEventListener("submit", (event) => {
            event.preventDefault();
            document.getElementById("tabela-alunos").style.display = "block";
            document.getElementById("relatorios").style.display = "block";
            this.salvarAluno(event);
        });
        
        document.getElementById("btn-excluir").addEventListener("click", () => {
            if (!confirm("Tem certeza que deseja realizar essa ação (os dados serão perdidos)?")) {
                return;
            }
            this.limparFormulario();
        });

        document.getElementById("btn-listar-alunos-aprovados").addEventListener("click", (event) => {
            this.listarAlunosAprovados();
        });

        document.getElementById("btn-media-notas").addEventListener("click", (event) => {
            this.mediaNotas();
        });

        document.getElementById("btn-media-idades").addEventListener("click", (event) => {
            this.mediaIdades();
        });

        document.getElementById("btn-nomes-em-ordem").addEventListener("click", (event) => {
            this.nomesEmOrdemAlfabetica();
        });

        document.getElementById("btn-quantidade-por-curso").addEventListener("click", (event) => {
            this.quantidadeAlunosPorCurso();
        });
    }

    salvarAluno(event) {
        const nome = document.getElementById("nome").value;
        const idade = parseInt(document.getElementById("idade").value);
        const curso = document.getElementById("curso").value;
        const notaFinal = parseFloat(document.getElementById("notaFinal").value);

        const aluno = new Aluno(nome, idade, curso, notaFinal);
        this.alunos.push(aluno);
        this.atualizarTabela();
        this.limparFormulario();
        alert("Aluno salvo com sucesso!");
    }

    editarAluno(event) {
        if (!confirm("Tem certeza que deseja editar este aluno?")) {
            return;
        }

        const row = event.target.closest('tr');
        const index = row.rowIndex -1;
        const aluno = this.alunos[index];

        document.getElementById("nome").value = aluno.nome;
        document.getElementById("idade").value = aluno.idade;
        document.getElementById("curso").value = aluno.curso;
        document.getElementById("notaFinal").value = aluno.notaFinal;

        this.alunos.splice(index, 1);
        this.atualizarTabela();
    }

    excluirAluno(event) {
        if (!confirm("Tem certeza que deseja excluir este aluno?")) {
            return;
        }
        
        const row = event.target.closest("tr");
        const index = row.rowIndex -1;
        this.alunos.splice(index, 1);
        this.atualizarTabela();
    }

    atualizarTabela() {
        const tabela = document.getElementById("corpo-tabela-alunos");
        tabela.innerHTML = "";
        this.alunos.forEach((aluno, index) => {
            const row = tabela.insertRow();
            row.insertCell(0).innerText = aluno.nome;
            row.insertCell(1).innerText = aluno.idade;
            row.insertCell(2).innerText = aluno.curso;
            row.insertCell(3).innerText = aluno.notaFinal;

            const btnEditar = document.createElement("button");
            btnEditar.innerText = "Editar";
            btnEditar.type = "button";
            btnEditar.addEventListener("click", (event) => this.editarAluno(event));
            
            const btnExcluir = document.createElement("button");
            btnExcluir.innerText = "Excluir";
            btnExcluir.type = "button";
            btnExcluir.addEventListener("click", (event) => this.excluirAluno(event));

            const actionCell = row.insertCell(4);
            actionCell.appendChild(btnEditar);
            actionCell.appendChild(btnExcluir);
        });
    }

    limparFormulario() {
        document.getElementById("formulario").reset();
    }

    listarAlunosAprovados() {
        this.mostrarSecao("alunos-aprovados");

        const tabelaAprovados = document.getElementById("tabelaAlunosAprovados");
        tabelaAprovados.innerHTML = "";
        this.alunos.filter(aluno => aluno.isAprovado()).forEach(aluno => {
            const row = tabelaAprovados.insertRow();
            row.insertCell(0).innerText = aluno.nome;
            row.insertCell(1).innerText = aluno.notaFinal;
        });
    }

    mediaNotas() {
        this.mostrarSecao("media");
        console.log("dentro da media de notas");
        const media = this.alunos.reduce((acumulador, aluno) => acumulador + aluno.notaFinal, 0) / this.alunos.length;
        document.getElementById("titulo-media").innerText = "Média das Notas Finais";
        document.getElementById("descricao-media").innerText = `A média é: ${media.toFixed(2)}`;
    }

    mediaIdades() {
        this.mostrarSecao("media");

        const media = this.alunos.reduce((acumulador, aluno) => acumulador + aluno.idade, 0) / this.alunos.length;
        document.getElementById("titulo-media").innerText = "Média das Idades";
        document.getElementById("descricao-media").innerText = `A média é: ${media.toFixed(2)}`;
    }

    nomesEmOrdemAlfabetica() {
        this.mostrarSecao("nomes-em-ordem");

        const listaNomes = document.getElementById("listaNomes");
        listaNomes.innerHTML = "";
        this.alunos.map(aluno => aluno.nome).sort().forEach(nome => {
            const li = document.createElement("li");
            li.innerText = nome;
            listaNomes.appendChild(li);
        });
    }

    quantidadeAlunosPorCurso() {
        this.mostrarSecao("quantidade-alunos-por-curso");

        const listaQuantidadePorCurso = document.getElementById("listaQuantidadePorCurso");
        listaQuantidadePorCurso.innerHTML = "";

        const quantidadePorCurso = this.alunos.reduce((acumulador, aluno) => {
            acumulador[aluno.curso] = (acumulador[aluno.curso] || 0) + 1;
            return acumulador;
        }, {});

        for (const [curso, quantidade] of Object.entries(quantidadePorCurso)) {
            const li = document.createElement("li");
            li.innerText = `Curso: ${curso} - Quantidade: ${quantidade}`;
            listaQuantidadePorCurso.appendChild(li);
        }
    }

    mostrarSecao(id) {
        document.querySelectorAll("section:not(#relatorios)").forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById(id).style.display = "block";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new AlunoController();
});