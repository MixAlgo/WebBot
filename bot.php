<?php

// ----- SOZLAMALAR -----
// 1. Bot Otasidan (BotFather) olingan noyob tokenni shu yerga qo'ying.
define('BOT_TOKEN', '8393546109:AAEFLRWIgmnbFVQd_i5N69giiCH1J4RJ7P0'); 

// 2. Veb-ilovangiz joylashgan URL manzilni kiriting.
define('WEB_APP_URL', 'https://mixalgo.github.io/WebBot/');

// Telegram API manzili
define('API_URL', 'https://api.telegram.org/bot' . BOT_TOKEN . '/');
// --------------------


// Telegramdan kelgan so'rovni olish
$update = json_decode(file_get_contents('php://input'), true);

// Agar xabar kelgan bo'lsa...
if (isset($update['message'])) {
    $message = $update['message'];
    $chat_id = $message['chat']['id'];
    $text = $message['text'];
    $first_name = $message['from']['first_name'];

    // Agar foydalanuvchi /start buyrug'ini yuborsa
    if ($text === '/start') {
        // Salomlashish xabari matni
        $greeting_text = "Assalomu alaykum, " . $first_name . "!\n\n"
                       . "<b>Mix Capital</b> botiga xush kelibsiz! Biz bilan moliyaviy erkinlikka erishing.\n\n"
                       . "Quyidagi tugma orqali asosiy ilovamizni ochishingiz mumkin:";

        // Tugmalar majmuasini yaratish
        $keyboard = [
            'inline_keyboard' => [
                [
                    // Bu tugma veb-ilovangizni ochadi
                    ['text' => '🚀 Ilovani ochish', 'web_app' => ['url' => WEB_APP_URL]]
                ],
                [
                    // Bu tugma sizning qo'llab-quvvatlash guruhingizga yo'naltiradi
                    ['text' => '✍️ Qo\'llab-quvvatlash', 'url' => 'https://t.me/Murodjon_Hoshimov_official'], 
                    // Bu tugma sizning kanalingizga yo'naltiradi
                    ['text' => '📢 Kanalimiz', 'url' => 'https://t.me/mix_capital']
                ]
            ]
        ];

        // Foydalanuvchiga xabar va tugmalarni yuborish
        sendMessage($chat_id, $greeting_text, $keyboard);
    }
}

/**
 * Telegramga xabar yuborish uchun funksiya.
 *
 * @param int $chat_id Foydalanuvchi ID raqami.
 * @param string $text Yuboriladigan xabar matni.
 * @param array|null $keyboard Tugmalar majmuasi (ixtiyoriy).
 */
function sendMessage($chat_id, $text, $keyboard = null) {
    $params = [
        'chat_id' => $chat_id,
        'text' => $text,
        'parse_mode' => 'HTML', // Xabarni HTML formatida yuborish
    ];

    if ($keyboard) {
        $params['reply_markup'] = json_encode($keyboard);
    }

    // Telegram API ga so'rov yuborish
    file_get_contents(API_URL . 'sendMessage?' . http_build_query($params));
}

?>
