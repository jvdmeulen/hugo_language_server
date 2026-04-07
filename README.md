# Hugo Language Server

Een kleine Hugo-specifieke language server in TypeScript voor Markdown-contentbestanden in Neovim.

## Wat v1 doet

- diagnostics voor YAML-, TOML- en JSON-front matter
- waarschuwingen voor onbekende Hugo front matter keys
- eenvoudige typechecks voor veelgebruikte Hugo keys
- diagnostics voor ongeldige of onbekende Hugo shortcodes
- completion voor front matter keys en shortcode-namen

## Lokaal draaien

```bash
npm install
npm run build
node dist/src/server.js
```

## Neovim met `nvim-lspconfig`

```lua
local lspconfig = require("lspconfig")
local configs = require("lspconfig.configs")

if not configs.hugo_lsp then
  configs.hugo_lsp = {
    default_config = {
      cmd = { "node", "/ABSOLUTE/PATH/TO/hugo_language_server/dist/src/server.js" },
      filetypes = { "markdown" },
      root_dir = lspconfig.util.root_pattern("hugo.toml", "hugo.yaml", "hugo.yml", "config.toml", ".git"),
      single_file_support = true,
    },
  }
end

lspconfig.hugo_lsp.setup({})
```

Gebruik bij voorkeur Hugo-contentbestanden onder `content/*.md`.

## Testen

```bash
npm test
```
