import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import Layout from "./Layout";
import SubmittedScreen from "./kyc/SubmittedScreen";
import { useKycFormStore } from "@/store/kycFormStore";

/*
 * TEMPORARY design preview of the KYC success screen, so it can be reviewed
 * without walking the wizard. Delete this file and restore the Settings link
 * to ./(settings)/kyc once the design is signed off.
 */
export default function KycPreviewScreen() {
  const { setDocType, setUpload } = useKycFormStore();

  useEffect(() => {
    setDocType("nin");
    setUpload("ninSlip", "preview://front");
    setUpload("idBack", "preview://back");
  }, [setDocType, setUpload]);

  return (
    <Layout header="KYC">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <SubmittedScreen
          status="PENDING"
          onCheckLater={() => {}}
        />
      </ScrollView>
    </Layout>
  );
}
