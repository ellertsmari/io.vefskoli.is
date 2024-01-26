import { CSSProperties } from "react";
import { CellContainer } from "./styles";

interface Props extends React.PropsWithChildren{
    style?: CSSProperties;
}

const Cell = ({children, style}:Props) => {
    return (
            <CellContainer style={style}>
            {children}
            </CellContainer>
    );
}
 
export default Cell;