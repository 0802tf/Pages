# Java Swing

## フレーム

### 基本構文

JFrameを継承したクラスをつくり、コンストラクタにcomponent処理を記述する

```Java
class Class extends JFrame{ // JFrameクラスを継承する
 public static void main(String args[]) {
  Class frame = new Class("タイトル"); // フレームを表示
  frame.setVisible(true);
 }

 Class(String title) { // コンストラクタ
  setTitle(title); // タイトルを設定
  setSize(幅, 高さ); // サイズを設定
  setLocation(左端のx座標, 上端のy座標); // 位置を設定
  setBounds(左端のx座標, 上端のy座標, 幅, 高さ); // 位置・サイズをまとめて設定
  setLocationRelativeTo(null); // 画面中央に表示
  setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); // 閉じる処理
  getContentPane().setBackground(Color.[色]); // 背景色を設定
  getContentPane().setLayout(layout); // レイアウトを設定(デフォルトはBorderLayout)
  
  // 各component処理
  
  getContentPane().add(component); // 各componentを追加
 }
}
```

## レイアウト

### BorderLayout

* 領域を5つの区画に分けて管理するレイアウトマネーマネージャー
* 1つの区画には1つのcomponentしか配置できない
* 配置される位置によってcomponentのサイズが自動的に変更される

```Java
getContentPane().setLayout(new BorderLayout());
getContentPane().add(component, BorderLayout.[位置]);
```

|絶対指定|相対指定|位置|
|-|-|-|
|`BorderLayout.CENTER`|`BorderLayout.CENTER`|中央(デフォルト)|
|`BorderLayout.NORTH`|`BorderLayout.PAGE_START`|上|
|`BorderLayout.SOUTH`|`BorderLayout.PAGE_END`|下|
|`BorderLayout.WEST`|`BorderLayout.LINE_START`|左|
|`BorderLayout.EAST`|`BorderLayout.LINE_END`|右|

### FlowLayout

* 左から順番に右に向かってcomponentを追加していくレイアウトマネージャー
* 右側に追加できなくなった場合には左に戻って1つ下の位置に追加される
* 追加されるcomponentのサイズは変更されない

```Java
getContentPane().setLayout(new FlowLayout(FlowLayout.[位置]));
getContentPane().add(component);
```

|値|位置|
|-|-|
|`FlowLayout.LEFT`|左詰め|
|`FlowLayout.CENTER`|中央(デフォルト)|
|`FlowLayout.RIGHT`|右詰め|
|`FlowLayout.LEADING`|左詰め|
|`FlowLayout.TRAILING`|右詰め|

## アイコン

ファイル名を指定してImageIconオブジェクトを作成

```Java
ImageIcon icon = new ImageIcon("画像ファイルパス");
```

URLで画像ファイルを指定してImageIconオブジェクトを作成

```Java
ImageIcon icon = new ImageIcon(new URL("URL"));
```

フレームの左上のアイコンを設定

```Java
setIconImage(icon.getImage());
```

## 色

|[色]|説明|[色]|説明|
|-|-|-|-|
|BLACK|黒|MAGENTA|マゼンタ|
|BLUE|青|ORANGE|オレンジ|
|CYAN|シアン|PINK|ピンク|
|DARK_GRAY|ダークグレー|RED|赤|
|GRAY|グレー|WHITE|白|
|GREEN|緑|YELLOW|黄|
|LIGHT_GRAY|ライトグレー|||

RGB値とアルファ値(透明度)をそれぞれ0-255で指定して色を作成

```Java
Color color = new Color(r, g, b, a)
```

## フォント

フォント名には物理フォント・論理フォントともに使用可能

```Java
Font font = new Font("フォント名", Font.[スタイル], サイズ);
```

スタイル
|値|説明|
|-|-|
|`Font.PLAIN`|通常|
|`Font.BOLD`|太字|
|`Font.ITALIC`|斜体|
|`Font.BOLD\|Font.ITALIC`|太字かつ斜体|

## 枠線

LineBorder

```Java
Border border = new LineBorder(Color color, int thickness, boolean roundedCorners)
```

BevelBorder(`bevelType`: `BevelBorder.LOWERED`(くぼみ) / `BevelBorder.RAISED`(浮き出し))

```Java
Border border = new BevelBorder(int bevelType, Color highlight, Color shadow)
```

EtchedBorder(`etchType`: `EtchedBorder.LOWERED`(彫り込み) / `EtchedBorder.RAISED`(浮き彫り))

