"use client";

// Radix
import { AlertDialog, Flex, Text, Button } from "@radix-ui/themes";

// Types
import type { Dispatch, SetStateAction } from "react";

type AlertPropsType = {
    alertState: {
        isAlertOpen: boolean,
        onAlertOpenChange: Dispatch<SetStateAction<boolean>>;
    },
    alertHandlers: {
        handleCancelAlert: () => void;
        handleAcceptAlert: () => void
    }
};

export default function Alert({
    alertState: {
        isAlertOpen,
        onAlertOpenChange
    },
    alertHandlers: {
        handleCancelAlert,
        handleAcceptAlert
    }
}: AlertPropsType) {
    return (
        <AlertDialog.Root open={isAlertOpen} onOpenChange={onAlertOpenChange}>
            <AlertDialog.Content
                size="2"
                maxWidth="448px"
            >
                <AlertDialog.Title mt="4">Nie zapisałeś notatki</AlertDialog.Title>
                <AlertDialog.Description>
                    Zamknięcie spowoduje utratę niezapisanej notatki.
                </AlertDialog.Description>
                <Flex gap="2" mt="4" justify="end">
                    <AlertDialog.Action>
                        <Button size="3" variant="soft" onClick={handleAcceptAlert}>
                            <Text size="2">Zamknij bez zapisywania</Text>
                        </Button>
                    </AlertDialog.Action>

                    <AlertDialog.Cancel>
                        <Button size="3" variant="solid" onClick={handleCancelAlert}>
                            <Text size="2">Zostań</Text>
                        </Button>
                    </AlertDialog.Cancel>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
}