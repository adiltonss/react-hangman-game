function StickMan({bodyParts}){

    return(
        <div className="wrapper">
            {bodyParts.map(bodyPart => (<div key={bodyPart} className={bodyPart}></div>))}
        </div>
    )
}


export default StickMan