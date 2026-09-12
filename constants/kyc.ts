import { ComponentType } from "react";
import { SvgProps } from "react-native-svg";
import { KycDocType } from "@/store/kycFormStore";
import NinIcon from "@/assets/SVGs/icons/NinIcon";
import BvnIcon from "@/assets/SVGs/icons/BvnIcon";
import DriversLicenceIcon from "@/assets/SVGs/icons/DriversLicenceIcon";
import VotersCardIcon from "@/assets/SVGs/icons/VotersCardIcon";

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
  icon: ComponentType<SvgProps>;
  /** Only NIN and BVN are accepted by POST /kyc/submit. */
  supported: boolean;
}

export const KYC_DOC_OPTIONS: KycDocOption[] = [
  {
    type: "nin",
    name: "NIN",
    hint: "11-digit number + NIN slip",
    icon: NinIcon,
    supported: true,
  },
  {
    type: "bvn",
    name: "Bank Verification Number",
    hint: "10-digit number + selfie",
    icon: BvnIcon,
    supported: true,
  },
  {
    type: "drivers_licence",
    name: "Driver's Licence",
    hint: "Licence number + front & back",
    icon: DriversLicenceIcon,
    supported: false,
  },
  {
    type: "voters_card",
    name: "Voter's Cards",
    hint: "VIN + front & back",
    icon: VotersCardIcon,
    supported: false,
  },
];

export const KYC_DOC_LABELS: Record<KycDocType, string> = {
  nin: "NIN",
  bvn: "BVN",
  drivers_licence: "D-CARD",
  voters_card: "ID CARD",
};
