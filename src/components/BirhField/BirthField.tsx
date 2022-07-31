import React, { useRef, useState } from 'react'

function BirthField({handleInputChange, isNormBirthday}: { handleInputChange: React.ChangeEventHandler<HTMLInputElement>, isNormBirthday: () => boolean}) {
  const birthdayRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const [isValidField, setIsValidField] = useState(false)
  
  function inputValid(e: React.ChangeEvent<HTMLInputElement>) {
    handleInputChange(e)
    if (isValidField) setIsValidField(!isNormBirthday())
  }

  return (
    <div className='form-row'>
      <div className='form-group'>
        <label htmlFor='birthday'>Birthday</label>
        <input ref={birthdayRef} type='date' 
          onChange={inputValid} 
          max={new Date().toISOString().split("T")[0]}
          min={'1920-01-01'}
          onBlur={() => setIsValidField(!isNormBirthday())}
          className='form-control'
          name='birthday' 
        />
      </div>
      {isValidField &&
        <div className='invalid'>Please chose your birthday</div>
      }
    </div>
  )
}

export default BirthField