# Excel VBA ファイル操作

## Dir関数

```vb
Dir[(pathname[, attributes])]
```

|引数|説明|
|-|-|
|pathname|省略可能です。ファイル名を表す文字列式を指定します。フォルダ名およびドライブ名も含めて指定できます。引数pathnameに指定した内容が見つからないときは、長さ0の文字列("")を返します。"*"または"?"のワイルドカードを使用できます。|
|attributes|省略可能です。取得するファイルが持つ属性の値の合計を表す数式または定数を指定します。省略すると、標準ファイルの属性になります。|

attributesの設定値
|定数|値|内容|
|-|-|-|
|vbNormal|0|標準ファイル|
|vbReadOnly|1|読み取り専用ファイル|
|vbHidden|2|隠しファイル|
|vbSystem|4|システムファイル。Macintoshでは使用できません。|
|vbVolume|8|ボリュームラベル。この値を指定すると、すべての属性は無効になります。Macintoshでは使用できません。|
|vbDirectory|16|フォルダ|
|vbAlias|32|エイリアスファイル。Macintoshでのみ使用できます。|

任意の組み合わせを、上記設定値の足し算で指定することが可能。
Dir関数は、pathnameに一致する最初のファイル名を返します。
フォルダ内のすべてのファイルに対して繰り返して処理を実行する場合は、引数を指定せずにDirを実行してください。
一致するファイル名がなくなると、Dir関数は長さ0の文字列("")を返します。
ファイル名は特定の順序で取得されるわけではありませんので、取得される順番を期待しないようにしてください。

### Dir関数の使用例

```vb
変数 = Dir("C:\test.xls")
```

"C:\test.xls"が存在する場合は"test.xls"が、存在しない場合は""が変数に入ります。

```vb
変数 = Dir("C:\*.xls")
```

Cドライブ直下にある、.xlsファイルの先頭のファイル名が入ります。

```vb
変数 = Dir("C:\", vbNormal + vbReadOnly + vbHidden)
```

Cドライブ直下にある、.標準＋読取専用＋隠しファイルの先頭のファイル名が入ります。

```vb
変数 = Dir("C:\test", vbDirectory)
```

"C:\test"のフォルダが存在する場合は"test"が、存在しない場合は""が変数に入ります。

### Dir関数の実践例

Cドライブ直下のエクセルファイルを全て取得

```vb
変数 = Dir("C:\*.xls")
Do While 変数 <> ""
　　' 処理
　　変数 = Dir()
Loop
```

Cドライブ直下のエクセルファイルを全て取得しています。
注意
拡張子を、.xlsと指定していますが、この場合は、.xls、.xlsx、.xlsm等々
xlsで始まる拡張子全てが対象となります。

サブフォルダだけを取得する

```vb
strDir = Dir(パス, vbDirectory)
Do While strDir <> ""
　　If strDir <> "." And strDir <> ".." Then
　　　　If GetAttr(パス & strDir) And vbDirectory Then
　　　　　　Debug.Print strDir 'strDirはフォルダです
　　　　End If
　　End If
　　strDir = Dir()
Loop
```

## FileDialogオブジェクト

```vb
Application.FileDialog(fileDialogType)
```

|fileDialogTypeに使用する定数|説明|
|-|-|
|msoFileDialogFilePicker|ユーザーがファイルを選択できます。|
|msoFileDialogFolderPicker|ユーザーがフォルダーを選択できます。|
|msoFileDialogOpen|ユーザーがファイルを開くことができます。|
|msoFileDialogSaveAs|ユーザーがファイルを保存できます。|

|メソッド|説明|
|-|-|
|Execute|Showメソッドが呼び出された直後のユーザーのアクションを実行します。|
|Show|ファイルのダイアログボックスを表示し、[アクション]ボタン(-1)と[キャンセル]ボタン(0)のどちらがクリックされたかを示す長整数型(Long)の値を返します。Showメソッドを呼び出すと、ファイルのダイアログボックスが閉じられるまで、コードの実行は中断されます。[ファイルを開く]および[名前を付けて保存]ダイアログボックスでは、Showメソッドの直後にExecuteメソッドを使用して、ユーザーのアクションを実行します。|

