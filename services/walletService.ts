import { getRequest, postRequest, putRequest } from "@/components/api/Axois";
import { ApiResponse } from "@/types/api.types";
import {
  ChangePinInput,
  CurrencyDepositLimits,
  ResetPinInput,
  SetPinInput,
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
  async setPin(input: SetPinInput): Promise<void> {
    await postRequest<ApiResponse<unknown>>("/wallet/pin/set", input);
  },

  async changePin(input: ChangePinInput): Promise<void> {
    await postRequest<ApiResponse<unknown>>("/wallet/pin/change", input);
  },

  /** Emails a reset code; takes no body. */
  async forgotPin(): Promise<void> {
    await postRequest<ApiResponse<unknown>>("/wallet/pin/forgot", {});
  },

  async resetPin(input: ResetPinInput): Promise<void> {
    await postRequest<ApiResponse<unknown>>("/wallet/pin/reset", input);
  },
};
