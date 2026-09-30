// ==========================================================================
// Google Apps Script - 基督的羊聚會報名通知信(免驗證信)
// ==========================================================================
// 部署步驟:
// 1. 開啟 https://script.google.com/ → 新增專案,貼上本檔完整內容。
// 2. 右上角「部署」→「新增部署」→ 類型選「網頁應用程式」。
//    - 執行身分:我
//    - 誰可以存取:所有人
// 3. 首次部署需授權(允許寄送 Email),完成後複製「網頁應用程式 URL」。
// 4. 把 URL 填入 index.html 的 GAS_URL 常數。
// 修改本檔後須「管理部署 → 編輯 → 新版本」重新發布,URL 才會套用新程式。

var RECIPIENTS = 'taiwan.kwei@gmail.com,g0306@ceci.com.tw,taiwan.kwei@ceci.com.tw';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var subject = '【基督的羊聚會報名及點餐】' + (data['姓名'] || '未知姓名') + ' - ' + (data['總人數'] || '?') + ' 人';

    var body = '收到新的報名,明細如下:\n';
    body += '========================================\n\n';
    for (var key in data) {
      if (key.indexOf('_') === 0) continue;
      body += '● ' + key + ':' + data[key] + '\n';
    }
    body += '\n========================================\n';
    body += '這是來自「基督的羊」報名網頁的自動通知信。';

    MailApp.sendEmail(RECIPIENTS, subject, body);
    return json({ status: 'success' });
  } catch (error) {
    return json({ status: 'error', message: String(error) });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
