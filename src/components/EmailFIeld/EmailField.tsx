import React, { useRef, useState } from 'react'

function EmailField({handleInputChange, isNormEmail}: { handleInputChange: React.ChangeEventHandler<HTMLInputElement>, isNormEmail: () => boolean}) {
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>
  const [isValidField, setIsValidField] = useState(false)

  function inputValid(e: React.ChangeEvent<HTMLInputElement>) {
    handleInputChange(e)
    if (isValidField) setIsValidField(!isNormEmail())
  }

  return (
    <div className='form-row'>
      <div className='form-group'>
        <label htmlFor='email'>Email address</label>
        <input ref={emailRef} type='email' 
          onChange={inputValid} 
          onBlur={() => setIsValidField(!isNormEmail())}
          className='form-control'
          name='email' 
        />
      </div>
      {isValidField &&
        <div className='invalid'>Incorrect email</div>
      }
    </div>
  )
}

export default EmailField
