"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "../../../@/lib/utils"

import { Button } from "../../../@/components/ui/button"
import { Calendar } from "../../../@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../@/components/ui/form"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../@/components/ui/popover"

import { toast } from "../../../@/components/ui/use-toast"

import { Input } from "../../../@/components/ui/input"
import { Link } from "react-router-dom"

const formSchema = z.object({
  categorie: z.string({
    required_error: "Selectionner une categorie",
  })
    .email(),
  title: z.string().min(0, {
    message: "Le mot de passe doit avoir au moins 0 caractères.",
  }),
  date: z.date({
    required_error: "La date est requise",
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
      date: new Date(),
      price: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  return <>
    <h2 className="text-5xl font-thin">Ajouter une {props.page}</h2>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="px-96 py-16">
        <FormField
          control={form.control}
          name="categorie"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Catégorie</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="p-3 rounded-xl m-2 border-0">
                    <SelectValue placeholder="Selectionner une catégorie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="felx felx-col p-3 rounded-xl bg-black w-full">
                  <SelectItem value="abonnement">Abonnement</SelectItem>
                  <SelectItem value="loisir">Loisir</SelectItem>
                  <SelectItem value="quotidien">Quotidien</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
              </FormDescription>
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
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "flex w-full p-3 rounded-xl m-2 text-left font-normal border-0",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Choisissez une date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-4 w-96 bg-slate-600">
                  <Calendar
                    className="bg-slate-500"
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>

              </FormDescription>
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
        <Button className="w-1/2 rounded-xl" type="submit">Ajouter</Button>
      </form>
    </Form>

  </>

}
export default PageAdd;