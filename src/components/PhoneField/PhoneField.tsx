import React, { useRef, useState } from 'react'

function PhoneField({handleInputChange, isNormPhone}: { handleInputChange: React.ChangeEventHandler<HTMLInputElement>, isNormPhone: () => boolean}) {
  const phoneRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const [isValidField, setIsValidField] = useState(false)
  
  function inputValid(e: React.ChangeEvent<HTMLInputElement>) {
    handleInputChange(e)
    if (isValidField) setIsValidField(!isNormPhone())
  }

  return (
    <div className='form-row'>
      <div className='form-group'>
        <label htmlFor='phone'>Phone</label>
        <input ref={phoneRef} 
          defaultValue={'+7'} 
          onChange={inputValid} 
          onBlur={() => setIsValidField(!isNormPhone())}
          className='form-control'
          name='phone' 
        />
      </div>
      {isValidField &&
        <div className='invalid'>Invalid phone number</div>
      }
    </div>
  )
}

export default PhoneField