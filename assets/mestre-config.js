/* ============================================================
   MESTRE-CONFIG.JS — senha do painel da mestre
   ============================================================
   Senha usada só em mestre.html pra entrar no painel que lista
   todos os investigadores cadastrados (e permite excluir fichas).

   Importante: essa "senha" é só uma trava simples pra impedir que
   um jogador entre sem querer no painel — ela NÃO é uma segurança
   de verdade, porque fica visível pra qualquer um que abrir o
   código-fonte da página. Quem realmente pode ler/editar os dados
   no banco é controlado pelas policies do Supabase (ver
   supabase-schema.sql). Ainda assim, é o suficiente pra jogar com
   um grupo de amigos de confiança — ver a seção "Sobre segurança"
   no LEIA-ME.md.

   Troque o valor abaixo pela senha que você quiser usar.
   ------------------------------------------------------------ */
const SENHA_MESTRE = "depoisdasdunasduda";
