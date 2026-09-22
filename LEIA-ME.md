
## 1. Criando o banco de dados no Supabase

1. Vá em [supabase.com](https://supabase.com) e crie uma conta grátis.
2. Clique em **New project**, dê um nome (ex: `assis-detetives`) e uma senha
   de banco (guarde essa senha em algum lugar, mas ela não é usada no site).
3. Espere o projeto terminar de ser criado (leva ~1 minuto).
4. No menu lateral, vá em **SQL Editor** → **New query**.
5. Abra o arquivo `supabase-schema.sql` (está junto com o site), copie tudo,
   cole no editor e clique em **Run**. Isso cria a tabela `investigadores`.
6. Vá em **Project Settings** (ícone de engrenagem) → **API**.
7. Copie o valor de **Project URL** e o valor de **anon public** (uma chave
   longa).

## 2. Conectar o site ao banco

1. Abra o arquivo `assets/supabase-config.js`.
2. Coloque sua Project URL copiada do Supabase.
3. Coloque sua anon key copiada do Supabase.
4. Salve o arquivo.

## 3. Ajustar as regras do seu RPG

Abra `assets/regras.js` e edite:
- **ESPECIALIZACOES**: troque pelas especializações reais do seu jogo.
- **PERICIAS**: já vem com as 12 perícias; edite
  se quiser adicionar, remover ou trocar o atributo de alguma.
- **REGRAS**: pontos de vida/sanidade inicial, quantos pontos de atributo e
  de perícia cada investigador recebe, etc.

## 4. Trocar a senha do painel da mestre

Abra `assets/mestre-config.js` adicione a senha que você
quiser usar pra entrar no seu próprio painel.

## 5. Publicar no GitHub Pages

1. Crie um repositório novo no GitHub (pode ser privado ou público).
2. Faça upload de **todos** os arquivos e pastas deste projeto pra esse
   repositório (pode arrastar e soltar na página do GitHub, em "Add file" →
   "Upload files").
3. Vá em **Settings** → **Pages** do repositório.
4. Em **Source**, escolha a branch `main` e a pasta `/ (root)`. Salve.
5. Espere 1-2 minutos. O GitHub vai te dar um link tipo:
   `https://seu-usuario.github.io/nome-do-repositorio/`

## 6. Testar

1. Abra o link do GitHub Pages.
2. Clique em **Criar investigador** e crie uma ficha de teste.
3. Anote o código gerado (tipo `ASSIS-7F2K3`).
4. Volte à página inicial, clique em **Acessar investigador** e entre com
   esse código — sua ficha deve aparecer.
5. Clique em **Sou a mestre** no rodapé, entre com a senha que você definiu,
   e veja se a ficha aparece na lista.

## 7. Mandar pros seus players

Manda o link principal do site (`.../index.html` ou só a pasta, que abre o
`index.html` automaticamente). Cada player clica em **Criar investigador**,
preenche a ficha, e recebe um código de acesso único — é esse código que ele
vai guardar pra acessar e editar a ficha dele depois.

## Sobre segurança (leia com calma)

Pra manter o site simples e sem exigir cadastro/login de cada jogador, o
banco de dados fica com regras abertas: qualquer pessoa que tenha o link do
seu site tecnicamente consegue ler ou editar fichas usando ferramentas de
programador (não é algo que um jogador comum vá fazer sem querer). O que
protege as fichas no uso normal é:
- o **código de acesso** de cada investigador (funciona como senha);
- a **senha do painel da mestre**.

Isso é adequado pra jogar com um grupo de amigos de confiança.
