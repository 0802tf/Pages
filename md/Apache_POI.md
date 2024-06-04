# Apache POI

## ファイル

### ファイルを開く

Fileで指定

```Java
File file = new File("ファイルパス");
Workbook workbook = WorkbookFactory.create(file[, "パスワード"]);
```

InputStream(FileInputStream)で指定

```Java
InputStream inputStream = new FileInputStream("ファイルパス");
Workbook workbook = WorkbookFactory.create(inputStream[, "パスワード"]);
```

読み取り専用で開く場合

```Java
Workbook workbook = WorkbookFactory.create(file[もしくはinputStream], "パスワード"[なければnull], true);
```

※`close()`メソッドもしくはtry-with-resources文で閉じる必要あり

### ファイルを作成

OOXML(Office Open XML)形式(拡張子が「`.xlsx`」)のファイルフォーマット

```Java
Workbook workbook = new XSSFWorkbook();
```

※拡張子が「`.xls`」のファイルフォーマットは`new HSSFWorkbook()`とする

※`close()`メソッドもしくはtry-with-resources文で閉じる必要あり

### ファイルへの出力

OutputStream(FileOutputStream)で指定

```Java
OutputStream outputStream = new FileOutputStream("出力ファイルパス");
workbook.write(outputStream);
```

※`close()`メソッドもしくはtry-with-resources文で閉じる必要あり

### 上書き保存

```Java
InputStream inputStream = new FileInputStream("ファイルパス");
Workbook workbook = WorkbookFactory.create(inputStream);
inputStream.close(); //ここで入力ストリームを閉じる

// 処理

OutputStream outputStream = new FileOutputStream("ファイルパス");
workbook.write(outputStream);
```

## シート

シート名で指定して取得

```Java
Sheet sheet = workbook.getSheet("シート名");
```

シート番号で指定して取得(シート番号はゼロベース)

```Java
Sheet sheet = workbook.getSheetAt("シート番号");
```

シートを作成(末尾に追加)

```Java
Sheet sheet = workbook.createSheet();
```

シート名を付けてシートを作成(末尾に追加)

```Java
Sheet sheet = workbook.createSheet("シート名");
```

シートを複製し末尾に追加

```Java
Sheet sheet = workbook.cloneSheet("複製するシート番号");
```

シート名を取得

```Java
String sheetName = sheet.getSheetName();
```

そのシートの属するワークブックを取得

```Java
Workbook workbook = sheet.getWorkbook();
```

シート数を取得

```Java
int num = workbook.getNumberOfSheets()
```

## 行・セル

行を取得(行番号はゼロベース)

```Java
Row row = sheet.getRow("行番号");
```

行を作成

```Java
Row row = sheet.createRow("行番号");
```

シートの最終行番号を取得

```Java
int num = sheet.getLastRowNum();
```

セルを取得(列番号はゼロベース)

```Java
Cell cell = row.getCell("列番号");
```

セルを作成

```Java
Cell cell = row.createCell("列番号");
```

その行の最終列番号を取得(※1ベース)

```Java
int num = row.getLastCellNum();
```

セルの行番号を取得

```Java
int num = cell.getRowIndex();
```

セルの列番号を取得

```Java
int num = cell.getColumnIndex();
```

そのセルの属するシートを取得

```Java
Sheet sheet = cell.getSheet();
```

セルの型を取得

```Java
CellType cellType = cell.getCellType();
```

|操作|記述|
|-|-|
|シートをアクティブにする|`workbook.setActiveSheet("シート番号");`|
|シートを削除|`workbook.removeSheetAt("シート番号");`|
|シート名を変更|`workbook.setSheetName("シート番号", "シート名");`|
|シートの並び順を変更|`workbook.setSheetOrder("シート名", "シート番号");`|
|シートの拡大率を設定|`sheet.setZoom("パーセント数字");`|
|列幅を設定|`sheet.setColumnWidth("列番号", "設定したい文字数" * 256);`|
|列幅を自動調整|`sheet.autoSizeColumn("列番号");`|
|行の移動(移動行数は1で下に1行移動、移動先の行は上書き)|`sheet.shiftRows("選択範囲上限行番号", "選択範囲下限行番号", "移動行数");`|
|セルに値を設定|`cell.setCellValue("設定する値");`|
|数式を設定("="は不要)|`cell.setCellFormula("数式");`|
|シート内の行を削除(上に詰めない)|`sheet.removeRow(row);`|
|行内のセルを削除(左に詰めない)|`row.removeCell(cell);`|
|ワークブックを閉じる|`workbook.close();`|

