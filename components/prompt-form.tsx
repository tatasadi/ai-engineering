'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useActionState } from 'react'
import { OpenAIChat } from '@/app/actions'

const FormSchema = z.object({
	prompt: z.string().min(10, {
		message: 'Prompt must be at least 10 characters.',
	}),
})

export default function PromptForm() {
	const [state, formAction, isPending] = useActionState(OpenAIChat, null)

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	})

	console.log(state)

	return (
		<Form {...form}>
			<form action={formAction} className="w-full space-y-6 flex flex-col">
				<FormField
					control={form.control}
					name="prompt"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Prompt</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Enter your prompt here"
									className="resize-none w-full min-h-40"
									{...field}
								/>
							</FormControl>
							<FormDescription></FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="self-end" disabled={isPending}>
					{isPending ? 'Submit...' : 'Submit'}
				</Button>
			</form>
			{state && (
				<div className="mt-6">
					<h2 className="text-xl font-bold">Response</h2>
					<p>{state}</p>
				</div>
			)}
		</Form>
	)
}
