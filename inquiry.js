(() => {
  const section = document.getElementById('inquiry-helper');
  const form = document.getElementById('inquiry-form');
  const result = document.getElementById('inquiry-result');
  const message = document.getElementById('inquiry-message');
  const status = document.getElementById('inquiry-status');
  if (!section || !form || !result || !message || !status) return;
  section.hidden = false;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const fields = new FormData(form);
    const details = [
      ['加工需求', fields.get('service')],
      ['材質與尺寸', fields.get('specification')],
      ['數量與希望交期', fields.get('schedule')],
      ['其他說明', fields.get('details')]
    ].map(([label, value]) => [label, String(value || '').trim()]).filter(([, value]) => value);
    if (!details.length) {
      result.hidden = true;
      status.textContent = '請先填寫至少一項已知資訊。';
      form.elements.service.focus();
      return;
    }
    message.value = ['您好，我想洽詢加工：', ...details.map(([label, value]) => `${label}：${value}`), '如有圖面或工件照片，將另行提供。'].join('\n');
    result.hidden = false;
    status.textContent = '文字已產生，可以修改後複製。';
    message.focus();
  });
  form.addEventListener('input', () => {
    if (!result.hidden) {
      result.hidden = true;
      status.textContent = '內容已變更，請重新產生洽詢文字。';
    }
  });
  document.getElementById('inquiry-copy').addEventListener('click', async () => {
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('clipboard unavailable');
      await navigator.clipboard.writeText(message.value);
      status.textContent = '已複製，請貼到 LINE 或其他聯絡方式。';
    } catch {
      message.focus();
      message.select();
      status.textContent = '請複製已選取的文字，再貼到聯絡訊息中。';
    }
  });
})();
