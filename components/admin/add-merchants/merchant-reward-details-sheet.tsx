"use client";

import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getStatusColor, getStatusText } from "@/lib/helper";
import { Reward } from "./types";

interface MerchantRewardDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reward: Reward | null;
}

export default function MerchantRewardDetailsSheet({
  open,
  onOpenChange,
  reward: selectedReward,
}: MerchantRewardDetailsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Reward Rules</SheetTitle>
          <SheetDescription>
            Details regarding the selected reward configuration.
          </SheetDescription>
        </SheetHeader>

        {selectedReward && (
          <div className="mt-4 space-y-6 mx-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Type</h4>
                <p className="font-medium">
                  {selectedReward.rewardType.replace("_", " ")}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                <Badge className={getStatusColor(selectedReward.status)}>
                  {getStatusText(selectedReward.status)}
                </Badge>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Reward Cap</h4>
                <p className="font-medium">
                  {new Intl.NumberFormat("en-US").format(selectedReward.rewardCap)}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Available</h4>
                <p className="font-medium">
                  {new Intl.NumberFormat("en-US").format(selectedReward.availableRewards)}
                </p>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-base font-semibold">Rules Configured</h3>
              {selectedReward.rules && selectedReward.rules.length > 0 ? (
                <div className="rounded-md border">
                  <div className="grid grid-cols-3 border-b bg-muted/50 p-2 text-xs font-medium">
                    <div>Min Spend</div>
                    <div>Max Spend</div>
                    <div className="text-right">Value</div>
                  </div>
                  {selectedReward.rules.map((rule) => (
                    <div
                      key={`${rule.minSpend}-${rule.maxSpend}-${rule.rewardValue}`}
                      className="grid grid-cols-3 p-2 text-sm border-b last:border-0 hover:bg-muted/50"
                    >
                      <div>
                        {new Intl.NumberFormat("en-US").format(rule.minSpend)}
                      </div>
                      <div>
                        {new Intl.NumberFormat("en-US").format(rule.maxSpend)}
                      </div>
                      <div className="text-right font-medium">
                        {rule.rewardValue}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  No specific rules found.
                </div>
              )}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
