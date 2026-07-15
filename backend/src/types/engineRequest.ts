export type EngineCommandType =
    | "createOrder"
    | "addBalance"
    | "getDepth"
    | "getUserBalance"
    | "cancelOrder";

export interface EngineRequest {
    correlationId: string;
    responseQueue: string;
    type: EngineCommandType;
    payload: Record<string, unknown>;
}

export interface EngineResponse {
    correlationId: string;
    ok: boolean;
    data?: unknown;
    error?: string;
}