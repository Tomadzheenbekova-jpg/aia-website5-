import { NextResponse } from "next/server";
import { sendTelegramNotification } from "@/lib/telegram";
import { sendEmailNotification } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    name,
    company,
    phone,
    preferredContact,
    messenger,
    email,
    orderSummary,
    category,
    quantity,
    hasSample,
    hasSpec,
    hasPatterns,
    needsPatternDevelopment,
    fabricSource,
    desiredTimeline,
    referenceLink,
    comment,
    consent,
  } = body;

  if (!name || !company || !phone || !preferredContact || !orderSummary || !category || !quantity || !consent) {
    return NextResponse.json(
      { ok: false, error: "Заполните обязательные поля и подтвердите согласие на обработку данных." },
      { status: 400 }
    );
  }

  const text =
    `<b>Заявка на контрактное производство — АЙА</b>\n` +
    `Имя: ${escapeHtml(name)}\n` +
    `Компания/бренд: ${escapeHtml(company)}\n` +
    `Телефон: ${escapeHtml(phone)}\n` +
    `Способ связи: ${escapeHtml(preferredContact)}\n` +
    (messenger ? `WhatsApp/Telegram: ${escapeHtml(messenger)}\n` : "") +
    (email ? `Email: ${escapeHtml(email)}\n` : "") +
    `Суть заказа: ${escapeHtml(orderSummary)}\n` +
    `Категория изделия: ${escapeHtml(category)}\n` +
    `Тираж: ${escapeHtml(String(quantity))}\n` +
    `Образец: ${hasSample ? "есть" : "нет"}\n` +
    `ТЗ: ${hasSpec ? "есть" : "нет"}\n` +
    `Лекала: ${hasPatterns ? "есть" : "нет"}\n` +
    `Нужна разработка лекал: ${needsPatternDevelopment ? "да" : "нет"}\n` +
    (fabricSource ? `Ткань: ${escapeHtml(fabricSource)}\n` : "") +
    (desiredTimeline ? `Желаемые сроки: ${escapeHtml(desiredTimeline)}\n` : "") +
    (referenceLink ? `Ссылка: ${escapeHtml(referenceLink)}\n` : "") +
    (comment ? `Комментарий: ${escapeHtml(comment)}` : "");

  const telegramResult = await sendTelegramNotification(text);
  const emailResult = await sendEmailNotification({
    subject: "Заявка на контрактное производство — АЙА",
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
