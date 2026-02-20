import * as yup from 'yup'

import {
  CONTACT_METHOD_VALUES,
  CONTACT_METHODS,
  DOCUMENT_TYPE_VALUES,
  DOCUMENT_TYPES,
  FIELD_NAMES,
  SEX_VALUE_LIST,
} from '../../constants'
import type { DocumentType, PreferredContactMethod, Sex } from '../../types'

const REGEX = {
  ukrainianLetters: /^[А-ЩЬЮЯІЇЄҐа-щьюяіїєґ]+$/,
  passportBook: /^[А-ЩЬЮЯІЇЄҐа-щьюяіїєґ]{2}\d{6}$/,
  idCard: /^\d{9}$/,
  phone: /^\+38\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/,
  taxId: /^\d{10}$/,
  nonPassportDocument: /^[А-ЩЬЮЯІЇЄҐа-щьюяіїєґ]{3}\d{5,9}$/,
} as const

const MIN_DATE = new Date('1900-01-01')
const MAX_YEAR = 2100

const getToday = (): Date => new Date(new Date().toDateString())

const parseDate = (value: string): Date => new Date(value)

const ukrainianName = (label: string) =>
  yup
    .string()
    .trim()
    .required(`${label} є обовʼязковим`)
    .matches(REGEX.ukrainianLetters, `${label} повинно містити лише українські літери`)

const baseDateSchema = yup
  .string()
  .test('valid-date', 'Некоректна дата', (value) => {
    if (!value) { return true }
    return !isNaN(parseDate(value).getTime())
  })
  .test('year-range', `Рік має бути між 1900 і ${MAX_YEAR}`, (value) => {
    if (!value) { return true }
    return parseDate(value).getFullYear() <= MAX_YEAR
  })

const requiredDate = (label: string) =>
  baseDateSchema.required(`${label} є обовʼязковою`)

const optionalDate = () => baseDateSchema.optional()

const isPassportType = (type?: DocumentType | null): boolean =>
  type === DOCUMENT_TYPES.idCard || type === DOCUMENT_TYPES.passportBook

