import { ComponentProps } from "react";
import { Select } from "@radix-ui/themes";

type SelectTriggerColorType = ComponentProps<typeof Select.Trigger>["color"];

export const PRIORITY_MAP: Record<number, string> = {
    0: "Niski",
    1: "Normalny",
    2: "Wysoki"
} as const;

export const COLOR_MAP: Record<number, SelectTriggerColorType> = {
    0: "gray",
    1: "gray",
    2: "red",
} as const;