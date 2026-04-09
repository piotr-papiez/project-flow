// Radix
import { Card, Text } from "@radix-ui/themes";

type CommentBubblePropsType = {
    comment: string
};

export default function CommentBubble({ comment }: CommentBubblePropsType) {
    console.log(comment);
    return (
        <Card
            size="1"
            variant="surface"
            style={{
                backgroundColor: "var(--accent-5)",
                width: "fit-content",
                maxWidth: "60%"
            }}
        >
            <Text
                size="2"
                dangerouslySetInnerHTML={{ __html: comment }}
            />
        </Card>
    );
}