import React from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Loading from "@/components/Reuseables/Loading";
import { useSportFetch } from "@/hooks";
import Football from "@/assets/SVGs/sport/football";
import Basketball from "@/assets/SVGs/sport/Basketball";
import AmericanFootball from "@/assets/SVGs/sport/AF";
import Tennis from "@/assets/SVGs/sport/Tennis";
import Volleyball from "@/assets/SVGs/sport/Volleyball";
import { SvgProps } from "react-native-svg";

interface ctrl {
  handlePress: (sport: string) => void;
  selectSport: string;
  /** Defaults to the home heading. */
  title?: string;
}

/*
 * The API's "football" is American football (the NFL fixtures) and "soccer"
 * is the round-ball game, so the icons are keyed on slug, not on the name.
 * Sports with no entry here fall back to a text label until their icon is
 * supplied from the design.
 */
const SPORT_ICONS: Record<string, React.ComponentType<SvgProps>> = {
  soccer: Football,
  football: AmericanFootball,
  basketball: Basketball,
  tennis: Tennis,
  volleyball: Volleyball,
};

/* Left to right, as the design lays the row out. */
const SPORT_ORDER = ["soccer", "tennis", "basketball", "football", "volleyball"];

/*
 * In the design but not returned by GET /sports, so there are no matches to
 * show for it yet. Drop this once the backend adds the sport.
 */
const DESIGN_ONLY = [
  { id: "volleyball", name: "Volleyball", slug: "volleyball" },
];

const Sport = ({ handlePress, selectSport, title = "Sports" }: ctrl) => {
  const { data: sports, isLoading, error } = useSportFetch();

  const visibleSports = [
    ...(sports?.data ?? []).filter((sport) => SPORT_ICONS[sport.slug]),
    ...DESIGN_ONLY.filter(
      (extra) => !(sports?.data ?? []).some((s) => s.slug === extra.slug)
    ),
  ].sort(
    (a, b) => SPORT_ORDER.indexOf(a.slug) - SPORT_ORDER.indexOf(b.slug)
  );

  if (isLoading) {
    return (
      <View className="py-5 items-center justify-center">
        <Loading inline size={40} />
      </View>
    );
  }

  if (error) {
    return (
      <View className="py-5 px-6">
        <Text className="text-red-500">
          {error.message}
        </Text>
      </View>
    );
  }

  return (
    <View className="py-5">
      <Text className="text-white px-6 mb-5 text-2xl uppercase font-semibold">
        {title}
      </Text>

      {/* Five buttons spread across the width, so there is nothing to scroll. */}
      <View
        className="flex-row items-center justify-between"
        style={{ paddingHorizontal: 20 }}
      >
        {visibleSports.map((sport) => {
          const Icon = SPORT_ICONS[sport.slug];

          return (
            <Pressable
              key={sport.id}
              onPress={() => handlePress(sport?.id)}
              accessibilityLabel={sport.name}
              className={`
                ${sport.id === selectSport ? "bg-sec" : "bg-white"}
                rounded-full p-3 justify-center items-center
              `}
              style={{ minWidth: 52, minHeight: 52 }}
            >
              {Icon ? (
                <Icon width={28} height={28} />
              ) : (
                <Text className="text-black text-xs">
                  {sport.name}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default Sport;
