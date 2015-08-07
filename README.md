# Hugo Boilerplate
My Hugo Template.

⚠️ i18n feature doesn't support the country code.
For example, you could not specify British English and American English.

### Setup
``` sh
npm install
bower install
bundle install
```

### Debug
``` sh
hugo server -w
compass watch
```

### Build

#### Debug Build
``` sh
bundle exec compass compile
hugo
```

#### Production Build
``` sh
rm -rf public/
bundle exec compass compile -e production --force
hugo
./compress
```


## References
* [HTML5 Boilerplate](https://html5boilerplate.com/)