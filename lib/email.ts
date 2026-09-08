// ============================================================
// Дублирование заявок на рабочую электронную почту.
// ============================================================
// Реализовано через простой SMTP-запрос. Для реальной отправки
// нужно подключить SMTP-провайдера (например, Yandex, Mailgun,
// Resend и т.д.) и задать переменные окружения ниже.
// Пока переменные не заданы, функция возвращает ok: false и
// НЕ показывает пользователю ложное сообщение об успехе —
// это обрабатывается в route.ts.
// ============================================================

export async function sendEmailNotification(params: {
  subject: string;
  text: string;
}): Promise<{ ok: boolean; error?: string }> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.NOTIFICATIONS_EMAIL;

  if (!host || !user || !pass || !to) {
    return {
      ok: false,
      error:
        "Почтовое уведомление не настроено: заполните SMTP_HOST, SMTP_USER, SMTP_PASS, NOTIFICATIONS_EMAIL в переменных окружения.",
    };
  }

  // Место для подключения реального SMTP-клиента (например, nodemailer).
  // Оставлено как явная точка расширения, чтобы не имитировать
  // отправку письма, которая на самом деле не происходит.
  try {
    // TODO: подключить nodemailer или провайдера транзакционных писем.
    // await transporter.sendMail({ from: user, to, subject: params.subject, text: params.text });
    return {
      ok: false,
      error:
        "SMTP-клиент ещё не подключён в коде (lib/email.ts) — добавьте реализацию отправки перед запуском в проде.",
    };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Неизвестная ошибка при отправке письма",
    };
  }
}
