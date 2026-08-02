// Radix
import {
    Blockquote, Flex, ScrollArea, Box
} from "@radix-ui/themes";

// Types
import type { MergedTaskDataType } from "@/types/flow";
import type { ReactisTaskCommentsType } from "@/types/reactis";

type DetailsSegmentPropsType = {
    details: string
};

export default function DetailsSegment({ details }: DetailsSegmentPropsType) {
    return (
        <Flex direction="column" gap="6">
            <Flex direction="column" gap="4">
                <ScrollArea scrollbars="vertical" type="auto">
                    <Box style={{ minHeight: "100%", maxHeight: "min(50dvh, 488px)" }}>
                        <Blockquote size="2" mr="4" dangerouslySetInnerHTML={{ __html: details }} />
                    </Box>
                </ScrollArea>
            </Flex>
        </Flex>
    );
}