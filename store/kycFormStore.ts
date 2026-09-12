import { create } from "zustand";
import { KycIdType } from "@/types/kyc.types";

/** The four options the design offers; only NIN and BVN reach the API. */
export type KycDocType = KycIdType | "drivers_licence" | "voters_card";

export type KycStep = 0 | 1 | 2;

/** The document step is two screens: pick a type, then fill it in. */
export type KycDocSubStep = "choose" | "form";

export interface KycPersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  country: string;
}

export interface KycAddress {
  city: string;
  state: string;
  streetAddress: string;
  postalCode: string;
}

interface KycFormState {
  step: KycStep;
  personal: KycPersonalInfo;
  docType: KycDocType | null;
  docSubStep: KycDocSubStep;
  idNumber: string;
  /** Local file uris, kept separate from the base64 the API wants. */
  uploads: Record<string, string | undefined>;
  address: KycAddress;
  showRequiredAlert: boolean;

  setStep: (step: KycStep) => void;
  setPersonal: (field: keyof KycPersonalInfo, value: string) => void;
  setDocType: (type: KycDocType | null) => void;
  setDocSubStep: (sub: KycDocSubStep) => void;
  setIdNumber: (value: string) => void;
  setUpload: (slot: string, uri: string | undefined) => void;
  setAddress: (field: keyof KycAddress, value: string) => void;
  setShowRequiredAlert: (show: boolean) => void;
  reset: () => void;
}

const emptyPersonal: KycPersonalInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: "",
  country: "",
};

const emptyAddress: KycAddress = {
  city: "",
  state: "",
  streetAddress: "",
  postalCode: "",
};

export const useKycFormStore = create<KycFormState>((set) => ({
  step: 0,
  personal: emptyPersonal,
  docType: null,
  docSubStep: "choose",
  idNumber: "",
  uploads: {},
  address: emptyAddress,
  showRequiredAlert: false,

  setStep: (step) => set({ step, showRequiredAlert: false }),
  setPersonal: (field, value) =>
    set((s) => ({ personal: { ...s.personal, [field]: value } })),
  setDocType: (docType) =>
    set((s) =>
      s.docType === docType
        ? { docType }
        : { docType, idNumber: "", uploads: {} }
    ),
  setDocSubStep: (docSubStep) => set({ docSubStep }),
  setIdNumber: (idNumber) => set({ idNumber }),
  setUpload: (slot, uri) =>
    set((s) => ({ uploads: { ...s.uploads, [slot]: uri } })),
  setAddress: (field, value) =>
    set((s) => ({ address: { ...s.address, [field]: value } })),
  setShowRequiredAlert: (showRequiredAlert) => set({ showRequiredAlert }),

  reset: () =>
    set({
      step: 0,
      personal: emptyPersonal,
      docType: null,
      docSubStep: "choose",
      idNumber: "",
      uploads: {},
      address: emptyAddress,
      showRequiredAlert: false,
    }),
}));
