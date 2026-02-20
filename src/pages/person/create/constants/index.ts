export const FIELD_LABELS = {
  lastName: 'Прізвище*',
  firstName: 'Імʼя*',
  middleName: 'По батькові*',
  taxId: 'РНОКПП (ІПН)*',
  birthDate: 'Дата народження*',
  birthCountry: 'Країна народження*',
  birthPlace: 'Місце народження*',
  sex: 'Стать*',
  secretWord: 'Секретне слово (не менше 6 символів)*',
  contactMethod: 'Бажаний спосіб звʼязку із пацієнтом*',
  phone: 'Контактний номер телефону',
  email: 'Адреса електронної пошти',
  documentType: 'Тип документу*',
  documentNumber: 'Серія (за наявності), номер*',
  documentIssuedAt: 'Коли видано*',
  documentIssuedBy: 'Ким видано*',
  documentValidUntil: 'Діє до',
  demographicRegisterRecord: 'Запис № (УНЗР)',
} as const

export const DOCUMENT_TYPES = {
  idInternal: 'idInternal',
  idCard: 'idCard',
  passportBook: 'passportBook',
  permanentResidence: 'permanentResidence',
  refugeeCertificate: 'refugeeCertificate',
  residencePermit: 'residencePermit',
  temporaryCitizen: 'temporaryCitizen',
} as const

export const DOCUMENT_TYPE_VALUES = [
  DOCUMENT_TYPES.idInternal,
  DOCUMENT_TYPES.idCard,
  DOCUMENT_TYPES.passportBook,
  DOCUMENT_TYPES.permanentResidence,
  DOCUMENT_TYPES.refugeeCertificate,
  DOCUMENT_TYPES.residencePermit,
  DOCUMENT_TYPES.temporaryCitizen,
] as const

export const CONTACT_METHODS = {
  email: 'email',
  phone: 'phone',
} as const

export const CONTACT_METHOD_VALUES = [CONTACT_METHODS.email, CONTACT_METHODS.phone] as const

export const SEX_VALUES = {
  male: 'male',
  female: 'female',
} as const

export const SEX_VALUE_LIST = [SEX_VALUES.female, SEX_VALUES.male] as const

export const SECTION_TITLES = {
  patient: 'Дані пацієнта',
  contact: 'Контактні дані',
  document: 'Документ, що посвідчує особу',
} as const

export const FORM_TEXTS = {
  title: 'Створення персони',
  submit: 'Зберегти',
  jsonPreviewTitle: 'Дані форми (JSON)',
} as const

export const DATE_TEXT = {
  placeholder: 'дд.мм.рррр',
  locale: 'uk-UA',
} as const

export const INPUT_MASKS = {
  phone: '+38 (000) 000-00-00',
  taxId: '0000000000',
  demographicRegisterRecord: '00000000-00000',
} as const

export const FIELD_PLACEHOLDERS = {
  phone: '+38 (0__) ___-__-__',
  email: 'example@example.com',
  demographicRegisterRecord: 'РРРРММДД-ХХХХХ',
} as const

export const FIELD_HELPER_TEXTS = {
  demographicRegisterRecord: 'Вкажіть унікальний номер запису в Демографічному реєстрі (Запис №)',
} as const

export const SELECT_OPTIONS = {
  sex: [
    { value: SEX_VALUES.male, label: 'чоловіча' },
    { value: SEX_VALUES.female, label: 'жіноча' },
  ],
  contactMethod: [
    { value: CONTACT_METHODS.email, label: 'Електронною поштою' },
    { value: CONTACT_METHODS.phone, label: 'Телефоном' },
  ],
  documentType: [
    { value: DOCUMENT_TYPES.idInternal, label: 'Посвідчення особи, яка потребує додаткового захисту' },
    { value: DOCUMENT_TYPES.idCard, label: 'Паспорт (ID-картка)' },
    { value: DOCUMENT_TYPES.passportBook, label: 'Паспорт (книжечка)' },
    { value: DOCUMENT_TYPES.permanentResidence, label: 'Посвідка на постійне проживання в Україні' },
    { value: DOCUMENT_TYPES.refugeeCertificate, label: 'Посвідка біженця' },
    { value: DOCUMENT_TYPES.residencePermit, label: 'Посвідка на проживання' },
    { value: DOCUMENT_TYPES.temporaryCitizen, label: 'Тимчасове посвідчення громадянина України' },
  ],
} as const

export const FIELD_NAMES = {
  lastName: 'lastName',
  firstName: 'firstName',
  middleName: 'middleName',
  noMiddleName: 'noMiddleName',
  taxId: 'taxId',
  noTaxId: 'noTaxId',
  birthDate: 'birthDate',
  birthCountry: 'birthCountry',
  birthPlace: 'birthPlace',
  sex: 'sex',
  secretWord: 'secretWord',
  contactMethod: 'contactMethod',
  phone: 'phone',
  email: 'email',
  documentType: 'documentType',
  documentNumber: 'documentNumber',
  documentIssuedAt: 'documentIssuedAt',
  documentIssuedBy: 'documentIssuedBy',
  documentValidUntil: 'documentValidUntil',
  demographicRegisterRecord: 'demographicRegisterRecord',
} as const
