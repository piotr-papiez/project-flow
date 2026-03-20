// Services
import { getReactisSettings } from "@/features/settings/services/reactis-settings.service";

// Components
import SettingsForm from "@/features/settings/components/SettingsForm";

// Radix
import { Flex } from "@radix-ui/themes";

export default async function ReactisSettingsPage() {
    const response = await getReactisSettings();
    const reactisUserId = response?.reactisUserId ?? "";

    return (
        <Flex direction="column">
            <SettingsForm reactisUserId={reactisUserId} />
        </Flex>
    );
}