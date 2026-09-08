# daily-app — 1日1アプリを溜めていく置き場

小さいアプリを1日1つ作り、**溜めながら1つずつ整備していく**ためのリポジトリ。
ビルドなし・依存なしの素の HTML/CSS/JS で、`docs/` を GitHub Pages でそのまま公開する。

## なぜこの設計か

| 判断 | 理由 |
|---|---|
| ビルドツールなし | 1日1アプリで手を止める要因を作らない。ブラウザで開けば動く |
| 1アプリ＝1ディレクトリ | 相互依存を作らない。捨てるのも整備するのも1つずつで完結する |
| 共通は `shared/` の3ファイルだけ | 「全部を作り直す」を起こさないための最小の共通化 |
| 索引の正本は `docs/apps.json` | 一覧の表示・整備状況の管理を1ファイルに集約する |

## 構成

```
docs/                     ← GitHub Pages の公開ルート
├── index.html            ← ランチャー（apps.json を読んで一覧表示）
├── apps.json             ← 索引の正本。アプリを足したらここに1件追記
├── .nojekyll             ← _template を Jekyll に無視させないため（必須）
├── shared/
│   ├── tokens.css        ← デザイントークン。色・余白・文字サイズはすべてここ
│   ├── base.css          ← 共通UI（ヘッダ／カード／ボタン／表／バッジ）
│   └── app-shell.js      ← 共通ヘッダと「← 一覧」導線を差し込む
└── apps/
    └── _template/        ← 新規アプリの雛形。複製して使う
        └── index.html
```

## アプリを1つ足す

1. `docs/apps/_template/` を `docs/apps/<slug>/` に複製する
2. `index.html` の `<title>` と `<body data-app-title data-app-summary>` を書き換える
3. `docs/apps.json` の `apps` に1件追記する

```json
{
  "slug": "unit-converter",
  "name": "単位変換",
  "summary": "長さ・重さ・温度をまとめて変換する",
  "date": "2026-09-09",
  "tags": ["ツール"],
  "status": "draft"
}
```

`status` が整備状況を表す。**「1つずつ綺麗にする」の進捗はこの値で追う。**

| status | 一覧での表示 | 意味 |
|---|---|---|
| `draft` | 未整備 | 動くが、見た目・文言・操作はまだ整えていない |
| `polished` | 整備済 | UIを整え、共通トークンに寄せ、モバイル幅で確認済み |
| `template` | 雛形 | `_template` のみ |

## 整備するときの基準

アプリを `draft` → `polished` に上げる条件。

- 生の色コード・生の px を書かず、`tokens.css` の変数だけを使っている
- `app-shell.js` を読み込み、一覧に戻れる
- 幅 375px で横スクロールが出ない
- 何もしていない初期状態（空状態）に「何をすればいいか」が書いてある
- 操作の結果が画面上で必ず変化する（無反応のボタンがない）

## ローカルで開く

`index.html` は `apps.json` を `fetch` するため、`file://` で直接開くと読み込みに失敗する。

```bash
python3 -m http.server 8000
# → http://localhost:8000/docs/
```

## 公開

**Settings → Pages** → Branch `main` / フォルダ `/docs`。
