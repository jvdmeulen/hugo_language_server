export const FRONT_MATTER_DOCS: Record<
  string,
  { summary: string; expected: string; notes?: string[]; example?: string }
> = {
  title: {
    summary: "The primary page title used by templates, lists, feeds, and SEO output.",
    expected: "string",
    example: 'title: "My article"',
  },
  slug: {
    summary: "Overrides the URL segment derived from the file name.",
    expected: "string",
    example: 'slug: "my-article"',
  },
  description: {
    summary: "Short description commonly used for meta tags, previews, and summaries.",
    expected: "string",
    example: 'description: "Short summary of the page."',
  },
  summary: {
    summary: "Manual summary content used by `.Summary`-style list rendering.",
    expected: "string",
    example: 'summary: "A short teaser for the content."',
  },
  date: {
    summary: "Primary publish date for the page.",
    expected: "ISO date/datetime string",
    notes: [
      "Prefer parseable values like `2025-01-31` or `2025-01-31T09:00:00+01:00`.",
      "Often used for sorting and list output.",
    ],
    example: 'date: "2025-01-31T09:00:00+01:00"',
  },
  lastmod: {
    summary: "Last modification date for the page.",
    expected: "ISO date/datetime string",
    notes: ["Useful for templates, RSS, and sitemap metadata."],
    example: 'lastmod: "2025-02-02"',
  },
  draft: {
    summary: "Marks content as draft so Hugo skips it in normal production builds.",
    expected: "boolean",
    notes: ["`hugo --buildDrafts` includes draft content."],
    example: "draft: true",
  },
  publishDate: {
    summary: "Explicit or future publish date for scheduled content.",
    expected: "ISO date/datetime string",
    example: 'publishDate: "2025-02-10T08:00:00Z"',
  },
  expiryDate: {
    summary: "Date after which Hugo may treat the page as expired.",
    expected: "ISO date/datetime string",
    example: 'expiryDate: "2025-12-31"',
  },
  authors: {
    summary: "Author metadata for the page.",
    expected: "string or array",
    notes: ["Can be a single string or a list of names/identifiers."],
    example: 'authors: ["Jasper", "Docs Team"]',
  },
  tags: {
    summary: "Tag taxonomy values for the page.",
    expected: "string or array",
    example: 'tags: ["hugo", "neovim"]',
  },
  categories: {
    summary: "Category taxonomy values for the page.",
    expected: "string or array",
    example: 'categories: ["Development"]',
  },
  keywords: {
    summary: "SEO or discovery keywords for the page.",
    expected: "string or array",
    example: 'keywords: ["hugo", "lsp", "editor"]',
  },
  aliases: {
    summary: "Additional site-relative URLs that should resolve to this page.",
    expected: "string or array of site-relative paths",
    notes: ["Use paths that start with `/`."],
    example: 'aliases: ["/old-url/", "/archive/my-article/"]',
  },
  weight: {
    summary: "Ordering priority for menus, sections, and taxonomy lists.",
    expected: "number",
    example: "weight: 10",
  },
  layout: {
    summary: "Forces a specific Hugo layout template for this page.",
    expected: "string",
    example: 'layout: "docs"',
  },
  type: {
    summary: "Overrides the content type Hugo normally derives from the directory structure.",
    expected: "string",
    example: 'type: "docs"',
  },
  url: {
    summary: "Overrides the final output URL for the page.",
    expected: "string",
    example: 'url: "/custom/path/"',
  },
  linkTitle: {
    summary: "Shorter title often used for navigation or link labels.",
    expected: "string",
    example: 'linkTitle: "Docs"',
  },
  resources: {
    summary: "Page bundle resources with metadata such as `src`, `name`, `title`, and params.",
    expected: "array or object",
    notes: [
      "Usually modeled as an array of objects.",
      "Entries commonly include at least a `src` field.",
    ],
    example: 'resources:\n  - src: "hero.jpg"\n    name: "hero"',
  },
  cascade: {
    summary: "Front matter defaults that cascade to descendants in a section or branch bundle.",
    expected: "object or array of objects",
    example: 'cascade:\n  type: "docs"\n  draft: false',
  },
  headless: {
    summary: "Marks a bundle as non-rendered while keeping it available for lookups and data access.",
    expected: "boolean",
    example: "headless: true",
  },
};

export const SHORTCODE_DOCS: Record<
  string,
  { summary: string; usage: string; notes?: string[] }
> = {
  figure: {
    summary: "Renders an image with caption, alt text, and attribution options.",
    usage: '{{< figure src="image.jpg" alt="Description" caption="Caption" >}}',
  },
  gist: {
    summary: "Embeds a GitHub Gist.",
    usage: '{{< gist username gist-id >}}',
  },
  highlight: {
    summary: "Renders syntax-highlighted code using Hugo's Chroma integration.",
    usage: "{{< highlight go >}}\nfmt.Println(\"hi\")\n{{< /highlight >}}",
  },
  instagram: {
    summary: "Embeds an Instagram post.",
    usage: "{{< instagram shortcode-id >}}",
  },
  param: {
    summary: "Reads a value from site params inside content.",
    usage: '{{< param "author" >}}',
  },
  ref: {
    summary: "Builds an internal Hugo-aware link to another content file.",
    usage: '{{< ref "docs/start-here.md" >}}',
    notes: ["Prefer this over hardcoded internal URLs when linking to site content."],
  },
  relref: {
    summary: "Like `ref`, but usually produces a relative internal link.",
    usage: '{{< relref "docs/start-here.md" >}}',
  },
  tweet: {
    summary: "Embeds a tweet/X post by id.",
    usage: "{{< tweet 1234567890 >}}",
  },
  vimeo: {
    summary: "Embeds a Vimeo video.",
    usage: "{{< vimeo 123456789 >}}",
  },
  x: {
    summary: "Embeds an X post.",
    usage: "{{< x 1234567890 >}}",
  },
  youtube: {
    summary: "Embeds a YouTube video.",
    usage: "{{< youtube VIDEO_ID >}}",
  },
};