```Java
Border border = new EtchedBorder(int etchType, Color highlight, Color shadow)
```

## パネル

```Java
JPanel panel = new JPanel();
```

|操作|記述|デフォルト|
|-|-|-|
|パネルにcomponentを追加|`add(component)`||
|レイアウトを設定|`setLayout(layout)`|`FlowLayout`|
|背景色を設定|`setBackground(Color.[色])`||
|透明・非透明を設定|`setOpaque(false)`|`true`(非透明)|
|サイズをピクセルで設定|`setPreferredSize(new Dimension(幅, 高さ))`|`null`(適切なサイズ)|
|枠線を設定|`setBorder(border)`||

## component

ラベル

```Java
JLabel label = new JLabel(String text, Icon icon, int horizontalAlignment);
```

ボタン

```Java
JButton button = new JButton(String text, Icon icon);
```

チェックボックス

```Java
JCheckBox checkBox = new JCheckBox(String text, Icon icon, boolean selected);
```

ラジオボタン

```Java
JRadioButton radioButton = new JRadioButton(String text, Icon icon, boolean selected);
```

テキストフィールド

```Java
JTextField textField = new JTextField(String text, int columns);
```

パスワードフィールド

```Java
JPasswordField passwordField = new JPasswordField(String text, int columns);
```

テキストエリア

```Java
JTextArea textArea = new JTextArea(String text, int rows, int columns)
```

## プロパティ

setXxxx()で設定、対応するgetXxxx(boolean型はisXxxx)で取得
|操作|記述|デフォルト|
|-|-|-|
|表示する(初期値の)文字列を設定|`setText("テキスト")`||
|文字色を設定|`setForeground(Color.[色])`||
|背景色を設定|`setBackground(Color.[色])`||
|透明・非透明を設定(JButton以外)|`setOpaque(true)`|`false`(透明)|
|フォントを設定|`setFont(font)`||
|サイズをピクセルで設定|`setPreferredSize(new Dimension(幅, 高さ))`|`null`|
|枠線を設定|`setBorder(border)`||
|水平位置を設定|`setHorizontalAlignment(JLabel.[位置])`|`LEADING`(文字列),`CENTER`(画像)|
|垂直位置を設定|`setVerticalAlignment(JLabel.[位置])`||
|画像を設定|`setIcon(icon)`||
|画像に対する文字列の水平位置を設定|`setHorizontalTextPosition(JLabel.[位置])`|`TRAILING`|
|画像に対する文字列の垂直位置を設定|`setVerticalTextPosition(JLabel.[位置])`|`CENTER`|
|画像と文字列の間隔を設定|`setIconTextGap(ピクセル)`|4|
|透明・非透明を設定(JButtonのみ)|`setContentAreaFilled(false)`|`true`(非透明)|
|余白を設定|`setMargin(new Insets(上, 左, 下, 右))`||
|枠線あり・なしを設定|`setBorderPainted(false)`|`true`(枠線あり)|
|有効・無効を設定|`setEnabled(false)`|`true`(有効)|
|ボタンがロールオーバーされた時に表示する画像を設定|`setRolloverIcon(icon)`||
|ボタンが押された時に表示する画像を設定|`setPressedIcon(icon)`||
|キーボードニーモニックを設定|`setMnemonic(KeyEvent.VK_O)`||
|選択・非選択を設定|`setSelected(true)`||
|選択された状態のボタンのアイコンを設定|`setSelectedIcon(icon)`||
|列数(文字数)を設定|`setColumns(列数)`|0|
|キャレットの位置を設定|`setCaretPosition(位置)`|0(先頭)|
|キャレットの色を設定|`setCaretColor(Color.[色])`||
|編集可能・不可を設定|`setEditable(false)`|`true`(可能)|
|ツールチップを設定|`setToolTipText("テキスト")`||
|行数を設定|`setRows(行数)`||
|折り返しの設定|`setLineWrap(true)`|`false`|
|単語単位で折り返されるように設定|`setWrapStyleWord(true)`|`false`|
|タブ文字数を設定|`setTabSize(文字数)`|8|
|テキストの末尾に文字列を追加|`append("文字列")`||
|文字列を挿入|`insert("文字列", 挿入位置)`||
|文字列を置換|`replaceRange("置換文字列", 開始位置, 終了位置)`||
|JPasswordFieldにエコー文字を設定(`(char)0`で入力文字をそのまま表示)|`setEchoChar('エコー文字');`||

