import { surahList } from "../../utils/constant";

export const keyboards = {
  main: {
    keyboard: [
      [{ text: "🎲 إختيار عشوائي للآية من القرآن الكريم" }],
      [{ text: "📖 اسماء سور القرآن الكريم" }],
      [{ text: "🌟 شارك اقتراحاتك" }],
      [{ text: "⚙️ الإعدادات" }],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  },

  surahs: {
    keyboard: [
      ...surahList.reduce<Array<Array<{ text: string }>>>(
        (rows, surah, index) => {
          if (index % 2 === 0) {
            // Start new row
            rows.push([{ text: Number(index + 1) + ": " + surah }]);
          } else {
            // Add to last row
            rows[rows.length - 1].push({
              text: Number(index + 1) + ": " + surah,
            });
          }
          return rows;
        },
        []
      ),
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
    chikh_list: {
      keyboard: [
        [{ text: "عبد الباسط عبد الصمد المرتل" }, { text: "عبد الله بصفر" }],
        [{ text: "عبدالرحمن السديس" }, { text: "عبدالباسط عبدالصمد" }],
        [{ text: "أبو بكر الشاطري" }, { text: "أحمد بن علي العجمي" }],
        [{ text: "مشاري العفاسي" }, { text: "هاني الرفاعي" }],
        [{ text: "محمود خليل الحصري" }, { text: "محمود خليل الحصري (المجود)" }],
        [{ text: "علي بن عبدالرحمن الحذيفي" }, { text: "إبراهيم الأخضر" }],
        [{ text: "ماهر المعيقلي" }, { text: "محمد صديق المنشاوي" }],
        [{ text: "محمد صديق المنشاوي (المجود)" }, { text: "محمد أيوب" }],
        [{ text: "محمد جبريل" }, { text: "سعود الشريم" }],
        [{ text: "أيمن سويد" }],
        [{ text: "⬅️ رجوع للقائمة الرئيسية" }],
      ],
      resize_keyboard: true,
    },

    tafsir_list: {
      keyboard: [
        [{ text: "تفسير المیسر" }, { text: "تفسير الجلالین" }],
        [{ text: "الـتـفـسـيـر الـوسـيـط" }, { text: "تفسير البغوي" }],
        [{ text: "تفسير القرطبي" }],
        [{ text: "⬅️ رجوع للقائمة الرئيسية" }],
      ],
      resize_keyboard: true,
    },
  },
};
