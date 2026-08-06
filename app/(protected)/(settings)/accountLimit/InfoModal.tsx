import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

interface InfoModalProps {
  visible: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      {/* Semi-transparent backdrop */}
      <View className="flex-1 justify-center items-center bg-black/50">
        {/* Modal content */}
        <View className="bg-[#E3F2FD] p-6 rounded-xl w-11/12">
          <Text className="text-black text-lg mt-3 mb-4">
            You can set maximum amount you wish to deposit in a selected period of time.
          </Text>

          {/* Close button */}
          <TouchableOpacity
            onPress={onClose}
            className="bg-[#E3F2FD] px-4 py-2 rounded-xl items-center"
          >
            <Text className="text-sec text-xl font-bold">OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default InfoModal;