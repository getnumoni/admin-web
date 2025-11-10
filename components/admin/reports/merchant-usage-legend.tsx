'use client';

export function MerchantUsageLegend() {
  return (
    <div className="flex flex-row items-center gap-8 pt-2 text-sm">
      <div className="flex items-center gap-3">
        <span className="h-6 w-[3px] rounded" style={{ backgroundColor: '#10b981' }} />
        <span className="text-gray-900">Purchase Rate</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="h-6 w-[3px] rounded" style={{ backgroundColor: '#94a3b8' }} />
        <span className="text-gray-900">Budget Cap</span>
      </div>
    </div>
  );
}

