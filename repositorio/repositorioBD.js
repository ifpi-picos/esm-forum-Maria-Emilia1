const bd = require('../bd/bd_utils.js');

module.exports = {
    async recuperar_todas_perguntas() {
        return await bd.queryAll('SELECT * FROM perguntas');
    },

    async recuperar_pergunta(id_pergunta) {
        return await bd.query('SELECT * FROM perguntas WHERE id_pergunta = ?', [id_pergunta]);
    },

    async recuperar_todas_respostas(id_pergunta) {
        return await bd.queryAll('SELECT * FROM respostas WHERE id_pergunta = ?', [id_pergunta]);
    },

    async recuperar_num_respostas(id_pergunta) {
        const resultado = await bd.query('SELECT COUNT(*) as n FROM respostas WHERE id_pergunta = ?', [id_pergunta]);
        return resultado.n;
    },

    async criar_pergunta(texto) {
        return await bd.exec('INSERT INTO perguntas (texto, id_usuario) VALUES (?, ?)', [texto, 1]);
    },

    async criar_resposta(id_pergunta, texto) {
        return await bd.exec('INSERT INTO respostas (id_pergunta, texto) VALUES (?, ?)', [id_pergunta, texto]);
    }
};