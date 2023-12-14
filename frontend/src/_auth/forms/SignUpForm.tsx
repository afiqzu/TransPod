import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {Button} from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {useToast} from '@/components/ui/use-toast.ts'
import {useForm} from 'react-hook-form'
import {SignUpValidation} from '@/lib/validation'
import {Link, useNavigate} from 'react-router-dom'

import {useUserContext} from '@/context/AuthContext.tsx'
import {useCreateUserAccount, useSignInAccount} from "@/lib/tanstack-query/queriesAndMutations.ts";

export const SignUpForm = () => {
    const {toast} = useToast()
    const {checkAuthUser} = useUserContext()
    const navigate = useNavigate()
    const {mutateAsync: createUserAccount, isPending: isCreatingUser} =
        useCreateUserAccount()
    const {mutateAsync: signInAccount} = useSignInAccount()

    // 1. Define your form.
    const form = useForm<z.infer<typeof SignUpValidation>>({
        resolver: zodResolver(SignUpValidation),
        defaultValues: {
            name: '',
            username: '',
            email: '',
            password: '',
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof SignUpValidation>) {
        // @ts-ignore
        const newUser = await createUserAccount(values)

        if (!newUser) {
            return toast({title: 'Sign up failed. Please try again.'})
        }

        const session = await signInAccount({
            email: values.email,
            password: values.password,
        })

        if (!session) {
            return toast({title: 'Sign in failed. Please try again.'})
        }

        const isLoggedIn = await checkAuthUser()
        if (isLoggedIn) {
            form.reset()
            navigate('/')
        } else {
            toast({title: 'Sign in failed. Please try again.'})
        }
    }

    return (
        <Form {...form}>
            <div className="w-420 flex justify-center items-center flex-col">
                <div className="flex gap-1 m-0 p-0">
                    <img
                        src="/assets/logo.png"
                        alt="logo"
                        height={30}
                        width={34}
                    />
                    <p className="text-3xl font-medium text-black m-0 ml-1">TransPod</p>
                </div>
                <h2 className="pt-0 font-bold text-2xl mt-10">
                    Create your account
                </h2>


                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 w-full mt-4"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input type="text" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input type="text" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="shad-button_primary">
                        {isCreatingUser ? (
                            <div className="flex-center gap-2">
                                Creating account...
                            </div>
                        ) : (
                            'Sign up'
                        )}
                    </Button>
                    <p className="text-small-regular text-dark-3 text-center mt-2">
                        Already have an account?
                        <Link
                            to="/sign-in"
                            className="text-tertiary-500 font-medium ml-2"
                        >
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </Form>
    )
}

export default SignUpForm