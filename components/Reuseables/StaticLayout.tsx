import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, useWindowDimensions } from "react-native";

interface StaticLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const StaticLayout: React.FC<StaticLayoutProps> = ({ children, className }) => {
  const [isScrollable, setIsScrollable] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const { height: screenHeight } = useWindowDimensions();

  useEffect(() => {
    setIsScrollable(contentHeight > screenHeight);
  }, [contentHeight, screenHeight]);

  const handleContentSizeChange = (_: number, height: number) => {
    setContentHeight(height);
  };

  return (
    <ScrollView
      scrollEnabled={isScrollable}
      className={`${className || ""} bg-pryf flex-1 py-10`}
      onContentSizeChange={handleContentSizeChange}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.scrollContainer,
        !isScrollable && { flexGrow: 1, justifyContent: "center" },
      ]}
    >
      {children}
    </ScrollView>
  );
};

export default StaticLayout;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
});
