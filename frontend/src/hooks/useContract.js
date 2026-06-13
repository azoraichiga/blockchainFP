import { useState, useCallback } from "react";
import { MOCK_ADDRESS, MOCK_STATE, sleep } from "../utils/mockData";

export function useContract() {
  const [account, setAccount] = useState(null);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [claimed, setClaimed] = useState(false);
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const [loadingRead, setLoadingRead] = useState(false);
  const [error, setError] = useState(null);

  // ---- READ OPERATIONS (2) ----
  const readData = useCallback(async () => {
    setLoadingRead(true);
    setError(null);
    try {
      await sleep(900); // TODO(Web3): ganti dengan contract.getRewardAmount + hasClaimed
      setRewardAmount(MOCK_STATE.rewardAmount);
      setClaimed(MOCK_STATE.claimed);
    } catch (e) {
      setError("Gagal membaca data dari blockchain.");
    } finally {
      setLoadingRead(false);
    }
  }, []);

  const connect = useCallback(async () => {
    setError(null);
    setAccount(MOCK_ADDRESS);
    setWrongNetwork(MOCK_STATE.wrongNetwork);
    await readData();
  }, [readData]);

  return { account, rewardAmount, claimed, wrongNetwork, loadingRead, error, connect };
}
