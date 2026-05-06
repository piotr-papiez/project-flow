"use client";

// React.js
import { useState, useMemo } from "react";

// Context
import { RichContentEditorProvider } from "../../context/rich-content-editor.context";

// Tanstack Table
import {
    ColumnDef, SortingState, ColumnFiltersState, useReactTable,
    getCoreRowModel, getSortedRowModel, getFilteredRowModel, flexRender
} from "@tanstack/react-table";

// Radix
import {
    Flex, TextField, Select, Table,
    Text, Strong, Badge
} from "@radix-ui/themes";

import { MagnifyingGlassIcon, CaretSortIcon, CaretUpIcon, CaretDownIcon, } from "@radix-ui/react-icons";

// Components
import DetailsCard from "./DetailsCard";
import StatusBadge from "../shared/StatusBadge";
import PriorityBadge from "../shared/PriorityBadge";
import NotesCard from "./NotesCard";
import TableCellGoToTaskButton from "./TableCellGoToTaskButton";

// Constants
import { LABEL_MAP, COLOR_MAP } from "../../lib/status-map";

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
                    const priorityValue = (cell.getValue() as number | undefined) ?? 0;

                    return (
                        <PriorityBadge
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
                        <DetailsCard
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
                    const statusValue = (cell.getValue() as number | undefined) ?? 0;

                    return (
                        <StatusBadge
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
                        <NotesCard
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

    function countTasksInStatus(tasks: MergedTaskDataType[], status: number): number {
        return tasks.filter(task => task.flowStatus === status).length ?? 0;
    }

    return (
        <RichContentEditorProvider>
            <Flex direction={"column"} gap="3">
                <Flex justify={"between"}>
                    <Flex gap="2" align="center" style={{ flexWrap: "wrap" }}>
                        {Object.entries(LABEL_MAP).map(([key, value]) => {
                            const status = Number(key);
                            const tasksCount = countTasksInStatus(tasks, status);

                            if (tasksCount === 0) return null;

                            return (
                                <Badge key={key} color={COLOR_MAP[status]}>{`${value}: ${tasksCount}`}</Badge>
                            );
                        })}
                    </Flex>

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
        </RichContentEditorProvider>
    );
}