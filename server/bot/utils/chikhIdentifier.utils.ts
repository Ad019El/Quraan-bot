export const chikhs: { [key: string]: string } = {
  "عبد الباسط عبد الصمد المرتل": "ar.abdulbasitmurattal",
  "عبد الله بصفر": "ar.abdullahbasfar",
  "عبدالرحمن السديس": "ar.abdurrahmaansudais",
  "عبدالباسط عبدالصمد": "ar.abdulsamad",
  "أبو بكر الشاطري": "ar.shaatree",
  "أحمد بن علي العجمي": "ar.ahmedajamy",
  "مشاري العفاسي": "ar.alafasy",
  "هاني الرفاعي": "ar.hanirifai",
  "محمود خليل الحصري": "ar.husary",
  "محمود خليل الحصري (المجود)": "ar.husarymujawwad",
  "علي بن عبدالرحمن الحذيفي": "ar.hudhaify",
  "إبراهيم الأخضر": "ar.ibrahimakhbar",
  "ماهر المعيقلي": "ar.mahermuaiqly",
  "محمد صديق المنشاوي": "ar.minshawi",
  "محمد صديق المنشاوي (المجود)": "ar.minshawimujawwad",
  "محمد أيوب": "ar.muhammadayyoub",
  "محمد جبريل": "ar.muhammadjibreel",
  "سعود الشريم": "ar.saoodshuraym",
  "أيمن سويد": "ar.aymanswoaid",
};

export const getChikhOrIdentifier = (identifierOrName: string): string => {
  if (chikhs[identifierOrName as keyof typeof chikhs]) {
    return chikhs[identifierOrName as keyof typeof chikhs] || "";
  } else {
    return (
      Object.keys(chikhs).find(
        (key) => chikhs[key as keyof typeof chikhs] === identifierOrName
      ) || ""
    );
  }
};
