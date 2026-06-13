import { useState, useCallback, useEffect, useRef } from "react";
import { MOCK_ADDRESS, MOCK_STATE, MOCK_HISTORY, sleep } from "../utils/mockData";

let toastId = 0;

export function useContract() {
  const [account, setAccount] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [claimed, setClaimed] = useState(false);
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const [loadingRead, setLoadingRead] = useState(false);
  const [txStatus, setTxStatus] = useState("idle");
  const [grantStatus, setGrantStatus] = useState("idle");
  const [history, setHistory] = useState([]);
  const [toasts, setToasts] = useState([]);

  const pushToast = useCallback((message, kind = "info") => {
    const id = ++toastId;
    setToasts((t) => [...t, { id, message, kind }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  }, []);
  const dismissToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  const [error, setError] = useState(null);

  // ---- READ OPERATIONS (2) ----
  const readData = useCallback(async () => {
    setLoadingRead(true);
    setError(null);
    try {
      await sleep(900); // TODO(Web3): ganti dengan contract.getRewardAmount + hasClaimed
      setRewardAmount(MOCK_STATE.rewardAmount);
      setClaimed(MOCK_STATE.claimed);
      setHistory(MOCK_HISTORY);
    } catch (e) {
      setError("Gagal membaca data dari blockchain.");
    } finally {
      setLoadingRead(false);
    }
  }, []);

  const addHistory = useCallback((entry) => setHistory((h) => [entry, ...h]), []);

  // ---- WRITE #1: CLAIM ----
  const claim = useCallback(async () => {
    setError(null);
    setTxStatus("pending");
    try {
      await sleep(1600); // TODO(Web3): contract.claimReward() lalu tx.wait()
      if (Math.random() < 0.12) throw { code: 4001 }; // simulasi user reject
      setClaimed(true);
      setTxStatus("success");
      addHistory({ type: "Reward claimed", amount: rewardAmount, by: "Kamu", time: "baru saja" });
      pushToast(`Reward ${rewardAmount} CRT berhasil diklaim`, "success");
    } catch (e) {
      setTxStatus("failed");
      setError("Transaksi ditolak di MetaMask. Coba lagi.");
    }
  }, [rewardAmount, addHistory, pushToast]);

  const connect = useCallback(async () => {
    setError(null);
    setAccount(MOCK_ADDRESS);
    setWrongNetwork(MOCK_STATE.wrongNetwork);
    setIsAdmin(MOCK_STATE.isAdmin);
    await readData();
  }, [readData]);

  // ---- WRITE #2: GRANT REWARD (dosen) ----
  const grantReward = useCallback(async (studentAddr, amount) => {
    setError(null);
    setGrantStatus("pending");
    try {
      await sleep(1500); // TODO(Web3): contract.grantReward(addr, amount) onlyOwner
      setGrantStatus("success");
      addHistory({ type: "Reward granted", amount: Number(amount), by: "Dosen", time: "baru saja" });
      pushToast(`Memberi ${amount} CRT ke ${studentAddr.slice(0, 6)}…`, "success");
      setTimeout(() => setGrantStatus("idle"), 2500);
    } catch (e) {
      setGrantStatus("failed");
      setError("Gagal memberi reward. Pastikan kamu admin & input benar.");
    }
  }, [addHistory, pushToast]);

  // ---- EVENT LISTENING (real-time) ----
  // TODO(Web3): ganti dengan contract.on("RewardGranted"/"RewardClaimed", ...)
  const ticked = useRef(false);
  useEffect(() => {
    if (!account || ticked.current) return;
    ticked.current = true;
    const t = setTimeout(() => {
      addHistory({ type: "Reward granted", amount: 50, by: "Dosen", time: "baru saja" });
      pushToast("Reward baru masuk: 50 CRT dari Dosen", "info");
    }, 5000);
    return () => clearTimeout(t);
  }, [account, addHistory, pushToast]);

  return { account, isAdmin, rewardAmount, claimed, wrongNetwork, loadingRead, txStatus, grantStatus, error, history, toasts, connect, claim, grantReward, dismissToast };
}
