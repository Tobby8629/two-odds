import { getRequest, putRequest } from "@/components/api/Axois";
import { ApiResponse } from "@/types/api.types";
import {
  CurrencyDepositLimits,
  UpdateDepositLimitsInput,
  WalletBalance,
} from "@/types/wallet.types";

export const walletService = {
  async getBalance(): Promise<WalletBalance> {
    const response =
      await getRequest<ApiResponse<WalletBalance>>(
        "/wallet/balance"
      );

    return response.data.data;
  },

  async getDepositLimits(): Promise<
    CurrencyDepositLimits[]
  > {
    const response =
      await getRequest<ApiResponse<CurrencyDepositLimits[]>>(
        "/wallet/deposit-limits"
      );

    return response.data.data ?? [];
  },

  async updateDepositLimits(
    input: UpdateDepositLimitsInput
  ): Promise<void> {
    await putRequest<ApiResponse<unknown>>(
      "/wallet/deposit-limits",
      input
    );
  },
};
