import { ComponentType } from "react";

import Avatar_1 from "@/assets/SVGs/avatar/avatar_1";
import Avatar_2 from "@/assets/SVGs/avatar/avatar_2";
import Avatar_3 from "@/assets/SVGs/avatar/avatar_3";
import Avatar_4 from "@/assets/SVGs/avatar/avatar_4";
import Avatar_5 from "@/assets/SVGs/avatar/avatar_5";
import Avatar_6 from "@/assets/SVGs/avatar/avatar_6";
import Avatar_7 from "@/assets/SVGs/avatar/avatar_7";
import Avatar_8 from "@/assets/SVGs/avatar/avatar_8";
import Avatar_9 from "@/assets/SVGs/avatar/avatar_9";
import Avatar_10 from "@/assets/SVGs/avatar/avatar_10";
import Avatar_11 from "@/assets/SVGs/avatar/avatar_11";
import Avatar_12 from "@/assets/SVGs/avatar/avatar_12";
import Avatar_13 from "@/assets/SVGs/avatar/avatar_13";
import Avatar_14 from "@/assets/SVGs/avatar/avatar_14";
import Avatar_15 from "@/assets/SVGs/avatar/avatar_15";
import Avatar_16 from "@/assets/SVGs/avatar/avatar_16";

export interface AvatarItem {
  id: string;
  Component: ComponentType<any>;
}

export const AVATARS = [
  { id: "1", component: Avatar_1 },
  { id: "2", component: Avatar_2 },
  { id: "3", component: Avatar_3 },
  { id: "4", component: Avatar_4 },
  { id: "5", component: Avatar_5 },
  { id: "6", component: Avatar_6 },
  { id: "7", component: Avatar_7 },
  { id: "8", component: Avatar_8 },
  { id: "9", component: Avatar_9 },
  { id: "10", component: Avatar_10 },
  { id: "11", component: Avatar_11 },
  { id: "12", component: Avatar_12 },
  { id: "13", component: Avatar_13 },
  { id: "14", component: Avatar_14 },
  { id: "15", component: Avatar_15 },
  { id: "16", component: Avatar_16 },
];
