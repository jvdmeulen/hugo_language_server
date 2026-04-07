export interface HugoFunctionDocEntry {
  namespace: string;
  symbol: string;
  aliases?: string[];
  memberSlug: string;
  title: string;
  summary: string;
  usage?: string;
  url: string;
  sinceVersion?: string;
}

export const HUGO_FUNCTION_DOCS_DATASET: HugoFunctionDocEntry[] = [
  {
    "namespace": "go-template",
    "symbol": "and",
    "memberSlug": "and",
    "title": "and",
    "summary": "The falsy values are false , 0 , any nil pointer or interface value, any array, slice, map, or string of length zero, and zero time.Time values.",
    "usage": "{{ and 1 0 \"\" }} → 0 (int)\n{{ and 1 false 0 }} → false (bool)\n\n{{ and 1 2 3 }} → 3 (int)\n{{ and \"a\" \"b\" \"c\" }} → c (string)\n{{ and \"a\" 1 true }} → true (bool)\n\n{{ and false (math.Div 1 0) }} → false (bool)",
    "url": "https://gohugo.io/functions/go-template/and/"
  },
  {
    "namespace": "go-template",
    "symbol": "block",
    "memberSlug": "block",
    "title": "block",
    "summary": "A block is shorthand for defining a template:",
    "usage": "{{ define \"name\" }} T1 {{ end }}",
    "url": "https://gohugo.io/functions/go-template/block/"
  },
  {
    "namespace": "go-template",
    "symbol": "break",
    "memberSlug": "break",
    "title": "break",
    "summary": "This template code:",
    "usage": "{{ $s := slice \"foo\" \"bar\" \"baz\" }}\n{{ range $s }}\n  {{ if eq . \"bar\" }}\n    {{ break }}\n  {{ end }}\n  <p>{{ . }}</p>\n{{ end }}",
    "url": "https://gohugo.io/functions/go-template/break/"
  },
  {
    "namespace": "cast",
    "symbol": "cast.ToFloat",
    "aliases": [
      "toFloat",
      "tofloat"
    ],
    "memberSlug": "tofloat",
    "title": "cast.ToFloat",
    "summary": "With a decimal (base 10) input:",
    "usage": "{{ float 11 }} → 11 (float64)\n{{ float \"11\" }} → 11 (float64)\n\n{{ float 11.1 }} → 11.1 (float64)\n{{ float \"11.1\" }} → 11.1 (float64)\n\n{{ float 11.9 }} → 11.9 (float64)\n{{ float \"11.9\" }} → 11.9 (float64)",
    "url": "https://gohugo.io/functions/cast/tofloat/"
  },
  {
    "namespace": "cast",
    "symbol": "cast.ToInt",
    "aliases": [
      "toInt",
      "toint"
    ],
    "memberSlug": "toint",
    "title": "cast.ToInt",
    "summary": "With a decimal (base 10) input:",
    "usage": "{{ int 11 }} → 11 (int)\n{{ int \"11\" }} → 11 (int)\n\n{{ int 11.1 }} → 11 (int)\n{{ int 11.9 }} → 11 (int)",
    "url": "https://gohugo.io/functions/cast/toint/"
  },
  {
    "namespace": "cast",
    "symbol": "cast.ToString",
    "aliases": [
      "toString",
      "tostring"
    ],
    "memberSlug": "tostring",
    "title": "cast.ToString",
    "summary": "With a decimal (base 10) input:",
    "usage": "{{ string 11 }} → 11 (string)\n{{ string \"11\" }} → 11 (string)\n\n{{ string 11.1 }} → 11.1 (string)\n{{ string \"11.1\" }} → 11.1 (string)\n\n{{ string 11.9 }} → 11.9 (string)\n{{ string \"11.9\" }} → 11.9 (string)",
    "url": "https://gohugo.io/functions/cast/tostring/"
  },
  {
    "namespace": "collections",
    "symbol": "collections.After",
    "aliases": [
      "after"
    ],
    "memberSlug": "after",
    "title": "collections.After",
    "summary": "The following shows after being used in conjunction with the slice function:",
    "usage": "{{ $data := slice \"one\" \"two\" \"three\" \"four\" }}\n<ul>\n  {{ range after 2 $data }}\n    <li>{{ . }}</li>\n  {{ end }}\n</ul>",
    "url": "https://gohugo.io/functions/collections/after/"
  },
  {
    "namespace": "collections",
    "symbol": "collections.Append",
    "aliases": [
      "append"
    ],
    "memberSlug": "append",
    "title": "collections.Append",
    "summary": "This function appends all elements, excluding the last, to the last element. This allows pipe constructs as shown below.",
    "usage": "{{ $s := slice \"a\" \"b\" }}\n{{ $s }} → [a b]\n\n{{ $s = $s | append \"c\" }}\n{{ $s }} → [a b c]",
    "url": "https://gohugo.io/functions/collections/append/"
  },
  {
    "namespace": "collections",
    "symbol": "collections.Apply",
    "aliases": [
      "apply"
    ],
    "memberSlug": "apply",
    "title": "collections.Apply",
    "summary": "The apply function takes three or more arguments, depending on the function being applied to the slice elements.",
    "usage": "{{ $s := slice \"hello\" \"world\" }}\n\n{{ $s = apply $s \"strings.FirstUpper\" \".\" }}\n{{ $s }} → [Hello World]\n\n{{ $s = apply $s \"strings.Replace\" \".\" \"l\" \"_\" }}\n{{ $s }} →  [He__o Wor_d]",
    "url": "https://gohugo.io/functions/collections/apply/"
  },
  {
    "namespace": "collections",
    "symbol": "collections.Complement",
    "aliases": [
      "complement"
    ],
    "memberSlug": "complement",
    "title": "collections.Complement",
    "summary": "To find the elements within $c3 that do not exist in $c1 or $c2 :",
    "usage": "{{ $c1 := slice 3 }}\n{{ $c2 := slice 4 5 }}\n{{ $c3 := slice 1 2 3 4 5 }}\n\n{{ complement $c1 $c2 $c3 }} → [1 2]",
    "url": "https://gohugo.io/functions/collections/complement/"
  },
  {
    "namespace": "collections",
    "symbol": "collections.D",
    "aliases": [
      "d"
    ],
    "memberSlug": "d",
    "title": "collections.D",
    "summary": "The collections.D function returns a sorted slice of unique random integers in the half-open interval [0, HIGH) using the provided SEED value. The number of elements in the resulting slice is N or HIGH , whichever is less.",
    "usage": "{{ collections.D 6 7 42 }} → [4, 9, 10, 20, 22, 24, 41]",
    "url": "https://gohugo.io/functions/collections/d/",
    "sinceVersion": "0.149.0"
  },
  {
    "namespace": "collections",
    "symbol": "collections.Delimit",
    "aliases": [
      "delimit"
    ],
    "memberSlug": "delimit",
    "title": "collections.Delimit",
    "summary": "Delimit a slice:",
    "usage": "{{ $s := slice \"b\" \"a\" \"c\" }}\n{{ delimit $s \", \" }} → b, a, c\n{{ delimit $s \", \" \" and \"}} → b, a and c",
    "url": "https://gohugo.io/functions/collections/delimit/"
  },
  {
    "namespace": "collections",
    "symbol": "collections.Dictionary",
    "aliases": [
      "dict",
      "dictionary"
    ],
    "memberSlug": "dictionary",
    "title": "collections.Dictionary",
    "summary": "Specify the key-value pairs as individual arguments:",
    "usage": "{{ $m := dict \"a\" 1 \"b\" 2 }}",
    "url": "https://gohugo.io/functions/collections/dictionary/"
  },
  {
    "namespace": "collections",
    "symbol": "collections.First",
    "aliases": [
      "first"
    ],
    "memberSlug": "first",
    "title": "collections.First",
    "summary": "Given that a string is in effect a read-only slice of bytes, this function can be used to return the specified number of bytes from the beginning of the string:",
    "usage": "{{ slice \"a\" \"b\" \"c\" | first 1 }} → [a]\n{{ slice \"a\" \"b\" \"c\" | first 2 }} → [a b]",
    "url": "https://gohugo.io/functions/collections/first/"
  },
  {
    "namespace": "collections",
    "symbol": "collections.Group",
    "aliases": [
      "group"
    ],
    "memberSlug": "group",
    "title": "collections.Group",
    "summary": "The page group you get from group is of the same type you get from the built-in group methods in Hugo. The example above can be paginated .",
    "usage": "{{ $new := .Site.RegularPages | first 10 | group \"New\" }}\n{{ $old := .Site.RegularPages | last 10 | group \"Old\" }}\n{{ $groups := slice $new $old }}\n{{ range $groups }}\n  <h3>{{ .Key }}{{/* Prints \"New\", \"Old\" */}}</h3>\n  <ul>\n    {{ range .Pages }}\n      <li>\n        <a href=\"{{ .RelPermalink }}\">{{ .LinkTitle }}</a>\n        <div class=\"meta\">{{ .Date.Format \"Mon, Jan 2, 2006\" }}</div>\n      </li>\n    {{ end }}\n  </ul>\n{{ end }}",
    "url": "https://gohugo.io/functions/collections/group/"
  },
  {
    "namespace": "collections",
    "symbol": "collections.In",
    "aliases": [
      "in"
    ],
    "memberSlug": "in",
    "title": "collections.In",
    "summary": "Reports whether a value exists within the given slice or string.",
    "usage": "{{ $s := slice \"a\" \"b\" \"c\" }}\n{{ in $s \"b\" }} → true",
    "url": "https://gohugo.io/functions/collections/in/"
  },
  {
    "namespace": "collections",
    "symbol": "collections.Index",
    "aliases": [
      "index",
      "indexfunction"
    ],
    "memberSlug": "indexfunction",
    "title": "collections.Index",
    "summary": "Each indexed item must be a map or a slice:",
    "usage": "{{ $s := slice \"a\" \"b\" \"c\" }}\n{{ index $s 0 }} → a\n{{ index $s 1 }} → b\n\n{{ $m := dict \"a\" 100 \"b\" 200 }}\n{{ index $m \"b\" }} → 200",
    "url": "https://gohugo.io/functions/collections/indexfunction/"
  },
  {
    "namespace": "collections",
    "symbol": "collections.Intersect",
    "aliases": [
      "intersect"
    ],
    "memberSlug": "intersect",
    "title": "collections.Intersect",
    "summary": "A useful example is to use it as AND filters when combined with where:",
    "usage": "{{ $pages := where .Site.RegularPages \"Type\" \"not in\" (slice \"page\" \"about\") }}\n{{ $pages := $pages | union (where .Site.RegularPages \"Params.pinned\" true) }}\n{{ $pages := $pages | intersect (where .Site.RegularPages \"Params.images\" \"!=\" nil) }}",
    "url": "https://gohugo.io/functions/collections/intersect/"
  },
  {
    "namespace": "collections",
    "symbol": "collections.IsSet",
    "aliases": [
      "isSet",
      "isset"
    ],
    "memberSlug": "isset",
    "title": "collections.IsSet",
    "summary": "For example, consider this project configuration:",
    "usage": "params:\n  showHeroImage: false",
    "url": "https://gohugo.io/functions/collections/isset/"
  },
  {
    "namespace": "collections",
    "symbol": "collections.KeyVals",
    "aliases": [
      "keyVals",
      "keyvals"
    ],
    "memberSlug": "keyvals",
    "title": "collections.KeyVals",
    "summary": "The primary application for this function is the definition of the namedSlices value in the options map passed to the Related method on the Pages object.",
    "usage": "{{ $kv := keyVals \"foo\" \"a\" \"b\" \"c\" }}",
    "url": "https://gohugo.io/functions/collections/keyvals/"
  },
  {
    "namespace": "collections",
    "symbol": "collections.Last",
    "aliases": [
      "last"
    ],
    "memberSlug": "last",
    "title": "collections.Last",
    "summary": "Given that a string is in effect a read-only slice of bytes, this function can be used to return the specified number of bytes from the end of the string:",
    "usage": "{{ slice \"a\" \"b\" \"c\" | last 1 }} → [c]\n{{ slice \"a\" \"b\" \"c\" | last 2 }} → [b c]",
    "url": "https://gohugo.io/functions/collections/last/"
  },
  {
    "namespace": "collections",
    "symbol": "collections.Merge",
    "aliases": [
      "merge"
    ],
    "memberSlug": "merge",
    "title": "collections.Merge",
    "summary": "Returns the result of merging two or more maps from left to right. If a key already exists, merge updates its value. If a key is absent, merge inserts the value under the new key.",
    "usage": "{{ $m1 := dict \"x\" \"foo\" }}\n{{ $m2 := dict \"x\" \"bar\" \"y\" \"wibble\" }}\n{{ $m3 := dict \"x\" \"baz\" \"y\" \"wobble\" \"z\" (dict \"a\" \"huey\") }}",
    "url": "https://gohugo.io/functions/collections/merge/"
  },
  {
    "namespace": "collections",
    "symbol": "collections.NewScratch",
    "aliases": [
      "newScratch",
      "newscratch"
    ],
    "memberSlug": "newscratch",
    "title": "collections.NewScratch",
    "summary": "Use the collections.NewScratch function to create a locally scoped scratch pad to store and manipulate data. To create a scratch pad with a different scope , refer to the scope section below.",
    "usage": "{{ $s := newScratch }}\n{{ $s.Set \"greeting\" \"Hello\" }}",
    "url": "https://gohugo.io/functions/collections/newscratch/"
  },
  {
    "namespace": "collections",
    "symbol": "collections.Querify",
    "aliases": [
      "querify"
    ],
    "memberSlug": "querify",
    "title": "collections.Querify",
    "summary": "Specify the key-value pairs as a map, a slice, or a sequence of scalar values. For example, the following are equivalent:",
    "usage": "{{ collections.Querify (dict \"a\" 1 \"b\" 2) }}\n{{ collections.Querify (slice \"a\" 1 \"b\" 2) }}\n{{ collections.Querify \"a\" 1 \"b\" 2 }}",
    "url": "https://gohugo.io/functions/collections/querify/"
  },
  {
    "namespace": "collections",
    "symbol": "collections.Reverse",
    "aliases": [
      "reverse"
    ],
    "memberSlug": "reverse",
    "title": "collections.Reverse",
    "summary": "Returns a slice by reversing the order of elements in the given slice.",
    "usage": "{{ slice 2 1 3 | collections.Reverse }} → [3 1 2]",
    "url": "https://gohugo.io/functions/collections/reverse/"
  },
  {
    "namespace": "collections",
    "symbol": "collections.Seq",
    "aliases": [
      "seq"
    ],
    "memberSlug": "seq",
    "title": "collections.Seq",
    "summary": "A contrived example of iterating over a sequence of integers:",
    "usage": "{{ seq 2 }} → [1 2]\n{{ seq 0 2 }} → [0 1 2]\n{{ seq -2 2 }} → [-2 -1 0 1 2]\n{{ seq -2 2 2 }} → [-2 0 2]",
    "url": "https://gohugo.io/functions/collections/seq/"
  },
  {
    "namespace": "collections",
    "symbol": "collections.Shuffle",
    "aliases": [
      "shuffle"
    ],
    "memberSlug": "shuffle",
    "title": "collections.Shuffle",
    "summary": "The result will vary from one build to the next.",
    "usage": "{{ collections.Shuffle (slice \"a\" \"b\" \"c\") }} → [b a c]",
    "url": "https://gohugo.io/functions/collections/shuffle/",
    "sinceVersion": "0.149.0"
  },
  {
    "namespace": "collections",
    "symbol": "collections.Slice",
    "aliases": [
      "slice"
    ],
    "memberSlug": "slice",
    "title": "collections.Slice",
    "summary": "To create an empty slice:",
    "usage": "{{ $s := slice \"a\" \"b\" \"c\" }}\n{{ $s }} → [a b c]",
    "url": "https://gohugo.io/functions/collections/slice/"
  },
  {
    "namespace": "collections",
    "symbol": "collections.Sort",
    "aliases": [
      "sort"
    ],
    "memberSlug": "sort",
    "title": "collections.Sort",
    "summary": "The KEY is optional when sorting slices in ascending order, otherwise it is required. When sorting slices, use the literal value in place of the KEY . See examples below.",
    "usage": "params:\n  grades:\n  - b\n  - a\n  - c",
    "url": "https://gohugo.io/functions/collections/sort/"
  },
  {
    "namespace": "collections",
    "symbol": "collections.SymDiff",
    "aliases": [
      "symDiff",
      "symdiff"
    ],
    "memberSlug": "symdiff",
    "title": "collections.SymDiff",
    "summary": "Example:",
    "usage": "{{ slice 1 2 3 | symdiff (slice 3 4) }} → [1 2 4]",
    "url": "https://gohugo.io/functions/collections/symdiff/"
  },
  {
    "namespace": "collections",
    "symbol": "collections.Union",
    "aliases": [
      "union"
    ],
    "memberSlug": "union",
    "title": "collections.Union",
    "summary": "This is also very useful to use as OR filters when combined with where:",
    "usage": "{{ union (slice 1 2 3) (slice 3 4 5) }} → [1 2 3 4 5]\n{{ union (slice 1 2 3) nil }}           → [1 2 3]\n{{ union nil (slice 1 2 3) }}           → [1 2 3]\n{{ union nil nil }}                     → []",
    "url": "https://gohugo.io/functions/collections/union/"
  },
  {
    "namespace": "collections",
    "symbol": "collections.Uniq",
    "aliases": [
      "uniq"
    ],
    "memberSlug": "uniq",
    "title": "collections.Uniq",
    "summary": "Returns a slice by removing duplicate elements from the given slice.",
    "usage": "{{ slice 1 3 2 1 | uniq }} → [1 3 2]",
    "url": "https://gohugo.io/functions/collections/uniq/"
  },
  {
    "namespace": "collections",
    "symbol": "collections.Where",
    "aliases": [
      "where"
    ],
    "memberSlug": "where",
    "title": "collections.Where",
    "summary": "The where function returns the given slice, removing elements that do not satisfy the comparison condition. The comparison condition is composed of the KEY , OPERATOR , and VALUE arguments:",
    "usage": "collections.Where SLICE KEY [OPERATOR] VALUE\n                        --------------------\n                        comparison condition",
    "url": "https://gohugo.io/functions/collections/where/"
  },
  {
    "namespace": "compare",
    "symbol": "compare.Conditional",
    "aliases": [
      "cond",
      "conditional"
    ],
    "memberSlug": "conditional",
    "title": "compare.Conditional",
    "summary": "If CONTROL is truthy the function returns ARG1, otherwise it returns ARG2.",
    "usage": "{{ $qty := 42 }}\n{{ cond (le $qty 3) \"few\" \"many\" }} → many",
    "url": "https://gohugo.io/functions/compare/conditional/"
  },
  {
    "namespace": "compare",
    "symbol": "compare.Default",
    "aliases": [
      "default"
    ],
    "memberSlug": "default",
    "title": "compare.Default",
    "summary": "The default function returns the second argument if set, else the first argument.",
    "usage": "{{ default 42 1 }} → 1\n{{ default 42 \"foo\" }} → foo\n{{ default 42 (dict \"k\" \"v\") }} → map[k:v]\n{{ default 42 (slice \"a\" \"b\") }} → [a b]\n{{ default 42 true }} → true\n\n<!-- As noted above, the boolean \"false\" is considered set -->\n{{ default 42 false }} → false",
    "url": "https://gohugo.io/functions/compare/default/"
  },
  {
    "namespace": "compare",
    "symbol": "compare.Eq",
    "aliases": [
      "eq"
    ],
    "memberSlug": "eq",
    "title": "compare.Eq",
    "summary": "You can also use the compare.Eq function to compare strings, boolean values, dates, slices, maps, and pages.",
    "usage": "{{ eq 1 1 }} → true\n{{ eq 1 2 }} → false\n\n{{ eq 1 1 1 }} → true\n{{ eq 1 1 2 }} → true\n{{ eq 1 2 1 }} → true\n{{ eq 1 2 2 }} → false",
    "url": "https://gohugo.io/functions/compare/eq/"
  },
  {
    "namespace": "compare",
    "symbol": "compare.Ge",
    "aliases": [
      "ge"
    ],
    "memberSlug": "ge",
    "title": "compare.Ge",
    "summary": "Use the compare.Ge function to compare other data types as well:",
    "usage": "{{ ge 1 1 }} → true\n{{ ge 1 2 }} → false\n{{ ge 2 1 }} → true\n\n{{ ge 1 1 1 }} → true\n{{ ge 1 1 2 }} → false\n{{ ge 1 2 1 }} → false\n{{ ge 1 2 2 }} → false\n\n{{ ge 2 1 1 }} → true\n{{ ge 2 1 2 }} → true\n{{ ge 2 2 1 }} → true",
    "url": "https://gohugo.io/functions/compare/ge/"
  },
  {
    "namespace": "compare",
    "symbol": "compare.Gt",
    "aliases": [
      "gt"
    ],
    "memberSlug": "gt",
    "title": "compare.Gt",
    "summary": "Use the compare.Gt function to compare other data types as well:",
    "usage": "{{ gt 1 1 }} → false\n{{ gt 1 2 }} → false\n{{ gt 2 1 }} → true\n\n{{ gt 1 1 1 }} → false\n{{ gt 1 1 2 }} → false\n{{ gt 1 2 1 }} → false\n{{ gt 1 2 2 }} → false\n\n{{ gt 2 1 1 }} → true\n{{ gt 2 1 2 }} → false\n{{ gt 2 2 1 }} → false",
    "url": "https://gohugo.io/functions/compare/gt/"
  },
  {
    "namespace": "compare",
    "symbol": "compare.Le",
    "aliases": [
      "le"
    ],
    "memberSlug": "le",
    "title": "compare.Le",
    "summary": "Use the compare.Le function to compare other data types as well:",
    "usage": "{{ le 1 1 }} → true\n{{ le 1 2 }} → true\n{{ le 2 1 }} → false\n\n{{ le 1 1 1 }} → true\n{{ le 1 1 2 }} → true\n{{ le 1 2 1 }} → true\n{{ le 1 2 2 }} → true\n\n{{ le 2 1 1 }} → false\n{{ le 2 1 2 }} → false\n{{ le 2 2 1 }} → false",
    "url": "https://gohugo.io/functions/compare/le/"
  },
  {
    "namespace": "compare",
    "symbol": "compare.Lt",
    "aliases": [
      "lt"
    ],
    "memberSlug": "lt",
    "title": "compare.Lt",
    "summary": "Use the compare.Lt function to compare other data types as well:",
    "usage": "{{ lt 1 1 }} → false\n{{ lt 1 2 }} → true\n{{ lt 2 1 }} → false\n\n{{ lt 1 1 1 }} → false\n{{ lt 1 1 2 }} → false\n{{ lt 1 2 1 }} → false\n{{ lt 1 2 2 }} → true\n\n{{ lt 2 1 1 }} → false\n{{ lt 2 1 2 }} → false\n{{ lt 2 2 1 }} → false",
    "url": "https://gohugo.io/functions/compare/lt/"
  },
  {
    "namespace": "compare",
    "symbol": "compare.Ne",
    "aliases": [
      "ne"
    ],
    "memberSlug": "ne",
    "title": "compare.Ne",
    "summary": "You can also use the compare.Ne function to compare strings, boolean values, dates, slices, maps, and pages.",
    "usage": "{{ ne 1 1 }} → false\n{{ ne 1 2 }} → true\n\n{{ ne 1 1 1 }} → false\n{{ ne 1 1 2 }} → false\n{{ ne 1 2 1 }} → false\n{{ ne 1 2 2 }} → true",
    "url": "https://gohugo.io/functions/compare/ne/"
  },
  {
    "namespace": "go-template",
    "symbol": "continue",
    "memberSlug": "continue",
    "title": "continue",
    "summary": "This template code:",
    "usage": "{{ $s := slice \"foo\" \"bar\" \"baz\" }}\n{{ range $s }}\n  {{ if eq . \"bar\" }}\n    {{ continue }}\n  {{ end }}\n  <p>{{ . }}</p>\n{{ end }}",
    "url": "https://gohugo.io/functions/go-template/continue/"
  },
  {
    "namespace": "crypto",
    "symbol": "crypto.HMAC",
    "aliases": [
      "hMAC",
      "hmac"
    ],
    "memberSlug": "hmac",
    "title": "crypto.HMAC",
    "summary": "Set the HASH_TYPE argument to md5 , sha1 , sha256 , or sha512 .",
    "usage": "{{ hmac \"sha256\" \"Secret key\" \"Secret message\" }}\n5cceb491f45f8b154e20f3b0a30ed3a6ff3027d373f85c78ffe8983180b03c84\n\n{{ hmac \"sha256\" \"Secret key\" \"Secret message\" \"hex\" }}\n5cceb491f45f8b154e20f3b0a30ed3a6ff3027d373f85c78ffe8983180b03c84\n\n{{ hmac \"sha256\" \"Secret key\" \"Secret message\" \"binary\" | base64Encode }}\nXM60kfRfixVOIPOwow7Tpv8wJ9Nz+Fx4/+iYMYCwPIQ=",
    "url": "https://gohugo.io/functions/crypto/hmac/"
  },
  {
    "namespace": "crypto",
    "symbol": "crypto.MD5",
    "aliases": [
      "mD5",
      "md5"
    ],
    "memberSlug": "md5",
    "title": "crypto.MD5",
    "summary": "This can be useful if you want to use Gravatar for generating a unique avatar:",
    "usage": "{{ md5 \"Hello world\" }} → 3e25960a79dbc69b674cd4ec67a72c62",
    "url": "https://gohugo.io/functions/crypto/md5/"
  },
  {
    "namespace": "crypto",
    "symbol": "crypto.SHA1",
    "aliases": [
      "sHA1",
      "sha1"
    ],
    "memberSlug": "sha1",
    "title": "crypto.SHA1",
    "summary": "Hashes the given input and returns its SHA1 checksum encoded to a hexadecimal string.",
    "usage": "{{ sha1 \"Hello world\" }} → 7b502c3a1f48c8609ae212cdfb639dee39673f5e",
    "url": "https://gohugo.io/functions/crypto/sha1/"
  },
  {
    "namespace": "crypto",
    "symbol": "crypto.SHA256",
    "aliases": [
      "sHA256",
      "sha256"
    ],
    "memberSlug": "sha256",
    "title": "crypto.SHA256",
    "summary": "Hashes the given input and returns its SHA256 checksum encoded to a hexadecimal string.",
    "usage": "{{ sha256 \"Hello world\" }} → 64ec88ca00b268e5ba1a35678a1b5316d212f4f366b2477232534a8aeca37f3c",
    "url": "https://gohugo.io/functions/crypto/sha256/"
  },
  {
    "namespace": "css",
    "symbol": "css.Build",
    "aliases": [
      "build"
    ],
    "memberSlug": "build",
    "title": "css.Build",
    "summary": "The css.Build function is backed by the evanw/esbuild package, providing a mature, high-performance foundation for bundling, transformation, and minification.",
    "usage": "assets/\n└── css/\n    ├── components/\n    │   ├── a.css\n    │   └── b.css\n    └── main.css",
    "url": "https://gohugo.io/functions/css/build/",
    "sinceVersion": "0.158.0"
  },
  {
    "namespace": "css",
    "symbol": "css.PostCSS",
    "aliases": [
      "postCSS",
      "postcss"
    ],
    "memberSlug": "postcss",
    "title": "css.PostCSS",
    "summary": "Follow the steps below to transform CSS using any of the available PostCSS plugins .",
    "usage": "{{ with resources.Get \"css/main.css\" | postCSS }}\n  <link rel=\"stylesheet\" href=\"{{ .RelPermalink }}\">\n{{ end }}",
    "url": "https://gohugo.io/functions/css/postcss/"
  },
  {
    "namespace": "css",
    "symbol": "css.Quoted",
    "aliases": [
      "quoted"
    ],
    "memberSlug": "quoted",
    "title": "css.Quoted",
    "summary": "This function is only applicable to the vars option passed to the css.Build or css.Sass functions.",
    "usage": "{{ $vars := dict\n  \"ol-li-after\" (\"6\" | css.Quoted)\n  \"ul-li-after\" (\"7\" | css.Quoted)\n}}\n\n{{ $opts := dict \"vars\" $vars \"transpiler\" \"dartsass\" }}\n{{ with resources.Get \"sass/main.scss\" | css.Sass $opts }}\n  <link rel=\"stylesheet\" href=\"{{ .RelPermalink }}\">\n{{ end }}",
    "url": "https://gohugo.io/functions/css/quoted/"
  },
  {
    "namespace": "css",
    "symbol": "css.Sass",
    "aliases": [
      "sass"
    ],
    "memberSlug": "sass",
    "title": "css.Sass",
    "summary": "Transpile Sass to CSS using the LibSass transpiler included in Hugo's extended and extended/deploy editions, or install Dart Sass to use the latest features of the Sass language.",
    "usage": "{{ $opts := dict \"enableSourceMap\" true }}\n{{ $r := resources.Get \"sass/main.scss\" | css.Sass $opts }}",
    "url": "https://gohugo.io/functions/css/sass/",
    "sinceVersion": "0.139.0"
  },
  {
    "namespace": "css",
    "symbol": "css.TailwindCSS",
    "aliases": [
      "tailwindCSS",
      "tailwindcss"
    ],
    "memberSlug": "tailwindcss",
    "title": "css.TailwindCSS",
    "summary": "Use the css.TailwindCSS function to process your Tailwind CSS files. This function uses the Tailwind CSS CLI to:",
    "usage": "npm install --save-dev tailwindcss @tailwindcss/cli @tailwindcss/typography",
    "url": "https://gohugo.io/functions/css/tailwindcss/",
    "sinceVersion": "0.147.4"
  },
  {
    "namespace": "css",
    "symbol": "css.Unquoted",
    "aliases": [
      "unquoted"
    ],
    "memberSlug": "unquoted",
    "title": "css.Unquoted",
    "summary": "This function is only applicable to the vars option passed to the css.Sass function.",
    "usage": "{{ $vars := dict\n  \"font-main\" (\"sans-serif\" | css.Unquoted)\n}}\n\n{{ $opts := dict \"vars\" $vars \"transpiler\" \"dartsass\" }}\n{{ with resources.Get \"sass/main.scss\" | css.Sass $opts }}\n  <link rel=\"stylesheet\" href=\"{{ .RelPermalink }}\">\n{{ end }}",
    "url": "https://gohugo.io/functions/css/unquoted/"
  },
  {
    "namespace": "debug",
    "symbol": "debug.Dump",
    "aliases": [
      "dump"
    ],
    "memberSlug": "dump",
    "title": "debug.Dump",
    "summary": "Output from this function may change from one release to the next. Use for debugging only.",
    "usage": "<pre>{{ debug.Dump hugo.Data.books }}</pre>",
    "url": "https://gohugo.io/functions/debug/dump/"
  },
  {
    "namespace": "debug",
    "symbol": "debug.Timer",
    "aliases": [
      "timer"
    ],
    "memberSlug": "timer",
    "title": "debug.Timer",
    "summary": "Use the debug.Timer function to determine execution time for a block of code, useful for finding performance bottlenecks in templates.",
    "usage": "{{ $t := debug.Timer \"TestSqrt\" }}\n{{ range 2000 }}\n  {{ $f := math.Sqrt . }}\n{{ end }}\n{{ $t.Stop }}",
    "url": "https://gohugo.io/functions/debug/timer/"
  },
  {
    "namespace": "debug",
    "symbol": "debug.VisualizeSpaces",
    "aliases": [
      "visualizeSpaces",
      "visualizespaces"
    ],
    "memberSlug": "visualizespaces",
    "title": "debug.VisualizeSpaces",
    "summary": "Returns the given string with spaces replaced by a visible string.",
    "usage": "{{ debug.VisualizeSpaces \"foo  bar\" }} → foo[SPACE][SPACE]bar",
    "url": "https://gohugo.io/functions/debug/visualizespaces/"
  },
  {
    "namespace": "go-template",
    "symbol": "define",
    "memberSlug": "define",
    "title": "define",
    "summary": "Use with the block statement:",
    "usage": "{{ block \"main\" . }}\n  {{ print \"default value if 'main' template is empty\" }}\n{{ end }}\n\n{{ define \"main\" }}\n  <h1>{{ .Title }}</h1>\n  {{ .Content }}\n{{ end }}",
    "url": "https://gohugo.io/functions/go-template/define/"
  },
  {
    "namespace": "diagrams",
    "symbol": "diagrams.Goat",
    "aliases": [
      "goat"
    ],
    "memberSlug": "goat",
    "title": "diagrams.Goat",
    "summary": "Useful in a code block render hook , the diagrams.Goat function returns an SVGDiagram object created from the given GoAT markup.",
    "usage": "```goat\n.---.     .-.       .-.       .-.     .---.\n| A +--->| 1 |<--->| 2 |<--->| 3 |<---+ B |\n'---'     '-'       '+'       '+'     '---'\n```",
    "url": "https://gohugo.io/functions/diagrams/goat/"
  },
  {
    "namespace": "go-template",
    "symbol": "else",
    "memberSlug": "else",
    "title": "else",
    "summary": "Use with the if statement:",
    "usage": "{{ $var := \"foo\" }}\n{{ if $var }}\n  {{ $var }} → foo\n{{ else }}\n  {{ print \"var is falsy\" }}\n{{ end }}",
    "url": "https://gohugo.io/functions/go-template/else/"
  },
  {
    "namespace": "encoding",
    "symbol": "encoding.Base64Decode",
    "aliases": [
      "base64Decode",
      "base64decode"
    ],
    "memberSlug": "base64decode",
    "title": "encoding.Base64Decode",
    "summary": "Use the base64Decode function to decode responses from APIs. For example, the result of this call to GitHub's API contains the base64-encoded representation of the repository's README file:",
    "usage": "{{ \"SHVnbw==\" | base64Decode }} → Hugo",
    "url": "https://gohugo.io/functions/encoding/base64decode/"
  },
  {
    "namespace": "encoding",
    "symbol": "encoding.Base64Encode",
    "aliases": [
      "base64Encode",
      "base64encode"
    ],
    "memberSlug": "base64encode",
    "title": "encoding.Base64Encode",
    "summary": "Returns the base64 decoding of the given content.",
    "usage": "{{ \"Hugo\" | base64Encode }} → SHVnbw==",
    "url": "https://gohugo.io/functions/encoding/base64encode/"
  },
  {
    "namespace": "encoding",
    "symbol": "encoding.Jsonify",
    "aliases": [
      "jsonify"
    ],
    "memberSlug": "jsonify",
    "title": "encoding.Jsonify",
    "summary": "To customize the printing of the JSON, pass an options map as the first argument. Supported options are \"prefix\" and \"indent\". Each JSON element in the output will begin on a new line beginning with prefix followed by one or more copies of indent according to the indentation nesting.",
    "usage": "{{ dict \"title\" .Title \"content\" .Plain | jsonify }}\n{{ dict \"title\" .Title \"content\" .Plain | jsonify (dict \"indent\" \"  \") }}\n{{ dict \"title\" .Title \"content\" .Plain | jsonify (dict \"prefix\" \" \" \"indent\" \"  \") }}",
    "url": "https://gohugo.io/functions/encoding/jsonify/"
  },
  {
    "namespace": "go-template",
    "symbol": "end",
    "memberSlug": "end",
    "title": "end",
    "summary": "Use with the if statement:",
    "usage": "{{ $var := \"foo\" }}\n{{ if $var }}\n  {{ $var }} → foo\n{{ end }}",
    "url": "https://gohugo.io/functions/go-template/end/"
  },
  {
    "namespace": "fmt",
    "symbol": "fmt.Errorf",
    "aliases": [
      "errorf"
    ],
    "memberSlug": "errorf",
    "title": "fmt.Errorf",
    "summary": "The documentation for Go's fmt package describes the structure and content of the format string.",
    "usage": "{{ errorf \"The %q shortcode requires a src argument. See %s\" .Name .Position }}",
    "url": "https://gohugo.io/functions/fmt/errorf/"
  },
  {
    "namespace": "fmt",
    "symbol": "fmt.Erroridf",
    "aliases": [
      "erroridf"
    ],
    "memberSlug": "erroridf",
    "title": "fmt.Erroridf",
    "summary": "The documentation for Go's fmt package describes the structure and content of the format string.",
    "usage": "{{ erroridf \"error-42\" \"You should consider fixing this.\" }}",
    "url": "https://gohugo.io/functions/fmt/erroridf/"
  },
  {
    "namespace": "fmt",
    "symbol": "fmt.Print",
    "aliases": [
      "print"
    ],
    "memberSlug": "print",
    "title": "fmt.Print",
    "summary": "Prints the default representation of the given arguments using the standard fmt.Print function.",
    "usage": "{{ print \"foo\" }} → foo\n{{ print \"foo\" \"bar\" }} → foobar\n{{ print (slice 1 2 3) }} → [1 2 3]",
    "url": "https://gohugo.io/functions/fmt/print/"
  },
  {
    "namespace": "fmt",
    "symbol": "fmt.Printf",
    "aliases": [
      "printf"
    ],
    "memberSlug": "printf",
    "title": "fmt.Printf",
    "summary": "The documentation for Go's fmt package describes the structure and content of the format string.",
    "usage": "{{ $var := \"world\" }}\n{{ printf \"Hello %s.\" $var }} → Hello world.",
    "url": "https://gohugo.io/functions/fmt/printf/"
  },
  {
    "namespace": "fmt",
    "symbol": "fmt.Println",
    "aliases": [
      "println"
    ],
    "memberSlug": "println",
    "title": "fmt.Println",
    "summary": "Prints the default representation of the given argument using the standard fmt.Print function and enforces a line break.",
    "usage": "{{ println \"foo\" }} → foo\\n\n{{ println \"foo\" \"bar\" }} → foo bar\\n",
    "url": "https://gohugo.io/functions/fmt/println/"
  },
  {
    "namespace": "fmt",
    "symbol": "fmt.Warnf",
    "aliases": [
      "warnf"
    ],
    "memberSlug": "warnf",
    "title": "fmt.Warnf",
    "summary": "The documentation for Go's fmt package describes the structure and content of the format string.",
    "usage": "{{ warnf \"The %q shortcode was unable to find %s. See %s\" .Name $file .Position }}",
    "url": "https://gohugo.io/functions/fmt/warnf/"
  },
  {
    "namespace": "fmt",
    "symbol": "fmt.Warnidf",
    "aliases": [
      "warnidf"
    ],
    "memberSlug": "warnidf",
    "title": "fmt.Warnidf",
    "summary": "The documentation for Go's fmt package describes the structure and content of the format string.",
    "usage": "{{ warnidf \"warning-42\" \"You should consider fixing this.\" }}",
    "url": "https://gohugo.io/functions/fmt/warnidf/"
  },
  {
    "namespace": "hash",
    "symbol": "hash.FNV32a",
    "aliases": [
      "fNV32a",
      "fnv32a"
    ],
    "memberSlug": "fnv32a",
    "title": "hash.FNV32a",
    "summary": "Returns the 32-bit FNV (Fowler-Noll-Vo) non-cryptographic hash of the given string.",
    "usage": "{{ hash.FNV32a \"Hello world\" }} → 1498229191",
    "url": "https://gohugo.io/functions/hash/fnv32a/"
  },
  {
    "namespace": "hash",
    "symbol": "hash.XxHash",
    "aliases": [
      "xxHash",
      "xxhash"
    ],
    "memberSlug": "xxhash",
    "title": "hash.XxHash",
    "summary": "xxHash is a very fast non-cryptographic hash algorithm. Hugo uses this Go implementation .",
    "usage": "{{ hash.XxHash \"Hello world\" }} → c500b0c912b376d8",
    "url": "https://gohugo.io/functions/hash/xxhash/"
  },
  {
    "namespace": "hugo",
    "symbol": "hugo.BuildDate",
    "aliases": [
      "buildDate",
      "builddate"
    ],
    "memberSlug": "builddate",
    "title": "hugo.BuildDate",
    "summary": "The hugo.BuildDate function returns the compile date of the Hugo binary, formatted per RFC 3339 .",
    "usage": "{{ hugo.BuildDate }} → 2023-11-01T17:57:00Z",
    "url": "https://gohugo.io/functions/hugo/builddate/"
  },
  {
    "namespace": "hugo",
    "symbol": "hugo.CommitHash",
    "aliases": [
      "commitHash",
      "commithash"
    ],
    "memberSlug": "commithash",
    "title": "hugo.CommitHash",
    "summary": "Returns the Git commit hash of the Hugo binary.",
    "usage": "{{ hugo.CommitHash }} → a4892a07b41b7b3f1f143140ee4ec0a9a5cf3970",
    "url": "https://gohugo.io/functions/hugo/commithash/"
  },
  {
    "namespace": "hugo",
    "symbol": "hugo.Data",
    "aliases": [
      "data"
    ],
    "memberSlug": "data",
    "title": "hugo.Data",
    "summary": "Use the hugo.Data function to access data within the data directory, or within any directory mounted to the data directory. Supported data formats include JSON, TOML, YAML, and XML.",
    "usage": "data/\n├── books/\n│   ├── fiction.yaml\n│   └── nonfiction.yaml\n├── films.json\n├── paintings.xml\n└── sculptures.toml",
    "url": "https://gohugo.io/functions/hugo/data/",
    "sinceVersion": "0.156.0"
  },
  {
    "namespace": "hugo",
    "symbol": "hugo.Deps",
    "aliases": [
      "deps"
    ],
    "memberSlug": "deps",
    "title": "hugo.Deps",
    "summary": "The hugo.Deps function returns a slice of project dependencies, either Hugo Modules or local theme components. Each dependency contains:",
    "usage": "<h2>Dependencies</h2>\n<table class=\"table table-dark\">\n  <thead>\n    <tr>\n      <th scope=\"col\">#</th>\n      <th scope=\"col\">Owner</th>\n      <th scope=\"col\">Path</th>\n      <th scope=\"col\">Version</th>\n      <th scope=\"col\">Time</th>\n      <th scope=\"col\">Vendor</th>\n    </tr>\n  </thead>\n  <tbody>\n    {{ range $index, $element := hugo.Deps }}\n    <tr>\n      <th scope=\"row\">{{ add $index 1 }}</th>\n      <td>{{ with $element.Owner }}{{ .Path }}{{ end }}</td>\n      <td>\n        {{ $element.Path }}\n        {{ with $element.Replace }}\n        => {{ .Path }}\n        {{ end }}\n      </td>\n      <td>{{ $element.Version }}</td>\n      <td>{{ with $element.Time }}{{ . }}{{ end }}</td>\n      <td>{{ $element.Vendor }}</td>\n    </tr>\n    {{ end }}\n  </tbody>\n</table>",
    "url": "https://gohugo.io/functions/hugo/deps/"
  },
  {
    "namespace": "hugo",
    "symbol": "hugo.Environment",
    "aliases": [
      "environment"
    ],
    "memberSlug": "environment",
    "title": "hugo.Environment",
    "summary": "The hugo.Environment function returns the current running environment as defined through the --environment command line flag.",
    "usage": "{{ hugo.Environment }} → production",
    "url": "https://gohugo.io/functions/hugo/environment/"
  },
  {
    "namespace": "hugo",
    "symbol": "hugo.Generator",
    "aliases": [
      "generator"
    ],
    "memberSlug": "generator",
    "title": "hugo.Generator",
    "summary": "Renders an HTML meta element identifying the software that generated the site.",
    "usage": "{{ hugo.Generator }} → <meta name=\"generator\" content=\"Hugo 0.160.0\">",
    "url": "https://gohugo.io/functions/hugo/generator/"
  },
  {
    "namespace": "hugo",
    "symbol": "hugo.GoVersion",
    "aliases": [
      "goVersion",
      "goversion"
    ],
    "memberSlug": "goversion",
    "title": "hugo.GoVersion",
    "summary": "Returns the Go version used to compile the Hugo binary",
    "usage": "{{ hugo.GoVersion }} → go1.21.1",
    "url": "https://gohugo.io/functions/hugo/goversion/"
  },
  {
    "namespace": "hugo",
    "symbol": "hugo.IsDevelopment",
    "aliases": [
      "isDevelopment",
      "isdevelopment"
    ],
    "memberSlug": "isdevelopment",
    "title": "hugo.IsDevelopment",
    "summary": "Reports whether the current running environment is \"development\".",
    "usage": "{{ hugo.IsDevelopment }} → true/false",
    "url": "https://gohugo.io/functions/hugo/isdevelopment/"
  },
  {
    "namespace": "hugo",
    "symbol": "hugo.IsExtended",
    "aliases": [
      "isExtended",
      "isextended"
    ],
    "memberSlug": "isextended",
    "title": "hugo.IsExtended",
    "summary": "Reports whether the Hugo binary is either the extended or extended/deploy edition.",
    "usage": "{{ hugo.IsExtended }} → true/false",
    "url": "https://gohugo.io/functions/hugo/isextended/"
  },
  {
    "namespace": "hugo",
    "symbol": "hugo.IsMultihost",
    "aliases": [
      "isMultihost",
      "ismultihost"
    ],
    "memberSlug": "ismultihost",
    "title": "hugo.IsMultihost",
    "summary": "Project configuration:",
    "usage": "defaultContentLanguage: de\ndefaultContentLanguageInSubdir: true\nlanguages:\n  de:\n    baseURL: https://de.example.org/\n    label: Deutsch\n    locale: de-DE\n    title: Projekt Dokumentation\n    weight: 1\n  en:\n    baseURL: https://en.example.org/\n    label: English\n    locale: en-US\n    title: Project Documentation\n    weight: 2",
    "url": "https://gohugo.io/functions/hugo/ismultihost/"
  },
  {
    "namespace": "hugo",
    "symbol": "hugo.IsMultilingual",
    "aliases": [
      "isMultilingual",
      "ismultilingual"
    ],
    "memberSlug": "ismultilingual",
    "title": "hugo.IsMultilingual",
    "summary": "Project configuration:",
    "usage": "defaultContentLanguage: de\ndefaultContentLanguageInSubdir: true\nlanguages:\n  de:\n    label: Deutsch\n    locale: de-DE\n    title: Projekt Dokumentation\n    weight: 1\n  en:\n    label: English\n    locale: en-US\n    title: Project Documentation\n    weight: 2",
    "url": "https://gohugo.io/functions/hugo/ismultilingual/"
  },
  {
    "namespace": "hugo",
    "symbol": "hugo.IsProduction",
    "aliases": [
      "isProduction",
      "isproduction"
    ],
    "memberSlug": "isproduction",
    "title": "hugo.IsProduction",
    "summary": "Reports whether the current running environment is \"production\".",
    "usage": "{{ hugo.IsProduction }} → true/false",
    "url": "https://gohugo.io/functions/hugo/isproduction/"
  },
  {
    "namespace": "hugo",
    "symbol": "hugo.IsServer",
    "aliases": [
      "isServer",
      "isserver"
    ],
    "memberSlug": "isserver",
    "title": "hugo.IsServer",
    "summary": "Reports whether the built-in development server is running.",
    "usage": "{{ hugo.IsServer }} → true/false",
    "url": "https://gohugo.io/functions/hugo/isserver/"
  },
  {
    "namespace": "hugo",
    "symbol": "hugo.Sites",
    "aliases": [
      "sites"
    ],
    "memberSlug": "sites",
    "title": "hugo.Sites",
    "summary": "The returned collection follows a hierarchical sort where each subsequent dimension acts as a tie-breaker for the one above it.",
    "usage": "defaultContentLanguage: de\ndefaultContentLanguageInSubdir: true\ndefaultContentVersionInSubdir: true\nlanguages:\n  de:\n    contentDir: content/de\n    direction: ltr\n    label: Deutsch\n    locale: de-DE\n    title: Projekt Dokumentation\n    weight: 1\n  en:\n    contentDir: content/en\n    direction: ltr\n    label: English\n    locale: en-US\n    title: Project Documentation\n    weight: 2\nversions:\n  v1.0.0: {}\n  v2.0.0: {}\n  v3.0.0: {}",
    "url": "https://gohugo.io/functions/hugo/sites/",
    "sinceVersion": "0.156.0"
  },
  {
    "namespace": "hugo",
    "symbol": "hugo.Store",
    "aliases": [
      "store"
    ],
    "memberSlug": "store",
    "title": "hugo.Store",
    "summary": "Use the hugo.Store function to create a globally scoped scratch pad to store and manipulate data. To create a scratch pad with a different scope , refer to the scope section below.",
    "usage": "{{ hugo.Store.Set \"greeting\" \"Hello\" }}",
    "url": "https://gohugo.io/functions/hugo/store/",
    "sinceVersion": "0.139.0"
  },
  {
    "namespace": "hugo",
    "symbol": "hugo.Version",
    "aliases": [
      "version"
    ],
    "memberSlug": "version",
    "title": "hugo.Version",
    "summary": "Returns the current version of the Hugo binary.",
    "usage": "{{ hugo.Version }} → 0.160.0",
    "url": "https://gohugo.io/functions/hugo/version/"
  },
  {
    "namespace": "hugo",
    "symbol": "hugo.WorkingDir",
    "aliases": [
      "workingDir",
      "workingdir"
    ],
    "memberSlug": "workingdir",
    "title": "hugo.WorkingDir",
    "summary": "Returns the project working directory.",
    "usage": "{{ hugo.WorkingDir }} → /home/user/projects/my-hugo-site",
    "url": "https://gohugo.io/functions/hugo/workingdir/"
  },
  {
    "namespace": "go-template",
    "symbol": "if",
    "memberSlug": "if",
    "title": "if",
    "summary": "The falsy values are false , 0 , any nil pointer or interface value, any array, slice, map, or string of length zero, and zero time.Time values.",
    "usage": "{{ $var := \"foo\" }}\n{{ if $var }}\n  {{ $var }} → foo\n{{ end }}",
    "url": "https://gohugo.io/functions/go-template/if/"
  },
  {
    "namespace": "images",
    "symbol": "images.AutoOrient",
    "aliases": [
      "autoOrient",
      "autoorient"
    ],
    "memberSlug": "autoorient",
    "title": "images.AutoOrient",
    "summary": "Create the filter:",
    "usage": "{{ $filter := images.AutoOrient }}",
    "url": "https://gohugo.io/functions/images/autoorient/"
  },
  {
    "namespace": "images",
    "symbol": "images.Brightness",
    "aliases": [
      "brightness"
    ],
    "memberSlug": "brightness",
    "title": "images.Brightness",
    "summary": "The percentage must be in the range [-100, 100] where 0 has no effect. A value of -100 produces a solid black image, and a value of 100 produces a solid white image.",
    "usage": "{{ $filter := images.Brightness 12 }}",
    "url": "https://gohugo.io/functions/images/brightness/"
  },
  {
    "namespace": "images",
    "symbol": "images.ColorBalance",
    "aliases": [
      "colorBalance",
      "colorbalance"
    ],
    "memberSlug": "colorbalance",
    "title": "images.ColorBalance",
    "summary": "The percentage for each channel (red, green, blue) must be in the range [-100, 500].",
    "usage": "{{ $filter := images.ColorBalance -10 10 50 }}",
    "url": "https://gohugo.io/functions/images/colorbalance/"
  },
  {
    "namespace": "images",
    "symbol": "images.Colorize",
    "aliases": [
      "colorize"
    ],
    "memberSlug": "colorize",
    "title": "images.Colorize",
    "summary": "The hue is the angle on the color wheel, typically in the range [0, 360].",
    "usage": "{{ $filter := images.Colorize 180 50 20 }}",
    "url": "https://gohugo.io/functions/images/colorize/"
  },
  {
    "namespace": "images",
    "symbol": "images.Config",
    "aliases": [
      "config"
    ],
    "memberSlug": "config",
    "title": "images.Config",
    "summary": "This is a legacy function, superseded by the Width and Height methods for global resources , page resources , and remote resources . See the image processing section for details.",
    "usage": "{{ $ic := images.Config \"/static/images/a.jpg\" }}\n\n{{ $ic.Width }} → 600 (int)\n{{ $ic.Height }} → 400 (int)",
    "url": "https://gohugo.io/functions/images/config/"
  },
  {
    "namespace": "images",
    "symbol": "images.Contrast",
    "aliases": [
      "contrast"
    ],
    "memberSlug": "contrast",
    "title": "images.Contrast",
    "summary": "The percentage must be in the range [-100, 100] where 0 has no effect. A value of -100 produces a solid grey image, and a value of 100 produces an over-contrasted image.",
    "usage": "{{ $filter := images.Contrast -20 }}",
    "url": "https://gohugo.io/functions/images/contrast/"
  },
  {
    "namespace": "images",
    "symbol": "images.Dither",
    "aliases": [
      "dither"
    ],
    "memberSlug": "dither",
    "title": "images.Dither",
    "summary": "Create the options map:",
    "usage": "{{ $opts := dict\n  \"colors\" (slice \"222222\" \"808080\" \"dddddd\")\n  \"method\" \"ClusteredDot4x4\"\n  \"strength\" 0.85\n}}",
    "url": "https://gohugo.io/functions/images/dither/"
  },
  {
    "namespace": "images",
    "symbol": "images.Filter",
    "aliases": [
      "filter"
    ],
    "memberSlug": "filter",
    "title": "images.Filter",
    "summary": "Use this method with global resources , page resources , or remote resources .",
    "usage": "{{ with resources.Get \"images/original.jpg\" }}\n  {{ with images.Filter images.Grayscale . }}\n    <img src=\"{{ .RelPermalink }}\" width=\"{{ .Width }}\" height=\"{{ .Height }}\" alt=\"\">\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/functions/images/filter/"
  },
  {
    "namespace": "images",
    "symbol": "images.Gamma",
    "aliases": [
      "gamma"
    ],
    "memberSlug": "gamma",
    "title": "images.Gamma",
    "summary": "The gamma value must be positive. A value greater than 1 lightens the image, while a value less than 1 darkens the image. The filter has no effect when the gamma value is 1.",
    "usage": "{{ $filter := images.Gamma 1.667 }}",
    "url": "https://gohugo.io/functions/images/gamma/"
  },
  {
    "namespace": "images",
    "symbol": "images.GaussianBlur",
    "aliases": [
      "gaussianBlur",
      "gaussianblur"
    ],
    "memberSlug": "gaussianblur",
    "title": "images.GaussianBlur",
    "summary": "The sigma value must be positive, and indicates how much the image will be blurred. The blur-affected radius is approximately 3 times the sigma value.",
    "usage": "{{ $filter := images.GaussianBlur 5 }}",
    "url": "https://gohugo.io/functions/images/gaussianblur/"
  },
  {
    "namespace": "images",
    "symbol": "images.Grayscale",
    "aliases": [
      "grayscale"
    ],
    "memberSlug": "grayscale",
    "title": "images.Grayscale",
    "summary": "Create the filter:",
    "usage": "{{ $filter := images.Grayscale }}",
    "url": "https://gohugo.io/functions/images/grayscale/"
  },
  {
    "namespace": "images",
    "symbol": "images.Hue",
    "aliases": [
      "hue"
    ],
    "memberSlug": "hue",
    "title": "images.Hue",
    "summary": "The hue angle shift is typically in the range [-180, 180] where 0 has no effect.",
    "usage": "{{ $filter := images.Hue -15 }}",
    "url": "https://gohugo.io/functions/images/hue/"
  },
  {
    "namespace": "images",
    "symbol": "images.Invert",
    "aliases": [
      "invert"
    ],
    "memberSlug": "invert",
    "title": "images.Invert",
    "summary": "Create the filter:",
    "usage": "{{ $filter := images.Invert }}",
    "url": "https://gohugo.io/functions/images/invert/"
  },
  {
    "namespace": "images",
    "symbol": "images.Mask",
    "aliases": [
      "mask"
    ],
    "memberSlug": "mask",
    "title": "images.Mask",
    "summary": "The images.Mask filter applies a mask to an image. Black pixels in the mask make the corresponding areas of the base image transparent, while white pixels keep them opaque. Color images are converted to grayscale for masking purposes. The mask is automatically resized to match the dimensions of the base image.",
    "usage": "{{ $filter := images.Process \"#00ff00\" }}",
    "url": "https://gohugo.io/functions/images/mask/",
    "sinceVersion": "0.141.0"
  },
  {
    "namespace": "images",
    "symbol": "images.Opacity",
    "aliases": [
      "opacity"
    ],
    "memberSlug": "opacity",
    "title": "images.Opacity",
    "summary": "The opacity value must be in the range [0, 1]. A value of 0 produces a transparent image, and a value of 1 produces an opaque image (no transparency).",
    "usage": "{{ $filter := images.Opacity 0.65 }}",
    "url": "https://gohugo.io/functions/images/opacity/"
  },
  {
    "namespace": "images",
    "symbol": "images.Overlay",
    "aliases": [
      "overlay"
    ],
    "memberSlug": "overlay",
    "title": "images.Overlay",
    "summary": "Capture the overlay image as a resource:",
    "usage": "{{ $overlay := \"\" }}\n{{ $path := \"images/logo.png\" }}\n{{ with resources.Get $path }}\n  {{ $overlay = . }}\n{{ else }}\n  {{ errorf \"Unable to get resource %q\" $path }}\n{{ end }}",
    "url": "https://gohugo.io/functions/images/overlay/"
  },
  {
    "namespace": "images",
    "symbol": "images.Padding",
    "aliases": [
      "padding"
    ],
    "memberSlug": "padding",
    "title": "images.Padding",
    "summary": "The last argument is the canvas color, expressed as an RGB or RGBA hexadecimal color . The default value is ffffffff (opaque white). The preceding arguments are the padding values, in pixels, using the CSS shorthand property syntax. Negative padding values will crop the image.",
    "usage": "{{ $filter := images.Padding 20 40 \"#976941\" }}",
    "url": "https://gohugo.io/functions/images/padding/"
  },
  {
    "namespace": "images",
    "symbol": "images.Pixelate",
    "aliases": [
      "pixelate"
    ],
    "memberSlug": "pixelate",
    "title": "images.Pixelate",
    "summary": "Create the filter:",
    "usage": "{{ $filter := images.Pixelate 4 }}",
    "url": "https://gohugo.io/functions/images/pixelate/"
  },
  {
    "namespace": "images",
    "symbol": "images.Process",
    "aliases": [
      "process"
    ],
    "memberSlug": "process",
    "title": "images.Process",
    "summary": "Returns an image filter that processes an image according to the given processing specification . This versatile filter supports the full range of image transformations, including resizing, cropping, rotation, and format conversion, all within a single specification string. Use this as an argument to the Filter method or the images.Filter function.",
    "usage": "{{ with resources.Get \"images/original.jpg\" }}\n  {{ $filter := images.Process \"crop 200x200 TopRight webp q50\" }}\n  {{ with .Filter $filter }}\n    <img src=\"{{ .RelPermalink }}\" width=\"{{ .Width }}\" height=\"{{ .Height }}\" alt=\"\">\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/functions/images/process/",
    "sinceVersion": "0.153.5"
  },
  {
    "namespace": "images",
    "symbol": "images.QR",
    "aliases": [
      "qR",
      "qr"
    ],
    "memberSlug": "qr",
    "title": "images.QR",
    "summary": "The images.QR function encodes the given text into a QR code using the specified options, returning an image resource. The size of the generated image depends on three factors:",
    "usage": "{{ $text := \"https://gohugo.io\" }}\n{{ with images.QR $text }}\n  <img src=\"{{ .RelPermalink }}\" width=\"{{ .Width }}\" height=\"{{ .Height }}\" alt=\"\">\n{{ end }}",
    "url": "https://gohugo.io/functions/images/qr/",
    "sinceVersion": "0.141.0"
  },
  {
    "namespace": "images",
    "symbol": "images.Saturation",
    "aliases": [
      "saturation"
    ],
    "memberSlug": "saturation",
    "title": "images.Saturation",
    "summary": "The percentage must be in the range [-100, 500] where 0 has no effect.",
    "usage": "{{ $filter := images.Saturation 65 }}",
    "url": "https://gohugo.io/functions/images/saturation/"
  },
  {
    "namespace": "images",
    "symbol": "images.Sepia",
    "aliases": [
      "sepia"
    ],
    "memberSlug": "sepia",
    "title": "images.Sepia",
    "summary": "The percentage must be in the range [0, 100] where 0 has no effect.",
    "usage": "{{ $filter := images.Sepia 75 }}",
    "url": "https://gohugo.io/functions/images/sepia/"
  },
  {
    "namespace": "images",
    "symbol": "images.Sigmoid",
    "aliases": [
      "sigmoid"
    ],
    "memberSlug": "sigmoid",
    "title": "images.Sigmoid",
    "summary": "This is a non-linear contrast change useful for photo adjustments; it preserves highlight and shadow detail.",
    "usage": "{{ $filter := images.Sigmoid 0.6 -4 }}",
    "url": "https://gohugo.io/functions/images/sigmoid/"
  },
  {
    "namespace": "images",
    "symbol": "images.Text",
    "aliases": [
      "text"
    ],
    "memberSlug": "text",
    "title": "images.Text",
    "summary": "Although none of the options are required, at a minimum you will want to set the size to be some reasonable percentage of the image height.",
    "usage": "{{ $text := \"Zion National Park\" }}\n{{ $fontPath := \"https://github.com/google/fonts/raw/main/ofl/lato/Lato-Regular.ttf\" }}\n{{ $imagePath := \"images/original.jpg\" }}",
    "url": "https://gohugo.io/functions/images/text/",
    "sinceVersion": "0.141.0"
  },
  {
    "namespace": "images",
    "symbol": "images.UnsharpMask",
    "aliases": [
      "unsharpMask",
      "unsharpmask"
    ],
    "memberSlug": "unsharpmask",
    "title": "images.UnsharpMask",
    "summary": "The sigma argument is used in a gaussian function and affects the radius of effect. Sigma must be positive. The sharpen radius is approximately 3 times the sigma value.",
    "usage": "{{ $filter := images.UnsharpMask 10 0.4 0.03 }}",
    "url": "https://gohugo.io/functions/images/unsharpmask/"
  },
  {
    "namespace": "inflect",
    "symbol": "inflect.Humanize",
    "aliases": [
      "humanize"
    ],
    "memberSlug": "humanize",
    "title": "inflect.Humanize",
    "summary": "If the input is an integer or a string representation of an integer, humanize returns the number with the proper ordinal appended.",
    "usage": "{{ humanize \"my-first-post\" }} → My first post\n{{ humanize \"myCamelPost\" }} → My camel post",
    "url": "https://gohugo.io/functions/inflect/humanize/"
  },
  {
    "namespace": "inflect",
    "symbol": "inflect.Pluralize",
    "aliases": [
      "pluralize"
    ],
    "memberSlug": "pluralize",
    "title": "inflect.Pluralize",
    "summary": "Pluralizes the given word according to a set of common English pluralization rules.",
    "usage": "{{ \"cat\" | pluralize }} → cats",
    "url": "https://gohugo.io/functions/inflect/pluralize/"
  },
  {
    "namespace": "inflect",
    "symbol": "inflect.Singularize",
    "aliases": [
      "singularize"
    ],
    "memberSlug": "singularize",
    "title": "inflect.Singularize",
    "summary": "Singularizes the given word according to a set of common English singularization rules.",
    "usage": "{{ \"cats\" | singularize }} → cat",
    "url": "https://gohugo.io/functions/inflect/singularize/"
  },
  {
    "namespace": "js",
    "symbol": "js.Babel",
    "aliases": [
      "babel"
    ],
    "memberSlug": "babel",
    "title": "js.Babel",
    "summary": "We add the main project's node_modules to NODE_PATH when running Babel and similar tools. There are some known issues with Babel in this area, so if you have a babel.config.js living in a Hugo Module (and not in the project itself), we recommend using require to load the presets/plugins, e.g.:",
    "usage": "{{ with resources.Get \"js/main.js\" }}\n  {{ $opts := dict\n    \"minified\" hugo.IsProduction\n    \"noComments\" hugo.IsProduction\n    \"sourceMap\" (cond hugo.IsProduction \"none\" \"external\")\n  }}\n  {{ with . | js.Babel $opts }}\n    {{ if hugo.IsProduction }}\n      {{ with . | fingerprint }}\n        <script src=\"{{ .RelPermalink }}\" integrity=\"{{ .Data.Integrity }}\" crossorigin=\"anonymous\"></script>\n      {{ end }}\n    {{ else }}\n      <script src=\"{{ .RelPermalink }}\"></script>\n    {{ end }}\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/functions/js/babel/"
  },
  {
    "namespace": "js",
    "symbol": "js.Batch",
    "aliases": [
      "batch"
    ],
    "memberSlug": "batch",
    "title": "js.Batch",
    "summary": "The js.Batch function is backed by the evanw/esbuild package, providing a mature, high-performance foundation for bundling, transformation, and minification.",
    "usage": "{{ with js.Batch \"js/mybatch\" }}\n  {{ with .Group \"mygroup\" }}\n      {{ with .Script \"myscript\" }}\n          {{ .SetOptions (dict \"resource\" (resources.Get \"myscript.js\")) }}\n      {{ end }}\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/functions/js/batch/",
    "sinceVersion": "0.140.0"
  },
  {
    "namespace": "js",
    "symbol": "js.Build",
    "aliases": [
      "build"
    ],
    "memberSlug": "build",
    "title": "js.Build",
    "summary": "The js.Build function is backed by the evanw/esbuild package, providing a mature, high-performance foundation for bundling, transformation, and minification.",
    "usage": "{{ with resources.Get \"js/main.js\" }}\n  {{$opts := dict\n    \"minify\" (cond hugo.IsDevelopment false true)\n    \"sourceMap\" (cond hugo.IsDevelopment \"linked\" \"none\")\n  }}\n  {{ with . | js.Build $opts }}\n    {{ if hugo.IsDevelopment }}\n      <script src=\"{{ .RelPermalink }}\"></script>\n    {{ else }}\n      {{ with . | fingerprint }}\n        <script src=\"{{ .RelPermalink }}\" integrity=\"{{ .Data.Integrity }}\" crossorigin=\"anonymous\"></script>\n      {{ end }}\n    {{ end }}\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/functions/js/build/",
    "sinceVersion": "0.140.0"
  },
  {
    "namespace": "lang",
    "symbol": "lang.FormatAccounting",
    "aliases": [
      "formatAccounting",
      "formataccounting"
    ],
    "memberSlug": "formataccounting",
    "title": "lang.FormatAccounting",
    "summary": "Localization of dates, currencies, numbers, and percentages is performed by the gohugoio/locales package. The language tag of the current site must match one of the listed locales.",
    "usage": "{{ 512.5032 | lang.FormatAccounting 2 \"NOK\" }} → NOK512.50",
    "url": "https://gohugo.io/functions/lang/formataccounting/"
  },
  {
    "namespace": "lang",
    "symbol": "lang.FormatCurrency",
    "aliases": [
      "formatCurrency",
      "formatcurrency"
    ],
    "memberSlug": "formatcurrency",
    "title": "lang.FormatCurrency",
    "summary": "Localization of dates, currencies, numbers, and percentages is performed by the gohugoio/locales package. The language tag of the current site must match one of the listed locales.",
    "usage": "{{ 512.5032 | lang.FormatCurrency 2 \"USD\" }} → $512.50",
    "url": "https://gohugo.io/functions/lang/formatcurrency/"
  },
  {
    "namespace": "lang",
    "symbol": "lang.FormatNumber",
    "aliases": [
      "formatNumber",
      "formatnumber"
    ],
    "memberSlug": "formatnumber",
    "title": "lang.FormatNumber",
    "summary": "Localization of dates, currencies, numbers, and percentages is performed by the gohugoio/locales package. The language tag of the current site must match one of the listed locales.",
    "usage": "{{ 512.5032 | lang.FormatNumber 2 }} → 512.50",
    "url": "https://gohugo.io/functions/lang/formatnumber/"
  },
  {
    "namespace": "lang",
    "symbol": "lang.FormatNumberCustom",
    "aliases": [
      "formatNumberCustom",
      "formatnumbercustom"
    ],
    "memberSlug": "formatnumbercustom",
    "title": "lang.FormatNumberCustom",
    "summary": "This function formats a number with the given precision. The first options parameter is a space-delimited string of characters to represent negativity, the decimal point, and grouping. The default value is - . , . The second options parameter defines an alternative delimiting character.",
    "usage": "{{ lang.FormatNumberCustom 2 12345.6789 }} → 12,345.68\n{{ lang.FormatNumberCustom 2 12345.6789 \"- , .\" }} → 12.345,68\n{{ lang.FormatNumberCustom 6 -12345.6789 \"- .\" }} → -12345.678900\n{{ lang.FormatNumberCustom 0 -12345.6789 \"- . ,\" }} → -12,346\n{{ lang.FormatNumberCustom 0 -12345.6789 \"-|.| \" \"|\" }} → -12 346",
    "url": "https://gohugo.io/functions/lang/formatnumbercustom/"
  },
  {
    "namespace": "lang",
    "symbol": "lang.FormatPercent",
    "aliases": [
      "formatPercent",
      "formatpercent"
    ],
    "memberSlug": "formatpercent",
    "title": "lang.FormatPercent",
    "summary": "Localization of dates, currencies, numbers, and percentages is performed by the gohugoio/locales package. The language tag of the current site must match one of the listed locales.",
    "usage": "{{ 512.5032 | lang.FormatPercent 2 }} → 512.50%",
    "url": "https://gohugo.io/functions/lang/formatpercent/"
  },
  {
    "namespace": "lang",
    "symbol": "lang.Merge",
    "aliases": [
      "merge"
    ],
    "memberSlug": "merge",
    "title": "lang.Merge",
    "summary": "As an example:",
    "usage": "{{ $pages := .Site.RegularPages | lang.Merge $frSite.RegularPages | lang.Merge $enSite.RegularPages }}",
    "url": "https://gohugo.io/functions/lang/merge/"
  },
  {
    "namespace": "lang",
    "symbol": "lang.Translate",
    "aliases": [
      "translate"
    ],
    "memberSlug": "translate",
    "title": "lang.Translate",
    "summary": "The lang.Translate function returns the value associated with given key as defined in the translation table for the current language.",
    "usage": "i18n/en.toml\ni18n/pt-BR.toml",
    "url": "https://gohugo.io/functions/lang/translate/"
  },
  {
    "namespace": "go-template",
    "symbol": "len",
    "memberSlug": "len",
    "title": "len",
    "summary": "With a string:",
    "usage": "{{ \"ab\" | len }} → 2\n{{ \"\" | len }} → 0",
    "url": "https://gohugo.io/functions/go-template/len/"
  },
  {
    "namespace": "math",
    "symbol": "math.Abs",
    "aliases": [
      "abs"
    ],
    "memberSlug": "abs",
    "title": "math.Abs",
    "summary": "Returns the absolute value of the given number.",
    "usage": "{{ math.Abs -2.1 }} → 2.1",
    "url": "https://gohugo.io/functions/math/abs/"
  },
  {
    "namespace": "math",
    "symbol": "math.Acos",
    "aliases": [
      "acos"
    ],
    "memberSlug": "acos",
    "title": "math.Acos",
    "summary": "Returns the arccosine, in radians, of the given number.",
    "usage": "{{ math.Acos 1 }} → 0",
    "url": "https://gohugo.io/functions/math/acos/"
  },
  {
    "namespace": "math",
    "symbol": "math.Add",
    "aliases": [
      "add"
    ],
    "memberSlug": "add",
    "title": "math.Add",
    "summary": "If one of the numbers is a float , the result is a float .",
    "usage": "{{ add 12 3 2 }} → 17",
    "url": "https://gohugo.io/functions/math/add/"
  },
  {
    "namespace": "math",
    "symbol": "math.Asin",
    "aliases": [
      "asin"
    ],
    "memberSlug": "asin",
    "title": "math.Asin",
    "summary": "Returns the arcsine, in radians, of the given number.",
    "usage": "{{ math.Asin 1 }} → 1.5707963267948966",
    "url": "https://gohugo.io/functions/math/asin/"
  },
  {
    "namespace": "math",
    "symbol": "math.Atan",
    "aliases": [
      "atan"
    ],
    "memberSlug": "atan",
    "title": "math.Atan",
    "summary": "Returns the arctangent, in radians, of the given number.",
    "usage": "{{ math.Atan 1 }} → 0.7853981633974483",
    "url": "https://gohugo.io/functions/math/atan/"
  },
  {
    "namespace": "math",
    "symbol": "math.Atan2",
    "aliases": [
      "atan2"
    ],
    "memberSlug": "atan2",
    "title": "math.Atan2",
    "summary": "Returns the arctangent, in radians, of the given number pair, determining the correct quadrant from their signs.",
    "usage": "{{ math.Atan2 1 2 }} → 0.4636476090008061",
    "url": "https://gohugo.io/functions/math/atan2/"
  },
  {
    "namespace": "math",
    "symbol": "math.Ceil",
    "aliases": [
      "ceil"
    ],
    "memberSlug": "ceil",
    "title": "math.Ceil",
    "summary": "Returns the least integer value greater than or equal to the given number.",
    "usage": "{{ math.Ceil 2.1 }} → 3",
    "url": "https://gohugo.io/functions/math/ceil/"
  },
  {
    "namespace": "math",
    "symbol": "math.Cos",
    "aliases": [
      "cos"
    ],
    "memberSlug": "cos",
    "title": "math.Cos",
    "summary": "Returns the cosine of the given radian number.",
    "usage": "{{ math.Cos 1 }} → 0.5403023058681398",
    "url": "https://gohugo.io/functions/math/cos/"
  },
  {
    "namespace": "math",
    "symbol": "math.Counter",
    "aliases": [
      "counter"
    ],
    "memberSlug": "counter",
    "title": "math.Counter",
    "summary": "The counter is global for both monolingual and multilingual projects, and its initial value for each build is 1.",
    "usage": "{{ warnf \"page.html called %d times\" math.Counter }}",
    "url": "https://gohugo.io/functions/math/counter/"
  },
  {
    "namespace": "math",
    "symbol": "math.Div",
    "aliases": [
      "div"
    ],
    "memberSlug": "div",
    "title": "math.Div",
    "summary": "If one of the numbers is a float , the result is a float .",
    "usage": "{{ div 12 3 2 }} → 2",
    "url": "https://gohugo.io/functions/math/div/"
  },
  {
    "namespace": "math",
    "symbol": "math.Floor",
    "aliases": [
      "floor"
    ],
    "memberSlug": "floor",
    "title": "math.Floor",
    "summary": "Returns the greatest integer value less than or equal to the given number.",
    "usage": "{{ math.Floor 1.9 }} → 1",
    "url": "https://gohugo.io/functions/math/floor/"
  },
  {
    "namespace": "math",
    "symbol": "math.Log",
    "aliases": [
      "log"
    ],
    "memberSlug": "log",
    "title": "math.Log",
    "summary": "Returns the natural logarithm of the given number.",
    "usage": "{{ math.Log 42 }} → 3.737",
    "url": "https://gohugo.io/functions/math/log/"
  },
  {
    "namespace": "math",
    "symbol": "math.Max",
    "aliases": [
      "max"
    ],
    "memberSlug": "max",
    "title": "math.Max",
    "summary": "Returns the greater of all numbers. Accepts scalars, slices, or both.",
    "usage": "{{ math.Max 1 (slice 2 3) 4 }} → 4",
    "url": "https://gohugo.io/functions/math/max/"
  },
  {
    "namespace": "math",
    "symbol": "math.MaxInt64",
    "aliases": [
      "maxInt64",
      "maxint64"
    ],
    "memberSlug": "maxint64",
    "title": "math.MaxInt64",
    "summary": "This function is helpful for simulating a loop that continues indefinitely until a break condition is met. For example:",
    "usage": "{{ math.MaxInt64 }} → 9223372036854775807",
    "url": "https://gohugo.io/functions/math/maxint64/",
    "sinceVersion": "0.147.3"
  },
  {
    "namespace": "math",
    "symbol": "math.Min",
    "aliases": [
      "min"
    ],
    "memberSlug": "min",
    "title": "math.Min",
    "summary": "Returns the smaller of all numbers. Accepts scalars, slices, or both.",
    "usage": "{{ math.Min 1 (slice 2 3) 4 }} → 1",
    "url": "https://gohugo.io/functions/math/min/"
  },
  {
    "namespace": "math",
    "symbol": "math.Mod",
    "aliases": [
      "mod"
    ],
    "memberSlug": "mod",
    "title": "math.Mod",
    "summary": "Returns the modulus of two integers.",
    "usage": "{{ mod 15 3 }} → 0",
    "url": "https://gohugo.io/functions/math/mod/"
  },
  {
    "namespace": "math",
    "symbol": "math.ModBool",
    "aliases": [
      "modBool",
      "modbool"
    ],
    "memberSlug": "modbool",
    "title": "math.ModBool",
    "summary": "Reports whether the modulus of two integers equals 0.",
    "usage": "{{ modBool 15 3 }} → true",
    "url": "https://gohugo.io/functions/math/modbool/"
  },
  {
    "namespace": "math",
    "symbol": "math.Mul",
    "aliases": [
      "mul"
    ],
    "memberSlug": "mul",
    "title": "math.Mul",
    "summary": "If one of the numbers is a float , the result is a float .",
    "usage": "{{ mul 12 3 2 }} → 72",
    "url": "https://gohugo.io/functions/math/mul/"
  },
  {
    "namespace": "math",
    "symbol": "math.Pi",
    "aliases": [
      "pi"
    ],
    "memberSlug": "pi",
    "title": "math.Pi",
    "summary": "Returns the mathematical constant pi.",
    "usage": "{{ math.Pi }} → 3.141592653589793",
    "url": "https://gohugo.io/functions/math/pi/"
  },
  {
    "namespace": "math",
    "symbol": "math.Pow",
    "aliases": [
      "pow"
    ],
    "memberSlug": "pow",
    "title": "math.Pow",
    "summary": "Returns the first number raised to the power of the second number.",
    "usage": "{{ math.Pow 2 3 }} → 8",
    "url": "https://gohugo.io/functions/math/pow/"
  },
  {
    "namespace": "math",
    "symbol": "math.Product",
    "aliases": [
      "product"
    ],
    "memberSlug": "product",
    "title": "math.Product",
    "summary": "Returns the product of all numbers. Accepts scalars, slices, or both.",
    "usage": "{{ math.Product 1 (slice 2 3) 4 }} → 24",
    "url": "https://gohugo.io/functions/math/product/"
  },
  {
    "namespace": "math",
    "symbol": "math.Rand",
    "aliases": [
      "rand"
    ],
    "memberSlug": "rand",
    "title": "math.Rand",
    "summary": "The math.Rand function returns a pseudo-random number in the half-open interval [0.0, 1.0).",
    "usage": "{{ math.Rand }} → 0.6312770459590062",
    "url": "https://gohugo.io/functions/math/rand/"
  },
  {
    "namespace": "math",
    "symbol": "math.Round",
    "aliases": [
      "round"
    ],
    "memberSlug": "round",
    "title": "math.Round",
    "summary": "Returns the nearest integer, rounding half away from zero.",
    "usage": "{{ math.Round 1.5 }} → 2",
    "url": "https://gohugo.io/functions/math/round/"
  },
  {
    "namespace": "math",
    "symbol": "math.Sin",
    "aliases": [
      "sin"
    ],
    "memberSlug": "sin",
    "title": "math.Sin",
    "summary": "Returns the sine of the given radian number.",
    "usage": "{{ math.Sin 1 }} → 0.8414709848078965",
    "url": "https://gohugo.io/functions/math/sin/"
  },
  {
    "namespace": "math",
    "symbol": "math.Sqrt",
    "aliases": [
      "sqrt"
    ],
    "memberSlug": "sqrt",
    "title": "math.Sqrt",
    "summary": "Returns the square root of the given number.",
    "usage": "{{ math.Sqrt 81 }} → 9",
    "url": "https://gohugo.io/functions/math/sqrt/"
  },
  {
    "namespace": "math",
    "symbol": "math.Sub",
    "aliases": [
      "sub"
    ],
    "memberSlug": "sub",
    "title": "math.Sub",
    "summary": "If one of the numbers is a float , the result is a float .",
    "usage": "{{ sub 12 3 2 }} → 7",
    "url": "https://gohugo.io/functions/math/sub/"
  },
  {
    "namespace": "math",
    "symbol": "math.Sum",
    "aliases": [
      "sum"
    ],
    "memberSlug": "sum",
    "title": "math.Sum",
    "summary": "Returns the sum of all numbers. Accepts scalars, slices, or both.",
    "usage": "{{ math.Sum 1 (slice 2 3) 4 }} → 10",
    "url": "https://gohugo.io/functions/math/sum/"
  },
  {
    "namespace": "math",
    "symbol": "math.Tan",
    "aliases": [
      "tan"
    ],
    "memberSlug": "tan",
    "title": "math.Tan",
    "summary": "Returns the tangent of the given radian number.",
    "usage": "{{ math.Tan 1 }} → 1.557407724654902",
    "url": "https://gohugo.io/functions/math/tan/"
  },
  {
    "namespace": "math",
    "symbol": "math.ToDegrees",
    "aliases": [
      "toDegrees",
      "todegrees"
    ],
    "memberSlug": "todegrees",
    "title": "math.ToDegrees",
    "summary": "ToDegrees converts radians into degrees.",
    "usage": "{{ math.ToDegrees 1.5707963267948966 }} → 90",
    "url": "https://gohugo.io/functions/math/todegrees/"
  },
  {
    "namespace": "math",
    "symbol": "math.ToRadians",
    "aliases": [
      "toRadians",
      "toradians"
    ],
    "memberSlug": "toradians",
    "title": "math.ToRadians",
    "summary": "ToRadians converts degrees into radians.",
    "usage": "{{ math.ToRadians 90 }} → 1.5707963267948966",
    "url": "https://gohugo.io/functions/math/toradians/"
  },
  {
    "namespace": "go-template",
    "symbol": "not",
    "memberSlug": "not",
    "title": "not",
    "summary": "Unlike the and and or operators, the not operator always returns a boolean value.",
    "usage": "{{ not true }} → false\n{{ not false }} → true\n\n{{ not 1 }} → false\n{{ not 0 }} → true\n\n{{ not \"x\" }} → false\n{{ not \"\" }} → true",
    "url": "https://gohugo.io/functions/go-template/not/"
  },
  {
    "namespace": "openapi3",
    "symbol": "openapi3.Unmarshal",
    "aliases": [
      "unmarshal"
    ],
    "memberSlug": "unmarshal",
    "title": "openapi3.Unmarshal",
    "summary": "The resource passed to the openapi3.Unmarshal function must be an OpenAPI Document , typically in JSON or YAML format. This resource can be a global resource or a remote resource .",
    "usage": "{{ $api := \"\" }}\n{{ $url := \"https://petstore.swagger.io/v2/swagger.json\" }}\n{{ $opts := dict\n  \"headers\" (dict \"Authorization\" \"Bearer abcd\")\n}}\n{{ with try (resources.GetRemote $url $opts) }}\n  {{ with .Err }}\n    {{ errorf \"%s\" . }}\n  {{ else with .Value }}\n    {{ $api = openapi3.Unmarshal . (dict \"getremote\" $opts) }}\n  {{ else }}\n    {{ errorf \"Unable to get remote resource %q\" $url }}\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/functions/openapi3/unmarshal/",
    "sinceVersion": "0.153.0"
  },
  {
    "namespace": "go-template",
    "symbol": "or",
    "memberSlug": "or",
    "title": "or",
    "summary": "The falsy values are false , 0 , any nil pointer or interface value, any array, slice, map, or string of length zero, and zero time.Time values.",
    "usage": "{{ or 0 1 2 }} → 1 (int)\n{{ or false \"a\" 1 }} → a (string)\n{{ or 0 true \"a\" }} → true (bool)\n\n{{ or false \"\" 0 }} → 0 (int)\n{{ or 0 \"\" false }} → false (bool)\n\n{{ or true (math.Div 1 0) }} → true (bool)",
    "url": "https://gohugo.io/functions/go-template/or/"
  },
  {
    "namespace": "os",
    "symbol": "os.FileExists",
    "aliases": [
      "fileExists",
      "fileexists"
    ],
    "memberSlug": "fileexists",
    "title": "os.FileExists",
    "summary": "The os.FileExists function attempts to resolve the path relative to the root of your project directory. If a matching file or directory is not found, it will attempt to resolve the path relative to the contentDir . A leading path separator ( / ) is optional.",
    "usage": "content/\n├── about.md\n├── contact.md\n└── news/\n    ├── article-1.md\n    └── article-2.md",
    "url": "https://gohugo.io/functions/os/fileexists/"
  },
  {
    "namespace": "os",
    "symbol": "os.Getenv",
    "aliases": [
      "getenv"
    ],
    "memberSlug": "getenv",
    "title": "os.Getenv",
    "summary": "By default, when using the os.Getenv function Hugo allows access to:",
    "usage": "security:\n  funcs:\n    getenv:\n    - ^HUGO_\n    - ^CI$\n    - ^USER$\n    - ^HOME$",
    "url": "https://gohugo.io/functions/os/getenv/"
  },
  {
    "namespace": "os",
    "symbol": "os.ReadDir",
    "aliases": [
      "readDir",
      "readdir"
    ],
    "memberSlug": "readdir",
    "title": "os.ReadDir",
    "summary": "The os.ReadDir function resolves the path relative to the root of your project directory. A leading path separator ( / ) is optional.",
    "usage": "content/\n├── about.md\n├── contact.md\n└── news/\n    ├── article-1.md\n    └── article-2.md",
    "url": "https://gohugo.io/functions/os/readdir/"
  },
  {
    "namespace": "os",
    "symbol": "os.ReadFile",
    "aliases": [
      "readFile",
      "readfile"
    ],
    "memberSlug": "readfile",
    "title": "os.ReadFile",
    "summary": "The os.ReadFile function attempts to resolve the path relative to the root of your project directory. If a matching file is not found, it will attempt to resolve the path relative to the contentDir . A leading path separator ( / ) is optional.",
    "usage": "This is **bold** text.",
    "url": "https://gohugo.io/functions/os/readfile/"
  },
  {
    "namespace": "os",
    "symbol": "os.Stat",
    "aliases": [
      "stat"
    ],
    "memberSlug": "stat",
    "title": "os.Stat",
    "summary": "The os.Stat function attempts to resolve the path relative to the root of your project directory. If a matching file or directory is not found, it will attempt to resolve the path relative to the contentDir . A leading path separator ( / ) is optional.",
    "usage": "{{ $f := os.Stat \"README.md\" }}\n{{ $f.IsDir }}    → false (bool)\n{{ $f.ModTime }}  → 2021-11-25 10:06:49.315429236 -0800 PST (time.Time)\n{{ $f.Name }}     → README.md (string)\n{{ $f.Size }}     → 241 (int64)\n\n{{ $d := os.Stat \"content\" }}\n{{ $d.IsDir }}    → true (bool)",
    "url": "https://gohugo.io/functions/os/stat/"
  },
  {
    "namespace": "global",
    "symbol": "page",
    "memberSlug": "page",
    "title": "page",
    "summary": "At the top level of a template that receives a Page object in context, these are equivalent:",
    "usage": "{{ .Params.foo }}\n{{ .Page.Params.foo }}\n{{ page.Params.foo }}",
    "url": "https://gohugo.io/functions/global/page/"
  },
  {
    "namespace": "partials",
    "symbol": "partials.Include",
    "aliases": [
      "include"
    ],
    "memberSlug": "include",
    "title": "partials.Include",
    "summary": "Without a return statement, the partial function returns a string of type template.HTML . With a return statement, the partial function can return any data type.",
    "usage": "layouts/\n└── _partials/\n    ├── average.html\n    ├── breadcrumbs.html\n    └── footer.html",
    "url": "https://gohugo.io/functions/partials/include/"
  },
  {
    "namespace": "partials",
    "symbol": "partials.IncludeCached",
    "aliases": [
      "includeCached",
      "includecached"
    ],
    "memberSlug": "includecached",
    "title": "partials.IncludeCached",
    "summary": "Without a return statement, the partialCached function returns a string of type template.HTML . With a return statement, the partialCached function can return any data type.",
    "usage": "{{ partialCached \"footer.html\" . }}",
    "url": "https://gohugo.io/functions/partials/includecached/"
  },
  {
    "namespace": "path",
    "symbol": "path.Base",
    "aliases": [
      "base"
    ],
    "memberSlug": "base",
    "title": "path.Base",
    "summary": "Replaces path separators with slashes ( / ) and returns the last element of the given path.",
    "usage": "{{ path.Base \"a/news.html\" }} → news.html\n{{ path.Base \"news.html\" }} → news.html\n{{ path.Base \"a/b/c\" }} → c\n{{ path.Base \"/x/y/z/\" }} → z\n{{ path.Base \"\" }} → .",
    "url": "https://gohugo.io/functions/path/base/"
  },
  {
    "namespace": "path",
    "symbol": "path.BaseName",
    "aliases": [
      "baseName",
      "basename"
    ],
    "memberSlug": "basename",
    "title": "path.BaseName",
    "summary": "Replaces path separators with slashes ( / ) and returns the last element of the given path, removing the extension if present.",
    "usage": "{{ path.BaseName \"a/news.html\" }} → news\n{{ path.BaseName \"news.html\" }} → news\n{{ path.BaseName \"a/b/c\" }} → c\n{{ path.BaseName \"/x/y/z/\" }} → z\n{{ path.BaseName \"\" }} → .",
    "url": "https://gohugo.io/functions/path/basename/"
  },
  {
    "namespace": "path",
    "symbol": "path.Clean",
    "aliases": [
      "clean"
    ],
    "memberSlug": "clean",
    "title": "path.Clean",
    "summary": "See Go's path.Clean documentation for details.",
    "usage": "{{ path.Clean \"foo/bar\" }} → foo/bar\n{{ path.Clean \"/foo/bar\" }} → /foo/bar\n{{ path.Clean \"/foo/bar/\" }} → /foo/bar\n{{ path.Clean \"/foo//bar/\" }} → /foo/bar\n{{ path.Clean \"/foo/./bar/\" }} → /foo/bar\n{{ path.Clean \"/foo/../bar/\" }} → /bar\n{{ path.Clean \"/../foo/../bar/\" }} → /bar\n{{ path.Clean \"\" }} → .",
    "url": "https://gohugo.io/functions/path/clean/"
  },
  {
    "namespace": "path",
    "symbol": "path.Dir",
    "aliases": [
      "dir"
    ],
    "memberSlug": "dir",
    "title": "path.Dir",
    "summary": "Replaces path separators with slashes (/) and returns all but the last element of the given path.",
    "usage": "{{ path.Dir \"a/news.html\" }} → a\n{{ path.Dir \"news.html\" }} → .\n{{ path.Dir \"a/b/c\" }} → a/b\n{{ path.Dir \"/a/b/c\" }} → /a/b\n{{ path.Dir \"/a/b/c/\" }} → /a/b/c\n{{ path.Dir \"\" }} → .",
    "url": "https://gohugo.io/functions/path/dir/"
  },
  {
    "namespace": "path",
    "symbol": "path.Ext",
    "aliases": [
      "ext"
    ],
    "memberSlug": "ext",
    "title": "path.Ext",
    "summary": "The extension is the suffix beginning at the final dot in the final slash-separated element of path; it is empty if there is no dot.",
    "usage": "{{ path.Ext \"a/b/c/news.html\" }} → .html",
    "url": "https://gohugo.io/functions/path/ext/"
  },
  {
    "namespace": "path",
    "symbol": "path.Join",
    "aliases": [
      "join"
    ],
    "memberSlug": "join",
    "title": "path.Join",
    "summary": "See Go's path.Join and path.Clean documentation for details.",
    "usage": "{{ path.Join \"partial\" \"news.html\" }} → partial/news.html\n{{ path.Join \"partial/\" \"news.html\" }} → partial/news.html\n{{ path.Join \"foo/bar\" \"baz\" }} → foo/bar/baz\n{{ path.Join \"foo\" \"bar\" \"baz\" }} → foo/bar/baz\n{{ path.Join \"foo\" \"\" \"baz\" }} → foo/baz\n{{ path.Join \"foo\" \".\" \"baz\" }} → foo/baz\n{{ path.Join \"foo\" \"..\" \"baz\" }} → baz\n{{ path.Join \"/..\" \"foo\" \"..\" \"baz\" }} → baz",
    "url": "https://gohugo.io/functions/path/join/"
  },
  {
    "namespace": "path",
    "symbol": "path.Split",
    "aliases": [
      "split"
    ],
    "memberSlug": "split",
    "title": "path.Split",
    "summary": "If there is no slash in the given path, path.Split returns an empty directory, and file set to path. The returned values have the property that path = dir+file.",
    "usage": "{{ $dirFile := path.Split \"a/news.html\" }}\n{{ $dirFile.Dir }} → a/\n{{ $dirFile.File }} → news.html\n\n{{ $dirFile := path.Split \"news.html\" }}\n{{ $dirFile.Dir }} → \"\" (empty string)\n{{ $dirFile.File }} → news.html\n\n{{ $dirFile := path.Split \"a/b/c\" }}\n{{ $dirFile.Dir }} → a/b/\n{{ $dirFile.File }} → c",
    "url": "https://gohugo.io/functions/path/split/"
  },
  {
    "namespace": "go-template",
    "symbol": "range",
    "memberSlug": "range",
    "title": "range",
    "summary": "The collection may be a slice, a map, or an integer.",
    "usage": "{{ $s := slice \"foo\" \"bar\" \"baz\" }}\n{{ range $s }}\n  {{ . }} → foo bar baz\n{{ end }}",
    "url": "https://gohugo.io/functions/go-template/range/"
  },
  {
    "namespace": "reflect",
    "symbol": "reflect.IsImageResource",
    "aliases": [
      "isImageResource",
      "isimageresource"
    ],
    "memberSlug": "isimageresource",
    "title": "reflect.IsImageResource",
    "summary": "This example iterates through all project resources and uses reflect.IsImageResource to decide whether to render an image tag or provide a download link for non-image files.",
    "usage": "{{ range resources.Match \"**\" }}\n  {{ if reflect.IsImageResource . }}\n    <img src=\"{{ .RelPermalink }}\" alt=\"Image\">\n  {{ else }}\n    <a href=\"{{ .RelPermalink }}\">Download</a>\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/functions/reflect/isimageresource/",
    "sinceVersion": "0.154.0"
  },
  {
    "namespace": "reflect",
    "symbol": "reflect.IsImageResourceProcessable",
    "aliases": [
      "isImageResourceProcessable",
      "isimageresourceprocessable"
    ],
    "memberSlug": "isimageresourceprocessable",
    "title": "reflect.IsImageResourceProcessable",
    "summary": "A processable image is an image file characterized by one of the following media types :",
    "usage": "{{ range resources.Match \"**\" }}\n  {{ if reflect.IsImageResourceProcessable . }}\n    {{ with .Process \"resize 300x webp\" }}\n      <img src=\"{{ .RelPermalink }}\" width=\"{{ .Width }}\" height=\"{{ .Height }}\" alt=\"Processed Image\">\n    {{ end }}\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/functions/reflect/isimageresourceprocessable/",
    "sinceVersion": "0.157.0"
  },
  {
    "namespace": "reflect",
    "symbol": "reflect.IsImageResourceWithMeta",
    "aliases": [
      "isImageResourceWithMeta",
      "isimageresourcewithmeta"
    ],
    "memberSlug": "isimageresourcewithmeta",
    "title": "reflect.IsImageResourceWithMeta",
    "summary": "This example iterates through all project resources and uses reflect.IsImageResourceWithMeta to safely display image dimensions and metadata only for supported formats.",
    "usage": "{{ range resources.Match \"**\" }}\n  {{ if reflect.IsImageResourceWithMeta . }}\n    <img src=\"{{ .RelPermalink }}\" width=\"{{ .Width }}\" height=\"{{ .Height }}\" alt=\"Image with Meta\">\n    {{ with .Meta }}\n      <p>Taken on: {{ .Date }}</p>\n    {{ end }}\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/functions/reflect/isimageresourcewithmeta/",
    "sinceVersion": "0.157.0"
  },
  {
    "namespace": "reflect",
    "symbol": "reflect.IsMap",
    "aliases": [
      "isMap",
      "ismap"
    ],
    "memberSlug": "ismap",
    "title": "reflect.IsMap",
    "summary": "Reports whether the given value is a map.",
    "usage": "{{ reflect.IsMap (dict \"key\" \"value\") }} → true\n{{ reflect.IsMap \"yo\" }} → false",
    "url": "https://gohugo.io/functions/reflect/ismap/"
  },
  {
    "namespace": "reflect",
    "symbol": "reflect.IsPage",
    "aliases": [
      "isPage",
      "ispage"
    ],
    "memberSlug": "ispage",
    "title": "reflect.IsPage",
    "summary": "Reports whether the given value is a Page object.",
    "usage": "{{ with site.GetPage \"/examples\" }}\n  {{ reflect.IsPage . }} → true\n{{ end }}\n\n{{ with .Site  }}\n  {{ reflect.IsPage . }} → false\n{{ end }}",
    "url": "https://gohugo.io/functions/reflect/ispage/",
    "sinceVersion": "0.154.0"
  },
  {
    "namespace": "reflect",
    "symbol": "reflect.IsResource",
    "aliases": [
      "isResource",
      "isresource"
    ],
    "memberSlug": "isresource",
    "title": "reflect.IsResource",
    "summary": "With this project structure:",
    "usage": "project/\n├── assets/\n│   ├── a.json\n│   ├── b.avif\n│   └── c.jpg\n└── content/\n    └── example/\n        ├── index.md\n        ├── d.json\n        ├── e.avif\n        └── f.jpg",
    "url": "https://gohugo.io/functions/reflect/isresource/",
    "sinceVersion": "0.154.0"
  },
  {
    "namespace": "reflect",
    "symbol": "reflect.IsSite",
    "aliases": [
      "isSite",
      "issite"
    ],
    "memberSlug": "issite",
    "title": "reflect.IsSite",
    "summary": "Reports whether the given value is a Site object.",
    "usage": "{{ with .Site  }}\n  {{ reflect.IsSite . }} → true\n{{ end }}\n\n{{ with site.GetPage \"/examples\" }}\n  {{ reflect.IsSite . }} → false\n{{ end }}",
    "url": "https://gohugo.io/functions/reflect/issite/",
    "sinceVersion": "0.154.0"
  },
  {
    "namespace": "reflect",
    "symbol": "reflect.IsSlice",
    "aliases": [
      "isSlice",
      "isslice"
    ],
    "memberSlug": "isslice",
    "title": "reflect.IsSlice",
    "summary": "Reports whether the given value is a slice.",
    "usage": "{{ reflect.IsSlice (slice 1 2 3) }} → true\n{{ reflect.IsSlice \"yo\" }} → false",
    "url": "https://gohugo.io/functions/reflect/isslice/"
  },
  {
    "namespace": "resources",
    "symbol": "resources.ByType",
    "aliases": [
      "byType",
      "bytype"
    ],
    "memberSlug": "bytype",
    "title": "resources.ByType",
    "summary": "The media type is typically one of image , text , audio , video , or application .",
    "usage": "{{ range resources.ByType \"image\" }}\n  <img src=\"{{ .RelPermalink }}\" width=\"{{ .Width }}\" height=\"{{ .Height }}\" alt=\"\">\n{{ end }}",
    "url": "https://gohugo.io/functions/resources/bytype/"
  },
  {
    "namespace": "resources",
    "symbol": "resources.Concat",
    "aliases": [
      "concat"
    ],
    "memberSlug": "concat",
    "title": "resources.Concat",
    "summary": "The resources.Concat function returns a concatenated slice of resources, caching the result using the target path as its cache key. Each resource must have the same media type .",
    "usage": "{{ $plugins := resources.Get \"js/plugins.js\" }}\n{{ $global := resources.Get \"js/global.js\" }}\n{{ $js := slice $plugins $global | resources.Concat \"js/bundle.js\" }}",
    "url": "https://gohugo.io/functions/resources/concat/"
  },
  {
    "namespace": "resources",
    "symbol": "resources.Copy",
    "aliases": [
      "copy"
    ],
    "memberSlug": "copy",
    "title": "resources.Copy",
    "summary": "The relative URL of the new published resource will be:",
    "usage": "{{ with resources.Get \"images/a.jpg\" }}\n  {{ with resources.Copy \"img/new-image-name.jpg\" . }}\n    <img src=\"{{ .RelPermalink }}\" width=\"{{ .Width }}\" height=\"{{ .Height }}\" alt=\"\">\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/functions/resources/copy/"
  },
  {
    "namespace": "resources",
    "symbol": "resources.ExecuteAsTemplate",
    "aliases": [
      "executeAsTemplate",
      "executeastemplate"
    ],
    "memberSlug": "executeastemplate",
    "title": "resources.ExecuteAsTemplate",
    "summary": "The resources.ExecuteAsTemplate function returns a resource created from a Go template, parsed and executed with the given context, caching the result using the target path as its cache key.",
    "usage": "body {\n  background-color: {{ site.Params.style.bg_color }};\n  color: {{ site.Params.style.text_color }};\n}",
    "url": "https://gohugo.io/functions/resources/executeastemplate/"
  },
  {
    "namespace": "resources",
    "symbol": "resources.Fingerprint",
    "aliases": [
      "fingerprint"
    ],
    "memberSlug": "fingerprint",
    "title": "resources.Fingerprint",
    "summary": "Hugo renders this to something like:",
    "usage": "{{ with resources.Get \"js/main.js\" }}\n  {{ with . | fingerprint \"sha256\" }}\n    <script src=\"{{ .RelPermalink }}\" integrity=\"{{ .Data.Integrity }}\" crossorigin=\"anonymous\"></script>\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/functions/resources/fingerprint/"
  },
  {
    "namespace": "resources",
    "symbol": "resources.FromString",
    "aliases": [
      "fromString",
      "fromstring"
    ],
    "memberSlug": "fromstring",
    "title": "resources.FromString",
    "summary": "The resources.FromString function returns a resource created from a string, caching the result using the target path as its cache key.",
    "usage": "{\n  \"build_date\": \"2026-04-04T10:46:21-07:00\",\n  \"hugo_version\": \"0.160.0\",\n  \"last_modified\": \"2026-04-04T10:46:26-07:00\"\n}",
    "url": "https://gohugo.io/functions/resources/fromstring/"
  },
  {
    "namespace": "resources",
    "symbol": "resources.Get",
    "aliases": [
      "get"
    ],
    "memberSlug": "get",
    "title": "resources.Get",
    "summary": "This function operates on global resources. A global resource is a file within the assets directory, or within any directory mounted to the assets directory.",
    "usage": "{{ with resources.Get \"images/a.jpg\" }}\n  <img src=\"{{ .RelPermalink }}\" width=\"{{ .Width }}\" height=\"{{ .Height }}\" alt=\"\">\n{{ end }}",
    "url": "https://gohugo.io/functions/resources/get/"
  },
  {
    "namespace": "resources",
    "symbol": "resources.GetMatch",
    "aliases": [
      "getMatch",
      "getmatch"
    ],
    "memberSlug": "getmatch",
    "title": "resources.GetMatch",
    "summary": "This function operates on global resources. A global resource is a file within the assets directory, or within any directory mounted to the assets directory.",
    "usage": "{{ with resources.GetMatch \"images/*.jpg\" }}\n  <img src=\"{{ .RelPermalink }}\" width=\"{{ .Width }}\" height=\"{{ .Height }}\" alt=\"\">\n{{ end }}",
    "url": "https://gohugo.io/functions/resources/getmatch/"
  },
  {
    "namespace": "resources",
    "symbol": "resources.GetRemote",
    "aliases": [
      "getRemote",
      "getremote"
    ],
    "memberSlug": "getremote",
    "title": "resources.GetRemote",
    "summary": "New in v0.141.0",
    "usage": "{{ $url := \"https://example.org/images/a.jpg\" }}\n{{ with try (resources.GetRemote $url) }}\n  {{ with .Err }}\n    {{ errorf \"%s\" . }}\n  {{ else with .Value }}\n    <img src=\"{{ .RelPermalink }}\" width=\"{{ .Width }}\" height=\"{{ .Height }}\" alt=\"\">\n  {{ else }}\n    {{ errorf \"Unable to get remote resource %q\" $url }}\n  {{ end }}\n{{ end }}",
    "url": "https://gohugo.io/functions/resources/getremote/",
    "sinceVersion": "0.143.0"
  },
  {
    "namespace": "resources",
    "symbol": "resources.Match",
    "aliases": [
      "match"
    ],
    "memberSlug": "match",
    "title": "resources.Match",
    "summary": "This function operates on global resources. A global resource is a file within the assets directory, or within any directory mounted to the assets directory.",
    "usage": "{{ range resources.Match \"images/*.jpg\" }}\n  <img src=\"{{ .RelPermalink }}\" width=\"{{ .Width }}\" height=\"{{ .Height }}\" alt=\"\">\n{{ end }}",
    "url": "https://gohugo.io/functions/resources/match/"
  },
  {
    "namespace": "resources",
    "symbol": "resources.Minify",
    "aliases": [
      "minify"
    ],
    "memberSlug": "minify",
    "title": "resources.Minify",
    "summary": "Any CSS, JS, JSON, HTML, SVG, or XML resource can be minified using resources.Minify which takes for argument the resource object.",
    "usage": "{{ $css := resources.Get \"css/main.css\" }}\n{{ $style := $css | minify }}",
    "url": "https://gohugo.io/functions/resources/minify/"
  },
  {
    "namespace": "resources",
    "symbol": "resources.PostProcess",
    "aliases": [
      "postProcess",
      "postprocess"
    ],
    "memberSlug": "postprocess",
    "title": "resources.PostProcess",
    "summary": "The resources.PostProcess function delays resource transformation steps until the build is complete, primarily for tasks like removing unused CSS rules.",
    "usage": "npm i -D postcss postcss-cli autoprefixer @fullhuman/postcss-purgecss",
    "url": "https://gohugo.io/functions/resources/postprocess/"
  },
  {
    "namespace": "go-template",
    "symbol": "return",
    "memberSlug": "return",
    "title": "return",
    "summary": "The return statement is a non-standard extension to Go's text/template package . Used within partial templates, the return statement terminates template execution and returns the given value, if any.",
    "usage": "{{ if math.ModBool . 2 }}\n  <p>{{ . }} is even</p>\n{{ else }}\n  <p>{{ . }} is odd</p>\n{{ end }}",
    "url": "https://gohugo.io/functions/go-template/return/"
  },
  {
    "namespace": "safe",
    "symbol": "safe.CSS",
    "aliases": [
      "cSS",
      "css"
    ],
    "memberSlug": "css",
    "title": "safe.CSS",
    "summary": "Hugo uses Go's text/template and html/template packages.",
    "usage": "{{ $style := \"color: red;\" }}\n<p style=\"{{ $style }}\">foo</p>",
    "url": "https://gohugo.io/functions/safe/css/"
  },
  {
    "namespace": "safe",
    "symbol": "safe.HTML",
    "aliases": [
      "hTML",
      "html"
    ],
    "memberSlug": "html",
    "title": "safe.HTML",
    "summary": "Hugo uses Go's text/template and html/template packages.",
    "usage": "{{ $html := \"<em>emphasized</em>\" }}\n{{ $html }}",
    "url": "https://gohugo.io/functions/safe/html/"
  },
  {
    "namespace": "safe",
    "symbol": "safe.HTMLAttr",
    "aliases": [
      "hTMLAttr",
      "htmlattr"
    ],
    "memberSlug": "htmlattr",
    "title": "safe.HTMLAttr",
    "summary": "Hugo uses Go's text/template and html/template packages.",
    "usage": "{{ with .Date }}\n  {{ $humanDate := time.Format \"2 Jan 2006\" . }}\n  {{ $machineDate := time.Format \"2006-01-02T15:04:05-07:00\" . }}\n  <time datetime=\"{{ $machineDate }}\">{{ $humanDate }}</time>\n{{ end }}",
    "url": "https://gohugo.io/functions/safe/htmlattr/"
  },
  {
    "namespace": "safe",
    "symbol": "safe.JS",
    "aliases": [
      "jS",
      "js"
    ],
    "memberSlug": "js",
    "title": "safe.JS",
    "summary": "Hugo uses Go's text/template and html/template packages.",
    "usage": "{{ $js := \"x + y\" }}\n<script>const a = {{ $js }}</script>",
    "url": "https://gohugo.io/functions/safe/js/"
  },
  {
    "namespace": "safe",
    "symbol": "safe.JSStr",
    "aliases": [
      "jSStr",
      "jsstr"
    ],
    "memberSlug": "jsstr",
    "title": "safe.JSStr",
    "summary": "Hugo uses Go's text/template and html/template packages.",
    "usage": "{{ $title := \"Lilo & Stitch\" }}\n<script>\n  const a = \"Title: \" + {{ $title }};\n</script>",
    "url": "https://gohugo.io/functions/safe/jsstr/"
  },
  {
    "namespace": "safe",
    "symbol": "safe.URL",
    "aliases": [
      "uRL",
      "url"
    ],
    "memberSlug": "url",
    "title": "safe.URL",
    "summary": "Hugo uses Go's text/template and html/template packages.",
    "usage": "{{ $href := \"irc://irc.freenode.net/#golang\" }}\n<a href=\"{{ $href }}\">IRC</a>",
    "url": "https://gohugo.io/functions/safe/url/"
  },
  {
    "namespace": "global",
    "symbol": "site",
    "memberSlug": "site",
    "title": "site",
    "summary": "Use the site function to return the Site object regardless of current context.",
    "usage": "{{ site.Params.foo }}",
    "url": "https://gohugo.io/functions/global/site/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.Chomp",
    "aliases": [
      "chomp"
    ],
    "memberSlug": "chomp",
    "title": "strings.Chomp",
    "summary": "If the argument is of type template.HTML , returns template.HTML , else returns a string .",
    "usage": "{{ chomp \"foo\\n\" }} → foo\n{{ chomp \"foo\\n\\n\" }} → foo\n\n{{ chomp \"foo\\r\\n\" }} → foo\n{{ chomp \"foo\\r\\n\\r\\n\" }} → foo",
    "url": "https://gohugo.io/functions/strings/chomp/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.Contains",
    "aliases": [
      "contains"
    ],
    "memberSlug": "contains",
    "title": "strings.Contains",
    "summary": "The check is case sensitive:",
    "usage": "{{ strings.Contains \"Hugo\" \"go\" }} → true",
    "url": "https://gohugo.io/functions/strings/contains/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.ContainsAny",
    "aliases": [
      "containsAny",
      "containsany"
    ],
    "memberSlug": "containsany",
    "title": "strings.ContainsAny",
    "summary": "The check is case sensitive:",
    "usage": "{{ strings.ContainsAny \"Hugo\" \"gm\" }} → true",
    "url": "https://gohugo.io/functions/strings/containsany/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.ContainsNonSpace",
    "aliases": [
      "containsNonSpace",
      "containsnonspace"
    ],
    "memberSlug": "containsnonspace",
    "title": "strings.ContainsNonSpace",
    "summary": "Whitespace characters include \\t , \\n , \\v , \\f , \\r , and characters in the Unicode Space Separator category.",
    "usage": "{{ strings.ContainsNonSpace \"\\n\" }} → false\n{{ strings.ContainsNonSpace \" \" }} → false\n{{ strings.ContainsNonSpace \"\\n abc\" }} → true",
    "url": "https://gohugo.io/functions/strings/containsnonspace/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.Count",
    "aliases": [
      "count"
    ],
    "memberSlug": "count",
    "title": "strings.Count",
    "summary": "If SUBSTR is an empty string, this function returns 1 plus the number of Unicode code points in STRING .",
    "usage": "{{ \"aaabaab\" | strings.Count \"a\" }} → 5\n{{ \"aaabaab\" | strings.Count \"aa\" }} → 2\n{{ \"aaabaab\" | strings.Count \"aaa\" }} → 1\n{{ \"aaabaab\" | strings.Count \"\" }} → 8",
    "url": "https://gohugo.io/functions/strings/count/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.CountRunes",
    "aliases": [
      "countRunes",
      "countrunes"
    ],
    "memberSlug": "countrunes",
    "title": "strings.CountRunes",
    "summary": "In contrast with the strings.RuneCount function, which counts every rune in a string, strings.CountRunes excludes whitespace.",
    "usage": "{{ \"Hello, 世界\" | strings.CountRunes }} → 8",
    "url": "https://gohugo.io/functions/strings/countrunes/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.CountWords",
    "aliases": [
      "countWords",
      "countwords"
    ],
    "memberSlug": "countwords",
    "title": "strings.CountWords",
    "summary": "Returns the number of words in the given string.",
    "usage": "{{ \"Hugo is a static site generator.\" | countwords }} → 6",
    "url": "https://gohugo.io/functions/strings/countwords/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.Diff",
    "aliases": [
      "diff"
    ],
    "memberSlug": "diff",
    "title": "strings.Diff",
    "summary": "Use strings.Diff to compare two strings and render a highlighted diff:",
    "usage": "{{ $want := `\n<p>The product of 6 and 7 is 42.</p>\n<p>The product of 7 and 6 is 42.</p>\n`}}\n\n{{ $got := `\n<p>The product of 6 and 7 is 42.</p>\n<p>The product of 7 and 6 is 13.</p>\n`}}\n\n{{ $diff := strings.Diff \"want\" $want \"got\" $got }}\n{{ transform.Highlight $diff \"diff\" }}",
    "url": "https://gohugo.io/functions/strings/diff/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.FindRE",
    "aliases": [
      "findRE",
      "findre"
    ],
    "memberSlug": "findre",
    "title": "strings.FindRE",
    "summary": "By default, findRE finds all matches. You can limit the number of matches with an optional LIMIT argument.",
    "usage": "{{ findRE `(?s)<h2.*?>.*?</h2>` .Content }}",
    "url": "https://gohugo.io/functions/strings/findre/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.FindRESubmatch",
    "aliases": [
      "findRESubmatch",
      "findresubmatch"
    ],
    "memberSlug": "findresubmatch",
    "title": "strings.FindRESubmatch",
    "summary": "By default, findRESubmatch finds all matches. You can limit the number of matches with an optional LIMIT argument. A return value of nil indicates no match.",
    "usage": "{{ findRESubmatch `a(x*)b` \"-ab-\" }} → [[\"ab\" \"\"]]\n{{ findRESubmatch `a(x*)b` \"-axxb-\" }} → [[\"axxb\" \"xx\"]]\n{{ findRESubmatch `a(x*)b` \"-ab-axb-\" }} → [[\"ab\" \"\"] [\"axb\" \"x\"]]\n{{ findRESubmatch `a(x*)b` \"-axxb-ab-\" }} → [[\"axxb\" \"xx\"] [\"ab\" \"\"]]\n{{ findRESubmatch `a(x*)b` \"-axxb-ab-\" 1 }} → [[\"axxb\" \"xx\"]]",
    "url": "https://gohugo.io/functions/strings/findresubmatch/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.FirstUpper",
    "aliases": [
      "firstUpper",
      "firstupper"
    ],
    "memberSlug": "firstupper",
    "title": "strings.FirstUpper",
    "summary": "Returns the given string, capitalizing the first character.",
    "usage": "{{ strings.FirstUpper \"foo\" }} → Foo",
    "url": "https://gohugo.io/functions/strings/firstupper/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.HasPrefix",
    "aliases": [
      "hasPrefix",
      "hasprefix"
    ],
    "memberSlug": "hasprefix",
    "title": "strings.HasPrefix",
    "summary": "Reports whether the given string begins with the given prefix.",
    "usage": "{{ hasPrefix \"Hugo\" \"Hu\" }} → true",
    "url": "https://gohugo.io/functions/strings/hasprefix/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.HasSuffix",
    "aliases": [
      "hasSuffix",
      "hassuffix"
    ],
    "memberSlug": "hassuffix",
    "title": "strings.HasSuffix",
    "summary": "Reports whether the given string ends with the given suffix.",
    "usage": "{{ hasSuffix \"Hugo\" \"go\" }} → true",
    "url": "https://gohugo.io/functions/strings/hassuffix/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.Repeat",
    "aliases": [
      "repeat"
    ],
    "memberSlug": "repeat",
    "title": "strings.Repeat",
    "summary": "Returns a new string consisting of zero or more copies of another string.",
    "usage": "{{ strings.Repeat 3 \"yo\" }} → yoyoyo",
    "url": "https://gohugo.io/functions/strings/repeat/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.Replace",
    "aliases": [
      "replace"
    ],
    "memberSlug": "replace",
    "title": "strings.Replace",
    "summary": "Limit the number of replacements using the LIMIT argument:",
    "usage": "{{ $s := \"Batman and Robin\" }}\n{{ replace $s \"Robin\" \"Catwoman\" }} → Batman and Catwoman",
    "url": "https://gohugo.io/functions/strings/replace/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.ReplacePairs",
    "aliases": [
      "replacePairs",
      "replacepairs"
    ],
    "memberSlug": "replacepairs",
    "title": "strings.ReplacePairs",
    "summary": "Use the strings.ReplacePairs function to perform multiple replacements on a string in a single operation. This approach is faster than sequentially calling the strings.Replace function.",
    "usage": "{{ $s := \"aabbcc\" }}\n{{ $s = strings.Replace $s \"a\" \"x\" }}\n{{ $s = strings.Replace $s \"b\" \"y\" }}\n{{ $s = strings.Replace $s \"c\" \"z\" }}\n{{ $s }} → xxyyzz",
    "url": "https://gohugo.io/functions/strings/replacepairs/",
    "sinceVersion": "0.158.0"
  },
  {
    "namespace": "strings",
    "symbol": "strings.ReplaceRE",
    "aliases": [
      "replaceRE",
      "replacere"
    ],
    "memberSlug": "replacere",
    "title": "strings.ReplaceRE",
    "summary": "When specifying the regular expression, use a raw string literal (backticks) instead of an interpreted string literal (double quotes) to simplify the syntax. With an interpreted string literal you must escape backslashes.",
    "usage": "{{ $s := \"a-b--c---d\" }}\n{{ replaceRE `(-{2,})` \"-\" $s }} → a-b-c-d",
    "url": "https://gohugo.io/functions/strings/replacere/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.RuneCount",
    "aliases": [
      "runeCount",
      "runecount"
    ],
    "memberSlug": "runecount",
    "title": "strings.RuneCount",
    "summary": "In contrast with the strings.CountRunes function, which excludes whitespace, strings.RuneCount counts every rune in a string.",
    "usage": "{{ \"Hello, 世界\" | strings.RuneCount }} → 9",
    "url": "https://gohugo.io/functions/strings/runecount/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.SliceString",
    "aliases": [
      "sliceString",
      "slicestring"
    ],
    "memberSlug": "slicestring",
    "title": "strings.SliceString",
    "summary": "The START and END positions are zero-based, where 0 represents the first character of the string. If START is not specified, the substring will begin at position 0 . If END is not specified, the substring will end after the last character.",
    "usage": "{{ slicestr \"BatMan\" }} → BatMan\n{{ slicestr \"BatMan\" 3 }} → Man\n{{ slicestr \"BatMan\" 0 3 }} → Bat",
    "url": "https://gohugo.io/functions/strings/slicestring/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.Split",
    "aliases": [
      "split"
    ],
    "memberSlug": "split",
    "title": "strings.Split",
    "summary": "Examples:",
    "usage": "{{ split \"tag1,tag2,tag3\" \",\" }} → [\"tag1\", \"tag2\", \"tag3\"]\n{{ split \"abc\" \"\" }} → [\"a\", \"b\", \"c\"]",
    "url": "https://gohugo.io/functions/strings/split/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.Substr",
    "aliases": [
      "substr"
    ],
    "memberSlug": "substr",
    "title": "strings.Substr",
    "summary": "The start position is zero-based, where 0 represents the first character of the string. If START is not specified, the substring will begin at position 0 . Specify a negative START position to extract characters from the end of the string.",
    "usage": "{{ substr \"abcdef\" 0 }} → abcdef\n{{ substr \"abcdef\" 1 }} → bcdef\n\n{{ substr \"abcdef\" 0 1 }} → a\n{{ substr \"abcdef\" 1 1 }} → b\n\n{{ substr \"abcdef\" 0 -1 }} → abcde\n{{ substr \"abcdef\" 1 -1 }} → bcde\n\n{{ substr \"abcdef\" -1 }} → f\n{{ substr \"abcdef\" -2 }} → ef\n\n{{ substr \"abcdef\" -1 1 }} → f\n{{ substr \"abcdef\" -2 1 }} → e\n\n{{ substr \"abcdef\" -3 -1 }} → de\n{{ substr \"abcdef\" -3 -2 }} → d",
    "url": "https://gohugo.io/functions/strings/substr/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.Title",
    "aliases": [
      "title"
    ],
    "memberSlug": "title",
    "title": "strings.Title",
    "summary": "By default, Hugo follows the capitalization rules published in the Associated Press Stylebook . Change your project configuration if you would prefer to:",
    "usage": "{{ title \"table of contents (TOC)\" }} → Table of Contents (TOC)",
    "url": "https://gohugo.io/functions/strings/title/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.ToLower",
    "aliases": [
      "toLower",
      "tolower"
    ],
    "memberSlug": "tolower",
    "title": "strings.ToLower",
    "summary": "Returns the given string, converting all characters to lowercase.",
    "usage": "{{ lower \"BatMan\" }} → batman",
    "url": "https://gohugo.io/functions/strings/tolower/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.ToUpper",
    "aliases": [
      "toUpper",
      "toupper"
    ],
    "memberSlug": "toupper",
    "title": "strings.ToUpper",
    "summary": "Returns the given string, converting all characters to uppercase.",
    "usage": "{{ upper \"BatMan\" }} → BATMAN",
    "url": "https://gohugo.io/functions/strings/toupper/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.Trim",
    "aliases": [
      "trim"
    ],
    "memberSlug": "trim",
    "title": "strings.Trim",
    "summary": "Returns the given string, removing leading and trailing characters specified in the cutset.",
    "usage": "{{ trim \"++foo--\" \"+-\" }} → foo",
    "url": "https://gohugo.io/functions/strings/trim/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.TrimLeft",
    "aliases": [
      "trimLeft",
      "trimleft"
    ],
    "memberSlug": "trimleft",
    "title": "strings.TrimLeft",
    "summary": "The strings.TrimLeft function converts the arguments to strings if possible:",
    "usage": "{{ strings.TrimLeft \"a\" \"abba\" }} → bba",
    "url": "https://gohugo.io/functions/strings/trimleft/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.TrimPrefix",
    "aliases": [
      "trimPrefix",
      "trimprefix"
    ],
    "memberSlug": "trimprefix",
    "title": "strings.TrimPrefix",
    "summary": "Returns the given string, removing the prefix from the beginning of the string.",
    "usage": "{{ strings.TrimPrefix \"a\" \"aabbaa\" }} → abbaa\n{{ strings.TrimPrefix \"aa\" \"aabbaa\" }} → bbaa\n{{ strings.TrimPrefix \"aaa\" \"aabbaa\" }} → aabbaa",
    "url": "https://gohugo.io/functions/strings/trimprefix/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.TrimRight",
    "aliases": [
      "trimRight",
      "trimright"
    ],
    "memberSlug": "trimright",
    "title": "strings.TrimRight",
    "summary": "The strings.TrimRight function converts the arguments to strings if possible:",
    "usage": "{{ strings.TrimRight \"a\" \"abba\" }} → abb",
    "url": "https://gohugo.io/functions/strings/trimright/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.TrimSpace",
    "aliases": [
      "trimSpace",
      "trimspace"
    ],
    "memberSlug": "trimspace",
    "title": "strings.TrimSpace",
    "summary": "Whitespace characters include \\t , \\n , \\v , \\f , \\r , and characters in the Unicode Space Separator category.",
    "usage": "{{ strings.TrimSpace \"\\n\\r\\t   foo   \\n\\r\\t\" }} → foo",
    "url": "https://gohugo.io/functions/strings/trimspace/",
    "sinceVersion": "0.136.3"
  },
  {
    "namespace": "strings",
    "symbol": "strings.TrimSuffix",
    "aliases": [
      "trimSuffix",
      "trimsuffix"
    ],
    "memberSlug": "trimsuffix",
    "title": "strings.TrimSuffix",
    "summary": "Returns the given string, removing the suffix from the end of the string.",
    "usage": "{{ strings.TrimSuffix \"a\" \"aabbaa\" }} → aabba\n{{ strings.TrimSuffix \"aa\" \"aabbaa\" }} → aabb\n{{ strings.TrimSuffix \"aaa\" \"aabbaa\" }} → aabbaa",
    "url": "https://gohugo.io/functions/strings/trimsuffix/"
  },
  {
    "namespace": "strings",
    "symbol": "strings.Truncate",
    "aliases": [
      "truncate"
    ],
    "memberSlug": "truncate",
    "title": "strings.Truncate",
    "summary": "Since Go templates are HTML-aware, truncate will intelligently handle normal strings vs HTML strings:",
    "usage": "{{ \"<em>Keep my HTML</em>\" | safeHTML | truncate 10 }} → <em>Keep my …</em>",
    "url": "https://gohugo.io/functions/strings/truncate/"
  },
  {
    "namespace": "go-template",
    "symbol": "template",
    "memberSlug": "template",
    "title": "template",
    "summary": "Use the template function to execute a defined template:",
    "usage": "{{ template \"foo\" (dict \"answer\" 42) }}\n\n{{ define \"foo\" }}\n  {{ printf \"The answer is %v.\" .answer }}\n{{ end }}",
    "url": "https://gohugo.io/functions/go-template/template/"
  },
  {
    "namespace": "templates",
    "symbol": "templates.Current",
    "aliases": [
      "current"
    ],
    "memberSlug": "current",
    "title": "templates.Current",
    "summary": "This function is experimental and subject to change.",
    "usage": "params:\n  debug: true",
    "url": "https://gohugo.io/functions/templates/current/",
    "sinceVersion": "0.146.0"
  },
  {
    "namespace": "templates",
    "symbol": "templates.Defer",
    "aliases": [
      "defer"
    ],
    "memberSlug": "defer",
    "title": "templates.Defer",
    "summary": "This feature should only be used in the main template, typically layouts/baseof.html . Using it in shortcode , partial , or render hook templates may lead to unpredictable results. For further details, please refer to this issue .",
    "usage": "<head>\n  ...\n  {{ with (templates.Defer (dict \"key\" \"global\")) }}\n    {{ partial \"css.html\" . }}\n  {{ end }}\n  ...\n</head>",
    "url": "https://gohugo.io/functions/templates/defer/"
  },
  {
    "namespace": "templates",
    "symbol": "templates.Exists",
    "aliases": [
      "exists"
    ],
    "memberSlug": "exists",
    "title": "templates.Exists",
    "summary": "A template file is any file within the layouts directory of either the project or any of its theme components.",
    "usage": "{{ $partialPath := printf \"headers/%s.html\" .Type }}\n{{ if templates.Exists ( printf \"_partials/%s\" $partialPath ) }}\n  {{ partial $partialPath . }}\n{{ else }}\n  {{ partial \"headers/default.html\" . }}\n{{ end }}",
    "url": "https://gohugo.io/functions/templates/exists/"
  },
  {
    "namespace": "templates",
    "symbol": "templates.Inner",
    "aliases": [
      "inner"
    ],
    "memberSlug": "inner",
    "title": "templates.Inner",
    "summary": "The templates.Inner function defines the injection point for code nested within a block style partial call. This is the core mechanism used to create a partial decorator .",
    "usage": "{{ with partial \"components/card.html\" . }}\n  <p>This content is passed to the partial.</p>\n{{ end }}",
    "url": "https://gohugo.io/functions/templates/inner/",
    "sinceVersion": "0.154.0"
  },
  {
    "namespace": "time",
    "symbol": "time.AsTime",
    "aliases": [
      "asTime",
      "astime"
    ],
    "memberSlug": "astime",
    "title": "time.AsTime",
    "summary": "Hugo provides functions and methods to format, localize, parse, compare, and manipulate date/time values. Before you can do any of these with string representations of date/time values, you must first convert them to time.Time values using the time.AsTime function.",
    "usage": "{{ $t := \"2023-10-15T13:18:50-07:00\" }}\n{{ time.AsTime $t }} → 2023-10-15 13:18:50 -0700 PDT (time.Time)",
    "url": "https://gohugo.io/functions/time/astime/"
  },
  {
    "namespace": "time",
    "symbol": "time.Duration",
    "aliases": [
      "duration"
    ],
    "memberSlug": "duration",
    "title": "time.Duration",
    "summary": "The time.Duration function returns a time.Duration value that you can use with any of the Duration methods .",
    "usage": "{{ $duration := time.Duration \"hour\" 24 }}\n{{ printf \"There are %.0f seconds in one day.\" $duration.Seconds }}",
    "url": "https://gohugo.io/functions/time/duration/"
  },
  {
    "namespace": "time",
    "symbol": "time.Format",
    "aliases": [
      "format"
    ],
    "memberSlug": "format",
    "title": "time.Format",
    "summary": "Use the time.Format function with time.Time values:",
    "usage": "{{ $t := time.AsTime \"2023-10-15T13:18:50-07:00\" }}\n{{ time.Format \"2 Jan 2006\" $t }} → 15 Oct 2023",
    "url": "https://gohugo.io/functions/time/format/"
  },
  {
    "namespace": "time",
    "symbol": "time.In",
    "aliases": [
      "in"
    ],
    "memberSlug": "in",
    "title": "time.In",
    "summary": "The time.In function returns the given date/time as represented in the specified IANA time zone.",
    "usage": "{{ $layout := \"2006-01-02T15:04:05-07:00\" }}\n{{ $t := time.AsTime \"2025-03-31T14:45:00-00:00\" }}\n\n{{ $t | time.In \"America/Denver\" | time.Format $layout }}     → 2025-03-31T08:45:00-06:00\n{{ $t | time.In \"Australia/Adelaide\" | time.Format $layout }} → 2025-04-01T01:15:00+10:30\n{{ $t | time.In \"Europe/Oslo\" | time.Format $layout }}        → 2025-03-31T16:45:00+02:00",
    "url": "https://gohugo.io/functions/time/in/",
    "sinceVersion": "0.146.0"
  },
  {
    "namespace": "time",
    "symbol": "time.Now",
    "aliases": [
      "now"
    ],
    "memberSlug": "now",
    "title": "time.Now",
    "summary": "For example, when building a site on October 15, 2023 in the America/Los_Angeles time zone:",
    "usage": "{{ time.Now }}",
    "url": "https://gohugo.io/functions/time/now/"
  },
  {
    "namespace": "time",
    "symbol": "time.ParseDuration",
    "aliases": [
      "parseDuration",
      "parseduration"
    ],
    "memberSlug": "parseduration",
    "title": "time.ParseDuration",
    "summary": "The time.ParseDuration function returns a time.Duration value that you can use with any of the Duration methods .",
    "usage": "{{ $duration := time.ParseDuration \"24h\" }}\n{{ printf \"There are %.0f seconds in one day.\" $duration.Seconds }}",
    "url": "https://gohugo.io/functions/time/parseduration/"
  },
  {
    "namespace": "transform",
    "symbol": "transform.CanHighlight",
    "aliases": [
      "canHighlight",
      "canhighlight"
    ],
    "memberSlug": "canhighlight",
    "title": "transform.CanHighlight",
    "summary": "Reports whether the given code language is supported by the Chroma highlighter.",
    "usage": "{{ transform.CanHighlight \"go\" }} → true\n{{ transform.CanHighlight \"klingon\" }} → false",
    "url": "https://gohugo.io/functions/transform/canhighlight/"
  },
  {
    "namespace": "transform",
    "symbol": "transform.Emojify",
    "aliases": [
      "emojify"
    ],
    "memberSlug": "emojify",
    "title": "transform.Emojify",
    "summary": "emojify runs a passed string through the Emoji emoticons processor.",
    "usage": "I :heart: Hugo!",
    "url": "https://gohugo.io/functions/transform/emojify/"
  },
  {
    "namespace": "transform",
    "symbol": "transform.Highlight",
    "aliases": [
      "highlight"
    ],
    "memberSlug": "highlight",
    "title": "transform.Highlight",
    "summary": "The highlight function uses the Chroma syntax highlighter, supporting over 200 languages with more than 40 highlighting styles .",
    "usage": "{{ $input := `fmt.Println(\"Hello World!\")` }}\n{{ transform.Highlight $input \"go\" }}\n\n{{ $input := `console.log('Hello World!');` }}\n{{ $lang := \"js\" }}\n{{ transform.Highlight $input $lang \"lineNos=table, style=api\" }}\n\n{{ $input := `echo \"Hello World!\"` }}\n{{ $lang := \"bash\" }}\n{{ $opts := dict \"lineNos\" \"table\" \"style\" \"dracula\" }}\n{{ transform.Highlight $input $lang $opts }}",
    "url": "https://gohugo.io/functions/transform/highlight/",
    "sinceVersion": "0.140.2"
  },
  {
    "namespace": "transform",
    "symbol": "transform.HighlightCodeBlock",
    "aliases": [
      "highlightCodeBlock",
      "highlightcodeblock"
    ],
    "memberSlug": "highlightcodeblock",
    "title": "transform.HighlightCodeBlock",
    "summary": "This function is only useful within a code block render hook.",
    "usage": "{{ $result := transform.HighlightCodeBlock . }}\n{{ $result.Wrapped }}",
    "url": "https://gohugo.io/functions/transform/highlightcodeblock/"
  },
  {
    "namespace": "transform",
    "symbol": "transform.HTMLEscape",
    "aliases": [
      "hTMLEscape",
      "htmlescape"
    ],
    "memberSlug": "htmlescape",
    "title": "transform.HTMLEscape",
    "summary": "The transform.HTMLEscape function escapes five special characters by replacing them with HTML entities :",
    "usage": "{{ htmlEscape \"Lilo & Stitch\" }} → Lilo &amp; Stitch\n{{ htmlEscape \"7 > 6\" }} → 7 &gt; 6",
    "url": "https://gohugo.io/functions/transform/htmlescape/"
  },
  {
    "namespace": "transform",
    "symbol": "transform.HTMLToMarkdown",
    "aliases": [
      "hTMLToMarkdown",
      "htmltomarkdown"
    ],
    "memberSlug": "htmltomarkdown",
    "title": "transform.HTMLToMarkdown",
    "summary": "This function is experimental and its API may change in the future.",
    "usage": "{{ .Content | transform.HTMLToMarkdown | safeHTML }}",
    "url": "https://gohugo.io/functions/transform/htmltomarkdown/",
    "sinceVersion": "0.151.0"
  },
  {
    "namespace": "transform",
    "symbol": "transform.HTMLUnescape",
    "aliases": [
      "hTMLUnescape",
      "htmlunescape"
    ],
    "memberSlug": "htmlunescape",
    "title": "transform.HTMLUnescape",
    "summary": "The transform.HTMLUnescape function replaces HTML entities with their corresponding characters.",
    "usage": "{{ htmlUnescape \"Lilo &amp; Stitch\" }} → Lilo & Stitch\n{{ htmlUnescape \"7 &gt; 6\" }} → 7 > 6",
    "url": "https://gohugo.io/functions/transform/htmlunescape/"
  },
  {
    "namespace": "transform",
    "symbol": "transform.Markdownify",
    "aliases": [
      "markdownify"
    ],
    "memberSlug": "markdownify",
    "title": "transform.Markdownify",
    "summary": "If the resulting HTML is a single paragraph, Hugo removes the wrapping p tags to produce inline HTML as required per the example above.",
    "usage": "<h2>{{ .Title | markdownify }}</h2>",
    "url": "https://gohugo.io/functions/transform/markdownify/"
  },
  {
    "namespace": "transform",
    "symbol": "transform.Plainify",
    "aliases": [
      "plainify"
    ],
    "memberSlug": "plainify",
    "title": "transform.Plainify",
    "summary": "Returns a string with all HTML tags removed.",
    "usage": "{{ \"<b>BatMan</b>\" | plainify }} → BatMan",
    "url": "https://gohugo.io/functions/transform/plainify/"
  },
  {
    "namespace": "transform",
    "symbol": "transform.PortableText",
    "aliases": [
      "portableText",
      "portabletext"
    ],
    "memberSlug": "portabletext",
    "title": "transform.PortableText",
    "summary": "Portable Text is a JSON structure that represent rich text content in the Sanity CMS. In Hugo, this function is typically used in a Content Adapter that creates pages from Sanity data.",
    "usage": "{{ $projectID := \"mysanityprojectid\" }}\n{{ $useCached := true }}\n{{ $api := \"api\" }}\n{{ if $useCached }}\n  {{/* See https://www.sanity.io/docs/api-cdn */}}\n  {{ $api = \"apicdn\" }}\n{{ end }}\n{{ $url := printf \"https://%s.%s.sanity.io/v2021-06-07/data/query/production\"  $projectID $api }}\n\n{{/* prettier-ignore-start */ -}}\n{{ $q :=  `*[_type == 'post']{\n  title, publishedAt, summary, slug, body[]{\n    ...,\n    _type == \"image\" => {\n      ...,\n      asset->{\n        _id,\n        path,\n        url,\n        altText,\n        title,\n        description,\n        metadata {\n          dimensions {\n            aspectRatio,\n            width,\n            height\n          }\n        }\n      }\n    }\n  },\n  }`\n}}\n{{/* prettier-ignore-end */ -}}\n{{ $body := dict \"query\" $q | jsonify }}\n{{ $opts := dict \"method\" \"post\" \"body\" $body }}\n{{ $r := resources.GetRemote $url $opts }}\n{{ $m := $r | transform.Unmarshal }}\n{{ $result := $m.result }}\n{{ range $result }}\n  {{ if not .slug }}\n    {{ continue }}\n  {{ end }}\n  {{ $markdown := transform.PortableText .body }}\n  {{ $content := dict\n    \"mediaType\" \"text/markdown\"\n    \"value\" $markdown\n  }}\n  {{ $params := dict\n    \"portabletext\" (.body | jsonify (dict \"indent\" \" \"))\n  }}\n  {{ $page := dict\n    \"content\" $content\n    \"kind\" \"page\"\n    \"path\" .slug.current\n    \"title\" .title\n    \"date\" (.publishedAt | time )\n    \"summary\" .summary\n    \"params\" $params\n  }}\n  {{ $.AddPage $page }}\n{{ end }}",
    "url": "https://gohugo.io/functions/transform/portabletext/",
    "sinceVersion": "0.145.0"
  },
  {
    "namespace": "transform",
    "symbol": "transform.Remarshal",
    "aliases": [
      "remarshal"
    ],
    "memberSlug": "remarshal",
    "title": "transform.Remarshal",
    "summary": "The format must be one of json , toml , yaml , or xml . If the input is a string of serialized data, it must be valid JSON, TOML, YAML, or XML.",
    "usage": "{{ $s := `\n  baseURL = 'https://example.org/'\n  locale = 'en-US'\n  title = 'ABC Widgets'\n`}}\n<pre>{{ transform.Remarshal \"json\" $s }}</pre>",
    "url": "https://gohugo.io/functions/transform/remarshal/"
  },
  {
    "namespace": "transform",
    "symbol": "transform.ToMath",
    "aliases": [
      "toMath",
      "tomath"
    ],
    "memberSlug": "tomath",
    "title": "transform.ToMath",
    "summary": "Hugo uses an embedded instance of the KaTeX display engine to render mathematical markup to HTML. You do not need to install the KaTeX display engine.",
    "usage": "{{ transform.ToMath \"c = \\\\pm\\\\sqrt{a^2 + b^2}\" }}",
    "url": "https://gohugo.io/functions/transform/tomath/",
    "sinceVersion": "0.132.0"
  },
  {
    "namespace": "transform",
    "symbol": "transform.Unmarshal",
    "aliases": [
      "unmarshal"
    ],
    "memberSlug": "unmarshal",
    "title": "transform.Unmarshal",
    "summary": "The input can be a string or a resource .",
    "usage": "{{ $string := `\ntitle: Les Misérables\nauthor: Victor Hugo\n`}}\n\n{{ $book := transform.Unmarshal $string }}\n{{ $book.title }} → Les Misérables\n{{ $book.author }} → Victor Hugo",
    "url": "https://gohugo.io/functions/transform/unmarshal/",
    "sinceVersion": "0.149.0"
  },
  {
    "namespace": "transform",
    "symbol": "transform.XMLEscape",
    "aliases": [
      "xMLEscape",
      "xmlescape"
    ],
    "memberSlug": "xmlescape",
    "title": "transform.XMLEscape",
    "summary": "The transform.XMLEscape function removes disallowed characters as defined in the XML specification, then escapes the result by replacing the following characters with HTML entities :",
    "usage": "{{ transform.XMLEscape \"<p>abc</p>\" }} → &lt;p&gt;abc&lt;/p&gt;",
    "url": "https://gohugo.io/functions/transform/xmlescape/"
  },
  {
    "namespace": "go-template",
    "symbol": "try",
    "memberSlug": "try",
    "title": "try",
    "summary": "The try statement is a non-standard extension to Go's text/template package. It introduces a mechanism for handling errors within templates, mimicking the try-catch constructs found in other programming languages.",
    "usage": "{{ $x := 1 }}\n{{ $y := 0 }}\n{{ $result := div $x $y }}\n{{ printf \"%v divided by %v equals %v\" $x $y .Value }}",
    "url": "https://gohugo.io/functions/go-template/try/",
    "sinceVersion": "0.141.0"
  },
  {
    "namespace": "go-template",
    "symbol": "urlquery",
    "memberSlug": "urlquery",
    "title": "urlquery",
    "summary": "This template code:",
    "usage": "{{ $u := urlquery \"https://\" \"example.com\" | safeURL }}\n<a href=\"https://example.org?url={{ $u }}\">Link</a>",
    "url": "https://gohugo.io/functions/go-template/urlquery/"
  },
  {
    "namespace": "urls",
    "symbol": "urls.AbsLangURL",
    "aliases": [
      "absLangURL",
      "abslangurl"
    ],
    "memberSlug": "abslangurl",
    "title": "urls.AbsLangURL",
    "summary": "Use this function with both monolingual and multilingual configurations. The URL returned by this function depends on:",
    "usage": "defaultContentLanguage: en\ndefaultContentLanguageInSubdir: true\nlanguages:\n  en:\n    weight: 1\n  es:\n    weight: 2",
    "url": "https://gohugo.io/functions/urls/abslangurl/"
  },
  {
    "namespace": "urls",
    "symbol": "urls.AbsURL",
    "aliases": [
      "absURL",
      "absurl"
    ],
    "memberSlug": "absurl",
    "title": "urls.AbsURL",
    "summary": "With multilingual configurations, use the urls.AbsLangURL function instead. The URL returned by this function depends on:",
    "usage": "{{ absURL \"\" }}          → https://example.org/\n{{ absURL \"articles\" }}  → https://example.org/articles\n{{ absURL \"style.css\" }} → https://example.org/style.css",
    "url": "https://gohugo.io/functions/urls/absurl/"
  },
  {
    "namespace": "urls",
    "symbol": "urls.Anchorize",
    "aliases": [
      "anchorize"
    ],
    "memberSlug": "anchorize",
    "title": "urls.Anchorize",
    "summary": "The anchorize and urlize functions are similar:",
    "usage": "{{ $s := \"A B C\" }}\n{{ $s | anchorize }} → a-b-c\n{{ $s | urlize }} → a-b-c\n\n{{ $s := \"a b   c\" }}\n{{ $s | anchorize }} → a-b---c\n{{ $s | urlize }} → a-b-c\n\n{{ $s := \"< a, b, & c >\" }}\n{{ $s | anchorize }} → -a-b--c-\n{{ $s | urlize }} → a-b-c\n\n{{ $s := \"main.go\" }}\n{{ $s | anchorize }} → maingo\n{{ $s | urlize }} → main.go\n\n{{ $s := \"Hugö\" }}\n{{ $s | anchorize }} → hugö\n{{ $s | urlize }} → hug%C3%B6",
    "url": "https://gohugo.io/functions/urls/anchorize/"
  },
  {
    "namespace": "urls",
    "symbol": "urls.JoinPath",
    "aliases": [
      "joinPath",
      "joinpath"
    ],
    "memberSlug": "joinpath",
    "title": "urls.JoinPath",
    "summary": "Unlike the path.Join function, urls.JoinPath retains consecutive leading slashes.",
    "usage": "{{ urls.JoinPath }} → \"\" (empty string)\n{{ urls.JoinPath \"\" }} → /\n{{ urls.JoinPath \"a\" }} → a\n{{ urls.JoinPath \"a\" \"b\" }} → a/b\n{{ urls.JoinPath \"/a\" \"b\" }} → /a/b\n{{ urls.JoinPath \"https://example.org\" \"b\" }} → https://example.org/b\n\n{{ urls.JoinPath (slice \"a\" \"b\") }} → a/b",
    "url": "https://gohugo.io/functions/urls/joinpath/"
  },
  {
    "namespace": "urls",
    "symbol": "urls.Parse",
    "aliases": [
      "parse"
    ],
    "memberSlug": "parse",
    "title": "urls.Parse",
    "summary": "The urls.Parse function parses a URL into a URL structure . The URL may be relative (a path, without a host) or absolute (starting with a scheme ). Hugo throws an error when parsing an invalid URL.",
    "usage": "{{ $url := \"https://example.org:123/foo?a=6&b=7#bar\" }}\n{{ $u := urls.Parse $url }}\n\n{{ $u.String }} → https://example.org:123/foo?a=6&b=7#bar\n{{ $u.IsAbs }} → true\n{{ $u.Scheme }} → https\n{{ $u.Host }} → example.org:123\n{{ $u.Hostname }} → example.org\n{{ $u.RequestURI }} → /foo?a=6&b=7\n{{ $u.Path }} → /foo\n{{ $u.RawQuery }} → a=6&b=7\n{{ $u.Query }} → map[a:[6] b:[7]]\n{{ $u.Query.a }} → [6]\n{{ $u.Query.Get \"a\" }} → 6\n{{ $u.Query.Has \"b\" }} → true\n{{ $u.Fragment }} → bar",
    "url": "https://gohugo.io/functions/urls/parse/"
  },
  {
    "namespace": "urls",
    "symbol": "urls.PathEscape",
    "aliases": [
      "pathEscape",
      "pathescape"
    ],
    "memberSlug": "pathescape",
    "title": "urls.PathEscape",
    "summary": "The urls.PathEscape function does the inverse transformation of urls.PathUnescape .",
    "usage": "{{ urls.PathEscape \"my café\" }} → my%20caf%C3%A9",
    "url": "https://gohugo.io/functions/urls/pathescape/",
    "sinceVersion": "0.153.0"
  },
  {
    "namespace": "urls",
    "symbol": "urls.PathUnescape",
    "aliases": [
      "pathUnescape",
      "pathunescape"
    ],
    "memberSlug": "pathunescape",
    "title": "urls.PathUnescape",
    "summary": "The urls.PathUnescape function does the inverse transformation of urls.PathEscape .",
    "usage": "{{ urls.PathUnescape \"A%2Fb%2Fc%3Fd=%C3%A9&f=g+h\" }} → A/b/c?d=é&f=g+h",
    "url": "https://gohugo.io/functions/urls/pathunescape/",
    "sinceVersion": "0.153.0"
  },
  {
    "namespace": "urls",
    "symbol": "urls.Ref",
    "aliases": [
      "ref"
    ],
    "memberSlug": "ref",
    "title": "urls.Ref",
    "summary": "The ref function takes two arguments:",
    "usage": "{{ ref . \"/books/book-1\" }} → https://example.org/en/books/book-1/\n\n{{ $opts := dict \"path\" \"/books/book-1\" }}\n{{ ref . $opts }} → https://example.org/en/books/book-1/\n\n{{ $opts := dict \"path\" \"/books/book-1\" \"lang\" \"de\" }}\n{{ ref . $opts }} → https://example.org/de/books/book-1/\n\n{{ $opts := dict \"path\" \"/books/book-1\" \"lang\" \"de\" \"outputFormat\" \"json\" }}\n{{ ref . $opts }} → https://example.org/de/books/book-1/index.json",
    "url": "https://gohugo.io/functions/urls/ref/"
  },
  {
    "namespace": "urls",
    "symbol": "urls.RelLangURL",
    "aliases": [
      "relLangURL",
      "rellangurl"
    ],
    "memberSlug": "rellangurl",
    "title": "urls.RelLangURL",
    "summary": "Use this function with both monolingual and multilingual configurations. The URL returned by this function depends on:",
    "usage": "defaultContentLanguage: en\ndefaultContentLanguageInSubdir: true\nlanguages:\n  en:\n    weight: 1\n  es:\n    weight: 2",
    "url": "https://gohugo.io/functions/urls/rellangurl/"
  },
  {
    "namespace": "urls",
    "symbol": "urls.RelRef",
    "aliases": [
      "relRef",
      "relref"
    ],
    "memberSlug": "relref",
    "title": "urls.RelRef",
    "summary": "The relref function takes two arguments:",
    "usage": "{{ relref . \"/books/book-1\" }} → /en/books/book-1/\n\n{{ $opts := dict \"path\" \"/books/book-1\" }}\n{{ relref . $opts }} → /en/books/book-1/\n\n{{ $opts := dict \"path\" \"/books/book-1\" \"lang\" \"de\" }}\n{{ relref . $opts }} → /de/books/book-1/\n\n{{ $opts := dict \"path\" \"/books/book-1\" \"lang\" \"de\" \"outputFormat\" \"json\" }}\n{{ relref . $opts }} → /de/books/book-1/index.json",
    "url": "https://gohugo.io/functions/urls/relref/"
  },
  {
    "namespace": "urls",
    "symbol": "urls.RelURL",
    "aliases": [
      "relURL",
      "relurl"
    ],
    "memberSlug": "relurl",
    "title": "urls.RelURL",
    "summary": "With multilingual configurations, use the urls.RelLangURL function instead. The URL returned by this function depends on:",
    "usage": "{{ relURL \"\" }}                         → /\n{{ relURL \"articles\" }}                 → /articles\n{{ relURL \"style.css\" }}                → /style.css\n{{ relURL \"https://example.org\" }}      → https://example.org\n{{ relURL \"https://example.org/\" }}     → /\n{{ relURL \"https://www.example.org\" }}  → https://www.example.org\n{{ relURL \"https://www.example.org/\" }} → https://www.example.org/",
    "url": "https://gohugo.io/functions/urls/relurl/"
  },
  {
    "namespace": "urls",
    "symbol": "urls.URLize",
    "aliases": [
      "uRLize",
      "urlize"
    ],
    "memberSlug": "urlize",
    "title": "urls.URLize",
    "summary": "The anchorize and urlize functions are similar:",
    "usage": "{{ $s := \"A B C\" }}\n{{ $s | anchorize }} → a-b-c\n{{ $s | urlize }} → a-b-c\n\n{{ $s := \"a b   c\" }}\n{{ $s | anchorize }} → a-b---c\n{{ $s | urlize }} → a-b-c\n\n{{ $s := \"< a, b, & c >\" }}\n{{ $s | anchorize }} → -a-b--c-\n{{ $s | urlize }} → a-b-c\n\n{{ $s := \"main.go\" }}\n{{ $s | anchorize }} → maingo\n{{ $s | urlize }} → main.go\n\n{{ $s := \"Hugö\" }}\n{{ $s | anchorize }} → hugö\n{{ $s | urlize }} → hug%C3%B6",
    "url": "https://gohugo.io/functions/urls/urlize/"
  },
  {
    "namespace": "go-template",
    "symbol": "with",
    "memberSlug": "with",
    "title": "with",
    "summary": "The falsy values are false , 0 , any nil pointer or interface value, any array, slice, map, or string of length zero, and zero time.Time values.",
    "usage": "{{ $var := \"foo\" }}\n{{ with $var }}\n  {{ . }} → foo\n{{ end }}",
    "url": "https://gohugo.io/functions/go-template/with/"
  }
];
