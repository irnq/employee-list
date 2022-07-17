export interface IPerson {
  name: string;
  lastName: string;
  middleName: string;
  position: string;
  certificate: boolean;
  salary: number;
  workFrom: string;
  rate: Rate;
  id: string;
}

export enum Rate {
  half = 0.5,
  full = 1,
}

export const STUFF: IPerson[] = [
  {
    id: '1',
    name: 'Нинель',
    lastName: 'Чистякова',
    middleName: 'Николаевна',
    position: 'оператор',
    certificate: true,
    salary: 30000,
    workFrom: '2017-05-10',
    rate: Rate.full,
  },
  {
    id: '2',
    name: 'Виссарион',
    lastName: 'Безруков',
    middleName: 'Филиппович',
    position: 'экспедитор',
    certificate: true,
    salary: 35000,
    workFrom: '2015-04-08',
    rate: Rate.full,
  },
  {
    id: '3',
    name: 'Максим',
    lastName: 'Журавлёв',
    middleName: 'Миронович',
    position: 'курьер',
    certificate: false,
    salary: 30000,
    workFrom: '2016-12-12',
    rate: Rate.half,
  },
  {
    id: '4',
    name: 'Инга',
    lastName: 'Савельева',
    middleName: 'Тимофеевна',
    position: 'продавец',
    certificate: true,
    salary: 32000,
    workFrom: '2018-08-08',
    rate: Rate.full,
  },
  {
    id: '5',
    name: 'Семен',
    lastName: 'Чернышов',
    middleName: 'Алексеевич',
    position: 'администратор',
    certificate: true,
    salary: 80000,
    workFrom: '2020-11-23',
    rate: Rate.full,
  },
  {
    id: '6',
    name: 'Елена',
    lastName: 'Кузнецова',
    middleName: 'Николаевна',
    position: 'оператор',
    certificate: true,
    salary: 30000,
    workFrom: '2019-05-04',
    rate: Rate.full,
  },
  {
    id: '7',
    name: 'Марина',
    lastName: 'Гусева',
    middleName: 'Павловна',
    position: 'курьер',
    certificate: false,
    salary: 33000,
    workFrom: '2021-07-21',
    rate: Rate.half,
  },
  {
    id: '8',
    name: 'Андрей',
    lastName: 'Русских',
    middleName: 'Максимович',
    position: 'повар',
    certificate: true,
    salary: 50000,
    workFrom: '2016-04-04',
    rate: Rate.full,
  },
  {
    id: '9',
    name: 'Аркадий',
    lastName: 'Укупник',
    middleName: 'Васильевич',
    position: 'повар',
    certificate: true,
    salary: 60000,
    workFrom: '2021-03-07',
    rate: Rate.full,
  },
  {
    id: '10',
    name: 'Николай',
    lastName: 'Вахрушев',
    middleName: 'Петрович',
    position: 'охрана',
    certificate: true,
    salary: 40000,
    workFrom: '2018-02-01',
    rate: Rate.full,
  },
];

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
