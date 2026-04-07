# It's a codex/openai test/slop project
because i couldn't find anything




# Hugo Language Server

A Hugo-focused language server written in TypeScript. It runs over stdio and is intended to be used locally from Neovim, especially with `nvim-lspconfig` on Neovim 0.11+.

This project is server-first: it is not a Mason package yet and does not require a separate Neovim plugin.

## Features

- Hugo project detection from `hugo.toml`, `hugo.yaml`, `hugo.yml`, `config.toml`, `config/_default/*`, `layouts`, and workspace roots.
- Custom `contentDir` support, including content directories outside the Hugo project root.
- Markdown content diagnostics for YAML, TOML, and JSON front matter.
- Front matter validation for known Hugo fields such as `date`, `draft`, `aliases`, `resources`, `cascade`, and `params`.
- Custom front matter params are allowed, because Hugo exposes them through `.Params`.
- Optional warnings for custom front matter params that are not found in scanned templates.
- Shortcode diagnostics for unknown shortcodes, delimiter mismatches, and mismatched closing tags.
- Project shortcode discovery from `layouts/shortcodes/**/*.html`.
- Named shortcode parameter validation by scanning shortcode templates for `.Get "param"` / `.Get \`param\``.
- Template diagnostics for delimiter mismatches and block structure such as `if`, `with`, `range`, `define`, `block`, `else`, and `end`.
- Template diagnostics for unused local variables and undefined local variables.
- Partial diagnostics for unknown `partial` / `partialCached` calls.
- Completion for front matter keys, shortcodes, partial names, Hugo template functions, Hugo methods, and context-aware receiver methods such as `.Site.*` and `.Paginator.*`.
- Hover documentation for front matter, shortcodes, partials, Hugo template functions, methods, and objects.
- Official Hugo docs datasets generated from `gohugo.io` for method/function hover and completion, including docs links and version notes when the official page states a version.
- Go to definition for shortcode usages and partial calls.
- File watching for Hugo config, layouts, and content files so open buffers can be revalidated when project files change.

## Install

```bash
npm install
npm run build
```

You can run the server manually with:

```bash
node /ABSOLUTE/PATH/TO/hugo_language_server/dist/src/server.js
```

## Neovim 0.11+ Setup

For Neovim 0.11+, use `vim.lsp.config` instead of the deprecated `require("lspconfig").server.setup()` custom-server flow.

```lua
vim.lsp.config("hugo_lsp", {
  cmd = { "node", "/ABSOLUTE/PATH/TO/hugo_language_server/dist/src/server.js" },
  filetypes = { "markdown", "html" },
  root_markers = {
    "hugo.toml",
    "hugo.yaml",
    "hugo.yml",
    "config.toml",
    ".git",
  },
  single_file_support = true,
})

vim.lsp.enable("hugo_lsp")
```

Use `markdown` for content files and `html` for Hugo templates under `layouts/**/*.html`.

## lazy.nvim Example

```lua
return {
  "neovim/nvim-lspconfig",
  config = function()
    vim.lsp.config("hugo_lsp", {
      cmd = { "node", "/ABSOLUTE/PATH/TO/hugo_language_server/dist/src/server.js" },
      filetypes = { "markdown", "html" },
      root_markers = {
        "hugo.toml",
        "hugo.yaml",
        "hugo.yml",
        "config.toml",
        ".git",
      },
      single_file_support = true,
    })

    vim.lsp.enable("hugo_lsp")
  end,
}
```

If you already configure `nvim-lspconfig`, add the `vim.lsp.config("hugo_lsp", ...)` and `vim.lsp.enable("hugo_lsp")` calls inside that existing config.

## Mason

Mason is not required for local development. This server is currently run through a local Node command:

```lua
cmd = { "node", "/ABSOLUTE/PATH/TO/hugo_language_server/dist/src/server.js" }
```

To install it through Mason later, the server would need packaging as a downloadable tool or npm package plus a Mason registry entry.

## Official Hugo Docs Dataset

Hover and completion for Hugo methods/functions are generated from the official Hugo documentation:

```bash
npm run generate:docs
npm run build
```

The generated files live under `src/generated/` and are committed as source data for the language server.

Each official-docs hover includes:

- the symbol name
- receiver or namespace
- extracted summary and usage when available
- `Since: v...` when the official Hugo page states it
- `Since: not stated on the official Hugo docs page` otherwise
- a direct link to the official Hugo docs page

## Testing

```bash
npm test
```

## Current Limitations

- Shortcode parameter validation only checks named params that can be inferred from `.Get "name"` in project shortcode templates.
- Required vs optional shortcode params are not inferred yet.
- Positional shortcode params are not validated yet.
- Template variable checks are file-local and intentionally conservative; they do not implement full Go template scope semantics.
- Theme/module scanning is still limited compared with Hugo's full module and theme resolution model.
