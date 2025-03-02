import { z } from 'zod'

const responseSchema = z.object({
	hits: z.array(
		z.object({
			webformatURL: z.string(),
		}),
	),
})

const findImage = async (searchText: string) => {
	const url = new URL('https://pixabay.com/api/')
	url.searchParams.append('key', process.env.PIXABAY_API_KEY)
	url.searchParams.append('per_page', '3')
	url.searchParams.append('safe_search', 'true')
	url.searchParams.append('image_type', 'photo')
	url.searchParams.append('q', searchText)

	const response = await fetch(url)
	const data = responseSchema.parse(await response.json())
	return data.hits[0].webformatURL
}

export { findImage }
