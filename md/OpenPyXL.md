# OpenPyXL

インストール

```bash
pip install openpyxl
```

インポート

```py
import openpyxl
```

## ワークブック

Excelファイルの読み込み(ワークブックオブジェクト(`wb`)を取得)

```py
wb = openpyxl.load_workbook("ファイルパス")
```

読み取り専用で読み込み

```py
wb = openpyxl.load_workbook("ファイルパス", read_only=True)
```

マクロ有効ブックの読み込み

```py
wb = openpyxl.load_workbook("ファイルパス", keep_vba=True)
```

数式の結果のみを読み込み

```py
wb = openpyxl.load_workbook("ファイルパス", data_only=True)
```

Excelファイルの新規作成(`Sheet`というシートが自動的に作成される)

```py
wb = openpyxl.Workbook()
```

Excelファイルの保存

(読み込んだものと同じ名前を指定すれば上書き保存、別名を指定すれば別名保存）

```py
wb.save("ファイルパス")
```

ファイルを閉じる

```py
wb.close()
```

## ワークシート

シートオブジェクト(`ws`)を取得

```py
# シート名で取得
ws = wb["シート名"]
# シート番号で取得(番号は先頭から0,1,2,...末尾は-1)
ws = wb.worksheets[シート番号]
# アクティブなワークシートを取得
ws = wb.active
```

シートオブジェクトのリストを取得

```py
wb.worksheets
```

シート名のリストを取得

```py
wb.sheetnames
```

シート名を取得

```py
ws.title
```

シート名の変更

```py
ws.title = "シート名"
```

シート番号を取得

```py
wb.index(ws)
```

シートの追加

```py
# 末尾に追加
ws = wb.create_sheet(title="シート名")
ws = wb.create_sheet("シート名")
# 位置を指定して追加
ws = wb.create_sheet(title="シート名", index=番号)
ws = wb.create_sheet("シート名", 番号)
```

シートのコピー

(コピーしたシートはシート名の末尾に「`Copy`」と付く)

```py
wb.copy_worksheet(ws)
```

シートの削除

```py
wb.remove(ws)
```

シートの範囲を取得
|操作|記述|
|-|-|
|開始行番号を取得|`ws.min_row`|
|開始列番号を取得|`ws.min_column`|
|最終行番号を取得|`ws.max_row`|
|最終列番号を取得|`ws.max_column`|

挿入・削除
|操作|記述|
|-|-|
|1行挿入|`ws.insert_rows(行番号)`|
|複数行挿入|`ws.insert_rows(行番号, 挿入行数)`|
|1行削除|`ws.delete_rows(行番号)`|
|複数行削除|`ws.delete_rows(行番号, 削除行数)`|
|1列挿入|`ws.insert_cols(列番号)`|
|複数列挿入|`ws.insert_cols(列番号, 挿入列数)`|
|1列削除|`ws.delete_cols(列番号)`|
|複数列削除|`ws.delete_cols(列番号, 削除列数)`|

行の高さを設定

```py
ws.row_dimensions[行番号].height = 高さ
```

列幅を設定

```py
ws.column_dimensions["列アルファベット"].width = 幅
```

列幅を自動調整

```py
ws.column_dimensions["列アルファベット"].width = adjusted_width
```

## セル

セルオブジェクト(`c`)を取得

```py
# アドレス(A1など)で取得
c = ws["アドレス"]
# 行番号・列番号で取得(行番号・列番号は1から始まる）
c = ws.cell(row=行番号, column=列番号)
c = ws.cell(行番号, 列番号)
```

範囲指定で複数のセルを取得

(1行分のセルのタプルを要素とするタプルを返す)

```py
rng = ws["アドレス:アドレス"]
rng = ws["アドレス":"アドレス"]
```

範囲の1行分のセルを取得(`i=0,1,2,...`)

```py
row = rng[i]
```

1行分のセルを取得(行番号は1から始まる)

```py
row = ws[行番号]
```

取得した行の1つのセルを取得(`i=0,1,2,...`)

```py
c = row[i]
```

セルのアドレスを取得
|操作|記述|
|-|-|
|アドレスを取得|`c.coordinate`|
|行番号を取得|`c.row`|
|列番号を取得|`c.column`|
|列アルファベットを取得|`c.column_letter`|

セルの値を取得

```py
value = c.value
```

セルに値を書き込み

* 値には数式(`"=SUM(A1:A3)"`など)も指定可能
* 値に`"None"`を指定すると削除

```py
# セルオブジェクトで指定
c.value = "値"
# アドレスで指定
ws["アドレス"] = "値"
# 行番号・列番号で指定
ws.cell(row=行番号, column=列番号, value="値")
ws.cell(行番号, 列番号, "値")
```

セルの表示形式を設定

```py
c.number_format = "[表示形式]"
```

|[表示形式]|内容|
|-|-|
|`yyyy年mm月dd日`|年月日を表示|
|`hh時mm分ss秒`|時分秒を表示|
|`0.00...`|小数点以下n桁で表示|
|`#,##0`|3桁のカンマ区切りで表示|
|`0%`|パーセント表示|

## 繰り返し処理

1シートずつ繰り返す

```py
for ws in wb:
 # シートwsに対して処理
```

1行ずつ繰り返す

```py
for row in ws.rows:
 # 行rowに対して処理
    for c in row:
  # セルcに対して処理
```

1列ずつ繰り返す

```py
for column in ws.columns:
 # 列columnに対して処理
    for c in column:
  # セルcに対して処理
```

範囲を指定して1行ずつ繰り返す

```py
for row in ws.iter_rows(min_row=最小行番号, max_row=最大行番号, min_col=最小列番号, max_col=最大列番号)
 # 行rowに対して処理
```

範囲を指定して1列ずつ繰り返す

```py
for column in ws.iter_cols(min_col=最小列番号, max_col=最大列番号, min_row=最小行番号, max_row=最大行番号)
 # 列columnに対して処理
```

1行ずつ繰り返す(値のみ取得)

```py
for row in ws.iter_rows(values_only=True)
 # 行rowに対して処理
```

1列ずつ繰り返す(値のみ取得)

```py
for column in ws.iter_cols(values_only=True)
 # 列columnに対して処理
```

## セルのスタイル設定

### 塗りつぶし

```py
from openpyxl.styles import PatternFill
c.fill = PatternFill(patternType="solid", fgColor="カラーコード")
```

### フォント

```py
from openpyxl.styles import Font
c.font = Font(プロパティ=値)
```

|プロパティ|概要|
|-|-|
|`name`|フォント名|
|`size`|文字サイズ|
|`bold`|(`True`の場合)太字|
|`italic`|(`True`の場合)斜体|
|`underline`|(`True`の場合)下線|
|`strike`|(`True`の場合)打ち消し線|
|`color`|文字の色(カラーコードで指定)|

### 罫線

```py
from openpyxl.styles.borders import Border, Side
side = Side(style="[種類]", color="カラーコード")
c.border = Border(top=side, bottom=side, left=side, right=side)
```

|[種類]|内容|
|-|-|
|`hair`|極細|
|`thin`|細線|
|`medium`|普通線|
|`thick`|太線|
|`double`|二本線|
|`dotted`|点線|
|`dashed`|破線|
|`dashDot`|一点鎖線|
|`dashDotDot`|二点鎖線|
|`slantDashDot`|斜破線|
|`mediumDashed`|破線|
|`mediumDashDot`|一点鎖線|
|`mediumDashDotDot`|二点鎖線|

罫線を削除

```py
c.border = Border(top=None, bottom=None, left=None, right=None)
```

### 配置

```py
from openpyxl.styles.alignment import Alignment
c.alignment = Alignment(horizontal="[横位置]", vertical="[縦位置]")
```

|[横位置]|概要|
|-|-|
|`general`|標準|
|`left`|左詰め|
|`center`|中央揃え|
|`right`|右詰め|
|`fill`|繰り返し|
|`justify`|両端揃え|
|`centerContinuous`|選択範囲内で中央|
|`distributed`|均等割り付け|

|[縦位置]|概要|
|-|-|
|`top`|上詰め|
|`center`|中央揃え|
|`bottom`|下詰め|
|`justify`|両端揃え|
|`distributed`|均等割り付け|

折り返し

```py
c.alignment = Alignment(wrap_text=True)
```

自動サイズ調整

```py
c.alignment = Alignment(shrink_to_fit=True)
```
