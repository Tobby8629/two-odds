import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { walletService } from "@/services/walletService";
import {
  ChangePinInput,
  ResetPinInput,
  SetPinInput,
} from "@/types/wallet.types";

/** Surfaces the backend's own message, which explains most PIN 400s. */
export const pinErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { error?: { message?: string }; message?: string }
      | undefined;

    return data?.error?.message ?? data?.message ?? fallback;
  }

  return fallback;
};

export const useSetPin = () =>
  useMutation({
    mutationFn: (input: SetPinInput) => walletService.setPin(input),
  });

export const useChangePin = () =>
  useMutation({
    mutationFn: (input: ChangePinInput) => walletService.changePin(input),
  });

export const useForgotPin = () =>
  useMutation({
    mutationFn: () => walletService.forgotPin(),
  });

export const useResetPin = () =>
  useMutation({
    mutationFn: (input: ResetPinInput) => walletService.resetPin(input),
  });