export const personValidationSchema = yup.object({
  [FIELD_NAMES.lastName]: ukrainianName('Прізвище'),
  [FIELD_NAMES.firstName]: ukrainianName("Ім'я"),

  [FIELD_NAMES.middleName]: yup
    .string()
    .trim()
    .when(FIELD_NAMES.noMiddleName, {
      is: true,
      then: (s) =>
        s
          .required('По батькові є обовʼязковим')
          .matches(REGEX.ukrainianLetters, 'По батькові повинно містити лише українські літери'),
      otherwise: (s) => s.optional(),
    }),
  [FIELD_NAMES.noMiddleName]: yup.boolean().default(false),

  [FIELD_NAMES.taxId]: yup
    .string()
    .trim()
    .when(FIELD_NAMES.noTaxId, {
      is: true,
      then: (s) =>
        s
          .required('РНОКПП є обовʼязковим')
          .matches(REGEX.taxId, 'РНОКПП повинен містити 10 цифр'),
      otherwise: (s) => s.optional(),
    }),
  [FIELD_NAMES.noTaxId]: yup.boolean().default(false),

  [FIELD_NAMES.birthDate]: requiredDate('Дата народження')
    .test('not-future', 'Дата народження не може бути в майбутньому', (value) => {
      if (!value) { return true }
      return parseDate(value) <= getToday()
    })
    .test('min-date', `Дата народження не може бути раніше ${MIN_DATE.getFullYear()} року`, (value) => {
      if (!value) { return true }
      return parseDate(value) >= MIN_DATE
    }),

  [FIELD_NAMES.birthCountry]: yup.string().trim().required('Країна народження є обовʼязковою'),
  [FIELD_NAMES.birthPlace]: yup.string().trim().required('Місце народження є обовʼязковим'),

  [FIELD_NAMES.sex]: yup
    .mixed<Sex>()
    .oneOf<Sex>(SEX_VALUE_LIST as unknown as Sex[])
    .required('Стать є обовʼязковою'),

  [FIELD_NAMES.secretWord]: yup
    .string()
    .trim()
    .min(6, 'Секретне слово повинно містити не менше 6 символів')
    .required('Секретне слово є обовʼязковим'),

  [FIELD_NAMES.contactMethod]: yup
    .mixed<PreferredContactMethod>()
    .oneOf<PreferredContactMethod>(CONTACT_METHOD_VALUES as unknown as PreferredContactMethod[])
    .required('Бажаний спосіб звʼязку є обовʼязковим') as yup.Schema<PreferredContactMethod>,

  [FIELD_NAMES.phone]: yup.string().when(FIELD_NAMES.contactMethod, {
    is: CONTACT_METHODS.phone,
    then: (s) =>
      s
        .required('Контактний номер телефону є обовʼязковим')
        .matches(REGEX.phone, 'Некоректний номер телефону. Приклад: +38 (093) 999-88-77'),
    otherwise: (s) => s.optional(),
  }),

  [FIELD_NAMES.email]: yup.string().when(FIELD_NAMES.contactMethod, {
    is: CONTACT_METHODS.email,
    then: (s) =>
      s
        .required('Адреса електронної пошти є обовʼязковою')
        .email('Некоректна адреса електронної пошти'),
    otherwise: (s) => s.optional(),
  }),

  [FIELD_NAMES.documentType]: yup
    .mixed<DocumentType>()
    .oneOf<DocumentType>(DOCUMENT_TYPE_VALUES as unknown as DocumentType[], 'Оберіть тип документу')
    .required('Тип документу є обовʼязковим'),

  [FIELD_NAMES.documentNumber]: yup
    .string()
    .trim()
    .required('Номер документу є обовʼязковим')
    .when(FIELD_NAMES.documentType, {
      is: (val: DocumentType | undefined) => val === DOCUMENT_TYPES.idCard,
      then: (s) => s.matches(REGEX.idCard, 'Для ID-картки номер має містити 9 цифр'),
      otherwise: (s) =>
        s.when(FIELD_NAMES.documentType, {
          is: (val: DocumentType | undefined) => val === DOCUMENT_TYPES.passportBook,
          then: (book) =>
            book.matches(
              REGEX.passportBook,
              'Для паспорта-книжечки номер має містити 2 українські літери та 6 цифр',
            ),
          otherwise: (other) =>
            other.when(FIELD_NAMES.documentType, {
              is: (val: DocumentType | undefined) => Boolean(val) && !isPassportType(val),
              then: (nonPassport) =>
                nonPassport.matches(
                  REGEX.nonPassportDocument,
                  'Номер введено некоректно — має містити 3 літери (укр) та від 5 до 9 цифр',
                ),
              otherwise: (raw) => raw,
            }),
        }),
    }),

  [FIELD_NAMES.documentIssuedAt]: requiredDate('Дата видачі')
    .test('not-future', 'Дата видачі не може бути в майбутньому', (value) => {
      if (!value) { return true }
      return parseDate(value) <= getToday()
    }),

  [FIELD_NAMES.documentIssuedBy]: yup.string().trim().required('Ким видано є обовʼязковим'),

  [FIELD_NAMES.documentValidUntil]: optionalDate()
    .test('after-issued', 'Дата закінчення дії має бути після дати видачі', function (value) {
      if (!value) { return true }
      const parent = this.parent as Record<string, unknown>
      const issuedAt = parent[FIELD_NAMES.documentIssuedAt]
      if (typeof issuedAt !== 'string' || !issuedAt) { return true }
      return parseDate(value) > parseDate(issuedAt)
    }),

  [FIELD_NAMES.demographicRegisterRecord]: yup.string().trim().optional(),
})
