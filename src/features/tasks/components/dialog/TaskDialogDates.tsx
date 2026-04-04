// Radix
import { Flex, Tooltip, Text } from "@radix-ui/themes";
import { CalendarIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";

// Utils
import formatDate from "../../utils/date-formatter";

// Types
type TaskDialogDatesPropsType = {
    createDate: string,
    deadline: string
};

export default function TaskDialogDates({ createDate, deadline }: TaskDialogDatesPropsType) {
    const formattedCreateDate = formatDate(createDate)
        ?? <Text className="NoDetailsText">Brak daty utworzenia</Text>;

    const formattedDeadline = formatDate(deadline)
        ?? <Text className="NoDetailsText">Brak deadline</Text>

    return (
        <Flex align="center" gap="2">
            <CalendarIcon color="var(--accent-9)" width="12" height="12" />
            <Flex align="center" gap="1">
                <Tooltip content="Data utworzenia">
                    <Text size="2" color="gray">{formattedCreateDate}</Text>
                </Tooltip>
                <DoubleArrowRightIcon color="gray" width="10" height="10" />
                <Tooltip content="Deadline">
                    <Text size="2" color="gray">{formattedDeadline}</Text>
                </Tooltip>
            </Flex>
        </Flex>
    );
}