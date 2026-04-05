// Components
import CommentBubble from "../shared/CommentBubble";

// Radix
import { ScrollArea, Box, Flex } from "@radix-ui/themes";

// Types
import type { ReactisTaskCommentsType } from "@/types/reactis";

type TaskDialogCommentsPropsType = {
    comments: ReactisTaskCommentsType
};

export default function TaskDialogComments({
    comments
}: TaskDialogCommentsPropsType) {
    return (
        <ScrollArea scrollbars="vertical" type="auto">
            <Box style={{ maxHeight: "min(36dvh, 488px)" }}>
                <Flex direction="column" gap="2">
                    {comments.items.map(item => (
                        <CommentBubble key={item.id} comment={item.text} />
                    ))}
                </Flex>
            </Box>
        </ScrollArea >
    );
}