水平位置・垂直位置に指定できる値
|[位置]|説明|
|-|-|
|`LEFT`|左詰め|
|`CENTER`|中央|
|`RIGHT`|右詰め|
|`LEADING`|先頭|
|`TRAILING`|末|
|`TOP`|上詰め|
|`CENTER`|中央|
|`BOTTOM`|下詰め|

ボタンをプログラムからクリックする

```Java
button.doClick([押下時間(ms)]);
```

ラジオボタンをグループにまとめる(グループ内のラジオボタンは1つしか選択状態に出来なくなる)

```Java
ButtonGroup buttonGroup = new ButtonGroup();
buttonGroup.add(radioButton); // ラジオボタンをボタングループに追加
buttonGroup.remove(radioButton); // ラジオボタンをボタングループから削除
buttonGroup.clearSelection(); // ボタングループの全ての選択状態を解除する
```

入力されたパスワードを取得(戻り値はchar型の配列)

```Java
char[] password = passwordField.getPassword();
```

## スクロール

各componentにスクロールを追加<br>
JScrollPaneのコンストラクタ引数にcomponentを渡し、JScrollPaneをフレームに追加する

```Java
JScrollPane scrollPane = new JScrollPane(component);
getContentPane().add(scrollPane);
```

## イベント

### イベントの基本構文

* 対象のcomponentにリスナーを登録(add)
* リスナーインターフェースをimplementしたクラスをつくる
* 実装したメソッドの中でイベント発生時に行う処理を記述

```Java
class Class extends JFrame implements ActionListener{

  public static void main(String[] args){
    Class class = new Class("タイトル");
    class.setVisible(true);
  }

  Class(String title){
    setTitle(title);
    setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    JButton button = new JButton("button");
    button.addActionListener(this); //アクションリスナーの登録
    button.setActionCommand("button"); //アクションコマンドを設定
    getContentPane().add(button);
  }

  public void actionPerformed(ActionEvent e){
    String cmd = e.getActionCommand(); //アクションコマンドを取得
    if (cmd.equals("button")){
      //buttonが押された時の処理
    }
  }
}
```

### ActionEvent

```Java
public class Listener implements ActionListener{

  component.addActionListener(this);
  component.setActionCommand("コマンド文字列"); //アクションコマンドを設定

  public void actionPerformed(ActionEvent e){
    /* 処理したい内容をここに記述する */
  }
}
```

ActionEventのメソッド

* `getActionCommand()`: `setActionCommand`で設定したコマンド文字列を取得
* `getWhen()`: イベントの発生時刻をタイムスタンプ値で取得

### MouseEvent

```Java
public class Listener implements MouseListener{

  componennt.addMouseListener(this);

  public void mouseClicked(MouseEvent e){
    /* コンポーネント上でマウスボタンをクリック (押してから離す) したときに呼び出される処理 */
  }

  public void mouseEntered(MouseEvent e){
    /* コンポーネントにマウスが入ると呼び出される処理 */
  }

  public void mouseExited(MouseEvent e){
    /* コンポーネントからマウスが出ると呼び出される処理 */
  }

  public void mousePressed(MouseEvent e){
    /* コンポーネント上でマウスボタンが押されると呼び出される処理 */
  }

  public void mouseReleased(MouseEvent e){
    /* コンポーネント上でマウスボタンが離されると呼び出される処理 */
  }
}
```

MouseEventのメソッド

* `getClickCount()`: マウスクリック数を取得

### WindowEvent

```Java
public class Listener implements WindowListener{

  component.addWindowListener(this);

  public void windowOpened(WindowEvent e){
    /* ウィンドウが最初に可視になったときに呼び出される処理 */
  }

  public void windowClosing(WindowEvent e){
    /* ユーザがウィンドウのシステムメニューでウィンドウを閉じようとしたときに呼び出される処理 */
  }

  public void windowClosed(WindowEvent e){
    /* ウィンドウに対するdisposeの呼び出しの結果として、ウィンドウがクローズされたときに呼び出される処理 */
  }

  public void windowIconified(WindowEvent e){
    /* ウィンドウが通常の状態から最小化された状態に変更されたときに呼び出される処理 */
  }

  public void windowDeiconified(WindowEvent e){
    /* ウィンドウが最小化された状態から通常の状態に変更されたときに呼び出される処理 */
  }

  public void windowActivated(WindowEvent e){
    /* ウィンドウがアクティブウィンドウに設定されると呼び出される処理 */
  }

  public void windowDeactivated(WindowEvent e){
    /* ウィンドウがアクティブウィンドウでなくなったときに呼び出される処理 */
  }
}
```

