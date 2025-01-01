export const keyboards = {
  main: {
    keyboard: [
      [{ text: "🎲 إختيار عشوائي للآية من القرآن الكريم" }],
      [{ text: "📖 تصفح القرآن" }],
      [{ text: "⚙️ الإعدادات" }],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  },

  browse: {
    keyboard: [
      [{ text: "📚 السور" }, { text: "🔍 البحث بالرقم" }],
      [{ text: "📑 الفهرس" }, { text: "🔖 العلامات" }],
      [{ text: "⬅️ رجوع للقائمة الرئيسية" }],
    ],
    resize_keyboard: true,
  },

  audio: {
    settings: [
      [{ text: "المصحف المرتل" }, { text: "المصحف المجود" }],
      [{ text: "⬅️ رجوع للقائمة الرئيسية" }],
    ],
    resize_keyboard: true,
  },
  settings: {
    keyboard: [
      [{ text: "🔔 تفعيل الإشعارات" }, { text: "🔕 إيقاف الإشعارات" }],
      [{ text: "📖 تغيير التفسير" }, { text: "🎙 تغيير القارئ" }],
      [{ text: "⬅️ رجوع للقائمة الرئيسية" }],
    ],
    resize_keyboard: true,
  },
};
