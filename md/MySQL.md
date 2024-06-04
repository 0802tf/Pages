# MySQL

Windowsの場合はコマンドプロンプトを管理者として実行

## 環境変数の確認

```bash
mysql --version
```

## 起動

Windows

```bash
net start mysql80
```

Mac

```bash
mysql.server start
```

## ログイン

Windows

```bash
mysql --user=root --password
mysql -u root -p
```

Mac

```bash
mysql -uroot
```

## ログアウト

```sql
exit;
```

## 停止

Windows

```bash
net stop mysql80
```

Mac

```bash
mysql.server stop
```
