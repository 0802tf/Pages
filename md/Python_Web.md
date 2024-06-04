# Python Web

## urllib.requestモジュール

インポート

```py
import urllib.request
```

URLにアクセスする(単純なGETリクエスト)

```py
response = urllib.request.urlopen('URL文字列')
```

`Request`オブジェクトを作成し`urlopen`の引数に渡す(`url`以外は名前付き引数で指定)

```py
request = urllib.request.Request('URL文字列',...)
response = urllib.request.urlopen(request)
```

|引数|説明|デフォルト|
|-|-|-|
|`url`|読み込み対象のURL(必須)||
|`data`|リクエストボディを表すバイト列(文字列はエンコードする必要がある)|`None`|
|`headers`|リクエストヘッダを辞書で指定|`{}`|
|`method`|使用するHTTPリクエストメソッドを表す文字列|`None`|

戻り値は`http.client.HTTPResponse`オブジェクト
|`HTTPResponse`の属性|説明|
|-|-|
|`read()`|レスポンス本体を読み取りバイト配列として取得する|
|`read([バイト数])`|レスポンス本体を指定のバイト数まで読み出して返す|
|`getheaders()`|レスポンスヘッダ(`(ヘッダ,値)`のタプルからなるリストを返す)|
|`version`|サーバが使用したHTTPプロトコルバージョン|
|`url`|取得されたリソースのURL|
|`status`|サーバから返されるステータスコード|
|`reason`|サーバから返される応答の理由文|
|`closed`|ストリームが閉じている場合`True`を返す|

読み込み対象のURLをファイルに保存する

```py
urllib.request.urlretrieve('URL文字列', '保存先のパス')
```

## urllib.parseモジュール

インポート

```py
import urllib.parse
```

URLを解析して構成要素に分解する(名前付きタプルを返す)

```py
urllib.parse.urlparse('scheme://netloc/path;parameters?query#fragment')
# ParseResult(scheme='scheme', netloc='netloc', path='/path;parameters', params='', query='query', fragment='fragment')
```

|属性|インデックス|値|デフォルト|
|-|-|-|-|
|`scheme`|0|URLスキーム||
|`netloc`|1|ネットワーク上の位置|`''`|
|`path`|2|階層的パス|`''`|
|`params`|3|最後のパス要素に対するパラメータ|`''`|
|`query`|4|クエリ要素|`''`|
|`fragment`|5|フラグメント識別子|`''`|
|`username`||ユーザ名|`None`|
|`password`||パスワード|`None`|
|`hostname`||ホスト名(小文字)|`None`|
|`port`||ポート番号|`None`|

|操作|記述|
|-|-|
|クエリパラメータを辞書に変換(辞書の値はリストで、その中に値がURLデコードされた文字列として格納される)|`urllib.parse.parse_qs('クエリ文字列')`|
|クエリパラメータをリストに変換(リストの要素はクエリ文字列のkeyとvalueのペアのタプルで、URLデコードされている)|`urllib.parse.parse_qsl('クエリ文字列')`|
|辞書からクエリパラメータを作成|`urllib.parse.urlencode(dict)`|
|リストからクエリパラメータを作成(リストの要素はクエリ文字列のkeyとvalueのペアのタプルである必要がある)|`urllib.parse.urlencode(list)`|
|空白を`%20`に変換する(デフォルトは`urllib.parse.quote_plus`で空白を`+`に変換)|`urllib.parse.urlencode(dict, quote_via=urllib.parse.quote)`|
|URLエンコードしない文字を指定する(半角文字,数字,`-`,`_`,`.`以外)|`urllib.parse.urlencode(dict, safe='文字')`|
|辞書の値がリストの時にリスト内の要素に対して処理する(そのまま渡すとリストの括弧`[]`などを含んだ文字列に変換されてしまう)|`urllib.parse.urlencode(list, doseq=True)`|

## urllib.errorモジュール(例外処理)

インポート

```py
import urllib.error
```

`urllib.request`によって投げられる例外

|エラーオブジェクト|説明|親クラス|
|-|-|-|
|`urllib.error.URLError`|HTTP通信に失敗した場合に発生する例外|`OSError`|
|`urllib.error.HTTPError`|HTTPステータスコードが400番台または500番台で返ってきた場合に発生する例外|`URLError`|

|属性|説明|
|-|-|
|`reason`|このエラーの理由を表す文字列|
|`code`|HTTPステータスコード(`HTTPError`のみ)|
|`headers`|このエラーの原因となったリクエストのレスポンスヘッダ(`HTTPError`のみ)|

