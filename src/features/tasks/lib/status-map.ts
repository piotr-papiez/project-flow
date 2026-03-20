import { ComponentProps } from "react";
import { Select } from "@radix-ui/themes";

type SelectTriggerColorType = ComponentProps<typeof Select.Trigger>["color"];

export const LABEL_MAP: Record<number, string> = {
    0: "Nowe",
    1: "Do zrobienia",
    2: "W trakcie",
    3: "Oczekuje",
    4: "W CMS",
    5: "Gotowe",
    6: "Anulowane",
    7: "Nadchodzące"
} as const;

export const COLOR_MAP: Record<number, SelectTriggerColorType> = {
    0: "mint",
    1: "amber",
    2: "blue",
    3: "plum",
    4: "crimson",
    5: "green",
    6: "gray",
    7: "gold",
} as const;