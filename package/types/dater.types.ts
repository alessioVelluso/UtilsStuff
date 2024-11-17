export type FormatUnit =
    | "YYYY"      // Year 4 digits (1996)
    | "YYY"       // Year 3 digits (996)
    | "YY"        // Year 2 digits (96)
    | "M"         // Month of year (1-12)
    | "MM"        // Month of year (01-12)
    | "MMM"       // Month of year (May)
    | "D"         // Day of month  (1-31)
    | "DD"        // Day of month  (01-31)
    | "DDD"       // Day of month  (Monday-Sunday)
    | "H"         // Hour of day   (0-23:59)
    | "HH"        // Hour of day   (00-23:59)
    | "h"         // Hour of day   (0-11:59)
    | "hh"        // Hour of day   (00-11:59)
    | "tt"        // AM or PM      (AM - PM)
    | "m"         // Minute        (0-59)
    | "mm"        // Minute        (00-59)
    | "s"         // Second        (0-59)
    | "ss"        // Second        (00-59)
    | "f"         // Milliseconds  (0000-999)



export type DateLocales =
    | "en-US"  // Inglese (Stati Uniti)
    | "en-GB"  // Inglese (Regno Unito)
    | "en-AU"  // Inglese (Australia)
    | "en-CA"  // Inglese (Canada)
    | "en-IN"  // Inglese (India)
    | "fr-FR"  // Francese (Francia)
    | "fr-CA"  // Francese (Canada)
    | "fr-CH"  // Francese (Svizzera)
    | "fr-BE"  // Francese (Belgio)
    | "de-DE"  // Tedesco (Germania)
    | "de-AT"  // Tedesco (Austria)
    | "de-CH"  // Tedesco (Svizzera)
    | "it-IT"  // Italiano (Italia)
    | "it-CH"  // Italiano (Svizzera)
    | "es-ES"  // Spagnolo (Spagna)
    | "es-MX"  // Spagnolo (Messico)
    | "es-AR"  // Spagnolo (Argentina)
    | "es-CO"  // Spagnolo (Colombia)
    | "ja-JP"  // Giapponese (Giappone)
    | "zh-CN"  // Cinese (Cina)
    | "zh-HK"  // Cinese (Hong Kong)
    | "zh-TW"  // Cinese (Taiwan)
    | "pt-BR"  // Portoghese (Brasile)
    | "pt-PT"  // Portoghese (Portogallo)
    | "nl-NL"  // Olandese (Paesi Bassi)
    | "nl-BE"  // Olandese (Belgio)
    | "ru-RU"  // Russo (Russia)
    | "pl-PL"  // Polacco (Polonia)
    | "sv-SE"  // Svedese (Svezia)
    | "fi-FI"  // Finlandese (Finlandia)
    | "da-DK"  // Danese (Danimarca)
    | "tr-TR"  // Turco (Turchia)
    | "cs-CZ"  // Ceco (Repubblica Ceca)
    | "hu-HU"  // Ungherese (Ungheria)
    | "el-GR"  // Greco (Grecia)
    | "he-IL"  // Ebraico (Israele)
    | "ar-SA"  // Arabo (Arabia Saudita)
    | "ar-EG"  // Arabo (Egitto)
    | "ar-MA"  // Arabo (Marocco)
    | "ar-DZ"  // Arabo (Algeria)
    | "ko-KR"  // Coreano (Corea del Sud)
    | "vi-VN"  // Vietnamita (Vietnam)
    | "id-ID"  // Indonesiano (Indonesia)
    | "ro-RO"  // Rumeno (Romania)
    | "uk-UA"  // Ucraino (Ucraina)
    | "af-ZA"  // Afrikaan (Sudafrica)
    | "hi-IN"; // Hindi (India)