export const messages = {
  welcome: "Welcome to Quran Bot! 🕌\nUse /help to see available commands.",
  error: "Sorry, an error occurred. Please try again later.",
  noTafsir: "No tafsir available for the last verse.",
  verseTemplate: (verse: string, surah: string, number: number) =>
    `${verse}\n\nSurah: ${surah}, Ayah: ${number}`,
};
