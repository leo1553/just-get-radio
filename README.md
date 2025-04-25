## Just Get Radio!

Just Get Radio! é uma simples plataforma de músicas, onde é possível buscar por músicas e criar playlists. Para que seja possível criar as playlists o usuário não necessita estar "autenticado", pois a autenticação não é o foco do desafio.

### Objetivos

A proposta é criar uma plataforma de streaming de **música** ou vídeos, com foco no *gerenciamento de playlists* e uma *API funcional*.

O que esperamos:

- [x] Frontend (React, **Angular** ou Vue.js)
- [x] Backend (**NodeJS** ou Python)
- [x] **Banco de dados relacional** ou NoSQL com relacionamentos entre entidades
- [ ] Docker
- [x] Git com Gitflow
- [ ] Testes com mínimo de 25% de cobertura (unitários e integração)
- [ ] `gerenciamento de playlists`
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
- [ ] Criar playlists
  - Criar tabelas de playlists
  - Adicionar telas para criar, deletar e modificar playlists
  - Ajusta busca para exibir playlists
- [ ] Adicionar build com Docker
  - Configurar nginx para distribuir os arquivos estáticos
- [ ] Adicionar testes unitários
- [ ] Adicionar documentação
