import { Pressable, View } from 'react-native';
import Layout from './Layout';
import { Link, RelativePathString } from 'expo-router';
import AngleRight from '@/assets/SVGs/Angle-right';
import { ThemedText } from '@/components/ThemedText';

const Setting = () => {
  const settings: { name: string; link: RelativePathString }[] = [
    { name: "My Profile", link: "./(settings)/(profile)/profile" },
    { name: "Security", link: "./(settings)/(security)/security" },
    { name: "Notifications", link: "./(settings)/notifications" },
    { name: "Account Limits", link: "./(settings)/accountLimit" },
    { name: "Transactions", link: "../(transactions)/history" },
  ];

  return (
    <Layout header="Settings">
      <View>
        {settings.map((setting, index) => (
          <Link asChild href={setting.link} key={index}>
            <Pressable className="pt-8 pb-4 flex-row items-center justify-between mx-5 border-b border-gray-400">
              <ThemedText className="capitalize text-lg">{setting.name}</ThemedText>
              <AngleRight />
            </Pressable>
          </Link>
        ))}
      </View>
    </Layout>
  );
};

export default Setting;
