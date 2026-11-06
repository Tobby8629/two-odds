import { useMutation } from "@tanstack/react-query";
import { walletService } from "@/services/walletService";
import { SIMULATE } from "@/constants/demo";
import { NairaDeposit, UsdtDeposit } from "@/types/wallet.types";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* Stand-in response until the deposit endpoints accept our request. */
const fakeUsdt = async (input: { amount: number; network: string }): Promise<UsdtDeposit> => {
  await wait(700);
  return {
    payAddress: input.network === "ETHEREUM"
      ? "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
      : "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    payAmount: input.amount.toFixed(2),
    paymentId: "sim-payment",
    network: input.network,
    reference: "sim-reference",
  };
};

const fakeNaira = async (): Promise<NairaDeposit> => {
  await wait(700);
  return { authorizationUrl: "", accessCode: "sim", reference: "sim-reference" };
};

export const useUsdtDeposit = () =>
  useMutation({
    mutationFn: SIMULATE.depositRequest ? fakeUsdt : walletService.depositUsdt,
  });

export const useNairaDeposit = () =>
  useMutation({
    mutationFn: SIMULATE.depositRequest ? fakeNaira : walletService.depositNaira,
  });