|プロパティ|説明||
|-|-|-|
|AllowMultiSelect|Trueを設定すると、ユーザーは、ダイアログボックスから複数のファイルを選択できます。|値の取得および設定が可能です。|
|Application|指定したFileDialogオブジェクトのコンテナーアプリケーションを表すApplicationオブジェクトを取得します。このプロパティをAutomationオブジェクトと組み合わせて使用すると、そのオブジェクトのコンテナーアプリケーションを取得できます。|値の取得のみ可能です。|
|ButtonName|ファイルのダイアログボックスで、アクションボタンに表示されるテキストを表す文字列型(String)の値を設定します。|値の取得および設定が可能です。|
|Creator|FileDialogオブジェクトが作成されたアプリケーションを示す32ビットの整数を取得します。|値の取得のみ可能です。|
|DialogType|FileDialogオブジェクトが表示するファイルのダイアログボックスの種類を表すMsoFileDialogTypeクラスの定数を取得します。|値の取得のみ可能です。|
|FilterIndex|ファイルのダイアログボックスの既定ファイルフィルターを設定します。長整数型(Long)の値を使用します。既定フィルターによって、ファイルのダイアログボックスを初めて開いたときに表示されるファイルの種類が決まります。|値の取得および設定が可能です。|
|Filters|FileDialogFiltersコレクションを取得します。|値の取得のみ可能です。|
|InitialFileName|ファイルのダイアログボックスに初期表示されるパスやファイル名を設定します。文字列型(String)の値を使用します。|値の取得および設定が可能です。|
|InitialView|ファイルのダイアログボックスでのファイルやフォルダーの初期表示を表すMsoFileDialogViewクラスの定数を設定します。|値の取得および設定が可能です。|
|Item|指定したオブジェクトに関連付けられたテキストを取得します。|値の取得のみ可能です。|
|Parent|FileDialogオブジェクトのParentオブジェクトを取得します。|値の取得のみ可能です。|
|SelectedItems|FileDialogSelectedItemsコレクションを取得します。このコレクションには、FileDialogオブジェクトのShowメソッドによって表示されたファイルのダイアログボックスでユーザーが選択したファイルのパスの一覧が保存されています。|値の取得のみ可能です。|
|Title|FileDialogオブジェクトを使用して表示されるファイルのダイアログボックスのタイトルを取得または設定します。|値の取得および設定が可能です。|

### FileDialogの実践例

```vb
Sub sample1()
　　With Application.FileDialog(msoFileDialogFolderPicker)
　　　　.InitialFileName = "D:\user\"
　　　　.AllowMultiSelect = False
　　　　.Title = "フォルダの選択"
　　　　If .Show = True Then
　　　　　　MsgBox "選択フォルダは" &amp; vbLf &amp; .SelectedItems(1)
　　　　End If
　　End With
End Sub
```

フォルダの選択ダイアログを表示し、選択されたフォルダをMsgBoxで表示しています。

```vb
Sub sample2()
　　With Application.FileDialog(msoFileDialogOpen)
　　　　.Filters.Clear
　　　　.Filters.Add "Excel2003", "*.xls"
　　　　.Filters.Add "Excelファイル", "*.xlsx"
　　　　.Filters.Add "Excelマクロ有効", "*.xlsm"
　　　　.InitialFileName = "D:\Excel\"
　　　　.AllowMultiSelect = False
　　　　If .Show = True Then
　　　　　　.Execute
　　　　End If
　　End With
End Sub
```

ファイル選択のダイアログを、拡張子（xls,xlsx,xlsm）で表示し、選択されたファイルを、Executeで開いています。

## FileSystemObject

### FileSystemObjectオブジェクトの使用方法

#### 使用方法1（実行時バインディング）

```vb
Dim objFSO As Object
Set objFSO = CreateObject("Scripting.FileSystemObject")
```

#### 使用方法2（事前バインディング）

「ツール」→「参照設定」に、「Microsoft Scripting Runtime」にチェック
を付ける。

```vb
Dim objFSO As New FileSystemObject
```

または

```vb
Dim objFSO As FileSystemObject
Set objFSO = New FileSystemObject
```

|プロパティ|説明|
|-|-|
|Drives|ローカルマシンで利用できるすべてのDriveオブジェクトが入ったDrivesコレクションを返します。|

