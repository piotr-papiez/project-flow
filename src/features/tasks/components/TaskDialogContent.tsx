// Services
import { getMergedTask } from "../services/tasks.service";

// Repo
import { getReactisTaskComments } from "@/features/tasks/repo/reactis-tasks.repo";

// Components
import TableCellStatus from "./TableCellStatus";

// Radix
import {
    DataList, Flex, IconButton, Text,
    Tooltip
} from "@radix-ui/themes";

import { Pencil1Icon } from "@radix-ui/react-icons";

// Types
type TaskDialogContentPropsType = {
    reactisTaskId: string
};

export default async function TaskDialogContent({ reactisTaskId }: TaskDialogContentPropsType) {
    const [mergedTaskResponse, reactisCommentsResponse] = await Promise.all([
        getMergedTask(reactisTaskId),
        getReactisTaskComments(reactisTaskId)
    ]);

    if (!mergedTaskResponse) {
        return (
            <div>
                Nie udało się pobrać szczegółów zadania
            </div>
        );
    }

    const mergedTask = mergedTaskResponse;
    const reactisComments = reactisCommentsResponse.ok
        ? reactisCommentsResponse.data
        : { items: [] };

    return (
        <>
            <div>
                <Flex direction="column" gap="3">
                    <Text size="5">{mergedTask.name}</Text>

                    <DataList.Root>
                        <DataList.Item align="center">
                            <DataList.Label>Status</DataList.Label>
                            <DataList.Value>
                                <TableCellStatus
                                    reactisTaskId={mergedTask.reactisTaskId ?? ""}
                                    currentStatusValue={Number(mergedTask?.flowStatus)}
                                />
                            </DataList.Value>
                        </DataList.Item>

                        <DataList.Item align="start">
                            <DataList.Label>Notatka</DataList.Label>
                            <DataList.Value>
                                {mergedTask.flowNotes !== "" ? (
                                    <Flex
                                        align="center"
                                        gap="2"
                                    >
                                        <Tooltip content="Edytuj notatkę">
                                            <IconButton
                                                variant="soft"
                                                size="1"
                                            >
                                                <Pencil1Icon fontSize="" />
                                            </IconButton>
                                        </Tooltip>
                                        <Text >{mergedTask.flowNotes}</Text>
                                    </Flex>
                                ) : (
                                    <Text className="NoDetailsText">Brak notatki.</Text>
                                )}
                            </DataList.Value>
                        </DataList.Item>
                    </DataList.Root>
                </Flex>
            </div>
        </>
    );
}