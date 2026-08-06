import { getRequest } from "@/components/api/Axois";
import { ApiResponse } from "@/types/api.types";
import { WalletBalance } from "@/types/wallet.types";

export const walletService = {
  async getBalance(): Promise<WalletBalance> {
    const response =
      await getRequest<ApiResponse<WalletBalance>>(
        "/wallet/balance"
      );

    return response.data.data;
  },
};
