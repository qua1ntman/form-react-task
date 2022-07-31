import React, { useRef, useState } from 'react'

function MsgField({handleInputChange, isNormMessage}: { handleInputChange: React.ChangeEventHandler<HTMLTextAreaElement>, isNormMessage: () => boolean}) {
  const messageRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>
  const messageInvalidRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const [isValidField, setIsValidField] = useState(false)
  
  function inputValid(e: React.ChangeEvent<HTMLTextAreaElement>) {
    handleInputChange(e)
    if (isValidField) setIsValidField(!isNormMessage())
  }

  return (
    <div className='form-row'>
      <div className='form-group'>
        <label htmlFor='birthday'>Message</label>
        <textarea ref={messageRef} 
          onChange={inputValid} 
          onBlur={() =>setIsValidField(!isNormMessage())}
          className='message'
          name='message' 
          minLength={10}
          maxLength={300}
        ></textarea>
      </div>
      {isValidField &&
        <div ref={messageInvalidRef} className='invalid'>You cannot send empty message</div>
      }
    </div>
  )

}

export default MsgField
