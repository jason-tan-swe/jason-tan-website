// experienceType.js
import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {
  slugField,
  toolsField,
  authorField,
  publishedAtField,
  detailsField,
  companyInformationField,
  titleField,
  descriptionField,
  dateFields,
  readingTime,
} from './sharedFields'

export const experienceType = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'company',
      type: 'string',
    }),
    {
      ...slugField,
      options: {
        source: 'company',
      }, // Overrides default source
    },
    defineField({
      name: 'role',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          type: 'string',
        }),
        defineField({
          name: 'type',
          type: 'string',
          options: {
            list: [
              {title: 'Frontend', value: 'frontend'},
              {title: 'Backend', value: 'backend'},
              {title: 'Full-stack', value: 'full-stack'},
              {title: 'Mobile', value: 'mobile'},
              {title: 'Full-stack/Mobile', value: 'full-stack/mobile'},
            ],
          },
        }),
        defineField({
          name: 'startDate',
          type: 'date',
          options: {
            dateFormat: 'MMMM YYYY',
          },
        }),
        defineField({
          name: 'endDate',
          type: 'date',
          options: {
            dateFormat: 'MMMM YYYY',
          },
        }),
        defineField({
          name: 'jobType',
          type: 'string',
          options: {
            list: [
              {title: 'Full-time', value: 'full-time'},
              {title: 'Part-time', value: 'part-time'},
              {title: 'Intern', value: 'intern'},
            ],
          },
        }),
      ],
    }),
    companyInformationField,
    titleField,
    descriptionField,
    authorField,
    toolsField,
    ...dateFields,
    readingTime,
    detailsField,
  ],
  preview: {
    select: {
      title: 'company',
      media: 'companyInformation.companyLogo',
    },
  },
})