export const TEMPLATE_KEYWORD_DOCS: Record<
  string,
  { summary: string; usage: string; notes?: string[] }
> = {
  if: {
    summary: "Conditional branch in Go templates.",
    usage: "{{ if .Title }}...{{ end }}",
  },
  else: {
    summary: "Fallback branch for `if`, `with`, or `range`.",
    usage: "{{ if .Title }}...{{ else }}...{{ end }}",
  },
  with: {
    summary: "Rebinds `.` to a value when that value is non-empty.",
    usage: "{{ with .Params.hero }}...{{ end }}",
    notes: ["Inside `with`, `.` points at the nested value."],
  },
  range: {
    summary: "Iterates over arrays, maps, page collections, and similar values.",
    usage: "{{ range .Pages }}...{{ end }}",
  },
  define: {
    summary: "Defines a named template, typically for base templates and blocks.",
    usage: '{{ define "main" }}...{{ end }}',
  },
  block: {
    summary: "Renders an overridable named block with fallback content.",
    usage: '{{ block "main" . }}...{{ end }}',
  },
  template: {
    summary: "Calls a named template.",
    usage: '{{ template "main" . }}',
  },
  partial: {
    summary: "Renders a partial template with a context value.",
    usage: '{{ partial "shared/hero.html" . }}',
  },
  partialCached: {
    summary: "Like `partial`, but cached by the variant arguments you pass in.",
    usage: '{{ partialCached "shared/hero.html" . .RelPermalink }}',
  },
  end: {
    summary: "Closes an `if`, `with`, `range`, `define`, or `block` section.",
    usage: "{{ end }}",
  },
};

export const TEMPLATE_FUNCTION_DOCS: Record<
  string,
  { summary: string; usage: string; notes?: string[] }
> = {
  dict: {
    summary: "Creates an inline dictionary/map.",
    usage: '{{ dict "title" .Title "pages" .Pages }}',
  },
  slice: {
    summary: "Creates an inline slice/array.",
    usage: '{{ slice "docs" "blog" }}',
  },
  printf: {
    summary: "Formats a string using Go-style format verbs.",
    usage: '{{ printf "%s/%s" .Section .File.BaseFileName }}',
  },
  index: {
    summary: "Fetches a value from a map, slice, or nested structure by key or index.",
    usage: '{{ index site.Data.authors "jasper" }}',
  },
  len: {
    summary: "Returns the length of a string, list, or collection.",
    usage: "{{ len .Pages }}",
  },
  default: {
    summary: "Returns a fallback when the second value is empty.",
    usage: '{{ default "fallback" .Params.label }}',
  },
  safeHTML: {
    summary: "Marks a string as safe HTML for rendering.",
    usage: "{{ .Content | safeHTML }}",
  },
  safeURL: {
    summary: "Marks a string as a safe URL.",
    usage: "{{ .Permalink | safeURL }}",
  },
  markdownify: {
    summary: "Renders Markdown text inline to HTML.",
    usage: "{{ .Params.summary | markdownify }}",
  },
  plainify: {
    summary: "Strips markup and returns plain text.",
    usage: "{{ .Summary | plainify }}",
  },
  delimit: {
    summary: "Joins collection items with a separator.",
    usage: '{{ delimit .Params.tags ", " }}',
  },
  where: {
    summary: "Filters a collection by field and value.",
    usage: '{{ where site.RegularPages "Section" "docs" }}',
  },
  sort: {
    summary: "Sorts a collection by key or field.",
    usage: '{{ sort .Pages "Weight" "asc" }}',
  },
  first: {
    summary: "Returns the first N items from a collection.",
    usage: "{{ first 5 .Pages }}",
  },
  after: {
    summary: "Skips the first N items in a collection.",
    usage: "{{ after 5 .Pages }}",
  },
  "urls.Parse": {
    summary: "Parses a URL into an object with host, path, scheme, and similar fields.",
    usage: '{{ $u := urls.Parse .Permalink }}',
  },
  eq: {
    summary: "Returns true when all provided arguments are equal.",
    usage: "{{ if eq .Section \"docs\" }}...{{ end }}",
    notes: ["Commonly used inside `if` expressions."],
  },
  ne: {
    summary: "Returns true when the compared values are not equal.",
    usage: "{{ if ne .Kind \"page\" }}...{{ end }}",
  },
  lt: {
    summary: "Returns true when the left value is less than the right value.",
    usage: "{{ if lt (len .Pages) 10 }}...{{ end }}",
  },
  le: {
    summary: "Returns true when the left value is less than or equal to the right value.",
    usage: "{{ if le .Weight 10 }}...{{ end }}",
  },
  gt: {
    summary: "Returns true when the left value is greater than the right value.",
    usage: "{{ if gt (len .Pages) 0 }}...{{ end }}",
  },
  ge: {
    summary: "Returns true when the left value is greater than or equal to the right value.",
    usage: "{{ if ge .Weight 10 }}...{{ end }}",
  },
  and: {
    summary: "Returns the logical AND of the provided arguments.",
    usage: "{{ if and .Title .Params.hero }}...{{ end }}",
  },
  or: {
    summary: "Returns the first non-empty argument.",
    usage: '{{ or .Params.label "Fallback" }}',
  },
  not: {
    summary: "Negates a boolean-like value.",
    usage: "{{ if not .Draft }}...{{ end }}",
  },
  isset: {
    summary: "Checks whether a map, dict, or params object contains a key.",
    usage: '{{ if isset .Params "hero" }}...{{ end }}',
  },
  in: {
    summary: "Checks whether a value exists in a string, slice, or similar collection.",
    usage: '{{ if in .Params.tags "hugo" }}...{{ end }}',
  },
};

export const TEMPLATE_OBJECT_DOCS: Record<
  string,
  { summary: string; usage: string; notes?: string[] }
