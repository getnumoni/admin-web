"use client"

import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface LoadingModalProps {
  isOpen: boolean
  title?: string
  message?: string
  description?: string
}

export function LoadingModal({
  isOpen,
  title = "Loading...",
  message = "Please wait while we process your request.",
  description
}: LoadingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={() => { }}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-center">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
          >
            <Loader2 className="h-8 w-8 animate-spin text-theme-dark-green" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="text-sm text-gray-600 text-center max-w-sm"
          >
            {message}
          </motion.p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
