"use client";

// Hooks
import { useActionState } from "react";

// Actions
import { signup } from "../actions/signup.action";

// Next.js
import NextLink from "next/link";

// Radix
import {
    Card, Flex, Text, Heading,
    Button, TextField, Link as RadixLink
} from "@radix-ui/themes";

import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";

export default function SignUpForm() {
    const [formState, formAction, isPending] = useActionState<{}, FormData>(signup, {});

    return (
        <form action={formAction}>
            <Card size="3" style={{ width: 360 }} >
                <Flex direction="column" gap="3" py="4">
                    <Heading as="h3" size="5" mb="4">
                        Zarejestruj się
                    </Heading>

                    <Flex direction="column" gap="1">
                        <Text as="label" htmlFor="email" size="2" ml="2">
                            E-mail
                        </Text>

                        <TextField.Root
                            placeholder="Wpisz e-mail"
                            size="3"
                            id="email"
                            name="email"
                            type="email"
                            style={{ fontSize: "0.875rem" }}
                        >
                            <TextField.Slot pl="3">
                                <EnvelopeClosedIcon />
                            </TextField.Slot>
                        </TextField.Root>
                    </Flex>

                    <Flex direction="column" gap="1">
                        <Text as="label" htmlFor="email" size="2" ml="2">
                            Hasło
                        </Text>

                        <TextField.Root
                            placeholder="Wpisz hasło"
                            size="3"
                            id="password"
                            name="password"
                            type="password"
                            style={{ fontSize: "0.875rem" }}
                        >
                            <TextField.Slot pl="3">
                                <LockClosedIcon />
                            </TextField.Slot>
                        </TextField.Root>
                    </Flex>

                    <Flex direction="column" mt="5" gap="3">
                        <Button
                            loading={isPending}
                            size="3"
                            style={{ fontSize: "0.875rem" }}
                        >
                            Zarejestruj się
                        </Button>
                        
                        <Flex justify="center">
                            <RadixLink size="3" style={{ fontSize: "0.875rem" }} asChild >
                                <NextLink href="/signin">
                                    Zaloguj się
                                </NextLink>
                            </RadixLink>
                        </Flex>
                    </Flex>
                </Flex>
            </Card>
        </form >
    );
}