WindowEventのメソッド

* `getWindow()`: イベントの発生元ウィンドウを取得

### ChangeEvent

```Java
public class Listener implements ChangeListener{

  component.addChangeListener(this);

  public stateChanged(ChangeEvent e){
    /* 処理したい内容をここに記述する */
  }
}
```

## ダイアログ

### メッセージダイアログ

```Java
JOptionPane.showMessageDialog(parentComponent, "メッセージ", "タイトル", messageType, icon);
```

引数`parentComponent`には親フレームを指定(なければ`null`)

`messageType`に指定できる値
|値|ダイアログの種類|
|-|-|
|`JOptionPane.ERROR_MESSAGE`|エラーメッセージ|
|`JOptionPane.INFORMATION_MESSAGE`|情報メッセージ|
|`JOptionPane.WARNING_MESSAGE`|警告メッセージ|
|`JOptionPane.QUESTION_MESSAGE`|質問メッセージ|
|`JOptionPane.PLAIN_MESSAGE`|アイコン非表示|

### 選択ダイアログ

```Java
int option = JOptionPane.showConfirmDialog(parentComponent, "メッセージ", "タイトル", optionType, messageType, icon);
```

`optionType`に指定できる値
|値|実際の値|表示されるボタン|
|-|-|-|
|`JOptionPane.YES_NO_OPTION`|0|YES/NO|
|`JOptionPane.YES_NO_CANCEL_OPTION`|1|YES/NO/CANCEL|
|`JOptionPane.OK_CANCEL_OPTION`|2|OK/CANCEL|

戻り値
|値|実際の値|
|-|-|
|`JOptionPane.YES_OPTION`|0|
|`JOptionPane.NO_OPTION`|1|
|`JOptionPane.CANCEL_OPTION`|2|
|`JOptionPane.OK_OPTION`|0|

### 入力ダイアログ

初期値を設定した入力ダイアログ

```Java
String value = JOptionPane.showInputDialog(parentComponent, "メッセージ", "初期値");
```

タイトルとメッセージタイプを指定した入力ダイアログ

```Java
String value = JOptionPane.showInputDialog(parentComponent, "メッセージ", "タイトル", messageType);
```

戻り値としてユーザが入力した文字列、取り消した場合は`null`が返される

### 複数の値から選択可能なダイアログ

```Java
Object value = JOptionPane.showInputDialog(parentComponent, "メッセージ", "タイトル", messageType, icon, selectionValues, initialSelectionValue);
```

* 6番目の引数`selectionValues`にはユーザに選択してもらう値の集合を表す配列を指定する(配列はObject型だが通常はString型の配列を指定すればよい)
* 7番目の引数`initialSelectionValue`には初期値として表示する値を指定する(この値は6番目で指定した選択可能な値の中の1つを指定)
* 戻り値としてユーザが選択した値を表すObject型の値(Stringの場合は変換する必要あり)、取り消した場合は`null`が返される

### カスタムボタンの選択ダイアログ

```Java
int value = JOptionPane.showOptionDialog(parentComponent, "メッセージ", "タイトル", optionType, messageType, icon, options, initialValue);
```

* 7番目の引数`options`にはボタンとして表示される値の集合を表す配列を指定する。配列の数だけのボタンが表示される(配列はObject型だが通常はString型の配列を指定すればよい)
* 8番目の引数`initialValue`にはデフォルトの状態で選択されているボタンを指定する(この値は7番目で指定した選択可能な値の中の1つを指定)
* 戻り値としてユーザが選択したボタンを表すint型の値(ボタンが表示された順に0,1,2...)が返される
* 「×」ボタンでダイアログが閉じられた場合には`JOptionPane.CLOSED_OPTION`(実際の値は-1)が返される

## ファイル選択ダイアログ

JFileChooserオブジェクトの生成

```Java
JFileChooser filechooser = new JFileChooser();
```

初期状態で表示されるパスを指定

```Java
JFileChooser filechooser = new JFileChooser("ファイルパス");
JFileChooser filechooser = new JFileChooser(new File("ファイルパス"));
```

「ファイルを開く」ダイアログ

```Java
int selected = filechooser.showOpenDialog(parentComponent);
```

「ファイルを保存する」ダイアログ

```Java
int selected = filechooser.showSaveDialog(parentComponent);
```

