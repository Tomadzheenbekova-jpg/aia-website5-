// ============================================================
// Отправка заявок в закрытую рабочую Telegram-группу через бота.
// ============================================================
// Токен бота и ID группы хранятся ТОЛЬКО в переменных окружения
// (см. .env.example) и никогда не попадают в клиентский код —
// эта функция вызывается исключительно на сервере (в route.ts).
// ============================================================

export async function sendTelegramNotification(text: string): Promise<{
  ok: boolean;
  error?: string;
}> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_GROUP_CHAT_ID;

  if (!token || !chatId) {
    return {
      ok: false,
      error:
        "Telegram-бот не настроен: заполните TELEGRAM_BOT_TOKEN и TELEGRAM_GROUP_CHAT_ID в переменных окружения.",
    };
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return { ok: false, error: `Telegram API ответил ошибкой: ${errText}` };
    }

    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Неизвестная ошибка Telegram",
    };
  }
}
