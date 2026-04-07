export interface HugoMethodDocEntry {
  receiver: string;
  symbol: string;
  memberSlug: string;
  title: string;
  summary: string;
  usage?: string;
  url: string;
  sinceVersion?: string;
}

export const HUGO_METHOD_DOCS_DATASET: HugoMethodDocEntry[] = [
  {
    "receiver": "duration",
    "symbol": ".Abs",
    "memberSlug": "abs",
    "title": "Abs",
    "summary": "Returns the absolute value of the given time.Duration value.",
    "usage": "{{ $d = time.ParseDuration \"-3h\" }}\n{{ $d.Abs }} → 3h0m0s",
    "url": "https://gohugo.io/methods/duration/abs/"
  },
  {
    "receiver": "time",
    "symbol": ".Add",
    "memberSlug": "add",
    "title": "Add",
    "summary": "Returns the given time plus the given duration.",
    "usage": "{{ $t := time.AsTime \"2023-01-27T23:44:58-08:00\" }}\n\n{{ $d1 = time.ParseDuration \"3h20m10s\" }}\n{{ $d2 = time.ParseDuration \"-3h20m10s\" }}\n\n{{ $t.Add $d1 }} → 2023-01-28 03:05:08 -0800 PST\n{{ $t.Add $d2 }} → 2023-01-27 20:24:48 -0800 PST",
    "url": "https://gohugo.io/methods/time/add/"
  },
  {
    "receiver": "time",
    "symbol": ".AddDate",
    "memberSlug": "adddate",
    "title": "AddDate",
    "summary": "When adding months or years, Hugo normalizes the final time.Time value if the resulting day does not exist. For example, adding one month to 31 January produces 2 March or 3 March, depending on the year.",
    "usage": "{{ $d := \"2022-01-01\" | time.AsTime }}\n\n{{ $d.AddDate 0 0 1 | time.Format \"2006-01-02\" }} → 2022-01-02\n{{ $d.AddDate 0 1 1 | time.Format \"2006-01-02\" }} → 2022-02-02\n{{ $d.AddDate 1 1 1 | time.Format \"2006-01-02\" }} → 2023-02-02\n\n{{ $d.AddDate -1 -1 -1 | time.Format \"2006-01-02\" }} → 2020-11-30",
    "url": "https://gohugo.io/methods/time/adddate/"
  },
  {
    "receiver": "time",
    "symbol": ".After",
    "memberSlug": "after",
    "title": "After",
    "summary": "Reports whether TIME1 is after TIME2.",
    "usage": "{{ $t1 := time.AsTime \"2023-01-01T17:00:00-08:00\" }}\n{{ $t2 := time.AsTime \"2010-01-01T17:00:00-08:00\" }}\n\n{{ $t1.After $t2 }} → true",
    "url": "https://gohugo.io/methods/time/after/"
  },
  {
    "receiver": "page",
    "symbol": ".Aliases",
    "memberSlug": "aliases",
    "title": "Aliases",
    "summary": "The Aliases method on a Page object returns the values defined in the aliases front matter field as server-relative URLs, resolved according to the current content dimension .",
    "usage": "content/\n├── examples/\n│   ├── a.de.md   aliases = ['a-old']\n│   ├── a.en.md   aliases = ['a-old', 'a-older']\n│   ├── b.de.md   aliases = ['b-old']\n│   └── b.en.md   aliases = ['b-old', 'b-older']\n└── _index.md",
    "url": "https://gohugo.io/methods/page/aliases/"
  },
  {
    "receiver": "site",
    "symbol": ".AllPages",
    "memberSlug": "allpages",
    "title": "AllPages",
    "summary": "Deprecated in v0.156.0",
    "url": "https://gohugo.io/methods/site/allpages/"
  },
  {
    "receiver": "page",
    "symbol": ".AllTranslations",
    "memberSlug": "alltranslations",
    "title": "AllTranslations",
    "summary": "With this project configuration:",
    "usage": "defaultContentLanguage: en\nlanguages:\n  de:\n    contentDir: content/de\n    label: Deutsch\n    locale: de-DE\n    weight: 2\n  en:\n    contentDir: content/en\n    label: English\n    locale: en-US\n    weight: 1\n  fr:\n    contentDir: content/fr\n    label: Français\n    locale: fr-FR\n    weight: 3",
    "url": "https://gohugo.io/methods/page/alltranslations/"
  },
  {
    "receiver": "taxonomy",
    "symbol": ".Alphabetical",
    "memberSlug": "alphabetical",
    "title": "Alphabetical",
    "summary": "The Alphabetical method on a Taxonomy object returns an ordered taxonomy , sorted alphabetically by term .",
    "usage": "taxonomies:\n  author: authors\n  genre: genres",
    "url": "https://gohugo.io/methods/taxonomy/alphabetical/"
  },
  {
    "receiver": "page",
    "symbol": ".AlternativeOutputFormats",
    "memberSlug": "alternativeoutputformats",
    "title": "AlternativeOutputFormats",
    "summary": "An output format is a collection of settings that defines how Hugo renders a file when building a site. For example, html , json , and rss are built-in output formats. You can create multiple output formats and control their generation based on page kind , or by enabling one or more output formats for specific pages.",
    "usage": "{{ range .AlternativeOutputFormats }}\n  {{ printf \"<link rel=%q type=%q href=%q>\" .Rel .MediaType.Type .Permalink | safeHTML }}\n{{ end }}",
    "url": "https://gohugo.io/methods/page/alternativeoutputformats/"
  },
  {
    "receiver": "page",
    "symbol": ".Ancestors",
    "memberSlug": "ancestors",
    "title": "Ancestors",
    "summary": "With this content structure:",
    "usage": "content/\n├── auctions/\n│   ├── 2023-11/\n│   │   ├── _index.md     <-- front matter: weight = 202311\n│   │   ├── auction-1.md\n│   │   └── auction-2.md\n│   ├── 2023-12/\n│   │   ├── _index.md     <-- front matter: weight = 202312\n│   │   ├── auction-3.md\n│   │   └── auction-4.md\n│   ├── _index.md         <-- front matter: weight = 30\n│   ├── bidding.md\n│   └── payment.md\n├── books/\n│   ├── _index.md         <-- front matter: weight = 10\n│   ├── book-1.md\n│   └── book-2.md\n├── films/\n│   ├── _index.md         <-- front matter: weight = 20\n│   ├── film-1.md\n│   └── film-2.md\n└── _index.md",
    "url": "https://gohugo.io/methods/page/ancestors/"
  },
  {
    "receiver": "site",
    "symbol": ".BaseURL",
    "memberSlug": "baseurl",
    "title": "BaseURL",
    "summary": "Project configuration:",
    "usage": "baseURL: https://example.org/docs/",
    "url": "https://gohugo.io/methods/site/baseurl/"
  },
  {
    "receiver": "time",
    "symbol": ".Before",
    "memberSlug": "before",
    "title": "Before",
    "summary": "Reports whether TIME1 is before TIME2.",
    "usage": "{{ $t1 := time.AsTime \"2023-01-01T17:00:00-08:00\" }}\n{{ $t2 := time.AsTime \"2030-01-01T17:00:00-08:00\" }}\n\n{{ $t1.Before $t2 }} → true",
    "url": "https://gohugo.io/methods/time/before/"
  },
  {
    "receiver": "site",
    "symbol": ".BuildDrafts",
    "memberSlug": "builddrafts",
    "title": "BuildDrafts",
    "summary": "Deprecated in v0.156.0",
    "url": "https://gohugo.io/methods/site/builddrafts/"
  },
  {
    "receiver": "page",
    "symbol": ".BundleType",
    "memberSlug": "bundletype",
    "title": "BundleType",
    "summary": "A page bundle is a directory that encapsulates both content and associated resources . There are two types of page bundles: leaf bundles and branch bundles . See details .",
    "usage": "content/\n├── films/\n│   ├── film-1/\n│   │   ├── a.jpg\n│   │   └── index.md  <-- leaf bundle\n│   ├── _index.md     <-- branch bundle\n│   ├── b.jpg\n│   ├── film-2.md\n│   └── film-3.md\n└── _index.md         <-- branch bundle",
    "url": "https://gohugo.io/methods/page/bundletype/"
  },
  {
    "receiver": "taxonomy",
    "symbol": ".ByCount",
    "memberSlug": "bycount",
    "title": "ByCount",
    "summary": "The ByCount method on a Taxonomy object returns an ordered taxonomy , sorted by the number of pages associated with each term , then sorted alphabetically by term in the event of a tie.",
    "usage": "taxonomies:\n  author: authors\n  genre: genres",
    "url": "https://gohugo.io/methods/taxonomy/bycount/"
  },
  {
    "receiver": "pages",
    "symbol": ".ByDate",
    "memberSlug": "bydate",
    "title": "ByDate",
    "summary": "When sorting by date, the value is determined by your project configuration , defaulting to the date field in front matter.",
    "usage": "{{ range .Pages.ByDate }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}",
    "url": "https://gohugo.io/methods/pages/bydate/"
  },
  {
    "receiver": "pages",
    "symbol": ".ByExpiryDate",
    "memberSlug": "byexpirydate",
    "title": "ByExpiryDate",
    "summary": "When sorting by expiration date, the value is determined by your project configuration , defaulting to the expiryDate field in front matter.",
    "usage": "{{ range .Pages.ByExpiryDate }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}",
    "url": "https://gohugo.io/methods/pages/byexpirydate/"
  },
  {
    "receiver": "pages",
    "symbol": ".ByLanguage",
    "memberSlug": "bylanguage",
    "title": "ByLanguage",
    "summary": "When sorting by language, Hugo orders the page collection using the following priority:",
    "usage": "{{ $p := slice }}\n{{ range hugo.Sites }}\n  {{ range .Pages }}\n    {{ $p = $p | append . }}\n  {{ end }}\n{{ end }}\n\n{{ range $p.ByLanguage }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}",
    "url": "https://gohugo.io/methods/pages/bylanguage/"
  },
  {
    "receiver": "pages",
    "symbol": ".ByLastmod",
    "memberSlug": "bylastmod",
    "title": "ByLastmod",
    "summary": "When sorting by last modification date, the value is determined by your project configuration , defaulting to the lastmod field in front matter.",
    "usage": "{{ range .Pages.ByLastmod }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}",
    "url": "https://gohugo.io/methods/pages/bylastmod/"
  },
  {
    "receiver": "pages",
    "symbol": ".ByLength",
    "memberSlug": "bylength",
    "title": "ByLength",
    "summary": "To sort in descending order:",
    "usage": "{{ range .Pages.ByLength }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}",
    "url": "https://gohugo.io/methods/pages/bylength/"
  },
  {
    "receiver": "pages",
    "symbol": ".ByLinkTitle",
    "memberSlug": "bylinktitle",
    "title": "ByLinkTitle",
    "summary": "To sort in descending order:",
    "usage": "{{ range .Pages.ByLinkTitle }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}",
    "url": "https://gohugo.io/methods/pages/bylinktitle/"
  },
  {
    "receiver": "menu",
    "symbol": ".ByName",
    "memberSlug": "byname",
    "title": "ByName",
    "summary": "The Sort method returns the given menu with its entries sorted by name .",
    "usage": "menus:\n  main:\n  - name: Services\n    pageRef: /services\n    weight: 10\n  - name: About\n    pageRef: /about\n    weight: 20\n  - name: Contact\n    pageRef: /contact\n    weight: 30",
    "url": "https://gohugo.io/methods/menu/byname/"
  },
  {
    "receiver": "pages",
    "symbol": ".ByParam",
    "memberSlug": "byparam",
    "title": "ByParam",
    "summary": "If the given parameter is not present in front matter, Hugo will use the matching parameter in your project configuration if present.",
    "usage": "{{ range .Pages.ByParam \"author\" }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}",
    "url": "https://gohugo.io/methods/pages/byparam/"
  },
  {
    "receiver": "pages",
    "symbol": ".ByPublishDate",
    "memberSlug": "bypublishdate",
    "title": "ByPublishDate",
    "summary": "When sorting by publish date, the value is determined by your project configuration , defaulting to the publishDate field in front matter.",
    "usage": "{{ range .Pages.ByPublishDate }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}",
    "url": "https://gohugo.io/methods/pages/bypublishdate/"
  },
  {
    "receiver": "pages",
    "symbol": ".ByTitle",
    "memberSlug": "bytitle",
    "title": "ByTitle",
    "summary": "To sort in descending order:",
    "usage": "{{ range .Pages.ByTitle }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .Title }}</a></h2>\n{{ end }}",
    "url": "https://gohugo.io/methods/pages/bytitle/"
  },
  {
    "receiver": "menu",
    "symbol": ".ByWeight",
    "memberSlug": "byweight",
    "title": "ByWeight",
    "summary": "The ByWeight method returns the given menu with its entries sorted by weight , then by name , then by identifier . This is the default sort order.",
    "usage": "menus:\n  main:\n  - identifier: about\n    name: About\n    pageRef: /about\n    weight: 20\n  - identifier: services\n    name: Services\n    pageRef: /services\n    weight: 10\n  - identifier: contact\n    name: Contact\n    pageRef: /contact\n    weight: 30",
    "url": "https://gohugo.io/methods/menu/byweight/"
  },
  {
    "receiver": "pages",
    "symbol": ".ByWeight",
    "memberSlug": "byweight",
    "title": "ByWeight",
    "summary": "Assign a weight to a page using the weight field in front matter. The weight must be a non-zero integer. Lighter items float to the top, while heavier items sink to the bottom. Unweighted or zero-weighted pages are placed at the end of the collection.",
    "usage": "{{ range .Pages.ByWeight }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}",
    "url": "https://gohugo.io/methods/pages/byweight/"
  },
  {
    "receiver": "menu-entry",
    "symbol": ".Children",
    "memberSlug": "children",
    "title": "Children",
    "summary": "Use the Children method when rendering a nested menu.",
    "usage": "menus:\n  main:\n  - name: Products\n    pageRef: /product\n    weight: 10\n  - name: Product 1\n    pageRef: /products/product-1\n    parent: Products\n    weight: 1\n  - name: Product 2\n    pageRef: /products/product-2\n    parent: Products\n    weight: 2",
    "url": "https://gohugo.io/methods/menu-entry/children/"
  },
  {
    "receiver": "page",
    "symbol": ".CodeOwners",
    "memberSlug": "codeowners",
    "title": "CodeOwners",
    "summary": "GitHub and GitLab support CODEOWNERS files. This file specifies the users responsible for developing and maintaining software and documentation. This definition can apply to the entire repository, specific directories, or to individual files. To learn more:",
    "usage": "enableGitInfo: true",
    "url": "https://gohugo.io/methods/page/codeowners/"
  },
  {
    "receiver": "resource",
    "symbol": ".Colors",
    "memberSlug": "colors",
    "title": "Colors",
    "summary": "Use this method with global resources , page resources , or remote resources .",
    "usage": "{{ with resources.Get \"images/a.jpg\" }}\n  <table>\n    <thead>\n      <tr>\n        <th>Color</th>\n        <th>Relative luminance</th>\n      </tr>\n    </thead>\n    <tbody>\n      {{ range .Colors }}\n        <tr>\n          <td>{{ .ColorHex }}</td>\n          <td>{{ .Luminance | lang.FormatNumber 4 }}</td>\n        </tr>\n      {{ end }}\n    </tbody>\n  </table>\n{{ end }}",
    "url": "https://gohugo.io/methods/resource/colors/"
  },
  {
    "receiver": "site",
    "symbol": ".Config",
    "memberSlug": "config",
    "title": "Config",
    "summary": "The Config method on a Site object provides access to a subset of your project configuration, specifically the services and privacy keys.",
    "usage": "services:\n  googleAnalytics:\n    id: G-XXXXXXXXX",
    "url": "https://gohugo.io/methods/site/config/"
  },
  {
    "receiver": "page",
    "symbol": ".Content",
    "memberSlug": "content",
    "title": "Content",
    "summary": "The Content method on a Page object renders Markdown and shortcodes to HTML.",
    "usage": "{{ .Content }}",
    "url": "https://gohugo.io/methods/page/content/"
  },
  {
    "receiver": "resource",
    "symbol": ".Content",
    "memberSlug": "content",
    "title": "Content",
    "summary": "Use this method with global resources , page resources , or remote resources .",
    "usage": "He travels the fastest who travels alone.",
    "url": "https://gohugo.io/methods/resource/content/"
  },
  {
    "receiver": "page",
    "symbol": ".ContentWithoutSummary",
    "memberSlug": "contentwithoutsummary",
    "title": "ContentWithoutSummary",
    "summary": "Applicable when using manual or automatic content summaries , the ContentWithoutSummary method on a Page object renders Markdown and shortcodes to HTML, excluding the content summary from the result.",
    "usage": "{{ .ContentWithoutSummary }}",
    "url": "https://gohugo.io/methods/page/contentwithoutsummary/",
    "sinceVersion": "0.134.0"
  },
  {
    "receiver": "site",
    "symbol": ".Copyright",
    "memberSlug": "copyright",
    "title": "Copyright",
    "summary": "Project configuration:",
    "usage": "copyright: © 2023 ABC Widgets, Inc.",
    "url": "https://gohugo.io/methods/site/copyright/"
  },
  {
    "receiver": "taxonomy",
    "symbol": ".Count",
    "memberSlug": "count",
    "title": "Count",
    "summary": "The Count method on a Taxonomy object returns the number of number of weighted pages to which the given term has been assigned.",
    "usage": "taxonomies:\n  author: authors\n  genre: genres",
    "url": "https://gohugo.io/methods/taxonomy/count/"
  },
  {
    "receiver": "resource",
    "symbol": ".Crop",
    "memberSlug": "crop",
    "title": "Crop",
    "summary": "Use this method with global resources , page resources , or remote resources .",
    "usage": "{{ with resources.Get \"images/original.jpg\" }}\n  {{ with .Crop \"200x200 TopRight\" }}\n    <img src=\"{{ .RelPermalink }}\" width=\"{{ .Width }}\" height=\"{{ .Height }}\" alt=\"\">\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/methods/resource/crop/",
    "sinceVersion": "0.153.5"
  },
  {
    "receiver": "page",
    "symbol": ".CurrentSection",
    "memberSlug": "currentsection",
    "title": "CurrentSection",
    "summary": "A section is a top-level content directory or any content directory containing an _index.md file.",
    "usage": "content/\n├── auctions/\n│   ├── 2023-11/\n│   │   ├── _index.md     <-- current section: 2023-11\n│   │   ├── auction-1.md\n│   │   └── auction-2.md  <-- current section: 2023-11\n│   ├── 2023-12/\n│   │   ├── _index.md     \n│   │   ├── auction-3.md\n│   │   └── auction-4.md\n│   ├── _index.md         <-- current section: auctions\n│   ├── bidding.md\n│   └── payment.md        <-- current section: auctions\n├── books/\n│   ├── _index.md         <-- current section: books\n│   ├── book-1.md\n│   └── book-2.md         <-- current section: books\n├── films/\n│   ├── _index.md         <-- current section: films \n│   ├── film-1.md\n│   └── film-2.md         <-- current section: films\n└── _index.md             <-- current section: home",
    "url": "https://gohugo.io/methods/page/currentsection/"
  },
  {
    "receiver": "page",
    "symbol": ".Data",
    "memberSlug": "data",
    "title": "Data",
    "summary": "The Data method on a Page object returns a unique data object for each page kind .",
    "usage": "taxonomies:\n  author: authors\n  genre: genres",
    "url": "https://gohugo.io/methods/page/data/"
  },
  {
    "receiver": "resource",
    "symbol": ".Data",
    "memberSlug": "data",
    "title": "Data",
    "summary": "The Data method on a resource returned by the resources.GetRemote function returns information from the HTTP response.",
    "usage": "{{ $url := \"https://example.org/images/a.jpg\" }}\n{{ $opts := dict \"responseHeaders\" (slice \"Server\") }}\n{{ with try (resources.GetRemote $url) }}\n  {{ with .Err }}\n    {{ errorf \"%s\" . }}\n  {{ else with .Value }}\n    {{ with .Data }}\n      {{ .ContentLength }} → 42764\n      {{ .ContentType }} → image/jpeg\n      {{ .Headers }} → map[Server:[Netlify]]\n      {{ .Status }} → 200 OK\n      {{ .StatusCode }} → 200\n      {{ .TransferEncoding }} → []\n    {{ end }}\n  {{ else }}\n    {{ errorf \"Unable to get remote resource %q\" $url }}\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/methods/resource/data/"
  },
  {
    "receiver": "site",
    "symbol": ".Data",
    "memberSlug": "data",
    "title": "Data",
    "summary": "Deprecated in v0.156.0",
    "url": "https://gohugo.io/methods/site/data/"
  },
  {
    "receiver": "page",
    "symbol": ".Date",
    "memberSlug": "date",
    "title": "Date",
    "summary": "Set the date in front matter:",
    "usage": "---\ndate: 2023-10-19T00:40:04-07:00\ntitle: Article 1\n---",
    "url": "https://gohugo.io/methods/page/date/"
  },
  {
    "receiver": "time",
    "symbol": ".Day",
    "memberSlug": "day",
    "title": "Day",
    "summary": "Returns the day of the month of the given time.Time value.",
    "usage": "{{ $t := time.AsTime \"2023-01-27T23:44:58-08:00\" }}\n{{ $t.Day }} → 27",
    "url": "https://gohugo.io/methods/time/day/"
  },
  {
    "receiver": "page",
    "symbol": ".Description",
    "memberSlug": "description",
    "title": "Description",
    "summary": "Conceptually different from a content summary , a page description is typically used in metadata about the page.",
    "usage": "---\ndescription: Instructions for making spicy tuna hand rolls.\ntitle: How to make spicy tuna hand rolls\n---",
    "url": "https://gohugo.io/methods/page/description/"
  },
  {
    "receiver": "site",
    "symbol": ".Dimension",
    "memberSlug": "dimension",
    "title": "Dimension",
    "summary": "The Dimension method on a Site object returns the dimension object for the given dimension .",
    "usage": "{{ $languageObject := .Site.Dimension \"language\" }}\n{{ $languageObject.IsDefault }} → true\n{{ $languageObject.Name }} → en\n\n{{ $versionObject := .Site.Dimension \"version\" }}\n{{ $versionObject.IsDefault }} → true\n{{ $versionObject.Name }} → v1.0.0\n\n{{ $roleObject := .Site.Dimension \"role\" }}\n{{ $roleObject.IsDefault }} → true\n{{ $roleObject.Name }} → guest",
    "url": "https://gohugo.io/methods/site/dimension/",
    "sinceVersion": "0.153.0"
  },
  {
    "receiver": "page",
    "symbol": ".Draft",
    "memberSlug": "draft",
    "title": "Draft",
    "summary": "By default, Hugo does not publish draft pages when you build your project. To include draft pages when you build your project, use the --buildDrafts command line flag.",
    "usage": "---\ndraft: true\ntitle: Post 1\n---",
    "url": "https://gohugo.io/methods/page/draft/"
  },
  {
    "receiver": "page",
    "symbol": ".Eq",
    "memberSlug": "eq",
    "title": "Eq",
    "summary": "In this contrived example we list all pages in the current section except for the current page.",
    "usage": "{{ $currentPage := . }}\n{{ range .CurrentSection.Pages }}\n  {{ if not (.Eq $currentPage) }}\n    <a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a>\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/methods/page/eq/"
  },
  {
    "receiver": "time",
    "symbol": ".Equal",
    "memberSlug": "equal",
    "title": "Equal",
    "summary": "Reports whether TIME1 is equal to TIME2.",
    "usage": "{{ $t1 := time.AsTime \"2023-01-01T17:00:00-08:00\" }}\n{{ $t2 := time.AsTime \"2023-01-01T20:00:00-05:00\" }}\n\n{{ $t1.Equal $t2 }} → true",
    "url": "https://gohugo.io/methods/time/equal/"
  },
  {
    "receiver": "resource",
    "symbol": ".Err",
    "memberSlug": "err",
    "title": "Err",
    "summary": "Deprecated in v0.141.0",
    "url": "https://gohugo.io/methods/resource/err/"
  },
  {
    "receiver": "resource",
    "symbol": ".Exif",
    "memberSlug": "exif",
    "title": "Exif",
    "summary": "Deprecated in v0.155.0",
    "url": "https://gohugo.io/methods/resource/exif/"
  },
  {
    "receiver": "page",
    "symbol": ".ExpiryDate",
    "memberSlug": "expirydate",
    "title": "ExpiryDate",
    "summary": "By default, Hugo excludes expired pages when building your project. To include expired pages, use the --buildExpired command line flag.",
    "usage": "---\nexpiryDate: 2024-10-19T00:32:13-07:00\ntitle: Article 1\n---",
    "url": "https://gohugo.io/methods/page/expirydate/"
  },
  {
    "receiver": "page",
    "symbol": ".File",
    "memberSlug": "file",
    "title": "File",
    "summary": "By default, not all pages are backed by a file, including top-level section pages , taxonomy pages , and term pages . By definition, you cannot retrieve file information when the file does not exist.",
    "usage": "content/\n└── books/\n    ├── _index.md  <-- the top-slevel section page\n    ├── book-1.md\n    └── book-2.md",
    "url": "https://gohugo.io/methods/page/file/"
  },
  {
    "receiver": "resource",
    "symbol": ".Fill",
    "memberSlug": "fill",
    "title": "Fill",
    "summary": "Use this method with global resources , page resources , or remote resources .",
    "usage": "{{ with resources.Get \"images/original.jpg\" }}\n  {{ with .Fill \"500x200 TopRight\" }}\n    <img src=\"{{ .RelPermalink }}\" width=\"{{ .Width }}\" height=\"{{ .Height }}\" alt=\"\">\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/methods/resource/fill/",
    "sinceVersion": "0.153.5"
  },
  {
    "receiver": "resource",
    "symbol": ".Filter",
    "memberSlug": "filter",
    "title": "Filter",
    "summary": "Use this method with global resources , page resources , or remote resources .",
    "usage": "{{ with resources.Get \"images/original.jpg\" }}\n  {{ with .Filter images.Grayscale }}\n    <img src=\"{{ .RelPermalink }}\" width=\"{{ .Width }}\" height=\"{{ .Height }}\" alt=\"\">\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/methods/resource/filter/"
  },
  {
    "receiver": "pager",
    "symbol": ".First",
    "memberSlug": "first",
    "title": "First",
    "summary": "Use the First method to build navigation between pagers.",
    "usage": "{{ $pages := where site.RegularPages \"Type\" \"posts\" }}\n{{ $paginator := .Paginate $pages }}\n\n{{ range $paginator.Pages }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}\n\n{{ with $paginator }}\n  <ul>\n    {{ with .First }}\n      <li><a href=\"{{ .URL }}\">First</a></li>\n    {{ end }}\n    {{ with .Prev }}\n      <li><a href=\"{{ .URL }}\">Previous</a></li>\n    {{ end }}\n    {{ with .Next }}\n      <li><a href=\"{{ .URL }}\">Next</a></li>\n    {{ end }}\n    {{ with .Last }}\n      <li><a href=\"{{ .URL }}\">Last</a></li>\n    {{ end }}\n  </ul>\n{{ end }}",
    "url": "https://gohugo.io/methods/pager/first/"
  },
  {
    "receiver": "page",
    "symbol": ".FirstSection",
    "memberSlug": "firstsection",
    "title": "FirstSection",
    "summary": "A section is a top-level content directory or any content directory containing an _index.md file.",
    "usage": "content/\n├── auctions/\n│   ├── 2023-11/\n│   │   ├── _index.md     <-- first section: auctions\n│   │   ├── auction-1.md\n│   │   └── auction-2.md  <-- first section: auctions\n│   ├── 2023-12/\n│   │   ├── _index.md     \n│   │   ├── auction-3.md\n│   │   └── auction-4.md\n│   ├── _index.md         <-- first section: auctions\n│   ├── bidding.md\n│   └── payment.md        <-- first section: auctions\n├── books/\n│   ├── _index.md         <-- first section: books\n│   ├── book-1.md\n│   └── book-2.md         <-- first section: books\n├── films/\n│   ├── _index.md         <-- first section: films\n│   ├── film-1.md\n│   └── film-2.md         <-- first section: films\n└── _index.md             <-- first section: home",
    "url": "https://gohugo.io/methods/page/firstsection/"
  },
  {
    "receiver": "resource",
    "symbol": ".Fit",
    "memberSlug": "fit",
    "title": "Fit",
    "summary": "Use this method with global resources , page resources , or remote resources .",
    "usage": "{{ with resources.Get \"images/original.jpg\" }}\n  {{ with .Fit \"300x175\" }}\n    <img src=\"{{ .RelPermalink }}\" width=\"{{ .Width }}\" height=\"{{ .Height }}\" alt=\"\">\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/methods/resource/fit/",
    "sinceVersion": "0.153.5"
  },
  {
    "receiver": "time",
    "symbol": ".Format",
    "memberSlug": "format",
    "title": "Format",
    "summary": "To localize the return value, use the time.Format function instead.",
    "usage": "{{ $t := \"2023-01-27T23:44:58-08:00\" }}\n{{ $t = time.AsTime $t }}\n{{ $format := \"2 Jan 2006\" }}\n\n{{ $t.Format $format }} → 27 Jan 2023",
    "url": "https://gohugo.io/methods/time/format/"
  },
  {
    "receiver": "page",
    "symbol": ".Fragments",
    "memberSlug": "fragments",
    "title": "Fragments",
    "summary": "In a URL, whether absolute or relative, the fragment links to an id attribute of an HTML element on the page.",
    "usage": "/articles/article-1#section-2\n------------------- ---------\n       path         fragment",
    "url": "https://gohugo.io/methods/page/fragments/"
  },
  {
    "receiver": "page",
    "symbol": ".FuzzyWordCount",
    "memberSlug": "fuzzywordcount",
    "title": "FuzzyWordCount",
    "summary": "To get the exact word count, use the WordCount method.",
    "usage": "{{ .FuzzyWordCount }} → 200",
    "url": "https://gohugo.io/methods/page/fuzzywordcount/"
  },
  {
    "receiver": "shortcode",
    "symbol": ".Get",
    "memberSlug": "get",
    "title": "Get",
    "summary": "Specify the argument by position or by name. When calling a shortcode within Markdown, use either positional or named argument, but not both.",
    "usage": "{{< myshortcode \"Hello\" \"world\" >}}",
    "url": "https://gohugo.io/methods/shortcode/get/"
  },
  {
    "receiver": "taxonomy",
    "symbol": ".Get",
    "memberSlug": "get",
    "title": "Get",
    "summary": "The Get method on a Taxonomy object returns a slice of weighted pages to which the given term has been assigned.",
    "usage": "taxonomies:\n  author: authors\n  genre: genres",
    "url": "https://gohugo.io/methods/taxonomy/get/"
  },
  {
    "receiver": "page",
    "symbol": ".GetPage",
    "memberSlug": "getpage",
    "title": "GetPage",
    "summary": "The GetPage method is also available on a Site object. See details .",
    "usage": "content/\n├── works/\n│   ├── paintings/\n│   │   ├── _index.md\n│   │   ├── starry-night.md\n│   │   └── the-mona-lisa.md\n│   ├── sculptures/\n│   │   ├── _index.md\n│   │   ├── david.md\n│   │   └── the-thinker.md\n│   └── _index.md\n└── _index.md",
    "url": "https://gohugo.io/methods/page/getpage/"
  },
  {
    "receiver": "site",
    "symbol": ".GetPage",
    "memberSlug": "getpage",
    "title": "GetPage",
    "summary": "The GetPage method is also available on Page objects, allowing you to specify a path relative to the current page. See details .",
    "usage": "content/\n├── works/\n│   ├── paintings/\n│   │   ├── _index.md\n│   │   ├── starry-night.md\n│   │   └── the-mona-lisa.md\n│   ├── sculptures/\n│   │   ├── _index.md\n│   │   ├── david.md\n│   │   └── the-thinker.md\n│   └── _index.md\n└── _index.md",
    "url": "https://gohugo.io/methods/site/getpage/"
  },
  {
    "receiver": "page",
    "symbol": ".GetTerms",
    "memberSlug": "getterms",
    "title": "GetTerms",
    "summary": "Given this front matter:",
    "usage": "---\ntags:\n- historical\n- classic\n- fiction\ntitle: Les Misérables\n---",
    "url": "https://gohugo.io/methods/page/getterms/"
  },
  {
    "receiver": "page",
    "symbol": ".GitInfo",
    "memberSlug": "gitinfo",
    "title": "GitInfo",
    "summary": "The GitInfo method on a Page object provides access to commit metadata from your Git history, such as the author's name, the commit hash, and the commit message.",
    "usage": "enableGitInfo: true",
    "url": "https://gohugo.io/methods/page/gitinfo/",
    "sinceVersion": "0.157.0"
  },
  {
    "receiver": "pages",
    "symbol": ".GroupBy",
    "memberSlug": "groupby",
    "title": "GroupBy",
    "summary": "For the optional sort order, specify either asc for ascending order, or desc for descending order.",
    "usage": "{{ range .Pages.GroupBy \"Section\" }}\n  <p>{{ .Key }}</p>\n  <ul>\n    {{ range .Pages }}\n      <li><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></li>\n    {{ end }}\n  </ul>\n{{ end }}",
    "url": "https://gohugo.io/methods/pages/groupby/"
  },
  {
    "receiver": "pages",
    "symbol": ".GroupByDate",
    "memberSlug": "groupbydate",
    "title": "GroupByDate",
    "summary": "When grouping by date, the value is determined by your project configuration , defaulting to the date field in front matter.",
    "usage": "{{ range .Pages.GroupByDate \"January 2006\" }}\n  <p>{{ .Key }}</p>\n  <ul>\n    {{ range .Pages }}\n      <li><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></li>\n    {{ end }}\n  </ul>\n{{ end }}",
    "url": "https://gohugo.io/methods/pages/groupbydate/"
  },
  {
    "receiver": "pages",
    "symbol": ".GroupByExpiryDate",
    "memberSlug": "groupbyexpirydate",
    "title": "GroupByExpiryDate",
    "summary": "When grouping by expiration date, the value is determined by your project configuration , defaulting to the expiryDate field in front matter.",
    "usage": "{{ range .Pages.GroupByExpiryDate \"January 2006\" }}\n  <p>{{ .Key }}</p>\n  <ul>\n    {{ range .Pages }}\n      <li><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></li>\n    {{ end }}\n  </ul>\n{{ end }}",
    "url": "https://gohugo.io/methods/pages/groupbyexpirydate/"
  },
  {
    "receiver": "pages",
    "symbol": ".GroupByLastmod",
    "memberSlug": "groupbylastmod",
    "title": "GroupByLastmod",
    "summary": "When grouping by last modification date, the value is determined by your project configuration , defaulting to the lastmod field in front matter.",
    "usage": "{{ range .Pages.GroupByLastmod \"January 2006\" }}\n  <p>{{ .Key }}</p>\n  <ul>\n    {{ range .Pages }}\n      <li><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></li>\n    {{ end }}\n  </ul>\n{{ end }}",
    "url": "https://gohugo.io/methods/pages/groupbylastmod/"
  },
  {
    "receiver": "pages",
    "symbol": ".GroupByParam",
    "memberSlug": "groupbyparam",
    "title": "GroupByParam",
    "summary": "For the optional sort order, specify either asc for ascending order, or desc for descending order.",
    "usage": "{{ range .Pages.GroupByParam \"color\" }}\n  <p>{{ .Key | title }}</p>\n  <ul>\n    {{ range .Pages }}\n      <li><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></li>\n    {{ end }}\n  </ul>\n{{ end }}",
    "url": "https://gohugo.io/methods/pages/groupbyparam/"
  },
  {
    "receiver": "pages",
    "symbol": ".GroupByParamDate",
    "memberSlug": "groupbyparamdate",
    "title": "GroupByParamDate",
    "summary": "The layout string has the same format as the layout string for the time.Format function. The resulting group key is localized for language and region.",
    "usage": "{{ range .Pages.GroupByParamDate \"eventDate\" \"January 2006\" }}\n  <p>{{ .Key }}</p>\n  <ul>\n    {{ range .Pages }}\n      <li><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></li>\n    {{ end }}\n  </ul>\n{{ end }}",
    "url": "https://gohugo.io/methods/pages/groupbyparamdate/"
  },
  {
    "receiver": "pages",
    "symbol": ".GroupByPublishDate",
    "memberSlug": "groupbypublishdate",
    "title": "GroupByPublishDate",
    "summary": "When grouping by publish date, the value is determined by your project configuration , defaulting to the publishDate field in front matter.",
    "usage": "{{ range .Pages.GroupByPublishDate \"January 2006\" }}\n  <p>{{ .Key }}</p>\n  <ul>\n    {{ range .Pages }}\n      <li><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></li>\n    {{ end }}\n  </ul>\n{{ end }}",
    "url": "https://gohugo.io/methods/pages/groupbypublishdate/"
  },
  {
    "receiver": "menu-entry",
    "symbol": ".HasChildren",
    "memberSlug": "haschildren",
    "title": "HasChildren",
    "summary": "Use the HasChildren method when rendering a nested menu.",
    "usage": "menus:\n  main:\n  - name: Products\n    pageRef: /product\n    weight: 10\n  - name: Product 1\n    pageRef: /products/product-1\n    parent: Products\n    weight: 1\n  - name: Product 2\n    pageRef: /products/product-2\n    parent: Products\n    weight: 2",
    "url": "https://gohugo.io/methods/menu-entry/haschildren/"
  },
  {
    "receiver": "page",
    "symbol": ".HasMenuCurrent",
    "memberSlug": "hasmenucurrent",
    "title": "HasMenuCurrent",
    "summary": "If the Page object associated with the menu entry is a section, this method also returns true for any descendant of that section.",
    "usage": "{{ $currentPage := . }}\n{{ range site.Menus.main }}\n  {{ if $currentPage.IsMenuCurrent .Menu . }}\n    <a class=\"active\" aria-current=\"page\" href=\"{{ .URL }}\">{{ .Name }}</a>\n  {{ else if $currentPage.HasMenuCurrent .Menu . }}\n    <a class=\"ancestor\" aria-current=\"true\" href=\"{{ .URL }}\">{{ .Name }}</a>\n  {{ else }}\n    <a href=\"{{ .URL }}\">{{ .Name }}</a>\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/methods/page/hasmenucurrent/"
  },
  {
    "receiver": "pager",
    "symbol": ".HasNext",
    "memberSlug": "hasnext",
    "title": "HasNext",
    "summary": "Use the HasNext method to build navigation between pagers.",
    "usage": "{{ $pages := where site.RegularPages \"Type\" \"posts\" }}\n{{ $paginator := .Paginate $pages }}\n\n{{ range $paginator.Pages }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}\n\n{{ with $paginator }}\n  <ul>\n    {{ with .First }}\n      <li><a href=\"{{ .URL }}\">First</a></li>\n    {{ end }}\n    {{ if .HasPrev }}\n      <li><a href=\"{{ .Prev.URL }}\">Previous</a></li>\n    {{ end }}\n    {{ if .HasNext }}\n      <li><a href=\"{{ .Next.URL }}\">Next</a></li>\n    {{ end }}\n    {{ with .Last }}\n      <li><a href=\"{{ .URL }}\">Last</a></li>\n    {{ end }}\n  </ul>\n{{ end }}",
    "url": "https://gohugo.io/methods/pager/hasnext/"
  },
  {
    "receiver": "pager",
    "symbol": ".HasPrev",
    "memberSlug": "hasprev",
    "title": "HasPrev",
    "summary": "Use the HasPrev method to build navigation between pagers.",
    "usage": "{{ $pages := where site.RegularPages \"Type\" \"posts\" }}\n{{ $paginator := .Paginate $pages }}\n\n{{ range $paginator.Pages }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}\n\n{{ with $paginator }}\n  <ul>\n    {{ with .First }}\n      <li><a href=\"{{ .URL }}\">First</a></li>\n    {{ end }}\n    {{ if .HasPrev }}\n      <li><a href=\"{{ .Prev.URL }}\">Previous</a></li>\n    {{ end }}\n    {{ if .HasNext }}\n      <li><a href=\"{{ .Next.URL }}\">Next</a></li>\n    {{ end }}\n    {{ with .Last }}\n      <li><a href=\"{{ .URL }}\">Last</a></li>\n    {{ end }}\n  </ul>\n{{ end }}",
    "url": "https://gohugo.io/methods/pager/hasprev/"
  },
  {
    "receiver": "page",
    "symbol": ".HasShortcode",
    "memberSlug": "hasshortcode",
    "title": "HasShortcode",
    "summary": "By example, let's use Plotly to render a chart:",
    "usage": "{{< plotly >}}\n{\n  \"data\": [\n    {\n      \"x\": [\"giraffes\", \"orangutans\", \"monkeys\"],\n      \"y\": [20, 14, 23],\n      \"type\": \"bar\"\n    }\n  ],\n}\n{{< /plotly >}}",
    "url": "https://gohugo.io/methods/page/hasshortcode/"
  },
  {
    "receiver": "page",
    "symbol": ".HeadingsFiltered",
    "memberSlug": "headingsfiltered",
    "title": "HeadingsFiltered",
    "summary": "Use in conjunction with the Related method on a Pages object. See details .",
    "url": "https://gohugo.io/methods/page/headingsfiltered/"
  },
  {
    "receiver": "resource",
    "symbol": ".Height",
    "memberSlug": "height",
    "title": "Height",
    "summary": "Use this method with global resources , page resources , or remote resources .",
    "usage": "{{ with resources.GetMatch \"images/featured.*\" }}\n  {{ if reflect.IsImageResourceWithMeta . }}\n    <img src=\"{{ .RelPermalink }}\" width=\"{{ .Width }}\" height=\"{{ .Height }}\" alt=\"\">\n  {{ else }}\n    <img src=\"{{ .RelPermalink }}\" alt=\"\">\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/methods/resource/height/"
  },
  {
    "receiver": "site",
    "symbol": ".Home",
    "memberSlug": "home",
    "title": "Home",
    "summary": "The Home method on a Site object is a convenient way to access the home page, and is functionally equivalent to:",
    "usage": "{{ .Site.GetPage \"/\" }}",
    "url": "https://gohugo.io/methods/site/home/"
  },
  {
    "receiver": "time",
    "symbol": ".Hour",
    "memberSlug": "hour",
    "title": "Hour",
    "summary": "Returns the hour within the day of the given time.Time value, in the range [0, 23].",
    "usage": "{{ $t := time.AsTime \"2023-01-27T23:44:58-08:00\" }}\n{{ $t.Hour }} → 23",
    "url": "https://gohugo.io/methods/time/hour/"
  },
  {
    "receiver": "duration",
    "symbol": ".Hours",
    "memberSlug": "hours",
    "title": "Hours",
    "summary": "Returns the time.Duration value as a floating point number of hours.",
    "usage": "{{ $d = time.ParseDuration \"3.5h2.5m1.5s\" }}\n{{ $d.Hours }} → 3.5420833333333333",
    "url": "https://gohugo.io/methods/duration/hours/"
  },
  {
    "receiver": "menu-entry",
    "symbol": ".Identifier",
    "memberSlug": "identifier",
    "title": "Identifier",
    "summary": "The Identifier method returns the identifier property of the menu entry. If you define the menu entry automatically , it returns the page's section.",
    "usage": "menus:\n  main:\n  - identifier: about\n    name: About\n    pageRef: /about\n    weight: 10\n  - identifier: contact\n    name: Contact\n    pageRef: /contact\n    weight: 20",
    "url": "https://gohugo.io/methods/menu-entry/identifier/"
  },
  {
    "receiver": "shortcode",
    "symbol": ".Inner",
    "memberSlug": "inner",
    "title": "Inner",
    "summary": "This content:",
    "usage": "{{< card title=\"Product Design\" >}}\nWe design the **best** widgets in the world.\n{{< /card >}}",
    "url": "https://gohugo.io/methods/shortcode/inner/"
  },
  {
    "receiver": "shortcode",
    "symbol": ".InnerDeindent",
    "memberSlug": "innerdeindent",
    "title": "InnerDeindent",
    "summary": "Similar to the Inner method, InnerDeindent returns the content between opening and closing shortcode tags. However, with InnerDeindent , indentation before the content is removed.",
    "usage": "- Gallery one\n\n    {{< gallery >}}\n    ![kitten a](thumbnails/a.jpg)\n    ![kitten b](thumbnails/b.jpg)\n    {{< /gallery >}}\n\n- Gallery two\n\n    {{< gallery >}}\n    ![kitten c](thumbnails/c.jpg)\n    ![kitten d](thumbnails/d.jpg)\n    {{< /gallery >}}",
    "url": "https://gohugo.io/methods/shortcode/innerdeindent/"
  },
  {
    "receiver": "page",
    "symbol": ".InSection",
    "memberSlug": "insection",
    "title": "InSection",
    "summary": "A section is a top-level content directory or any content directory containing an _index.md file.",
    "usage": "content/\n├── auctions/\n│   ├── 2023-11/\n│   │   ├── _index.md\n│   │   ├── auction-1.md\n│   │   └── auction-2.md\n│   ├── 2023-12/\n│   │   ├── _index.md\n│   │   ├── auction-3.md\n│   │   └── auction-4.md\n│   ├── _index.md\n│   ├── bidding.md\n│   └── payment.md\n└── _index.md",
    "url": "https://gohugo.io/methods/page/insection/"
  },
  {
    "receiver": "page",
    "symbol": ".IsAncestor",
    "memberSlug": "isancestor",
    "title": "IsAncestor",
    "summary": "With this content structure:",
    "usage": "content/\n├── auctions/\n│   ├── 2023-11/\n│   │   ├── _index.md\n│   │   ├── auction-1.md\n│   │   └── auction-2.md\n│   ├── 2023-12/\n│   │   ├── _index.md\n│   │   ├── auction-3.md\n│   │   └── auction-4.md\n│   ├── _index.md\n│   ├── bidding.md\n│   └── payment.md\n└── _index.md",
    "url": "https://gohugo.io/methods/page/isancestor/"
  },
  {
    "receiver": "site",
    "symbol": ".IsDefault",
    "memberSlug": "isdefault",
    "title": "IsDefault",
    "summary": "The IsDefault method on a Site object reports whether the given site is the default site across all dimensions: language , version , and role . This is useful to ensure that a block of code executes only once per build, regardless of the number of sites generated by your dimensions .",
    "usage": "languages:\n  de:\n    contentDir: content/de\n    direction: ltr\n    label: Deutsch\n    locale: de-DE\n    title: Projekt Dokumentation\n    weight: 1\n  en:\n    contentDir: content/en\n    direction: ltr\n    label: English\n    locale: en-US\n    title: Project Documentation\n    weight: 2\nversions:\n  v1.0.0: {}\n  v2.0.0: {}\n  v3.0.0: {}",
    "url": "https://gohugo.io/methods/site/isdefault/",
    "sinceVersion": "0.156.0"
  },
  {
    "receiver": "page",
    "symbol": ".IsDescendant",
    "memberSlug": "isdescendant",
    "title": "IsDescendant",
    "summary": "With this content structure:",
    "usage": "content/\n├── auctions/\n│   ├── 2023-11/\n│   │   ├── _index.md\n│   │   ├── auction-1.md\n│   │   └── auction-2.md\n│   ├── 2023-12/\n│   │   ├── _index.md\n│   │   ├── auction-3.md\n│   │   └── auction-4.md\n│   ├── _index.md\n│   ├── bidding.md\n│   └── payment.md\n└── _index.md",
    "url": "https://gohugo.io/methods/page/isdescendant/"
  },
  {
    "receiver": "time",
    "symbol": ".IsDST",
    "memberSlug": "isdst",
    "title": "IsDST",
    "summary": "Reports whether the given time.Time value is in Daylight Savings Time.",
    "usage": "{{ $t1 := time.AsTime \"2023-01-01T00:00:00-08:00\" }}\n{{ $t2 := time.AsTime \"2023-07-01T00:00:00-07:00\" }}\n\n{{ $t1.IsDST }} → false\n{{ $t2.IsDST }} → true",
    "url": "https://gohugo.io/methods/time/isdst/"
  },
  {
    "receiver": "page",
    "symbol": ".IsHome",
    "memberSlug": "ishome",
    "title": "IsHome",
    "summary": "The IsHome method on a Page object returns true if the page kind is home .",
    "usage": "content/\n├── books/\n│   ├── book-1/\n│   │   └── index.md  <-- kind = page\n│   ├── book-2.md     <-- kind = page\n│   └── _index.md     <-- kind = section\n└── _index.md         <-- kind = home",
    "url": "https://gohugo.io/methods/page/ishome/"
  },
  {
    "receiver": "page",
    "symbol": ".IsMenuCurrent",
    "memberSlug": "ismenucurrent",
    "title": "IsMenuCurrent",
    "summary": "See menu templates for a complete example.",
    "usage": "{{ $currentPage := . }}\n{{ range site.Menus.main }}\n  {{ if $currentPage.IsMenuCurrent .Menu . }}\n    <a class=\"active\" aria-current=\"page\" href=\"{{ .URL }}\">{{ .Name }}</a>\n  {{ else if $currentPage.HasMenuCurrent .Menu . }}\n    <a class=\"ancestor\" aria-current=\"true\" href=\"{{ .URL }}\">{{ .Name }}</a>\n  {{ else }}\n    <a href=\"{{ .URL }}\">{{ .Name }}</a>\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/methods/page/ismenucurrent/"
  },
  {
    "receiver": "shortcode",
    "symbol": ".IsNamedParams",
    "memberSlug": "isnamedparams",
    "title": "IsNamedParams",
    "summary": "To support both positional and named arguments when calling a shortcode, use the IsNamedParams method to determine how the shortcode was called.",
    "usage": "{{ if .IsNamedParams }}\n  {{ printf \"%s %s.\" (.Get \"greeting\") (.Get \"firstName\") }}\n{{ else }}\n  {{ printf \"%s %s.\" (.Get 0) (.Get 1) }}\n{{ end }}",
    "url": "https://gohugo.io/methods/shortcode/isnamedparams/"
  },
  {
    "receiver": "page",
    "symbol": ".IsNode",
    "memberSlug": "isnode",
    "title": "IsNode",
    "summary": "The IsNode method on a Page object checks if the page kind is one of the following: home , section , taxonomy , or term . If it is, the method returns true , indicating the page is a node . Otherwise, if the page kind is page, it returns false .",
    "usage": "content/\n├── books/\n│   ├── book-1/\n│   │   └── index.md    <-- kind = page      IsNode = false\n│   ├── book-2.md       <-- kind = page      IsNode = false\n│   └── _index.md       <-- kind = section   IsNode = true\n├── tags\n│   ├── fiction   \n│   │   └── _index.md   <-- kind = term      IsNode = true\n│   └── _index.md       <-- kind = taxonomy  IsNode = true\n└── _index.md           <-- kind = home      IsNode = true",
    "url": "https://gohugo.io/methods/page/isnode/"
  },
  {
    "receiver": "page",
    "symbol": ".IsPage",
    "memberSlug": "ispage",
    "title": "IsPage",
    "summary": "The IsPage method on a Page object returns true if the page kind is page .",
    "usage": "content/\n├── books/\n│   ├── book-1/\n│   │   └── index.md  <-- kind = page\n│   ├── book-2.md     <-- kind = page\n│   └── _index.md     <-- kind = section\n└── _index.md         <-- kind = home",
    "url": "https://gohugo.io/methods/page/ispage/"
  },
  {
    "receiver": "page",
    "symbol": ".IsSection",
    "memberSlug": "issection",
    "title": "IsSection",
    "summary": "The IsSection method on a Page object returns true if the page kind is section .",
    "usage": "content/\n├── books/\n│   ├── book-1/\n│   │   └── index.md  <-- kind = page\n│   ├── book-2.md     <-- kind = page\n│   └── _index.md     <-- kind = section\n└── _index.md         <-- kind = home",
    "url": "https://gohugo.io/methods/page/issection/"
  },
  {
    "receiver": "page",
    "symbol": ".IsTranslated",
    "memberSlug": "istranslated",
    "title": "IsTranslated",
    "summary": "With this project configuration:",
    "usage": "defaultContentLanguage: en\nlanguages:\n  de:\n    contentDir: content/de\n    label: Deutsch\n    locale: de-DE\n    weight: 2\n  en:\n    contentDir: content/en\n    label: English\n    locale: en-US\n    weight: 1",
    "url": "https://gohugo.io/methods/page/istranslated/"
  },
  {
    "receiver": "time",
    "symbol": ".IsZero",
    "memberSlug": "iszero",
    "title": "IsZero",
    "summary": "Reports whether the given time.Time value represents the zero time instant, January 1, year 1, 00:00:00 UTC.",
    "usage": "{{ $t1 := time.AsTime \"2023-01-01T00:00:00-08:00\" }}\n{{ $t2 := time.AsTime \"0001-01-01T00:00:00-00:00\" }}\n\n{{ $t1.IsZero }} → false\n{{ $t2.IsZero }} → true\n```",
    "url": "https://gohugo.io/methods/time/iszero/"
  },
  {
    "receiver": "menu-entry",
    "symbol": ".KeyName",
    "memberSlug": "keyname",
    "title": "KeyName",
    "summary": "In this menu definition, the second entry does not contain an identifier , so the Identifier method returns its name property instead:",
    "usage": "menus:\n  main:\n  - identifier: about\n    name: About\n    pageRef: /about\n    weight: 10\n  - name: Contact\n    pageRef: /contact\n    weight: 20",
    "url": "https://gohugo.io/methods/menu-entry/keyname/"
  },
  {
    "receiver": "page",
    "symbol": ".Keywords",
    "memberSlug": "keywords",
    "title": "Keywords",
    "summary": "By default, Hugo evaluates the keywords when creating collections of related content .",
    "usage": "---\nkeywords:\n- tuna\n- sriracha\n- nori\n- rice\ntitle: How to make spicy tuna hand rolls\n---",
    "url": "https://gohugo.io/methods/page/keywords/"
  },
  {
    "receiver": "page",
    "symbol": ".Kind",
    "memberSlug": "kind",
    "title": "Kind",
    "summary": "The page kind is one of home , page , section , taxonomy , or term .",
    "usage": "content/\n├── books/\n│   ├── book-1/\n│   │   └── index.md    <-- kind = page\n│   ├── book-2.md       <-- kind = page\n│   └── _index.md       <-- kind = section\n├── tags/\n│   ├── fiction/\n│   │   └── _index.md   <-- kind = term\n│   └── _index.md       <-- kind = taxonomy\n└── _index.md           <-- kind = home",
    "url": "https://gohugo.io/methods/page/kind/"
  },
  {
    "receiver": "page",
    "symbol": ".Language",
    "memberSlug": "language",
    "title": "Language",
    "summary": "The Language method on a Page object returns the Language object for the given page, derived from the language definition in your project configuration.",
    "usage": "languages:\n  de:\n    direction: ltr\n    label: Deutsch\n    locale: de-DE\n    weight: 2",
    "url": "https://gohugo.io/methods/page/language/",
    "sinceVersion": "0.158.0"
  },
  {
    "receiver": "site",
    "symbol": ".Language",
    "memberSlug": "language",
    "title": "Language",
    "summary": "The Language method on a Site object returns the Language object for the given site, derived from the language definition in your project configuration.",
    "usage": "languages:\n  de:\n    direction: ltr\n    label: Deutsch\n    locale: de-DE\n    weight: 2",
    "url": "https://gohugo.io/methods/site/language/",
    "sinceVersion": "0.158.0"
  },
  {
    "receiver": "site",
    "symbol": ".LanguagePrefix",
    "memberSlug": "languageprefix",
    "title": "LanguagePrefix",
    "summary": "Consider this project configuration:",
    "usage": "defaultContentLanguage: de\ndefaultContentLanguageInSubdir: false\nlanguages:\n  de:\n    direction: ltr\n    label: Deutsch\n    locale: de-DE\n    title: Projekt Dokumentation\n    weight: 1\n  en:\n    direction: ltr\n    label: English\n    locale: en-US\n    title: Project Documentation\n    weight: 2",
    "url": "https://gohugo.io/methods/site/languageprefix/"
  },
  {
    "receiver": "site",
    "symbol": ".Languages",
    "memberSlug": "languages",
    "title": "Languages",
    "summary": "Deprecated in v0.156.0",
    "url": "https://gohugo.io/methods/site/languages/"
  },
  {
    "receiver": "pager",
    "symbol": ".Last",
    "memberSlug": "last",
    "title": "Last",
    "summary": "Use the Last method to build navigation between pagers.",
    "usage": "{{ $pages := where site.RegularPages \"Type\" \"posts\" }}\n{{ $paginator := .Paginate $pages }}\n\n{{ range $paginator.Pages }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}\n\n{{ with $paginator }}\n  <ul>\n    {{ with .First }}\n      <li><a href=\"{{ .URL }}\">First</a></li>\n    {{ end }}\n    {{ with .Prev }}\n      <li><a href=\"{{ .URL }}\">Previous</a></li>\n    {{ end }}\n    {{ with .Next }}\n      <li><a href=\"{{ .URL }}\">Next</a></li>\n    {{ end }}\n    {{ with .Last }}\n      <li><a href=\"{{ .URL }}\">Last</a></li>\n    {{ end }}\n  </ul>\n{{ end }}",
    "url": "https://gohugo.io/methods/pager/last/"
  },
  {
    "receiver": "page",
    "symbol": ".Lastmod",
    "memberSlug": "lastmod",
    "title": "Lastmod",
    "summary": "Set the last modification date in front matter:",
    "usage": "---\nlastmod: 2023-10-19T00:40:04-07:00\ntitle: Article 1\n---",
    "url": "https://gohugo.io/methods/page/lastmod/"
  },
  {
    "receiver": "site",
    "symbol": ".Lastmod",
    "memberSlug": "lastmod",
    "title": "Lastmod",
    "summary": "The Lastmod method on a Site object returns a time.Time value. Use this with time functions and methods . For example:",
    "usage": "{{ .Site.Lastmod | time.Format \":date_long\" }} → January 31, 2024",
    "url": "https://gohugo.io/methods/site/lastmod/"
  },
  {
    "receiver": "page",
    "symbol": ".Layout",
    "memberSlug": "layout",
    "title": "Layout",
    "summary": "Specify the layout field in front matter to target a particular template. See details .",
    "usage": "---\nlayout: contact\ntitle: Contact\n---",
    "url": "https://gohugo.io/methods/page/layout/"
  },
  {
    "receiver": "page",
    "symbol": ".Len",
    "memberSlug": "len",
    "title": "Len",
    "summary": "Returns the length, in bytes, of the rendered content of the given page.",
    "usage": "{{ .Len }} → 42",
    "url": "https://gohugo.io/methods/page/len/"
  },
  {
    "receiver": "pages",
    "symbol": ".Len",
    "memberSlug": "len",
    "title": "Len",
    "summary": "Returns the number of pages in the given page collection.",
    "usage": "{{ .Pages.Len }} → 42",
    "url": "https://gohugo.io/methods/pages/len/"
  },
  {
    "receiver": "menu",
    "symbol": ".Limit",
    "memberSlug": "limit",
    "title": "Limit",
    "summary": "The Limit method returns the given menu, limited to the first N entries.",
    "usage": "menus:\n  main:\n  - name: Services\n    pageRef: /services\n    weight: 10\n  - name: About\n    pageRef: /about\n    weight: 20\n  - name: Contact\n    pageRef: /contact\n    weight: 30",
    "url": "https://gohugo.io/methods/menu/limit/"
  },
  {
    "receiver": "pages",
    "symbol": ".Limit",
    "memberSlug": "limit",
    "title": "Limit",
    "summary": "Returns the first N pages from the given page collection.",
    "usage": "{{ range .Pages.Limit 3 }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}",
    "url": "https://gohugo.io/methods/pages/limit/"
  },
  {
    "receiver": "page",
    "symbol": ".LinkTitle",
    "memberSlug": "linktitle",
    "title": "LinkTitle",
    "summary": "The LinkTitle method returns the linkTitle field as defined in front matter, falling back to the value returned by the Title method.",
    "usage": "---\nlinkTitle: Dessert recipes\ntitle: Seventeen delightful recipes for healthy desserts\n---",
    "url": "https://gohugo.io/methods/page/linktitle/"
  },
  {
    "receiver": "time",
    "symbol": ".Local",
    "memberSlug": "local",
    "title": "Local",
    "summary": "Returns the given time.Time value with the location set to local time.",
    "usage": "{{ $t := time.AsTime \"2023-01-28T07:44:58+00:00\" }}\n{{ $t.Local }} → 2023-01-27 23:44:58 -0800 PST",
    "url": "https://gohugo.io/methods/time/local/"
  },
  {
    "receiver": "site",
    "symbol": ".MainSections",
    "memberSlug": "mainsections",
    "title": "MainSections",
    "summary": "Project configuration:",
    "usage": "mainSections:\n- books\n- films",
    "url": "https://gohugo.io/methods/site/mainsections/"
  },
  {
    "receiver": "output-format",
    "symbol": ".MediaType",
    "memberSlug": "mediatype",
    "title": "MediaType",
    "summary": "To use this method you must first select a specific output format from a page's OutputFormats collection using the Get or Canonical methods.",
    "usage": "{{ with .Site.Home.OutputFormats.Get \"rss\" }}\n  {{ with .MediaType }}\n    {{ .Type }}       → application/rss+xml\n    {{ .MainType }}   → application\n    {{ .SubType }}    → rss\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/methods/output-format/mediatype/"
  },
  {
    "receiver": "resource",
    "symbol": ".MediaType",
    "memberSlug": "mediatype",
    "title": "MediaType",
    "summary": "Use this method with global resources , page resources , or remote resources .",
    "usage": "{{ with resources.Get \"images/a.jpg\" }}\n  {{ .MediaType.Type }} → image/jpeg\n{{ end }}",
    "url": "https://gohugo.io/methods/resource/mediatype/"
  },
  {
    "receiver": "menu-entry",
    "symbol": ".Menu",
    "memberSlug": "menu",
    "title": "Menu",
    "summary": "Use this method with the IsMenuCurrent and HasMenuCurrent methods on a Page object to set \"active\" and \"ancestor\" classes on a rendered entry. See this example .",
    "usage": "{{ range .Site.Menus.main }}\n  {{ .Menu }} → main\n{{ end }}",
    "url": "https://gohugo.io/methods/menu-entry/menu/"
  },
  {
    "receiver": "site",
    "symbol": ".Menus",
    "memberSlug": "menus",
    "title": "Menus",
    "summary": "The Menus method on a Site object returns a collection of menus, where each menu contains one or more entries, either flat or nested. Each entry points to a page within the site, or to an external resource.",
    "usage": "menus:\n  footer:\n  - name: Legal\n    pageRef: /legal\n    weight: 10\n  - name: Privacy\n    pageRef: /privacy\n    weight: 20\n  main:\n  - name: Home\n    pageRef: /\n    weight: 10\n  - name: Books\n    pageRef: /books\n    weight: 20\n  - name: Films\n    pageRef: /films\n    weight: 30",
    "url": "https://gohugo.io/methods/site/menus/"
  },
  {
    "receiver": "resource",
    "symbol": ".Meta",
    "memberSlug": "meta",
    "title": "Meta",
    "summary": "Use this method with global resources , page resources , or remote resources .",
    "usage": "{{ with resources.GetMatch \"images/featured.*\" }}\n  {{ if reflect.IsImageResourceWithMeta . }}\n    {{ with .Meta }}\n      {{ .Date.Format \"2006-01-02\" }}\n    {{ end }}\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/methods/resource/meta/",
    "sinceVersion": "0.155.3"
  },
  {
    "receiver": "duration",
    "symbol": ".Microseconds",
    "memberSlug": "microseconds",
    "title": "Microseconds",
    "summary": "Returns the time.Duration value as an integer microsecond count.",
    "usage": "{{ $d = time.ParseDuration \"3.5h2.5m1.5s\" }}\n{{ $d.Microseconds }} → 12751500000",
    "url": "https://gohugo.io/methods/duration/microseconds/"
  },
  {
    "receiver": "duration",
    "symbol": ".Milliseconds",
    "memberSlug": "milliseconds",
    "title": "Milliseconds",
    "summary": "Returns the time.Duration value as an integer millisecond count.",
    "usage": "{{ $d = time.ParseDuration \"3.5h2.5m1.5s\" }}\n{{ $d.Milliseconds }} → 12751500",
    "url": "https://gohugo.io/methods/duration/milliseconds/"
  },
  {
    "receiver": "time",
    "symbol": ".Minute",
    "memberSlug": "minute",
    "title": "Minute",
    "summary": "Returns the minute offset within the hour of the given time.Time value, in the range [0, 59].",
    "usage": "{{ $t := time.AsTime \"2023-01-27T23:44:58-08:00\" }}\n{{ $t.Minute }} → 44",
    "url": "https://gohugo.io/methods/time/minute/"
  },
  {
    "receiver": "duration",
    "symbol": ".Minutes",
    "memberSlug": "minutes",
    "title": "Minutes",
    "summary": "Returns the time.Duration value as a floating point number of minutes.",
    "usage": "{{ $d = time.ParseDuration \"3.5h2.5m1.5s\" }}\n{{ $d.Minutes }} → 212.525",
    "url": "https://gohugo.io/methods/duration/minutes/"
  },
  {
    "receiver": "time",
    "symbol": ".Month",
    "memberSlug": "month",
    "title": "Month",
    "summary": "To convert the time.Month value to a string:",
    "usage": "{{ $t := time.AsTime \"2023-01-27T23:44:58-08:00\" }}\n{{ $t.Month.String }} → January",
    "url": "https://gohugo.io/methods/time/month/"
  },
  {
    "receiver": "menu-entry",
    "symbol": ".Name",
    "memberSlug": "name",
    "title": "Name",
    "summary": "If you define the menu entry automatically , the Name method returns the page's LinkTitle , falling back to its Title .",
    "usage": "<ul>\n  {{ range .Site.Menus.main }}\n    <li><a href=\"{{ .URL }}\">{{ .Name }}</a></li>\n  {{ end }}\n</ul>",
    "url": "https://gohugo.io/methods/menu-entry/name/"
  },
  {
    "receiver": "output-format",
    "symbol": ".Name",
    "memberSlug": "name",
    "title": "Name",
    "summary": "To use this method you must first select a specific output format from a page's OutputFormats collection using the Get or Canonical methods.",
    "usage": "{{ with .Site.Home.OutputFormats.Get \"rss\" }}\n  {{ .Name }} → rss\n{{ end }}",
    "url": "https://gohugo.io/methods/output-format/name/"
  },
  {
    "receiver": "resource",
    "symbol": ".Name",
    "memberSlug": "name",
    "title": "Name",
    "summary": "The value returned by the Name method on a Resource object depends on the resource type.",
    "usage": "assets/\n└── images/\n    └── Sunrise in Bryce Canyon.jpg",
    "url": "https://gohugo.io/methods/resource/name/"
  },
  {
    "receiver": "shortcode",
    "symbol": ".Name",
    "memberSlug": "name",
    "title": "Name",
    "summary": "The Name method is useful for error reporting. For example, if your shortcode requires a \"greeting\" argument:",
    "usage": "{{ $greeting := \"\" }}\n{{ with .Get \"greeting\" }}\n  {{ $greeting = . }}\n{{ else }}\n  {{ errorf \"The %q shortcode requires a 'greeting' argument. See %s\" .Name .Position }}\n{{ end }}",
    "url": "https://gohugo.io/methods/shortcode/name/"
  },
  {
    "receiver": "time",
    "symbol": ".Nanosecond",
    "memberSlug": "nanosecond",
    "title": "Nanosecond",
    "summary": "Returns the nanosecond offset within the second of the given time.Time value, in the range [0, 999999999].",
    "usage": "{{ $t := time.AsTime \"2023-01-27T23:44:58-08:00\" }}\n{{ $t.Nanosecond }} → 0",
    "url": "https://gohugo.io/methods/time/nanosecond/"
  },
  {
    "receiver": "duration",
    "symbol": ".Nanoseconds",
    "memberSlug": "nanoseconds",
    "title": "Nanoseconds",
    "summary": "Returns the time.Duration value as an integer nanosecond count.",
    "usage": "{{ $d = time.ParseDuration \"3.5h2.5m1.5s\" }}\n{{ $d.Nanoseconds }} → 12751500000000",
    "url": "https://gohugo.io/methods/duration/nanoseconds/"
  },
  {
    "receiver": "page",
    "symbol": ".Next",
    "memberSlug": "next",
    "title": "Next",
    "summary": "Hugo determines the next and previous page by sorting the site's collection of regular pages according to this sorting hierarchy:",
    "usage": "content/\n├── pages/\n│   ├── _index.md\n│   ├── page-1.md   <-- front matter: weight = 10\n│   ├── page-2.md   <-- front matter: weight = 20\n│   └── page-3.md   <-- front matter: weight = 30\n└── _index.md",
    "url": "https://gohugo.io/methods/page/next/"
  },
  {
    "receiver": "pager",
    "symbol": ".Next",
    "memberSlug": "next",
    "title": "Next",
    "summary": "Use the Next method to build navigation between pagers.",
    "usage": "{{ $pages := where site.RegularPages \"Type\" \"posts\" }}\n{{ $paginator := .Paginate $pages }}\n\n{{ range $paginator.Pages }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}\n\n{{ with $paginator }}\n  <ul>\n    {{ with .First }}\n      <li><a href=\"{{ .URL }}\">First</a></li>\n    {{ end }}\n    {{ with .Prev }}\n      <li><a href=\"{{ .URL }}\">Previous</a></li>\n    {{ end }}\n    {{ with .Next }}\n      <li><a href=\"{{ .URL }}\">Next</a></li>\n    {{ end }}\n    {{ with .Last }}\n      <li><a href=\"{{ .URL }}\">Last</a></li>\n    {{ end }}\n  </ul>\n{{ end }}",
    "url": "https://gohugo.io/methods/pager/next/"
  },
  {
    "receiver": "pages",
    "symbol": ".Next",
    "memberSlug": "next",
    "title": "Next",
    "summary": "Hugo determines the next and previous page by sorting the page collection according to this sorting hierarchy:",
    "usage": "content/\n├── pages/\n│   ├── _index.md\n│   ├── page-1.md   <-- front matter: weight = 10\n│   ├── page-2.md   <-- front matter: weight = 20\n│   └── page-3.md   <-- front matter: weight = 30\n└── _index.md",
    "url": "https://gohugo.io/methods/pages/next/"
  },
  {
    "receiver": "page",
    "symbol": ".NextInSection",
    "memberSlug": "nextinsection",
    "title": "NextInSection",
    "summary": "Hugo determines the next and previous page by sorting the current section's regular pages according to this sorting hierarchy:",
    "usage": "content/\n├── pages/\n│   ├── _index.md\n│   ├── page-1.md   <-- front matter: weight = 10\n│   ├── page-2.md   <-- front matter: weight = 20\n│   └── page-3.md   <-- front matter: weight = 30\n└── _index.md",
    "url": "https://gohugo.io/methods/page/nextinsection/"
  },
  {
    "receiver": "pager",
    "symbol": ".NumberOfElements",
    "memberSlug": "numberofelements",
    "title": "NumberOfElements",
    "summary": "Returns the number of pages in the current pager.",
    "usage": "{{ $pages := where site.RegularPages \"Type\" \"posts\" }}\n{{ $paginator := .Paginate $pages }}\n\n{{ range $paginator.Pages }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}\n\n{{ with $paginator }}\n  {{ .NumberOfElements }}\n{{ end }}",
    "url": "https://gohugo.io/methods/pager/numberofelements/"
  },
  {
    "receiver": "shortcode",
    "symbol": ".Ordinal",
    "memberSlug": "ordinal",
    "title": "Ordinal",
    "summary": "The Ordinal method returns the zero-based ordinal of the shortcode in relation to its parent. If the parent is the page itself, the ordinal represents the position of this shortcode in the page content.",
    "usage": "{{< img src=\"images/a.jpg\" >}}\n\n{{< img src=\"images/b.jpg\" >}}",
    "url": "https://gohugo.io/methods/shortcode/ordinal/"
  },
  {
    "receiver": "page",
    "symbol": ".OutputFormats",
    "memberSlug": "outputformats",
    "title": "OutputFormats",
    "summary": "An output format is a collection of settings that defines how Hugo renders a file when building a site. For example, html , json , and rss are built-in output formats. You can create multiple output formats and control their generation based on page kind , or by enabling one or more output formats for specific pages.",
    "usage": "{{ with .Site.Home.OutputFormats.Canonical }}\n  {{ .MediaType.Type }} → text/html\n  {{ .MediaType.MainType }} → text\n  {{ .MediaType.SubType }} → html\n  {{ .Name }} → html\n  {{ .Permalink }} → https://example.org/\n  {{ .Rel }} → canonical\n  {{ .RelPermalink }} → /\n{{ end }}",
    "url": "https://gohugo.io/methods/page/outputformats/",
    "sinceVersion": "0.154.4"
  },
  {
    "receiver": "menu-entry",
    "symbol": ".Page",
    "memberSlug": "page",
    "title": "Page",
    "summary": "Regardless of how you define menu entries , an entry associated with a page has access to its methods .",
    "usage": "menus:\n  main:\n  - pageRef: /about\n    weight: 10\n  - pageRef: /contact\n    weight: 20\n  - name: Hugo\n    url: https://gohugo.io\n    weight: 30",
    "url": "https://gohugo.io/methods/menu-entry/page/"
  },
  {
    "receiver": "page",
    "symbol": ".Page",
    "memberSlug": "page",
    "title": "Page",
    "summary": "This is a convenience method, useful within partial templates that are called from both shortcode and other template types.",
    "usage": "{{ partial \"my-partial.html\" . }}",
    "url": "https://gohugo.io/methods/page/page/"
  },
  {
    "receiver": "shortcode",
    "symbol": ".Page",
    "memberSlug": "page",
    "title": "Page",
    "summary": "With this content:",
    "usage": "---\nauthor: Victor Hugo\nisbn: 978-0451419439\npublication_year: 1862\ntitle: Les Misérables\n---",
    "url": "https://gohugo.io/methods/shortcode/page/"
  },
  {
    "receiver": "taxonomy",
    "symbol": ".Page",
    "memberSlug": "page",
    "title": "Page",
    "summary": "This TAXONOMY method returns nil if the taxonomy has no terms, so you must code defensively:",
    "usage": "{{ with .Site.Taxonomies.tags.Page }}\n  <a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a>\n{{ end }}",
    "url": "https://gohugo.io/methods/taxonomy/page/"
  },
  {
    "receiver": "pager",
    "symbol": ".PageGroups",
    "memberSlug": "pagegroups",
    "title": "PageGroups",
    "summary": "Use the PageGroups method with any of the grouping methods .",
    "usage": "{{ $pages := where site.RegularPages \"Type\" \"posts\" }}\n{{ $paginator := .Paginate ($pages.GroupByDate \"Jan 2006\") }}\n\n{{ range $paginator.PageGroups }}\n  <h2>{{ .Key }}</h2>\n  {{ range .Pages }}\n    <h3><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h3>\n  {{ end }}\n{{ end }}\n\n{{ partial \"pagination.html\" . }}",
    "url": "https://gohugo.io/methods/pager/pagegroups/"
  },
  {
    "receiver": "pager",
    "symbol": ".PageNumber",
    "memberSlug": "pagenumber",
    "title": "PageNumber",
    "summary": "Use the PageNumber method to build navigation between pagers.",
    "usage": "{{ $pages := where site.RegularPages \"Type\" \"posts\" }}\n{{ $paginator := .Paginate $pages }}\n\n{{ range $paginator.Pages }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}\n\n{{ with $paginator }}\n  <ul>\n    {{ range .Pagers }}\n      <li><a href=\"{{ .URL }}\">{{ .PageNumber }}</a></li>\n    {{ end }}\n  </ul>\n{{ end }}",
    "url": "https://gohugo.io/methods/pager/pagenumber/"
  },
  {
    "receiver": "menu-entry",
    "symbol": ".PageRef",
    "memberSlug": "pageref",
    "title": "PageRef",
    "summary": "The use case for this method is rare. In almost also scenarios you should use the URL method instead.",
    "usage": "content/\n├── products.md\n└── _index.md",
    "url": "https://gohugo.io/methods/menu-entry/pageref/"
  },
  {
    "receiver": "pager",
    "symbol": ".Pagers",
    "memberSlug": "pagers",
    "title": "Pagers",
    "summary": "Use the Pagers method to build navigation between pagers.",
    "usage": "{{ $pages := where site.RegularPages \"Type\" \"posts\" }}\n{{ $paginator := .Paginate $pages }}\n\n{{ range $paginator.Pages }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}\n\n{{ with $paginator }}\n  <ul>\n    {{ range .Pagers }}\n      <li><a href=\"{{ .URL }}\">{{ .PageNumber }}</a></li>\n    {{ end }}\n  </ul>\n{{ end }}",
    "url": "https://gohugo.io/methods/pager/pagers/"
  },
  {
    "receiver": "pager",
    "symbol": ".PagerSize",
    "memberSlug": "pagersize",
    "title": "PagerSize",
    "summary": "The number of pages per pager is determined by the optional second argument passed to the Paginate method, falling back to the pagerSize as defined in your project configuration .",
    "usage": "{{ $pages := where site.RegularPages \"Type\" \"posts\" }}\n{{ $paginator := .Paginate $pages }}\n\n{{ range $paginator.Pages }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}\n\n{{ with $paginator }}\n  {{ .PagerSize }}\n{{ end }}",
    "url": "https://gohugo.io/methods/pager/pagersize/"
  },
  {
    "receiver": "page",
    "symbol": ".Pages",
    "memberSlug": "pages",
    "title": "Pages",
    "summary": "The Pages method on a Page object is available to these page kinds : home , section , taxonomy , and term . The templates for these page kinds receive a page collection in context , in the default sort order .",
    "usage": "{{ range .Pages.ByTitle }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .Title }}</a></h2>\n{{ end }}",
    "url": "https://gohugo.io/methods/page/pages/"
  },
  {
    "receiver": "pager",
    "symbol": ".Pages",
    "memberSlug": "pages",
    "title": "Pages",
    "summary": "Returns the pages in the current pager.",
    "usage": "{{ $pages := where site.RegularPages \"Type\" \"posts\" }}\n{{ $paginator := .Paginate $pages }}\n\n{{ range $paginator.Pages }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}\n\n{{ partial \"pagination.html\" . }}",
    "url": "https://gohugo.io/methods/pager/pages/"
  },
  {
    "receiver": "site",
    "symbol": ".Pages",
    "memberSlug": "pages",
    "title": "Pages",
    "summary": "This method returns all page kinds in the current language, in the default sort order . That includes the home page, section pages, taxonomy pages, term pages, and regular pages.",
    "usage": "{{ range .Site.Pages }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}",
    "url": "https://gohugo.io/methods/site/pages/"
  },
  {
    "receiver": "page",
    "symbol": ".Paginate",
    "memberSlug": "paginate",
    "title": "Paginate",
    "summary": "Pagination is the process of splitting a list page into two or more pagers, where each pager contains a subset of the page collection and navigation links to other pagers.",
    "usage": "{{ $pages := where .Site.RegularPages \"Section\" \"articles\" }}\n{{ $pages = $pages.ByTitle }}\n{{ range (.Paginate $pages 7).Pages }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .Title }}</a></h2>\n{{ end }}\n{{ partial \"pagination.html\" . }}",
    "url": "https://gohugo.io/methods/page/paginate/"
  },
  {
    "receiver": "page",
    "symbol": ".Paginator",
    "memberSlug": "paginator",
    "title": "Paginator",
    "summary": "Pagination is the process of splitting a list page into two or more pagers, where each pager contains a subset of the page collection and navigation links to other pagers.",
    "usage": "{{ range .Paginator.Pages }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}\n{{ partial \"pagination.html\" . }}",
    "url": "https://gohugo.io/methods/page/paginator/"
  },
  {
    "receiver": "page",
    "symbol": ".Param",
    "memberSlug": "param",
    "title": "Param",
    "summary": "The Param method on a Page object looks for the given KEY in page parameters, and returns the corresponding value. If it cannot find the KEY in page parameters, it looks for the KEY in site parameters. If it cannot find the KEY in either location, the Param method returns nil .",
    "usage": "params:\n  display_toc: true",
    "url": "https://gohugo.io/methods/page/param/"
  },
  {
    "receiver": "site",
    "symbol": ".Param",
    "memberSlug": "param",
    "title": "Param",
    "summary": "The Param method on a Site object is a convenience method to return the value of a user-defined parameter in your project configuration.",
    "usage": "params:\n  display_toc: true",
    "url": "https://gohugo.io/methods/site/param/"
  },
  {
    "receiver": "menu-entry",
    "symbol": ".Params",
    "memberSlug": "params",
    "title": "Params",
    "summary": "When you define menu entries in your project configuration or in front matter , you can include a params key to attach additional information to the entry. For example:",
    "usage": "menus:\n  main:\n  - name: About\n    pageRef: /about\n    weight: 10\n  - name: Contact\n    pageRef: /contact\n    weight: 20\n  - name: Hugo\n    params:\n      rel: external\n    url: https://gohugo.io\n    weight: 30",
    "url": "https://gohugo.io/methods/menu-entry/params/"
  },
  {
    "receiver": "page",
    "symbol": ".Params",
    "memberSlug": "params",
    "title": "Params",
    "summary": "By way of example, consider this front matter:",
    "usage": "---\ndate: 2023-10-17T15:11:37-07:00\nparams:\n  author:\n    email: jsmith@example.org\n    name: John Smith\n  display_related: true\n  key-with-hyphens: must use index function\ntitle: Annual conference\n---",
    "url": "https://gohugo.io/methods/page/params/"
  },
  {
    "receiver": "resource",
    "symbol": ".Params",
    "memberSlug": "params",
    "title": "Params",
    "summary": "Use the Params method with page resources . It is not applicable to either global resources or remote resources .",
    "usage": "content/\n├── posts/\n│   ├── cats/\n│   │   ├── images/\n│   │   │   └── a.jpg\n│   │   └── index.md\n│   └── _index.md\n└── _index.md",
    "url": "https://gohugo.io/methods/resource/params/"
  },
  {
    "receiver": "shortcode",
    "symbol": ".Params",
    "memberSlug": "params",
    "title": "Params",
    "summary": "When you call a shortcode using positional arguments, the Params method returns a slice.",
    "usage": "{{< myshortcode \"Hello\" \"world\" >}}",
    "url": "https://gohugo.io/methods/shortcode/params/"
  },
  {
    "receiver": "site",
    "symbol": ".Params",
    "memberSlug": "params",
    "title": "Params",
    "summary": "With this project configuration:",
    "usage": "params:\n  author:\n    email: jsmith@example.org\n    name: John Smith\n  copyright-year: '2023'\n  layouts:\n    rfc_1123: Mon, 02 Jan 2006 15:04:05 MST\n    rfc_3339: '2006-01-02T15:04:05-07:00'\n  subtitle: The Best Widgets on Earth",
    "url": "https://gohugo.io/methods/site/params/"
  },
  {
    "receiver": "menu-entry",
    "symbol": ".Parent",
    "memberSlug": "parent",
    "title": "Parent",
    "summary": "With this menu definition:",
    "usage": "menus:\n  main:\n  - name: Products\n    pageRef: /product\n    weight: 10\n  - name: Product 1\n    pageRef: /products/product-1\n    parent: Products\n    weight: 1\n  - name: Product 2\n    pageRef: /products/product-2\n    parent: Products\n    weight: 2",
    "url": "https://gohugo.io/methods/menu-entry/parent/"
  },
  {
    "receiver": "page",
    "symbol": ".Parent",
    "memberSlug": "parent",
    "title": "Parent",
    "summary": "A section is a top-level content directory or any content directory containing an _index.md file.",
    "usage": "content/\n├── auctions/\n│   ├── 2023-11/\n│   │   ├── _index.md     <-- parent: auctions\n│   │   ├── auction-1.md\n│   │   └── auction-2.md  <-- parent: 2023-11\n│   ├── 2023-12/\n│   │   ├── _index.md     \n│   │   ├── auction-3.md\n│   │   └── auction-4.md\n│   ├── _index.md         <-- parent: home\n│   ├── bidding.md\n│   └── payment.md        <-- parent: auctions\n├── books/\n│   ├── _index.md         <-- parent: home\n│   ├── book-1.md\n│   └── book-2.md         <-- parent: books\n├── films/\n│   ├── _index.md         <-- parent: home \n│   ├── film-1.md\n│   └── film-2.md         <-- parent: films\n└── _index.md             <-- parent: nil",
    "url": "https://gohugo.io/methods/page/parent/"
  },
  {
    "receiver": "shortcode",
    "symbol": ".Parent",
    "memberSlug": "parent",
    "title": "Parent",
    "summary": "This is useful for inheritance of common shortcode arguments from the root.",
    "usage": "{{< greeting dateFormat=\"Jan 2, 2006\" >}}\nWelcome. Today is {{< now >}}.\n{{< /greeting >}}",
    "url": "https://gohugo.io/methods/shortcode/parent/"
  },
  {
    "receiver": "page",
    "symbol": ".Path",
    "memberSlug": "path",
    "title": "Path",
    "summary": "The Path method on a Page object returns the logical path of the given page, regardless of whether the page is backed by a file.",
    "usage": "{{ .Path }} → /posts/post-1",
    "url": "https://gohugo.io/methods/page/path/"
  },
  {
    "receiver": "output-format",
    "symbol": ".Permalink",
    "memberSlug": "permalink",
    "title": "Permalink",
    "summary": "To use this method you must first select a specific output format from a page's OutputFormats collection using the Get or Canonical methods.",
    "usage": "{{ with .Site.Home.OutputFormats.Get \"rss\" }}\n  {{ .Permalink }} → https://example.org/index.xml\n{{ end }}",
    "url": "https://gohugo.io/methods/output-format/permalink/"
  },
  {
    "receiver": "page",
    "symbol": ".Permalink",
    "memberSlug": "permalink",
    "title": "Permalink",
    "summary": "Project configuration:",
    "usage": "baseURL: https://example.org/docs/\ntitle: Documentation",
    "url": "https://gohugo.io/methods/page/permalink/"
  },
  {
    "receiver": "resource",
    "symbol": ".Permalink",
    "memberSlug": "permalink",
    "title": "Permalink",
    "summary": "Use this method with global resources , page resources , or remote resources .",
    "usage": "{{ with resources.Get \"images/a.jpg\" }}\n  {{ .Permalink }} → https://example.org/images/a.jpg\n{{ end }}",
    "url": "https://gohugo.io/methods/resource/permalink/"
  },
  {
    "receiver": "page",
    "symbol": ".Plain",
    "memberSlug": "plain",
    "title": "Plain",
    "summary": "The Plain method on a Page object renders Markdown and shortcodes to HTML, then strips the HTML tags . It does not strip HTML entities .",
    "usage": "{{ .Plain | htmlUnescape }}",
    "url": "https://gohugo.io/methods/page/plain/"
  },
  {
    "receiver": "page",
    "symbol": ".PlainWords",
    "memberSlug": "plainwords",
    "title": "PlainWords",
    "summary": "The PlainWords method on a Page object calls the Plain method, then uses Go's strings.Fields function to split the result into words.",
    "usage": "{{ .PlainWords }}",
    "url": "https://gohugo.io/methods/page/plainwords/"
  },
  {
    "receiver": "shortcode",
    "symbol": ".Position",
    "memberSlug": "position",
    "title": "Position",
    "summary": "The Position method is useful for error reporting. For example, if your shortcode requires a \"greeting\" argument:",
    "usage": "{{ $greeting := \"\" }}\n{{ with .Get \"greeting\" }}\n  {{ $greeting = . }}\n{{ else }}\n  {{ errorf \"The %q shortcode requires a 'greeting' argument. See %s\" .Name .Position }}\n{{ end }}",
    "url": "https://gohugo.io/methods/shortcode/position/"
  },
  {
    "receiver": "menu-entry",
    "symbol": ".Post",
    "memberSlug": "post",
    "title": "Post",
    "summary": "In this project configuration we enable rendering of emoji shortcodes , and add emoji shortcodes before (pre) and after (post) each menu entry:",
    "usage": "enableEmoji: true\nmenus:\n  main:\n  - name: About\n    pageRef: /about\n    post: ':point_left:'\n    pre: ':point_right:'\n    weight: 10\n  - name: Contact\n    pageRef: /contact\n    post: ':arrow_left:'\n    pre: ':arrow_right:'\n    weight: 20",
    "url": "https://gohugo.io/methods/menu-entry/post/"
  },
  {
    "receiver": "menu-entry",
    "symbol": ".Pre",
    "memberSlug": "pre",
    "title": "Pre",
    "summary": "In this project configuration we enable rendering of emoji shortcodes , and add emoji shortcodes before (pre) and after (post) each menu entry:",
    "usage": "enableEmoji: true\nmenus:\n  main:\n  - name: About\n    pageRef: /about\n    post: ':point_left:'\n    pre: ':point_right:'\n    weight: 10\n  - name: Contact\n    pageRef: /contact\n    post: ':arrow_left:'\n    pre: ':arrow_right:'\n    weight: 20",
    "url": "https://gohugo.io/methods/menu-entry/pre/"
  },
  {
    "receiver": "page",
    "symbol": ".Prev",
    "memberSlug": "prev",
    "title": "Prev",
    "summary": "Hugo determines the next and previous page by sorting the site's collection of regular pages according to this sorting hierarchy:",
    "usage": "content/\n├── pages/\n│   ├── _index.md\n│   ├── page-1.md   <-- front matter: weight = 10\n│   ├── page-2.md   <-- front matter: weight = 20\n│   └── page-3.md   <-- front matter: weight = 30\n└── _index.md",
    "url": "https://gohugo.io/methods/page/prev/"
  },
  {
    "receiver": "pager",
    "symbol": ".Prev",
    "memberSlug": "prev",
    "title": "Prev",
    "summary": "Use the Prev method to build navigation between pagers.",
    "usage": "{{ $pages := where site.RegularPages \"Type\" \"posts\" }}\n{{ $paginator := .Paginate $pages }}\n\n{{ range $paginator.Pages }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}\n\n{{ with $paginator }}\n  <ul>\n    {{ with .First }}\n      <li><a href=\"{{ .URL }}\">First</a></li>\n    {{ end }}\n    {{ with .Prev }}\n      <li><a href=\"{{ .URL }}\">Previous</a></li>\n    {{ end }}\n    {{ with .Next }}\n      <li><a href=\"{{ .URL }}\">Next</a></li>\n    {{ end }}\n    {{ with .Last }}\n      <li><a href=\"{{ .URL }}\">Last</a></li>\n    {{ end }}\n  </ul>\n{{ end }}",
    "url": "https://gohugo.io/methods/pager/prev/"
  },
  {
    "receiver": "pages",
    "symbol": ".Prev",
    "memberSlug": "prev",
    "title": "Prev",
    "summary": "Hugo determines the next and previous page by sorting the page collection according to this sorting hierarchy:",
    "usage": "content/\n├── pages/\n│   ├── _index.md\n│   ├── page-1.md   <-- front matter: weight = 10\n│   ├── page-2.md   <-- front matter: weight = 20\n│   └── page-3.md   <-- front matter: weight = 30\n└── _index.md",
    "url": "https://gohugo.io/methods/pages/prev/"
  },
  {
    "receiver": "page",
    "symbol": ".PrevInSection",
    "memberSlug": "previnsection",
    "title": "PrevInSection",
    "summary": "Hugo determines the next and previous page by sorting the current section's regular pages according to this sorting hierarchy:",
    "usage": "content/\n├── pages/\n│   ├── _index.md\n│   ├── page-1.md   <-- front matter: weight = 10\n│   ├── page-2.md   <-- front matter: weight = 20\n│   └── page-3.md   <-- front matter: weight = 30\n└── _index.md",
    "url": "https://gohugo.io/methods/page/previnsection/"
  },
  {
    "receiver": "resource",
    "symbol": ".Process",
    "memberSlug": "process",
    "title": "Process",
    "summary": "Use this method with global resources , page resources , or remote resources .",
    "usage": "{{ with resources.Get \"images/original.jpg\" }}\n  {{ with .Process \"crop 200x200 TopRight webp q50\" }}\n    <img src=\"{{ .RelPermalink }}\" width=\"{{ .Width }}\" height=\"{{ .Height }}\" alt=\"\">\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/methods/resource/process/",
    "sinceVersion": "0.153.5"
  },
  {
    "receiver": "resource",
    "symbol": ".Publish",
    "memberSlug": "publish",
    "title": "Publish",
    "summary": "Use this method with global resources , page resources , or remote resources .",
    "usage": "{{ with resources.Get \"images/a.jpg\" }}\n  {{ .Publish }}\n{{ end }}",
    "url": "https://gohugo.io/methods/resource/publish/"
  },
  {
    "receiver": "page",
    "symbol": ".PublishDate",
    "memberSlug": "publishdate",
    "title": "PublishDate",
    "summary": "By default, Hugo excludes pages with future publish dates when building your project. To include future pages, use the --buildFuture command line flag.",
    "usage": "---\npublishDate: 2023-10-19T00:40:04-07:00\ntitle: Article 1\n---",
    "url": "https://gohugo.io/methods/page/publishdate/"
  },
  {
    "receiver": "page",
    "symbol": ".RawContent",
    "memberSlug": "rawcontent",
    "title": "RawContent",
    "summary": "The RawContent method on a Page object returns the raw content. The raw content does not include front matter.",
    "usage": "{{ .RawContent }}",
    "url": "https://gohugo.io/methods/page/rawcontent/"
  },
  {
    "receiver": "page",
    "symbol": ".ReadingTime",
    "memberSlug": "readingtime",
    "title": "ReadingTime",
    "summary": "The estimated reading time is calculated by dividing the number of words in the content by the reading speed.",
    "usage": "{{ printf \"Estimated reading time: %d minutes\" .ReadingTime }}",
    "url": "https://gohugo.io/methods/page/readingtime/"
  },
  {
    "receiver": "page",
    "symbol": ".Ref",
    "memberSlug": "ref",
    "title": "Ref",
    "summary": "The Ref method accepts a single argument: an options map.",
    "usage": "{{ $opts := dict \"path\" \"/books/book-1\" }}\n{{ .Ref $opts }} → https://example.org/en/books/book-1/\n\n{{ $opts := dict \"path\" \"/books/book-1\" \"lang\" \"de\" }}\n{{ .Ref $opts }} → https://example.org/de/books/book-1/\n\n{{ $opts := dict \"path\" \"/books/book-1\" \"lang\" \"de\" \"outputFormat\" \"json\" }}\n{{ .Ref $opts }} → https://example.org/de/books/book-1/index.json",
    "url": "https://gohugo.io/methods/page/ref/"
  },
  {
    "receiver": "shortcode",
    "symbol": ".Ref",
    "memberSlug": "ref",
    "title": "Ref",
    "summary": "The Ref method accepts a single argument: an options map.",
    "usage": "{{ $opts := dict \"path\" \"/books/book-1\" }}\n{{ .Ref $opts }} → https://example.org/en/books/book-1/\n\n{{ $opts := dict \"path\" \"/books/book-1\" \"lang\" \"de\" }}\n{{ .Ref $opts }} → https://example.org/de/books/book-1/\n\n{{ $opts := dict \"path\" \"/books/book-1\" \"lang\" \"de\" \"outputFormat\" \"json\" }}\n{{ .Ref $opts }} → https://example.org/de/books/book-1/index.json",
    "url": "https://gohugo.io/methods/shortcode/ref/"
  },
  {
    "receiver": "page",
    "symbol": ".RegularPages",
    "memberSlug": "regularpages",
    "title": "RegularPages",
    "summary": "The RegularPages method on a Page object is available to these page kinds : home , section , taxonomy , and term . The templates for these page kinds receive a page collection in context , in the default sort order .",
    "usage": "{{ range .RegularPages.ByTitle }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .Title }}</a></h2>\n{{ end }}",
    "url": "https://gohugo.io/methods/page/regularpages/"
  },
  {
    "receiver": "site",
    "symbol": ".RegularPages",
    "memberSlug": "regularpages",
    "title": "RegularPages",
    "summary": "The RegularPages method on a Site object returns a collection of all regular pages , in the default sort order .",
    "usage": "{{ range .Site.RegularPages }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}",
    "url": "https://gohugo.io/methods/site/regularpages/"
  },
  {
    "receiver": "page",
    "symbol": ".RegularPagesRecursive",
    "memberSlug": "regularpagesrecursive",
    "title": "RegularPagesRecursive",
    "summary": "The RegularPagesRecursive method on a Page object is available to these page kinds : home , section , taxonomy , and term . The templates for these page kinds receive a page collection in context , in the default sort order .",
    "usage": "{{ range .RegularPagesRecursive.ByTitle }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .Title }}</a></h2>\n{{ end }}",
    "url": "https://gohugo.io/methods/page/regularpagesrecursive/"
  },
  {
    "receiver": "output-format",
    "symbol": ".Rel",
    "memberSlug": "rel",
    "title": "Rel",
    "summary": "To use this method you must first select a specific output format from a page's OutputFormats collection using the Get or Canonical methods.",
    "usage": "{{ with .Site.Home.OutputFormats.Get \"rss\" }}\n  {{ .Rel }} → alternate\n{{ end }}",
    "url": "https://gohugo.io/methods/output-format/rel/"
  },
  {
    "receiver": "pages",
    "symbol": ".Related",
    "memberSlug": "related",
    "title": "Related",
    "summary": "Based on front matter, Hugo uses several factors to identify content related to the given page. Use the default related content configuration , or tune the results to the desired indices and parameters. See details .",
    "usage": "{{ with .Site.RegularPages.Related . | first 5 }}\n  <p>Related pages:</p>\n  <ul>\n    {{ range . }}\n      <li><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></li>\n    {{ end }}\n  </ul>\n{{ end }}",
    "url": "https://gohugo.io/methods/pages/related/"
  },
  {
    "receiver": "output-format",
    "symbol": ".RelPermalink",
    "memberSlug": "relpermalink",
    "title": "RelPermalink",
    "summary": "To use this method you must first select a specific output format from a page's OutputFormats collection using the Get or Canonical methods.",
    "usage": "{{ with .Site.Home.OutputFormats.Get \"rss\" }}\n  {{ .RelPermalink }} → /index.xml\n{{ end }}",
    "url": "https://gohugo.io/methods/output-format/relpermalink/"
  },
  {
    "receiver": "page",
    "symbol": ".RelPermalink",
    "memberSlug": "relpermalink",
    "title": "RelPermalink",
    "summary": "Project configuration:",
    "usage": "baseURL: https://example.org/docs/\ntitle: Documentation",
    "url": "https://gohugo.io/methods/page/relpermalink/"
  },
  {
    "receiver": "resource",
    "symbol": ".RelPermalink",
    "memberSlug": "relpermalink",
    "title": "RelPermalink",
    "summary": "Use this method with global resources , page resources , or remote resources .",
    "usage": "{{ with resources.Get \"images/a.jpg\" }}\n  {{ .RelPermalink }} → /images/a.jpg\n{{ end }}",
    "url": "https://gohugo.io/methods/resource/relpermalink/"
  },
  {
    "receiver": "page",
    "symbol": ".RelRef",
    "memberSlug": "relref",
    "title": "RelRef",
    "summary": "The RelRef method accepts a single argument: an options map.",
    "usage": "{{ $opts := dict \"path\" \"/books/book-1\" }}\n{{ .RelRef $opts }} → /en/books/book-1/\n\n{{ $opts := dict \"path\" \"/books/book-1\" \"lang\" \"de\" }}\n{{ .RelRef $opts }} → /de/books/book-1/\n\n{{ $opts := dict \"path\" \"/books/book-1\" \"lang\" \"de\" \"outputFormat\" \"json\" }}\n{{ .RelRef $opts }} → /de/books/book-1/index.json",
    "url": "https://gohugo.io/methods/page/relref/"
  },
  {
    "receiver": "shortcode",
    "symbol": ".RelRef",
    "memberSlug": "relref",
    "title": "RelRef",
    "summary": "The RelRef method accepts a single argument: an options map.",
    "usage": "{{ $opts := dict \"path\" \"/books/book-1\" }}\n{{ .RelRef $opts }} → /en/books/book-1/\n\n{{ $opts := dict \"path\" \"/books/book-1\" \"lang\" \"de\" }}\n{{ .RelRef $opts }} → /de/books/book-1/\n\n{{ $opts := dict \"path\" \"/books/book-1\" \"lang\" \"de\" \"outputFormat\" \"json\" }}\n{{ .RelRef $opts }} → /de/books/book-1/index.json",
    "url": "https://gohugo.io/methods/shortcode/relref/"
  },
  {
    "receiver": "page",
    "symbol": ".Render",
    "memberSlug": "render",
    "title": "Render",
    "summary": "Typically used when ranging over a page collection, the Render method on a Page object renders the given template, passing the given page as context.",
    "usage": "{{ range site.RegularPages }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n  {{ .Render \"summary\" }}\n{{ end }}",
    "url": "https://gohugo.io/methods/page/render/"
  },
  {
    "receiver": "page",
    "symbol": ".RenderShortcodes",
    "memberSlug": "rendershortcodes",
    "title": "RenderShortcodes",
    "summary": "Use this method in shortcode templates to compose a page from multiple content files, while preserving a global context for footnotes and the table of contents.",
    "usage": "{{ with .Get 0 }}\n  {{ with $.Page.GetPage . }}\n    {{- .RenderShortcodes }}\n  {{ else }}\n    {{ errorf \"The %q shortcode was unable to find %q. See %s\" $.Name . $.Position }}\n  {{ end }}\n{{ else }}\n  {{ errorf \"The %q shortcode requires a positional parameter indicating the logical path of the file to include. See %s\" .Name .Position }}\n{{ end }}",
    "url": "https://gohugo.io/methods/page/rendershortcodes/"
  },
  {
    "receiver": "page",
    "symbol": ".RenderString",
    "memberSlug": "renderstring",
    "title": "RenderString",
    "summary": "This method takes an optional map of options:",
    "usage": "{{ $s := \"An *emphasized* word\" }}\n{{ $s | .RenderString }} → An <em>emphasized</em> word",
    "url": "https://gohugo.io/methods/page/renderstring/"
  },
  {
    "receiver": "resource",
    "symbol": ".Resize",
    "memberSlug": "resize",
    "title": "Resize",
    "summary": "Use this method with global resources , page resources , or remote resources .",
    "usage": "{{ with resources.Get \"images/original.jpg\" }}\n  {{ with .Resize \"300x\" }}\n    <img src=\"{{ .RelPermalink }}\" width=\"{{ .Width }}\" height=\"{{ .Height }}\" alt=\"\">\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/methods/resource/resize/",
    "sinceVersion": "0.153.5"
  },
  {
    "receiver": "page",
    "symbol": ".Resources",
    "memberSlug": "resources",
    "title": "Resources",
    "summary": "The Resources method on a Page object returns a collection of page resources. A page resource is a file within a page bundle .",
    "usage": "{{ range .Resources.ByType \"image\" }}\n  <img src=\"{{ .RelPermalink }}\" width=\"{{ .Width }}\" height=\"{{ .Height }}\" alt=\"\">\n{{ end }}",
    "url": "https://gohugo.io/methods/page/resources/",
    "sinceVersion": "0.140.0"
  },
  {
    "receiver": "resource",
    "symbol": ".ResourceType",
    "memberSlug": "resourcetype",
    "title": "ResourceType",
    "summary": "Use this method with global resources , page resources , or remote resources .",
    "usage": "{{ with resources.Get \"image/a.jpg\" }}\n  {{ .ResourceType }} → image\n  {{ .MediaType.MainType }} → image\n{{ end }}",
    "url": "https://gohugo.io/methods/resource/resourcetype/"
  },
  {
    "receiver": "menu",
    "symbol": ".Reverse",
    "memberSlug": "reverse",
    "title": "Reverse",
    "summary": "The Reverse method returns the given menu, reversing the sort order of its entries.",
    "usage": "menus:\n  main:\n  - name: Services\n    pageRef: /services\n    weight: 10\n  - name: About\n    pageRef: /about\n    weight: 20\n  - name: Contact\n    pageRef: /contact\n    weight: 30",
    "url": "https://gohugo.io/methods/menu/reverse/"
  },
  {
    "receiver": "pages",
    "symbol": ".Reverse",
    "memberSlug": "reverse",
    "title": "Reverse",
    "summary": "Returns the given page collection in reverse order.",
    "usage": "{{ range .Pages.ByDate.Reverse }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}",
    "url": "https://gohugo.io/methods/pages/reverse/"
  },
  {
    "receiver": "site",
    "symbol": ".Role",
    "memberSlug": "role",
    "title": "Role",
    "summary": "The Role method on a Site object returns the Role object for the given site, derived from the role definition in your project configuration.",
    "usage": "{{ .Site.Role.IsDefault }} → true",
    "url": "https://gohugo.io/methods/site/role/",
    "sinceVersion": "0.153.0"
  },
  {
    "receiver": "page",
    "symbol": ".Rotate",
    "memberSlug": "rotate",
    "title": "Rotate",
    "summary": "The rotate method on a page object returns a collection of pages that vary along the specified dimension , while holding the other dimensions constant. The result includes the current page and is sorted according to the rules of the specified dimension. For example, rotating along language returns all language variants that share the current page's version and role .",
    "usage": "{{/* Returns languages sorted by weight ascending, then lexicographically ascending */}}\n{{ range .Rotate \"language\" }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}",
    "url": "https://gohugo.io/methods/page/rotate/",
    "sinceVersion": "0.153.0"
  },
  {
    "receiver": "duration",
    "symbol": ".Round",
    "memberSlug": "round",
    "title": "Round",
    "summary": "Returns the result of rounding DURATION1 to the nearest multiple of DURATION2.",
    "usage": "{{ $d = time.ParseDuration \"3.5h2.5m1.5s\" }}\n\n{{ $d.Round (time.ParseDuration \"2h\") }} → 4h0m0s\n{{ $d.Round (time.ParseDuration \"3m\") }} → 3h33m0s\n{{ $d.Round (time.ParseDuration \"4s\") }} → 3h32m32s",
    "url": "https://gohugo.io/methods/duration/round/"
  },
  {
    "receiver": "time",
    "symbol": ".Round",
    "memberSlug": "round",
    "title": "Round",
    "summary": "The rounding behavior for halfway values is to round up.",
    "usage": "{{ $t := time.AsTime \"2023-01-27T23:44:58-08:00\" }}\n{{ $d := time.ParseDuration \"1h\" }}\n\n{{ ($t.Round $d).Format \"2006-01-02T15:04:05-00:00\" }} → 2023-01-28T00:00:00-00:00",
    "url": "https://gohugo.io/methods/time/round/"
  },
  {
    "receiver": "page",
    "symbol": ".Scratch",
    "memberSlug": "scratch",
    "title": "Scratch",
    "summary": "Deprecated in v0.138.0",
    "url": "https://gohugo.io/methods/page/scratch/"
  },
  {
    "receiver": "shortcode",
    "symbol": ".Scratch",
    "memberSlug": "scratch",
    "title": "Scratch",
    "summary": "Deprecated in v0.139.0",
    "url": "https://gohugo.io/methods/shortcode/scratch/"
  },
  {
    "receiver": "time",
    "symbol": ".Second",
    "memberSlug": "second",
    "title": "Second",
    "summary": "Returns the second offset within the minute of the given time.Time value, in the range [0, 59].",
    "usage": "{{ $t := time.AsTime \"2023-01-27T23:44:58-08:00\" }}\n{{ $t.Second }} → 58",
    "url": "https://gohugo.io/methods/time/second/"
  },
  {
    "receiver": "duration",
    "symbol": ".Seconds",
    "memberSlug": "seconds",
    "title": "Seconds",
    "summary": "Returns the time.Duration value as a floating point number of seconds.",
    "usage": "{{ $d = time.ParseDuration \"3.5h2.5m1.5s\" }}\n{{ $d.Seconds }} → 12751.5",
    "url": "https://gohugo.io/methods/duration/seconds/"
  },
  {
    "receiver": "page",
    "symbol": ".Section",
    "memberSlug": "section",
    "title": "Section",
    "summary": "A section is a top-level content directory or any content directory containing an _index.md file.",
    "usage": "content/\n├── lessons/\n│   ├── math/\n│   │   ├── _index.md\n│   │   ├── lesson-1.md\n│   │   └── lesson-2.md\n│   └── _index.md\n└── _index.md",
    "url": "https://gohugo.io/methods/page/section/"
  },
  {
    "receiver": "page",
    "symbol": ".Sections",
    "memberSlug": "sections",
    "title": "Sections",
    "summary": "The Sections method on a Page object is available to these page kinds : home , section , and taxonomy . The templates for these page kinds receive a page collection in context , in the default sort order .",
    "usage": "content/\n├── auctions/\n│   ├── 2023-11/\n│   │   ├── _index.md     <-- front matter: weight = 202311\n│   │   ├── auction-1.md\n│   │   └── auction-2.md\n│   ├── 2023-12/\n│   │   ├── _index.md     <-- front matter: weight = 202312\n│   │   ├── auction-3.md\n│   │   └── auction-4.md\n│   ├── _index.md         <-- front matter: weight = 30\n│   ├── bidding.md\n│   └── payment.md\n├── books/\n│   ├── _index.md         <-- front matter: weight = 20\n│   ├── book-1.md\n│   └── book-2.md\n├── films/\n│   ├── _index.md         <-- front matter: weight = 10\n│   ├── film-1.md\n│   └── film-2.md\n└── _index.md",
    "url": "https://gohugo.io/methods/page/sections/"
  },
  {
    "receiver": "site",
    "symbol": ".Sections",
    "memberSlug": "sections",
    "title": "Sections",
    "summary": "The Sections method on a Site object returns a collection of top-level section pages , in the default sort order .",
    "usage": "content/\n├── books/\n│   ├── book-1.md\n│   └── book-2.md\n├── films/\n│   ├── film-1.md\n│   └── film-2.md\n└── _index.md",
    "url": "https://gohugo.io/methods/site/sections/"
  },
  {
    "receiver": "page",
    "symbol": ".Site",
    "memberSlug": "site",
    "title": "Site",
    "summary": "See Site methods .",
    "usage": "{{ .Site.Title }}",
    "url": "https://gohugo.io/methods/page/site/"
  },
  {
    "receiver": "shortcode",
    "symbol": ".Site",
    "memberSlug": "site",
    "title": "Site",
    "summary": "See Site methods .",
    "usage": "{{ .Site.Title }}",
    "url": "https://gohugo.io/methods/shortcode/site/"
  },
  {
    "receiver": "page",
    "symbol": ".Sitemap",
    "memberSlug": "sitemap",
    "title": "Sitemap",
    "summary": "Access to the Sitemap method on a Page object is restricted to sitemap templates .",
    "usage": "{{ .Sitemap.ChangeFreq }}",
    "url": "https://gohugo.io/methods/page/sitemap/"
  },
  {
    "receiver": "page",
    "symbol": ".Sites",
    "memberSlug": "sites",
    "title": "Sites",
    "summary": "Deprecated in v0.156.0",
    "url": "https://gohugo.io/methods/page/sites/"
  },
  {
    "receiver": "site",
    "symbol": ".Sites",
    "memberSlug": "sites",
    "title": "Sites",
    "summary": "Deprecated in v0.156.0",
    "url": "https://gohugo.io/methods/site/sites/"
  },
  {
    "receiver": "page",
    "symbol": ".Slug",
    "memberSlug": "slug",
    "title": "Slug",
    "summary": "This page will be served from:",
    "usage": "---\nslug: sushi\ntitle: How to make spicy tuna hand rolls\n---",
    "url": "https://gohugo.io/methods/page/slug/"
  },
  {
    "receiver": "page",
    "symbol": ".Store",
    "memberSlug": "store",
    "title": "Store",
    "summary": "Use the Store method on a Page object to create a scratch pad to store and manipulate data, scoped to the current page. To create a scratch pad with a different scope , refer to the scope section below.",
    "usage": "{{ .Store.Set \"greeting\" \"Hello\" }}",
    "url": "https://gohugo.io/methods/page/store/"
  },
  {
    "receiver": "shortcode",
    "symbol": ".Store",
    "memberSlug": "store",
    "title": "Store",
    "summary": "Use the Store method to create a scratch pad to store and manipulate data, scoped to the current shortcode. To create a scratch pad with a different scope , refer to the scope section below.",
    "usage": "{{ .Store.Set \"greeting\" \"Hello\" }}",
    "url": "https://gohugo.io/methods/shortcode/store/",
    "sinceVersion": "0.139.0"
  },
  {
    "receiver": "site",
    "symbol": ".Store",
    "memberSlug": "store",
    "title": "Store",
    "summary": "Use the Store method on a Site object to create a scratch pad to store and manipulate data, scoped to the current site. To create a scratch pad with a different scope , refer to the scope section below.",
    "usage": "{{ site.Store.Set \"greeting\" \"Hello\" }}",
    "url": "https://gohugo.io/methods/site/store/",
    "sinceVersion": "0.139.0"
  },
  {
    "receiver": "time",
    "symbol": ".Sub",
    "memberSlug": "sub",
    "title": "Sub",
    "summary": "Returns the duration computed by subtracting TIME2 from TIME1.",
    "usage": "{{ $t1 := time.AsTime \"2023-01-27T23:44:58-08:00\" }}\n{{ $t2 := time.AsTime \"2023-01-26T22:34:38-08:00\" }}\n\n{{ $t1.Sub $t2 }} → 25h10m20s",
    "url": "https://gohugo.io/methods/time/sub/"
  },
  {
    "receiver": "page",
    "symbol": ".Summary",
    "memberSlug": "summary",
    "title": "Summary",
    "summary": "You can define a summary manually, in front matter, or automatically. A manual summary takes precedence over a front matter summary, and a front matter summary takes precedence over an automatic summary.",
    "usage": "{{ range .Pages }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n  {{ .Summary }}\n{{ end }}",
    "url": "https://gohugo.io/methods/page/summary/"
  },
  {
    "receiver": "page",
    "symbol": ".TableOfContents",
    "memberSlug": "tableofcontents",
    "title": "TableOfContents",
    "summary": "The TableOfContents method on a Page object returns an ordered or unordered list of the Markdown ATX and setext headings within the page content.",
    "usage": "{{ .TableOfContents }}",
    "url": "https://gohugo.io/methods/page/tableofcontents/"
  },
  {
    "receiver": "site",
    "symbol": ".Taxonomies",
    "memberSlug": "taxonomies",
    "title": "Taxonomies",
    "summary": "Conceptually, the Taxonomies method on a Site object returns a data structure such as:",
    "usage": "taxonomy a:\n- term 1:\n  - page 1\n  - page 2\n- term 2:\n  - page 1\ntaxonomy b:\n- term 1:\n  - page 2\n- term 2:\n  - page 1\n  - page 2",
    "url": "https://gohugo.io/methods/site/taxonomies/"
  },
  {
    "receiver": "menu-entry",
    "symbol": ".Title",
    "memberSlug": "title",
    "title": "Title",
    "summary": "The Title method returns the title property of the given menu entry. If the title is not defined, and the menu entry resolves to a page, the Title returns the page Title .",
    "usage": "<ul>\n  {{ range .Site.Menus.main }}\n    <li><a href=\"{{ .URL }}\" title=\"{{ .Title }}>{{ .Name }}</a></li>\n  {{ end }}\n</ul>",
    "url": "https://gohugo.io/methods/menu-entry/title/"
  },
  {
    "receiver": "page",
    "symbol": ".Title",
    "memberSlug": "title",
    "title": "Title",
    "summary": "With pages backed by a file, the Title method returns the title field as defined in front matter:",
    "usage": "---\ntitle: About us\n---",
    "url": "https://gohugo.io/methods/page/title/"
  },
  {
    "receiver": "resource",
    "symbol": ".Title",
    "memberSlug": "title",
    "title": "Title",
    "summary": "The value returned by the Title method on a Resource object depends on the resource type.",
    "usage": "assets/\n└── images/\n    └── Sunrise in Bryce Canyon.jpg",
    "url": "https://gohugo.io/methods/resource/title/"
  },
  {
    "receiver": "site",
    "symbol": ".Title",
    "memberSlug": "title",
    "title": "Title",
    "summary": "Project configuration:",
    "usage": "title: My Documentation Site",
    "url": "https://gohugo.io/methods/site/title/"
  },
  {
    "receiver": "pager",
    "symbol": ".TotalNumberOfElements",
    "memberSlug": "totalnumberofelements",
    "title": "TotalNumberOfElements",
    "summary": "Returns the number of pages in the pager collection.",
    "usage": "{{ $pages := where site.RegularPages \"Type\" \"posts\" }}\n{{ $paginator := .Paginate $pages }}\n\n{{ range $paginator.Pages }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}\n\n{{ with $paginator }}\n  {{ .TotalNumberOfElements }}\n{{ end }}",
    "url": "https://gohugo.io/methods/pager/totalnumberofelements/"
  },
  {
    "receiver": "pager",
    "symbol": ".TotalPages",
    "memberSlug": "totalpages",
    "title": "TotalPages",
    "summary": "Use the TotalPages method to build navigation between pagers.",
    "usage": "{{ $pages := where site.RegularPages \"Type\" \"posts\" }}\n{{ $paginator := .Paginate $pages }}\n\n{{ range $paginator.Pages }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}\n\n{{ with $paginator }}\n  <p>Pager {{ .PageNumber }} of {{ .TotalPages }}</p>\n  <ul>\n    {{ with .First }}\n      <li><a href=\"{{ .URL }}\">First</a></li>\n    {{ end }}\n    {{ with .Prev }}\n      <li><a href=\"{{ .URL }}\">Previous</a></li>\n    {{ end }}\n    {{ with .Next }}\n      <li><a href=\"{{ .URL }}\">Next</a></li>\n    {{ end }}\n    {{ with .Last }}\n      <li><a href=\"{{ .URL }}\">Last</a></li>\n    {{ end }}\n  </ul>\n{{ end }}",
    "url": "https://gohugo.io/methods/pager/totalpages/"
  },
  {
    "receiver": "page",
    "symbol": ".TranslationKey",
    "memberSlug": "translationkey",
    "title": "TranslationKey",
    "summary": "The translation key creates a relationship between all translations of a given page. The translation key is derived from the file path, or from the translationKey parameter if defined in front matter.",
    "usage": "defaultContentLanguage: en\nlanguages:\n  de:\n    contentDir: content/de\n    label: Deutsch\n    locale: de-DE\n    weight: 2\n  en:\n    contentDir: content/en\n    label: English\n    locale: en-US\n    weight: 1",
    "url": "https://gohugo.io/methods/page/translationkey/"
  },
  {
    "receiver": "page",
    "symbol": ".Translations",
    "memberSlug": "translations",
    "title": "Translations",
    "summary": "With this project configuration:",
    "usage": "defaultContentLanguage: en\nlanguages:\n  de:\n    contentDir: content/de\n    label: Deutsch\n    locale: de-DE\n    weight: 2\n  en:\n    contentDir: content/en\n    label: English\n    locale: en-US\n    weight: 1\n  fr:\n    contentDir: content/fr\n    label: Français\n    locale: fr-FR\n    weight: 3",
    "url": "https://gohugo.io/methods/page/translations/"
  },
  {
    "receiver": "duration",
    "symbol": ".Truncate",
    "memberSlug": "truncate",
    "title": "Truncate",
    "summary": "Returns the result of rounding DURATION1 toward zero to a multiple of DURATION2.",
    "usage": "{{ $d = time.ParseDuration \"3.5h2.5m1.5s\" }}\n\n{{ $d.Truncate (time.ParseDuration \"2h\") }} → 2h0m0s\n{{ $d.Truncate (time.ParseDuration \"3m\") }} → 3h30m0s\n{{ $d.Truncate (time.ParseDuration \"4s\") }} → 3h32m28s",
    "url": "https://gohugo.io/methods/duration/truncate/"
  },
  {
    "receiver": "time",
    "symbol": ".Truncate",
    "memberSlug": "truncate",
    "title": "Truncate",
    "summary": "The Truncate method operates on TIME as an absolute duration since the zero time ; it does not operate on the presentation form of the time. If DURATION is a multiple of one hour, Truncate may return a time with a non-zero minute, depending on the time zone.",
    "usage": "{{ $t := time.AsTime \"2023-01-27T23:44:58-08:00\" }}\n{{ $d := time.ParseDuration \"1h\" }}\n\n{{ ($t.Truncate $d).Format \"2006-01-02T15:04:05-00:00\" }} → 2023-01-27T23:00:00-00:00",
    "url": "https://gohugo.io/methods/time/truncate/"
  },
  {
    "receiver": "page",
    "symbol": ".Truncated",
    "memberSlug": "truncated",
    "title": "Truncated",
    "summary": "You can define a summary manually, in front matter, or automatically. A manual summary takes precedence over a front matter summary, and a front matter summary takes precedence over an automatic summary.",
    "usage": "{{ range .Pages }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n  {{ .Summary }}\n  {{ if .Truncated }}\n    <a href=\"{{ .RelPermalink }}\">Read more...</a>\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/methods/page/truncated/"
  },
  {
    "receiver": "page",
    "symbol": ".Type",
    "memberSlug": "type",
    "title": "Type",
    "summary": "The Type method on a Page object returns the content type of the given page. The content type is defined by the type field in front matter, or inferred from the top-level directory name if the type field in front matter is not defined.",
    "usage": "content/\n├── auction/\n│   ├── _index.md\n│   ├── item-1.md\n│   └── item-2.md  <-- front matter: type = books\n├── books/\n│   ├── _index.md\n│   ├── book-1.md\n│   └── book-2.md\n├── films/\n│   ├── _index.md\n│   ├── film-1.md \n│   └── film-2.md\n└── _index.md",
    "url": "https://gohugo.io/methods/page/type/"
  },
  {
    "receiver": "time",
    "symbol": ".Unix",
    "memberSlug": "unix",
    "title": "Unix",
    "summary": "See Unix epoch .",
    "usage": "{{ $t := time.AsTime \"2023-01-27T23:44:58-08:00\" }}\n{{ $t.Unix }} → 1674891898",
    "url": "https://gohugo.io/methods/time/unix/"
  },
  {
    "receiver": "time",
    "symbol": ".UnixMicro",
    "memberSlug": "unixmicro",
    "title": "UnixMicro",
    "summary": "See Unix epoch .",
    "usage": "{{ $t := time.AsTime \"2023-01-27T23:44:58-08:00\" }}\n{{ $t.UnixMicro }} → 1674891898000000",
    "url": "https://gohugo.io/methods/time/unixmicro/"
  },
  {
    "receiver": "time",
    "symbol": ".UnixMilli",
    "memberSlug": "unixmilli",
    "title": "UnixMilli",
    "summary": "See Unix epoch .",
    "usage": "{{ $t := time.AsTime \"2023-01-27T23:44:58-08:00\" }}\n{{ $t.UnixMilli }} → 1674891898000",
    "url": "https://gohugo.io/methods/time/unixmilli/"
  },
  {
    "receiver": "time",
    "symbol": ".UnixNano",
    "memberSlug": "unixnano",
    "title": "UnixNano",
    "summary": "See Unix epoch .",
    "usage": "{{ $t := time.AsTime \"2023-01-27T23:44:58-08:00\" }}\n{{ $t.UnixNano }} → 1674891898000000000",
    "url": "https://gohugo.io/methods/time/unixnano/"
  },
  {
    "receiver": "menu-entry",
    "symbol": ".URL",
    "memberSlug": "url",
    "title": "URL",
    "summary": "For menu entries associated with a page, the URL method returns the page's RelPermalink , otherwise it returns the entry's url property.",
    "usage": "<ul>\n  {{ range .Site.Menus.main }}\n    <li><a href=\"{{ .URL }}\">{{ .Name }}</a></li>\n  {{ end }}\n</ul>",
    "url": "https://gohugo.io/methods/menu-entry/url/"
  },
  {
    "receiver": "pager",
    "symbol": ".URL",
    "memberSlug": "url",
    "title": "URL",
    "summary": "Use the URL method to build navigation between pagers.",
    "usage": "{{ $pages := where site.RegularPages \"Type\" \"posts\" }}\n{{ $paginator := .Paginate $pages }}\n\n{{ range $paginator.Pages }}\n  <h2><a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a></h2>\n{{ end }}\n\n{{ with $paginator }}\n  <ul>\n    {{ with .First }}\n      <li><a href=\"{{ .URL }}\">First</a></li>\n    {{ end }}\n    {{ with .Prev }}\n      <li><a href=\"{{ .URL }}\">Previous</a></li>\n    {{ end }}\n    {{ with .Next }}\n      <li><a href=\"{{ .URL }}\">Next</a></li>\n    {{ end }}\n    {{ with .Last }}\n      <li><a href=\"{{ .URL }}\">Last</a></li>\n    {{ end }}\n  </ul>\n{{ end }}",
    "url": "https://gohugo.io/methods/pager/url/"
  },
  {
    "receiver": "time",
    "symbol": ".UTC",
    "memberSlug": "utc",
    "title": "UTC",
    "summary": "Returns the given time.Time value with the location set to UTC.",
    "usage": "{{ $t := time.AsTime \"2023-01-27T23:44:58-08:00\" }}\n{{ $t.UTC }} → 2023-01-28 07:44:58 +0000 UTC",
    "url": "https://gohugo.io/methods/time/utc/"
  },
  {
    "receiver": "site",
    "symbol": ".Version",
    "memberSlug": "version",
    "title": "Version",
    "summary": "The Version method on a Site object returns the Version object for the given site, derived from the version definition in your project configuration.",
    "usage": "{{ .Site.Version.IsDefault }} → true",
    "url": "https://gohugo.io/methods/site/version/",
    "sinceVersion": "0.153.0"
  },
  {
    "receiver": "time",
    "symbol": ".Weekday",
    "memberSlug": "weekday",
    "title": "Weekday",
    "summary": "To convert the time.Weekday value to a string:",
    "usage": "{{ $t := time.AsTime \"2023-01-27T23:44:58-08:00\" }}\n{{ $t.Weekday.String }} → Friday",
    "url": "https://gohugo.io/methods/time/weekday/"
  },
  {
    "receiver": "menu-entry",
    "symbol": ".Weight",
    "memberSlug": "weight",
    "title": "Weight",
    "summary": "If you define the menu entry automatically , the Weight method returns the page's Weight .",
    "usage": "<ul>\n  {{ range .Site.Menus.main }}\n    {{ if le .Weight 42 }}\n      <li><a href=\"{{ .URL }}\">{{ .Name }}</a></li>\n    {{ end }}\n  {{ end }}\n</ul>",
    "url": "https://gohugo.io/methods/menu-entry/weight/"
  },
  {
    "receiver": "page",
    "symbol": ".Weight",
    "memberSlug": "weight",
    "title": "Weight",
    "summary": "The Weight method on a Page object returns the weight of the given page as defined in front matter.",
    "usage": "---\ntitle: How to make spicy tuna hand rolls\nweight: 42\n---",
    "url": "https://gohugo.io/methods/page/weight/"
  },
  {
    "receiver": "resource",
    "symbol": ".Width",
    "memberSlug": "width",
    "title": "Width",
    "summary": "Use this method with global resources , page resources , or remote resources .",
    "usage": "{{ with resources.GetMatch \"images/featured.*\" }}\n  {{ if reflect.IsImageResourceWithMeta . }}\n    <img src=\"{{ .RelPermalink }}\" width=\"{{ .Width }}\" height=\"{{ .Height }}\" alt=\"\">\n  {{ else }}\n    <img src=\"{{ .RelPermalink }}\" alt=\"\">\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/methods/resource/width/"
  },
  {
    "receiver": "page",
    "symbol": ".WordCount",
    "memberSlug": "wordcount",
    "title": "WordCount",
    "summary": "To round up to nearest multiple of 100, use the FuzzyWordCount method.",
    "usage": "{{ .WordCount }} → 103",
    "url": "https://gohugo.io/methods/page/wordcount/"
  },
  {
    "receiver": "time",
    "symbol": ".Year",
    "memberSlug": "year",
    "title": "Year",
    "summary": "Returns the year of the given time.Time value.",
    "usage": "{{ $t := time.AsTime \"2023-01-27T23:44:58-08:00\" }}\n{{ $t.Year }} → 2023",
    "url": "https://gohugo.io/methods/time/year/"
  },
  {
    "receiver": "time",
    "symbol": ".YearDay",
    "memberSlug": "yearday",
    "title": "YearDay",
    "summary": "Returns the day of the year of the given time.Time value, in the range [1, 365] for non-leap years, and [1, 366] in leap years.",
    "usage": "{{ $t := time.AsTime \"2023-01-27T23:44:58-08:00\" }}\n{{ $t.YearDay }} → 27",
    "url": "https://gohugo.io/methods/time/yearday/"
  }
];
