---
title: Gradle Wrapperを経由せずに実行する
createdAt: "2016-02-07"
language: ja
---

Gradleでは基本的にGradleラッパーを介してプログラムが実行される。
しかしこのラッパーはメモリを20MBほど消費し、CPUにも多少負荷をかけている。
その為、直接プログラムを実行したい。

`build.gradle`に下記を書く。

```groovy
apply plugin:'application'
mainClassName = "org.gradle.sample.Main"
```

`org.gradle.sample.Main`には、mainメソッドが存在するクラスを指定する。

そして次のコマンドを実行する。

```zsh
% gradle clean installDist
```

すると`build/install/<プログラム名>/bin/<プログラム名>` というファイルが作られるのでそれを実行する。

ここで次のような例外が出た。

> Exception in thread "main" java.lang.ExceptionInInitializerError
> Caused by: java.lang.NullPointerException

今までrunなどのGradleのタスクから実行していた時には出なかった例外だ。

例外が発生しているのは以下のコード。

```java
URL dirUrl = WordReader.class.getClassLoader().getResource("dir");
File[] langFiles = new File(dirUrl.getPath()).listFiles();

for (File f : langFiles) {
  System.out.println(f.getName());
}
```

例外はfor文の書き出しのところで起きている。
つまりlangPathsがnullとなっている。

この時、`dirUrl`は下記のようになっていた。

```bash
<プロジェクトルート>/build/install/<プログラム名>/lib/<プログラム名>.jar!/dir
```

つまり、jarファイル内のdirフォルダを読み込むのに失敗している。

`gradle run`した場合は下記のようになっていた。

> <プロジェクトルート>/build/resources/main/dir

jarファイル内のファイルを読み込むのは簡単だが、フォルダを読み込むのは難しい。

<http://stackoverflow.com/questions/11012819/how-can-i-get-a-resource-folder-from-inside-my-jar-file>

これをなるべくコードは汚さず、runでもjarからでも動くようにしたい。

jarの外に、jar内にあるリソースファイルと同じもののシンボリックリンクを作り、それを読み込むことにした。
冗長だし、libフォルダの中に作ることになるので気持ち悪いが、一番コードを汚さず手軽な方法だと思う。

まず、

```java
URL dirUrl = WordReader.class.getClassLoader().getResource("dir");
```

としていたところを、

```java
URL dirUrl = WordReader.class.getClassLoader().getResource("./dir");
```

とする。これで、jarからだと、

> <プロジェクトルート>/build/install/<プログラム名>/lib/dir

を読み込もうとし、runからだと前述と変わらないパスを読み込もうとする。

そして以下のコマンドを実行する。

```sh
% ./gradlew clean installDist
% ln -s `pwd`/build/resources/main/* build/install/プログラム名/lib/
```

installDistを実行した時には build/resourcesという、ソースにあるリソースのコピーが作成される。
その中にある全てのシンボリックリンクをlibフォルダ内に作っている。

あとは前述の、生成された起動スクリプトを実行すれば動くはず。

まとめ
------

メモリをケチってやることでもない。
