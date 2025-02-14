import {defineQuery} from 'next-sanity'

export const EXPERIENCES_QUERY = defineQuery(`*[_type == "experience"] {title, slug, companyInformation {companyLogo, companyAlt}, role {name}, description, tools, details, readingTime, startDate, endDate}|order(role.startDate asc)`)
export const EXPERIENCE_QUERY = defineQuery(`*[_type == "experience" && slug.current == $slug] {company, slug, companyInformation {companyLogo, companyAlt}, role {name, type, startDate, endDate, jobType, description}, tools, details}`)

export const PROJECTS_QUERY = defineQuery(`*[_type == "project"] {title, slug, mainImage, description, tools, details, readingTime, startDate, endDate}|order(startDate asc)`)

export const HACKATHONS_QUERY = defineQuery(`*[_type == "hackathon"] {title, slug, mainImage, description, tools, details, readingTime, teammates, startDate, endDate}|order(startDate asc)`)