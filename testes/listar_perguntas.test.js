const modelo = require('../modelo.js');
const repositorioMemoria = require('../repositorio/repositorioMemoria');

beforeAll(() => {
    modelo.reconfig_repositorio(repositorioMemoria);
});

test('Testando listar três perguntas', async () => {
    const perguntas = await modelo.listar_perguntas();

    expect(perguntas.length).toBe(3);
    expect(perguntas[0].texto).toBe('Qual a capital de MG?');
    expect(perguntas[1].texto).toBe('Qual a capital de RJ?');
    expect(perguntas[2].texto).toBe('Qual a capital de SP?');
    expect(perguntas[0].num_respostas).toBe(5);
    expect(perguntas[1].num_respostas).toBe(10);
    expect(perguntas[2].num_respostas).toBe(15);
});