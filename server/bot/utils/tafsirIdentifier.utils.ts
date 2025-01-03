export const tafsir: { [key: string]: string } = {
  "تفسير المیسر": "ar.muyassar",
  "تفسير الجلالین": "ar.jalalayn",
  "الـتـفـسـيـر الـوسـيـط": "ar.waseet",
  "تفسير البغوي": "ar.baghawi",
  "تفسير القرطبي": "ar.qurtubi",
};

export const getTafsirIdentifier = (identifierOrname: string): string => {
  let identifier: string;

  if (tafsir[identifierOrname]) {
    identifier = tafsir[identifierOrname];
  } else {
    identifier =
      Object.keys(tafsir).find((key) => tafsir[key] === identifierOrname) || "";
  }

  return identifier;
};
