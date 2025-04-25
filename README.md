## Just Get Radio!

Just Get Radio! é uma simples plataforma de músicas, onde é possível buscar por músicas, toca-las e adiciona-las à playlists. Para que seja possível gerenciar as playlists o usuário não necessita estar "autenticado", pois a autenticação não é o foco do desafio.

### Objetivos

A proposta é criar uma plataforma de streaming de **música** ou vídeos, com foco no *gerenciamento de playlists* e uma *API funcional*.

O que esperamos:

- [x] Frontend (React, **Angular** ou Vue.js)
- [x] Backend (**NodeJS** ou Python)
- [x] **Banco de dados relacional** ou NoSQL com relacionamentos entre entidades
- [x] Docker
- [x] Git com Gitflow
- [ ] Testes com mínimo de 25% de cobertura (unitários e integração)
- [x] `gerenciamento de playlists`
- [x] `API funcional`

Extra (opcional):
- [x] Consumir uma API externa (ex: letras, capas de álbuns, artistas) e exibir na interface

### Referências

- Jet Set Radio!
- API para busca das músicas: https://www.theaudiodb.com/api_guide.php
- Paleta de cores: https://colorify.rocks/palette/jet-set-radio

### Roadmap

- [x] Página inicial
  - Logo ao meio
  - Barra de pesquisa para buscar músicas
- [x] Página de músicas
  - Adicionar banco de dados SQLite
  - Busca as músicas do backend
- [x] Barra de música
  - Exibir nome da música e autor
  - Botões de play/pausa, controle de volume, proxima música
- [x] Criar playlists
  - Criar tabelas de playlists
  - Adicionar telas para criar, deletar e modificar playlists
  - Ajusta busca para exibir playlists
- [x] Adicionar documentação
- [x] Adicionar build com Docker
  - Configurar nginx para distribuir os arquivos estáticos
- [ ] Adicionar testes unitários e de integração

### Dependências

**Geral**<br>
- Node 18.20.18
- Python
- Microsoft Visual Studio
- Docker

**jgr-frontend**<br>
- [Angular 19](https://angular.dev/overview)
- [YouTube Player API](https://developers.google.com/youtube/iframe_api_reference)

**jgr-backend**<br>
- [NestJS 10](https://docs.nestjs.com/)
- axios
- typeorm
- better-sqlite3
- swagger

### Instalação

Para instalar o projeto, utilize `pnpm install` na pasta raiz. Para que o backend possa ser inicializado, é necessário compilar o binário da biblioteca `better-sqlite3` que necessita de Python e um compilador de C. Em Windows, é necessário ter o Microsoft Visual Studio com as ferramentas de desenvolvimento de C++ instalado.

Para iniciar o ambiente de desenvolvimento, utilize `pnpm dev` e acesse `http://localhost:4200`.

Para iniciar o ambiente produtivo, utilize `pnpm start` e acesse `http://localhost`.

### Banco de Dados

O banco de dados utilizado foi o SQLite, um banco de dados relacional em arquivo. A estrutura do banco de dados é definita através das classes de entidade gerenciadas pelo TypeORM.

As tabelas existentes são:

- `artist_entity`: cache de artistas para não consultar a api externa desnecessáriamente
- `music_video_entity`: cache de vídeos de música para não consultar a api externa desnecessáriamente e poder filtrar de acordo com a necessidade
- `playlist_entity`: playlists criadas pelos usuários
- `playlist_entity_songs_music_video_entity`: tabela relacional entre playlists e vídeos de música

### API

A documentação da API é gerada automaticamente pelo swagger. Para vê-la basta iniciar o servidor e acessar `http://localhost:3000/swagger`.

### APIs externas

A API aberta [The Audio DB](https://www.theaudiodb.com/api_guide.php) possui limitações para os usuários gratuitos. É limitado a busca de artistas para apenas "coldplay" e é possível apenas realizar buscas pelos vídeos de artistas cujo ID já foi descoberto. Portanto, não é possível realizar buscas pelas músicas de artistas que não estão cacheados na base de dados. 

Para testes, por favor inserir os seguintes registros na base de dados:

```sql
INSERT INTO artist_entity (idArtist, strArtist)
VALUES
  (111564, 'Muse'),
  (111507, 'Red Hot Chili Peppers'),
  (112016, 'The Killers'),
  (111358, 'Linkin Park'),
  (111279, 'Metallica'),
  (111644, 'Arctic Monkeys');
```

### Docker

Foram criados dois containers:

- Um proxy reverso `nginx` para distribuír os arquivos estáticos do frontend e rotear as requisições da API ao servidor
- Um servidor NestJS com conexão ao banco de dados SQLite e as APIs externas

### Observações finais

Bastante código foi desenvolvido e, por questões de tempo, débitos técnicos foram sendo anotados. Tais débitos podem ser encontrados ao buscar por palavras TODO no código fonte.
