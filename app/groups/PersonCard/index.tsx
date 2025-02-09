"use client"

import {Card, Details, Name, ReturnCount} from "./style"

type Props = {
    name: string;
    returnCount: number;
}

const PersonCard = ({name, returnCount}: Props) => {
    return ( 
        <Card>
            <Details>
                <Name>
                {name}
                </Name>
                <ReturnCount>
                Guides return:<br/>{returnCount}
                </ReturnCount>
            </Details>
        </Card>
     );
}
 
export default PersonCard;