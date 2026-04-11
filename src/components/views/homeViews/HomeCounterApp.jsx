import { useState } from 'react';

export function HomeCounterApp() {
  const [teamSize, setTeamSize] = useState(5);
  const basePricePerUser = 29;


  const discountMultiplier = teamSize >= 50 ? 0.8 : teamSize >= 20 ? 0.9 : 1;
  const currentPricePerUser = basePricePerUser * discountMultiplier;
  const monthlyTotal = teamSize * currentPricePerUser;

  const handleIncrement = () => setTeamSize((prev) => prev + 1);
  const handleDecrement = () => setTeamSize((prev) => (prev > 1 ? prev - 1 : 1));
  const handleReset = () => setTeamSize(5);

  return (
    <section className="py-24 relative overflow-hidden">
      {}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--primary)]/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
            hellow's from me - Calculator.
          </h2>
          <p className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Experiment with our interactive estimator. This component demonstrates a complex React <code className="text-[var(--primary)] bg-[var(--surface-muted)] px-2 py-1 rounded-md text-sm font-mono">useState</code> implementation acting as a premium volume pricing calculator.
          </p>
        </div>

        <div className="surface-card rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden backdrop-blur-xl bg-opacity-80 dark:bg-opacity-80 border-t border-l border-[var(--border-default)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Counter Interactive Section */}
            <div className="space-y-10">
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-[var(--text-muted)] mb-6">
                  Select Number of Seats
0              </label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className="flex items-center gap-6 bg-[var(--surface-muted)] p-2 rounded-full border border-[var(--border-default)] w-max shadow-inner">
                    <button
                      onClick={handleDecrement}
                      className="w-14 h-14 rounded-full bg-[var(--surface)] border border-[var(--border-default)] flex items-center justify-center text-2xl text-[var(--text-primary)] hover:border-[var(--primary-border)] hover:text-green-600 dark:hover:text-[var(--primary)] shadow-sm transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
                      disabled={teamSize <= 1}
                      aria-label="Decrease team size"
                    >
                    
                    </button>

                    <div className="w-20 text-center">
                      <span className="text-5xl font-black tabular-nums tracking-tighter text-[var(--text-primary)]">
                        {teamSize}
                      </span>
                    </div>

                    <button
                      onClick={handleIncrement}
                      className="w-14 h-14 rounded-full bg-[var(--surface)] border border-[var(--border-default)] flex items-center justify-center text-2xl text-[var(--text-primary)] hover:border-[var(--primary-border)] hover:text-green-600 dark:hover:text-[var(--primary)] shadow-sm transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                      aria-label="Increase team size"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="group flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-rotate-180 transition-transform duration-500"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
                  <span>Reset to default value</span>
                </button>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-[var(--surface-muted)] rounded-3xl p-8 lg:p-10 border border-[var(--border-default)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/5 rounded-full blur-2xl -mr-16 -mt-16 transition-all duration-700 group-hover:bg-[var(--primary)]/20"></div>

              <div className="space-y-8 relative z-10">
                <div className="flex justify-between items-end pb-8 border-b border-[var(--border-strong)]">
                  <div>
                    <span className="block text-[var(--text-muted)] text-sm font-semibold mb-1 uppercase tracking-wider">Per User / Month</span>
                    <span className="text-2xl font-bold text-[var(--text-primary)] transition-all duration-300">
                      ${currentPricePerUser.toFixed(2)}
                    </span>
                  </div>
                  {discountMultiplier < 1 ? (
                    <div className="text-xs font-bold px-3 py-1.5 bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20 rounded-full animate-in fade-in slide-in-from-bottom-2 duration-500">
                      Volume Discount Active
                    </div>
                  ) : (
                    <div className="text-xs font-medium px-3 py-1.5 bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border-default)] rounded-full">
                      Standard Rate
                    </div>
                  )}
                </div>

                <div>
                  <span className="block text-[var(--text-secondary)] font-medium mb-3">Estimated Monthly Total</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black tracking-tighter text-[var(--text-primary)] transition-all duration-300">
                      ${monthlyTotal.toFixed(0)}
                    </span>
                    <span className="text-xl text-[var(--text-muted)] font-medium">USD</span>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] mt-4">Billed annually or month-to-month. Cancel anytime.</p>
                </div>

                <button className="primary-btn w-full py-5 text-lg mt-4 shadow-xl shadow-[var(--primary)]/10 hover:shadow-[var(--primary)]/20 font-bold tracking-wide">
                  Proceed to Checkout
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
