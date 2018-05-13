---
title: 実行中のシェル名の確認方法を考える
created_at: 2016-02-02T00:00:00-09:00
kind: article
language: ja
---

## まえがき

去年の12月、Facebookの[Infer](https://github.com/facebook/infer)がHomebrewに追加されたことを知った。

<https://github.com/Homebrew/homebrew/commits/master/Library/Formula/infer.rb>

InferはOCamlで書かれているが、そのバージョン指定が厳しくてHomebrewになかなか出せないとかいう話があった。

Facebookは最初、ビルド済みのバイナリを公開してくれていて、Homebrew-caskの方ではそれが使われていた。
Homebrewでも同じくバイナリを使ったサポートをしようとしてたけど、バイナリがいつの間にか消されててできなくなっていた。

<https://github.com/Homebrew/homebrew/pull/40597>

その時自分は、じゃあ自分でビルドしようと思い、OCamlを入れてみた。

opamの起動スクリプトは各シェル用のものがあった。
何もしてないとインストール時にその読み込み設定がログインシェルの.*shrcに書かれる。
自分の場合は.zshrcに以下が書かれた。

```sh
. /Users/ユーザー名/.opam/opam-init/init.zsh > /dev/null 2> /dev/null || true
```

また、`~/.opam/opam-init/`には他にも

- init.fish
- init.sh
- init.zsh
- init.csh

があった。(bashはない。)
各シェルの.*shrcにこれらを書いてもいいけど設定が分散するのは嫌だ。
なので実行中のシェル名を見てこれらを分ける処理を共通の.shrcに書きたい。
そこで現在実行中のシェル名が欲しくなった。

## 案1: `echo $0`

* 実行中スクリプトのパス。
* シェル名が表示されるのはシェルと対話中の時だけ
* fish-shellやcsh、tcshでは$0は設定されてない

## 案2: `ps -p $$ -oargs= | sed -e 's:^.*/::g'`

### 内訳

- $$は現在のプロセス名
- sedで不要な出力を無文字に置換で削除

    sedでは普通、`s/パターン/置換文字/m`のようにスラッシュ区切りで使われるが、今回扱う文字にはパスが含まれる為`:`を使う。
    この場合は一番下の行の最初から一番最後のスラッシュまでを削除する。

- oargsはocommとすることも出来る

### 問題点

- $$はfish-shellでは使えない
- csh や tcsh ではプロセス名がそれぞれ `-sh` と `-csh` となり、先頭の文字が消されてしまう。
  ハイフンが付いてるだけならまだしも、全く別のシェルとして表示されるのは困る。おそらくバグ。
  `-`を`t`に置換すれば可能だがそういう場当たり的対処は後で修正された時が面倒。

## 案3: `ps -p %self -oargs= | sed -e 's:^.*/::g'`

- `%self`はfish-shellでしか使えない

## 案4: `echo $SHELL | sed -e 's:^.*/::g'`

- cshやtcshでは使えない
- シェルのネストに対応できない

## 案5: `echo $shell`

- cshやtcsh以外では使えない
- cshでもtcshになる。OSXの/bin/cshは/bin/tcshを呼び出してるので当然だが。


以上から、1つのコードでsh、bash、zsh、fish、csh、tcshシェルを判定したい。
しかしcsh系とその他では以下if文とエラー出力の無視という点が他と異なるので無理と判断。
cshとtcshは諦めた。sh、bash、zshでこんな感じにして妥協しようか。

```sh
shellName=$(ps -p $$ -oargs= 2> /dev/null)
if [ -z "$shellName" ]; then;
  shellName=$(ps -p %self -oargs=) #fish-shell用
fi
shellName=$(echo $shellName | sed -e 's:^.*/::g')

echo "シェル名: $shellName"
```

なんか小汚いしどうでも良くなってきた。今は`.*shrc`へそれぞれ書いてる。でも何か方法は無いだろうか。

参考:

- <http://stackoverflow.com/questions/3327013/how-to-determine-the-current-shell-im-working-on>

