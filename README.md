# tracks

Organize suas músicas mais tocadas do Spotify em playlists personalizadas usando IA.

## Como funciona

O app segue um fluxo de 3 etapas:

1. **Conectar contas** — informe seu Spotify Bearer Token e sua chave da API da Anthropic
2. **Criar playlists** — defina as playlists que você quer (nome, vibe, nível de energia)
3. **Ver resultados** — a IA categoriza suas 50 músicas mais tocadas e cria as playlists no seu Spotify

## Tecnologias

- HTML, CSS e JavaScript puro (sem frameworks)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api) — busca top tracks e cria playlists
- [Anthropic API](https://docs.anthropic.com) (Claude) — categoriza as músicas com base nas descrições das playlists

## Configuração

O projeto roda diretamente no browser — não há build step nem dependências para instalar. Basta abrir o `index.html`.

> **Recomendado:** use um servidor local para evitar restrições de CORS em alguns browsers.
> ```bash
> npx serve .
> # ou
> python3 -m http.server
> ```

### Credenciais necessárias

**Spotify Bearer Token**
1. Acesse o [Spotify Developer Console](https://developer.spotify.com/console/get-current-user-top-artists-and-tracks/)
2. Clique em **Get Token**
3. Selecione os escopos `user-top-read` e `playlist-modify-private`
4. Copie o token gerado

**Anthropic API Key**
1. Acesse [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)
2. Crie uma nova chave e copie

> As credenciais são armazenadas apenas na `sessionStorage` do browser e descartadas ao fechar a aba.

## Estrutura

```
├── index.html      # Passo 1 — autenticação
├── setup.html      # Passo 2 — configurar playlists
├── result.html     # Passo 3 — processar e exibir resultados
├── css/
│   └── style.css
└── js/
    ├── spotify.js  # Cliente da Spotify Web API
    └── llm.js      # Integração com a API da Anthropic
```

---

Feito por [AI CRLab](https://www.aicrlab.com/)
