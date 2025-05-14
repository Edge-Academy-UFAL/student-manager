import SignUp from '@/components/auth/signup'
import { DotBackground } from '@/components/background'

const getData = async (id: string): Promise<{ email: string }> => {
  let res
  try {
    res = await fetch(`http://127.0.0.1:8080/api/v1/register/${id}`)
  } catch (error) {
    throw new Error('Erro de conexão com o servidor')
  }

  if (!res.ok) {
    throw new Error('Token inválido/expirado')
  }

  return res.json()
}

const SignUpPage = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id)

  return (
    <div>
      <DotBackground />
      <SignUp id={params.id} email={data.email} />
    </div>
  )
}

export default SignUpPage
