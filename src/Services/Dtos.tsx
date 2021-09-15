// Data templates

export interface IAdminItem {
  id: string
  title: string
  tagline: string
  createdDate: string
  description: string
  mediaURIs: string[] //Could be same as the media in base interface
}

export interface IArticle {
  id: string
  title: string
  tagline: string
  description: string
  mediaType: string
  mediaURIs: string[]
}

export const Article_Dummy: IArticle = {
  id: '01',
  title: `Solutions With Modern Automation\nEquipment`,
  tagline: 'More accuracy new IO equipment',
  description:
    'More accuracy new IO equipment\n' +
    'and new communication technologies\n' +
    'are used for the solutions.',
  mediaType: 'image',
  mediaURIs: ['url'],
}

//For data parch... all data for article
export interface IArticle_Full extends IArticle, IAdminItem {}

export interface ILoggingUser {
  email: string
  password: string
}

export interface IRegisterUser {
  fName: string
  email: string
  password: string
}

//For returning data object after login
export interface ILoggedUser {
  id: string
  fName: string
  email: string
  password: string
}

//Project Cards
export interface IProject {
  id: string
  title: string
  tagline: string
  description: string
  mediaType: string
  mediaURIs: string[]
}

export interface IProject_AdminItem {
  id: string
  title: string
  tagline: string
  description: string
  mediaURIs: string[]
  createdDate: string
}

export interface IProjectItem_Full extends IProject_AdminItem, IProject {}
