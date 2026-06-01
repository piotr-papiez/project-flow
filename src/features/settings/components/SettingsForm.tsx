"use client";


// Actions
import { saveReactisSettings } from "../actions/flow-settings.action";


// Constants
const initialState = {
    ok: undefined,
    inputErrors: {}
};


// Hooks
import { useState, useActionState } from "react";


// Radix
import { Button, Flex, Text, TextField, HoverCard, Strong } from "@radix-ui/themes";
import { PersonIcon, LockClosedIcon, InfoCircledIcon } from "@radix-ui/react-icons";


// Types
import type { SaveReactisSettingsStateType } from "@/types/reactis";


type SettingsFormPropsType = {
    reactisUserEmail: string,
    reactisUserId: string
};


// Main function
export default function SettingsForm({ reactisUserEmail, reactisUserId }: SettingsFormPropsType) {
    const [userEmailValue, setUserEmailValue] = useState<string>(reactisUserEmail);
    const [userIdValue, setUserIdValue] = useState<string>(reactisUserId);


    const [formState, formAction, isPending] = useActionState<SaveReactisSettingsStateType, FormData>(saveReactisSettings, initialState);


    return (
        <form action={formAction}>
            <Flex justify="center">
                <Flex direction="column" gap="3" style={{ width: 360 }}>
                    <Flex direction="column" gap="1">
                        <Flex gap="1">
                            <Text as="label" htmlFor="reactis-user-email" size="2" ml="2">
                                Adres e-mail
                            </Text>
                            <HoverCard.Root openDelay={750} closeDelay={250}>
                                <HoverCard.Trigger>
                                    <InfoCircledIcon color="blue" />
                                </HoverCard.Trigger>
                                <HoverCard.Content side="top" style={{ maxWidth: 360 }}>
                                    <Flex direction="column" gap="1">
                                        <Text>
                                            Twój adres e-mail używany do logowania w Reactis.
                                        </Text>
                                    </Flex>
                                </HoverCard.Content>
                            </HoverCard.Root>
                        </Flex>

                        <TextField.Root
                            size="3"
                            id="reactis-user-email"
                            name="reactis-user-email"
                            style={{ fontSize: "0.875rem" }}
                            value={userEmailValue}
                            onChange={event => setUserEmailValue(event.target.value)}
                        >
                            <TextField.Slot pl="3">
                                <PersonIcon />
                            </TextField.Slot>
                        </TextField.Root>

                        {formState.formErrors?.reactisUserEmail && (
                            <Text size="1" color="ruby" ml="2">
                                {formState.formErrors.reactisUserEmail}
                            </Text>
                        )}
                    </Flex>


                    <Flex direction="column" gap="1">
                        <Flex gap="1">
                            <Text as="label" htmlFor="reactis-user-id" size="2" ml="2">
                                ID użytkownika
                            </Text>
                            <HoverCard.Root openDelay={750} closeDelay={250}>
                                <HoverCard.Trigger>
                                    <InfoCircledIcon color="blue" />
                                </HoverCard.Trigger>
                                <HoverCard.Content side="top" style={{ width: 360 }}>
                                    <Flex direction="column" gap="1">
                                        <Text>
                                            Twoje ID użytkownika to numer znajdujący się na końcu adresu
                                            strony internetowej po zalogowaniu w Reactis.
                                        </Text>
                                        <Text>
                                            Na przykład: https://ncrm.netgraf.pl/task/user_list/<Strong>1298</Strong>
                                        </Text>
                                    </Flex>
                                </HoverCard.Content>
                            </HoverCard.Root>
                        </Flex>

                        <TextField.Root
                            size="3"
                            id="reactis-user-id"
                            name="reactis-user-id"
                            style={{ fontSize: "0.875rem" }}
                            value={userIdValue}
                            onChange={event => setUserIdValue(event.target.value)}
                        >
                            <TextField.Slot pl="3">
                                <PersonIcon />
                            </TextField.Slot>
                        </TextField.Root>

                        {formState.formErrors?.reactisUserId && (
                            <Text size="1" color="ruby" ml="2">
                                {formState.formErrors.reactisUserId}
                            </Text>
                        )}
                    </Flex>


                    <Flex direction="column" gap="1">
                        <Flex gap="1">
                            <Text as="label" htmlFor="reactis-api-key" size="2" ml="2">
                                Klucz API
                            </Text>
                            <HoverCard.Root openDelay={750} closeDelay={250}>
                                <HoverCard.Trigger>
                                    <InfoCircledIcon color="blue" />
                                </HoverCard.Trigger>
                                <HoverCard.Content side="top" style={{ width: 360 }}>
                                    <Flex direction="column" gap="1">
                                        <Text>
                                            Twój klucz API znajduje się w ustawieniach konta, w panelu Reactis
                                            (<Strong>Menu → Twoje konto → Podstawowe dane → Klucz API</Strong>).
                                        </Text>
                                    </Flex>
                                </HoverCard.Content>
                            </HoverCard.Root>
                        </Flex>

                        <TextField.Root
                            size="3"
                            id="reactis-api-key"
                            name="reactis-api-key"
                            type="password"
                            style={{ fontSize: "0.875rem" }}
                            placeholder="Wartość ukryta"
                        >
                            <TextField.Slot pl="3">
                                <LockClosedIcon />
                            </TextField.Slot>
                        </TextField.Root>

                        {formState.formErrors?.reactisApiKey && (
                            <Text size="1" color="ruby" ml="2">
                                {formState.formErrors.reactisApiKey}
                            </Text>
                        )}

                        {formState.formErrors?.other ? (
                            <Flex align="center" justify="between" mt="5">
                                <Text size="1" color="ruby" ml="2">
                                    {formState.formErrors.other}
                                </Text>

                                <Button
                                    loading={isPending}
                                    size="3"
                                >
                                    <Text size="2">
                                        Zapisz
                                    </Text>
                                </Button>
                            </Flex>

                        ) : (
                            <Flex justify="end" mt="5">
                                <Button
                                    loading={isPending}
                                    size="3"
                                >
                                    <Text size="2">
                                        Zapisz
                                    </Text>
                                </Button>
                            </Flex>
                        )}
                    </Flex>
                </Flex>
            </Flex>
        </form>
    );
}