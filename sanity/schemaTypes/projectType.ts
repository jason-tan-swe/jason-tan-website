import {DocumentTextIcon} from '@sanity/icons'
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
  readingTime,
  externalLink,
} from './sharedFields'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    mainImageField,
    titleField,
    slugField,
    descriptionField,
    externalLink,
    authorField,
    toolsField,
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