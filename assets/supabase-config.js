/* ============================================================
   SUPABASE-CONFIG.JS — conexão com o banco de dados
   ============================================================
   Este arquivo cria o "supabaseClient", que é o objeto usado por
   TODAS as funções de banco de dados em assets/app.js (buscar,
   criar, atualizar e excluir investigador). Por isso ele precisa
   ser carregado:
     1) DEPOIS do script do Supabase
        (<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>),
        que é quem define "window.supabase";
     2) e ANTES de assets/app.js, que já usa "supabaseClient".

   SUPABASE_URL e SUPABASE_ANON_KEY vêm do painel do seu projeto no
   Supabase (Project Settings → API). A "anon key" é uma chave
   pública — ela não precisa (e não deve) ser secreta, pois quem
   controla o que essa chave pode ou não fazer são as "policies" de
   segurança configuradas no supabase-schema.sql (RLS). Ainda assim,
   não faz mal nenhum manter esse arquivo fora de repositórios
   totalmente públicos se você quiser mais privacidade.

   Se você for reaproveitar este site pra outro projeto de RPG,
   troque esses dois valores pelos do SEU projeto no Supabase —
   veja o passo 1 e 2 do LEIA-ME.md.
   ============================================================ */

const SUPABASE_URL = "https://neitjdsnybgxdbtzcbsh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5laXRqZHNueWJneGRidHpjYnNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5OTYxNDksImV4cCI6MjEwMjU3MjE0OX0.Z1LB3_0BM1GnxF-KjPnngvjDN8emGjXBCW2XEWDaqJ8";

// "supabaseClient" é a variável global usada em assets/app.js pra
// fazer todas as consultas (select/insert/update/delete) na tabela
// "investigadores".
const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