> = {
  ".": {
    summary: "The current template context value.",
    usage: "{{ .Title }}",
    notes: ["Inside `with` and `range`, `.` is rebound to the nested value."],
  },
  "$": {
    summary: "The root template context captured before nested scope changes.",
    usage: "{{ $.Site.Title }}",
    notes: ["Useful when `.` changes inside `with` or `range`."],
  },
  site: {
    summary: "Global site object containing configuration, pages, taxonomies, and more.",
    usage: "{{ site.Title }}",
  },
  hugo: {
    summary: "Global Hugo information object with version and environment metadata.",
    usage: "{{ hugo.Version }}",
  },
  ".Site": {
    summary: "The current page's site object.",
    usage: "{{ .Site.Title }}",
  },
  ".Page": {
    summary: "The current page object when available in templates.",
    usage: "{{ .Page.Title }}",
  },
  ".Params": {
    summary: "Map of front matter params for the current page.",
    usage: "{{ .Params.hero }}",
  },
  ".Title": {
    summary: "The current page or object title.",
    usage: "{{ .Title }}",
  },
  ".Content": {
    summary: "Rendered HTML content for the current page.",
    usage: "{{ .Content }}",
  },
  ".Summary": {
    summary: "Rendered summary/excerpt for the current page.",
    usage: "{{ .Summary }}",
  },
  ".RelPermalink": {
    summary: "The relative permalink for the current page or resource.",
    usage: "{{ .RelPermalink }}",
  },
  ".Permalink": {
    summary: "The absolute permalink for the current page or resource.",
    usage: "{{ .Permalink }}",
  },
  ".Section": {
    summary: "The current page section name.",
    usage: "{{ .Section }}",
  },
  ".Kind": {
    summary: "The Hugo page kind, such as `page`, `section`, or `home`.",
    usage: "{{ .Kind }}",
  },
  ".Type": {
    summary: "The content type associated with the current page.",
    usage: "{{ .Type }}",
  },
  ".File": {
    summary: "File metadata for the current page, including paths and names.",
    usage: "{{ .File.BaseFileName }}",
  },
  ".Resources": {
    summary: "Page resources collection for bundle assets and derived files.",
    usage: '{{ .Resources.GetMatch "hero.*" }}',
  },
  ".Scratch": {
    summary: "Temporary per-page scratchpad store for values used during rendering.",
    usage: '{{ .Scratch.Set "key" "value" }}',
    notes: ["Useful for accumulating state inside templates."],
  },
  ".GetPage": {
    summary: "Finds another page from the current context using a path or lookup string.",
    usage: '{{ .GetPage "docs/start-here" }}',
  },
  ".Param": {
    summary: "Reads a parameter value from page params with Hugo's param lookup semantics.",
    usage: '{{ .Param "author" }}',
  },
  ".Render": {
    summary: "Renders the current page with a specific render hook or layout variant.",
    usage: '{{ .Render "summary" }}',
  },
  ".Paginate": {
    summary: "Creates a paginator from a page collection.",
    usage: "{{ .Paginate .Pages }}",
  },
  ".OutputFormats": {
    summary: "Available output formats for the current page.",
    usage: '{{ .OutputFormats.Get "rss" }}',
  },
};

export const TEMPLATE_METHOD_DOCS: Record<
  string,
  { summary: string; usage: string; notes?: string[] }
> = {
  ".Scratch.Get": {
    summary: "Returns a scratch value by key.",
    usage: '{{ .Scratch.Get "key" }}',
  },
  ".Scratch.Set": {
    summary: "Stores a scratch value by key.",
    usage: '{{ .Scratch.Set "key" "value" }}',
  },
  ".Scratch.Add": {
    summary: "Appends or increments a scratch value depending on its type.",
    usage: '{{ .Scratch.Add "items" (slice "new") }}',
  },
  ".Scratch.Delete": {
    summary: "Deletes a scratch value by key.",
    usage: '{{ .Scratch.Delete "key" }}',
  },
  ".Scratch.SetInMap": {
    summary: "Stores a nested value inside a scratch-backed map.",
    usage: '{{ .Scratch.SetInMap "authors" "jasper" "Jasper" }}',
  },
  ".Scratch.DeleteInMap": {
    summary: "Deletes a key from a scratch-backed map.",
    usage: '{{ .Scratch.DeleteInMap "authors" "jasper" }}',
  },
  ".Scratch.GetSortedMapValues": {
    summary: "Returns sorted values from a scratch-backed map.",
    usage: '{{ range .Scratch.GetSortedMapValues "authors" }}...{{ end }}',
  },
  ".Resources.Get": {
    summary: "Returns a page resource by exact name or path.",
    usage: '{{ .Resources.Get "hero.jpg" }}',
  },
  ".Resources.GetMatch": {
    summary: "Returns the first page resource matching a glob pattern.",
    usage: '{{ .Resources.GetMatch "hero.*" }}',
  },
  ".Resources.Match": {
    summary: "Returns all page resources matching a glob pattern.",
    usage: '{{ .Resources.Match "*.jpg" }}',
  },
  ".OutputFormats.Get": {
    summary: "Returns an output format by name from the current page.",
    usage: '{{ .OutputFormats.Get "rss" }}',
  },
  ".Resources.ByType": {
    summary: "Filters page resources by media type or logical type.",
    usage: '{{ .Resources.ByType "image" }}',
  },
  ".Resources.Mount": {
    summary: "Mounts a resource set under a target path for further processing.",
    usage: '{{ $mounted := .Resources.Mount "assets" "." }}',
  },
  ".GetTerms": {
    summary: "Returns taxonomy terms for a taxonomy key on the current page.",
    usage: '{{ .GetTerms "tags" }}',
  },
  ".Ancestors.Reverse": {
    summary: "Reverses the page ancestor collection, often used for breadcrumbs.",
    usage: "{{ range .Ancestors.Reverse }}...{{ end }}",
  },
  ".Paginate.Pages": {
    summary: "Accesses the page collection from the current paginator.",
    usage: "{{ range (.Paginate .Pages).Pages }}...{{ end }}",
  },
};

