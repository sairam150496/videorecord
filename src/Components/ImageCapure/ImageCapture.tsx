import React, { useState, useEffect } from 'react'
import Popup from 'reactjs-popup'
export default function ImageCapture():JSX.Element {
    const [imgArr, addToImgArr] = useState<Array<any>>([])
    const [change, addChange] = useState<number>(0)
    const [id, setId] = useState<number>(0)
    const [showPopUp, setShowPopUp] = useState<boolean>(false)


    useEffect(()=>{
        if(navigator.mediaDevices.getUserMedia || navigator.mediaDevices){
            navigator.mediaDevices.getUserMedia({video: true})
            .then(stream=>{
                const video = document.querySelector("video")!
                video.srcObject = stream
                video.play()
            })
        }
        
    }, [])

    const handleCapture = ()=>{
        const canvas = document.querySelector("canvas")!
        const context = canvas.getContext("2d")!
        context.drawImage(document.querySelector('video')!, 0, 0, 500, 500)
        addChange(change+1)
        addToImgArr(img=>[...img, canvas.toDataURL()])
    }

    const handleImageClick =(event: React.MouseEvent<HTMLInputElement, MouseEvent>)=>{
        event.preventDefault()
        const target = event.target as HTMLButtonElement
        setId(+target.value)
        setShowPopUp(true)
    }
    const handleClose = ()=>{
        setShowPopUp(false)
    }

    return(
        <>
        <main>
            <video controls />
            <canvas width="500" height="500" />
            <button onClick={handleCapture}>Capture</button>
            <br />
            {/* <img src="" alt="Click on capture"/> */}
            {change>0?imgArr.map((data, i)=>{

                   return(
                       <figure key={i}>
                           <input type="image" value={i} alt="No Image Found" src={data} onClick={handleImageClick}/>
                           <figcaption>d1</figcaption>
                       </figure>
                   )
                }):""
            }
            <div>
            <Popup
                open={showPopUp}
                closeOnDocumentClick
                onClose={handleClose}
                >
                <div className="modal">
                    <a className="close" onClick={handleClose}>
                    &times;
                    </a>
                    <img src = {imgArr[id]} alt="No Image Found" />
                    {
                        id===0?"":<button onClick={()=>{
                            setId(id=>id-1)
                        }}>Previous</button>
                    }
                    {
                        id===imgArr.length-1?"":<button onClick={()=>{
                            setId(id=>id+1)
                        }}>Next</button>
                    }
                    <button onClick={e=>{
                        imgArr.splice(id, 1)
                        setId(0)
                    }}> Delete </button>
                </div>
            </Popup>
        </div>
        </main>
        </>
    )
}