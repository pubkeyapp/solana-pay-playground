import { createQR, encodeURL, TransactionRequestURLFields } from '@solana/pay'
import { PublicKey } from '@solana/web3.js'

import { useEffect, useRef } from 'react'

export function TransactionRequestQR({ reference }: { reference: PublicKey }) {
  const qrRef = useRef<HTMLDivElement>(null)
  const networkConfiguration = 'devnet'

  useEffect(() => {
    // window.location is only available in the browser, so create the URL in here
    const { location } = window
    const apiUrl = `${location.protocol}//${
      location.host
    }/api/transaction?network=${networkConfiguration}&reference=${reference.toBase58()}`
    const urlParams: TransactionRequestURLFields = {
      link: new URL(apiUrl),
      label: 'My Store',
    }
    console.log('apiUrl', apiUrl)
    const solanaUrl = encodeURL(urlParams)
    const qr = createQR(solanaUrl, 512, 'transparent')
    qr.update({ backgroundOptions: { round: 1000 } })
    if (qrRef.current) {
      qrRef.current.innerHTML = ''
      qr.append(qrRef.current)
    }
  }, [networkConfiguration, reference])

  return (
    <div>
      <div ref={qrRef} />
    </div>
  )
}
