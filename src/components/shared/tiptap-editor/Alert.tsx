"use client";

// Radix
import { AlertDialog, Flex, Text, Button } from "@radix-ui/themes";

// Types
import type { Dispatch, SetStateAction } from "react";

type AlertPropsType = {
    alertState: {
        isAlertOpened: boolean,
        onAlertOpenChange: Dispatch<SetStateAction<boolean>>;
    },
    alertHandlers: {
        handleStay: () => void;
        handleAbandonChanges: () => void
    }
};

export default function Alert({
    alertState: {
        isAlertOpened,
        onAlertOpenChange
    },
    alertHandlers: {
        handleStay,
        handleAbandonChanges
    }
}: AlertPropsType) {
    return (
        <AlertDialog.Root open={isAlertOpened} onOpenChange={onAlertOpenChange}>
            <AlertDialog.Content
                size="2"
                maxWidth="448px"
            >
                <AlertDialog.Title mt="4">Nie zapisałeś zmian</AlertDialog.Title>
                <AlertDialog.Description>
                    Zamknięcie spowoduje utratę niewysłanego komentarza i/lub niezapisanej notatki.
                </AlertDialog.Description>
                <Flex gap="2" mt="4" justify="end">
                    <AlertDialog.Action>
                        <Button size="3" variant="soft" onClick={handleAbandonChanges}>
                            <Text size="2">Zamknij bez zapisywania</Text>
                        </Button>
                    </AlertDialog.Action>

                    <AlertDialog.Cancel>
                        <Button size="3" variant="solid" onClick={handleStay}>
                            <Text size="2">Zostań</Text>
                        </Button>
                    </AlertDialog.Cancel>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
}