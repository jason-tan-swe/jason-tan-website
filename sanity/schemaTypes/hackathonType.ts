// hackathonType.js
import {CodeBlockIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {
  mainImageField,
  titleField,
  descriptionField,
  slugField,
  authorField,
  toolsField,
  dateFields,
  detailsField,
  teammatesField,
  readingTime,
} from './sharedFields'

export const hackathonType = defineType({
  name: 'hackathon',
  title: 'Hackathon',
  type: 'document',
  icon: CodeBlockIcon,
  fields: [
    mainImageField,
    titleField,
    slugField,
    descriptionField,
    authorField,
    toolsField,
    teammatesField,
    ...dateFields,
    readingTime,
    detailsField,
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
