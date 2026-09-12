import { KycDocType } from "@/store/kycFormStore";

export const COUNTRIES = [
  "Nigeria", "Ghana", "Kenya", "South Africa", "United Kingdom", "United States",
];

export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

export interface KycDocOption {
  type: KycDocType;
  name: string;
  hint: string;
  icon: "badge" | "account-balance" | "directions-car" | "how-to-vote";
  /** Only NIN and BVN are accepted by POST /kyc/submit. */
  supported: boolean;
}

export const KYC_DOC_OPTIONS: KycDocOption[] = [
  {
    type: "nin",
    name: "NIN",
    hint: "11-digit number + NIN slip",
    icon: "badge",
    supported: true,
  },
  {
    type: "bvn",
    name: "Bank Verification Number",
    hint: "10-digit number + selfie",
    icon: "account-balance",
    supported: true,
  },
  {
    type: "drivers_licence",
    name: "Driver's Licence",
    hint: "Licence number + front & back",
    icon: "directions-car",
    supported: false,
  },
  {
    type: "voters_card",
    name: "Voter's Cards",
    hint: "VIN + front & back",
    icon: "how-to-vote",
    supported: false,
  },
];

export const KYC_DOC_LABELS: Record<KycDocType, string> = {
  nin: "NIN",
  bvn: "BVN",
  drivers_licence: "D-CARD",
  voters_card: "ID CARD",
};