|メソッド|説明|構文|
|-|-|-|
|BuildPath|既存のパスの末尾に名前を追加します|object.BuildPath(path, name)|
|CopyFile|ファイルを別の場所へコピーします。|object.CopyFile(source, destination[, overwrite])|
|CopyFolder|フォルダを再帰的に別の場所へコピーします。|object.CopyFolder(source, destination[, overwrite])|
|CreateFolder|フォルダを作成します。|object.CreateFolder(foldername)|
|CreateTextFile|指定した名前のファイルを作成し、作成したファイルの読み取りまたは書き込みに使用できるTextStreamオブジェクトを返します。|object.CreateTextFile(filename[, overwrite[, unicode]])|
|DeleteFile|指定されたファイルを削除します。|object.DeleteFile(filespec[, force])|
|DeleteFolder|指定されたフォルダおよびそのフォルダ内のフォルダとファイルを削除します。読み取り専用属性が設定されているフォルダーを削除する場合はforceにTrueを指定します。省略時はFalseです。|object.DeleteFolder(folderspec[, force])|
|DriveExists|指定されたドライブが存在する場合は、真(true)を返します。存在しない場合は、偽(false)を返します。|object.DriveExists(drivespec)|
|FileExists|指定したファイルが存在する場合は、真(true)を返します。存在しない場合は、偽(false)を返します。|object.FileExists(filespec)|
|FolderExists|指定されたフォルダが存在する場合は、真(true)を返します。存在しない場合は、偽(false)を返します。|object.FolderExists(folderspec)|
|GetAbsolutePathName|指定されたパスの絶対パス名を返します。|object.GetAbsolutePathName(pathspec)|
|GetBaseName|指定されたパス内に含まれるファイルのベース名(ファイル拡張子を除いたもの)を表す文字列を返します。|object.GetBaseName(path)|
|GetDrive|指定されたパスに含まれるドライブに対応するDriveオブジェクトを返します。|object.GetDrive(drivespec)|
|GetDriveName|指定されたパスのドライブ名を返します。|object.GetDriveName(path)|
|GetExtensionName|指定されたパスの拡張子を表す文字列を返します。|object.GetExtensionName(path)|
|GetFile|指定されたパスに置かれているファイルに対応するFileオブジェクトを返します。|object.GetFile(filespec)|
|GetFileName|指定されたパスの最後のファイル名またはフォルダ名を返します。|object.GetFileName(pathspec)|
|GetFolder|指定されたパスに置かれているフォルダに対応するFolderオブジェクトを返します。|object.GetFolder(folderspec)|
|GetParentFolderName|指定されたパスの最後のファイルまたはフォルダの親フォルダの名前が入った文字列を返します。|object.GetParentFolderName(path)|
|GetSpecialFolder|指定された特殊フォルダを返します。|object.GetSpecialFolder(folderspec)|
|GetTempName|一時ファイルまたは一時フォルダの名前をランダムに生成して返します。このメソッドは、一時ファイルや一時フォルダを必要とする処理を行うときに便利です。|object.GetTempName()|
|MoveFile|ファイル(複数可)を別の場所へ移動します。|object.MoveFile(source, destination)|
|MoveFolder|フォルダ(複数可)を別の場所へ移動します。|object.MoveFolder(source, destination)|
|OpenTextFile|指定したファイルを開き、開いたファイルの読み取り、または追加書き込みに使用できるTextStreamオブジェクトを返します。|object.OpenTextFile(filename[, iomode[, create[, format]]])|

### Driveオブジェクト

|プロパティ|説明|
|-|-|
|AvailableSpace|指定されたドライブまたはネットワーク共有でユーザーが使用できるディスク容量を返します。|
|DriveLetter|物理ローカルドライブまたはネットワーク共有のドライブ名を返します。値の取得のみ可能です。|
|DriveType|指定されたドライブの種類を示す値を返します。|
|FileSystem|指定されたドライブに使用されているファイルシステムの種類を返します。|
|FreeSpace|指定されたドライブまたはネットワーク共有でユーザーが使用できるディスクの空き境域を返します。値の取得のみ可能です。|
|IsReady|指定されたドライブの準備ができている場合は真(true)を返します。準備ができてない場合は偽(false)を返します。|
|Path|指定されたファイル、フォルダ、またはドライブのパスを返します。|
|RootFolder|指定されたドライブのルートフォルダを表すFolderオブジェクトを返します。値の取得のみ可能です。|
|SerialNumber|ディスクボリュームを一意に識別する小数のシリアル番号を返します。|
|ShareName|指定されたドライブのネットワーク共有名を返します。|
|TotalSize|ドライブまたはネットワーク共有の総容量をバイト単位で返します。|
|VolumeName|指定されたドライブのボリューム名を設定または返します。値の取得も可能です。|

