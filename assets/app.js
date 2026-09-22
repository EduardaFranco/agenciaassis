/* ============================================================
   APP.JS — funções compartilhadas entre as páginas do site
   ============================================================
   Este arquivo junta funções que mais de uma página usa: acesso
   ao banco de dados (Supabase), manipulação do código de acesso
   salvo no navegador, redimensionamento de foto e as ondinhas
   decorativas do rodapé.

   Ele depende de "supabaseClient", que é criado em
   assets/supabase-config.js — por isso supabase-config.js
   precisa vir ANTES deste arquivo no <script> das páginas HTML.
   ============================================================ */

/* ------------------------------------------------------------
   BANCO DE DADOS (Supabase) — investigadores
   ------------------------------------------------------------
   Todas as funções abaixo conversam com a tabela "investigadores"
   lá no Supabase (ver supabase-schema.sql pra ver como ela é
   criada). Cada linha da tabela é a ficha completa de um
   investigador, e o "codigo" (tipo ASSIS-7F2K) funciona como
   identificador único E como senha de acesso do jogador.
   ------------------------------------------------------------ */

// Gera um código de acesso novo, tipo "ASSIS-7F2K", e confere no
// banco se ele já não está em uso antes de devolver (pra nunca dar
// dois investigadores com o mesmo código). Tenta até 15 vezes antes
// de desistir — na prática isso quase nunca deve acontecer, já que
// o alfabeto usado tem várias combinações possíveis.
async function gerarCodigoAcessoUnico() {
  // Alfabeto sem O/0 e sem I/1, porque essas letras/números se
  // confundem facilmente quando o jogador copia o código à mão.
  const caracteres = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  for (let tentativa = 0; tentativa < 15; tentativa++) {
    let sufixo = "";
    for (let i = 0; i < 5; i++) {
      sufixo += caracteres[Math.floor(Math.random() * caracteres.length)];
    }
    const codigo = `ASSIS-${sufixo}`;
    // .maybeSingle() devolve "data: null" se não achar nenhuma linha
    // com esse código (em vez de dar erro), que é exatamente o que
    // queremos: código livre = pode usar.
    const { data } = await supabaseClient
      .from("investigadores")
      .select("codigo")
      .eq("codigo", codigo)
      .maybeSingle();
    if (!data) return codigo;
  }
  throw new Error("Não foi possível gerar um código único, tente de novo.");
}

// Busca a ficha de um investigador pelo código de acesso. Aceita
// o código em qualquer combinação de maiúsculas/minúsculas (sempre
// normaliza pra maiúsculo antes de comparar, já que é assim que
// os códigos são salvos no banco).
async function buscarInvestigadorPorCodigo(codigo) {
  const codigoNormalizado = codigo.trim().toUpperCase();
  const { data, error } = await supabaseClient
    .from("investigadores")
    .select("*")
    .eq("codigo", codigoNormalizado)
    .maybeSingle();
  if (error) throw error;
  return data; // null se não achar ninguém com esse código
}

// Busca TODOS os investigadores cadastrados, ordenados por data de
// criação (do mais antigo pro mais novo). Usado só no painel da
// mestre (mestre.html), pra listar todo mundo.
async function listarInvestigadores() {
  const { data, error } = await supabaseClient
    .from("investigadores")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data;
}

