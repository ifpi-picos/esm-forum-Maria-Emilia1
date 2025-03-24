const perguntas = [
    { id_pergunta: 1, texto: "Qual a capital de MG?", id_usuario: 1 },
    { id_pergunta: 2, texto: "Qual a capital de RJ?", id_usuario: 1 },
    { id_pergunta: 3, texto: "Qual a capital de SP?", id_usuario: 1 }
];

const num_respostas_map = {
    1: 5,
    2: 10,
    3: 15
};

module.exports = {
    async recuperar_todas_perguntas() {
        return perguntas;
    },

    async recuperar_num_respostas(id_pergunta) {
        return num_respostas_map[id_pergunta] || 0;
    },


    async recuperar_pergunta(id) { return null; },
    async recuperar_todas_respostas(id) { return []; },
    async criar_pergunta(texto) { },
    async criar_resposta(id, texto) { }
};