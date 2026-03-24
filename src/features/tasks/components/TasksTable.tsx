"use client";

// Next.js
import NextLink from "next/link";

// Hooks
import { useState, useMemo } from "react";

// Tanstack Table
import {
    ColumnDef, SortingState, ColumnFiltersState, useReactTable,
    getCoreRowModel, getSortedRowModel, getFilteredRowModel, flexRender
} from "@tanstack/react-table";

// Radix
import {
    Flex, TextField, Select, Table,
    Heading, IconButton, Text, Strong,
    Tooltip
} from "@radix-ui/themes";

import {
    MagnifyingGlassIcon, CaretSortIcon, CaretUpIcon, CaretDownIcon,
    ChevronRightIcon
} from "@radix-ui/react-icons";

// Components
import TableCellDetails from "./TableCellDetails";
import TableCellStatus from "./TableCellStatus";
import TableCellPriority from "./TableCellPriority";
import TableCellNotes from "./TableCellNotes";
import TableCellGoToTaskButton from "./TableCellGoToTaskButton";

// Constants
import { LABEL_MAP } from "../lib/status-map";

// Types
import type { MergedTaskDataType } from "@/types/flow";

type TasksTablePropsType = {
    count: number,
    tasks: MergedTaskDataType[]
};

export default function TasksTable({ count, tasks }: TasksTablePropsType) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const columns = useMemo<ColumnDef<MergedTaskDataType>[]>(
        () => [
            {
                header: "Nazwa",
                accessorKey: "name",
                cell: ({ getValue }) => (
                    <Text><Strong>{(getValue() as string) ?? ""}</Strong></Text>
                )
            },
            {
                header: "Priorytet",
                accessorKey: "flowPriority",
                filterFn: (row, columnId, filterValue) => {
                    return row.getValue(columnId) === +filterValue;
                },
                cell: ({ cell }) => {
                    const reactisTaskId = cell.row.original.reactisTaskId ?? "";
                    const priorityValue = (cell.getValue() as number) ?? undefined;

                    return (
                        <TableCellPriority
                            reactisTaskId={reactisTaskId}
                            currentPriorityValue={priorityValue}
                        />
                    );
                }
            },
            {
                header: "Utworzono",
                accessorKey: "create_date",
                cell: ({ row }) => {
                    const createDate = row.original.create_date.split(" ")[0] ?? "–";
                    const deadlineDate = row.original.deadline?.split(" ")[0] ?? "";
                    return `${createDate}`;
                }
            },
            {
                header: "Szczegóły",
                accessorKey: "text",
                enableSorting: false,
                cell: ({ getValue, row }) => {
                    const reactisTaskUrl = row.original.reactisTaskUrl ?? "";
                    const detailsHtml = (getValue() as string) ?? "";
                    const reactisTaskAuthor = row.original.author ?? "";

                    return (
                        <TableCellDetails
                            reactisTaskUrl={reactisTaskUrl}
                            detailsHtml={detailsHtml}
                            reactisTaskAuthor={reactisTaskAuthor}
                        />
                    );
                }
            },
            {
                header: "Status",
                accessorKey: "flowStatus",
                filterFn: (row, columnId, filterValue) => {
                    return row.getValue(columnId) === +filterValue;
                },
                cell: ({ cell }) => {
                    const reactisTaskId = cell.row.original.reactisTaskId ?? "";
                    const statusValue = (cell.getValue() as number) ?? undefined;

                    return (
                        <TableCellStatus
                            reactisTaskId={reactisTaskId}
                            currentStatusValue={statusValue}
                        />
                    );
                }
            },
            {
                header: "Notatki",
                accessorKey: "flowNotes",
                enableSorting: false,
                cell: ({ getValue, row }) => {
                    const reactisTaskId = row.original.reactisTaskId ?? "";
                    const notes = (getValue() as string) ?? "";

                    return (
                        <TableCellNotes
                            reactisTaskId={reactisTaskId}
                            notes={notes}
                        />
                    );
                }
            },
            {
                header: "",
                accessorKey: "goToTask",
                enableSorting: false,
                cell: ({ row }) => {
                    return (
                        <TableCellGoToTaskButton
                            reactisTaskId={row.original.reactisTaskId}
                        />
                    );
                }
            }
            // {
            //     header: "Reactis",
            //     accessorKey: "reactisTaskUrl"
            // },
            // {
            //     header: "Draft",
            //     accessorKey: "docsDraftUrl"
            // },
            // {
            //     header: "CMS",
            //     accessorKey: "cmsUrl"
            // },
            // {
            //     header: "Artykuł",
            //     accessorKey: "article",
            //     enableSorting: false
            // }
        ], []
    );

    const table = useReactTable({
        data: tasks,
        columns,
        state: {
            sorting,
            columnFilters
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    });

    const nameFilterValue = (table.getColumn("name")?.getFilterValue() as string) ?? "";
    const statusFilterValue = (table.getColumn("flowStatus")?.getFilterValue() as string) ?? "all";

    return (
        <Flex direction={"column"} gap="3">
            <Flex justify={"between"}>
                <Heading as="h2" size="5">
                    {`Liczba zadań: ${count}`}
                </Heading>
                <Flex gap="3">
                    <TextField.Root
                        placeholder="Szukaj zadania…"
                        value={nameFilterValue}
                        onChange={event => (
                            table.getColumn("name")?.setFilterValue(event.target.value)
                        )}
                    >
                        <TextField.Slot>
                            <MagnifyingGlassIcon height="16" width="16" />
                        </TextField.Slot>
                    </TextField.Root>

                    <Select.Root
                        value={statusFilterValue}
                        onValueChange={value => (
                            table.getColumn("flowStatus")?.setFilterValue(
                                value === "all" ? undefined : value
                            )
                        )}
                    >
                        <Select.Trigger placeholder="Pokaż wszystko" />
                        <Select.Content variant="soft" color="gray" position="popper">
                            <Select.Item value="all">Pokaż wszystko</Select.Item>
                            {Object.entries(LABEL_MAP).map(([value, label]) => (
                                <Select.Item key={value} value={value}>{label}</Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Root>
                </Flex>
            </Flex>

            <Table.Root variant="surface" layout="auto">
                <Table.Header>
                    {table.getHeaderGroups().map(headerGroup => (
                        <Table.Row key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                const canSort = header.column.getCanSort();
                                const sortDirection = header.column.getIsSorted();

                                return (
                                    <Table.ColumnHeaderCell
                                        key={header.id}
                                        onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                                        style={{
                                            cursor: canSort ? "pointer" : "default",
                                            userSelect: "none"
                                        }}
                                    >
                                        <Flex align="center" gap="2">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}

                                            {canSort && (
                                                sortDirection === "asc" ? (
                                                    <CaretUpIcon />
                                                ) : sortDirection === "desc" ? (
                                                    <CaretDownIcon />
                                                ) : (
                                                    <CaretSortIcon opacity={0.4} />
                                                )
                                            )}

                                        </Flex>
                                    </Table.ColumnHeaderCell>
                                )
                            })}
                        </Table.Row>
                    ))}
                </Table.Header>

                <Table.Body>
                    {table.getRowModel().rows.length > 0 ? (
                        table.getRowModel().rows.map(row => (
                            <Table.Row key={row.id} align="center">
                                {row.getVisibleCells().map((cell, index) => (
                                    index === 0 ? (
                                        <Table.RowHeaderCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </Table.RowHeaderCell>
                                    ) : (
                                        <Table.Cell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </Table.Cell>
                                    )
                                ))}
                            </Table.Row>
                        ))
                    ) : (
                        <Table.Row>
                            <Table.Cell colSpan={columns.length}>Brak wyników.</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table.Root>
        </Flex>
    );
}