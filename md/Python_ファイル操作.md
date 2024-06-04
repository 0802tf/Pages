# Python ファイル操作

## ファイルを開く

```py
file = open('ファイルパス', 'オープンモード'[,'文字エンコーディング名'])
```

|オープンモード|概要|
|-|-|
|`r`|読み込み専用(既定。ファイルが存在しなければエラー)|
|`r+`|読み書き両用(ファイルが存在しなければエラー)|
|`w`|書き込み専用(ファイルが存在しなければ新規作成)|
|`w+`|読み書き両用(ファイルの内容をクリア。ファイルが存在しなければ新規作成)|
|`a`|追記専用(ファイルが存在する場合は末尾に追記)|
|`a+`|読み書き両用(既存の内容に追記。ファイルが存在しなければ新規作成)|
|`x+`|書き込み専用(ファイルが存在する場合はエラー)|
|`x+`|読み書き両用(ファイルが存在する場合はエラー)|
|`t`|テキストモード(既定)|
|`b`|バイナリモード|

## ファイルの書き込み

```py
file = open('ファイルパス','w')
file.write('テキスト\n')
file.close()
```

リストなどからまとめて文字列を書き込む

```py
file = open('ファイルパス','w')
texts = ['テキスト1\n', 'テキスト2\n', 'テキスト3\n', ...]
file.writelines(texts)
file.close()
```

## ファイルの読み込み

まとめて読み込む

```py
file = open('ファイルパス','r')
text = file.read()
print(text)
file.close()
```

読み込む文字数nを指定(引数なしまたは-1で全部読み込む)

```py
text = file.read(n)
```

シーク位置を変更(読み込み開始位置をバイト数で指定)

```py
file.seek(n)
```

行単位に分割してリストとして取得

```py
file = open('ファイルパス','r')
lines = file.readlines()
for line in lines:
    print(line.rstrip('\n')) #改行文字は除去する
file.close()
```

fileオブジェクトをそのままforループに渡すことでファイルを行単位で読み込むこともできる

```py
file = open('ファイルパス','r')
for line in file:
    print(line.rstrip('\n'))
file.close()
```

## 自動クローズ

withブロック終了時に自動的に閉じられる

```py
with open('ファイルパス','r') as file:
    for line in file:
        print(line.rstrip('\n'))
```

## バイナリファイル

```py
with open('バイナリファイルパス', 'rb') as file: #モード名にbをつける
  while True:
    d = file.read(1) #1バイトずつ読み込む
    if len(d) == 0: #dが空の場合ループを抜ける
      break
    print(d)
```

## 区切り文字付きテキスト(csv,tsvなど)

### csvモジュールのインポート

```py
import csv
```

### 読み込み

readerオブジェクトの生成

```py
reader = csv.reader(file, [パラメータ])
```

パラメータ(「パラメータ名=値」形式で指定)
|パラメータ|概要|既定値|
|-|-|-|
|`delimiter`|区切り文字|`,`|
|`doublequote`|クォート文字を二重化するか|`True`|
|`escapechar`|エスケープ文字|`None`|
|`lineterminator`|改行文字(readerでは無視)|`\r\n`|
|`quotechar`|クォート文字|`"`|
|`quoting`|クォートの処理方法|`csv.QUOTE_MINIMAL`|
|`skipinitialspace`|delimiter直後の空白を無視するか|`False`|
|`strict`|不正な入力でエラーを発生するか|`False`|

クォートの処理方法(`quoting`パラメータ)
|値|概要|
|-|-|
|`csv.QUOTE_ALL`|全てのフィールドをクォート|
|`csv.QUOTE_MINIMAL`|delimiter,quotecharなどを含むフィールドだけをクォート|
|`csv.QUOTE_NONNUMERIC`|非数値フィールドだけをクォート|
|`csv.QUOTE_NONE`|クォートしない|

fileオブジェクトと同様にforループで行単位に読み込み

```py
with open('ファイルパス', encoding='UTF-8') as file:
  reader = csv.reader(file, delimiter='区切り文字')  
  for row in reader:
    for cell in row:
      print(cell)
```

### 書き込み

writerオブジェクトの生成

```py
writer = csv.writer(file, [パラメータ])
```

1行ずつ書き込み

```py
writer.writerow([一次元リスト])
```

二次元リストをまとめて書き込み

```py
writer.writerows([二次元リスト])
```

## osモジュール

インポート

```py
import os
```

