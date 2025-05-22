"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import { toast } from "sonner";
import { FormType } from "../../../types";
import { authFormSchema } from "@/lib/validation";
import FormField from "./form-field";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



const AuthForm = ({ type }: {type: FormType}) => {
    const router = useRouter();
    const formSchema = authFormSchema(type);

    const authUser = undefined;

     useEffect(() => {
    if (authUser) {
      router.push('/');
    }
  }, [authUser]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        username: "",
        email: "",
        password: ""
        },
    })


    
    async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      if (type === 'sign-up') {
        //await signUp(values);
        if (authUser) {
          toast.success("Account created successfully!");
          router.push('/sign-in');
        }
      } else {
        //await logIn(values);
        if (authUser) {
          toast.success("Signed in successfully!");
          router.push('/');
        }
      }
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof Error) {
        toast.error(`There was an error: ${error.message}`);
      } else {
        toast.error("There was an unknown error.");
      }
    }
  }

    const isSignIn = type === 'sign-in';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {!isSignIn && (
                <FormField
                control={form.control} 
                name="username" 
                label="username"
                placeholder="username" 
                />
            )}
              <FormField
                control={form.control} 
                name="email" 
                label="email"
                placeholder="email" 
                type="email" 
                />
                  <FormField
                control={form.control} 
                name="password" 
                label="password"
                placeholder="password" 
                type="password" 
                />
                <Button className="maxter-bg" type="submit">
                    {isSignIn ? 'Sign in' : 'Create Account'}
                </Button>
      </form>
    </Form>
  )
}

export default AuthForm;