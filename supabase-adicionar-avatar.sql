-- Rode este script no SQL Editor do Supabase (Create a new snippet) SE
-- você já tinha criado a tabela "investigadores" antes da função de foto
-- existir. Se você está criando o projeto do zero agora, não precisa
-- rodar este arquivo — já está incluído no supabase-schema.sql.

alter table investigadores
  add column if not exists avatar text default '';
