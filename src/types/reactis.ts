// API
export type ReactisFetchResponseType<T> =
    | { ok: true, data: T, status: number }
    | { ok: false, message: string, status: number };

// Tasks types    
export type TaskAuthorType = {
    name: string;
    surname: string;
    [key: string]: unknown;
};

export type ReactisTaskDataType = {
    id: string;
    create_date: string;
    name: string;
    text: string;
    deadline: string;
    assign_completed: number;
    author: TaskAuthorType;
    [key: string]: unknown;
};

export type ReactisTasksDataType = {
    items: ReactisTaskDataType[];
    total_items: number;
    [key: string]: unknown;
}

export type GetReactisTaskResponseType =
    | { ok: true, data: ReactisTaskDataType, status: number }
    | { ok: false, message: string, status: number };

export type GetReactisTasksResponseType =
    | { ok: true, data: ReactisTasksDataType, status: number }
    | { ok: false, message: string, status: number };