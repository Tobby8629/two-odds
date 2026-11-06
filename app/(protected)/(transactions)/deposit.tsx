import { Modal, Pressable, ScrollView, Share, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import { BadgeCheck, ExternalLink, X } from 'lucide-react-native'
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons'
import * as WebBrowser from 'expo-web-browser'
import QRCode from 'react-native-qrcode-svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Layout from './Layout'
import Button from '@/components/Reuseables/Button'
import AlertBanner from '@/components/Reuseables/AlertBanner'
import USDT from '@/assets/SVGs/icons/Usdt'
import { paymentSteps } from '@/constants/data'
import { SIMULATE } from '@/constants/demo'
import { useWalletBalance } from '@/hooks/useWalletBalance'
import { useNairaDeposit, useUsdtDeposit } from '@/hooks/useDeposit'
import { DepositNetwork, UsdtDeposit } from '@/types/wallet.types'

const MIN_AMOUNT = 5
/* Figma gold used on the success popup. */
const GOLD = '#FFC400'

const shortAddress = (a: string) => (a.length > 12 ? `${a.slice(0, 6)}......${a.slice(-4)}` : a)

const formatStamp = (d: Date) =>
  `${d.getDate()} ${d.toLocaleString('en-GB', { month: 'long' })} ${d.getFullYear()} ${d
    .toTimeString()
    .slice(0, 5)}`
const QUICK_ADD = [5, 10, 15]

const ASSETS = [
  { value: 'USDT', label: 'USDT' },
  { value: 'NGN', label: 'Naira (NGN)' },
]
const NETWORKS: { value: DepositNetwork; label: string }[] = [
  { value: 'SOLANA', label: 'Solana' },
  { value: 'ETHEREUM', label: 'Ethereum' },
]

/* Figma select field: 347x52, radius 12, 70% dark fill, 1px amber border. */
const SelectField = ({
  placeholder,
  value,
  options,
  onChange,
}: {
  placeholder: string
  value: string | null
  options: { value: string; label: string }[]
  onChange: (value: string) => void
}) => {
  const [open, setOpen] = useState(false)
  const selected = options.find((o) => o.value === value)

  return (
    <View className="mb-4">
      <Pressable
        onPress={() => setOpen((o) => !o)}
        className="flex-row items-center justify-between px-4 self-center"
        style={{
          width: '100%',
          maxWidth: 347,
          height: 52,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#FFA500',
          backgroundColor: 'rgba(1,20,35,0.7)',
        }}
      >
        <Text style={{ color: selected ? '#FFFFFF' : '#B9CBD9', fontSize: 14 }}>
          {selected?.label ?? placeholder}
        </Text>
        <FontAwesome6 name={open ? 'angle-up' : 'angle-down'} size={16} color="white" />
      </Pressable>

      {open && (
        <View
          className="self-center mt-1 overflow-hidden"
          style={{ width: '100%', maxWidth: 347, borderRadius: 12, backgroundColor: '#011423' }}
        >
          {options.map((o) => (
            <Pressable
              key={o.value}
              onPress={() => {
                onChange(o.value)
                setOpen(false)
              }}
              className="px-4 justify-center"
              style={{ height: 44 }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 14 }}>{o.label}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  )
}

const Deposits = () => {
  const insets = useSafeAreaInsets()
  const { data: balance } = useWalletBalance()
  const usdtDeposit = useUsdtDeposit()
  const nairaDeposit = useNairaDeposit()

  const [asset, setAsset] = useState<string | null>(null)
  const [network, setNetwork] = useState<DepositNetwork | null>(null)
  const [amount, setAmount] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [invoice, setInvoice] = useState<UsdtDeposit | null>(null)
  const [confirmed, setConfirmed] = useState(false)

  const isNaira = asset === 'NGN'
  const numeric = parseFloat(amount)
  const valid = !!asset && (isNaira || !!network) && numeric >= MIN_AMOUNT
  const busy = usdtDeposit.isPending || nairaDeposit.isPending

  const shownBalance = isNaira
    ? `₦${Number(balance?.ngn.balance ?? 0).toFixed(2)}`
    : Number(balance?.usdt.balance ?? 0).toFixed(2)

  const handleAmount = (text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, '')
    setAmount(cleaned.split('.').length > 2 ? amount : cleaned)
  }

  const addAmount = (n: number) =>
    setAmount(((Number.isNaN(numeric) ? 0 : numeric) + n).toFixed(2))

  const handleTopUp = async () => {
    if (!valid || busy) return
    setError(null)
    try {
      if (isNaira) {
        const res = await nairaDeposit.mutateAsync({ amount: numeric })
        if (res.authorizationUrl) await WebBrowser.openBrowserAsync(res.authorizationUrl)
        else setConfirmed(true)
      } else {
        setInvoice(await usdtDeposit.mutateAsync({ amount: numeric, network: network! }))
      }
    } catch (e: any) {
      setError(e?.response?.data?.message ?? e?.message ?? 'Could not start the deposit. Try again.')
    }
  }

  /* No endpoint reports a confirmed deposit yet, so dev builds simulate one. */
  useEffect(() => {
    if (!invoice || !SIMULATE.depositConfirmation) return
    const t = setTimeout(() => setConfirmed(true), 8000)
    return () => clearTimeout(t)
  }, [invoice])

  const reset = () => {
    setInvoice(null)
    setConfirmed(false)
    setAmount('')
    setNetwork(null)
  }

  const header = (
    <Link href={'/(tabs)/profile'}>
      <FontAwesome5 name="user" solid size={24} color="white" />
    </Link>
  )

  return (
    <Layout
      title="Deposit"
      otherLinks={header}
      handleClick={invoice ? () => setInvoice(null) : undefined}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: insets.bottom + 24,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {error && <AlertBanner message={error} />}

        {invoice ? (
          /* Figma "Frame 860": 292 wide, 24 gap, #01284A. */
          <View
            className="self-center items-center"
            style={{
              width: 292,
              borderRadius: 32,
              backgroundColor: '#01284A',
              paddingVertical: 24,
              gap: 24,
            }}
          >
            <View
              className="items-center justify-center"
              style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#0D9D1B' }}
            >
              <USDT width={22} height={21} />
            </View>

            {/* Rectangle 280: 217x222, radius 33, #0F0F0F. */}
            <View
              className="items-center justify-center"
              style={{ width: 217, height: 222, borderRadius: 33, backgroundColor: '#0F0F0F' }}
            >
              <View className="bg-white items-center justify-center" style={{ padding: 0 }}>
                <QRCode value={invoice.payAddress} size={167} quietZone={0} />
              </View>
            </View>

            <View
              className="flex-row items-center justify-between"
              style={{ width: 250 }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 14 }}>Wallet Address:</Text>
              <Text numberOfLines={1} selectable style={{ color: '#FFFFFF', fontSize: 14, maxWidth: 110 }}>
                {shortAddress(invoice.payAddress)}
              </Text>
            </View>

            <Pressable
              onPress={() => Share.share({ message: invoice.payAddress })}
              className="flex-row items-center justify-center"
              style={{ height: 23, paddingHorizontal: 15, borderRadius: 4, backgroundColor: '#FFA500', gap: 6 }}
            >
              <Text style={{ color: '#000000', fontSize: 14, fontWeight: '600', lineHeight: 14 }}>Share</Text>
              <FontAwesome6 name="arrow-up-from-bracket" size={12} color="#000000" />
            </Pressable>
          </View>
        ) : (
          <>
            <SelectField
              placeholder="Select Asset"
              value={asset}
              options={ASSETS}
              onChange={setAsset}
            />
            {asset === 'USDT' && (
              <SelectField
                placeholder="Select Network"
                value={network}
                options={NETWORKS}
                onChange={(v) => setNetwork(v as DepositNetwork)}
              />
            )}

            <Text className="text-white mb-2">
              Balance ({isNaira ? 'NGN' : 'USDT'}) {shownBalance}
            </Text>

            <View
              className="self-center justify-center px-4"
              style={{
                width: '100%',
                maxWidth: 347,
                height: 52,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#FFA500',
                backgroundColor: 'rgba(1,20,35,0.7)',
              }}
            >
              <TextInput
                value={amount}
                onChangeText={handleAmount}
                keyboardType="decimal-pad"
                placeholder={`min. ${MIN_AMOUNT.toFixed(2)}`}
                placeholderTextColor="#B9CBD9"
                style={{ color: '#FFFFFF', fontSize: 14 }}
              />
            </View>

            <View className="flex-row mt-3 mb-6" style={{ gap: 10 }}>
              {QUICK_ADD.map((n) => (
                <Pressable
                  key={n}
                  onPress={() => addAmount(n)}
                  className="items-center justify-center"
                  style={{ width: 70, height: 30, borderRadius: 9, backgroundColor: '#ABB2FA' }}
                >
                  <Text style={{ fontSize: 13, color: '#000000' }}>+{n.toFixed(2)}</Text>
                </Pressable>
              ))}
            </View>

            <Button
              text={busy ? 'Please wait…' : 'Top up now'}
              onPress={handleTopUp}
              disable={!valid || busy}
              className="!mx-auto !w-[347px] !max-w-full !h-[52px] !rounded-xl"
              style={valid && !busy ? undefined : { backgroundColor: '#ABB2FA' }}
            />
          </>
        )}

        <View className="mt-8">
          <Text className="text-center text-white mb-3">Payment Steps</Text>
          {paymentSteps.map((step, index) => (
            <View key={index} className="flex-row items-baseline gap-2 mb-2">
              <Text className="text-white">{index + 1}.</Text>
              <Text className="text-white flex-1" style={{ fontSize: 14 }}>
                {step}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal visible={confirmed} transparent animationType="fade" onRequestClose={reset}>
        <View
          className="flex-1 items-center justify-center px-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
        >
          <View
            className="items-center"
            style={{
              width: '100%',
              maxWidth: 341,
              borderRadius: 20,
              backgroundColor: '#022645',
              paddingVertical: 36,
              paddingHorizontal: 24,
            }}
          >
            <Pressable
              onPress={reset}
              accessibilityLabel="Close"
              className="absolute items-center justify-center"
              style={{ top: 12, right: 12, width: 32, height: 32, borderRadius: 16, backgroundColor: '#3A5068' }}
            >
              <X size={16} color="#FFFFFF" />
            </Pressable>

            <BadgeCheck size={44} color={GOLD} />
            <Text style={{ color: GOLD, fontSize: 14, marginTop: 16 }}>Deposit Successfully!</Text>

            <View className="flex-row items-center mt-3">
              <View
                className="items-center justify-center"
                style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: '#0D9D1B', marginRight: 8 }}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '700' }}>T</Text>
              </View>
              <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700', fontStyle: 'italic' }}>
                {Number.isNaN(numeric) ? '0.00' : numeric.toFixed(2)}
              </Text>
            </View>

            <Text style={{ color: '#FFFFFF', fontSize: 12, marginTop: 14 }}>
              From:  {invoice ? shortAddress(invoice.payAddress) : '0xffgg......0051'}
            </Text>
            <Text style={{ color: '#FFFFFF', fontSize: 12, marginTop: 8 }}>
              To : {isNaira ? 'Naira wallet' : 'Usdt wallet'}
            </Text>
            <Text style={{ color: '#FFFFFF', fontSize: 10, marginTop: 10 }}>{formatStamp(new Date())}</Text>

            <Pressable
              onPress={() => {
                reset()
                router.push('/(transactions)/history')
              }}
              className="flex-row items-center mt-4"
            >
              <Text style={{ color: GOLD, fontSize: 10, marginRight: 6 }}>Transactions Status</Text>
              <ExternalLink size={12} color={GOLD} />
            </Pressable>
          </View>
        </View>
      </Modal>
    </Layout>
  )
}

export default Deposits
