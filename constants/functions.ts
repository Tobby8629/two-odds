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
  const allowedProviders = ["email", "gmail", "yahoo", "icloud", "example"];
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


// utils/dateFilter.ts
export const filterByDate = (dateFilter: "all" | "7days" | "14days" | "30days", txnDate: string) => {
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
