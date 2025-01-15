type InputField = 'email' | 'password' | 'confirm_password';

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
  }
  