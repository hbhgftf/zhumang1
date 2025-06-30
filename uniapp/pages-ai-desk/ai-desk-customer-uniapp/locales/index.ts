
import en from './en';
import zh_cn from './zh_cn';
import zh_tw from './zh_tw';
import fil from './fil';
import id from './id';
import ja from './ja';
import vi from './vi';
import ms from './ms';
import th from './th';
import ru from './ru';

export interface ILanguageResources {
  [key: string]: string | ILanguageResources;
}

const messages: Record<string, ILanguageResources> = {
  ...en,
  ...zh_cn,
  ...zh_tw,
  ...fil,
  ...id,
  ...ja,
  ...vi,
  ...ms,
  ...th,
  ...ru,
};

export default messages;