|操作|記述(引数`path='ファイルパス'`とする)|
|-|-|
|パスが存在するか|`os.path.exists(path)`|
|ファイルかどうか|`os.path.isfile(path)`|
|ディレクトリかどうか|`os.path.isdir(path)`|
|絶対パスを取得|`os.path.abspath(path)`|
|ファイル名を取得|`os.path.basename(path)`|
|親ディレクトリ名を取得|`os.path.dirname(path)`|
|ファイルサイズを取得(バイト数)|`os.path.getsize(path)`|
|作成日時を取得(タイムスタンプ値)|`os.path.getctime(path)`(Windowsのみ)<br>`os.stat(path).st_ctime`(Windowsのみ)<br>`os.stat(path).st_birthtime`(Mac,UNIXのみ)|
|最終更新日時を取得(タイムスタンプ値)|`os.path.getmtime(path)`<br>`os.stat(path).st_mtime`<br>`os.path.getctime(path)`(Mac,UNIXのみ)<br>`os.stat(path).st_ctime`(Mac,UNIXのみ)|
|最終アクセス日時を取得(タイムスタンプ値)|`os.path.getatime(path)`<br>`os.stat(path).st_atime`|
|ディレクトリ配下のファイル名のリストを取得|`os.listdir(path)`|
|パス区切り文字を取得|`os.sep`(または`os.path.sep`)|
|パスを(親ディレクトリ,ファイル名)に分割|`os.path.split(path)`|
|パスを(ベース名,拡張子)に分割|`os.path.splitext(path)`|
|カレントディレクトリを取得|`os.getcwd()`|
|カレントディレクトリを移動|`os.chdir(path)`|
|ディレクトリを作成(途中に存在しないディレクトリが指定されていればエラー)|`os.mkdir(path)`|
|ディレクトリを作成(複数階層)|`os.makedirs(path)`|
|ファイルを削除|`os.remove(path)`|
|ディレクトリを削除(最下層のみ削除。ディレクトリ内が空でなければエラー)|`os.rmdir(path)`|
|ディレクトリを削除(複数階層削除。最下層ディレクトリが空でなければエラー。1つでも削除できればエラーとならない)|`os.removedirs(path)`|

引数からパス文字列を組み立てて取得

```py
path = os.path.join('C:', 'dir', 'file.txt')
# C:/dir/file.txt
```

### ファイルの名前変更・移動

|操作|記述|
|-|-|
|`path1`を`path2`に名前変更・移動(存在しないディレクトリがあれば`FileNotFoundError`)|`os.rename(path1, path2)`|
|`path1`を`path2`に名前変更・移動(存在しないディレクトリがあれば再帰的に作成)|`os.renames(path1, path2)`|

### ディレクトリ配下の全てのサブディレクトリやファイルを再帰的に取得

`walk`関数の戻り値は`('現在のディレクトリパス(文字列)','配下のディレクトリ一覧(リスト)','配下のファイル一覧(リスト)')`のタプルを返すイテラブル型

```py
for path, dirs, files in os.walk('ディレクトリパス'):
  for file in files:
    # 全てのファイルに対して処理
```

## shutilモジュール

インポート

```py
import shutil
```

ファイルを移動・コピー
|操作|記述(`path1='現ファイルパス', path2='新ファイルパス'`とする)|
|-|-|
|ファイルを移動|`shutil.move(path1, path2)`|
|ファイルのデータをコピー|`shutil.copyfile(path1, path2)`|
|ファイルのデータとパーミッションをコピー|`shutil.copy(path1, path2)`|
|ファイルのデータとパーミッションとメタデータをコピー|`shutil.copy2(path1, path2)`|
|ディレクトリ配下のファイルをまとめてコピー|`shutil.copytree(path1, path2[, ignore=shutil.ignore_patterns('コピーをスキップするファイル名のパターン')])`|

空ではないディレクトリを再帰的に削除

```py
shutil.rmtree('ディレクトリパス')
```

## globモジュール

インポート

```py
import glob
```

指定したパス文字列に合致するファイルの一覧をリストで取得(ワイルドカードで指定)

```py
files = glob.glob('C:/dir/*') #dirディレクトリ直下のファイル・ディレクトリの一覧を取得(直下のみ)
```

指定できる特殊文字
|特殊文字|説明|
|-|-|
|`*`|長さ0文字以上の任意の文字列|
|`?`|任意の1文字|
|`[]`|[]内の特定の1文字|

再帰的に取得

```py
files = glob.glob('C:/dir/**', recursive=True) #dirディレクトリに含まれるすべてのファイル・ディレクトリの一覧を取得
```
