import Ayah from "../../models/quraan/ayah.model";
import Edition from "../../models/quraan/edition.model";
import Page from "../../models/quraan/page.model";
import Surah from "../../models/quraan/surah.model";
import { QuranResponse } from "../types/bot.types";

export const getRandomAyahWithTafsir = async (): Promise<QuranResponse | undefined> => {
  try {
    const surah = await Surah.aggregate([{ $sample: { size: 1 } }]);
    // todo add edition for tafsir as a parameter
    const edition = await Edition.find({ identifier: "quran-simple" });
    const tafsirEdition = await Edition.find({ identifier: "ar.muyassar" });

    const ayah = await Ayah.aggregate([
      { $match: { surah: surah[0]._id, edition: edition[0]._id } },
      { $sample: { size: 1 } },
    ]);

    const ayahTafsir = await Ayah.aggregate([
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
