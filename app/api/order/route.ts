import { NextResponse } from "next/server";
import { sendTelegramNotification } from "@/lib/telegram";
import { sendEmailNotification } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    name,
    phone,
    preferredContact,
    product,
    color,
    size,
    quantity,
    deliveryLocation,
    comment,
    consent,
  } = body;

  if (!name || !phone || !product || !deliveryLocation || !consent) {
    return NextResponse.json(
      { ok: false, error: "Заполните обязательные поля и подтвердите согласие на обработку данных." },
      { status: 400 }
    );
  }

  const text =
    `<b>Новый заказ с сайта АЙА</b>\n` +
    `Имя: ${escapeHtml(name)}\n` +
    `Телефон: ${escapeHtml(phone)}\n` +
    (preferredContact ? `Способ связи: ${escapeHtml(preferredContact)}\n` : "") +
    `Товар: ${escapeHtml(product)}\n` +
    (color ? `Цвет: ${escapeHtml(color)}\n` : "") +
    (size ? `Размер: ${escapeHtml(size)}\n` : "") +
    (quantity ? `Количество: ${escapeHtml(String(quantity))}\n` : "") +
    `Доставка: ${escapeHtml(deliveryLocation)}\n` +
    (comment ? `Комментарий: ${escapeHtml(comment)}` : "");

  const telegramResult = await sendTelegramNotification(text);
  const emailResult = await sendEmailNotification({
    subject: "Новый заказ с сайта АЙА",
    text,
  });

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