カスタムボタンのダイアログ(Approveボタンに表示される文字列を指定)

```Java
int selected = filechooser.showDialog(parentComponent, "ボタン表示文字列");
```

引数`parentComponent`には親フレームを指定(なければ`null`)

戻り値(`selected`に入る値)
|定義値|実際の値|ボタンの種類|
|-|-|-|
|`JFileChooser.APPROVE_OPTION`|0|「開く」ボタンが選択された場合|
|`JFileChooser.CANCEL_OPTION`|1|「取消し」「×」ボタンが選択された場合|
|`JFileCHooser.ERROR_OPTION`|-1|エラー発生時|

選択されたファイルを取得する

```Java
File file = filechooser.getSelectedFile();
```

|操作|記述|デフォルト|
|-|-|-|
|ダイアログのタイトルを設定する|`setDialogTitle("タイトル")`||
|Approveボタンに表示される文字列を設定する|`setApproveButtonText("ボタン文字列")`||
|Approveボタンに表示されるヒントを設定する|`setApproveButtonToolTipText("文字列")`||
|隠しファイルを表示する|`setFileHidingEnabled(false)`|`true`(表示しない)|
|複数ファイルを選択可能に設定する|`setMultiSelectionEnabled(true)`|`false`|
|「すべてのファイル」フィルタを使用しないように設定する|`setAcceptAllFileFilterUsed(false)`|`true`(使用する)|

選択モードを設定する

```Java
filechooser.setFileSelectionMode([モード]);
```

[モード]に指定できる値
|値|選択可能な種類|
|-|-|
|`JFileChooser.FILES_ONLY`|ファイルのみ|
|`JFileChooser.DIRECTORIES_ONLY`|ディレクトリのみ|
|`JFileChooser.FILES_AND_DIRECTORIES`|ファイルとディレクトリの両方|

複数選択が許可されるように設定されている場合に、選択されたファイルのリストを配列で返す

```Java
File[] files = filechooser.getSelectedFiles();
```

拡張子フィルタを追加する(第2引数以降の"拡張子"は可変長配列)

```Java
FileFilter filter = new FileNameExtensionFilter("フィルタの説明", "拡張子",...);
filechooser.addChoosableFileFilter(filter);
```

### カスタムフィルタを追加する

FileFilterクラスを継承したクラスをつくり、2つのメソッドを定義する

```Java
public class Filter extends FileFilter{

  public boolean accept(File f){
    // 引数で渡されてきたFileオブジェクトに対して、表示するかどうかを判別して表示する場合には「true」、表示しない場合には「false」を返すメソッドを定義する
  }

  public String getDescription(){
    // 作成したフィルタの簡単な説明を返すメソッドを定義する
  }
}
```

作成したFilterを追加する

```Java
filechooser.addChoosableFileFilter(new Filter());
```

## カラーチューザー

カラーチューザーを作成(初期色が白)

```Java
JColorChooser colorchooser = new JColorChooser();
```

指定された初期色のカラーチューザーを作成

```Java
JColorChooser colorchooser = new JColorChooser(Color.[色]);
```

|記述|説明|
|-|-|
|選択されている色を設定する|`setColor(Color.[色])`|
|選択されている色をRGB値で指定する|`setColor(r, g, b)`|
|カラーチューザーのサイズを指定する|`setPreferredSize(new Dimension(幅, 高さ))`|

選択した色を取得する

```Java
Color color = colorchooser.getColor();
```

カラーチューザーをダイアログとして表示する

```Java
Color color = colorchooser.showDialog(parentComponent, "タイトル", Color.[初期色]);
```

* 引数`parentComponent`には親フレームを指定(なければ`null`)
* 戻り値として選択した色を表すColorオブジェクトが返される(「取消し」「×」ボタンでダイアログが閉じられた場合は`null`が返される)

## タイマー

Timerクラスの作成

```Java
Timer timer = new Timer([時間(ms)], actionListener);
```

* 1番目の引数で指定した間隔の時間ごとにActionEventを発行する
* 2番目の引数`actionListener`にはActionEventを受け取るリスナーを指定

メソッド
|記述|説明|
|-|-|
|`start()`|タイマーを開始する|
|`stop()`|タイマーを停止する|
|`setInitialDelay([時間(ms)])`|初期遅延時間を設定する|
|`setDelay([時間(ms)])`|遅延時間を設定する|
|`setRepeats(false)`|アクションイベントを1回だけ発行しタイマーを停止する|
