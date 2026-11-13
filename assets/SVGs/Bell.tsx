import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

// Figma tab bar bell: solid, 24px.
const Bell = ({ color = "#010101" }: { color?: string; bets?: unknown; game?: unknown }) => (
  <Ionicons name="notifications" size={24} color={color} />
);
export default Bell;
