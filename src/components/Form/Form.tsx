import React, { useRef, useState } from 'react'
import { sendData } from '../../ajax'
import BirthField from '../BirhField/BirthField'
import EmailField from '../EmailFIeld/EmailField'
import MsgField from '../MsgField/MsgField'
import NameField from '../NameField/NameField'
import PhoneField from '../PhoneField/PhoneField'
import './Form.scss'
import { IResponse, TFormState } from './../../interfaces';



function Form() {

  const [formData, setFormData] = useState<TFormState>({
    name: '',
    email: '',
    phone: '',
    birthday: '',
    message: ''
  })

  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>

  const [formValid, setFormValid] = useState<boolean>(false)
  const [responseMsg, setResponseMsg] = useState<IResponse>({status: '', statusTest: ''})

  const handleInputChange = function(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    const target: EventTarget & (HTMLInputElement | HTMLTextAreaElement) = event.currentTarget;
    const value: string = target.value.trim();
    const name: string = target.name;
    formValidFunc()
    setFormData((formData: TFormState): TFormState => {
      formData[name] = value
      return formData
    });
  }

  function isNormName(): boolean {
    const nameArr: string[] = formData.name.split(' ')
    if (/[0-9]/.test(formData.name)) return false
    if (nameArr.length!==2) return false
    if (nameArr[0].length<3 || nameArr[0].length>30) return false
    if (nameArr[1].length<3 || nameArr[1].length>30) return false
    return true
  }

  function isNormEmail(): boolean {
    return /\S+@\S+\.\S+/.test(formData.email)
  }

  function isNormPhone(): boolean {
    return /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/.test(formData.phone)
  }

  function isNormMessage(): boolean {
    if (formData.message.length<10 || formData.message.length>300) return false
    return true
  }

  function isNormBirthday(): boolean {
    if (!formData.birthday) return false
    if (+formData.birthday.split('-')[0]<new Date().getFullYear()-100) return false
    if (+formData.birthday.split('-')[0]>new Date().getFullYear()-5) return false
    return true
  }

  function formValidFunc(): void {
    setFormValid(isNormName() && isNormEmail() && isNormPhone() && isNormMessage() && isNormBirthday())
  }


  async function sendFormHendler(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setFormValid(false);
    const response: IResponse = await sendData('http://localhost:3500/messages', formData);
    if (response.status === 'success') {
      formRef.current.reset()
    }
    setResponseMsg(response);
    setFormValid(true);
  }

  return (
    <>
      <form ref={formRef} className='form' noValidate>
        <h2>Create message</h2>
        <NameField handleInputChange={(e: React.FormEvent<HTMLInputElement>) => handleInputChange(e)} isNormName={isNormName} />
        <EmailField handleInputChange={(e: React.FormEvent<HTMLInputElement>) => handleInputChange(e)} isNormEmail={isNormEmail} />
        <PhoneField handleInputChange={(e: React.FormEvent<HTMLInputElement>) => handleInputChange(e)} isNormPhone={isNormPhone} />
        <BirthField handleInputChange={(e: React.FormEvent<HTMLInputElement>) => handleInputChange(e)}  isNormBirthday={isNormBirthday}/>
        <MsgField handleInputChange={(e: React.FormEvent<HTMLTextAreaElement>) => handleInputChange(e)} isNormMessage={isNormMessage} />
        <div className='form-row'>
          <button onClick={(e) => sendFormHendler(e)} className={formValid ? 'send-btn-active' : 'send-btn-active inactive'} disabled={!formValid}>
            Send
          </button>
        </div>
      </form>
      <div className='form' style={{color: responseMsg.status === 'error' ? 'red' : 'green'}} >{responseMsg.statusTest}</div>
    </>
  )
}

export default Form