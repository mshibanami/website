# website

[![wercker status](https://app.wercker.com/status/3d6ca0281e4d1b65d8069109198245ce/m "wercker status")](https://app.wercker.com/project/bykey/3d6ca0281e4d1b65d8069109198245ce)

## Site map

- index.html (just redirect to `[language code]/index.html`)
- [language code]/
    - index.html
    - blog/index.html
    - blog/[article title]/index.html
    - ...

## How to build

```bash
./build
```

## How to edit articles with live preview

1. Install [LiveReload](http://livereload.com/)
2. Run this command:
    ```bash
    bundle install
    bundle exec nanoc live
    ```
3. Access <http://localhost:3000/>
4. Enable LiveReload of your browser
