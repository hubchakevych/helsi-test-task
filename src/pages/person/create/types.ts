export type Sex = 'male' | 'female'

export type DocumentType =
  | 'idInternal'
  | 'idCard'
  | 'passportBook'
  | 'permanentResidence'
  | 'refugeeCertificate'
  | 'residencePermit'
  | 'temporaryCitizen'

export type PreferredContactMethod = 'email' | 'phone'

export interface PersonFormValues {
  lastName: string
  firstName: string
  middleName?: string
  noMiddleName: boolean
  taxId?: string
  noTaxId: boolean
  birthDate: string
  birthCountry: string
  birthPlace: string
  sex?: Sex
  secretWord: string
  contactMethod?: PreferredContactMethod
  phone?: string
  email?: string
  documentType?: DocumentType
  documentNumber: string
  documentIssuedAt: string
  documentIssuedBy: string
  documentValidUntil?: string
  demographicRegisterRecord?: string
}