※`URLError`と`HTTPError`を両方とも例外処理する場合は`HTTPError`を先にexceptするように記述する必要がある

## エンコード・デコード

デフォルトの文字コードを調べる(Python標準は`utf-8`)

```py
import sys
sys.getdefaultencoding()
```

### エンコード(符号化)

文字列をバイト列に変換する(引数なしの場合はデフォルトの文字コード)

```py
data = text.encode('文字コード')
```

### デコード(復号)

バイト列を文字列に変換する(引数なしの場合はデフォルトの文字コード)

```py
text = data.decode('文字コード')
```

## jsonモジュール

インポート

```py
import json
```

JSON文字列を辞書型に変換する

```py
dict = json.loads('JSON文字列')
```

辞書型の値をJSON文字列に変換する

```py
dict = {'キー': '値',...}
str = json.dumps(dict)
```

JSONファイルを読み込み辞書型に変換する

```py
with open('JSONファイルパス', 'r') as file:
    dict = json.load(file)
```

辞書型の値をJSONに変換してファイルに出力する。第1引数には変換するデータ、第2引数には出力先のファイル、整形する場合は第3引数にインデントを指定する。

```py
dict = {'キー': '値',...}
with open('JSONファイルパス', 'w') as file:
    json.dump(dict, file, indent=インデント)
```

## requestsモジュール

インストール

```bash
pip install requests
```

インポート

```py
import requests
```

HTTPリクエストを送信する(戻り値は`Response`オブジェクト)

```py
response = requests.request('HTTPメソッド文字列', 'URL文字列',...)
```

|HTTPメソッド|対応するメソッド|説明|
|-|-|-|
|`get`|`requests.get('URL文字列',...)`|サーバから情報を取得する|
|`post`|`requests.post('URL文字列',...)`|サーバへ情報を登録する|
|`put`|`requests.put('URL文字列',...)`|サーバの情報を更新する|
|`delete`|`requests.delete('URL文字列',...)`|サーバの情報を削除する|

各メソッドに使用できる引数(`url`以外は名前付き引数で指定)
|引数|説明|
|-|-|
|`url`|読み込み対象のURL文字列(必須)|
|`headers`|リクエストヘッダとして送信する内容を辞書で指定|
|`params`|URLのクエリパラメータを辞書で指定|
|`data`|リクエストボディとして送信する内容を辞書で指定|
|`cookies`|クッキーとして送信する内容を辞書で指定|
|`files`|ファイルを辞書で指定|
|`timeout`|リクエストのタイムアウト時間|
|`allow_redirects`|リダイレクトを追跡するか|

戻り値としてサーバからの応答データを表す`Response`オブジェクトが返される
|`Response`の属性|説明|
|-|-|
|`status_code`|ステータスコード|
|`headers`|レスポンスヘッダを辞書形式で格納したもの|
|`content`|レスポンスの本体のバイナリデータ(バイト列)|
|`text`|レスポンスの本体(`content`)を文字列にデコードしたもの|
|`json()`|JSON文字列のデータを辞書形式に変換する|
|`cookies`|クッキーの内容|
|`url`|リクエストしたURL(リダイレクトが発生した場合はリダイレクト先のURL)|
|`encoding`|`content`を`text`にデコードする際に使用したエンコーディング|
|`apparent_encoding`|見た目の文字エンコーディング(`encoding`の値と`apparent_encoding`の値が異なることもある)|
|`raw`|生のデータ|
|`history`|GETでリクエストしたURLがリダイレクトされた場合に、リダイレクトされた結果を示す`Response`インスタンスを古いものから順に並べたリスト|

## BeautifulSoup

インストール

```bash
pip install beautifulsoup4
```

インポート

```py
from bs4 import BeautifulSoup
```

BeautifulSoupオブジェクトの生成(デフォルトの`html.parser`を使用)

```py
soup = BeautifulSoup('HTML/XML文字列')
```

パーサーを指定

```py
soup = BeautifulSoup('HTML/XML文字列', 'パーサー文字列')
```

|パーサー|引数での指定方法|特徴|
|-|-|-|
|Python’s html.parser|`html.parser`|追加ライブラリが不要|
|lxml’s HTML parser|`lxml`|高速に処理可|
|lxml’s XML parser|`xml`|XMLに対応し、高速に処理可|
|html5lib|`html5lib`|正しくHTML5を処理可|

### タグの取得方法

指定したタグの先頭の1つの要素を取得する(戻り値は`Tag`オブジェクト。タグがそのHTMLに存在しない場合は`None`が返される)

```py
tag = soup.find('タグ名')
tag = soup.タグ名  #<a>タグ: soup.a
```

