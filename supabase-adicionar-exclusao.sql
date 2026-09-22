-- Rode este script no SQL Editor do Supabase (Create a new snippet).
-- Ele libera a mestre pra excluir fichas de investigadores pelo painel.
-- Sem essa política, o Supabase bloqueia qualquer tentativa de exclusão
-- (mesma lógica de segurança das políticas de leitura/criação/atualização
-- que já estão no supabase-schema.sql).

create policy "qualquer um pode excluir investigador"
  on investigadores for delete
  using (true);
