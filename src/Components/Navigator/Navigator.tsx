import React, { useState, useEffect } from 'react';
import { Stream } from 'stream';
// Capture is missing in video tag


export default function Navigator(): JSX.Element{
    const [stream, setStream] = useState<any|null>(null)
    const [mediaRecorder, setMediaRecorder] = useState<any | null>(null)
    const [chunks, setChunks] = useState<Array<any>>([])
    const [err, setErr] = useState<string>('')
    const [cap, setCaps] = useState<any>({})
    useEffect(()=>{
       try{
        if(!stream){
            if(navigator.mediaDevices.getUserMedia || navigator.mediaDevices){
                navigator.mediaDevices.getUserMedia({audio: true, video: true})
                .then(stream=>{
                    setStream(stream)
                })
                .catch(error=>{
                    setErr(err)
                })
            }else{
                alert("This device wont support HTML5 content OR You might be accessing this through a non secure application")
            }
        }else{
            if(mediaRecorder){
              
                mediaRecorder.start()
                mediaRecorder.ondataavailable = (e: any)=>{
                  console.log('data', e.data)
                    setChunks((chunk:Array<any>)=>{
                        const arr: Array<any> = chunk?chunk:[]
                        arr.push(e.data?e.data:0)
                        return(
                            arr
                        )
                    })
                }
            }else{
                alert('Error while Recording')
            }
        }
       }catch(e){
        setErr(e)
       }
       console.log(stream)
    }, [mediaRecorder])

    const handleStart = ()=>{
        const video = document.querySelector("video")!
        video.srcObject = stream
        video.onloadedmetadata = ()=>{
            video.play()
        }
        try {
            if(stream){
                setMediaRecorder(new MediaRecorder(stream));
            }else{
              
            }
          } catch (exception) {
            console.log(exception);
            if (stream === null) {
              alert("Allow Permissions To Record The Video And Refresh the page");
            }
          }
        };


        const handleStop = ()=>{
            const video = document.querySelector("video")!;
            video.pause();
            
            mediaRecorder.stop()
            mediaRecorder.onstop = ()=>{
              console.log("On stop")
                const blob = new Blob(chunks);
                console.log("stop", blob)
                const player:any = document.querySelector("#player")!;
                player.src = window.URL.createObjectURL(blob)
            }
        }

        const handlezoom =()=>{
            if(stream){
                const tracks = stream.getVideoTracks()[0];
                const capabilities = tracks.getCapabilities();
                
                setCaps(capabilities)
                if(!("zoom" in capabilities)){
                    alert("Zoom is not supported in this device")
                }else{
                    // stream.applyConstraints({zoom: })
                }
                
            }
            
        }

    return(
        <>
      <main>
        <div className="jumbotron">
          <video controls></video>
          <video id="player" autoPlay controls></video>
          <button
            type="button"
            onClick={handleStart}
            data-wml-speech-command="start"
          >
            Start
          </button>
          <button
            type="button"
            onClick={handleStop}
            data-wml-speech-command="stop"
          >
            Stop
          </button>
          <button
            type="button"
            onClick={handlezoom}
            data-wml-speech-command="zoom"
          >
            zoom
          </button>
          {
            cap?Object.keys(cap).map((k)=>{
              return(
                <p key = {k}>
                  {k}
                </p>
              )
            }):""
          }
        </div>
        
      </main>
  );
}
        </>
    )
}