/* export const Navbar = function (){
    return(
        <nav className = "container-nav"></nav>
    )
}

export const InputField = function(props){

    const handler = props.handler;
    return(
        <div className = "container-input">
        <input type="text" value={props.iText} id={props.id} onChange={handler}></input>
    
        <h4>{props.subHead}</h4>
        </div>
    )
}

export const ExeButton = function(props){
    return(
        <button onClick={props.function}>{props.text}</button>
    )
}
 */

export const Test = function (){
    return(
        <div>Lol</div>
    )
}

/* export const Navbar = function (){
    return(
        <nav className = "container-nav"></nav>
    )
} */

export const InputField = function(props){

    const handler = props.handler;
    return(
        <div className = "container-input">
        <input type="text" value={props.iText} id={props.id} onChange={handler}></input>
    
        <h4>{props.subHead}</h4>
        </div>
    )
}

export const ExeButton = function(props){
    return(
        <button onClick={props.function}>{props.text}</button>
    )
}