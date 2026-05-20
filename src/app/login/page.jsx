'use client'
import React, { useEffect, useRef } from 'react';
import { Card } from '@heroui/react';
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from '@/lib/auth-client';
import { redirect, useSearchParams } from 'next/navigation';
import { FcGoogle } from "react-icons/fc";
const LoginPage = () => {
    // showing alert if redirected
    const searchParams = useSearchParams();
    const wasRedirected = searchParams.get('redirected');
    const hasShown = useRef(false);
    useEffect(() => {
        if (wasRedirected && !hasShown.current) {
            alert('You need to log in to access that page.')
            hasShown.current = true;
        }
    }, [wasRedirected])

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData.entries());
        const { email, password } = userData;

        const { data, error } = await authClient.signIn.email({
            email,
            password
        });
        if (error) {
            alert(error.message);
        } else {
            alert("Logged in successfully!");
            redirect('/');
        }
    }

    const handleGoogleSignIn = async () => {
        const res = await authClient.signIn.social({
            provider: 'google',
        });
    }
    
    return (
        <div className='space-y-8'>
            <div className='text-center'>
                <h2 className='text-2xl font-bold'>Login to your Account</h2>
            </div>

            <div className='max-w-150 mx-auto'>
                <Card className='rounded-none border'>
                    <Form className="flex max:w-5xl flex-col gap-4" onSubmit={onSubmit}>

                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "Please enter a valid email address";
                                }
                                return null;
                            }}
                        >
                            <Label>Email</Label>
                            <Input className={'rounded-none'} placeholder="john@example.com" />
                            <FieldError />
                        </TextField>
                        <TextField
                            isRequired
                            minLength={8}
                            name="password"
                            type="password"
                            validate={(value) => {
                                if (value.length < 8) {
                                    return "Password must be at least 8 characters";
                                }
                                if (!/[A-Z]/.test(value)) {
                                    return "Password must contain at least one uppercase letter";
                                }
                                if (!/[0-9]/.test(value)) {
                                    return "Password must contain at least one number";
                                }
                                return null;
                            }}
                        >
                            <Label>Password</Label>
                            <Input className={'rounded-none'} placeholder="Enter your password" />
                            <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                            <FieldError />
                        </TextField>
                        <div className="flex gap-2 justify-center">
                            <Button className={'rounded-none'} type="submit">
                                Login

                            </Button>
                            <Button className={'rounded-none'} type="reset" variant="secondary">
                                Reset
                            </Button>
                        </div>
                    </Form>
                </Card>

                <div className='flex flex-col items-center mt-2'>
                    <p>Don&apos;t have an account? <a href='/signup' className='text-blue-500'>Sign Up</a></p>
                    <p>Or</p>
                    <Button onClick={handleGoogleSignIn} variant="tertiary" className={'rounded-none w-full'}>
                        <FcGoogle />
                        Sign in with Google
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default LoginPage;