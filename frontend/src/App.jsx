import ConnectWallet from "./components/ConnectWallet";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="5"/><path strokeLinecap="round" strokeLinejoin="round" d="M8 13l-2 8 6-3 6 3-2-8"/></svg>
            </div>
            <div>
              <p className="text-base font-medium text-slate-900">Course Reward</p>
              <p className="text-xs text-slate-400">Sistem reward mahasiswa on-chain</p>
            </div>
          </div>
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
}
