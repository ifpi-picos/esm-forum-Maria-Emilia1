const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

// Limpa e reseta banco antes de cada teste
beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  bd.exec('DELETE FROM perguntas');
  bd.exec('DELETE FROM respostas');
});

test('Testando banco de dados vazio', async () => {
  const perguntas = await modelo.listar_perguntas();
  expect(perguntas.length).toBe(0);
});

test('Testando cadastro de três perguntas', async () => {
  await modelo.cadastrar_pergunta('1 + 1 = ?');
  await modelo.cadastrar_pergunta('2 + 2 = ?');
  await modelo.cadastrar_pergunta('3 + 3 = ?');

  const perguntas = await modelo.listar_perguntas();
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].texto).toBe('3 + 3 = ?');
  expect(perguntas[0].num_respostas).toBe(0); // pode verificar isso também
});

test('Deve retornar uma pergunta específica', async () => {
  await modelo.cadastrar_pergunta('Qual a capital do Brasil?');
  const todas = await modelo.listar_perguntas();
  const ultima = todas[todas.length - 1];

  const pergunta = await modelo.get_pergunta(ultima.id_pergunta);
  expect(pergunta.texto).toBe('Qual a capital do Brasil?');
});

test('Deve cadastrar e listar respostas de uma pergunta', async () => {
  await modelo.cadastrar_pergunta('Qual a cor do céu?');
  const perguntas = await modelo.listar_perguntas();
  const pergunta = perguntas[perguntas.length - 1];

  await modelo.cadastrar_resposta(pergunta.id_pergunta, 'Azul');
  const respostas = await modelo.get_respostas(pergunta.id_pergunta);

  expect(respostas.length).toBeGreaterThan(0);
  expect(respostas[0].texto).toBe('Azul');
});

test('Deve retornar o número de respostas de uma pergunta', async () => {
  await modelo.cadastrar_pergunta('Qual a capital do PI?');
  const perguntas = await modelo.listar_perguntas();
  const pergunta = perguntas[perguntas.length - 1];

  await modelo.cadastrar_resposta(pergunta.id_pergunta, 'Teresina');
  const total = await modelo.get_num_respostas(pergunta.id_pergunta);

  expect(total).toBe(1);
});