指定したタグの要素をすべて取得する(戻り値は一致した要素を表す`Tag`オブジェクトのリスト)

```py
tags = soup.find_all('タグ名')
```

指定の属性に一致する要素をすべて取得する(※class属性を「属性='値'」形式で指定する場合は、`class`はPythonでは予約語のため`class_`とする)

```py
tags = soup.find_all(属性='値',...)
tags = soup.find_all(attrs={'属性': '値',...})
```

指定のタグ名、属性に一致する要素をすべて取得する

```py
tags = soup.find_all('タグ名', 属性='値',...)
tags = soup.find_all('タグ名', attrs={'属性': '値',...})
```

CSSセレクタを指定してタグの要素を取得する(戻り値は一致した要素を表す`Tag`オブジェクトのリスト)

```py
tags = soup.select('CSSセレクタ文字列')
```

### 正規表現を使ったタグの取得方法

`re`モジュールのインポート

```py
import re
```

正規表現に一致するタグをすべて取得する

```py
tags = soup.find_all(re.compile('正規表現'))
```

属性の値が正規表現に一致するタグをすべて取得する

```py
tags = soup.find_all(属性=re.compile('正規表現'))
```

タグの中の文字列が正規表現に一致するタグをすべて取得する

```py
tags = soup.find_all(text=re.compile('正規表現'))
```

### タグの情報の取得・操作

タグを新規に作成する

```py
new_tag = soup.new_tag('タグ名', 属性="値",...)
```

`Tag`オブジェクト(=`tag`)のプロパティ(`new_tag`は別の`Tag`オブジェクト)

|プロパティ|説明|
|-|-|
|`tag.name`|タグ名を取得|
|`tag.get('属性')`<br>`tag['属性']`|タグの指定の属性の値を取得|
|`tag.text`<br>`tag.get_text()`|取得したタグ内のテキストを取得(子要素のテキストも含む)|
|`tag.string`|取得したタグ内のテキストを取得(子要素を含まない)|
|`tag.attrs`|タグの属性を辞書形式で取得|
|`tag.contents`|タグの直下の子要素をリスト形式で取得|
|`tag.parent`|親要素のTagオブジェクトを取得|
|`tag.previous_sibling`|直前の兄弟要素のTagオブジェクトを取得|
|`tag.next_sibling`|直後の兄弟要素のTagオブジェクトを取得|
|`tag.find('条件')`<br>`tag.タグ名`|タグ内で指定した条件に一致する最初の子要素のTagオブジェクトを取得|
|`tag.find_all('条件')`|タグ内で指定した条件に一致する全ての子要素のTagオブジェクトをリスト形式で取得|
|`tag.select('CSSセレクタ文字列')`|タグ内で指定したCSSセレクタに一致する全ての子要素のTagオブジェクトをリスト形式で取得|
|`tag.append(new_tag)`|子要素の末尾に追加する|
|`tag.extend([new_tag,...])`|子要素の末尾に複数追加する|
|`tag.insert(i, new_tag)`|i番目の子要素の直前に追加する|
|`tag.insert_before(new_tag)`|この要素の直前に追加する|
|`tag.insert_after(new_tag)`|この要素の直後に追加する|
|`tag.clear()`|この要素の子孫要素を削除する|
|`tag.attrs.clear()`|この要素の全ての属性を削除する|
|`tag.extract()`|この要素をDOMツリーから削除する(削除した要素を返す)|
|`tag.decompose()`|この要素をDOMツリーから削除する|
|`tag.replace_with(new_tag)`|この要素を指定した要素で置き換える|
|`tag.wrap(new_tag)`|この要素を指定した要素で囲む|
|`tag.unwrap()`|この要素(子孫は含まない)をDOMツリーから削除する|
|`tag.prettify()`|この要素を整形したHTML文字列にして返す|
|`tag.encode()`|この要素をUTF8でエンコードされたHTML文字列にして返す|

タグに属性を追加・変更する

```py
tag['属性'] = '値'
tag.attrs['属性'] = '値'
```

タグから属性を削除する

```py
del tag['属性']
del tag.attrs['属性']
```

タグ内の文字列を追加・変更する

```py
tag.string = '値'
```

## Selenium

インストール

```bash
pip install selenium
```

webdriverのインポート

```py
from selenium import webdriver
```

### ブラウザの生成(Chrome)

※ChromeDriverを事前にインストールしておく必要がある

パスを通している場合

```py
driver = webdriver.Chrome()
```

パスを指定する場合

```py
from selenium.webdriver.chrome.service import Service
service = Service(executable_path='ChromeDriverのファイルパス')
driver = webdriver.Chrome(service=service)
```

