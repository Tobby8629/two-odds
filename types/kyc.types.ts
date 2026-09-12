// types/kyc.types.ts

export type KycStatus =
  | "NOT_STARTED"
  | "PENDING"
  | "VERIFIED"
  | "REJECTED";

/** A submission is never NOT_STARTED - that state only exists on the account. */
export type KycSubmissionStatus = Exclude<KycStatus, "NOT_STARTED">;

export type KycIdType = "bvn" | "nin";

export interface KycSubmission {
  id: string;
  provider: string;
  status: KycSubmissionStatus;
  rejectedReason?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

/** Shape returned by GET /kyc/status. */
export interface KycStatusResponse {
  kycStatus: KycStatus;
  /** 0 until the first verification succeeds. */
  kycTier: number;
  latestSubmission?: KycSubmission | null;
}

/** Shape returned by POST /kyc/submit. */
export interface KycSubmitResponse {
  id: string;
  status: KycSubmissionStatus;
  provider: string;
  createdAt?: string;
}

/**
 * Exactly one of bvn or nin must be present; the API rejects neither.
 * dateOfBirth is ISO (YYYY-MM-DD).
 */
export interface SubmitKycInput {
  bvn?: string;
  nin?: string;
  dateOfBirth: string;
  selfieImageBase64?: string;
}
