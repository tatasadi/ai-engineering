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

const FormSchema = z.object({
	prompt: z.string().min(10, {
		message: 'Prompt must be at least 10 characters.',
	}),
})

export default function PromptForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log(data)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 flex flex-col">
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
				<Button type="submit" className="self-end">
					Submit
				</Button>
			</form>
		</Form>
	)
}
