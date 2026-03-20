// Actions
import SignUpForm from "@/features/auth/components/SignUpForm";

// Radix
import { Flex } from "@radix-ui/themes";

export default function RegisterPage() {
    return (
        <Flex
            align="center"
            justify="center"
            style={{ height: "100dvh" }}
        >
            <SignUpForm />
        </Flex>
    )
}