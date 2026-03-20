import SignInForm from "@/features/auth/components/SignInForm";

// Radix
import { Flex } from "@radix-ui/themes";

export default function LoginPage() {
    return (
        <Flex
            align="center"
            justify="center"
            style={{ height: "100dvh" }}
        >
            <SignInForm />
        </Flex>
    )
}