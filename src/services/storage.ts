import { IPerson } from '@/constant/stuff';

const DEFAULT_KEY = 'app';

class Storage {
  static data: { base: IPerson[] };

  constructor() {
    Storage.data = localStorage.getItem(DEFAULT_KEY)
      ? JSON.parse(localStorage.getItem(DEFAULT_KEY) || '')
      : {};
  }

  static saveData() {
    localStorage.setItem(DEFAULT_KEY, JSON.stringify(Storage.data));
  }

  static console() {
    console.log(Storage.data);
  }
}

export default Storage;
