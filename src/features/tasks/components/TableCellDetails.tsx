// Components
import TaskAuthorAvatar from "./TaskAuthorAvatar";

// Radix
import {
    Box, Flex, HoverCard, Heading,
    Button, Blockquote, Text, Strong,
    Avatar
} from "@radix-ui/themes";

import { ReaderIcon, ExternalLinkIcon } from "@radix-ui/react-icons";

//Types
import type { TaskAuthorType } from "@/types/reactis";

type TableCellDetailsPropsType = {
    reactisTaskUrl: string
    detailsHtml: string,
    reactisTaskAuthor: TaskAuthorType
};

export default function TableCellDetails({ reactisTaskUrl, detailsHtml, reactisTaskAuthor }: TableCellDetailsPropsType) {
    const { name: authorName, surname: authorSurname } = reactisTaskAuthor;

    return (
        <HoverCard.Root openDelay={750} closeDelay={250}>
            <HoverCard.Trigger>
                <Flex align="center" gap="2">
                    <Avatar
                        size="1"
                        color="gray"
                        fallback={<ReaderIcon />}
                    />
                    <Box
                        style={{
                            maxWidth: 180,
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                        }}
                    >

                        {detailsHtml ? (
                            <span dangerouslySetInnerHTML={{ __html: detailsHtml }} />
                        ) : (
                            <Text className="NoDetailsText">Brak szczegółów.</Text>
                        )}

                    </Box>
                </Flex>
            </HoverCard.Trigger>

            <HoverCard.Content className="HoverCard-Content">
                <Flex direction="column" gap="3">
                    <Heading size="4" as="h3">
                        Szczegóły zadania
                    </Heading>
                    <Blockquote>
                        <Box
                            dangerouslySetInnerHTML={{ __html: detailsHtml }}
                        />
                    </Blockquote>

                    <TaskAuthorAvatar reactisTaskAuthor={reactisTaskAuthor} />

                    {reactisTaskUrl && (
                        <Flex justify={"end"}>
                            <Button
                                asChild
                                variant="soft"
                                className="ButtonWithLink"
                            >
                                <a
                                    href={reactisTaskUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Otwórz w Reactis
                                    <ExternalLinkIcon />
                                </a>
                            </Button>
                        </Flex>
                    )}
                </Flex>
            </HoverCard.Content>
        </HoverCard.Root>
    );
}