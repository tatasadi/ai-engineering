'use server'

import OpenAI from 'openai'
const openai = new OpenAI()

export async function OpenAIChat(state: Record<string, unknown>, data: FormData) {
	const prompt = data.get('prompt') ?? ''
	const messages = [
		{
			role: 'system',
			content: 'You are a helpful general knowledge expert.',
		},
		{
			role: 'user',
			content: prompt as string,
		},
	]

	const completion = await openai.chat.completions.create({
		model: 'gpt-4o',
		messages,
	})

	return completion.choices[0].message.content
}
