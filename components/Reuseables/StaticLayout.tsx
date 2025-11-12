import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

interface StaticLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const StaticLayout: React.FC<StaticLayoutProps> = ({ children, className }) => {
  const [isScrollable, setIsScrollable] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const { height: screenHeight } = useWindowDimensions();

  useEffect(() => {
    // Check if content exceeds screen height minus header/footer offset (200)
    setIsScrollable(contentHeight > screenHeight - 200);
  }, [contentHeight, screenHeight]);

  const handleContentSizeChange = (_: number, height: number) => {
    setContentHeight(height);
  };

  const handleLayout = (e: any) => {
    const { height } = e.nativeEvent.layout;
    setContentHeight(height);
  };

  if (isScrollable) {
    return (
      <ScrollView
        className={`${className || ''} bg-pryf flex-1 py-10`}
        onContentSizeChange={handleContentSizeChange}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View
      onLayout={handleLayout}
      className={`${className || ''} bg-pryf flex-1 py-10`}
    >
      {children}
    </View>
  );
};

export default StaticLayout;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
    flexGrow: 1,
  },
});
