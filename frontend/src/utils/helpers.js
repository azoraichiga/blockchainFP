import { formatEther } from "ethers";

export const shortAddress = (addr) =>
  addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : "";

// Reward berupa ETH sungguhan (CourseReward.sol: claimReward memakai payable transfer).
// amountWei dari kontrak berupa BigInt (ethers v6). Fungsi ini handle keduanya:
//   - BigInt  → formatEther() dari ethers (hasilkan string desimal, misal "0.1")
//   - Number  → tampilkan apa adanya (fallback / mock)
export const formatETH = (amountWei) => {
  if (amountWei === null || amountWei === undefined) return "0 ETH";
  if (typeof amountWei === "bigint") {
    return `${formatEther(amountWei)} ETH`;
  }
  // Number biasa (hasil Number(ethers.formatEther(...)) di useContract.js)
  return `${amountWei} ETH`;
};

// Format epoch (detik) jadi tanggal yang gampang dibaca.
export const formatDeadline = (epochSeconds) => {
  if (!epochSeconds || Number(epochSeconds) === 0) return "Tidak ada batas waktu";
  const d = new Date(Number(epochSeconds) * 1000);
  return d.toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" });
};

// Ubah error mentah dari MetaMask/ethers jadi pesan ramah user.
// Pesan-pesan di bawah disesuaikan dengan require() yang ADA di
// CourseReward.sol milik anggota Smart Contract — bukan tebakan generik.
export function friendlyError(error) {
  const msg = (error?.reason || error?.message || "").toLowerCase();
  const errStr = typeof error === 'object' ? JSON.stringify(error, Object.getOwnPropertyNames(error)).toLowerCase() : String(error).toLowerCase();

  if (errStr.includes("4001") || errStr.includes("action_rejected") || errStr.includes("user rejected") || errStr.includes("user denied")) {
    return "Transaksi dibatalkan. Kamu menolak permintaan di MetaMask.";
  }
  if (errStr.includes("insufficient funds")) {
    return "Saldo ETH kamu tidak cukup untuk membayar gas.";
  }
  if (errStr.includes("insufficient contract balance")) {
    return "Saldo kontrak belum cukup untuk membayar reward. Hubungi dosen untuk top-up.";
  }
  if (errStr.includes("reward already claimed") || errStr.includes("already claimed")) {
    return "Reward sudah pernah diklaim.";
  }
  if (errStr.includes("claim deadline has passed")) {
    return "Batas waktu klaim sudah lewat.";
  }
  if (errStr.includes("not whitelisted")) {
    return "Alamat kamu belum terdaftar untuk menerima reward. Hubungi dosen.";
  }
  if (errStr.includes("contract is not active")) {
    return "Program reward sedang dinonaktifkan oleh dosen.";
  }
  if (errStr.includes("invalid student address")) {
    return "Alamat mahasiswa tidak valid.";
  }
  if (errStr.includes("amount must be greater than 0")) {
    return "Jumlah reward harus lebih dari 0.";
  }
  return "Terjadi kesalahan. Periksa koneksi dan coba lagi.";
}
