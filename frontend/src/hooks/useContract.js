import { useState, useCallback } from "react";
import { MOCK_ADDRESS, MOCK_STATE, sleep } from "../utils/mockData";

export function useContract() {
  const [account, setAccount] = useState(null);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [claimed, setClaimed] = useState(false);
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const [error, setError] = useState(null);

  // ---- READ OPERATIONS (2) ----
  const readData = useCallback(async () => {
    setError(null);
    await sleep(300); // TODO(Web3): ganti dengan contract.getRewardAmount + hasClaimed
    setRewardAmount(MOCK_STATE.rewardAmount);
    setClaimed(MOCK_STATE.claimed);
  }, []);

  const connect = useCallback(async () => {
    setError(null);
    setAccount(MOCK_ADDRESS);
    setWrongNetwork(MOCK_STATE.wrongNetwork);
    await readData();
  }, [readData]);

  return { account, rewardAmount, claimed, wrongNetwork, error, connect };
}
