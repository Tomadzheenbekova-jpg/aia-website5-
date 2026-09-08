import { NextResponse } from "next/server";
import { sendTelegramNotification } from "@/lib/telegram";
import { sendEmailNotification } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, phone, preferredContact, subject, message, consent } = body;

  if (!name || !phone || !message || !consent) {
    return NextResponse.json(
      { ok: false, error: "Заполните обязательные поля и подтвердите согласие на обработку данных." },
      { status: 400 }
    );
  }

  const text =
    `<b>Новое сообщение с сайта АЙА</b>\n` +
    `Имя: ${escapeHtml(name)}\n` +
    `Телефон: ${escapeHtml(phone)}\n` +
    (preferredContact ? `Способ связи: ${escapeHtml(preferredContact)}\n` : "") +
    (subject ? `Тема: ${escapeHtml(subject)}\n` : "") +
    `Сообщение: ${escapeHtml(message)}`;

  const telegramResult = await sendTelegramNotification(text);
  const emailResult = await sendEmailNotification({
    subject: "Новое сообщение с сайта АЙА",
    text,
  });

  // Заявка считается доставленной, если сработал хотя бы один канал.
  if (!telegramResult.ok && !emailResult.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Форма пока не подключена к каналам уведомлений. Напишите нам напрямую в WhatsApp или Telegram.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
