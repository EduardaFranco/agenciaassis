
(function () {

/* ------------------------------------------------------------
   ATRIBUTOS
   ------------------------------------------------------------ */
const ATRIBUTOS = [
  {
    chave: "cor",
    label: "COR",
    nome: "Corpo",
    descricao: "Força física, resistência e vigor do investigador — o quanto ele aguenta na base do braço.",
  },
  {
    chave: "men",
    label: "MEN",
    nome: "Mente",
    descricao: "Raciocínio, memória e capacidade de juntar informações complexas.",
  },
  {
    chave: "pre",
    label: "PRE",
    nome: "Presença",
    descricao: "Como o investigador se porta, se expressa e enxerga o que acontece à sua volta.",
  },
  {
    chave: "von",
    label: "VON",
    nome: "Vontade",
    descricao: "Força mental, disciplina e resistência emocional diante do medo e da pressão.",
  },
];

/* ------------------------------------------------------------
   PERICIAS
   ------------------------------------------------------------ */
const PERICIAS = [
  {
    chave: "percepcao",
    nome: "Percepção",
    atributo: "pre",
    descricao: "Notar detalhes, sons e movimentos ao redor antes que passem despercebidos.",
  },
  {
    chave: "furtividade",
    nome: "Furtividade",
    atributo: "pre",
    descricao: "Se mover sem ser visto ou ouvido, e se esconder na hora certa.",
  },
  {
    chave: "persuasao",
    nome: "Persuasão",
    atributo: "pre",
    descricao: "Convencer, negociar ou arrancar informações de alguém numa conversa.",
  },
  {
    chave: "pontaria",
    nome: "Pontaria",
    atributo: "cor",
    descricao: "Acertar alvos à distância, seja com arma de fogo ou por arremesso.",
  },
  {
    chave: "confronto",
    nome: "Confronto",
    atributo: "cor",
    descricao: "Lutar corpo a corpo e se sair bem em embates físicos diretos.",
  },
  {
    chave: "resistencia",
    nome: "Resistência",
    atributo: "cor",
    descricao: "Aguentar ferimentos, cansaço e condições adversas sem desistir.",
  },
  {
    chave: "rastreio",
    nome: "Rastreio",
    atributo: "cor",
    descricao: "Seguir pistas físicas no terreno, como pegadas e sinais de passagem.",
  },
  {
    chave: "reflexos",
    nome: "Reflexos",
    atributo: "cor",
    descricao: "Reagir rápido a perigos repentinos, como desviar ou se esquivar a tempo.",
  },
  {
    chave: "pericia",
    nome: "Perícia",
    atributo: "men",
    descricao: "Conhecimento técnico e prático: tecnologia, ferramentas e procedimentos especializados.",
  },
  {
    chave: "observacao",
    nome: "Observação",
    atributo: "men",
    descricao: "Analisar cenas e objetos com atenção, encontrando o que não é óbvio à primeira vista.",
  },
  {
    chave: "deducao",
    nome: "Dedução",
    atributo: "men",
    descricao: "Conectar pistas e informações soltas pra chegar a uma conclusão lógica.",
  },
  {
    chave: "historia",
    nome: "História",
    atributo: "men",
    descricao: "Lembrar ou pesquisar fatos, registros e histórias do passado.",
  },
  {
    chave: "resiliencia",
    nome: "Resiliência",
    atributo: "von",
    descricao: "Se recuperar emocionalmente de traumas e situações difíceis.",
  },
  {
    chave: "vontade",
    nome: "Vontade",
    atributo: "von",
    descricao: "Resistir a manipulação, medo e influências estranhas ou sobrenaturais.",
  },
  {
    chave: "autocontrole",
    nome: "Autocontrole",
    atributo: "von",
    descricao: "Manter a calma e agir com a cabeça no lugar mesmo sob pressão.",
  },
];

/* ------------------------------------------------------------
   ESPECIALIZACOES
   ------------------------------------------------------------ */
const ESPECIALIZACOES = [
  {
    nome: "Paisana",
    periciaBonus: "furtividade",
    descricao: "Seguir pessoas, entrar em lugares sem ser percebido e se disfarçar são sua especialidade.",
  },
  {
    nome: "Paparazzi",
    periciaBonus: "observacao",
    descricao: "Observar pessoas e registrar detalhes que ninguém mais vê é uma ótima habilidade.",
  },
  {
    nome: "Matrimonial",
    periciaBonus: "persuasao",
    descricao: "Descobrir traições e descobrir relacionamentos, sabe bem como persuadir alguém atrás de informações!",
  },
  {
    nome: "Investigador",
    periciaBonus: "deducao",
    descricao: "Encontrar pistas e reconstruir acontecimentos é o trabalho de um investigador.",
  },
  {
    nome: "Tecnologia",
    periciaBonus: "pericia",
    descricao: "Invadir sistemas, celulares, computadores e tudo que existe de tecnológico por aí.",
  },
  {
    nome: "Rastreador",
    periciaBonus: "rastreio",
    descricao: "Seguir rastros, encontrar pessoas e se orientar em lugares difíceis.",
  },
  {
    nome: "Intimidador",
    periciaBonus: "confronto",
    descricao: "Tem experiência em situações de confronto e interrogatórios mais agressivos."
  },
];

/* ------------------------------------------------------------
   REGRAS
   ------------------------------------------------------------ */
const REGRAS = {
  vidaBase: 10,       // vida inicial de todo investigador recém-criado
  sanidadeBase: 10,   // sanidade inicial
  erosoesBase: 0,     // "erosões" iniciais (o 3º medidor da ficha, além de vida/sanidade)

  pontosAtributosBase: 10,        // pontos pra distribuir entre os 4 atributos na criação
  maxPorAtributo: 5,              // valor máximo que um atributo pode ter (sem contar bônus de especialização)
  bonusAtributoEspecializacao: 2, // pontos extras de atributo (e de perícia) que a especialização escolhida dá de graça

  numeroPericiasEscolhidas: 5, // quantas perícias (além da que a especialização já dá de graça) o player escolhe pra ganhar bônus na criação
};

window.REGRAS_JOGO = { ATRIBUTOS, PERICIAS, ESPECIALIZACOES, REGRAS };

})();
