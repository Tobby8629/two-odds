import { data, validateInput, validateOutput, verifyInt } from "@/interface";
import { router } from "expo-router";

interface resetProps {
  reset: {
    reset_code: string
    password: string
    confirm_password: string
  }
  passwordError: {
    password: boolean
    text: string
  }
  setPasswordError: React.Dispatch<React.SetStateAction<{
    password: boolean
    text: string
  }>>
  setResetError: React.Dispatch<React.SetStateAction<{  
    reset_code: boolean
    text: string
  }>>
}

export const validate = ({ email, password }: validateInput) => {
  // Allowed email providers
  const allowedProviders = ["email", "gmail", "yahoo", "davopa", "copawoke","icloud", "example"];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char

  if (email) {
    if (!emailRegex.test(email)) {
      return {
       state: true,
       text: "Invalid email format"
      } as validateOutput
    }

    const domain = email.split("@")[1].split(".")[0].toLowerCase();
    const isValidDomain = allowedProviders.some((provider) =>
      domain.includes(provider)
    );

    if (!isValidDomain) {
      return {
        state: true,
        text: "Invalid email domain"
       } as validateOutput
    }

    return {
      state: false,
      text: "valid email"
     } as validateOutput
  }


  if (password) {
    if (!passwordRegex.test(password)) {
      return {
        state: true,
        text: "Must include at least 8 characters, one uppercase, one lowercase, one number, and one special character"
      } as validateOutput
    };
    return {
      state: false,
      text: "valid password"
    } as validateOutput
  }

  return {
    state: true,
    text: "Invalid input"
  }

  // setError((prev: any) => ({...prev, email: true, password: true}));
};

export const navigateResetPassword = ({reset, passwordError, setPasswordError, setResetError}: resetProps) => {
    const check = validate({
      password: reset.password,
    })

    setPasswordError((prev)=>({
      password: check.state,
      text: check.text,
    }))
     
    if (reset.password !== reset.confirm_password) {
      setPasswordError({
        password: true,
        text: "Passwords do not match",
      })
      return;
    }
    if (reset.reset_code.length < 1) {
      setResetError({ 
        reset_code: true,
        text: "Reset code is required",
    })
    return;
    }

    if (reset.reset_code.length > 1) {
      setResetError({ 
        reset_code: false,
        text: "",
    })
  }

  if(!passwordError.password && reset.reset_code.length > 0 && reset.password === reset.confirm_password) {
      router.replace("/(Onboarding)/SignIn")
    }
}

export const verifying = (
  val: data, 
  checkvalue: verifyInt, 
  setcheckvalue:React.Dispatch<React.SetStateAction<verifyInt>>) => 
  {
  const hasLength = val.password.length >= 8;
  const hasUppercase = /[A-Z]/.test(val.password); 
  const hasLowercase = /[a-z]/.test(val.password); 
  const hasNumber = /[0-9]/.test(val.password);
  const hasSpecialChar = /[@$!%*?&]/.test(val.password); // Special character check
  const confirmCase = val.confirm_password === val.password; // Ensure passwords match

  setcheckvalue({
    ...checkvalue,
    length: hasLength,
    uppercase: hasUppercase,
    lowercase: hasLowercase,
    number: hasNumber,
    specialChar: hasSpecialChar, // New key for special character validation
    confirmed: confirmCase,
  });
};

export const hasFalseValue = (checkvalue: verifyInt) =>  Object.values(checkvalue).some(value => value === false);


export const CURRENCY_SYMBOLS = {
  NGN: "₦",
  USDT: "$",
} as const;

/**
 * Wallet endpoints return amounts as fixed-point strings such as
 * "50000.00000000", which cannot go straight into the UI.
 */
export const formatCurrency = (
  value: string | number | null | undefined,
  currency: keyof typeof CURRENCY_SYMBOLS = "NGN"
) => {
  const symbol = CURRENCY_SYMBOLS[currency];
  const amount = Number(value ?? "");

  if (value === null || value === undefined || !Number.isFinite(amount)) {
    return `${symbol}0.00`;
  }

  return `${symbol}${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};


/**
 * Gross return on a bet. The bets endpoints expose no payout, potential-return
 * or fee field at all, so this is computed on the client from the stake and
 * odds that were submitted.
 *
 * Caveat: the backend never documents whether its odds are decimal
 * (stake x odds, return includes the stake) or fractional (stake x odds is
 * profit only). Decimal is assumed here because the spec's example odds of 2.5
 * only makes sense that way. Confirm against a real settlement before this
 * figure is treated as authoritative.
 */
export const potentialReturn = (
  stake: number | string | null | undefined,
  odds: number | string | null | undefined
) => {
  const stakeValue = Number(stake ?? "");
  const oddsValue = Number(odds ?? "");

  if (!Number.isFinite(stakeValue) || !Number.isFinite(oddsValue)) {
    return null;
  }

  return stakeValue * oddsValue;
};


// utils/dateFilter.ts
export const filterByDate =(dateFilter: "all" | "7days" | "14days" | "30days", txnDate: string) => {
  if (dateFilter === "all") return true;

  const now = new Date();
  const transactionDate = new Date(txnDate);

  let daysLimit = 0;
  if (dateFilter === "7days") daysLimit = 7;
  if (dateFilter === "14days") daysLimit = 14;
  if (dateFilter === "30days") daysLimit = 30;

  const past = new Date();
  past.setDate(now.getDate() - daysLimit);

  return transactionDate >= past && transactionDate <= now;
};


export const logo = (selectedsport: string) => {
    switch (selectedsport) {
      case "basketball":
        return "basketball";

      case "americafootball":
      return "football";
      
      case "tennis":
      return "table-tennis-paddle-ball";
    
      default:
        return "futbol"
      break;
    }
  }

  export const SubKeyName = (subKey: string) => {
    switch (subKey) {
      case 'home':
        return '1';
      case 'away':
        return '2';
      case 'draw':
        return 'X'; 
      case 'home_home':
        return 'Home/Home';
      case 'home_away':
        return 'Home/Away';
      case 'draw_home':
        return 'Draw/Home';
      case 'draw_away':
        return 'Draw/Away';
      case 'away_home':
        return 'Away/Home';
      case 'away_away':
        return 'Away/Away';
        case 'HomeorDraw':
        return '1X';
      case 'HomeorAway':
        return '12';
      case 'DraworAway':
        return 'X2';  
      case 'matchTotalGoals':
        return 'Total Goals';
      default:
        return subKey.charAt(0).toUpperCase() + subKey.slice(1);
    }
  };  