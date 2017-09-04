# website

[![build status](https://travis-ci.org/mshibanami/website.svg)](https://travis-ci.org/mshibanami/website)
[![codecov](https://codecov.io/gh/mshibanami/website/branch/master/graph/badge.svg)](https://codecov.io/gh/mshibanami/website)

## Site map

- assets/
    - img/
        - quiver-image-url/ (Useful when I import memo from Quiver)
    - js/
- index.html (Just redirect to `[language code]/index.html`)
- [language code]/
    - index.html
    - blog/index.html
    - blog/[article title]/index.html
    - ...

## How to...

### build

```bash
./build
```

### test

```bash
rspec
nanoc check --all
```

### edit articles with live preview

1. Install [LiveReload](http://livereload.com/)
2. Run this command:
    ```bash
    bundle install
    bundle exec nanoc live
    ```
3. Access <http://localhost:3000/>
4. Enable LiveReload of your browser
