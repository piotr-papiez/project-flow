// Components
import CommentBubble from "../../shared/CommentBubble";
import CommentEditor from "@/components/shared/tiptap-editor/CommentEditor";

// Radix
import { ScrollArea, Flex, Blockquote } from "@radix-ui/themes";

// Types
import type { ReactisTaskCommentsType } from "@/types/reactis";

type CommentsSegmentPropsType = {
    comments: ReactisTaskCommentsType,
    reactisTaskId: string,
    reactisUserId: string
};

export default function CommentsSegment({
    comments,
    reactisTaskId,
    reactisUserId
}: CommentsSegmentPropsType) {
    return (
        <Blockquote size="2">
            <Flex direction="column" gap="4" style={{ minHeight: "100%", maxHeight: "calc(100dvh - 280px)" }}>
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