import { ComponentType } from "react";
import { SvgProps } from "react-native-svg";
import { KycDocType } from "@/store/kycFormStore";
import NinIcon from "@/assets/SVGs/icons/NinIcon";
import BvnIcon from "@/assets/SVGs/icons/BvnIcon";
import DriversLicenceIcon from "@/assets/SVGs/icons/DriversLicenceIcon";
import VotersCardIcon from "@/assets/SVGs/icons/VotersCardIcon";

/** Required-field red, shared by the alert banner and invalid inputs. */
export const KYC_ALERT_RED = "#F00000";

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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Nigerian numbers are 11 digits, e.g. 08012345678. */
const PHONE_DIGITS = 11;

export type PersonalErrors = Partial<
  Record<keyof import("@/store/kycFormStore").KycPersonalInfo, string>
>;

/** Shared by the step (to show messages) and the wizard (to gate Next). */
export const validatePersonal = (
  personal: import("@/store/kycFormStore").KycPersonalInfo
): PersonalErrors => {
  const errors: PersonalErrors = {};

  if (!personal.firstName.trim()) errors.firstName = "Required";
  if (!personal.lastName.trim()) errors.lastName = "Required";

  if (!personal.email.trim()) errors.email = "Required";
  else if (!EMAIL_RE.test(personal.email.trim()))
    errors.email = "Enter a valid email address";

  const digits = personal.phoneNumber.replace(/\D/g, "");

  if (!personal.phoneNumber.trim()) errors.phoneNumber = "Required";
  else if (digits.length !== PHONE_DIGITS)
    errors.phoneNumber = `Phone number must be ${PHONE_DIGITS} digits`;

  if (!personal.dateOfBirth.trim()) errors.dateOfBirth = "Required";
  if (!personal.country.trim()) errors.country = "Required";

  return errors;
};
