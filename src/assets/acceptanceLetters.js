import letter1 from "./acceptance/A4 - 1.svg";
import letter2 from "./acceptance/A4 - 2.svg";
import letter3 from "./acceptance/A4 - 3.svg";
import letter4 from "./acceptance/A4 - 4.svg";
import letter5 from "./acceptance/A4 - 5.svg";
import letter6 from "./acceptance/A4 - 6.svg";
import letter7 from "./acceptance/A4 - 7.svg";
import letter8 from "./acceptance/A4 - 8.svg";
import letter9 from "./acceptance/A4 - 9.svg";
import letter10 from "./acceptance/A4 - 10.svg";
import letter11 from "./acceptance/A4 - 11.svg";
import letter12 from "./acceptance/A4 - 12.svg";

export const acceptanceLetters = [
  letter1,
  letter2,
  letter3,
  letter4,
  letter5,
  letter6,
  letter7,
  letter8,
  letter9,
  letter10,
  letter11,
  letter12,
].map((src, index) => ({
  src,
  title: `Acceptance letter ${String(index + 1).padStart(2, "0")}`,
}));