ヘッドレスモードで起動

```py
from selenium.webdriver.chrome.options import Options
options = Options()
options.add_argument('--headless')
driver = webdriver.Chrome(options=options)
```

### ブラウザ情報の取得・操作

`WebDriver`オブジェクト(=`driver`)のプロパティ
|操作|記述|
|-|-|
|リンクに移動する|`driver.get('URL文字列')`|
|タイトルを取得|`driver.title`|
|現在のURLを取得|`driver.current_url`|
|HTMLソースを取得|`driver.page_source`|
|ウィンドウ位置を取得|`driver.get_window_position()`|
|ウィンドウサイズを取得|`driver.get_window_size()`|
|ブラウザの最大化|`driver.maximize_window()`|
|ブラウザの最小化|`driver.minimize_window()`|
|画面キャプチャを取得(PNG形式)|`driver.save_screenshot('保存するファイルパス')`|
|JavaScriptを実行|`driver.execute_script('JavaScriptコード')`|
|戻る|`driver.back()`|
|進む|`driver.forward()`|
|リロード|`driver.refresh()`|
|cookieを取得|`driver.get_cookie()`|
|現在のウィンドウを閉じる|`driver.close()`|
|全てのウィンドウを閉じる|`driver.quit()`|
|暗黙の待機|`driver.implicitly_wait(秒数)`|

### 要素の取得

種類(`By`オブジェクト)と文字列を指定し、一致する要素の最初の1つを取得(戻り値は`WebElement`オブジェクト)

```py
element = driver.find_element(By.[種類], '検索文字列')
```

種類(`By`オブジェクト)と文字列を指定し、一致する要素を全て取得(戻り値は`WebElement`オブジェクトのリスト)

```py
elements = driver.find_elements(By.[種類], '検索文字列')
```

### Byオブジェクト

インポート

```py
from selenium.webdriver.common.by import By
```

|[種類]|説明|
|-|-|
|`By.ID`|id属性で検索|
|`By.TAG_NAME`|タグ名で検索|
|`By.NAME`|name属性で検索|
|`By.CLASS_NAME`|class属性で検索|
|`By.LINK_TEXT`|リンクテキストで検索|
|`By.PARTIAL_LINK_TEXT`|リンクテキストの部分一致で検索|
|`By.XPATH`|XPathで検索|
|`By.CSS_SELECTOR`|CSSセレクタで検索|

### Web要素情報の取得・操作

`WebElement`オブジェクト(=`element`)のプロパティ
|操作|記述|
|-|-|
|タグ名を取得|`element.tag_name`|
|テキストを取得|`element.text`|
|表示・非表示を取得|`element.is_displayed()`|
|有効・無効を取得|`element.is_enabled()`|
|選択・非選択を取得|`element.is_selected()`|
|属性を取得|`element.get_attribute('属性名')`|
|CSSプロパティの値を取得|`element.value_of_css_property('プロパティ名')`|
|サイズを取得|`element.size['height']`<br>`element.size['width']`|
|位置を取得|`element.location['x']`<br>`element.location['y']`|
|要素をクリックする|`element.click()`|
|要素にテキストを入力する|`element.send_keys('文字列')`|
|要素にキーを入力する|`element.send_keys(Keysオブジェクト, '文字列',...)`|
|値をクリアする|`element.clear()`|
|フォームを送信する|`element.submit()`|

### Keysオブジェクト

インポート

```py
from selenium.webdriver.common.keys import Keys
```

特殊キー
|種類|説明|種類|説明|
|-|-|-|-|
|`Keys.ENTER`|Enterキー|`Keys.ESCAPE`|Escキー|
|`Keys.HOME`|Homeキー|`Keys.INSERT`|Insertキー|
|`Keys.TAB`|Tabキー|`Keys.DELETE`|Deleteキー|
|`Keys.SHIFT`|Shiftキー|`Keys.CONTROL`|Ctrlキー|
|`Keys.ALT`|Altキー|`Keys.COMMAND`|Commandキー(Mac)|
|`Keys.SPACE`|スペースキー|`Keys.BACKSPACE`|Backspaceキー|
|`Keys.UP`|上矢印キー|`Keys.PAGE_UP`|Page Upキー|
|`Keys.DOWN`|下矢印キー|`Keys.PAGE_DOWN`|Page Downキー|
|`Keys.LEFT`|左矢印キー|`Keys.ZENKAKU_HANKAKU`|全角半角キー|
|`Keys.RIGHT`|右矢印キー|`Keys.F1`～`Keys.F12`|F1～F12キー|

### 待機処理

```py
import time
time.sleep(秒数)
```
