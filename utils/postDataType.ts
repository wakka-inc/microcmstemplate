type Category = {
  id: string,
  name: string,
  description?: string,
}
type Tag = {
  id: string,
  name: string,
  description?: string,
}
type SocialLink = {
  name: string[],
  link: string
}
type Image = {
  url: string,
  height: number,
  width: number
}


/** Export Type */
export type Contributed = {
  id: string,
  avatar?: Image,
  name: string,
  email?: string,
  description?: string,
  socialLinks: SocialLink[]
}
export type ImageThumbnail = Image
export type ArticleContent = {
  fieldId: string,
  richEditor?: string,
  textarea?: string,
  linkCard?: Article
}
export type Article = {
  id: string,
  title: string,
  content: string,
  thumbnail?: Image,
  contributed: Contributed[],
  category: Category,
  tags?: Tag[],
  publishedAt: string,
  expandedContent?: ArticleContent[]
}
export type Adsvertisment = {
  image: Image,
  name: string,
  link: string,
  openNewTab: boolean,
  embedCode: string
}
export type Button = {
  type?: string[],
  icon?: string,
  name: string,
  href: string,
  openNewTab: boolean,
}
export type Inquiries = {
  isShow: boolean,
  title?: string,
  description?: string,
  buttons?: Button[]
}