### Folderオブジェクト

|プロパティ|説明|
|-|-|
|Attributes|ファイルまたはフォルダの属性を設定します。値の取得も可能です。属性によっては、値の取得のみ可能な場合もあります。|
|DateCreated|指定されたファイルまたはフォルダの作成された日付と時刻を返します。値の取得のみ可能です。|
|DateLastAccessed|指定されたファイルまたはフォルダが最後にアクセスされたときの日付と時刻を返します。値の取得のみ可能です。|
|DateLastModified|指定されたファイルまたはフォルダが最後に更新されたときの日付と時刻を返します。値の取得のみ可能です。|
|Drive|指定されたファイルまたはフォルダが格納されているドライブの名前を返します。値の取得のみ可能です。|
|Files|指定されたフォルダ内にあるすべてのFileオブジェクトの入ったFilesコレクションを返します。このコレクションには、隠しファイルやシステムファイルの属性を持つFileオブジェクトも含まれます。|
|IsRootFolder|指定されたフォルダがルートフォルダの場合は、真(true)を返します。ルートフォルダでなければ、偽(false)を返します。|
|Name|指定されたファイルまたはフォルダの名前を設定します。値の取得も可能です。|
|ParentFolder|指定されたファイルまたはフォルダが格納されているフォルダを表すFolderオブジェクトを返します。値の取得のみ可能です。|
|Path|指定されたファイル、フォルダ、またはドライブのパスを返します。|
|ShortName|従来の8.3形式のファイル名が必要なプログラムのために、短いファイル名を返します。|
|ShortPath|従来の8.3形式のファイル名が必要なプログラムのために、短いパス名を返します。|
|Size|ファイルの場合、指定されたファイルのバイト単位のサイズを返します。フォルダの場合、指定されたフォルダ内のすべてのファイルおよびフォルダの合計サイズをバイト単位で返します。|
|SubFolders|指定されたフォルダ内にあるすべてのフォルダの入ったFoldersコレクションを返します。このコレクションには、隠しファイルやシステムファイルの属性を持つフォルダも含まれます。|
|Type|ファイルまたはフォルダの種類に関する情報を返します。たとえば、名前が.TXTの拡張子で終わるファイルの場合なら、"テキスト文書"という文字列が返されます。|

|メソッド|説明|
|-|-|
|Copy|指定したファイルまたはフォルダを別の場所にコピーします。|
|Delete|指定されたファイルまたはフォルダを削除します。|
|Move|指定されたファイルまたはフォルダを別の場所へ移動します。|
|OpenAsTextStream|指定したファイルを開き、開いたファイルの読み取り、または追加書き込みに使用できるTextStreamオブジェクトを返します。|

### Fileオブジェクト

|プロパティ|説明|
|-|-|
|Attributes|ファイルまたはフォルダの属性を設定します。値の取得も可能です。属性によっては、値の取得のみ可能な場合もあります。|
|DateCreated|指定されたファイルまたはフォルダの作成された日付と時刻を返します。値の取得のみ可能です。|
|DateLastAccessed|指定されたファイルまたはフォルダが最後にアクセスされたときの日付と時刻を返します。値の取得のみ可能です。|
|DateLastModified|指定されたファイルまたはフォルダが最後に更新されたときの日付と時刻を返します。値の取得のみ可能です。|
|Drive|指定されたファイルまたはフォルダが格納されているドライブの名前を返します。値の取得のみ可能です。|
|Name|指定されたファイルまたはフォルダの名前を設定します。値の取得も可能です。|
|ParentFolder|指定されたファイルまたはフォルダが格納されているフォルダを表すFolderオブジェクトを返します。値の取得のみ可能です。|
|Path|指定されたファイル、フォルダ、またはドライブのパスを返します。|
|ShortName|従来の8.3形式のファイル名が必要なプログラムのために、短いファイル名を返します。|
|ShortPath|従来の8.3形式のファイル名が必要なプログラムのために、短いパス名を返します。|
|Size|ファイルの場合、指定されたファイルのバイト単位のサイズを返します。フォルダの場合、指定されたフォルダ内のすべてのファイルおよびフォルダの合計サイズをバイト単位で返します。|
|Type|ファイルまたはフォルダの種類に関する情報を返します。たとえば、名前が.TXTの拡張子で終わるファイルの場合なら、"テキスト文書"という文字列が返されます。|

