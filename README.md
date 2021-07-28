# website

[![build status](https://travis-ci.org/mshibanami/website.svg)](https://travis-ci.org/mshibanami/website)
[![codecov](https://codecov.io/gh/mshibanami/website/branch/master/graph/badge.svg)](https://codecov.io/gh/mshibanami/website)

## Site map

- `assets/`
    - `img/`
        - `quiver-image-url/` (Useful when I import memo from Quiver)
    - `js/`
- index.html (Just redirect to `<language code>/index.html`)
- `<language code>/`
    - `index.html`
    - `blog/index.html`
    - `blog/<article title>/index.html`
    - ...

## How to

### Build

```bash
./build.sh
```

### Test

```bash
rspec
nanoc check --all
```

### Edit articles with the live preview

1. Install [LiveReload](http://livereload.com/) to your browser
2. Run this command:

    ```bash
    bundle install
    bundle exec nanoc live # add --host=0.0,0.0 if you want to preview the site from another devices on the LAN
    ```

3. Access <http://localhost:3000/>
4. Enable LiveReload of your browser

### Link libraries

Create a symbolick link of your library's folder in `content/assets/lib`.

### About slides

Documents for presentation have `presentation` like this:

```text
---
presentation: revealjs
---
```

These documents are rendered for presentation.

Here are the supported presentation frameworks at a moment:

- AsciiDoc
    - `revealjs` : [Reveal.js](https://github.com/hakimel/reveal.js) via `asciidoctor-revealjs`
    - `bespoke` : [Bespoke.js](https://github.com/bespokejs/bespoke) via `asciidoctor-bespoke`
- MarkDown
    - `revealjs` : Reveal.js (embedded)
