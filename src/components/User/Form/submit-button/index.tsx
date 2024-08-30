import { Button } from '@/components/ui/button'
import React from 'react'
export default function SubmitButton({
    error,
    pending
}:{
    error: string
    pending?: boolean
}) {
    return (
      <>
        {error && <p className="text-red-500">{error}</p>}
        <Button variant={"default"} disabled={pending}>
          {pending ? "Submitting..." : "Submit"}
        </Button>
      </>
    );
  }