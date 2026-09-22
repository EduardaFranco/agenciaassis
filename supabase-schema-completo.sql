-- ============================================================
-- Rode este script inteiro no Supabase, em: SQL Editor > New query
-- Cria a tabela "investigadores" já com todas as colunas e
-- todas as políticas de acesso (ler, criar, atualizar, excluir).
-- ============================================================

-- 1) Tabela que guarda as fichas dos investigadores.
--    Cada linha = um investigador = um "código de acesso" único.
create table if not exists investigadores (
  id uuid primary key default gen_random_uuid(), -- identificador interno, gerado sozinho
  codigo text unique not null,     -- código de acesso (ex: "ASSIS-7F2K"), funciona como login/senha do jogador
  nome text,                       -- nome do investigador
  idade text,                      -- idade (texto livre, não precisa ser só número)
  especializacao text,             -- nome da especialização escolhida (ver ESPECIALIZACOES em assets/regras.js)
  historia text,                   -- texto livre da aba "História" na ficha
  memorias text,                   -- texto livre da aba "Memórias" na ficha
  inventario text,                 -- texto livre da aba "Inventário" na ficha
  avatar text default '',          -- foto de perfil, salva como base64 (string de texto grande)
  vida integer default 10,         -- pontos de vida atuais
  sanidade integer default 10,     -- pontos de sanidade atuais
  erosoes integer default 0,       -- pontos de "erosão" atuais (3º medidor da ficha)
  atributos jsonb default '{}'::jsonb, -- objeto tipo { "cor": 2, "men": 3, ... } — ver ATRIBUTOS em regras.js
  pericias jsonb default '[]'::jsonb,  -- lista tipo [{ "chave": "furtividade", "nome": "Furtividade", "bonus": 3 }, ...]
  created_at timestamptz default now() -- data/hora de criação, usada pra ordenar o painel da mestre
);

-- 2) Liga a segurança em nível de linha (RLS = Row Level Security).
--    Com RLS ligado, por padrão NINGUÉM consegue ler/escrever nada
--    na tabela — as "policies" abaixo é que abrem as permissões
--    específicas que o site precisa.
alter table investigadores enable row level security;

-- 3) Regras de acesso (policies).
--    Aviso importante: pra manter o site simples (sem login pra cada
--    jogador), qualquer pessoa com o link do seu site consegue ler,
--    criar, atualizar e excluir fichas usando a "chave anônima"
--    pública. O que protege as fichas na prática é o código de acesso
--    (tipo uma senha) e a senha do painel da mestre — não é uma
--    segurança de nível bancário, mas é o suficiente pra um grupo de
--    amigos jogando RPG. Se um dia você quiser algo mais robusto, dá
--    pra evoluir isso com Supabase Auth de verdade.

create policy "qualquer um pode ler investigadores"
  on investigadores for select
  using (true);

create policy "qualquer um pode criar investigador"
  on investigadores for insert
  with check (true);

create policy "qualquer um pode atualizar investigador"
  on investigadores for update
  using (true);

create policy "qualquer um pode excluir investigador"
  on investigadores for delete
  using (true);
