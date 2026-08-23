import { Client } from '@notionhq/client'

if (!process.env.NOTION_API_KEY) {
  throw new Error('NOTION_API_KEY is not defined')
}

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

export const NOTION_DATA_SOURCE_ID = process.env.NOTION_DATA_SOURCE_ID

if (!NOTION_DATA_SOURCE_ID) {
  throw new Error('NOTION_DATA_SOURCE_ID is not defined')
}