## セルの値を取得

文字列型(`cellType == CellType.STRING`)

```Java
String value = cell.getStringCellValue();
```

真偽値型(`cellType == CellType.BOOLEAN`)

```Java
boolean value = cell.getBooleanCellValue();
```

数値型(`cellType == CellType.NUMERIC`)

```Java
double value = cell.getNumericCellValue();
```

数値型のうち日付型(`DateUtil.isCellDateFormatted(cell)`)

```Java
Date value = cell.getDateCellValue();
```

数式(`cellType == CellType.FORMULA`)

```Java
String value = cell.getCellFormula();
```

数式の結果を取得

```Java
CreationHelper creationHelper = workbook.getCreationHelper();
FormulaEvaluator evaluator = creationHelper.createFormulaEvaluator();
CellValue cellvalue = evaluator.evaluate(cell);
double value = cellvalue.getNumberValue();
```

(※空白は`CellType.BLANK`)

## ハイパーリンクの設定

```Java
CreationHelper creationHelper = workbook.getCreationHelper();
Hyperlink hyperlink = creationHelper.createHyperlink(HyperlinkType.[リンクタイプ]);
hyperlink.setAddress("リンク先アドレス");
cell.setHyperlink(hyperlink);
```

|[リンクタイプ]|種類|
|-|-|
|`NONE`|なし|
|`URL`|URL|
|`DOCUMENT`|セル|
|`EMAIL`|メールアドレス|
|`FILE`|ファイルパス|

※アンダーラインや青文字などはFontで設定する

## セルスタイル

### セルスタイルを作成

```Java
CellStyle cellStyle = workbook.createCellStyle();
```

### 色を取得

```Java
short color = IndexedColors.[色].getIndex();
```

|[色]|(※代表例)|||||
|-|-|-|-|-|-|
|BLACK|TURQUOISE|CORAL|GOLD|YELLOW|MAROON|
|WHITE|GREEN|ROSE|ORANGE|PINK|ORCHID|
|RED|VIOLET|LAVENDER|BROWN|AQUA|INDIGO|
|BLUE|TEAL|TAN|PLUM|LIME|AUTOMATIC|

### 塗りつぶし

#### 色を設定

|操作|記述|
|-|-|
|前景色を設定|`cellStyle.setFillForegroundColor(color);`|
|背景色を設定|`cellStyle.setFillBackgroundColor(color);`|

#### 塗りつぶしパターンを設定

デフォルトは`NO_FILL`のため前景色・背景色を設定して塗りつぶす場合はパターンも設定する必要あり(単一色は`SOLID_FOREGROUND`)

```Java
cellStyle.setFillPattern(FillPatternType.[パターン]);
```

|[パターン]|||
|-|-|-|
|`NO_FILL`|`SOLID_FOREGROUND`|`FINE_DOTS`|
|`ALT_BARS`|`SPARSE_DOTS`|`THICK_HORZ_BANDS`|
|`THICK_VERT_BANDS`|`THICK_BACKWARD_DIAG`|`THICK_FORWARD_DIAG`|
|`BIG_SPOTS`|`BRICKS`|`THIN_HORZ_BANDS`|
|`THIN_VERT_BANDS`|`THIN_BACKWARD_DIAG`|`THIN_FORWARD_DIAG`|
|`SQUARES`|`DIAMONDS`|`LESS_DOTS`|
|`LEAST_DOTS`|||

### 罫線

罫線を取得

```Java
BorderStyle borderStyle = BorderStyle.[罫線];
```

|種類|[罫線]|
|-|-|
|なし|NONE|
|細線|THIN|
|中太線|MEDIUM|
|破線|DASHED|
|点線|DOTTED|
|太線|THICK|
|二重線|DOUBLE|

|位置|罫線を設定|罫線の色を設定|
|-|-|-|
|上|`cellStyle.setBorderTop(borderStyle);`|`cellStyle.setTopBorderColor(color);`|
|下|`cellStyle.setBorderBottom(borderStyle);`|`cellStyle.setBottomBorderColor(color);`|
|左|`cellStyle.setBorderLeft(borderStyle);`|`cellStyle.setLeftBorderColor(color);`|
|右|`cellStyle.setBorderRight(borderStyle);`|`cellStyle.setRightBorderColor(color);`|

### 文字位置を設定

