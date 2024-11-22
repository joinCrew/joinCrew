import { styled } from 'styled-components';

function AddEvent() {
    return (
        <AddEventStyle>
            <div className="content">
                <form>
                    <fieldset>
                        <label></label>

                    </fieldset>
                </form>
            </div>
        </AddEventStyle>
    )
}

const AddEventStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default AddEvent;
