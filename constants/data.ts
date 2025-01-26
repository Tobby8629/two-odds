import LoadOne from "@/assets/SVGs/LoadOne"
import LoadTwo from "@/assets/SVGs/LoadTwo"
import LoadThree from "@/assets/SVGs/LoadThree"
import { nft, phrase, wallet } from "@/assets/images";
import { validateInput, validateOutput } from "@/interface";

export const load = [
  {
    name: "one",
    component: LoadOne,
  },
  {
    name: "two",
    component: LoadTwo,
  },
  {
    name: "three",
    component: LoadThree,
  },
];

export const createWallet = [
  {
    name: "wallet",
    image: wallet,
    text: "Wallets",
  },
  {
    name: "nft",
    image: nft,
    text: "NFT"
  },
  {
    name: "phrase",
    image: phrase,
    text: "Secured by us"
  },
];

export const passwordverification:  Array<{ id: number; val: keyof verifyInt; text: string }> = [
  {
    id: 1,
    val: "length",
    text: "Minimum of 8 characters"
  },

  {
    id: 2,
    val: "number",
    text: "Contains at least one number"
  },

  {
    id: 3,
    val: "lowercase",
    text: "Contains at least one lowercase letter"
  },

  {
    id: 4,
    val: "uppercase",
    text: "Contains at least one uppercase letter"
  },

  {
    id: 5,
    val: "specialChar",
    text: "Contains at least one special character"
  },
]

// export const validate = ({email, seterror}: validateInput) => {
//   console.log(email)
//   const allowedProviders = ["email", "gmail", "yahoo", "icloud"];
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email as string)) {
//     console.log("Invalid email format")
//     return "Invalid email format";
    
//   }
//   const domain = email.split("@")[1].split(".")[0].toLowerCase(); 
//   const isValidDomain = allowedProviders.some(provider => domain.includes(provider));
//   if (!isValidDomain) {
//     seterror((prev: any) => ({...prev, email: true}));   
//     return "Invalid email domain"
//   }
//   seterror((prev: any) => ({...prev, email: false}));; 
//   return "Valid email"
// }


export const validate = ({ email, password }: validateInput) => {
  // Allowed email providers
  const allowedProviders = ["email", "gmail", "yahoo", "icloud"];
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
