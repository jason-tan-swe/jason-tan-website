import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import { experienceType } from './experienceType'
import { projectType } from './projectType'
import { hackathonType } from './hackathonType'
import { personType } from './sharedFields'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [personType, blockContentType, categoryType, postType, authorType, experienceType, projectType, hackathonType],
}
