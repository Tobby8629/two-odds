import { getRequest, postRequest } from "@/components/api/Axois";
import { ApiResponse } from "@/types/api.types";
import {
  KycStatusResponse,
  KycSubmitResponse,
  SubmitKycInput,
} from "@/types/kyc.types";

export const kycService = {
  async getStatus(): Promise<KycStatusResponse> {
    const response = await getRequest<ApiResponse<KycStatusResponse>>(
      "/kyc/status"
    );

    return (
      response.data?.data ?? { kycStatus: "NOT_STARTED", kycTier: 0 }
    );
  },

  async submit(input: SubmitKycInput): Promise<KycSubmitResponse | null> {
    const response = await postRequest<ApiResponse<KycSubmitResponse>>(
      "/kyc/submit",
      input
    );

    return response.data?.data ?? null;
  },
};
