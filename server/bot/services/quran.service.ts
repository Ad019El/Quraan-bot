import {
  Ayah,
  Baghawi,
  Jalalayn,
  Qurtubi,
  Muyassar,
  Waseet,
} from "../../models/quraan/ayah.model";
import Edition from "../../models/quraan/edition.model";
import Page from "../../models/quraan/page.model";
import Surah from "../../models/quraan/surah.model";
import { Chat, QuranResponse } from "../types/bot.types";

const getTafsirModel = (tafsir: string) => {
  switch (tafsir) {
    case "ar.muyassar":
      return Muyassar;
    case "ar.jalalayn":
      return Jalalayn;
    case "ar.qurtubi":
      return Qurtubi;
    case "ar.waseet":
      return Waseet;
    case "ar.baghawi":
      return Baghawi;
    default:
      return Muyassar;
  }
};

export const getRandomAyahWithTafsir = async (
  chat?: Chat | null
): Promise<QuranResponse | undefined> => {
  try {
    const surah = await Surah.aggregate([{ $sample: { size: 1 } }]);
    // todo add edition for tafsir as a parameter
    const edition = await Edition.find({ identifier: "quran-simple" });
    const tafsirEdition = await Edition.find({
      identifier: chat?.preferences?.tafsir || "ar.muyassar",
    });

    const ayah = await Ayah.aggregate([
      { $match: { surah: surah[0]._id, edition: edition[0]._id } },
      { $sample: { size: 1 } },
    ]);

    const ayahTafsir = await getTafsirModel(
      chat?.preferences?.tafsir || "ar.muyassar"
    ).aggregate([
      { $match: { number: ayah[0].number, edition: tafsirEdition[0]._id } },
    ]);

    const page = await Page.findById(ayah[0].page);

    return {
      ayah: {
        surah: surah[0]?.name,
        surahEnglishName: surah[0]?.englishName,
        ayah: ayah[0]?.text,
        number: ayah[0]?.number,
        numberInSurat: ayah[0]?.numberInSurat,
        page: page?.number,
      },
      ayahTafsir: {
        surah: surah[0]?.name,
        surahEnglishName: surah[0]?.englishName,
        text: ayahTafsir[0]?.text,
        number: ayahTafsir[0]?.number,
        numberInSurat: ayahTafsir[0]?.numberInSurat,
        edition: {
          identifier: tafsirEdition[0]?.identifier,
          language: tafsirEdition[0]?.language,
          name: tafsirEdition[0]?.name,
        },
      },
    };
  } catch (error) {
    console.log(error);
  }
};

// export const getSurahByName = async (name: string) => {
//   try {
//     const surah = await Surah.findOne({ name: name });
//     if (!surah) return;

//     const ayahs = await Ayah.find({ surah: surah._id });

//     console.log(ayahs.map((ayah) => ayah.text));

//     return ayahs.map(
//       (ayah, index) => ayah.text + ` (${index + 1})`
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };
