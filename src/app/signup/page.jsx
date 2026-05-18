'use client'
import { authClient } from '@/lib/auth-client';
import { Card } from '@heroui/react';
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { reddit } from 'better-auth';
import { redirect } from 'next/navigation';
import React from 'react';

const SignUpPage = () => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData.entries());

        const { name, image, email, password } = userData;

        const {data, isPending} = await authClient.signUp.email({  
            name,
            image,
            email,
            password
        })

        if (data) {
            alert("Account created successfully! Please check your email to verify your account.");
            redirect('/login');
        }
    }
    return (
        <div className='space-y-8'>
            <div className='text-center'>
                <h2 className='text-2xl font-bold'>Create Account</h2>
                <p>Create a new account to get started.</p>
            </div>

            <div className='max-w-150 mx-auto'>
                <Card className='rounded-none border'>
                    <Form className="flex max:w-5xl flex-col gap-4" onSubmit={onSubmit}>
                        <TextField
                            isRequired
                            name="name"
                            type="text"
                        >
                            <Label>Name</Label>
                            <Input className={'rounded-none'} placeholder="John Doe" />
                            <FieldError />
                        </TextField>
                        <TextField
                            name="image"
                            type="text"
                        >
                            <Label>Image</Label>
                            <Input className={'rounded-none'} placeholder="Image URL" />
                            <FieldError />
                        </TextField>
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
                                Create Account
                                
                            </Button>
                            <Button className={'rounded-none'} type="reset" variant="secondary">
                                Reset
                            </Button>
                        </div>
                    </Form>
                </Card>
            </div>

        </div>
    );
};

export default SignUpPage;