import { IResponse, TFormState } from "./interfaces";

export const sendData = async (url: string, personData: TFormState): Promise<IResponse> => {
  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(personData)
    })
    return {status: 'success', statusTest: 'Request finished successfully'}
  } catch(err) {
    if (err instanceof Error) return {status: 'error', statusTest: err.message};
    else return {status: 'error', statusTest: `Uncought error: ${err}`};
  } 
}