type InputField = 'email' | 'password' | 'text';

type InputID = 'email' | 'password' | 'confirm_password' | 'reset_code';

interface register {
    email: InputField,
    tc: boolean,
    subscribe: boolean

}

interface verifyInt {
    length: boolean,
    uppercase: boolean,
    lowercase: boolean,
    number: boolean 
    confirmed: boolean
    specialChar: boolean
  }
  