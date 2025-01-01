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

const chikhBitrates: { [key: string]: number[] } = {
  "ar.abdulbasitmurattal": [64, 192],
  "ar.abdullahbasfar": [32, 64, 192],
  "ar.abdurrahmaansudais": [64, 192],
  "ar.abdulsamad": [64],
  "ar.shaatree": [64, 128],
  "ar.ahmedajamy": [64, 128],
  "ar.alafasy": [64, 128],
  "ar.hanirifai": [64, 192],
  "ar.husary": [64, 128],
  "ar.husarymujawwad": [64, 128],
  "ar.hudhaify": [32, 64, 128],
  "ar.ibrahimakhbar": [32],
  "ar.mahermuaiqly": [64, 128],
  "ar.minshawi": [128],
  "ar.minshawimujawwad": [64],
  "ar.muhammadayyoub": [128],
  "ar.muhammadjibreel": [128],
  "ar.saoodshuraym": [64],
  "ar.aymanswoaid": [64],
};

interface ChikhResponse {
  identifier: string;
  bitrate: number;
}

export const getChikhOrIdentifier = (identifierOrName: string): ChikhResponse => {
  let identifier: string;
  
  if (chikhs[identifierOrName]) {
    identifier = chikhs[identifierOrName];
  } else {
    identifier = Object.keys(chikhs).find(
      key => chikhs[key] === identifierOrName
    ) || "";
  }

  if (!identifier) {
    return { identifier: "", bitrate: 0 };
  }

  const availableBitrates = chikhBitrates[identifierOrName] || [128];

  // Default to highest available bitrate
  return { 
    identifier, 
    bitrate: Math.max(...availableBitrates)
  };
};