|メソッド|説明|
|-|-|
|Copy|指定したファイルまたはフォルダを別の場所にコピーします。|
|Delete|指定されたファイルまたはフォルダを削除します。|
|Move|指定されたファイルまたはフォルダを別の場所へ移動します。|
|OpenAsTextStream|指定したファイルを開き、開いたファイルの読み取り、または追加書き込みに使用できるTextStreamオブジェクトを返します。|

### TextStreamオブジェクト

|プロパティ|説明|
|-|-|
|AtEndOfLine|TextStreamファイル内でファイルポインタが行末(EOL)の直前に置かれている場合に真(true)を返します。それ以外の場合は、偽(false)を返します。値の取得のみ可能です。|
|AtEndOfStream|TextStreamファイル内でファイルポインタがファイルの最後に置かれている場合に真(true)を返します。それ以外の場合は、偽(false)を返します。値の取得のみ可能です。|
|Column|TextStreamファイル内での現在の文字位置のカラム番号を返します。値の取得のみ可能です。|
|Line|TextStreamファイル内での現在の行番号を返します。値の取得のみ可能です。|

|メソッド|説明|
|-|-|
|Close|開いた状態のTextStreamファイルを閉じます。|
|Read|TextStreamファイルから指定された文字数を読み込み、その結果の文字列を返します。|
|ReadAll|TextStreamファイル全体を読み込み、その結果の文字列を返します。|
|ReadLine|TextStreamファイルから1行(改行文字を除く)を読み込み、その結果の文字列を返します。|
|Skip|TextStreamファイルを読み込むときに指定された数の文字数をスキップします。|
|SkipLine|TextStreamファイルを読み込むときに次の行をスキップします。|
|Write|指定した文字列をTextStreamファイルに書き込みます。|
|WriteBlankLines|指定された数の改行文字をTextStreamファイルに書き込みます。|
|WriteLine|指定した文字列と改行文字をTextStreamファイルに書き込みます。|

### FileSystemObjectオブジェクトの使用例

指定フォルダ直下のサブフォルダとファイルを一覧出力

```vb
Sub フォルダとファイル一覧取得()
　　Dim objFSO As FileSystemObject
　　Dim objFolder As Folder
　　Dim objFolderSub As Folder
　　Dim objFile As File
　　Dim strDir As String
　　Dim i As Long
　　
　　strDir = "フォルダをフルパスで指定"
　　Set objFSO = New FileSystemObject
　　If Not objFSO.FolderExists(strDir) Then
　　　　MsgBox ("指定のフォルダは存在しません")
　　　　Exit Sub
　　End If
　　i = 2 'シートの2行目から出力
　　
　　'サブフォルダ一覧
　　Set objFolder = objFSO.GetFolder(strDir)
　　For Each objFolderSub In objFolder.SubFolders
　　　　Cells(i, 2) = objFolderSub.Name
　　　　i = i + 1
　　Next
　　'ファイル一覧
　　For Each objFile In objFolder.Files
　　　　With objFile
　　　　　　Cells(i, 2) = .Name
　　　　　　Cells(i, 3) = .Size
　　　　　　Cells(i, 4) = .DateLastModified
　　　　　　i = i + 1
　　　　End With
　　Next
　　
　　Set objFSO = Nothing
　　Set objFolder = Nothing
　　Set objFolderSub = Nothing
End Sub
```

テキストファイルの読み込みイミディエイトに出力

```vb
Sub テキストファイルの読み込み()
　　Dim objFSO As New FileSystemObject
　　Dim inTS As TextStream
　　Dim strFile As String
　　Dim strText As String
　
　　strFile = "C:\excel-ubara\xcopy_d.bat"
　　Set objFSO = New FileSystemObject
　　If Not objFSO.FileExists(strFile) Then
　　　　MsgBox ("指定のファイルは存在しません")
　　　　Exit Sub
　　End If
　　Set inTS = objFSO.OpenTextFile(strFile, ForReading)
　　strText = inTS.ReadAll
　　Debug.Print strText
End Sub
```