export const EXTRA_TEMPLATE_SYMBOL_DOCS: Record<
  string,
  { summary: string; usage: string; notes?: string[]; kind: "function" | "object" }
> = {
  ".Data": {
    kind: "object",
    summary: "Structured data loaded from the site's `data/` directory.",
    usage: "{{ .Site.Data.authors.jasper.name }}",
  },
  ".Pages": {
    kind: "object",
    summary: "Page collection for the current list, section, taxonomy, or node context.",
    usage: "{{ range .Pages }}...{{ end }}",
  },
  ".RegularPages": {
    kind: "object",
    summary: "Regular content pages, excluding list-like nodes.",
    usage: "{{ range .RegularPages }}...{{ end }}",
  },
  ".Translations": {
    kind: "object",
    summary: "Translated versions of the current page.",
    usage: "{{ range .Translations }}...{{ end }}",
  },
  ".CurrentSection": {
    kind: "object",
    summary: "The current section page for the current page context.",
    usage: "{{ .CurrentSection.Title }}",
  },
  ".FirstSection": {
    kind: "object",
    summary: "The top-level section page for the current page.",
    usage: "{{ .FirstSection.Title }}",
  },
  ".Parent": {
    kind: "object",
    summary: "Parent page of the current page when available.",
    usage: "{{ with .Parent }}{{ .Title }}{{ end }}",
  },
  ".Ancestors": {
    kind: "object",
    summary: "Ancestor pages for the current page, useful for breadcrumbs.",
    usage: "{{ range .Ancestors }}...{{ end }}",
  },
  ".Prev": {
    kind: "object",
    summary: "The previous page in default ordering where available.",
    usage: "{{ with .Prev }}{{ .RelPermalink }}{{ end }}",
  },
  ".Next": {
    kind: "object",
    summary: "The next page in default ordering where available.",
    usage: "{{ with .Next }}{{ .RelPermalink }}{{ end }}",
  },
  ".PrevInSection": {
    kind: "object",
    summary: "The previous page within the current section.",
    usage: "{{ with .PrevInSection }}{{ .Title }}{{ end }}",
  },
  ".NextInSection": {
    kind: "object",
    summary: "The next page within the current section.",
    usage: "{{ with .NextInSection }}{{ .Title }}{{ end }}",
  },
  ".IsHome": {
    kind: "object",
    summary: "Boolean indicating whether the current page is the home page.",
    usage: "{{ if .IsHome }}...{{ end }}",
  },
  ".IsNode": {
    kind: "object",
    summary: "Boolean indicating whether the current context is a list-like node.",
    usage: "{{ if .IsNode }}...{{ end }}",
  },
  ".IsPage": {
    kind: "object",
    summary: "Boolean indicating whether the current context is a regular page.",
    usage: "{{ if .IsPage }}...{{ end }}",
  },
  ".IsSection": {
    kind: "object",
    summary: "Boolean indicating whether the current page is a section page.",
    usage: "{{ if .IsSection }}...{{ end }}",
  },
  ".Language": {
    kind: "object",
    summary: "Current language object for multilingual sites.",
    usage: "{{ .Language.Lang }}",
  },
  ".Languages": {
    kind: "object",
    summary: "List of configured site languages.",
    usage: "{{ range .Site.Languages }}...{{ end }}",
  },
  ".Sites": {
    kind: "object",
    summary: "Collection of sites in a multilingual configuration.",
    usage: "{{ range .Sites }}...{{ end }}",
  },
  ".TableOfContents": {
    kind: "object",
    summary: "Rendered table of contents for the current content page.",
    usage: "{{ .TableOfContents }}",
  },
  ".WordCount": {
    kind: "object",
    summary: "Word count for the current page.",
    usage: "{{ .WordCount }}",
  },
  ".ReadingTime": {
    kind: "object",
    summary: "Estimated reading time for the current page.",
    usage: "{{ .ReadingTime }}",
  },
  ".Draft": {
    kind: "object",
    summary: "Boolean draft status for the current page.",
    usage: "{{ if .Draft }}...{{ end }}",
  },
  ".PublishDate": {
    kind: "object",
    summary: "Publish date of the current page.",
    usage: "{{ .PublishDate }}",
  },
  ".Lastmod": {
    kind: "object",
    summary: "Last modification date of the current page.",
    usage: "{{ .Lastmod }}",
  },
  ".Date": {
    kind: "object",
    summary: "Primary date value of the current page.",
    usage: "{{ .Date }}",
  },
  ".ExpiryDate": {
    kind: "object",
    summary: "Expiry date of the current page.",
    usage: "{{ .ExpiryDate }}",
  },
  ".AlternativeOutputFormats": {
    kind: "object",
    summary: "Alternative output formats available for the current page.",
    usage: "{{ range .AlternativeOutputFormats }}...{{ end }}",
  },
  "compare.Eq": {
    kind: "function",
    summary: "Namespace form of `eq` for equality checks.",
    usage: '{{ if compare.Eq .Section "docs" }}...{{ end }}',
  },
  "compare.Ne": {
    kind: "function",
    summary: "Namespace form of `ne` for inequality checks.",
    usage: '{{ if compare.Ne .Kind "page" }}...{{ end }}',
  },
  "compare.Lt": {
    kind: "function",
    summary: "Namespace form of `lt` for less-than comparison.",
    usage: "{{ if compare.Lt .Weight 10 }}...{{ end }}",
  },
  "compare.Le": {
    kind: "function",
    summary: "Namespace form of `le` for less-than-or-equal comparison.",
    usage: "{{ if compare.Le .Weight 10 }}...{{ end }}",
  },
  "compare.Gt": {
    kind: "function",
    summary: "Namespace form of `gt` for greater-than comparison.",
    usage: "{{ if compare.Gt .WordCount 1000 }}...{{ end }}",
  },
  "compare.Ge": {
    kind: "function",
    summary: "Namespace form of `ge` for greater-than-or-equal comparison.",
    usage: "{{ if compare.Ge .WordCount 1000 }}...{{ end }}",
  },
  append: {
    kind: "function",
    summary: "Appends one or more values to a slice-like collection.",
    usage: '{{ $items = append $items "new" }}',
  },
  uniq: {
    kind: "function",
    summary: "Returns a collection with duplicate values removed.",
    usage: "{{ uniq .Params.tags }}",
  },
  merge: {
    kind: "function",
    summary: "Merges maps into a combined result.",
    usage: '{{ merge (dict "a" 1) (dict "b" 2) }}',
  },
  union: {
    kind: "function",
    summary: "Returns the union of two collections.",
    usage: "{{ union .Pages .RegularPages }}",
  },
  intersect: {
    kind: "function",
    summary: "Returns the shared items between two collections.",
    usage: "{{ intersect .Params.tags (slice \"hugo\" \"docs\") }}",
  },
  symdiff: {
    kind: "function",
    summary: "Returns the symmetric difference between two collections.",
    usage: "{{ symdiff $left $right }}",
  },
  complement: {
    kind: "function",
    summary: "Returns items from the first collection not present in the second.",
    usage: "{{ complement .Pages $hiddenPages }}",
  },
  shuffle: {
    kind: "function",
    summary: "Randomizes the order of a collection.",
    usage: "{{ shuffle .Pages }}",
  },
  seq: {
    kind: "function",
    summary: "Builds a numeric sequence.",
    usage: "{{ range seq 1 5 }}...{{ end }}",
  },
  print: {
    kind: "function",
    summary: "Concatenates values into a string without formatting verbs.",
    usage: '{{ print .Section "/" .File.BaseFileName }}',
  },
  println: {
    kind: "function",
    summary: "Like `print`, but appends a newline.",
    usage: '{{ println "debug" .Title }}',
  },
  warnf: {
    kind: "function",
    summary: "Emits a formatted warning during site build.",
    usage: '{{ warnf "Missing hero for %s" .File.Path }}',
  },
  errorf: {
    kind: "function",
    summary: "Emits a formatted error during site build.",
    usage: '{{ errorf "Invalid config for %s" .File.Path }}',
  },
  cond: {
    kind: "function",
    summary: "Ternary-like conditional helper returning one of two values.",
    usage: '{{ cond .Draft "draft" "published" }}',
  },
  "compare.Default": {
    kind: "function",
    summary: "Namespace form of default/fallback behavior.",
    usage: '{{ compare.Default "fallback" .Params.label }}',
  },
  safeHTMLAttr: {
    kind: "function",
    summary: "Marks a string as a safe HTML attribute fragment.",
    usage: '{{ printf "class=%q" .Params.class | safeHTMLAttr }}',
  },
  safeCSS: {
    kind: "function",
    summary: "Marks a string as safe CSS.",
    usage: '{{ "color:red" | safeCSS }}',
  },
  safeJS: {
    kind: "function",
    summary: "Marks a string as safe JavaScript.",
    usage: '{{ "window.alert(1)" | safeJS }}',
  },
  safeJSStr: {
    kind: "function",
    summary: "Marks a string as safe JavaScript string content.",
    usage: '{{ .Title | safeJSStr }}',
  },
  htmlEscape: {
    kind: "function",
    summary: "Escapes a string for HTML output.",
    usage: "{{ .Title | htmlEscape }}",
  },
  htmlUnescape: {
    kind: "function",
    summary: "Unescapes HTML entities into plain characters.",
    usage: "{{ .Params.title | htmlUnescape }}",
  },
  last: {
    kind: "function",
    summary: "Returns the last N items from a collection.",
    usage: "{{ last 5 .Pages }}",
  },
  findRE: {
    kind: "function",
    summary: "Returns regular expression matches from a string.",
    usage: '{{ findRE "[A-Z][a-z]+" .Title }}',
  },
  findRESubmatch: {
    kind: "function",
    summary: "Returns regex matches including submatches.",
    usage: '{{ findRESubmatch "([0-9]+)" .Content }}',
  },
  replace: {
    kind: "function",
    summary: "Performs a literal substring replacement.",
    usage: '{{ replace .Title "Docs" "Guides" }}',
  },
  replaceRE: {
    kind: "function",
    summary: "Performs a regular expression replacement.",
    usage: '{{ replaceRE "[^a-z0-9]+" "-" (.Title | lower) }}',
  },
  split: {
    kind: "function",
    summary: "Splits a string into a slice.",
    usage: '{{ split .File.Path "/" }}',
  },
  "strings.Contains": {
    kind: "function",
    summary: "Checks whether a string contains a substring.",
    usage: '{{ if strings.Contains .RelPermalink "/docs/" }}...{{ end }}',
  },
  "strings.Count": {
    kind: "function",
    summary: "Counts substring occurrences in a string.",
    usage: '{{ strings.Count "-" .File.BaseFileName }}',
  },
  "strings.FindRE": {
    kind: "function",
    summary: "Namespace form of regex search over strings.",
    usage: '{{ strings.FindRE "[0-9]+" .Title }}',
  },
  "strings.FindRESubmatch": {
    kind: "function",
    summary: "Namespace form of regex search returning submatches.",
    usage: '{{ strings.FindRESubmatch "(\\d+)" .Content }}',
  },
  "strings.HasPrefix": {
    kind: "function",
    summary: "Checks whether a string starts with a prefix.",
    usage: '{{ if strings.HasPrefix .RelPermalink "/docs" }}...{{ end }}',
  },
  "strings.HasSuffix": {
    kind: "function",
    summary: "Checks whether a string ends with a suffix.",
    usage: '{{ if strings.HasSuffix .File.Path ".md" }}...{{ end }}',
  },
  "strings.Repeat": {
    kind: "function",
    summary: "Repeats a string N times.",
    usage: '{{ strings.Repeat 3 "-" }}',
  },
  "strings.Replace": {
    kind: "function",
    summary: "Namespace string replace helper.",
    usage: '{{ strings.Replace .Title "Docs" "Guides" }}',
  },
  "strings.ReplaceRE": {
    kind: "function",
    summary: "Namespace regular expression replace helper.",
    usage: '{{ strings.ReplaceRE "[^a-z0-9]+" "-" (.Title | lower) }}',
  },
  "strings.RuneCount": {
    kind: "function",
    summary: "Returns the rune count of a string.",
    usage: "{{ strings.RuneCount .Title }}",
  },
  "strings.Split": {
    kind: "function",
    summary: "Namespace string split helper.",
    usage: '{{ strings.Split .File.Path "/" }}',
  },
  "strings.Substr": {
    kind: "function",
    summary: "Returns a substring by index and optional length.",
    usage: "{{ strings.Substr .Title 0 10 }}",
  },
  "strings.ToLower": {
    kind: "function",
    summary: "Converts a string to lowercase.",
    usage: "{{ strings.ToLower .Title }}",
  },
  "strings.ToUpper": {
    kind: "function",
    summary: "Converts a string to uppercase.",
    usage: "{{ strings.ToUpper .Title }}",
  },
  "strings.Trim": {
    kind: "function",
    summary: "Trims characters from both sides of a string.",
    usage: '{{ strings.Trim " /" .RelPermalink }}',
  },
  "strings.TrimLeft": {
    kind: "function",
    summary: "Trims characters from the left side of a string.",
    usage: '{{ strings.TrimLeft "/" .RelPermalink }}',
  },
  "strings.TrimPrefix": {
    kind: "function",
    summary: "Trims a prefix when present.",
    usage: '{{ strings.TrimPrefix "/docs/" .RelPermalink }}',
  },
  "strings.TrimRight": {
    kind: "function",
    summary: "Trims characters from the right side of a string.",
    usage: '{{ strings.TrimRight "/" .RelPermalink }}',
  },
  "strings.TrimSpace": {
    kind: "function",
    summary: "Trims whitespace from both sides of a string.",
    usage: "{{ strings.TrimSpace .Inner }}",
  },
  "strings.TrimSuffix": {
    kind: "function",
    summary: "Trims a suffix when present.",
    usage: '{{ strings.TrimSuffix ".html" .File.Path }}',
  },
  lower: {
    kind: "function",
    summary: "Converts text to lowercase.",
    usage: "{{ lower .Title }}",
  },
  upper: {
    kind: "function",
    summary: "Converts text to uppercase.",
    usage: "{{ upper .Title }}",
  },
  title: {
    kind: "function",
    summary: "Title-cases a string.",
    usage: "{{ title .Section }}",
  },
  trim: {
    kind: "function",
    summary: "Trims characters from a string.",
    usage: '{{ trim " /" .RelPermalink }}',
  },
  substr: {
    kind: "function",
    summary: "Returns a substring slice.",
    usage: "{{ substr .Title 0 10 }}",
  },
  chomp: {
    kind: "function",
    summary: "Removes trailing newline characters.",
    usage: "{{ chomp .Inner }}",
  },
  truncate: {
    kind: "function",
    summary: "Truncates text to a target length.",
    usage: "{{ truncate 120 .Summary }}",
  },
  anchorize: {
    kind: "function",
    summary: "Converts text into an anchor-friendly fragment.",
    usage: "{{ anchorize .Title }}",
  },
  humanize: {
    kind: "function",
    summary: "Converts machine-like strings into more human-readable text.",
    usage: "{{ humanize .Section }}",
  },
  urlize: {
    kind: "function",
    summary: "Converts text into a URL-friendly slug.",
    usage: "{{ urlize .Title }}",
  },
  base64Decode: {
    kind: "function",
    summary: "Decodes a base64 string.",
    usage: '{{ base64Decode "aGVsbG8=" }}',
  },
  base64Encode: {
    kind: "function",
    summary: "Encodes a string to base64.",
    usage: '{{ base64Encode "hello" }}',
  },
  jsonify: {
    kind: "function",
    summary: "Serializes a value to JSON.",
    usage: "{{ jsonify .Params }}",
  },
  "transform.CanEmojify": {
    kind: "function",
    summary: "Checks whether the current content can be emojified.",
    usage: "{{ transform.CanEmojify .Content }}",
  },
  "transform.Emojify": {
    kind: "function",
    summary: "Converts emoji shortcodes into Unicode emoji.",
    usage: '{{ transform.Emojify "Hello :wave:" }}',
  },
  "transform.Highlight": {
    kind: "function",
    summary: "Highlights code snippets with Hugo's syntax highlighter.",
    usage: '{{ transform.Highlight "fmt.Println(\\"hi\\")" "go" "" }}',
  },
  "transform.HTMLUnescape": {
    kind: "function",
    summary: "Unescapes HTML entities.",
    usage: "{{ transform.HTMLUnescape .Title }}",
  },
  "transform.Markdownify": {
    kind: "function",
    summary: "Renders Markdown content to HTML.",
    usage: "{{ transform.Markdownify .Params.summary }}",
  },
  "transform.Plainify": {
    kind: "function",
    summary: "Strips markup and returns plain text.",
    usage: "{{ transform.Plainify .Content }}",
  },
  "transform.Remarshal": {
    kind: "function",
    summary: "Converts structured data from one format to another.",
    usage: '{{ transform.Remarshal "json" .Site.Data.authors }}',
  },
  "transform.Unmarshal": {
    kind: "function",
    summary: "Parses structured text like JSON, YAML, or TOML into data.",
    usage: '{{ transform.Unmarshal (resources.Get "data.json").Content }}',
  },
  time: {
    kind: "function",
    summary: "Parses a date/time string into a time object.",
    usage: '{{ time "2025-01-31" }}',
  },
  "time.AsTime": {
    kind: "function",
    summary: "Parses a string or value into a time object.",
    usage: "{{ time.AsTime .Params.date }}",
  },
  "time.Format": {
    kind: "function",
    summary: "Formats a time value using Hugo/Go layout formatting.",
    usage: '{{ time.Format ":date_long" .Date }}',
  },
  "time.Now": {
    kind: "function",
    summary: "Returns the current time.",
    usage: "{{ time.Now }}",
  },
  dateFormat: {
    kind: "function",
    summary: "Formats a date with a layout string.",
    usage: '{{ dateFormat "2006-01-02" .Date }}',
  },
  now: {
    kind: "function",
    summary: "Returns the current time.",
    usage: "{{ now }}",
  },
  "math.Abs": {
    kind: "function",
    summary: "Returns the absolute value of a number.",
    usage: "{{ math.Abs -5 }}",
  },
  "math.Add": {
    kind: "function",
    summary: "Adds numbers together.",
    usage: "{{ math.Add 2 3 }}",
  },
  "math.Ceil": {
    kind: "function",
    summary: "Rounds a number up to the nearest integer.",
    usage: "{{ math.Ceil 1.2 }}",
  },
  "math.Div": {
    kind: "function",
    summary: "Divides the first number by the second.",
    usage: "{{ math.Div 10 2 }}",
  },
  "math.Floor": {
    kind: "function",
    summary: "Rounds a number down to the nearest integer.",
    usage: "{{ math.Floor 1.8 }}",
  },
  "math.Max": {
    kind: "function",
    summary: "Returns the larger of the provided values.",
    usage: "{{ math.Max 5 9 }}",
  },
  "math.Min": {
    kind: "function",
    summary: "Returns the smaller of the provided values.",
    usage: "{{ math.Min 5 9 }}",
  },
  "math.Mod": {
    kind: "function",
    summary: "Returns the modulus remainder.",
    usage: "{{ math.Mod 10 3 }}",
  },
  "math.Mul": {
    kind: "function",
    summary: "Multiplies numbers together.",
    usage: "{{ math.Mul 3 4 }}",
  },
  "math.Pow": {
    kind: "function",
    summary: "Raises a number to a power.",
    usage: "{{ math.Pow 2 8 }}",
  },
  "math.Round": {
    kind: "function",
    summary: "Rounds a number to the nearest integer.",
    usage: "{{ math.Round 1.5 }}",
  },
  "math.Sqrt": {
    kind: "function",
    summary: "Returns the square root of a number.",
    usage: "{{ math.Sqrt 16 }}",
  },
  "math.Sub": {
    kind: "function",
    summary: "Subtracts the second number from the first.",
    usage: "{{ math.Sub 10 3 }}",
  },
  "cast.ToString": {
    kind: "function",
    summary: "Converts a value to a string.",
    usage: "{{ cast.ToString .Params.weight }}",
  },
  "cast.ToInt": {
    kind: "function",
    summary: "Converts a value to an integer.",
    usage: "{{ cast.ToInt .Params.weight }}",
  },
  "cast.ToFloat": {
    kind: "function",
    summary: "Converts a value to a floating-point number.",
    usage: "{{ cast.ToFloat .Params.ratio }}",
  },
  "cast.ToBool": {
    kind: "function",
    summary: "Converts a value to a boolean.",
    usage: "{{ cast.ToBool .Params.enabled }}",
  },
  "cast.ToTime": {
    kind: "function",
    summary: "Converts a value to a time object.",
    usage: "{{ cast.ToTime .Params.date }}",
  },
  "path.Base": {
    kind: "function",
    summary: "Returns the last path segment.",
    usage: "{{ path.Base .File.Path }}",
  },
  "path.Clean": {
    kind: "function",
    summary: "Normalizes a path by removing redundant separators and segments.",
    usage: '{{ path.Clean "/docs/../blog/post.md" }}',
  },
  "path.Dir": {
    kind: "function",
    summary: "Returns the directory portion of a path.",
    usage: "{{ path.Dir .File.Path }}",
  },
  "path.Ext": {
    kind: "function",
    summary: "Returns the file extension of a path.",
    usage: "{{ path.Ext .File.Path }}",
  },
  "path.Join": {
    kind: "function",
    summary: "Joins path segments into one normalized path.",
    usage: '{{ path.Join "docs" "start-here" }}',
  },
  "path.Split": {
    kind: "function",
    summary: "Splits a path into directory and file portions.",
    usage: "{{ path.Split .File.Path }}",
  },
  "urls.AbsLangURL": {
    kind: "function",
    summary: "Builds an absolute language-aware URL.",
    usage: '{{ urls.AbsLangURL "docs/" }}',
  },
  "urls.AbsURL": {
    kind: "function",
    summary: "Builds an absolute URL from a relative path.",
    usage: '{{ urls.AbsURL "docs/" }}',
  },
  "urls.Anchorize": {
    kind: "function",
    summary: "Converts text into an anchor fragment.",
    usage: "{{ urls.Anchorize .Title }}",
  },
  "urls.JoinPath": {
    kind: "function",
    summary: "Joins URL path segments safely.",
    usage: '{{ urls.JoinPath "/docs" "start-here" }}',
  },
  "urls.Ref": {
    kind: "function",
    summary: "Resolves an internal reference using Hugo's ref logic.",
    usage: '{{ urls.Ref . "docs/start-here.md" }}',
  },
  "urls.RelLangURL": {
    kind: "function",
    summary: "Builds a relative language-aware URL.",
    usage: '{{ urls.RelLangURL "docs/" }}',
  },
  "urls.RelRef": {
    kind: "function",
    summary: "Resolves a relative internal reference using Hugo's relref logic.",
    usage: '{{ urls.RelRef . "docs/start-here.md" }}',
  },
  "urls.RelURL": {
    kind: "function",
    summary: "Builds a relative URL.",
    usage: '{{ urls.RelURL "docs/" }}',
  },
  "resources.ExecuteAsTemplate": {
    kind: "function",
    summary: "Executes a resource as a template and returns the result resource.",
    usage: '{{ resources.ExecuteAsTemplate "app.js" . (resources.Get "app.js") }}',
  },
  "resources.FromString": {
    kind: "function",
    summary: "Creates a resource from in-memory string content.",
    usage: '{{ resources.FromString "dynamic.txt" "hello" }}',
  },
  "resources.Get": {
    kind: "function",
    summary: "Loads a global resource by path.",
    usage: '{{ resources.Get "images/hero.jpg" }}',
  },
  "resources.GetMatch": {
    kind: "function",
    summary: "Returns the first global resource matching a glob.",
    usage: '{{ resources.GetMatch "images/hero.*" }}',
  },
  "resources.Match": {
    kind: "function",
    summary: "Returns all global resources matching a glob.",
    usage: '{{ resources.Match "images/*.jpg" }}',
  },
  "resources.Minify": {
    kind: "function",
    summary: "Minifies a resource.",
    usage: "{{ resources.Minify $css }}",
  },
  "resources.PostCSS": {
    kind: "function",
    summary: "Processes a resource through PostCSS.",
    usage: "{{ resources.PostCSS $css }}",
  },
  "resources.ToCSS": {
    kind: "function",
    summary: "Compiles a Sass/SCSS resource to CSS.",
    usage: "{{ resources.ToCSS $scss }}",
  },
  "resources.Concat": {
    kind: "function",
    summary: "Concatenates multiple resources into one.",
    usage: '{{ resources.Concat "bundle.css" (slice $base $theme) }}',
  },
  "resources.Copy": {
    kind: "function",
    summary: "Copies a resource to a new target path.",
    usage: '{{ resources.Copy "images/hero.jpg" $img }}',
  },
  "resources.Fingerprint": {
    kind: "function",
    summary: "Adds a content fingerprint to a resource.",
    usage: "{{ resources.Fingerprint $css }}",
  },
  "resources.PostProcess": {
    kind: "function",
    summary: "Runs a resource through Hugo post-processing.",
    usage: "{{ resources.PostProcess $css }}",
  },
  "resources.Resize": {
    kind: "function",
    summary: "Resizes an image resource.",
    usage: '{{ resources.Resize "800x" $img }}',
  },
  "resources.Fill": {
    kind: "function",
    summary: "Fills/crops an image resource to fit dimensions.",
    usage: '{{ resources.Fill "800x400" $img }}',
  },
  "resources.Fit": {
    kind: "function",
    summary: "Fits an image resource within dimensions while preserving aspect ratio.",
    usage: '{{ resources.Fit "800x400" $img }}',
  },
  "resources.Filter": {
    kind: "function",
    summary: "Applies one or more resource filters.",
    usage: "{{ resources.Filter images.GaussianBlur $img }}",
  },
  apply: {
    kind: "function",
    summary: "Applies a function to every element in a collection.",
    usage: '{{ apply .Pages "printf" "%s" "Title" }}',
  },
  partial: {
    kind: "function",
    summary: "Function form of partial rendering.",
    usage: '{{ partial "shared/hero.html" . }}',
  },
  partialCached: {
    kind: "function",
    summary: "Cached function form of partial rendering.",
    usage: '{{ partialCached "shared/hero.html" . .RelPermalink }}',
  },
  querify: {
    kind: "function",
    summary: "Builds a URL query string from key/value pairs.",
    usage: '{{ querify "q" "hugo" "page" 2 }}',
  },
  "reflect.IsMap": {
    kind: "function",
    summary: "Checks whether a value is a map.",
    usage: "{{ reflect.IsMap .Params }}",
  },
  "reflect.IsSlice": {
    kind: "function",
    summary: "Checks whether a value is a slice.",
    usage: "{{ reflect.IsSlice .Pages }}",
  },
  "reflect.IsString": {
    kind: "function",
    summary: "Checks whether a value is a string.",
    usage: "{{ reflect.IsString .Title }}",
  },
};

