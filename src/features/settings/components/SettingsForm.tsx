"use client";

// Hooks
import { useState, useActionState } from "react";

// Actions
import { saveFlowSettings } from "../actions/flow-settings.action";

// Radix
import { Button, Flex, Text, TextField, HoverCard, Strong } from "@radix-ui/themes";
import { PersonIcon, LockClosedIcon, InfoCircledIcon } from "@radix-ui/react-icons";

// Types
import { ReactNode } from "react";
import type { ReactisSettingsType } from "../models/flow-settings.model";

type SettingsFormPropsType = {
    reactisUserId: string
};

export default function SettingsForm({ reactisUserId }: SettingsFormPropsType) {
    const [userIdValue, setUserIdValue] = useState<string>(reactisUserId);

    const [formState, formAction, isPending] = useActionState<{}, FormData>(saveFlowSettings, {});

    return (
        <form action={formAction}>
            <Flex justify="center">
                <Flex direction="column" gap="3" style={{ width: 360 }}>
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
                    </Flex>
                </Flex>
            </Flex>
        </form>
    );
}

{/* <p>
                <label htmlFor="reactis-user-id">Reactis User ID</label>
                <input name="reactis-user-id" type="text" />
            </p>
            <p>
                <label htmlFor="reactis-api-key">Reactis API Key</label>
                <input name="reactis-api-key" type="text" />
            </p>

            <p>
                <button>Zapisz</button>
            </p> */}