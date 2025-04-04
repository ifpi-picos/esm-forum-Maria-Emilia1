let repositorio = require('./repositorio/repositorio_bd.js');

function reconfig_repositorio(novo_repositorio) {
  repositorio = novo_repositorio;
}

async function listar_perguntas() {
  const perguntas = await repositorio.recuperar_todas_perguntas();

  for (const pergunta of perguntas) {
    pergunta.num_respostas = await repositorio.recuperar_num_respostas(pergunta.id_pergunta);
  }

  return perguntas;
}

async function cadastrar_pergunta(texto) {
  await repositorio.criar_pergunta(texto, 1); // fixo id_usuario = 1
}

async function cadastrar_resposta(id_pergunta, texto) {
  await repositorio.criar_resposta(id_pergunta, texto);
}

async function get_pergunta(id_pergunta) {
  return await repositorio.recuperar_pergunta(id_pergunta);
}

async function get_respostas(id_pergunta) {
  return await repositorio.recuperar_todas_respostas(id_pergunta);
}

async function get_num_respostas(id_pergunta) {
  return await repositorio.recuperar_num_respostas(id_pergunta);
}

module.exports = {
  reconfig_repositorio,
  listar_perguntas,
  cadastrar_pergunta,
  cadastrar_resposta,
  get_pergunta,
  get_respostas,
  get_num_respostas
};