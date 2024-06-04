# Markdown記法

## 文字

| Markdown | Preview |
| --- | --- |
| `**太字**` / `__太字__` | **太字** |
| `*斜体*` / `_斜体_` | *斜体* |
| `***太字斜体***` / `___太字斜体___` | ***太字斜体*** |
| `` `インラインコード` `` | `インラインコード` |
| `~~打ち消し線~~` | ~~打ち消し線~~ |
| `[リンク](https://www.google.co.jp)` | [リンク](https://www.google.co.jp) |
| `![画像](https://www.google.com/images/rss.png)` | ![画像](https://www.google.com/images/rss.png) |

※リンクや画像のURLは、ローカルのファイルパスも指定可能 (例: `![このファイルと同じ階層に配置したsample.png](./sample.png)`)

---

## 改行

通常の改行では改行されないため、改行する文末に半角スペースを2つ入力して改行する

```markdown
1行目
2行目  (半角スペース2つ)
3行目
```

1行目
2行目  
3行目

またはHTMLの`<br>`タグでも可

```markdown
1行目<br>2行目
```

1行目<br>2行目

---

## 見出し

```markdown
# h1
## h2
### h3
#### h4
##### h5
###### h6
```

# h1

## h2

### h3

#### h4

##### h5

###### h6

(※`#`は6個まで使用可能で、それぞれHTMLの`<h1>`~`<h6>`タグに対応)

---

## 引用

```markdown
>引用
>>多重引用
```

>引用
>>多重引用
---

## コードブロック

言語名を指定するとシンタックスハイライトが使用できる

````markdown
```Java
public class Sample {
    public static void main(String[] args){
        System.out.println("Hello World");
    }
}
```
````

```Java
public class Sample {
    public static void main(String[] args){
        System.out.println("Hello World");
    }
}
```

---

## 番号付きリスト

```markdown
1. One
   1. One-One
   1. One-Two
1. Two
1. Three
```

1. One
   1. One-One
   1. One-Two
1. Two
1. Three

(※番号をエスケープする場合は`.`の前に`\`を挿入)

---

## 箇条書きリスト

```markdown
* One
  * One-One
  * One-Two
* Two
* Three
```

* One
  * One-One
  * One-Two
* Two
* Three

(※先頭の`*`は、`+`または`-`でも可)

---

## 数式

```markdown
$y=x^2$

$e^{i\pi} + 1 = 0$

$e^x=\sum_{i=0}^\infty \frac{1}{i!}x^i$

$\frac{n!}{k!(n-k)!} = {n \choose k}$

$A_{m,n} =
 \begin{pmatrix}
  a_{1,1} & a_{1,2} & \cdots & a_{1,n} \cr
  a_{2,1} & a_{2,2} & \cdots & a_{2,n} \cr
  \vdots  & \vdots  & \ddots & \vdots  \cr
  a_{m,1} & a_{m,2} & \cdots & a_{m,n}
 \end{pmatrix}$
```

$y=x^2$

$e^{i\pi} + 1 = 0$

$e^x=\sum_{i=0}^\infty \frac{1}{i!}x^i$

$\frac{n!}{k!(n-k)!} = {n \choose k}$

$A_{m,n} =
 \begin{pmatrix}
  a_{1,1} & a_{1,2} & \cdots & a_{1,n} \cr
  a_{2,1} & a_{2,2} & \cdots & a_{2,n} \cr
  \vdots  & \vdots  & \ddots & \vdots  \cr
  a_{m,1} & a_{m,2} & \cdots & a_{m,n}
 \end{pmatrix}$

※[Visual Studio CodeのMarkdown PDFで数式を表示させる場合](#note)

---

## 表

```markdown
|header1|header2|
|----|----|
|Row 1, Col 1|Row 1, Col 2|
|Row 2, Col 1|Row 2, Col 2|
```

|header1|header2|
|----|----|
|Row 1, Col 1|Row 1, Col 2|
|Row 2, Col 1|Row 2, Col 2|

(※2行目の`-`の数は何個でも可。両端の`|`は無くてもよい)

2行目の`:`で、左揃え・中央揃え・右揃えを指定する(指定しない場合はデフォルトの左揃え)

```markdown
|header1|header2|header3|
|:--|:--:|--:|
|左揃え|中央揃え|右揃え|
|a|b|c|
```

|header1|header2|header3|
|:--|:--:|--:|
|左揃え|中央揃え|右揃え|
|a|b|c|

セル内で改行する場合は`<br>`タグを用いる

```markdown
|header1|header2|
| ---- | ---- |
| a | セル内で<br>改行 |
```

|header1|header2|
| ---- | ---- |
| a | セル内で<br>改行 |

---

## タイトル付きリンク

(※タイトルはリンク上にマウスホバーすることで表示される)

```markdown
[Qiita](http://qiita.com "Qiita Home")
```

[Qiita](http://qiita.com "Qiita Home")

```markdown
![Qiita](https://qiita-image-store.s3.amazonaws.com/0/45617/015bd058-7ea0-e6a5-b9cb-36a4fb38e59c.png "Qiita")
```

![Qiita](https://qiita-image-store.s3.amazonaws.com/0/45617/015bd058-7ea0-e6a5-b9cb-36a4fb38e59c.png "Qiita")

---

## 定義参照リンク

```markdown
[ここ][link-1] と [この][link-1] リンクは同じになります。  
[link-1] という書き方もできます。

[link-1]: http://qiita.com/
```

[ここ][link-1] と [この][link-1] リンクは同じになります。  
[link-1] という書き方もできます。

[link-1]: http://qiita.com/
---

## ページ内リンク

```markdown
### menu
* [go to header1](#header1)
* [go to header2](#header2)

some long text

#### header1
text
[return to menu](#menu)

#### header2
text
[return to menu](#menu)
```

### menu

* [go to header1](#header1)
* [go to header2](#header2)

some long text

#### header1

text

[return to menu](#menu)

#### header2

text

[return to menu](#menu)

---

## 詳細折りたたみ

(※HTMLタグの下には空行が必要)

````markdown
<details><summary>サンプルコード</summary>

```Java
public class Sample {
    public static void main(String[] args){
        System.out.println("Hello World");
    }
}
```
</details>
````

<details><summary>サンプルコード</summary>

```Java
public class Sample {
    public static void main(String[] args){
        System.out.println("Hello World");
    }
}
```

</details>

---

## チェックボックス

```markdown
* [ ] タスク1
* [x] タスク2
```

* [ ] タスク1
* [x] タスク2

(※先頭の`*`は、`+`または`-`でも可)

---

## 脚注

(※Visual Studio Codeでは標準サポート対象外)

```markdown
本文中に[^1]や[^example]のように文字列を記述することで、脚注へのリンクを表現できます。

[^1]: 注釈内容
[^example]: 注釈内容
```

本文中に[^1]や[^example]のように文字列を記述することで、脚注へのリンクを表現できます。

[^1]: 注釈内容
[^example]: 注釈内容

---

## 水平線

```markdown
---
***
```

---
***

## エスケープ

バックスラッシュ`\`をMarkdownの前に挿入することで、Markdownをエスケープ(無効化)する

```markdown
\# H1
```

\# H1

---

## Useful references

* [Github Markdown basics](https://help.github.com/articles/markdown-basics/)
* [Github flavored Markdown](https://help.github.com/articles/github-flavored-markdown/)
* [Original Markdown spec: Syntax](http://daringfireball.net/projects/markdown/syntax)
* [Original Markdown spec: Basics](http://daringfireball.net/projects/markdown/basics)
* [marked.js library used by Colab](https://github.com/chjj/marked)
* [LaTex mathematics for equations](https://en.wikibooks.org/wiki/LaTeX/Mathematics)

---

### note

Visual Studio CodeのMarkdown PDFで数式を表示させる場合

コマンドパレットで`Extensions: Open Extension Folder`を実行し、
`\.vscode\extensions\yzane.markdown-pdf-1.4.4\template\template.html`の

```html
{{{style}}}
{{{mermaid}}}
```

の直後に以下のHTMLを挿入

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.css" integrity="sha384-9eLZqc9ds8eNjO3TmqPeYcDj8n+Qfa4nuSiGYa6DjLNcv9BtN69ZIulL9+8CqC9Y" crossorigin="anonymous">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.js" integrity="sha384-K3vbOmF2BtaVai+Qk37uypf7VrgBubhQreNQe9aGsz9lB63dIFiQVlJbr92dw2Lx" crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/contrib/auto-render.min.js" integrity="sha384-kmZOZB5ObwgQnS/DuDg6TScgOiWWBiVt0plIRkZCmE6rDZGrEOQeHM5PcHi+nyqe" crossorigin="anonymous"></script>
<script>
 document.addEventListener("DOMContentLoaded", () => {
   renderMathInElement(document.body, {
     delimiters: [
       { left: "$$", right: "$$", display: true },
       { left: "$", right: "$", display: false }
     ]
   });
 });
</script>
```