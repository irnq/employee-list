import { IPerson, Rate } from '@/interfaces/types';

export const DEFAULT_PERSON: IPerson = {
  id: '',
  name: '',
  lastName: '',
  middleName: '',
  position: '',
  certificate: false,
  salary: 0,
  workFrom: '',
  rate: Rate.full,
};

export const HEADER = [
  {
    text: 'Фамилия',
    align: 'start',
    sortable: true,
    value: 'lastName',
  },
  {
    text: 'Имя',
    sortable: true,
    value: 'name',
  },
  {
    text: 'Отчество',
    sortable: true,
    value: 'middleName',
  },
  {
    text: 'Должность',
    sortable: true,
    value: 'position',
  },
  {
    text: 'Действия',
    sortable: false,
    value: 'actions',
  },
];
