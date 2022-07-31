import React, { useRef } from 'react'
import { useState } from 'react';

function NameField({handleInputChange, isNormName}: { handleInputChange: React.ChangeEventHandler<HTMLInputElement>, isNormName: () => boolean}) {
  const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const [isValidField, setIsValidField] = useState(false)

  function inputValid(e: React.ChangeEvent<HTMLInputElement>) {
    handleInputChange(e)
    if (isValidField) setIsValidField(!isNormName())
  }

  return (
    <div className='form-row'>
      <div className='form-group'>
        <label htmlFor='name'>First and last name</label>
        <input ref={nameRef} type='text' 
          onInput={() => nameRef.current.value = nameRef.current.value.toUpperCase()} 
          onChange={inputValid} className='form-control'
          onBlur={() => setIsValidField(!isNormName())}
          name='name' 
        />
      </div>
      {isValidField && 
        <div className='invalid'>Man you can't call yourself like that</div>
      }
    </div>
  )
}

export default NameField