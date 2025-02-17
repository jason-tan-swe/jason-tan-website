// postType.js
import {DocumentTextIcon} from '@sanity/icons'
import {defineType} from 'sanity'
import {
  titleField,
  descriptionField,
  slugField,
  authorField,
  mainImageField,
  categoriesField,
  publishedAtField,
  detailsField,
  readingTime,
  externalLink,
} from './sharedFields'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    titleField,
    descriptionField,
    externalLink,
    slugField,
    authorField,
    mainImageField,
    categoriesField,
    publishedAtField,
    readingTime,
    detailsField,
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
