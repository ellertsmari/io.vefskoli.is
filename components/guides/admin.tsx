'use client';
import { GuideType } from '@/models/guide'
import Dropdown from '../dropDown/dropDown';
import useLocalStorage from '@/utils/useLocalStorage';
import { Reorder } from "framer-motion"
import { useState, useEffect } from 'react';
import { FilledButton } from '../buttons';
import Link from 'next/link';

type GuideWithId = GuideType & { _id: string }
type Props = {
    guides: GuideWithId[]
}
const options = [
    "MODULE 0",
    "MODULE 1",
    "MODULE 2",
    "MODULE 3",
    "MODULE 4",
    "MODULE 5",
    "MODULE 6",
    "MODULE 7",
];
const moduleNames = [
    "0 - Preparation",
    "1 - Introductory Course",
    "2 - Community & Networking",
    "3 - The fundamentals",
    "4 - Connecting to the World",
    "5 - Back-end & Infrastructure",
    "6 - Growing complexity",
    "7 - Exploration",
    "8 - Internship",
]
const Admin = ({guides}:Props) => {
    const [selected, setSelected] = useLocalStorage<string>("adminModule", "MODULE 1")
    const [guidesArr, setGuidesArr] = useState(guides.filter(g=>g.module.title === moduleNames[options.indexOf(selected)]))
    const [arrHasChanged, setArrHasChanged] = useState(false);
    useEffect(() => {
        setGuidesArr(guides.filter(g=>g.module.title === moduleNames[options.indexOf(selected)]).sort((a:GuideWithId,b:GuideWithId) => a.order - b.order))
    }, [selected])
    const reorder = (newArray:GuideWithId[]) => {
        
        console.log("setting guides array");
        setGuidesArr(newArray);
        setArrHasChanged(true);
    }
    const reArrangeDB = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(!arrHasChanged) return;
        guidesArr.forEach((guide, index) => {
            guide.order = index;
            fetch(`/api/guides/${guide._id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(guide)
            })
        })
        setArrHasChanged(false);
    }

    return (
        <div>
            <Dropdown options={options} selected={selected} setSelected={setSelected}/>
            <Reorder.Group axis="y" values={guidesArr} onReorder={reorder}>
            {guidesArr.map((guide) => {
                return (
                    //style this div as a card that reaches over the whole screen on the width
                    <Reorder.Item key={guide.title} value={guide} onMouseUp={reArrangeDB}>
                        <div style={{
                            border: "1px solid black",
                            margin: "10px",
                            padding: "10px",
                            borderRadius: "10px",
                            boxShadow: "5px 5px 5px 5px #888888",
                            backgroundColor: "white"
                        }}>
                            <h1 style={{
                                color: "black",
                                fontSize: "20px",
                                fontWeight: "bold"

                            }}>{guide.title}</h1>
                            <p>{guide.category}</p>
                            <p>{guide.module.title}</p>
                            <Link href={`/saveGuide/${guide._id}`}><FilledButton>edit guide</FilledButton></Link>
                        </div>
                    </Reorder.Item>   
            )})}
            </Reorder.Group>
            <Link href={`/saveGuide/${options.indexOf(selected)}`}><FilledButton>add guide</FilledButton></Link>
        </div>
    )
}

export default Admin