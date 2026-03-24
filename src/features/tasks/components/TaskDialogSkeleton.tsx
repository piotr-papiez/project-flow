// Radix
import { Flex, Skeleton, Box } from "@radix-ui/themes";

export default function TaskDialogSkeleton() {
    return (
        <Flex direction="column" gap="3">
            <Skeleton>
                <Box style={{ height: 16, width: "60%" }} />
            </Skeleton>

            <Skeleton>
                <Box style={{ height: 16, width: "30%" }} />
            </Skeleton>

            <Skeleton>
                <Box style={{ height: 16, width: "40%" }} />
            </Skeleton>

            <Skeleton>
                <Box style={{ height: 16, width: "50%" }} />
            </Skeleton>
        </Flex>
    );
}