// Cria uma nova linha na tabela "investigadores" com os dados
// passados (nome, idade, atributos, etc. — ver o objeto "dados"
// montado em criar.html). Devolve a linha criada já com o "id" e
// "created_at" preenchidos pelo banco.
async function criarInvestigador(dados) {
  const { data, error } = await supabaseClient
    .from("investigadores")
    .insert(dados)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Atualiza os campos de um investigador já existente, localizando
// a linha pelo código de acesso dele. Usado quando o jogador (ou a
// mestre) edita a ficha em ficha.html.
async function atualizarInvestigador(codigo, dados) {
  const { data, error } = await supabaseClient
    .from("investigadores")
    .update(dados)
    .eq("codigo", codigo)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Apaga a linha do investigador com esse código. Só é chamada do
// painel da mestre (botão da lixeirinha em cada card de player).
async function excluirInvestigador(codigo) {
  const { error } = await supabaseClient
    .from("investigadores")
    .delete()
    .eq("codigo", codigo);
  if (error) throw error;
}

/* ------------------------------------------------------------
   CÓDIGO DE ACESSO SALVO NO NAVEGADOR
   ------------------------------------------------------------
   Pra o jogador não precisar redigitar o código toda vez que
   volta ao site, guardamos o último código usado no localStorage
   (armazenamento que fica só no navegador dele, não vai pro
   banco de dados nem é visto por ninguém mais).
   ------------------------------------------------------------ */
function salvarCodigoLocal(codigo) {
  localStorage.setItem("dunas_codigo_acesso", codigo);
}
function pegarCodigoLocal() {
  return localStorage.getItem("dunas_codigo_acesso");
}
function limparCodigoLocal() {
  localStorage.removeItem("dunas_codigo_acesso");
}

/* ------------------------------------------------------------
   FOTO DE PERFIL (avatar)
   ------------------------------------------------------------ */

// Recebe o arquivo de imagem escolhido pelo usuário (input type
// file), redimensiona pra no máximo "tamanhoMaximo" pixels no
// lado maior (mantendo a proporção) e devolve o resultado como uma
// string base64 (formato "data:image/jpeg;base64,...."), pronta
// pra ser salva direto na coluna "avatar" do banco. Isso evita
// guardar fotos gigantes (de celular, por exemplo, que podem ter
// vários MB) — reduzindo bastante o tamanho salvo.
function redimensionarImagem(arquivo, tamanhoMaximo = 300) {
  return new Promise((resolve, reject) => {
    // 1) Lê o arquivo escolhido como uma URL de dados (base64 bruto).
    const leitor = new FileReader();
    leitor.onload = (e) => {
      // 2) Carrega essa URL numa <img> só na memória (não aparece
      //    na tela), pra descobrir a largura/altura originais.
      const img = new Image();
      img.onload = () => {
        let largura = img.width;
        let altura = img.height;
        // Calcula o novo tamanho mantendo a proporção da imagem
        // original, limitando o maior lado a "tamanhoMaximo".
        if (largura > altura && largura > tamanhoMaximo) {
          altura = Math.round((altura * tamanhoMaximo) / largura);
          largura = tamanhoMaximo;
        } else if (altura > tamanhoMaximo) {
          largura = Math.round((largura * tamanhoMaximo) / altura);
          altura = tamanhoMaximo;
        }
        // 3) Desenha a imagem redimensionada num <canvas> invisível...
        const canvas = document.createElement("canvas");
        canvas.width = largura;
        canvas.height = altura;
        canvas.getContext("2d").drawImage(img, 0, 0, largura, altura);
        // 4) ...e exporta o conteúdo do canvas como JPEG (qualidade
        //    85%), já em base64, pronto pra salvar no banco.
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    leitor.onerror = reject;
    leitor.readAsDataURL(arquivo);
  });
}

/* ------------------------------------------------------------
   MENSAGENS DE ERRO/SUCESSO/INFO NA TELA
   ------------------------------------------------------------
   Toda página tem uma <div id="mensagem" class="mensagem"> que
   fica escondida até ter algo a avisar. Esta função centraliza
   como preencher e mostrar essa caixinha.
   "tipo" pode ser "erro" (vermelho), "sucesso" (verde) ou "info"
   (azul claro) — ver as classes .mensagem.erro/.sucesso/.info em
   assets/style.css.
   ------------------------------------------------------------ */
function mostrarMensagem(elemento, texto, tipo = "erro") {
  elemento.textContent = texto;
  elemento.className = `mensagem ${tipo}`;
  // Se o texto vier vazio, esconde a caixinha de novo (usado pra
  // "limpar" mensagens antigas ao trocar de passo/aba).
  elemento.style.display = texto ? "block" : "none";
}

/* ------------------------------------------------------------
   NÉVOA DECORATIVA DE FUNDO
   ------------------------------------------------------------
   Um SVG fixo no rodapé da tela, presente em toda página (cada
   página chama inserirOndas() logo no início do seu <script>).
   Fica só decorativo, sem nenhuma interação — dá o clima de
   escritório noturno, névoa baixa passando pela rua da agência.
   (Mantivemos o nome da função/variável "ondas" só por
   comodidade no código — visualmente já não são mais ondas.)
   ------------------------------------------------------------ */
const ONDAS_SVG = `
<svg viewBox="0 0 1440 220" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style="width:100%;height:180px;display:block;">
  <path d="M0,90 C240,150 480,30 720,70 C960,110 1200,40 1440,90 L1440,220 L0,220 Z" fill="#B08D57" opacity="0.18"/>
  <path d="M0,130 C240,180 480,110 720,140 C960,170 1200,110 1440,140 L1440,220 L0,220 Z" fill="#0A0910" opacity="0.65"/>
</svg>`;

function inserirOndas() {
  const container = document.createElement("div");
  container.className = "ondas";
  container.innerHTML = ONDAS_SVG;
  document.body.appendChild(container);
}
