// Services
import { getReactisSettings } from "@/features/settings/services/reactis-settings.service";

// Components
import SettingsForm from "@/features/settings/components/SettingsForm";

// Radix
import { Flex } from "@radix-ui/themes";

export default async function ReactisSettingsPage() {
    const response = await getReactisSettings();
    const reactisUserEmail = response?.reactisUserEmail ?? "";
    const reactisUserId = response?.reactisUserId ?? "";

    return (
        <Flex direction="column">
            <SettingsForm
                reactisUserEmail={reactisUserEmail}
                reactisUserId={reactisUserId}
            />
        </Flex>
    );
}