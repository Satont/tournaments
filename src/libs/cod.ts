import API from 'call-of-duty-api'

const CallOfDuty = API({ platform: 'acti' })

export const bootstrap = async () => {
  return CallOfDuty.login(process.env.COD_EMAIL, process.env.COD_PASSWORD)
}

export default CallOfDuty
