
# App youtube search

Um projeto onde podemos buscar um vídeo no youtube, assistir o vídeo na própria página e adicionar esse vídeo como favorito.

O projeto foi criado com seu backend em Node e todo seu front end com JavaScript puro, HTML e CSS pensado para diversas telas.

Temos a possíbilidade de navegar entre telas sendo 3 rotas:
- **/app**
- **/videos**
- **/favoritos**


## Instalação

Faça o **download** do projeto ou faça um **fork** do projeto, com o projeto na sua máquina devemos primeiro fazer as instalações do npm:

```bash
  npm install
```

Este primeiro comando deve ser rodado dentro do diretório raiz do projeto **/app-youtube-videos**:

Vamos instalar as dependências para cada um dos backends
```bash
    cd bff/videos
    npm install

    cd ../favorites
    npm install
```

Projeto instalado corretamente na sua máquina, agora é importante que o **aplicativo do Docker** esteja aberto na sua máquina para que possamos gerar os containers:
```bash
    cd ../..
    docker-compose build --no-cache
    docker-compose up
```

Nos comandos acima vamos primeiro sair do diretório que estavamos **bff/favorites** e ir para o diretório raiz do projeto e depois disso vamos fazer o build do nosso projeto sem carregar nenhum cache, após o build feito subimos nosso container.

Podemos acessar nossa aplicação pelo link: 
http://localhost/app
## Testes

Para rodar os testes no projeto é muito simples, certifiques se de estar na pasta raiz do projeto **/app-youtube-videos** e rode o comando

```bash
  npm test
```

Os testes foram feitos com utilizando Jest.
## Tecnologias

**Client:** HTML, CSS, JavaScript

**Server:** Node, Express, Docker

**Test:** Jest


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/gabrielsouzaleite)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gabriel-souza-leite-41768b1b5/)

