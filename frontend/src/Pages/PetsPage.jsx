const PetsPages = ({ pets }) => {

    return (
        <div style={{ display: 'block', justifyContent: 'center', alignItems: 'center' }}>
            {pets.map((pet, key) => (
                <div id={key}>
                    <p>{pet.name}</p>
                </div>
            )
            )}
        </div>
    )
}

export default PetsPages;