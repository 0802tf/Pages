# Java MySQL

## プロパティファイル

プロパティファイルの書式

```Properties
key=値
# コメント
```

Propertiesクラスのインスタンス生成

```Java
String path = "プロパティファイルのパス";
Properties properties = new Properties(path);
```

読み込み

```Java
InputStream inputStream = new FileInputStream(path);
properties.load(inputStream);
```

値を取得

```Java
String value = properties.getProperty("key");
```

値を設定

```Java
properties.setProperty("key", "値");
```

出力

```Java
OutputStream outputStream = new FileOutputStream(path);
properties.store(outputStream, "コメント");
```

## データベース接続

JDBCドライバのロード

```Java
Class.forName("com.mysql.cj.jdbc.Driver");
```

接続(`url`, `user`, `password`をプロパティファイルから読み込ませることが多い)

```Java
Connection con = DriverManager.getConnection(url, user, password);
```

## CREATE文・DROP文

Statementの生成

```Java
Statement stmt = con.createStatement();
```

SQLを実行

```Java
// データベースの生成
stmt.executeUpdate("CREATE DATABASE データベース名 [CHARACTER SET = 文字コード名, COLLATION = COLLATION名];");
// テーブルの生成
stmt.executeUpdate("CREATE TABLE テーブル名 (列名 列の型[制約],…) [テーブルオプション];");
// テーブルの削除
stmt.executeUpdate("DROP TABLE テーブル名;");
// データベースの削除
stmt.executeUpdate("DROP DATABASE データベース名;");
```

## INSERT文・UPDATE文・DELETE文

PreparedStatementの生成

```Java
// INSERT文
PreparedStatement pstmt = con.prepareStatement("INSERT INTO テーブル名(列名1, 列名2, ...) VALUES (?, ?, ...);");
// UPDATE文
PreparedStatement pstmt = con.prepareStatement("UPDATE テーブル名 SET 列名1 = ?[,列名2 = ?...] [WHERE条件];");
// DELETE文
PreparedStatement pstmt = con.prepareStatement("DELETE FROM テーブル名 [WHERE条件];");
```

SQL文中の"?"に型に応じて値を設定(番号は"?"の出現順に1, 2, ...となる)

```Java
// 整数
pstmt.setInt("番号", "値");
// 文字列
pstmt.setString("番号", "値");
```

|メソッド|設定する値の型|
|-|-|
|setString("番号", "値")|String|
|setInt("番号", "値")|int|
|setLong("番号", "値")|long|
|setByte("番号", "値")|byte|
|setFloat("番号", "値")|float|
|setDouble("番号", "値")|double|
|setBoolean("番号", "値")|boolean|
|setDate("番号", "値")|java.sql.Date|
|setTime("番号", "値")|java.sql.Time|
|setTimestamp("番号", "値")|java.sql.Timestamp|

SQLを実行

```Java
pstmt.executeUpdate();
```

## SELECT文

PreparedStatementの生成

```Java
PreparedStatement pstmt = con.prepareStatement("SELECT 列名1, 列名2, ... FROM テーブル名 [条件];");
```

SQLを実行してResultSetを取得

```Java
ResultSet rs = pstmt.executeQuery();
```

型に応じて値を取得

```Java
while (rs.next()) {
    // 整数
    int value = rs.getInt("列名");
    // 文字列
    String value = rs.getString("列名");
}
```

|メソッド|取得する値の型|
|-|-|
|getString("列名")|String|
|getInt("列名")|int|
|getLong("列名")|long|
|getByte("列名")|byte|
|getFloat("列名")|float|
|getDouble("列名")|double|
|getBoolean("列名")|boolean|
|getDate("列名")|java.sql.Date|
|getTime("列名")|java.sql.Time|
|getTimestamp("列名")|java.sql.Timestamp|

## CLOSE処理

```Java
rs.close();
pstmt.close();
stmt.close();
con.close();
```
