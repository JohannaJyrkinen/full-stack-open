

const Numbers = ({name, number, deletePerson}) => {


    return(
        <>
    <p>{name}: {number} <button onClick={deletePerson}>delete</button></p>
    </>
    )
}
export default Numbers