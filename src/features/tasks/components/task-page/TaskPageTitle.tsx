// Radix
import { Text } from "@radix-ui/themes";

// Types
type TaskDialogTitle = {
    title: string
};

export default function TaskDialogTitle({ title }: TaskDialogTitle) {
    return (
        <Text size="5" weight="medium">
            {title}
        </Text>
    );
}