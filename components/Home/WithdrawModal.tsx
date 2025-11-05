import { verified } from "@/assets/images"
import Cancel from "@/assets/SVGs/Cancel"
import { Image, Modal, Pressable, StyleSheet, View } from "react-native"
import { ThemedText } from "../ThemedText"
import WithdrawStatus from "@/assets/SVGs/bets/WithdrawStatus"
import { useWithdrawal } from "@/store/useStore"

const WithdrawModal = () => {
  const {withdrawStatus, removeWithdrawStatus } = useWithdrawal()

  if (withdrawStatus)
    return (
      <Modal transparent visible>
        <Pressable className="h-full w-full absolute" onPress={removeWithdrawStatus}></Pressable>
        <View style={styles.modal}>
          <Pressable onPress={removeWithdrawStatus} className="h-10 w-10 absolute right-[30px] top-[20px]">
            <View className=" h-full w-full justify-center items-center rounded-full bg-[#626262B2]">
              <Cancel />
            </View>
          </Pressable>
          <Image source={verified} style={styles.image} />
          <ThemedText className="!text-sec text-center font-sansitaBoldItalic text-2xl">
            Bet Withdrawn, Successfully!
          </ThemedText>
          <ThemedText className="text-center font-sansitaBoldItalic text-xl my-2" >$1200.30</ThemedText>
          <ThemedText className=" text-center mb-3 text-[14px]">Transaction Id: 123456789</ThemedText>
          <ThemedText className=" text-center mb-3 text-[14px]">Trade No: 123456789</ThemedText>
          <ThemedText className=" text-center mb-3 text-[14px]">14 May 2025 18:30</ThemedText>
          <View style={styles.statusRow}>
            <ThemedText className="!text-sec font-semibold my-5">Transactions Status</ThemedText>
            <WithdrawStatus />
          </View>
        </View>
      </Modal>
    )

  return null
}

const styles = StyleSheet.create({
  modal: {
    height: 325,
    backgroundColor: "#888888",
    marginTop: "auto",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginVertical: 10,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    gap: 8,
  },
})

export default WithdrawModal
