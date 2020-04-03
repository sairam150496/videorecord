import { Barcode, BarcodePicker, ScanSettings, configure } from "scandit-sdk";
import React, { useEffect, useState } from 'react'

export default function ScanditBarcodeReader():JSX.Element {
    const [barcode, setBarcode] = useState<any>(null);
    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({video: true})
        .then(stream=>{
            const video = document.querySelector("video")!
            video.srcObject=stream
            video.play()
            configure("ATwu4g3fEw81IyUL7A1T6Q8Db366LWoK/Ee+NZtRuP8QS0KfEGsn3nwH858qQBWk3EzRm9lU0EF2K0QUbHCP+OxQvUp0XRNS7ngnHOR5brCrH9ufajDaBugqCNguXwfLJtgzDVNhTz7K8RiZTarJuie3IwfcTOxtVZB1QDWNBPXDosESzd2BryV8Nyj9sqVeUe1Sc5zMiQ8jXB/9tRaeFVXK3T41dzN4rRuW9M4Vrsm3ncJpYedv0ahjnmZUxX9bCN9Mg2DrUzB8ekUCTdCesE5ewryTplNvZ15clt4h42fPgvBulY9VsKEh5o7P02aw5wyz04yJbaKF1YqQ4DdWXr8fUGpNXv0h+pdhidePsOVZGCniVN1vixeu58QFzR+/bWkgVWh9CJdxo1m0KMBLR4/s7bl2NuhmB9DipVvGpQVniRHrqKjK3qpz+wBhrhQbhX6umRzfapTnc7UChn5D9AR5Uw22UHScXzg3GDTOFgeWeHA8qMoAjLvvjROYEcS/TMhDYD2y1m3pIWT/KdXttxlEtwPxfJpYPPE9CWGeMPCHHMeNKqqRRnSb851EDs37GmkxadJ5a8vohGwbihCVLrKti1bgo7N2chgZRuHVS1EKE3JsqRWw9kPTMZKiy8nGnPZY+KgV5fqgg6W0pD5rvzpk3OsgHvFs7V40uHaKX5bfthCe95ky00b8P3jXHEvDTmQY46Gj2ciP6FWWQeB/Z8KxlHQDr7dnT1/0VICn5UMtudNhzoa/C5QyNmqZhmHgQeIeY5Xny14u35PI+8K/Iguj6rZiolw5a+rL", {
                engineLocation: process.env.PUBLIC_URL+'build/'
              })
            BarcodePicker.create(video , {
                playSoundOnScan: true,
                vibrateOnScan: true
              }).then(barcode=>{
                setBarcode(barcode)
              })
        })
    }, [])
    useEffect(()=>{
        if(barcode){
            const scanSettings = new ScanSettings({
                enabledSymbologies: [
                  Barcode.Symbology.EAN8,
                  Barcode.Symbology.EAN13,
                  Barcode.Symbology.UPCA,
                  Barcode.Symbology.UPCE,
                  Barcode.Symbology.CODE128,
                  Barcode.Symbology.CODE39,
                  Barcode.Symbology.CODE93,
                  Barcode.Symbology.INTERLEAVED_2_OF_5
                ],
                codeDuplicateFilter: 1000
              });
              console.log(barcode)
              barcode.applyScanSettings(scanSettings);
            barcode.on("scan", (scanResult: any) => {
                
                alert(scanResult.barcodes.reduce((string: any, barcode:any) => {
                  return string + `${Barcode.Symbology.toHumanizedName(barcode.symbology)}: ${barcode.data}\n`;
                }, ""))
              });
            
        }
    }, [barcode])
    return(
        <>
            <video id="reader" />
        </>
    )
}