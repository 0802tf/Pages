# Java ファイル操作

## java.io.Fileクラス

Fileクラスのインスタンス生成

```Java
File file = new File("ファイルパス");
```

### メソッド

|操作|戻り値の型|記述|
|-|-|-|
|ファイルを作成|`boolean`|`file.createNewFile()`|
|ディレクトリを作成|`boolean`|`file.mkdir()`|
|ディレクトリを作成(親ディレクトリも含める)|`boolean`|`file.mkdirs()`|
|ファイルを削除|`boolean`|`file.delete()`|
|ファイルが存在するか|`boolean`|`file.exists()`|
|読み取り可能か|`boolean`|`file.canRead()`|
|書き込み可能か|`boolean`|`file.canWrite()`|
|ファイルかどうか|`boolean`|`file.isFile()`|
|ディレクトリかどうか|`boolean`|`file.isDirectory()`|
|絶対パスを取得|`String`|`file.getAbsolutePath()`|
|ファイル名を取得|`String`|`file.getName()`|
|親ディレクトリ名を取得|`String`|`file.getParent()`|
|ファイルサイズを取得|`long`|`file.length()`|
|最終更新日時を取得(タイムスタンプ値)|`long`|`file.lastModified()`|
|ディレクトリ配下のファイル・ディレクトリの一覧の取得|`File[]`|`file.listFiles()`|
|Pathオブジェクトに変換|`Path`|`file.toPath()`|

### ファイルの名前変更・移動

2つのパスのファイル名部分が異なれば名前変更、フォルダ名部分が異なれば移動

```Java
File file1 = new File("現ファイルパス");
File file2 = new File("新ファイルパス");
file1.renameTo(file2);
```

---

## java.nio.file.Filesクラス

### Pathオブジェクトの生成

FileSystemを使う

```Java
FileSystem fileSystem = FileSystems.getDefault();
Path path = fileSystem.getPath("ファイルパス");
```

Pathsを使う

```Java
Path path = Paths.get("ファイルパス");
```

ディレクトリとファイルを区切って指定

```Java
Path path = Paths.get("C:", "dir", "file.txt");
```

(※Fileクラスの`toPath()`メソッドからも生成可能)

### Pathオブジェクトを使用するメソッド

|操作|戻り値の型|記述|
|-|-|-|
|ファイルを作成|`Path`|`Files.createFile(path)`|
|ディレクトリを作成|`Path`|`Files.createDirectory(path)`|
|ディレクトリを作成(親ディレクトリも含める)|`Path`|`Files.createDirectories(path)`|
|ファイルを削除|`void`|`Files.delete(path)`|
|ファイルが存在する場合は削除|`boolean`|`Files.deleteIfExists(path)`|
|ファイルが存在するか|`boolean`|`Files.exists(path)`|
|読み取り可能か|`boolean`|`Files.isReadable(path)`|
|書き込み可能か|`boolean`|`Files.isWritable(path)`|
|ディレクトリかどうか|`boolean`|`Files.isDirectory(path)`|
|ファイルサイズを取得|`long`|`Files.size(path)`|
|最終更新日時を取得|`FileTime`|`Files.getLastModifiedTime(path)`|
|BufferedReaderオブジェクトを取得|`BufferedReader`|`Files.newBufferedReader(path)`|
|BufferedWriterオブジェクトを取得|`BufferedWriter`|`Files.newBufferedWriter(path)`|
|パス文字列を取得|`String`|`path.toString()`|
|ファイル名を表すPathを取得|`Path`|`path.getFileName()`|
|親ディレクトリを表すPathを取得|`Path`|`path.getParent()`|
|絶対パスを表すPathを取得|`Path`|`path.toAbsolutePath()`|
|Fileオブジェクトに変換|`File`|`path.toFile()`|

### 2つのPathオブジェクトに対する操作

```Java
Path path1 = Paths.get("ファイル1のパス");
Path path2 = Paths.get("ファイル2のパス");
```

|操作|記述|
|-|-|
|ファイル1をファイル2にコピー|`Files.copy(path1, path2)`|
|ファイル1をファイル2にコピー(コピー先にファイルが存在する場合は置換)|`Files.copy(path1, path2, StandardCopyOption.REPLACE_EXISTING)`|
|ファイル1をファイル2に移動・名前変更|`Files.move(path1, path2)`|
|ファイル1をファイル2に移動・名前変更(移動先にファイルが存在する場合は置換)|`Files.move(path1, path2, StandardCopyOption.REPLACE_EXISTING)`|
|2つのPathオブジェクトが同じかどうか|`Files.isSameFile(path1, path2)`|

