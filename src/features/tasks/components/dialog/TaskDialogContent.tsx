// Services
import { getMergedTask } from "../../services/tasks.service";

// Repo
import { getReactisTaskComments } from "@/features/tasks/repo/reactis-tasks.repo";

// Components
import StatusBadge from "../shared/StatusBadge";
import PriorityBadge from "../shared/PriorityBadge";
import TaskAuthorAvatar from "../shared/TaskAuthorAvatar";

// Utils
import formatDate from "../../utils/date-formatter";

// Radix
import {
    Blockquote, DataList, Flex, IconButton,
    Text, Tooltip, ScrollArea, Box,
    Button
} from "@radix-ui/themes";

import { CalendarIcon, CheckIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";

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
                <Flex direction="column" gap="6">
                    <Flex direction="column" gap="4">

                        <Flex gap="4" align="center">
                            <Tooltip content="Autor">
                                <TaskAuthorAvatar reactisTaskAuthor={mergedTask.author} />
                            </Tooltip>

                            <Flex align="center" gap="2">
                                <CalendarIcon color="blue" width="12" height="12" />
                                <Flex align="center" gap="1">
                                    <Tooltip content="Data utworzenia">
                                        <Text size="2" color="gray">{formattedCreateDate}</Text>
                                    </Tooltip>
                                    <DoubleArrowRightIcon color="gray" width="10" height="10" />
                                    <Tooltip content="Deadline">
                                        <Text size="2" color="gray">{formattedDeadline}</Text>
                                    </Tooltip>
                                </Flex>
                            </Flex>
                        </Flex>

                        <Text size="5">{mergedTask.name}</Text>

                        <ScrollArea scrollbars="vertical" type="auto">
                            <Box style={{ maxHeight: "min(35dvh, 488px)" }}>
                                <Blockquote size="2" mr="4" dangerouslySetInnerHTML={{ __html: mergedTask.text }} />
                            </Box>
                        </ScrollArea>
                    </Flex>

                    <DataList.Root>
                        <DataList.Item align="center">
                            <DataList.Label>Status</DataList.Label>
                            <DataList.Value>
                                <StatusBadge
                                    reactisTaskId={mergedTask.reactisTaskId ?? ""}
                                    currentStatusValue={Number(mergedTask?.flowStatus)}
                                />
                            </DataList.Value>
                        </DataList.Item>

                        <DataList.Item align="center">
                            <DataList.Label>Priorytet</DataList.Label>
                            <DataList.Value>
                                <PriorityBadge
                                    reactisTaskId={mergedTask.reactisTaskId ?? ""}
                                    currentPriorityValue={Number(mergedTask?.flowPriority)}
                                />
                            </DataList.Value>
                        </DataList.Item>

                        {/* <DataList.Item align="start">
                            <DataList.Label>Notatka</DataList.Label>
                            <DataList.Value>

                                <Flex
                                    align="baseline"
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
                                    {mergedTask.flowNotes !== "" ? (
                                        <Text style={{ transform: "translateY(-3px)" }}>{mergedTask.flowNotes}</Text>
                                    ) : (
                                        <Text style={{ transform: "translateY(-3px)" }} className="NoDetailsText">Brak notatki</Text>
                                    )}
                                </Flex>

                            </DataList.Value>
                        </DataList.Item> */}

                        {/* <DataList.Item align="center">
                            {mergedTask.}
                        </DataList.Item> */}
                    </DataList.Root>
                    <Flex justify="end" gap="2">
                        <Button variant="soft" size="3">
                            <Text size="2" style={{ transform: "translateY(-1px)" }}>
                                Skomentuj
                            </Text>
                        </Button>

                        <Button size="3" style={{ padding: "0 16px 0 8px" }}>
                            <Flex align="center" gap="1">
                                    <CheckIcon width="22" height="22" style={{ transform: "translateY(-1px)" }} />
                                    <Text size="2" style={{ transform: "translateY(-1px)" }}>
                                        Zakończ zadanie
                                    </Text>
                            </Flex>
                        </Button>
                    </Flex>
                </Flex>
            </div>
        </>
    );
}