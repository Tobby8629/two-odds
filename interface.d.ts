import { validate } from '@/constants/data';
import React, { Dispatch } from "react"

interface validateInput {
  email?: string
  password?: string
}

interface validateOutput {
    state: boolean
    text: string
}