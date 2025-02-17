"use client"
import { Hackathon, Post, Project, PROJECTS_QUERYResult } from "@/sanity/sanity.types"
import { createClient } from "@sanity/client"
import { queryOptions } from "@tanstack/react-query"
import SanityConfig from "@/sanity.config"
import { BLOGS_QUERY, HACKATHONS_QUERY, PROJECTS_QUERY } from "@/sanity/lib/queries"

const client = createClient(SanityConfig);

const fetchProjects = async () => {
    // const res = await fetch('/api/project')
    // const data = await res.json()
    // if (!data.success) throw new Error('Failed to fetch hackathons')
    // return data.data as Project[]
    return await client.fetch(PROJECTS_QUERY) as Project[];
}

const fetchHackathons = async () => {
    return await client.fetch(HACKATHONS_QUERY) as Hackathon[];
}
 
const fetchBlogs = async () => {
    return await client.fetch(BLOGS_QUERY) as Post[];
}

export const projectOptions = queryOptions({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    initialData: [] as Project[],
})

export const hackathonOptions = queryOptions({
    queryKey: ['hackathons'],
    queryFn: fetchHackathons,
    initialData: [] as Hackathon[],
});

export const blogOptions = queryOptions({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
    initialData: [] as Post[],
});