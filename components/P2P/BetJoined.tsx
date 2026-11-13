import React from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import UserAvatar from "@/components/Reuseables/UserAvatar";

/*
 * Figma "Bet Joined Successfully!" frame (393x852, #003C6F). Values read from
 * the design: check circle 96px #E59A0B with a #06F957 40% glow (blur 40);
 * title Lexend Bold 30/36 #F1F5F9; subtitle Lexend Regular 14/22.75 #94A3B8;
 * card 342 wide, radius 32, 1px white 8% border, #003460; tag Lexend Bold
 * 10/15 ls 1 uppercase #E59A0B; ID Lexend Medium 10/15 #64748B; match title
 * Lexend Bold 20/28 #F1F5F9; "Prediction:" Regular 14/20 #94A3B8 + value Bold
 * 14/20 #E59A0B; avatar 40px 1px #1E293B; MATCHED WITH / TOTAL POT Lexend Bold
 * 10/15 ls -0.25 uppercase #64748B; handle SemiBold 14/20 white; pot Bold
 * 18/28 white; deduction pill 350x42 radius 24 padding 12/16 gap 12 white 5%
 * fill + 1px white 5% border, text Regular 12/16 #CBD5E1, icon 15.83x15
 * #94A3B8; primary button radius 24 / padding 16 / #E59A0B with #06F957 30%
 * glow (blur 20), text Bold 16/24 #000000; secondary text SemiBold 16/24 white.
 * Not read yet: the check circle's vertical offset, the secondary button's
 * border colour, and the avatar's status dot.
 */
const F = {
  regular: "Lexend_400Regular",
  medium: "Lexend_500Medium",
  semi: "Lexend_600SemiBold",
  bold: "Lexend_700Bold",
} as const;

interface BetJoinedProps {
  visible: boolean;
  title: string;
  prediction: string;
  betRef: string;
  opponent: string;
  opponentKey: string;
  avatarUri?: string | null;
  totalPot: string;
  deducted: string;
  onViewBets: () => void;
  onBack: () => void;
}

const BetJoined = ({
  visible,
  title,
  prediction,
  betRef,
  opponent,
  opponentKey,
  avatarUri,
  totalPot,
  deducted,
  onViewBets,
  onBack,
}: BetJoinedProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} animationType="fade" onRequestClose={onBack} statusBarTranslucent>
      <View style={{ flex: 1, backgroundColor: "#003C6F" }}>
        <ScrollView
          contentContainerStyle={{ paddingTop: insets.top + 56, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: 96,
                height: 96,
                borderRadius: 48,
                backgroundColor: "#E59A0B",
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#06F957",
                shadowOpacity: 0.4,
                shadowRadius: 40,
                shadowOffset: { width: 0, height: 0 },
                elevation: 12,
              }}
            >
              <Ionicons name="checkmark" size={48} color="#101622" />
            </View>

            <View style={{ width: 342, marginTop: 32, paddingBottom: 8 }}>
              <Text
                style={{
                  color: "#F1F5F9",
                  fontFamily: F.bold,
                  fontSize: 30,
                  lineHeight: 36,
                  textAlign: "center",
                }}
              >
                Bet Joined Successfully!
              </Text>
              <Text
                style={{
                  color: "#94A3B8",
                  fontFamily: F.regular,
                  fontSize: 14,
                  lineHeight: 22.75,
                  textAlign: "center",
                  marginTop: 8,
                }}
              >
                Your P2P match has been confirmed and is now active.
              </Text>
            </View>

            <View
              style={{
                width: 342,
                marginTop: 56,
                borderRadius: 32,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.08)",
                backgroundColor: "#003460",
                padding: 24,
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text
                  style={{
                    color: "#E59A0B",
                    fontFamily: F.bold,
                    fontSize: 10,
                    lineHeight: 15,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                  }}
                >
                  Match Matched
                </Text>
                <Text style={{ color: "#64748B", fontFamily: F.medium, fontSize: 10, lineHeight: 15 }}>
                  ID: {betRef}
                </Text>
              </View>

              <Text style={{ color: "#F1F5F9", fontFamily: F.bold, fontSize: 20, lineHeight: 28, marginTop: 8 }}>
                {title}
              </Text>

              <View style={{ flexDirection: "row", marginTop: 4 }}>
                <Text style={{ color: "#94A3B8", fontFamily: F.regular, fontSize: 14, lineHeight: 20 }}>
                  Prediction:{" "}
                </Text>
                <Text style={{ color: "#E59A0B", fontFamily: F.bold, fontSize: 14, lineHeight: 20 }}>
                  {prediction}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: "#1E293B",
                      overflow: "hidden",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#E3F2FD",
                    }}
                  >
                    {/* The illustration sits left of centre in its own artwork (lobby offset scaled to 38px); a real photo is not nudged. */}
                    <View style={avatarUri && !avatarUri.startsWith("local:") ? undefined : { transform: [{ translateX: 2 }, { translateY: -6 }] }}>
                      <UserAvatar uri={avatarUri} size={38} fallbackKey={opponentKey} />
                    </View>
                  </View>
                  <View style={{ marginLeft: 12 }}>
                    <Text
                      style={{
                        color: "#64748B",
                        fontFamily: F.bold,
                        fontSize: 10,
                        lineHeight: 15,
                        letterSpacing: -0.25,
                        textTransform: "uppercase",
                      }}
                    >
                      Matched With
                    </Text>
                    <Text style={{ color: "#FFFFFF", fontFamily: F.semi, fontSize: 14, lineHeight: 20 }}>
                      {opponent}
                    </Text>
                  </View>
                </View>

                <View style={{ alignItems: "flex-end" }}>
                  <Text
                    style={{
                      color: "#64748B",
                      fontFamily: F.bold,
                      fontSize: 10,
                      lineHeight: 15,
                      letterSpacing: -0.25,
                      textTransform: "uppercase",
                    }}
                  >
                    Total Pot
                  </Text>
                  <Text numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.6} style={{ color: "#FFFFFF", fontFamily: F.bold, fontSize: 18, lineHeight: 28 }}>
                    {totalPot}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                width: 350,
                marginTop: 16,
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderRadius: 24,
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.05)",
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
            >
              <Ionicons name="wallet-outline" size={15.83} color="#94A3B8" />
              <Text style={{ color: "#CBD5E1", fontFamily: F.regular, fontSize: 12, lineHeight: 16, flexShrink: 1 }}>
                {deducted}
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={{ paddingHorizontal: 24, paddingTop: 16, paddingBottom: insets.bottom + 24, gap: 12 }}>
          <Pressable
            onPress={onViewBets}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              paddingVertical: 16,
              borderRadius: 24,
              backgroundColor: "#E59A0B",
              shadowColor: "#06F957",
              shadowOpacity: 0.3,
              shadowRadius: 20,
              shadowOffset: { width: 0, height: 0 },
              elevation: 8,
            }}
          >
            <Text style={{ color: "#000000", fontFamily: F.bold, fontSize: 16, lineHeight: 24 }}>
              View My Bets
            </Text>
            <Ionicons name="list-outline" size={18} color="#000000" />
          </Pressable>

          <Pressable
            onPress={onBack}
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 16,
              borderRadius: 24,
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.2)",
            }}
          >
            <Text style={{ color: "#FFFFFF", fontFamily: F.semi, fontSize: 16, lineHeight: 24 }}>
              Back to P2P Market
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default BetJoined;
