// Components
import CommentBubble from "../shared/CommentBubble";
import CommentEditor from "@/components/shared/rich-content-editor/CommentEditor";

// Radix
import {
    ScrollArea, Flex, Blockquote, TextArea,
} from "@radix-ui/themes";

// Types
import type { ReactisTaskCommentsType } from "@/types/reactis";

type TaskDialogCommentsPropsType = {
    comments: ReactisTaskCommentsType,
    reactisTaskId: string,
    reactisUserId: string
};

export default function TaskDialogComments({
    comments,
    reactisTaskId,
    reactisUserId
}: TaskDialogCommentsPropsType) {
    return (
        <Blockquote size="2">
            <Flex direction="column" gap="4" style={{ minHeight: "100%", maxHeight: "min(50dvh, 488px)" }}>
                {comments.total_items > 0 && (
                    <ScrollArea scrollbars="vertical" type="auto" style={{ maxHeight: "100%" }}>
                        <Flex direction="column" gap="2">
                            {comments.items.map(item => (
                                <CommentBubble key={item.id} comment={item.text} />
                            ))}
                        </Flex>
                    </ScrollArea >
                )}
                
                <CommentEditor
                    reactisTaskId={reactisTaskId}
                    reactisUserId={reactisUserId}
                />
            </Flex>
        </Blockquote>
    );
}