import React, { useState, useEffect } from 'react';

type formEvent = React.FormEvent;

interface O{
    name: string;
    id: string;
}

export default function Landing(): JSX.Element{

    const [count, setCount] = useState<number>(0)
    const [arr, addToArr] = useState<Array<string>>([])
    const [arrElement, setArrElement] = useState<string>('')
    const [obj, setObj] = useState<O>({name: '', id:''})
    useEffect(()=>{
        console.log(obj)
        console.log(arr)
    }, [obj, arr])
    const handleIncrease = ()=>{
        setCount(cnt=>cnt+1)
    }
    const handleDecrease = ()=>{
        setCount(cnt=>cnt-1)
    }
    const handleName = (event: React.ChangeEvent)=>{
        const target = event.target as HTMLInputElement
        setObj(
            (obje) => {
                return(
                    {
                        ...obje, 
                        name: target.value    
                    }
                )
            }
        )
    }
    const handleArrElem = (event: React.ChangeEvent)=>{
        const target = event.target as HTMLInputElement
        setArrElement(target.value)

    }
    const handleId = (event: React.ChangeEvent)=>{
        const target = event.target as HTMLInputElement
        setObj(
            (obje) => {
                return(
                    {
                        ...obje, 
                        id: target.value
                    }
                )
            }
        )
    }
    const handlePush = ()=>{
        addToArr(ar=>[arrElement, ...ar])
    }
    const handleSubmit = (event: formEvent)=>{
        event.preventDefault()
        console.log(event.target)
    }
    return(
        <>
        <form onSubmit={handleSubmit}>
            <p>Count: {count}</p>
            <br />
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" name="name" onChange={handleName} />
            <br />
            <label htmlFor="pwd">id: </label>
            <input type="text" id="pwd" name="id" onChange={handleId} />
            <br />
            <label htmlFor="arr_elem">id: </label>
            <input type="text" id="arr_elem" name="arr_elem" onChange={handleArrElem} />
            <br />
            <button type="button" onClick={handlePush}>PushToArray</button>
            <br />
            <button type="button" onClick={handleIncrease}>Increase</button>
            <br />
            <button type="button" onClick={handleDecrease}>decrease</button>
            <br />
            <button type="submit">Submit</button>
        </form> 

        </>
    )
}