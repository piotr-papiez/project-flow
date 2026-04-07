// Radix
import {
    Blockquote, Flex, ScrollArea, Box
} from "@radix-ui/themes";

// Types
import type { MergedTaskDataType } from "@/types/flow";
import type { ReactisTaskCommentsType } from "@/types/reactis";

type TaskDialogDetailsPropsType = {
    details: string
};

export default function TaskDialogDetails({ details }: TaskDialogDetailsPropsType) {
    return (
        <>
            <div>
                <Flex direction="column" gap="6">
                    <Flex direction="column" gap="4">
                        <ScrollArea scrollbars="vertical" type="auto">
                            <Box style={{ maxHeight: "min(50dvh, 488px)" }}>
                                <Blockquote size="2" mr="4" dangerouslySetInnerHTML={{ __html: details }} />
                            </Box>
                        </ScrollArea>
                    </Flex>

                    {/* <DataList.Root>
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
                    </DataList.Root> */}

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

                    {/* <Flex justify="end" gap="2">
                        <Button variant="soft" size="3">
                            <Text size="2">
                                Udostępnij
                            </Text>
                        </Button>

                        <Button size="3" style={{ padding: "0 16px 0 8px" }}>
                            <Flex align="center" gap="1">
                                <CheckIcon width="22" height="22" />
                                <Text size="2">
                                    Zakończ zadanie
                                </Text>
                            </Flex>
                        </Button>
                    </Flex> */}
                </Flex>
            </div>
        </>
    );
}