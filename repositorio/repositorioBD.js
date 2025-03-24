const bd = require('../bd/bd_utils.js');

module.exports = {
    async recuperar_todas_perguntas() {
        return await bd.queryAll('SELECT * FROM perguntas');
    },

    async recuperar_num_respostas(id_pergunta) {
        const resultado = await bd.query(
            'SELECT COUNT(*) as n FROM respostas WHERE id_pergunta = ?',
            [id_pergunta]
        );
        return resultado[0].n;
    },

};
