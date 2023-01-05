import TextInput from './TextInput'

const Form = ({ nameValue, nameOnChange, numberValue, numberOnChange, onClick }) => {
    return (
      <form>
        <TextInput text='name: ' value={nameValue} onChange={nameOnChange} />
        <TextInput text='number: ' value={numberValue} onChange={numberOnChange} />
        <div>
          <button type="submit" onClick={onClick}>add</button>
        </div>
      </form>
    )
  }

  export default Form