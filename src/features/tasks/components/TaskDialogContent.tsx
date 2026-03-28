// Services
import { getMergedTask } from "../services/tasks.service";

// Repo
import { getReactisTaskComments } from "@/features/tasks/repo/reactis-tasks.repo";

// Components
import TableCellStatus from "./TableCellStatus";
import TableCellPriority from "./TableCellPriority";
import TaskAuthorAvatar from "./TaskAuthorAvatar";

// Utils
import formatDate from "../utils/date-formatter";

// Radix
import {
    DataList, Flex, IconButton, Text,
    Tooltip, Badge
} from "@radix-ui/themes";

import { Pencil1Icon, DoubleArrowRightIcon } from "@radix-ui/react-icons";

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

    const formattedCreateDate = formatDate(mergedTask.create_date)
        ?? <Text className="NoDetailsText">Brak daty utworzenia</Text>;

    const formattedDeadline = formatDate(mergedTask.deadline)
        ?? <Text className="NoDetailsText">Brak deadline</Text>

    return (
        <>
            <div>
                <Flex direction="column" gap="4">
                    <TaskAuthorAvatar reactisTaskAuthor={mergedTask.author} />
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

                        <DataList.Item align="center">
                            <DataList.Label>Priorytet</DataList.Label>
                            <DataList.Value>
                                <TableCellPriority
                                    reactisTaskId={mergedTask.reactisTaskId ?? ""}
                                    currentPriorityValue={Number(mergedTask?.flowPriority)}
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
                        <DataList.Item align="center">
                            <DataList.Label>
                                Daty
                            </DataList.Label>
                            <DataList.Value>
                                <Flex align="center" gap="3">
                                    <Tooltip content="Data utworzenia">
                                        <Text color="gray">{formattedCreateDate}</Text>
                                    </Tooltip>
                                    <DoubleArrowRightIcon color="gray" width="12" height="12" />
                                    <Tooltip content="Deadline">
                                        <Text color="gray">{formattedDeadline}</Text>
                                    </Tooltip>
                                </Flex>

                            </DataList.Value>
                        </DataList.Item>
                    </DataList.Root>
                </Flex>
            </div>
        </>
    );
}