|位置|記述|
|-|-|
|左詰め|`cellStyle.setAlignment(HorizontalAlignment.LEFT);`|
|左右中央揃え|`cellStyle.setAlignment(HorizontalAlignment.CENTER);`|
|右詰め|`cellStyle.setAlignment(HorizontalAlignment.RIGHT);`|
|上詰め|`cellStyle.setVerticalAlignment(VerticalAlignment.TOP);`|
|上下中央揃え|`cellStyle.setVerticalAlignment(VerticalAlignment.CENTER);`|
|下詰め|`cellStyle.setVerticalAlignment(VerticalAlignment.BOTTOM);`|

### 折り返しの設定

(`true`:折り返す, `false`:折り返さない)

```Java
cellStyle.setWrapText(true);
```

これを`true`に設定したセルに対し、`setCellValue`で改行文字`¥n`を含む文字列を指定するとセル内改行ができる

### 書式設定

数値型の書式設定

```Java
DataFormat dataFormat = workbook.createDataFormat();
short style = dataFormat.getFormat("書式");
cellStyle.setDataFormat(style);
```

書式の例: `#,##0`(3桁区切り), `0.00`(小数点以下2桁)

日付型の値を設定(Date型・Calendar型)

```Java
cell.setCellValue(new Date());
CreationHelper creationHelper = workbook.getCreationHelper();
DataFormat dataFormat = creationHelper.createDataFormat();
short style = dataFormat.getFormat("書式");
cellStyle.setDataFormat(style);
```

### フォント

Fontオブジェクトの生成

```Java
Font font = workbook.createFont();
```

|操作|記述|
|-|-|
|フォント名を設定|`font.setFontName("フォント名");`|
|フォントサイズを設定|`font.setFontHeightInPoints((short)"ポイント値");`|
|フォントの色を設定|`font.setColor(color);`|
|太字に設定|`font.setBold(true);`|
|斜体に設定|`font.setItalic(true);`|
|打ち消し線を設定|`font.setStrikeout(true);`|

下線を設定

```Java
font.setUnderline(Font.[下線]);
```

|[下線]|種類|
|-|-|
|`U_NONE`|なし|
|`U_SINGLE`|通常線|
|`U_DOUBLE`|二重線|
|`U_SINGLE_ACCOUNTING`|通常線(会計用)|
|`U_DOUBLE_ACCOUNTING`|二重線(会計用)|

作成したフォントをセルスタイルに設定

```Java
cellStyle.setFont(font);
```

### 作成したスタイルをセルに設定

```Java
cell.setCellStyle(cellStyle);
```

## 画像の挿入

画像ファイルをByte配列に変換

```Java
InputStream inputStream = new FileInputStream("画像ファイルパス");
byte[] byteArray = IOUtils.toByteArray(inputStream);
```

画像をワークブックに追加

```Java
int pictureIdx = workbook.addPicture(byteArray, [画像の種類]);
```

|[画像の種類]|種類|
|-|-|
|`Workbook.PICTURE_TYPE_JPEG`|JPEG|
|`Workbook.PICTURE_TYPE_PNG`|PNG|

ClientAnchorオブジェクトを取得

```Java
CreationHelper creationHelper = workbook.getCreationHelper();
ClientAnchor anchor = creationHelper.createClientAnchor();
```

画像挿入位置(サイズ)を指定

```Java
anchor.setCol1(開始列番号);
anchor.setRow1(開始行番号);
anchor.setCol2(終了列番号);
anchor.setRow2(終了行番号);
```

オフセットを指定

```Java
anchor.setDx1(Units.EMU_PER_PIXEL * 左余白ピクセル);
anchor.setDy1(Units.EMU_PER_PIXEL * 上余白ピクセル);
anchor.setDx2(Units.EMU_PER_PIXEL * -右余白ピクセル);
anchor.setDy2(Units.EMU_PER_PIXEL * -下余白ピクセル);
```

画像のアンカータイプを設定

```Java
anchor.setAnchorType(AnchorType.[アンカータイプ]);
```

|[アンカータイプ]|値|種類|
|-|-|-|
|`MOVE_AND_RESIZE`|`0`|行/列をリサイズすると画像も移動/リサイズを行う|
|`DONT_MOVE_DO_RESIZE`|`1`|画像のリサイズのみを行う|
|`MOVE_DONT_RESIZE`|`2`|画像の移動のみを行う|
|`DONT_MOVE_AND_RESIZE`|`3`|画像のリサイズ/移動共に行わない|

指定した表示位置に画像を設定

```Java
Drawing patriarch = sheet.createDrawingPatriarch();
Picture picture = patriarch.createPicture(anchor, pictureIdx);
```

画像サイズ変更(引数を省略するとサイズをリセット)

```Java
picture.resize(倍率);
```