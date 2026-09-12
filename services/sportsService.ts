import { getRequest } from "@/components/api/Axois";
import { ApiResponse } from "@/types/api.types";
import { Match, MatchFilters, Sport } from "@/types/sports.types";

const cleanParams = (filters?: MatchFilters) => {
  if (!filters) return undefined;

  return Object.fromEntries(
    Object.entries(filters).filter(
      ([, v]) => v !== undefined && v !== null && v !== ""
    )
  );
};

export const sportsService = {
  async getSports(): Promise<Sport[]> {
    const response = await getRequest<ApiResponse<Sport[]>>("/sports");

    return response.data?.data ?? [];
  },

  /** Public. Synced every 15 minutes, cached for 10 on the server. */
  async getMatches(filters?: MatchFilters): Promise<Match[]> {
    const response = await getRequest<ApiResponse<Match[]>>(
      "/sports/matches",
      { params: cleanParams(filters) }
    );

    return response.data?.data ?? [];
  },
};
