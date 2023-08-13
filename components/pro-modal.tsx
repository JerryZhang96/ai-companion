"use client"

import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import axios from "axios"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useProModal } from "@/hooks/use-pro-modal"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const ProModal = () => {
  const proModal = useProModal()
  const [isMounted, setIsMounted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onSubscribe = async () => {
    try {
      setLoading(true)
      const response = await axios.get("/api/stripe")

      window.location.href = response.data.url
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  if (!isMounted) {
    return null
  }

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">Upgrade to Pro</DialogTitle>
          <DialogDescription className="text-center space-y-2">
            Create
            <span className="text-sky-500 mx-1 font-medium">Custom AI</span>
            Companions!
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex justify-between">
          <p className="text-2xl font-medium">
            $9<span className="text-sm font-normal">.90 / mo</span>
          </p>
          <Button onClick={onSubscribe} disabled={loading} variant="premium">
            Subscribe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
