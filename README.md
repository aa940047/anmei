# 安美建設官網（v1）

## 網站架構
- `/index.html`：首頁
- `/about.html`：關於安美
- `/projects.html`：建案總覽
- `/project.html`：單一建案詳情
- `/news.html`：最新消息
- `/contact.html`：聯絡我們
- `/privacy.html`：隱私權政策
- `/assets/css/styles.css`：共用樣式
- `/assets/js/main.js`：互動邏輯（行動選單、動畫、表單驗證）

## 內容與品牌框架
- 主視覺：品牌主張（安全 + 美學）
- 核心價值：安全工法、美學設計、長期服務
- 建案資訊：列表 + 單一建案頁
- 聯絡入口：表單、電話、LINE CTA

## SEO 與追蹤
已完成：
- 各頁 title、description、canonical
- Open Graph
- JSON-LD 結構化資料
- `sitemap.xml`、`robots.txt`

建議上線後補齊：
1. 到 Google Search Console 提交 `https://www.anmei.com.tw/sitemap.xml`
2. 於頁面加入正式 GA4 / GTM 追蹤碼
3. 設定網站正式 `og:image`

## 表單收件流程
目前表單採前端驗證，通過後以 `mailto:` 開啟本機郵件程式寄送。

正式上線建議：
1. 串接表單服務（如 Formspree、Getform）或自有 API
2. 將詢問資料同步到 CRM（如 HubSpot / Salesforce）
3. 加入 reCAPTCHA 與頻率限制，防止濫發

## 部署與網域 / SSL
建議流程：
1. 將本專案部署到靜態託管平台（Netlify / Vercel / Cloudflare Pages）
2. 綁定正式網域 `www.anmei.com.tw`
3. 啟用 HTTPS（平台自動簽發 SSL）
4. 設定 301 導向（http -> https、裸網域 -> www）

## 效能與快取
- `_headers` 已提供資產與 HTML 的快取策略
- 建議建案圖片使用 WebP/AVIF，單張控制在 200–400KB
- 關鍵圖片加入 `width/height` 與 `loading="lazy"`

## 後續維運節奏
- 每月更新：最新消息、工程進度
- 每季更新：在售建案與常見問答
- 每半年檢查：SEO 指標、Core Web Vitals、表單轉換率
