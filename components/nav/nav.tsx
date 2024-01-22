"use client"

import { NavContainer, Button } from "./nav.style";
import Link from "next/link";

// type Props = {
//     navOprions: string;
// }

const NavBar = () => {
    const navOptions = [
        ["home", "/"],
        ["guides", "/guides"],
        ["resources", "/resources"],
        ["Hall of fame", "/gallery"],
        ["people", "/people"],
        ["calendar", "/calendar"]
    ]

    return ( 
        <NavContainer>
            {navOptions.map((option) => {
                return(
            <Link key={option[0]} href={option[1]}>
                <Button>{option[0]}</Button>
            </Link>
                )
            })}
        </NavContainer>
    );
}
 
export default NavBar;