# task-board

## プロジェクト概要

タスク管理ボードアプリケーション。

## Git 運用ルール

- **コードを変更するたびに GitHub にプッシュすること。**
- コミットメッセージは変更内容を簡潔に日本語で記述する。
- プッシュ前に `git status` で変更内容を確認する。
- ブランチは `main` をデフォルトとする。
- 破壊的な操作（`git reset --hard`, `git push --force` 等）は必ずユーザーに確認を取ってから実行する。

### 変更時の標準フロー

```
git add <変更ファイル>
git commit -m "変更内容の説明"
git push origin main
```

## デプロイ先

https://TOzaki21.github.io/task-board/

`main` ブランチへのプッシュで GitHub Actions が自動ビルド・デプロイする。  
ワークフロー定義: `.github/workflows/deploy.yml`

## 技術スタック

| 用途 | 技術 |
|---|---|
| UI ライブラリ | React 18 |
| ビルドツール | Vite 6 |
| スタイリング | CSS (App.css) |
| 状態管理 | React useState / useEffect |
| データ永続化 | localStorage |
| デプロイ | GitHub Pages (GitHub Actions) |

## コンポーネント命名規約

- コンポーネントファイルは **PascalCase** （例: `TaskItem.jsx`）
- CSS クラス名は **kebab-case** （例: `.task-item`, `.delete-button`）
- カスタムフックは `use` プレフィックス（例: `useTasks`）
- localStorage のキーは `task-board-` プレフィックス（例: `task-board-tasks`）

## 開発ガイドライン

- 不要なコメントは書かない。WHY が自明でない場合のみ記述する。
- 将来の要件を見越した過剰な抽象化はしない。
- セキュリティ上の問題（XSS、インジェクション等）を導入しない。
- 新しいファイルの作成より既存ファイルの編集を優先する。