export const SHORTCODE_TEMPLATE_OBJECT_DOCS: Record<
  string,
  { summary: string; usage: string; notes?: string[] }
> = {
  ".Inner": {
    summary: "Inner content passed to a paired shortcode.",
    usage: "{{ .Inner }}",
    notes: ["Available when the shortcode wraps content instead of being self-closing."],
  },
  ".IsNamedParams": {
    summary: "Boolean indicating whether the shortcode was called with named parameters.",
    usage: "{{ if .IsNamedParams }}...{{ end }}",
  },
  ".Name": {
    summary: "Name of the current shortcode.",
    usage: "{{ .Name }}",
  },
  ".Ordinal": {
    summary: "Zero-based ordinal index of this shortcode occurrence on the page.",
    usage: "{{ .Ordinal }}",
  },
  ".Page": {
    summary: "The page that rendered the current shortcode.",
    usage: "{{ .Page.Title }}",
  },
  ".Parent": {
    summary: "Parent shortcode context when this shortcode is nested.",
    usage: "{{ with .Parent }}{{ .Name }}{{ end }}",
  },
  ".Position": {
    summary: "Source position of the shortcode in the content file.",
    usage: "{{ .Position }}",
  },
  ".Params": {
    summary: "All shortcode parameters as a collection or map-like structure.",
    usage: "{{ .Params }}",
  },
};

export const SHORTCODE_TEMPLATE_METHOD_DOCS: Record<
  string,
  { summary: string; usage: string; notes?: string[] }
> = {
  ".Get": {
    summary: "Returns a shortcode parameter by index or by name.",
    usage: '{{ .Get 0 }}\n{{ .Get "title" }}',
    notes: [
      "Use numeric indexes for positional params and strings for named params.",
      "Most commonly used inside `layouts/shortcodes/*.html`.",
    ],
  },
};
