// Radix
import { Flex, Avatar, Text, Strong } from "@radix-ui/themes";

// Types
import type { TaskAuthorType } from "@/types/reactis";

type TaskAuthorAvatarPropsType = {
    reactisTaskAuthor: TaskAuthorType
};

export default function TaskAuthorAvatar({ reactisTaskAuthor }: TaskAuthorAvatarPropsType) {
    const { name: authorName, surname: authorSurname } = reactisTaskAuthor;

    return (
        <Flex gap="2" align="center">
            <Avatar
                size="1"
                color="gray"
                fallback={`${authorName[0]}${authorSurname[0]}`}
            />
            <Text size="2">
                <Strong>
                    {`${authorName} ${authorSurname}`}
                </Strong>
            </Text>
        </Flex>
    );
}