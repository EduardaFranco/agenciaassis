/* ============================================================
   REGRAS.JS — "motor de regras" do RPG
   ============================================================
   Este arquivo é o ÚNICO lugar que você precisa mexer pra ajustar
   as regras do seu jogo (atributos, perícias, especializações e
   os números da criação de personagem). Todas as páginas do site
   (criar.html, ficha.html) leem essas listas daqui — então uma
   mudança aqui se reflete automaticamente em todo o site.

   Tudo isso é guardado dentro de "window.REGRAS_JOGO" lá no final
   do arquivo, que é como as outras páginas conseguem "importar"
   essas informações (veja a linha
   "const { ATRIBUTOS, PERICIAS, ... } = window.REGRAS_JOGO;"
   no <script> de criar.html e ficha.html).
   ============================================================ */

// A "IIFE" (function () { ... })() aqui embaixo é só uma forma de
// isolar as variáveis deste arquivo, pra elas não vazarem soltas
// pro resto da página (evita bagunçar o "window" com nomes como
// ATRIBUTOS, PERICIAS etc. — só window.REGRAS_JOGO fica exposto).
(function () {

/* ------------------------------------------------------------
   ATRIBUTOS
   ------------------------------------------------------------
   São os 4 "circulozinhos" que aparecem na ficha e na criação.
   Cada perícia (lá embaixo) está ligada a um desses atributos,
   e o valor do atributo vira o bônus base daquela perícia.

   Campos de cada atributo:
   - chave: identificador curto usado internamente no código e
     salvo no banco de dados (não mude depois que já tiver gente
     jogando, ou as fichas antigas ficam com a chave errada).
   - label: sigla mostrada dentro do círculo na tela (3 letras).
   - nome: nome completo do atributo.
   - descricao: texto curto mostrado como legenda pros players
     entenderem pra que serve cada atributo (aparece embaixo da
     grade de atributos em criar.html e ficha.html).
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
   ------------------------------------------------------------
   São as habilidades específicas que aparecem na ficha (ex:
   "Furtividade", "Dedução"). Cada perícia pertence a um dos
   atributos acima (campo "atributo", que deve bater com uma das
   "chave" da lista ATRIBUTOS) — isso é usado tanto pra calcular o
   bônus quanto pra decidir qual especialização dá bônus grátis
   em qual perícia.

   Campos de cada perícia:
   - chave: identificador interno (não mude depois de já ter
     fichas salvas com essa perícia).
   - nome: nome mostrado na tela.
   - atributo: a qual atributo essa perícia está ligada.
   - descricao: texto curto explicando pra que ela serve, mostrado
     como legenda embaixo da grade de perícias.
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
   ------------------------------------------------------------
   O "tipo" de investigador que o player escolhe no passo 1 da
   criação (select "Especialização"). Cada especialização:
   - dá um bônus extra de atributo (REGRAS.bonusAtributoEspecializacao)
     que já entra automaticamente no total de pontos a distribuir;
   - dá uma perícia "grátis" com esse mesmo bônus, travada (o
     player não escolhe — ela já vem marcada e soma o bônus
     automaticamente, ver "periciaGratis" em criar.html).

   Campos de cada especialização:
   - nome: mostrado no <select> e salvo na ficha do investigador.
   - periciaBonus: a "chave" (ver PERICIAS acima) da perícia que
     ganha o bônus grátis dessa especialização.
   - descricao: texto mostrado abaixo do <select> quando o player
     escolhe essa especialização (também aparece no botão
     "Especialização" da ficha já pronta).
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
   ------------------------------------------------------------
   Números soltos que controlam a criação de personagem e os
   valores iniciais da ficha. Mude aqui se quiser um jogo mais
   "brutal" (vida menor), personagens mais versáteis (mais pontos
   de perícia) etc.
   ------------------------------------------------------------ */
const REGRAS = {
  vidaBase: 10,       // vida inicial de todo investigador recém-criado
  sanidadeBase: 10,   // sanidade inicial
  erosoesBase: 0,     // "erosões" iniciais (o 3º medidor da ficha, além de vida/sanidade)

  pontosAtributosBase: 10,        // pontos pra distribuir entre os 4 atributos na criação
  maxPorAtributo: 5,              // valor máximo que um atributo pode ter (sem contar bônus de especialização)
  bonusAtributoEspecializacao: 2, // pontos extras de atributo (e de perícia) que a especialização escolhida dá de graça

  numeroPericiasEscolhidas: 3, // quantas perícias (além da que a especialização já dá de graça) o player escolhe pra ganhar bônus na criação
};

/* ------------------------------------------------------------
   Exporta tudo isso pra "window.REGRAS_JOGO", que é o jeito das
   outras páginas acessarem essas listas (elas incluem este
   arquivo com <script src="assets/regras.js"></script> antes do
   próprio <script> delas).
   ------------------------------------------------------------ */
window.REGRAS_JOGO = { ATRIBUTOS, PERICIAS, ESPECIALIZACOES, REGRAS };

})();
