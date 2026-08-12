import {
  getRequest,
  postRequest,
} from "@/components/api/Axois";
import { ApiResponse } from "@/types/api.types";
import {
  Bet,
  CreateCustomBetInput,
  MyBetsFilters,
  OpenBetsFilters,
  PaginatedBets,
} from "@/types/bets.types";

/**
 * The bets endpoints document no response schema, so the list payload could
 * arrive as a bare array or wrapped alongside pagination. This accepts either
 * rather than guessing one and crashing on the other.
 *
 * Once the real shape is confirmed against a running backend, collapse this.
 */
const toPaginatedBets = (payload: unknown): PaginatedBets => {
  if (Array.isArray(payload)) {
    return { bets: payload as Bet[] };
  }

  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;

    const list =
      record.bets ?? record.items ?? record.results ?? record.data;

    if (Array.isArray(list)) {
      return {
        bets: list as Bet[],
        pagination: record.pagination as PaginatedBets["pagination"],
      };
    }
  }

  return { bets: [] };
};

const cleanParams = <T extends object>(filters?: T) => {
  if (!filters) return undefined;

  return Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) => value !== undefined && value !== null && value !== ""
    )
  );
};

export const betsService = {
  /** GET /bets - the public marketplace of open custom bets. */
  async getOpenBets(
    filters?: OpenBetsFilters
  ): Promise<PaginatedBets> {
    const response = await getRequest<ApiResponse<unknown>>(
      "/bets",
      { params: cleanParams(filters) }
    );

    return toPaginatedBets(response.data?.data);
  },

  /** GET /bets/my - the caller's bets, both created and taken. */
  async getMyBets(
    filters?: MyBetsFilters
  ): Promise<PaginatedBets> {
    const response = await getRequest<ApiResponse<unknown>>(
      "/bets/my",
      { params: cleanParams(filters) }
    );

    return toPaginatedBets(response.data?.data);
  },

  async getBet(id: string): Promise<Bet | null> {
    const response = await getRequest<ApiResponse<Bet>>(
      `/bets/${id}`
    );

    return response.data?.data ?? null;
  },

  async createCustomBet(
    input: CreateCustomBetInput
  ): Promise<Bet | null> {
    const response = await postRequest<ApiResponse<Bet>>(
      "/bets/custom",
      input
    );

    return response.data?.data ?? null;
  },

  /** POST /bets/{id}/take - becomes the counterparty. Takes no body. */
  async takeBet(id: string): Promise<void> {
    await postRequest<ApiResponse<unknown>>(
      `/bets/${id}/take`,
      {}
    );
  },

  async cancelBet(id: string): Promise<void> {
    await postRequest<ApiResponse<unknown>>(
      `/bets/${id}/cancel`,
      {}
    );
  },
};
