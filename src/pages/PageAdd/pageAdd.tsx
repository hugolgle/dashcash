"use client"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../../../@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../@/components/ui/form"
import { Input } from "../../../@/components/ui/input"

const formSchema = z.object({
  categorie: z.string().min(0, {
  }),
  title: z.string().min(0, {
    message: "Le mot de passe doit avoir au moins 0 caractères.",
  }),
  date: z.string().min(0, {
    message: "Le mot de passe doit avoir au moins 0 caractères.",
  }),
  price: z.string().min(0, {
    message: "Le mot de passe doit avoir au moins 0 caractères.",
  }),
})

const PageAdd = (props: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categorie: "",
      title: "",
      date: "",
      price: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  return <>
    <h2 className="text-5xl font-thin">Ajouter une {props.page}</h2>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-96 py-16">
        <FormField
          control={form.control}
          name="categorie"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <FormControl>
                <Input className="p-3 rounded-xl m-2" placeholder="Catégorie" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input className="p-3 rounded-xl m-2" placeholder="Titre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input className="p-3 rounded-xl m-2" placeholder="Date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Montant</FormLabel>
              <FormControl>
                <Input className="p-3 rounded-xl m-2" placeholder="Montant" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-1/2" type="submit">Ajouter</Button>
      </form>
    </Form>

  </>

}
export default PageAdd;