path1を起点としてpath2の相対パスを求める

```Java
Path path = path1.relativize(path2);
```

ファイルの作成日時・最終アクセス日時を取得

```Java
BasicFileAttributes attrs = Files.readAttributes(path, BasicFileAttributes.class);
// 作成日時を取得
FileTime time = attrs.creationTime();
// 最終アクセス日時を取得
FileTime time = attrs.lastAccessTime();
```

---

## ファイルの読み込み・書き込み

FileReaderによる1文字単位の読み込み

```Java
FileReader fileReader = new FileReader(file);
int c;
while((c = fileReader.read()) != -1){
 // コンソールに出力
 System.out.print((char)c);
}
// 最後に必ず閉じてリソースを開放する(以下同様)
fileReader.close();
```

FileWriterによる書き込み

```Java
FileWriter fileWriter = new FileWriter(file);
fileWriter.write("テキスト");
fileWriter.close();
```

BufferedReaderによる行単位の読み込み(効率化)

```Java
BufferedReader bufferedReader = new BufferedReader(fileReader);
String s;
while((s = bufferedReader.readLine()) != null){
 // コンソールに出力
 System.out.println(s);
}
bufferedReader.close();
```

BufferedWriterによる行単位の書き込み(効率化)

```Java
BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);
bufferedWriter.write("テキスト¥r¥n");
bufferedWriter.close();
```

PrintWriterによる書き込み

```Java
PrintWriter printWriter = new PrintWriter(bufferedWriter);
// 改行なし
printWriter.print("テキスト");
// 改行あり
printWriter.println("テキスト");
printWriter.close();
```

バイナリデータの読み込み・書き込み

```Java
FileInputStream fileInputStream = new FileInputStream("バイナリファイルパス");
FileOutputStream　fileOutputStream = new FileOutputStream("バイナリファイルパス");
int c;
while ((c = fileInputStream.read()) != -1) {
 fileOutputStream.write((byte)c);
}
fileInputStream.close();
fileOutputStream.close();
```

StandardOpenOptionを追加(newBufferedWriterメソッド)

```Java
BufferedWriter bufferedWriter = Files.newBufferedWriter(path, StandardOpenOption.[オプション]);
```

|[オプション]|概要|
|-|-|
|`APPEND`|追記モードで開く(デフォルトは上書き)|
|`CREATE`|ファイルが存在しない場合は新しいファイルを作成|
|`CREATE_NEW`|新しいファイルを作成(すでに存在する場合は例外を投げる)|
|`DELETE_ON_CLOSE`|閉じるときに削除|

### 入出力ストリームの分類

|分類|文字データ入力|文字データ出力|バイナリデータ入力|バイナリデータ出力|
|-|-|-|-|-|
|抽象基底|`Reader`|`Writer`|`InputStream`|`OutputStream`|
|ファイル|`FileReader`|`FileWriter`|`FileInputStream`|`FileOutputStream`|
|バッファー(File-をラップ)|`BufferedReader`|`BufferedWriter`|`BufferedInputStream`|`BufferedOutputStream`|
|プリント(Buffered-をラップ)|-|`PrintWriter`|-|`PrintStream`|

### バイナリデータから文字データに変換

InputStreamReaderで入力データを変換

```Java
InputStreamReader inputStreamReader = new InputStreamReader(fileInputStream[, "文字コード"])
```

OutputStreamWriterで出力データを変換

```Java
OutputStreamWriter outputStreamWriter = new OutputStreamWriter(fileOutputStream[,"文字コード"])
```

(※文字コードを指定・変換できる)

### try-with-resources文(リソースの解放)

AutoCloseableまたはCloseableインターフェースを実装したクラス(close()メソッドにより閉じる必要のあるオブジェクト)に対し、例外発生等による閉じ忘れを防ぐ(close処理を記述する必要がなくなる)

```Java
// リソース(newで生成する文)を()内に記述
try (FileReader fileReader = new FileReader(file)) {
 // 処理({}を出たら自動でcloseされる)
} catch (IOException e) {
 e.printStackTrace();
}
```
