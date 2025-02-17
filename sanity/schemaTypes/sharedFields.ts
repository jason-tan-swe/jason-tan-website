import {defineField, defineArrayMember} from 'sanity'

export const mainImageField = defineField({
  name: 'mainImage',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
    },
  ],
})

export const titleField = defineField({
  name: 'title',
  type: 'string',
})

export const descriptionField = defineField({
  name: 'description',
  type: 'string',
})

export const slugField = defineField({
  name: 'slug',
  type: 'slug',
  options: {
    source: 'title',
  },
})

export const authorField = defineField({
  name: 'author',
  type: 'reference',
  to: {type: 'author'},
})

export const toolsField = defineField({
  name: 'tools',
  type: 'array',
  of: [{type: 'string'}],
})

export const categoriesField = defineField({
  name: 'categories',
  type: 'array',
  of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
})

export const publishedAtField = defineField({
  name: 'publishedAt',
  type: 'datetime',
  initialValue: new Date().toISOString(),
})

export const startDateField = defineField({
  name: 'startDate',
  type: 'datetime',
})

export const endDateField = defineField({
  name: 'endDate',
  type: 'datetime',
})

export const dateFields = [
  publishedAtField,
  startDateField,
  endDateField,
]

export const detailsField = defineField({
  title: 'Details',
  name: 'details',
  type: 'blockContent',
})

export const personType = defineField({
  name: 'person',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'link',
      type: 'url',
      title: 'Profile Link',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
      },
    }),
  ],
})

export const teammatesField = defineField({
  name: 'teammates',
  type: 'array',
  of: [defineArrayMember({type: 'reference', to: {type: 'person'}})],
})

export const readingTime = defineField({
  name: 'readingTime',
  type: 'string',
})

export const externalLink = defineField({
  name: 'externalLink',
  type: 'url'
})

export const companyInformationField = defineField({
  name: 'companyInformation',
  type: 'object',
  fields: [
    defineField({
      name: 'companyLogo',
      type: 'image',
    }),
    defineField({
      name: 'companyAlt',
      type: 'string',
    }),
  ],
})
